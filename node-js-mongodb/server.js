const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const busboy = require('connect-busboy');

const app = express();

app.use(busboy({
  highWaterMark: 2 * 1024 * 1024
}))

var corsOptions = {
  //origin: "http://chartslp.netlify.app/"
  origin: "http://localhost:3000"
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
  if (req.url.includes('/api/matches/dump') || req.url.includes('/api/matches/all') || req.url.includes('/api/matches/external') || !req.url.includes('/api/matches') && req.method !== 'GET') {
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