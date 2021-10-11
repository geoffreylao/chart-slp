// Controller Variables
const db = require("../models");
const Match = db.matches;

// .slp parsing function imports
const { SlippiGame } = require('@slippi/slippi-js');
const fs = require('fs');
const uri = db.url;
var MongoClient = require('mongodb').MongoClient;

// POST upload function imports
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const rimraf = require('rimraf');
const DIR = path.resolve(__dirname, '../public/');

// Variables for parse_folder function
var obj_arr = [];
var failed_inserts = [];
var inserted = 0;

var co = require('co');

function parse_slp(filename){
  try {
    var game = new SlippiGame(filename);
    // Get game settings – stage, characters, etc
    var settings = game.getSettings();
    // Get metadata - start time, platform played on, etc
    var metadata = game.getMetadata();
    // Get computed stats - openings / kill, conversions, etc
    var stats = game.getStats();
    // Get frames – animation state, inputs, etc
    const frames = game.getFrames();

    var p0_conversions = [];
    var p1_conversions = [];
  
    for (let index = 0; index < stats.conversions.length; index++) {
      if(stats.conversions[index].playerIndex == 0){
        p0_conversions.push(stats.conversions[index]);
      }else if(stats.conversions[index].playerIndex == 1){
        p1_conversions.push(stats.conversions[index]);
      }
    }
  
    var p0_stocks = [];
    var p1_stocks = [];
    p0Kills = 0;
    p1Kills = 0;
  
    for (let index = 0; index < stats.stocks.length; index++) {
      if(stats.stocks[index].playerIndex == 0){
        p0_stocks.push(stats.stocks[index]);
        if(stats.stocks[index].deathAnimation !== null){
          p1Kills++;
        }
      }else if(stats.stocks[index].playerIndex == 1){
        p1_stocks.push(stats.stocks[index]);
        if(stats.stocks[index].deathAnimation !== null){
          p0Kills++;
        }
      }
    }
  
    var stage_dict = {
      2 : "FOUNTAIN_OF_DREAMS",
      3 : "POKEMON_STADIUM",
      4 : "PEACHS_CASTLE",
      5 : "KONGO_JUNGLE",
      6 : "BRINSTAR",
      7 : "CORNERIA",
      8 : "YOSHIS_STORY",
      9 : "ONETT",
      10 : "MUTE_CITY",
      11 : "RAINBOW_CRUISE",
      12 : "JUNGLE_JAPES",
      13 : "GREAT_BAY",
      14 : "HYRULE_TEMPLE",
      15 : "BRINSTAR_DEPTHS",
      16 : "YOSHIS_ISLAND",
      17 : "GREEN_GREENS",
      18 : "FOURSIDE",
      19 : "MUSHROOM_KINGDOM",
      20 : "MUSHROOM_KINGDOM_2",
      22 : "VENOM",
      23 : "POKE_FLOATS",
      24 : "BIG_BLUE",
      25 : "ICICLE_MOUNTAIN",
      26 : "ICETOP",
      27 : "FLAT_ZONE",
      28 : "DREAMLAND",
      29 : "YOSHIS_ISLAND_N64",
      30 : "KONGO_JUNGLE_N64",
      31 : "BATTLEFIELD",
      32 : "FINAL_DESTINATION"
    }
  
    var char_dict = {
      0 : "CAPTAIN_FALCON",
      1 : "DONKEY_KONG",
      2 : "FOX" ,
      3 : "GAME_AND_WATCH",
      4 : "KIRBY",
      5 : "BOWSER",
      6 : "LINK",
      7 : "LUIGI",
      8 : "MARIO",
      9 : "MARTH",
      10 : "MEWTWO",
      11 : "NESS",
      12 : "PEACH",
      13 : "PIKACHU",
      14 : "ICE_CLIMBERS",
      15 : "JIGGLYPUFF",
      16 : "SAMUS",
      17 : "YOSHI",
      18 : "ZELDA",
      19 : "SHEIK",
      20 : "FALCO",
      21 : "YOUNG_LINK",
      22 : "DR_MARIO",
      23 : "ROY",
      24 : "PICHU",
      25 : "GANONDORF"
    }

    function check_winner(stats){

        var player_zero_percent;
        var player_one_percent;
        var winner;

        // set last stocks final percent
        for (let i = 0; i < stats.stocks.length; i++) {
            if(stats.stocks[i].playerIndex == 0){
                player_zero_percent = stats.stocks[i].currentPercent;
            }else if(stats.stocks[i].playerIndex == 1){
                player_one_percent = stats.stocks[i].currentPercent;
            }
        }

        if(p0Kills == 4){
            winner = 0;
        }else if(p1Kills == 4){
            winner =  1;
        }else if(metadata.lastFrame == 28800){
            if(p0Kills > p1Kills){
                winner =  0;
            }else if(p0Kills < p1Kills){
                winner =  1;
            }else if(p0Kills === p1Kills){
                if(player_zero_percent > player_one_percent){
                    winner = 1;
                }else if(player_zero_percent < player_one_percent){
                    winner = 0;
                }else if(player_zero_percent == player_one_percent){
                    winner = 2;
                }
            }
        }else{
            winner = 3;
        }

        switch(winner){
            case 0:
                return metadata.players[0].names.code;
            case 1:
                return metadata.players[1].names.code;
            case 2:
                return "DRAW";
            case 3:
                return "INCOMPLETE"

        }
    }


    var myobj = {
      matchid: metadata.startAt + metadata.players[0].names.code + metadata.players[1].names.code,
      settings: {
        isTeams: settings.isTeams,
        isPal: settings.isPAL,
        stageId: settings.stageId,
        stageString: stage_dict[settings.stageId],
      },
      metadata: {
        startAt: new Date(metadata.startAt),
        lastFrame: metadata.lastFrame,
        minutes: stats.overall[0].inputsPerMinute.total,
        gameComplete: check_winner(stats) === "INCOMPLETE" ? false : true,
        winner: check_winner(stats),
        firstBlood: metadata.players[stats.stocks[0].playerIndex].names.code
      }, 
      players: [
        {
          playerIndex: settings.players[0].playerIndex,
          characterId: settings.players[0].characterId,
          characterColor: settings.players[0].characterColor,
          code: metadata.players[0].names.code,
          name: metadata.players[0].names.netplay,
          characterString: char_dict[settings.players[0].characterId],
          actionCounts: {
            wavedashCount: stats.actionCounts[0].wavedashCount,
            wavelandCount: stats.actionCounts[0].wavelandCount,
            airDodgeCount: stats.actionCounts[0].airDodgeCount,
            dashDanceCount: stats.actionCounts[0].dashDanceCount,
            spotDodgeCount: stats.actionCounts[0].spotDodgeCount,
            ledgegrabCount: stats.actionCounts[0].ledgegrabCount,
            rollCount: stats.actionCounts[0].rollCount
          },
          conversions: p1_conversions,
          inputCounts: {
            buttons: stats.overall[0].inputCounts.buttons, // digital inputs
            triggers: stats.overall[0].inputCounts.triggers,
            cstick: stats.overall[0].inputCounts.cstick,
            joystick: stats.overall[0].inputCounts.joystick,
            total: stats.overall[0].inputCounts.total // total inputs
          },
          conversionCount: stats.overall[0].conversionCount,
          totalDamage: stats.overall[0].totalDamage,
          killCount: p0Kills,
          creditedKillCount: stats.overall[0].killCount,
          successfulConversions: stats.overall[0].successfulConversions.count,
          openings: stats.overall[0].openingsPerKill.count,
          neutralWins: stats.overall[0].neutralWinRatio.count,
          counterHits: stats.overall[0].counterHitRatio.count,
          trades: stats.overall[0].beneficialTradeRatio.count,
          deathCount: p1Kills,
          lcancelPercent: parseInt((stats.actionCounts[0].lCancelCount.success / (stats.actionCounts[0].lCancelCount.success + stats.actionCounts[0].lCancelCount.fail)) * 100),
          grabCount: stats.actionCounts[0].grabCount,
          throwCount: stats.actionCounts[0].throwCount,
          groundTechCount: stats.actionCounts[0].groundTechCount,
          wallTechCount: stats.actionCounts[0].wallTechCount,
          stocks: p0_stocks
        },
        {
          playerIndex: settings.players[1].playerIndex,
          characterId: settings.players[1].characterId,
          characterColor: settings.players[1].characterColor,
          code: metadata.players[1].names.code,
          name:  metadata.players[1].names.netplay,
          characterString: char_dict[settings.players[1].characterId],
          actionCounts: {
            wavedashCount: stats.actionCounts[1].wavedashCount,
            wavelandCount: stats.actionCounts[1].wavelandCount,
            airDodgeCount: stats.actionCounts[1].airDodgeCount,
            dashDanceCount: stats.actionCounts[1].dashDanceCount,
            spotDodgeCount: stats.actionCounts[1].spotDodgeCount,
            ledgegrabCount: stats.actionCounts[1].ledgegrabCount,
            rollCount: stats.actionCounts[1].rollCount
          },
          conversions: p0_conversions,
          inputCounts: {
            buttons: stats.overall[1].inputCounts.buttons, // digital inputs
            triggers: stats.overall[1].inputCounts.triggers,
            cstick: stats.overall[1].inputCounts.cstick,
            joystick: stats.overall[1].inputCounts.joystick,
            total: stats.overall[1].inputCounts.total // total inputs
          },
          conversionCount: stats.overall[1].conversionCount,
          totalDamage: stats.overall[1].totalDamage,
          killCount: p1Kills,
          creditedKillCount: stats.overall[1].killCount,
          successfulConversions: stats.overall[1].successfulConversions.count,
          openings: stats.overall[1].openingsPerKill.count,
          neutralWins: stats.overall[1].neutralWinRatio.count,
          counterHits: stats.overall[1].counterHitRatio.count,
          trades: stats.overall[1].beneficialTradeRatio.count,
          deathCount: p0Kills,
          lcancelPercent: parseInt((stats.actionCounts[1].lCancelCount.success / (stats.actionCounts[1].lCancelCount.success + stats.actionCounts[1].lCancelCount.fail)) * 100),
          grabCount: stats.actionCounts[1].grabCount,
          throwCount: stats.actionCounts[1].throwCount,
          groundTechCount: stats.actionCounts[1].groundTechCount,
          wallTechCount: stats.actionCounts[1].wallTechCount,
          stocks: p1_stocks
        }
      ],
    };
  
    obj_arr.push(myobj);
    inserted++;

  } catch (error) {
    //console.log(error)
    console.log("Error parsing: " + (filename));
    failed_inserts.push((filename));
  }
}

