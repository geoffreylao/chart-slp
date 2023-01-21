const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const busboy = require('connect-busboy');

const app = express();

const fs = require('fs');

app.use(busboy({
  highWaterMark: 2 * 1024 * 1024
}))

var corsOptions = {
  origin: "http://chartslp.netlify.app/"
  //origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const extendTimeoutMiddleware = (req, res, next) => {
  const space = ' ';
  let isFinished = false;
  let isDataSent = false;

  // Only extend the timeout for API requests
  if (req.url.includes('/api/matches/players') || req.url.includes('/api/matches/all') || req.url.includes('/api/matches/external') || !req.url.includes('/api/matches') && req.method !== 'GET') {
    next();
    return;
  }else{
    console.log('is api endpoint')
  }

  res.once('finish', () => {
    isFinished = true;
    console.log('res once finish')
  });

  res.once('end', () => {
    isFinished = true;
    console.log('res once end')
  });

  res.once('close', () => {
    isFinished = true;
    console.log('res once close')
  });

  res.on('data', (data) => {
    // Look for something other than our blank space to indicate that real
    // data is now being sent back to the client.
    if (data !== space) {
      isDataSent = true;

      console.log('now white space data')
    }

    console.log('res once data')
  });

  const waitAndSend = () => {
    setTimeout(() => {
      // If the response hasn't finished and hasn't sent any data back....
      if (!isFinished && !isDataSent) {
        // Need to write the status code/headers if they haven't been sent yet.
        if (!res.headersSent) {
          res.writeHead(202);
        }

        console.log('write white space')
        res.write(space);
        //res.end(JSON.stringify({ test: 'test'}))

        // Wait another 15 seconds
        waitAndSend();
      }
    }, 15000);
  };

  waitAndSend();
  next();
};

app.use(extendTimeoutMiddleware);

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");


  })
  .catch(err => {
    console.log("Cannot conenct to the database!", err);
  });


db.matches.watch().on('change', data => {
  console.log(data.fullDocument.matchid)

  let validStage = [2,3,8,28,31,32];
  // check valid characters and stages
  if(data.fullDocument.players[0].characterId < 26 && data.fullDocument.players[1].characterId < 26 && validStage.includes(data.fullDocument.settings.stageId)){
    var filename = "app/public/global-stats.json";
    var file_content = fs.readFileSync(filename);
    var content = JSON.parse(file_content);
  
    content.globalCharUsage[data.fullDocument.players[0].characterId]++;
    content.globalCharUsage[data.fullDocument.players[1].characterId]++;

    content.globalFrames += data.fullDocument.metadata.lastFrame;

    for (let i = 0; i < data.fullDocument.players.length; i++) {
      if(data.fullDocument.players[i].characterId === 20){
        for (let j = 0; j < data.fullDocument.players[i].conversions.length; j++) {
          for (let k = 0; k < data.fullDocument.players[i].conversions[j].moves.length; k++) {
            if(data.fullDocument.players[i].conversions[j].moves[k].moveId === 18){
              content.globalFalcoLasers++;
            }            
          }
        }
      }      
    }


  
    if(
      data.fullDocument.metadata.winner === 'INCOMPLETE' &&
      data.fullDocument.metadata.lastFrame <= 3600
    ){
      content.globalCharQuitout[data.fullDocument.players[0].characterId]++;
      content.globalCharQuitout[data.fullDocument.players[1].characterId]++;
    }
  
    if(data.fullDocument.metadata.winner === data.fullDocument.players[0].code){
      if(data.fullDocument.metadata.firstBlood === data.fullDocument.players[0].code){
        content.globalCharFirstBloodWins[data.fullDocument.players[0].characterId][data.fullDocument.players[1].characterId]++;
        content.globalCharFirstBloodLoss[data.fullDocument.players[1].characterId][data.fullDocument.players[0].characterId]++;
      }
      content.globalCharWins[data.fullDocument.players[0].characterId]++;
      content.globalCharLoss[data.fullDocument.players[1].characterId]++;
      content.gloabalCharStageWins[data.fullDocument.players[0].characterId][data.fullDocument.players[1].characterId][data.fullDocument.settings.stageId]++;
      content.globalCharStageLoss[data.fullDocument.players[1].characterId][data.fullDocument.players[0].characterId][data.fullDocument.settings.stageId]++;
    }
  
    if(data.fullDocument.metadata.winner === data.fullDocument.players[1].code){
      if(data.fullDocument.metadata.firstBlood === data.fullDocument.players[1].code){
        content.globalCharFirstBloodWins[data.fullDocument.players[1].characterId][data.fullDocument.players[0].characterId]++;
        content.globalCharFirstBloodLoss[data.fullDocument.players[0].characterId][data.fullDocument.players[1].characterId]++;
      }
      content.globalCharWins[data.fullDocument.players[1].characterId]++;
      content.globalCharLoss[data.fullDocument.players[0].characterId]++;
      content.gloabalCharStageWins[data.fullDocument.players[1].characterId][data.fullDocument.players[0].characterId][data.fullDocument.settings.stageId]++;
      content.globalCharStageLoss[data.fullDocument.players[0].characterId][data.fullDocument.players[1].characterId][data.fullDocument.settings.stageId]++;
    }
  
    content.globalCharColor[data.fullDocument.players[0].characterId][data.fullDocument.players[0].characterColor]++;
    content.globalCharColor[data.fullDocument.players[1].characterId][data.fullDocument.players[1].characterColor]++;

    if(content){
      fs.writeFileSync("./app/public/global-stats.json", JSON.stringify(content));
    }
  }


  //Serialize as JSON and Write it to a file
  
  
})

// simple route
app.get("/", (req,res) => {
  res.json({ message: "Welcome to the Chart.slp API!"});
});

require("./app/routes/match.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});