function parse_folder(folder, res){
  fs.readdirSync(folder).forEach(file => {
    console.log("Parsing: " + folder + '/' + file);

    parse_slp(folder + '/' + file);
  });

  console.log('Inserted: ' + inserted)
  console.log("Failed inserts: " + failed_inserts.length);

  res.end(JSON.stringify({inserted: inserted , failed_arr: failed_inserts}))

  inserted = 0;
  failed_inserts = [];

  if (obj_arr.length === 0) {
    console.log("Nothing to insert!")

    failed_inserts = [];
  }else{
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } , function(err,db) {
      if (err) throw err;
      var dbo = db.db("mongoslp");

      dbo.collection('matches').insertMany(obj_arr, {ordered: false} , function(err, res) {
        if (err){
          console.log("duplicate")

          obj_arr = [];
          failed_inserts = [];
          count = 0;
        }else{
          console.log("Number of documents inserted: " + res.insertedCount);
          myinsert = res.insertedCount;
  
          db.close();
  
          obj_arr = [];
          failed_inserts = [];
          count = 0;

        }
      }); // dbo.collection
    }); // MongoClient.connect
  } // else

}// parse_folder

function showTwoDigits(number) {
  return ("00" + number).slice(-2);
}

function displayTime(currentFrame) {
  var fps = 60;
  var h = Math.floor(currentFrame/(60*60*fps));
  var m = (Math.floor(currentFrame/(60*fps))) % 60;
  var s = (Math.floor(currentFrame/fps)) % 60;
  var f = currentFrame % fps;
  return (h) + ":" + showTwoDigits(m) + ":" + showTwoDigits(s) + ":" + showTwoDigits(f);
}

exports.create = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  // File storage location and naming
  var R_DIR = DIR + "/" + uuidv4();
  fs.mkdir(R_DIR, function(err){});

  var files = 0, finished = false;

  req.busboy.on('file', (fieldname, file, filename) => {
      console.log(`Upload started: %s`, R_DIR + '/' + filename);
      files++;

      // Create a write stream of the new file
      const fstream = fs.createWriteStream(path.join(R_DIR, filename));
      
      // Pipe it trough
      
      file.on('error',function(err){
       console.log('fstream: ', err);
      });
            
      file.on('end', function() {
        fstream.end();
        console.log('Finished uploading: %s', R_DIR + '/' + filename );
      });

      fstream.on('finish', function(){   
        if(--files === 0 && finished){        

          parse_folder(R_DIR, res); 
          
        }
      });

      fstream.on('close', function(){
        if(files === 0 && finished){
          console.log('fstream closed')
          rimraf.sync(R_DIR);
        }
      });

      fstream.on('error', function(){
          console.log('fstream error')       
      });


      file.pipe(fstream)

  }); // busboy on file

  req.busboy.on('finish', function() {
    finished = true;
  });

  req.busboy.on('error', function() {
    console.log('busboy error')
  });

  req.connection.on('error', function (error) {
    //do something like cancelling the mongodb session ...
    console.log('connection error')
    parse_folder(R_DIR, res); 
    rimraf.sync(R_DIR);
});

  return req.pipe(req.busboy); // Pipe it trough busboy
}

// Retrieve all matches from the database 
exports.findAll = (req, res) => {
  let myTotalMatches = 0;
  let myTotalTime = 0;
  let myTotalLRAStart = 0;
  let myTotalTimeouts = 0;
  let myTotalWins = 0;
  let myTotalLosses = 0;
  let myWinrate = 0;
  let myNeutralWins = 0;
  let myOppNeutralWins = 0;
  let myCounterHits = 0;
  let myOppCounterHits = 0;
  let myBeneficialTrades = 0;
  let myOppBeneficialTrades = 0;
  let myOpenings = 0; 
  let myOppOpenings = 0;
  let myKills = 0; 
  let myOppKills = 0;
  let myOpeningsPerKO = 0;
  let myOppOpeningsPerKO = 0; 
  let myConversions = 0; 
  let myOppConversions = 0;
  let mySuccessfulConversions = 0; 
  let myOppSuccessfulConversions = 0; 
  let myConversionRate;myOppConversionRate = 0;
  let myDamage = 0; 
  let myOppDamage = 0; 
  let myAvgDamagePerOpening = 0;
  let myOppAvgDamagePerOpening = 0;
  let myAvgKOpercent = 0;
  let myOppAvgKOpercent = 0;
  let myTotalLcancel = 0; 
  let myOppTotalLcancel = 0;
  let myLcancels = 0;
  let myOppLcancels = 0;
  let myFourStocks = 0;
  let myOppFourStocks = 0;
  let myAvgStocksTaken = 0;
  let myOppAvgStocksTaken = 0; 
  let myTotalStockDifferential = 0;
  let myOppTotalStockDifferential = 0; 
  let myAvgStockDifferential = 0;
  let myOppAvgStockDifferential = 0;
  let myFirstBloods = 0;
  let myOppFirstBloods = 0;
  let myBestPunish = 0;
  let myOppBestPunish = 0;
  let myLowestKill = 1000;
  let myOppLowestKill = 1000;
  let myHighestKill = 0;
  let myOppHighestKill = 0; 
  let myTotalInputs = 0; 
  let myOppTotalInputs = 0; 
  let myTotalMinutes = 0; 
  let myIPM = 0;
  let myOppIPM = 0;
  let myTotalDigitalInputs = 0; 
  let myOppTotalDigitalInputs = 0; 
  let myDigitalIPM = 0;
  let myOppDigitalIPM = 0;

  // Character Usage
  let myCharUsage = new Array(26).fill(0);
  let myCharColor = new Array(26).fill(0);
  let myOppCharUsage = new Array(26).fill(0);

  // Character Wins
  let myVsCharWins = new Array(26).fill(0);
  let myAsCharWins = new Array(26).fill(0);

  // Character Loss
  let myVsCharLoss = new Array(26).fill(0);
  let myAsCharLoss = new Array(26).fill(0);

  // Stage W/L
  let myStageWins = new Array(33).fill(0);
  let myStageLoss = new Array(33).fill(0);

  // Action counts
  let myActionCountArr = Array.from({length: 26}, e => Array(7).fill(0));
  let myOppActionCountArr = Array.from({length: 26}, e => Array(7).fill(0));

  let myMoveUsageArr = {
    neutralWinMoves : Array.from({length: 26}, e => Array(63).fill(0)),
    counterHitMoves : Array.from({length: 26}, e => Array(63).fill(0)),
    tradeMoves : Array.from({length: 26}, e => Array(63).fill(0)),
    killMoves : Array.from({length: 26}, e => Array(63).fill(0))
  }

  let myOppMoveUsageArr = {
    neutralWinMoves : Array.from({length: 26}, e => Array(63).fill(0)),
    counterHitMoves : Array.from({length: 26}, e => Array(63).fill(0)),
    tradeMoves : Array.from({length: 26}, e => Array(63).fill(0)),
    killMoves : Array.from({length: 26}, e => Array(63).fill(0))
  }

  let oppTally = {}
  let gametimeWins = [] 
  let gametimeLoss = []

  let shortestGametime = 28800;
  let longestGametime = 0;

  let quitoutmyCharUsage = new Array(26).fill(0);
  let quitoutmyOppCharUsage = new Array(26).fill(0);

    // death direction
  let deathDirectionCharUsage = Array.from({length: 4}, e => Array(26).fill(0));

  let deathDirectionOppCharUsage =  Array.from({length: 4}, e => Array(26).fill(0));

  // grab success and whiffs
  let grabCountSuccessCharUsage = new Array(26).fill(0);
  let grabCountWhiffCharUsage = new Array(26).fill(0);

  let grabCountSuccessOppCharUsage = new Array(26).fill(0);
  let grabCountWhiffOppCharUsage = new Array(26).fill(0);

  // up forward back down
  let throwCountCharUsage =  Array.from({length: 4}, e => Array(26).fill(0))
  let throwCountOppCharUsage =  Array.from({length: 4}, e => Array(26).fill(0))

  // backward forward neutral fail
  let groundTechCountCharUsage =  Array.from({length: 4}, e => Array(26).fill(0))
  let groundTechCountOppCharUsage =  Array.from({length: 4}, e => Array(26).fill(0))

  // grab success and whiffs
  let wallTechCountSuccessCharUsage = new Array(26).fill(0);
  let wallTechCountFailCharUsage = new Array(26).fill(0);

  let wallTechCountSuccessOppCharUsage = new Array(26).fill(0);
  let wallTechCountFailOppCharUsage = new Array(26).fill(0);

  let myCreditedKills = 0;
  let myOppCreditedKills = 0;

  let sdCharUsage = new Array(26).fill(0);
  let sdOppCharUsage = new Array(26).fill(0);

  let deathUsage = new Array(26).fill(0);
  let deathOppUsage = new Array(26).fill(0);

  let zeroToDeaths = 0;
  let oppZeroToDeaths = 0;

  let frames = 0;

  function accumulateStats(connect_code, res){
    if(!res.settings.isTeams){
      myTotalMatches++;
  
      frames += res.metadata.lastFrame;
  
      myTotalMinutes += res.metadata.minutes;
  
      if(res.metadata.firstBlood === connect_code){
        myFirstBloods++;
      }else{
        myOppFirstBloods++;
      }
  
      // Total L R A Start
      if(res.metadata.winner === "INCOMPLETE"){
        myTotalLRAStart++;
        for (let j = 0; j < res.players.length; j++) {
          if(res.players[j].code === connect_code){
            quitoutmyCharUsage[res.players[j].characterId]++;
          }else{
            quitoutmyOppCharUsage[res.players[j].characterId]++;
          }
        }
      }else{
        if(res.metadata.lastFrame > longestGametime){
          longestGametime = res.metadata.lastFrame
        }
  
        if(res.metadata.lastFrame < shortestGametime){
          shortestGametime = res.metadata.lastFrame
        }
      }
  
      // Total Timeouts
      if(res.metadata.lastFrame === 28800){
        myTotalTimeouts++;
      }
  
      // Total Wins/Loss, Stage W/L
      if(res.metadata.winner === connect_code){
        myTotalWins++;
        myStageWins[res.settings.stageId]++;
        // Vs and As Character Wins
        for (let j = 0; j < res.players.length; j++) {
          if(res.players[j].code === connect_code){
            myAsCharWins[res.players[j].characterId]++;
            
            myTotalStockDifferential += res.players[j].killCount - res.players[j].deathCount;
            // 4 Stocks
            if(res.players[j].killCount === 4 && res.players[j].deathCount === 0){
              myFourStocks++;
            }
            }else{
              myVsCharWins[res.players[j].characterId]++;
            }      
          }
      }else if(res.metadata.winner !== connect_code && res.metadata.winner !== 'INCOMPLETE' && res.metadata.winner !== 'DRAW'){
        myTotalLosses++;
        myStageLoss[res.settings.stageId]++;
  
        // Vs and As Character Loss
        for (let j = 0; j < res.players.length; j++) {
          if(res.players[j].code === connect_code){
            myAsCharLoss[res.players[j].characterId]++;
          }else{
            myVsCharLoss[res.players[j].characterId]++;
            
            myOppTotalStockDifferential += res.players[j].killCount - res.players[j].deathCount;
            // 4 Stocks
            if(res.players[j].killCount === 4 && res.players[j].deathCount === 0){
              myOppFourStocks++;
            }
          }      
        }
      }
  
      // Character Usage, Neutral Wins, Counter Hits, Openings
      for (let j = 0; j < res.players.length; j++) {
        if(res.players[j].code === connect_code){
          myCharUsage[res.players[j].characterId]++;
          myCharColor[res.players[j].characterId] = res.players[j].characterColor
          myNeutralWins += res.players[j].neutralWins;
          myCounterHits += res.players[j].counterHits;
          myBeneficialTrades += res.players[j].trades;
          myOpenings += res.players[j].openings;
          myKills += res.players[j].killCount;
          myCreditedKills += Number.isInteger(res.players[j].creditedKillCount) ? res.players[j].creditedKillCount : 0;
          myConversions += res.players[j].conversionCount;
          mySuccessfulConversions += res.players[j].successfulConversions;
          myDamage += res.players[j].totalDamage;
          myTotalInputs += res.players[j].inputCounts.total;
          myTotalDigitalInputs += res.players[j].inputCounts.buttons;
  
          
          for (let k = 0; k < res.players[j].stocks.length; k++) {
            switch (res.players[j].stocks[k].deathAnimation) {
              case 0:
                deathDirectionCharUsage[0][res.players[j].characterId]++;
                break;
              case 1:
                deathDirectionCharUsage[1][res.players[j].characterId]++;
                break;
              case 2:
                deathDirectionCharUsage[2][res.players[j].characterId]++;
                break;
              case null:
                break;
              default:
                deathDirectionCharUsage[3][res.players[j].characterId]++;
                break;
            }            
          }
          
  
          grabCountSuccessCharUsage[res.players[j].characterId] += (res.players[j].throwCount.up + res.players[j].throwCount.forward
            + res.players[j].throwCount.back + res.players[j].throwCount.down);
          grabCountWhiffCharUsage[res.players[j].characterId] += res.players[j].grabCount.fail;
  
          throwCountCharUsage[0][res.players[j].characterId] += res.players[j].throwCount.up;
          throwCountCharUsage[1][res.players[j].characterId] += res.players[j].throwCount.forward;
          throwCountCharUsage[2][res.players[j].characterId] += res.players[j].throwCount.back;
          throwCountCharUsage[3][res.players[j].characterId] += res.players[j].throwCount.down;
  
          groundTechCountCharUsage[0][res.players[j].characterId] += res.players[j].groundTechCount.backward;
          groundTechCountCharUsage[1][res.players[j].characterId] += res.players[j].groundTechCount.forward;
          groundTechCountCharUsage[2][res.players[j].characterId] += res.players[j].groundTechCount.neutral;
          groundTechCountCharUsage[3][res.players[j].characterId] += res.players[j].groundTechCount.fail;
  
          wallTechCountSuccessCharUsage[res.players[j].characterId] += res.players[j].wallTechCount.success;
          wallTechCountFailCharUsage[res.players[j].characterId] += res.players[j].wallTechCount.fail;
  
          if(j === 0){
            sdCharUsage[res.players[j].characterId] += res.players[j].deathCount - res.players[1].creditedKillCount ? res.players[j].deathCount - res.players[1].creditedKillCount : 0;
            deathUsage[res.players[j].characterId] += Number.isInteger(res.players[1].creditedKillCount) ? res.players[1].creditedKillCount : 0;
          }else if(j === 1){
            sdCharUsage[res.players[j].characterId] += res.players[j].deathCount - res.players[0].creditedKillCount ? res.players[j].deathCount - res.players[0].creditedKillCount : 0;
            deathUsage[res.players[j].characterId] += Number.isInteger(res.players[0].creditedKillCount) ? res.players[0].creditedKillCount : 0;
          }
  
          
  
          if(!isNaN(res.players[j].lcancelPercent)){
            myTotalLcancel += res.players[j].lcancelPercent;
          }else{
            res.players[j].lcancelPercent = 100;
            myTotalLcancel += res.players[j].lcancelPercent;
          } 
  
          for (let k = 0; k < res.players[j].conversions.length; k++) {
            var currentConversion = res.players[j].conversions[k].endPercent - res.players[j].conversions[k].startPercent;
  
            if(currentConversion > myBestPunish){
              myBestPunish = currentConversion;
            }
            
            if(res.players[j].conversions[k].didKill){
              if(res.players[j].conversions[k].moves[0]){
                myMoveUsageArr.killMoves[res.players[j].characterId][res.players[j].conversions[k].moves[res.players[j].conversions[k].moves.length - 1].moveId]++;                
              }
              
              if(res.players[j].conversions[k].startPercent === 0){
                zeroToDeaths++;
              }
  
              if(res.players[j].conversions[k].endPercent > myHighestKill){
                myHighestKill = res.players[j].conversions[k].endPercent;
              } 
              
              if(res.players[j].conversions[k].endPercent < myLowestKill){
                myLowestKill = res.players[j].conversions[k].endPercent;
              }
            }
  
            switch(res.players[j].conversions[k].openingType){
              case 'neutral-win': 
              if(res.players[j].conversions[k].moves[0])
                {myMoveUsageArr.neutralWinMoves[res.players[j].characterId][res.players[j].conversions[k].moves[0].moveId]++;}
                break;
              case 'counter-attack':
                if(res.players[j].conversions[k].moves[0])
                {myMoveUsageArr.counterHitMoves[res.players[j].characterId][res.players[j].conversions[k].moves[0].moveId]++;}
                break;
              case 'trade':
                if(res.players[j].conversions[k].moves[0])
                {myMoveUsageArr.tradeMoves[res.players[j].characterId][res.players[j].conversions[k].moves[0].moveId]++;}
                break;
              default:
                break;
            }
          }
  
          // Action Counts
          myActionCountArr[res.players[j].characterId][0] +=  res.players[j].actionCounts.wavedashCount;
          myActionCountArr[res.players[j].characterId][1] +=  res.players[j].actionCounts.wavelandCount;
          myActionCountArr[res.players[j].characterId][2] +=  res.players[j].actionCounts.airDodgeCount;
          myActionCountArr[res.players[j].characterId][3] +=  res.players[j].actionCounts.dashDanceCount;
          myActionCountArr[res.players[j].characterId][4] +=  res.players[j].actionCounts.spotDodgeCount;
          myActionCountArr[res.players[j].characterId][5] +=  res.players[j].actionCounts.ledgegrabCount;
          myActionCountArr[res.players[j].characterId][6] +=  res.players[j].actionCounts.rollCount;
  
        }else{
          let current = res.players[j].code;
  
          if(!oppTally[current]){
            // times played, character played, character color, wins (player code), losses (opp wins)
            oppTally[current] = [1, new Array(26).fill(0), new Array(26).fill(0), 0, 0]
          }else{
            oppTally[current][0]++;
          }
  
          oppTally[current][1][res.players[j].characterId]++;
          oppTally[current][2][res.players[j].characterId] = res.players[j].characterColor;
          if(res.metadata.winner === connect_code){
            oppTally[current][3]++;
            gametimeWins.push(res.metadata.lastFrame)
          }
          if(res.metadata.winner !== connect_code && res.metadata.winner !== 'INCOMPLETE' && res.metadata.winner !== 'DRAW'){
            oppTally[current][4]++;
            gametimeLoss.push(res.metadata.lastFrame)
          }
  
          myOppCharUsage[res.players[j].characterId]++;
          myOppNeutralWins += res.players[j].neutralWins;
          myOppCounterHits += res.players[j].counterHits;
          myOppBeneficialTrades += res.players[j].trades;
          myOppOpenings += res.players[j].openings;
          myOppKills += res.players[j].killCount;
          myOppCreditedKills += Number.isInteger(res.players[j].creditedKillCount) ? res.players[j].creditedKillCount : 0; 
          myOppConversions += res.players[j].conversionCount;
          myOppSuccessfulConversions += res.players[j].successfulConversions;
          myOppDamage += res.players[j].totalDamage;
          myOppTotalInputs += res.players[j].inputCounts.total;
          myOppTotalDigitalInputs += res.players[j].inputCounts.buttons;
  
          for (let k = 0; k < res.players[j].stocks.length; k++) {
            switch (res.players[j].stocks[k].deathAnimation) {
              case 0:
                deathDirectionOppCharUsage[0][res.players[j].characterId]++;
                break;
              case 1:
                deathDirectionOppCharUsage[1][res.players[j].characterId]++;
                break;
              case 2:
                deathDirectionOppCharUsage[2][res.players[j].characterId]++;
                break;
              case null:
                break;
              default:
                deathDirectionOppCharUsage[3][res.players[j].characterId]++;
                break;
            }
            
          }
  
          grabCountSuccessOppCharUsage[res.players[j].characterId] += (res.players[j].throwCount.up + res.players[j].throwCount.forward
                                                                           + res.players[j].throwCount.back + res.players[j].throwCount.down);
          grabCountWhiffOppCharUsage[res.players[j].characterId] += res.players[j].grabCount.fail;
  
          throwCountOppCharUsage[0][res.players[j].characterId] += res.players[j].throwCount.up;
          throwCountOppCharUsage[1][res.players[j].characterId] += res.players[j].throwCount.forward;
          throwCountOppCharUsage[2][res.players[j].characterId] += res.players[j].throwCount.back;
          throwCountOppCharUsage[3][res.players[j].characterId] += res.players[j].throwCount.down;
  
          groundTechCountOppCharUsage[0][res.players[j].characterId] += res.players[j].groundTechCount.backward;
          groundTechCountOppCharUsage[1][res.players[j].characterId] += res.players[j].groundTechCount.forward;
          groundTechCountOppCharUsage[2][res.players[j].characterId] += res.players[j].groundTechCount.neutral;
          groundTechCountOppCharUsage[3][res.players[j].characterId] += res.players[j].groundTechCount.fail;
  
          wallTechCountSuccessOppCharUsage[res.players[j].characterId] += res.players[j].wallTechCount.success;
          wallTechCountFailOppCharUsage[res.players[j].characterId] += res.players[j].wallTechCount.fail;
  
          if(j === 0){
            sdOppCharUsage[res.players[j].characterId] += res.players[j].deathCount - res.players[1].creditedKillCount;
            deathOppUsage[res.players[j].characterId] += Number.isInteger(res.players[1].creditedKillCount) ? res.players[1].creditedKillCount : 0;
          }else if(j === 1){
            sdOppCharUsage[res.players[j].characterId] += res.players[j].deathCount - res.players[0].creditedKillCount;
            deathOppUsage[res.players[j].characterId] += Number.isInteger(res.players[0].creditedKillCount) ? res.players[0].creditedKillCount : 0;
          }
  
         
  
          if(!isNaN(res.players[j].lcancelPercent)){
            myOppTotalLcancel += res.players[j].lcancelPercent;
          }else{
            res.players[j].lcancelPercent = 100;
            myOppTotalLcancel += res.players[j].lcancelPercent;
          }
  
          for (let k = 0; k < res.players[j].conversions.length; k++) {
            var oppCurrentConversion = res.players[j].conversions[k].endPercent - res.players[j].conversions[k].startPercent;
  
            if(oppCurrentConversion > myOppBestPunish){
              myOppBestPunish = oppCurrentConversion;
            }          
  
            if(res.players[j].conversions[k].didKill){
              if(res.players[j].conversions[k].moves[0]){
                myOppMoveUsageArr.killMoves[res.players[j].characterId][res.players[j].conversions[k].moves[res.players[j].conversions[k].moves.length - 1].moveId]++;
              }
  
              if(res.players[j].conversions[k].startPercent === 0){
                oppZeroToDeaths++;
              }
  
              if(res.players[j].conversions[k].endPercent > myOppHighestKill){
                myOppHighestKill = res.players[j].conversions[k].endPercent;
              }
              
              if(res.players[j].conversions[k].endPercent < myOppLowestKill){
                myOppLowestKill = res.players[j].conversions[k].endPercent;
              }
            }
  
            switch(res.players[j].conversions[k].openingType){
              case 'neutral-win': 
              if(res.players[j].conversions[k].moves[0])
               { myOppMoveUsageArr.neutralWinMoves[res.players[j].characterId][res.players[j].conversions[k].moves[0].moveId]++;}
                break;
              case 'counter-attack':
                if(res.players[j].conversions[k].moves[0])
                {myOppMoveUsageArr.counterHitMoves[res.players[j].characterId][res.players[j].conversions[k].moves[0].moveId]++;}
                break;
              case 'trade':
                if(res.players[j].conversions[k].moves[0])
                {myOppMoveUsageArr.tradeMoves[res.players[j].characterId][res.players[j].conversions[k].moves[0].moveId]++;}
                break;
              default:
                break;
            }
    
          }
  
          // Action Counts
          myOppActionCountArr[res.players[j].characterId][0] +=  res.players[j].actionCounts.wavedashCount;
          myOppActionCountArr[res.players[j].characterId][1] +=  res.players[j].actionCounts.wavelandCount;
          myOppActionCountArr[res.players[j].characterId][2] +=  res.players[j].actionCounts.airDodgeCount;
          myOppActionCountArr[res.players[j].characterId][3] +=  res.players[j].actionCounts.dashDanceCount;
          myOppActionCountArr[res.players[j].characterId][4] +=  res.players[j].actionCounts.spotDodgeCount;
          myOppActionCountArr[res.players[j].characterId][5] +=  res.players[j].actionCounts.ledgegrabCount;
          myOppActionCountArr[res.players[j].characterId][6] +=  res.players[j].actionCounts.rollCount;
        }
      }
    }
    else{
  
    }
  
  }
  

  console.log('entering exports findall route')
  res.header("Access-Control-Allow-Origin", "*");

  let playerArr = [];

  code = req.query.code;
  let mycode = code ? code.replace("-", "#") : "";
  mycode ? playerArr.push(mycode) : {} ;

  oppcode = req.query.oppcode;
  let myoppcode = oppcode ? oppcode.replace("-", "#") : "" ;
  myoppcode ? playerArr.push(myoppcode) : {} ;

  let chararr = [
    "CAPTAIN_FALCON","DONKEY_KONG","FOX" ,"GAME_AND_WATCH","KIRBY",
    "BOWSER","LINK","LUIGI","MARIO","MARTH","MEWTWO","NESS","PEACH",
    "PIKACHU","ICE_CLIMBERS","JIGGLYPUFF","SAMUS","YOSHI","ZELDA",
    "SHEIK","FALCO","YOUNG_LINK","DR_MARIO","ROY","PICHU","GANONDORF"
  ]

  let stagearr = [
    "FOUNTAIN_OF_DREAMS","POKEMON_STADIUM","YOSHIS_STORY","DREAMLAND",
    "BATTLEFIELD","FINAL_DESTINATION"
  ]

  let completearr = [true,false];

  let characters = [];
  characters = req.query.character !== undefined ? req.query.character : chararr;
  if(!Array.isArray(characters)){
    characters = [characters];
  }

  let oppcharacters = [];
  oppcharacters = req.query.oppcharacter !== undefined ? req.query.oppcharacter : chararr;
  if(!Array.isArray(oppcharacters)){
    oppcharacters = [oppcharacters];
  }

  let stages = "";
  stages = req.query.stage !== undefined ? req.query.stage : stagearr;

  let complete = "";
  complete = req.query.complete !== undefined ? req.query.complete : completearr;
  if(!Array.isArray(complete)){
    complete = [Boolean(complete)];
  }

  let startdate = req.query.start ? req.query.start : "2001";

  let enddate = req.query.end ? new Date(req.query.end): new Date();

  console.log('finding matches')

  co(function*() {
    var docCount = 0;
    var count = 0;
    var limit = 5000;
    var skip = 0;

    do {        
      const cursor = Match.find({
        'players.code':{ $all: playerArr },
        'players' : {$all: [{ $elemMatch : {code: mycode, characterString: {$in : characters} }},
          { $elemMatch : {code: {$ne: mycode}, characterString: {$in : oppcharacters } }}]},
        'settings.stageString' : {$in: stages},
        'metadata.gameComplete': {$in: complete},
        'metadata.startAt' : {
          $gte: startdate,
          $lte: enddate
        }
      }).lean().skip(skip).limit(limit)
      .cursor();

      // console.log('do count: ' + count)
      // console.log('skip: ' + skip)
      docCount = 0;
      
      for (let doc = yield cursor.next(); doc != null; doc = yield cursor.next()) {
        docCount++;
        accumulateStats(mycode, doc);
      }
      
      //console.log(docCount)

      if(count === 0 && docCount === 0){
        console.log('no matches')

        res.send('fail')

        return
      }

      count++;
      skip = count * limit
    } while(docCount !== 0)



      console.log('on end')
      //var stats = getStats(mycode, data)
      // Total Time
      myTotalTime = displayTime(frames);

      // Win Rate
      myWinrate = parseInt((myTotalWins/(myTotalWins+myTotalLosses)) * 100);

      // Openings per KO
      myOpeningsPerKO = myOpenings/myKills ? myOpenings/myKills : 0;
      myOppOpeningsPerKO = myOppOpenings/myOppKills ? myOppOpenings/myOppKills : 0;

      // Conversion Rate
      myConversionRate = parseInt((mySuccessfulConversions/myConversions) * 100) ? parseInt((mySuccessfulConversions/myConversions) * 100) : 0;
      myOppConversionRate = parseInt((myOppSuccessfulConversions/myOppConversions) * 100) ? parseInt((myOppSuccessfulConversions/myOppConversions) * 100) : 0;

      // Damage Per Opening
      myAvgDamagePerOpening = parseInt(myDamage/myOpenings) ? parseInt(myDamage/myOpenings) : 0;
      myOppAvgDamagePerOpening = parseInt(myOppDamage/myOppOpenings) ? parseInt(myOppDamage/myOppOpenings) : 0;

      // Avg KO Percent
      myAvgKOpercent = parseInt(myDamage/myKills) ? parseInt(myDamage/myKills) : 0;
      myOppAvgKOpercent = parseInt(myOppDamage/myOppKills) ? parseInt(myOppDamage/myOppKills) : 0;

      // Avg L Cancel percentage
      myLcancels = parseInt(myTotalLcancel/myTotalMatches);
      myOppLcancels = parseInt(myOppTotalLcancel/myTotalMatches);

      // Avg Stocks Taken
      myAvgStocksTaken = myKills/myTotalMatches;
      myOppAvgStocksTaken = myOppKills/myTotalMatches;

      // Avg Stock Differential
      myAvgStockDifferential = myTotalStockDifferential / myTotalWins ? myTotalStockDifferential / myTotalWins : 0;
      myOppAvgStockDifferential = myOppTotalStockDifferential / myTotalLosses ? myOppTotalStockDifferential / myTotalLosses : 0;

      // IPM
      myIPM = myTotalInputs / myTotalMinutes;
      myOppIPM = myOppTotalInputs / myTotalMinutes;

      myDigitalIPM = myTotalDigitalInputs / myTotalMinutes;
      myOppDigitalIPM = myOppTotalDigitalInputs / myTotalMinutes;

      // Rival 
      var items = Object.keys(oppTally).map(function(key) {
        return [key, oppTally[key][0]];
      });

      items.sort(function(first, second) {
        return second[1] - first[1];
      });

      var myMostUsedCharId = myCharUsage.indexOf(Math.max(...myCharUsage))

      // Match durations
      if(longestGametime === shortestGametime){
        shortestGametime = 0;
      }

      var timerange = longestGametime - shortestGametime;
      var range = Math.ceil(timerange / 10);

      const _ = require("lodash");            
        
      // Using the _.range() method 
      let range_arr = _.range(shortestGametime, longestGametime, range); 

      range_arr.push(range_arr[range_arr.length - 1]+range)

      function between(x, min, max) {
        return x >= min && x <= max;
      }

      var winrange = new Array(10).fill(0);

      var lossrange = new Array(10).fill(0);

      for (let i = 0; i < gametimeWins.length; i++) {
        for (let j = 0; j < winrange.length; j++) {
          if(between(gametimeWins[i], range_arr[j], range_arr[j+1])){
            winrange[j]++
          }           
        }
      }
        
      for (let i = 0; i < gametimeLoss.length; i++) {
        for (let j = 0; j < lossrange.length; j++) {
          if(between(gametimeLoss[i], range_arr[j], range_arr[j+1])){
            lossrange[j]++
          }        
        }
      }

      var rangewinrate = []
      var totalranges = new Array(10).fill(0);

      for (let i = 0; i < winrange.length; i++) {
        rangewinrate[i] = (winrange[i] / (winrange[i] + lossrange[i])) * 100;
        totalranges[i] = winrange[i] + lossrange[i];
      }


      var oneAndDone = 0

      for (let i = 0; i < items.length; i++) {
        if(items[i][1] === 1){
          oneAndDone++;
        }
      }

      var quitoutmyCharUsagePercent = new Array(26).fill(0);
      var quitoutmyOppCharUsagePercent = new Array(26).fill(0);

      for (let i = 0; i < quitoutmyCharUsage.length; i++) {
        quitoutmyCharUsagePercent[i] = quitoutmyCharUsage[i] / myCharUsage[i] ? parseInt((quitoutmyCharUsage[i] / myCharUsage[i])*100) : 0;
        quitoutmyOppCharUsagePercent[i] = quitoutmyOppCharUsage[i] / myOppCharUsage[i] ? parseInt((quitoutmyOppCharUsage[i] / myOppCharUsage[i]) * 100) : 0;
      }

      console.log('creating res obj')

      var resObj = {
        // Summary
        code: mycode,
        totalMatches: myTotalMatches,
        totalTime: myTotalTime,
        totalLRAStart: myTotalLRAStart,
        totalTimeouts: myTotalTimeouts,
        totalWins: myTotalWins,
        totalLosses: myTotalLosses,
        winrate: myWinrate,
      
        // Character Usage
        charUsage : myCharUsage,
        oppCharUsage : myOppCharUsage,
      
        // Characters W/L
        vsCharWins : myVsCharWins,
        vsCharLoss : myVsCharLoss,
      
        asCharWins : myAsCharWins,
        asCharLoss : myAsCharLoss,
      
        stageWins : myStageWins,
        stageLoss : myStageLoss,
      
        // Efficiency
        neutralWins : myNeutralWins,
        oppNeutralWins : myOppNeutralWins,
      
        counterHits : myCounterHits,
        oppCounterHits : myOppCounterHits,
      
        beneficialTrades : myBeneficialTrades,
        oppBeneficialTrades : myOppBeneficialTrades,
      
        openings: myOpenings,
        oppOpenings: myOppOpenings,
      
        kills: myKills,
        oppKills: myOppKills,
      
        openingsPerKO : myOpeningsPerKO,
        oppOpeningsPerKO : myOppOpeningsPerKO,
      
        conversions: myConversions,
        oppConversions: myOppConversions,
      
        successfulConversions: mySuccessfulConversions,
        oppSuccessfulConversions: myOppSuccessfulConversions,
      
        conversionRate : myConversionRate,
        oppConversionRate : myOppConversionRate,
      
        damage: myDamage,
        oppDamage: myOppDamage,
      
        avgDamagePerOpening : myAvgDamagePerOpening,
        oppAvgDamagePerOpening : myOppAvgDamagePerOpening,
      
        avgKOpercent : myAvgKOpercent,
        oppAvgKOpercent : myOppAvgKOpercent,
      
        lcancels : myLcancels,
        oppLcancels : myOppLcancels,
      
        // Stocks
        fourStocks : myFourStocks,
        oppFourStocks : myOppFourStocks,
      
        avgStocksTaken : myAvgStocksTaken,
        oppAvgStocksTaken : myOppAvgStocksTaken,
      
        avgStockDifferential : myAvgStockDifferential,
        oppAvgStockDifferential : myOppAvgStockDifferential,
      
        firstBloods : myFirstBloods,
        oppFirstBloods : myOppFirstBloods,
      
        bestPunish : myBestPunish,
        oppBestPunish : myOppBestPunish,
      
        lowestKill : myLowestKill,
        oppLowestKill : myOppLowestKill,
      
        highestKill : myHighestKill,
        oppHighestKill : myOppHighestKill,
      
        // IPM
        inputsPM : myIPM,
        oppIPM : myOppIPM,
      
        digitalIPM : myDigitalIPM,
        oppDigitalIPM : myOppDigitalIPM,
      
        actionCountArr : myActionCountArr,
        oppActionCountArr : myOppActionCountArr,
      
        // Move Usage
        moveUsageArr : myMoveUsageArr,
        oppMoveUsageArr : myOppMoveUsageArr,
      
        // rival
        rival : items[0][0],
        rivalCharUsage: oppTally[items[0][0]][1],
        rivalsCharId: oppTally[items[0][0]][1].indexOf(Math.max(...oppTally[items[0][0]][1])),
        rivalsColorId: oppTally[items[0][0]][2][oppTally[items[0][0]][1].indexOf(Math.max(...oppTally[items[0][0]][1]))],
        vsRivalWin: oppTally[items[0][0]][3],
        vsRivalLoss: oppTally[items[0][0]][4],
      
        // Match duration
        shortestGametime: shortestGametime,
        longestGametime: longestGametime,
      
        timeRanges: range_arr,
        timeRangeWinrate: rangewinrate,
      
        // Quit outs
        quitoutChars: quitoutmyCharUsage,
        oppQuitoutChars: quitoutmyOppCharUsage,
        quitoutPercent: quitoutmyCharUsagePercent,
        quitoutOppPercent: quitoutmyOppCharUsagePercent,
      
        // opponents
        uniqueOpps: items.length,
        oneAndDoned: oneAndDone,
      
        // death direction
        deathDirectionCharUsage: deathDirectionCharUsage,
        deathDirectionOppCharUsage: deathDirectionOppCharUsage,
      
        // grab
        grabCountSuccessCharUsage: grabCountSuccessCharUsage,
        grabCountWhiffCharUsage: grabCountWhiffCharUsage,
      
        grabCountSuccessOppCharUsage: grabCountSuccessOppCharUsage,
        grabCountWhiffOppCharUsage: grabCountWhiffOppCharUsage,
      
        // throws
        throwCountCharUsage: throwCountCharUsage,
        throwCountOppCharUsage: throwCountOppCharUsage,
      
        // ground tech
        groundTechCountCharUsage: groundTechCountCharUsage,
        groundTechCountOppCharUsage: groundTechCountOppCharUsage,
      
        // wall tech
        wallTechCountSuccessCharUsage: wallTechCountSuccessCharUsage,
        wallTechCountFailCharUsage: wallTechCountFailCharUsage,
      
        wallTechCountSuccessOppCharUsage: wallTechCountSuccessOppCharUsage,
        wallTechCountFailOppCharUsage: wallTechCountFailOppCharUsage,
      
        // credited kills
      
        creditedKills: myCreditedKills,
        oppCreditedKills: myOppCreditedKills,
      
        sdCharUsage: sdCharUsage,
        sdOppCharUsage: sdOppCharUsage,
      
        totalranges: totalranges,
      
        deathUsage: deathUsage,
        deathOppUsage: deathOppUsage,
      
        main: myMostUsedCharId,
        mainColor: myCharColor[myMostUsedCharId],
      
        zeroToDeaths: zeroToDeaths,
        oppZeroToDeaths: oppZeroToDeaths,
      
        oppTally: Object.keys(oppTally).length
      }

      var stats = resObj

      console.log('stats gotten')
      res.end(JSON.stringify(stats));
    });

};

exports.getTotal = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  Match.estimatedDocumentCount().then(data => {
    res.send(data.toString())
  })
}

exports.getPlayers = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  Match.distinct(
    'players.code'
  ).then(data => {

    res.send(data.length.toString())
  })
}

exports.uploadSingle = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  console.log('external endpoint')

  try {
    var myobj = {
      matchid: req.body.matchid,
      settings: {
        isTeams: req.body.settings.isTeams,
        isPal: req.body.settings.isPal,
        stageId: req.body.settings.stageId,
        stageString: req.body.settings.stageString,
      },
      metadata: {
        startAt: req.body.metadata.startAt,
        lastFrame: req.body.metadata.lastFrame,
        minutes: req.body.metadata.minutes,
        gameComplete: req.body.metadata.gameComplete,
        winner: req.body.metadata.winner,
        firstBlood: req.body.metadata.firstBlood
      }, 
      players: [
        {
          playerIndex: req.body.players[0].playerIndex,
          characterId: req.body.players[0].characterId,
          characterColor: req.body.players[0].characterColor,
          code: req.body.players[0].code,
          name: req.body.players[0].name,
          characterString: req.body.players[0].characterString,
          actionCounts: {
            wavedashCount: req.body.players[0].actionCounts.wavedashCount,
            wavelandCount: req.body.players[0].actionCounts.wavelandCount,
            airDodgeCount: req.body.players[0].actionCounts.airDodgeCount,
            dashDanceCount: req.body.players[0].actionCounts.dashDanceCount,
            spotDodgeCount: req.body.players[0].actionCounts.spotDodgeCount,
            ledgegrabCount: req.body.players[0].actionCounts.ledgegrabCount,
            rollCount: req.body.players[0].actionCounts.rollCount
          },
          conversions: req.body.players[0].conversions,
          inputCounts: {
            buttons: req.body.players[0].inputCounts.buttons, // digital inputs
            triggers: req.body.players[0].inputCounts.triggers,
            cstick: req.body.players[0].inputCounts.cstick,
            joystick: req.body.players[0].inputCounts.joystick,
            total: req.body.players[0].inputCounts.total // total inputs
          },
          conversionCount: req.body.players[0].conversionCount,
          totalDamage: req.body.players[0].totalDamage,
          killCount: req.body.players[0].killCount,
          creditedKillCount: req.body.players[0].creditedKillCount,
          successfulConversions: req.body.players[0].successfulConversions,
          openings: req.body.players[0].openings,
          neutralWins: req.body.players[0].neutralWins,
          counterHits: req.body.players[0].counterHits,
          trades: req.body.players[0].trades,
          deathCount: req.body.players[0].deathCount,
          lcancelPercent: req.body.players[0].lcancelPercent,
          grabCount: req.body.players[0].grabCount,
          throwCount: req.body.players[0].throwCount,
          groundTechCount: req.body.players[0].groundTechCount,
          wallTechCount: req.body.players[0].wallTechCount,
          stocks: req.body.players[0].stocks
        },
        {
          playerIndex: req.body.players[1].playerIndex,
          characterId: req.body.players[1].characterId,
          characterColor: req.body.players[1].characterColor,
          code: req.body.players[1].code,
          name: req.body.players[1].name,
          characterString: req.body.players[1].characterString,
          actionCounts: {
            wavedashCount: req.body.players[1].actionCounts.wavedashCount,
            wavelandCount: req.body.players[1].actionCounts.wavelandCount,
            airDodgeCount: req.body.players[1].actionCounts.airDodgeCount,
            dashDanceCount: req.body.players[1].actionCounts.dashDanceCount,
            spotDodgeCount: req.body.players[1].actionCounts.spotDodgeCount,
            ledgegrabCount: req.body.players[1].actionCounts.ledgegrabCount,
            rollCount: req.body.players[1].actionCounts.rollCount
          },
          conversions: req.body.players[1].conversions,
          inputCounts: {
            buttons: req.body.players[1].inputCounts.buttons, // digital inputs
            triggers: req.body.players[1].inputCounts.triggers,
            cstick: req.body.players[1].inputCounts.cstick,
            joystick: req.body.players[1].inputCounts.joystick,
            total: req.body.players[1].inputCounts.total // total inputs
          },
          conversionCount: req.body.players[1].conversionCount,
          totalDamage: req.body.players[1].totalDamage,
          killCount: req.body.players[1].killCount,
          creditedKillCount: req.body.players[1].creditedKillCount,
          successfulConversions: req.body.players[1].successfulConversions,
          openings: req.body.players[1].openings,
          neutralWins: req.body.players[1].neutralWins,
          counterHits: req.body.players[1].counterHits,
          trades: req.body.players[1].trades,
          deathCount: req.body.players[1].deathCount,
          lcancelPercent: req.body.players[1].lcancelPercent,
          grabCount: req.body.players[1].grabCount,
          throwCount: req.body.players[1].throwCount,
          groundTechCount: req.body.players[1].groundTechCount,
          wallTechCount: req.body.players[1].wallTechCount,
          stocks: req.body.players[1].stocks
        }
      ],
    };

    var match = new Match(myobj)

    match
    .save(match)
    .then(data => {
      console.log('inserted match')
      res.send('inserted: ' + data.matchid )
    })
    .catch(err => {
      if(err.code === 11000){        
        console.log('inserted duplicates')
        res.send('duplicates:' + match.matchid)
      }        
    });

  } catch (error) {
    res.send('error bad match format')
  }

}