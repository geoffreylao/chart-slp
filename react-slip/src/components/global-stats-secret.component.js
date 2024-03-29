import React, { Component, 
  //useState 
} from 'react';
import Select from 'react-select';
//import Alert from 'react-bootstrap/Alert';

import PieChart from './charts/pie-chart.component';
import CharBarChart from './charts/char-bar-chart.component';
import QuitoutBarChart from './charts/quitout-bar-chart.component';
import StageBarChart from './charts/stage-bar-chart.component';
import Donut from './charts/donut-chart.component';

import Container from 'react-bootstrap/Container';
import ColorBarChart from './charts/color-bar-chart-secret.component';

import MatchDataService from "../services/match.service";
var globalObjModule = require('./global-stats-secret.js');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1OUIuhXika7TMxu0SfPklH6JUQ4HGArkR3aqW1Wu0tMU');

var char_dict = {
  0: 'CAPTAIN_FALCON',
  1: 'DONKEY_KONG',
  2: 'FOX',
  3: 'GAME_AND_WATCH',
  4: 'KIRBY',
  5: 'BOWSER',
  6: 'LINK',
  7: 'LUIGI',
  8: 'MARIO',
  9: 'MARTH',
  10: 'MEWTWO',
  11: 'NESS',
  12: 'PEACH',
  13: 'PIKACHU',
  14: 'ICE_CLIMBERS',
  15: 'JIGGLYPUFF',
  16: 'SAMUS',
  17: 'YOSHI',
  18: 'ZELDA',
  19: 'SHEIK',
  20: 'FALCO',
  21: 'YOUNG_LINK',
  22: 'DR_MARIO',
  23: 'ROY',
  24: 'PICHU',
  25: 'GANONDORF',
};

var charDict = {
  0: 'https://i.ibb.co/MPC7g2Q/Captain-Falcon.png',
  1: 'https://i.ibb.co/wMgP68L/Donkey-Kong.png',
  2: 'https://i.ibb.co/YPb9X5q/Fox.png',
  3: 'https://i.ibb.co/2h6Nvm0/Game-Watch.png',
  4: 'https://i.ibb.co/wRgh3Wr/Kirby.png',
  5: 'https://i.ibb.co/m699djC/Bowser.png',
  6: 'https://i.ibb.co/sJRtFQF/Link.png',
  7: 'https://i.ibb.co/fVgKMrY/Luigi.png',
  8: 'https://i.ibb.co/q0DvGG6/Mario.png',
  9: 'https://i.ibb.co/nQMZSwp/Marth.png',
  10: 'https://i.ibb.co/rbrpYm1/Mewtwo.png',
  11: 'https://i.ibb.co/h204mHN/Ness.png',
  12: 'https://i.ibb.co/kJkBfJz/Peach.png',
  13: 'https://i.ibb.co/SnBSTt3/Pikachu.png',
  14: 'https://i.ibb.co/gtJYS7s/Ice-Climbers.png',
  15: 'https://i.ibb.co/QrbsqFM/Jigglypuff.png',
  16: 'https://i.ibb.co/TH90YvM/Samus.png',
  17: 'https://i.ibb.co/SwNfkRp/Yoshi.png',
  18: 'https://i.ibb.co/HV3LxWZ/Zelda.png',
  19: 'https://i.ibb.co/gvcMjPN/Sheik.png',
  20: 'https://i.ibb.co/bJDqzSw/Falco.png',
  21: 'https://i.ibb.co/G9Y8xZ3/Young-Link.png',
  22: 'https://i.ibb.co/mGvdwGT/Dr-Mario.png',
  23: 'https://i.ibb.co/Q87fQgv/Roy.png',
  24: 'https://i.ibb.co/FVr7Dh2/Pichu.png',
  25: 'https://i.ibb.co/3TyxwcJ/Ganondorf.png',
};



// BACKGROUND BOREDER HOVER
var colorChartDict = {
  WHITE: ['rgba(192, 192, 192, 0.4)','rgba(100, 100, 100, 1 )','rgba(192, 192, 192, 0.6)'],
  RED: ['rgba(255, 65, 50, 0.2)','rgba(255, 65, 50, 1)','rgba(255, 65, 50, 0.6)'],
  BLUE: ['rgba(154, 162, 235, 0.3)','rgba(50, 5, 150, 0.5)','rgba(154, 162, 235, 0.6)'],
  GREEN: ['rgba(20, 150, 70, 0.2)','rgba(20, 150, 70, 1)','rgba(20, 150, 70, 0.6)'],
  BLACK: ['rgba(15, 15, 15, 0.2)', 'rgba(15, 15, 15, 0.5)','rgba(15, 15, 15, 0.6)'],
  BROWN: ['rgba(170, 85, 0, 0.2)','rgba(170, 85, 0, 1)','rgba(170, 85, 0, 0.6)'],
  PINK:['rgba(255, 99, 255, 0.2)','rgba(255, 99, 255, 1)','rgba(255, 99, 255, 0.6)'],
  YELLOW:['rgba(255, 242, 0, 0.3)','rgba(147, 147, 0, 1)','rgba(255, 242, 0, 0.6)'],
  LIGHTBLUE:['rgba(54, 162, 235, 0.2)','rgba(54, 162, 235, 1)','rgba(54, 162, 235, 0.6)'],
  ORANGE:['rgba(255, 159, 36, 0.2)','rgba(255, 159, 36, 1)', 'rgba(255, 159, 36, 0.6)'],
  PURPLE:['rgba(153, 102, 255, 0.2)','rgba(153, 102, 255, 1)','rgba(153, 102, 255, 0.6)']
}

var charbackgroundColorDict = {
  0: 'rgba(255, 99, 132, 0.2)',
  1: 'rgba(170, 85, 0, 0.2)',
  2: 'rgba(255, 159, 36, 0.2)',
  3: 'rgba(15, 15, 15, 0.2)',
  4: 'rgba(255, 99, 192, 0.2)',
  5: 'rgba(50, 128, 20, 0.2)',
  6: 'rgba(20, 192, 20, 0.2)',
  7: 'rgba(20, 150, 70, 0.2)',
  8: 'rgba(255, 99, 132, 0.2)',
  9: 'rgba(114, 162, 235, 0.2)',
  10: 'rgba(153, 102, 255, 0.2)',
  11: 'rgba(200, 99, 132, 0.2)',
  12: 'rgba(255, 186, 0, 0.3)',
  13: 'rgba(255, 186, 90, 0.3)',
  14: 'rgba(54, 162, 235, 0.2)',
  15: 'rgba(255, 99, 255, 0.2)',
  16: 'rgba(255, 65, 50, 0.2)',
  17: 'rgba(75, 192, 192, 0.2)',
  18: 'rgba(255, 150, 50, 0.3)',
  19: 'rgba(154, 162, 235, 0.3)',
  20: 'rgba(54, 50, 235, 0.2)',
  21: 'rgba(75, 192, 20, 0.2)',
  22: 'rgba(192, 192, 192, 0.4)',
  23: 'rgba(191, 0, 0, 0.2)',
  24: 'rgba(255, 242, 0, 0.3)',
  25: 'rgba(128, 0, 64, 0.3)',
};

var charborderColorDict = {
  0: 'rgba(195, 99, 132, 1)',
  1: 'rgba(170, 85, 0, 1)',
  2: 'rgba(255, 159, 36, 1)',
  3: 'rgba(15, 15, 15, 0.5)',
  4: 'rgba(255, 99, 192, 1)',
  5: 'rgba(50, 128, 20, 1)',
  6: 'rgba(20, 192, 20, 1)',
  7: 'rgba(20, 150, 70, 1)',
  8: 'rgba(255, 99, 132, 1)',
  9: 'rgba(114, 162, 235, 1)',
  10: 'rgba(153, 102, 255, 1)',
  11: 'rgba(200, 99, 132, 1)',
  12: 'rgba(141, 141, 0, 1)',
  13: 'rgba(141, 141, 90, 1)',
  14: 'rgba(54, 162, 235, 1)',
  15: 'rgba(255, 99, 255, 1)',
  16: 'rgba(255, 65, 50, 1)',
  17: 'rgba(75, 192, 192, 1)',
  18: 'rgba(255, 150, 50, 1)',
  19: 'rgba(50, 5, 150, 0.5)',
  20: 'rgba(54, 50, 235, 1)',
  21: 'rgba(75, 192, 20, 1)',
  22: 'rgba(100, 100, 100, 1 )',
  23: 'rgba(191, 0, 0, 1)',
  24: 'rgba(147, 147, 0, 1)',
  25: 'rgba(128, 0, 64, 1)',
};

var charhoverColorDict = {
  0: 'rgba(255, 99, 132, 0.6)',
  1: 'rgba(170, 85, 0, 0.6)',
  2: 'rgba(255, 159, 36, 0.6)',
  3: 'rgba(15, 15, 15, 0.6)',
  4: 'rgba(255, 99, 192, 0.6)',
  5: 'rgba(50, 128, 20, 0.6)',
  6: 'rgba(20, 192, 20, 0.6)',
  7: 'rgba(20, 150, 70, 0.6)',
  8: 'rgba(255, 99, 132, 0.6)',
  9: 'rgba(114, 162, 235, 0.6)',
  10: 'rgba(153, 102, 255, 0.6)',
  11: 'rgba(200, 99, 132, 0.6)',
  12: 'rgba(255, 186, 0, 0.6)',
  13: 'rgba(255, 186, 90, 0.6)',
  14: 'rgba(54, 162, 235, 0.6)',
  15: 'rgba(255, 99, 255, 0.6)',
  16: 'rgba(255, 65, 50, 0.6)',
  17: 'rgba(75, 192, 192, 0.6)',
  18: 'rgba(255, 150, 50, 0.6)',
  19: 'rgba(154, 162, 235, 0.6)',
  20: 'rgba(54, 50, 235, 0.6)',
  21: 'rgba(75, 192, 20, 0.6)',
  22: 'rgba(192, 192, 192, 0.6)',
  23: 'rgba(191, 0, 0, 0.6)',
  24: 'rgba(255, 242, 0, 0.6)',
  25: 'rgba(128, 0, 64, 0.6)',
};

var stageDict = {
  2: 'https://i.ibb.co/RcgQQvB/Fountain.png',
  3: 'https://i.ibb.co/1nfhPdD/Pokemon-Stadium.png',
  4: 'Peachs Castle.png',
  5: 'Kongo Jungle.png',
  6: 'Brinstar.png',
  7: 'Corneria.png',
  8: 'https://i.ibb.co/mFSJfyd/Yoshis-Story.png',
  9: 'Onett.png',
  10: 'Mute City.png',
  11: 'Rainbow Cruise.png',
  12: 'Jungle Japes.png',
  13: 'Great Bay.png',
  14: 'Hyrule Temple.png',
  15: 'Brinstar Depths.png',
  16: 'Yoshis Island.png',
  17: 'Green Greens.png',
  18: 'Fourside.png',
  19: 'Mushroom Kingdom.png',
  20: 'Mushroom Kingdom 2.png',
  22: 'Venom.png',
  23: 'Poke Floats.png',
  24: 'Big Blue.png',
  25: 'Icicle Mountain.png',
  26: 'Icetop.png',
  27: 'Flat Zone.png',
  28: 'https://i.ibb.co/9by4DY6/Dreamland.png',
  29: 'Yoshis Island N64.png',
  30: 'Kongo Jungle N64.png',
  31: 'https://i.ibb.co/xCsmTzq/Battlefield.png',
  32: 'https://i.ibb.co/dDVC3rJ/Final-Destination.png',
};

var stagebackgroundColorDict = {
  2: 'rgba(79, 60, 97, 0.3)', // rgb(79,60,97)
  3: 'rgba(141, 186, 145, 0.4)', //rgb(78,101,80)
  4: 'rgba(255, 99, 132, 0.2)',
  5: 'rgba(255, 99, 132, 0.2)',
  6: 'rgba(255, 99, 132, 0.2)',
  7: 'rgba(255, 99, 132, 0.2)',
  8: 'rgba(151,195,134, 0.3)', //rgb(151,195,134)
  9: 'rgba(255, 99, 132, 0.2)',
  10: 'rgba(255, 99, 132, 0.2)',
  11: 'rgba(255, 99, 132, 0.2)',
  12: 'rgba(255, 99, 132, 0.2)',
  13: 'rgba(255, 99, 132, 0.2)',
  14: 'rgba(255, 99, 132, 0.2)',
  15: 'rgba(255, 99, 132, 0.2)',
  16: 'rgba(255, 99, 132, 0.2)',
  17: 'rgba(255, 99, 132, 0.2)',
  18: 'rgba(255, 99, 132, 0.2)',
  19: 'rgba(255, 99, 132, 0.2)',
  20: 'rgba(255, 99, 132, 0.2)',
  22: 'rgba(255, 99, 132, 0.2)',
  23: 'rgba(255, 99, 132, 0.2)',
  24: 'rgba(255, 99, 132, 0.2)',
  25: 'rgba(255, 99, 132, 0.2)',
  26: 'rgba(255, 99, 132, 0.2)',
  27: 'rgba(255, 99, 132, 0.2)',
  28: 'rgba(117, 191, 226, 0.4)', //rgb(117,191,226)
  29: 'rgba(255, 99, 132, 0.2)',
  30: 'rgba(255, 99, 132, 0.2)',
  31: 'rgba(33, 35, 48, 0.3)', //rgb(33,35,48)
  32: 'rgba(54, 15, 127, 0.3)', //rgb(54,15,127)
};

var stageborderColorDict = {
  2: 'rgba(28, 1, 54, 1)',
  3: 'rgba(78,101,80, 1)',
  4: 'rgba(255, 99, 132, 0.2)',
  5: 'rgba(255, 99, 132, 0.2)',
  6: 'rgba(255, 99, 132, 0.2)',
  7: 'rgba(255, 99, 132, 0.2)',
  8: 'rgba(18, 140, 99, 1)',
  9: 'rgba(255, 99, 132, 0.2)',
  10: 'rgba(255, 99, 132, 0.2)',
  11: 'rgba(255, 99, 132, 0.2)',
  12: 'rgba(255, 99, 132, 0.2)',
  13: 'rgba(255, 99, 132, 0.2)',
  14: 'rgba(255, 99, 132, 0.2)',
  15: 'rgba(255, 99, 132, 0.2)',
  16: 'rgba(255, 99, 132, 0.2)',
  17: 'rgba(255, 99, 132, 0.2)',
  18: 'rgba(255, 99, 132, 0.2)',
  19: 'rgba(255, 99, 132, 0.2)',
  20: 'rgba(255, 99, 132, 0.2)',
  22: 'rgba(255, 99, 132, 0.2)',
  23: 'rgba(255, 99, 132, 0.2)',
  24: 'rgba(255, 99, 132, 0.2)',
  25: 'rgba(255, 99, 132, 0.2)',
  26: 'rgba(255, 99, 132, 0.2)',
  27: 'rgba(255, 99, 132, 0.2)',
  28: 'rgba(46, 85, 209, 1)',
  29: 'rgba(255, 99, 132, 0.2)',
  30: 'rgba(255, 99, 132, 0.2)',
  31: 'rgba(33, 35, 48, 1)',
  32: 'rgba(54, 15, 127, 1)',
};

function showTwoDigits(number) {
  return ('00' + number).slice(-2);
}

function displayTime(currentFrame) {
  var fps = 60;
  var d = Math.floor(currentFrame / (24 * 60 * 60 * fps))
  var h = Math.floor(currentFrame / (60 * 60 * fps) % 24);
  var m = Math.floor(currentFrame / (60 * fps)) % 60;
  var s = Math.floor(currentFrame / fps) % 60;
  var f = currentFrame % fps;
  return (
    d.toLocaleString() + " days " + h + ' hours ' + showTwoDigits(m) + ' minutes ' + showTwoDigits(s) + ' seconds and    ' + showTwoDigits(f) + ' frames'
  );
}

function populateMUChart(charUsage, charWins, charLoss){
  var dict = {};
  var windict = {};
  var lossdict = {};

  for (let i = 0; i < charUsage.length; i++) {
    dict[i] = charUsage[i];
    windict[i] = charWins[i];
    lossdict[i] = charLoss[i];
  }

  var items = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });

  var charData = [];

  for (let j = 0; j < items.length; j++) {
    if (items[j][1] !== 0) {

      var wins = charWins[items[j][0]];
      var loss = charLoss[items[j][0]];

      if (wins === 0) {
        charData.push(0);
      } else {
        charData.push(Math.round((wins / (wins + loss)) * 100));
      }

      var tierlistOrder = [
        2, 9, 15, 20, 19, 0, 12, 14, 13, 17, 16, 7, 22, 25, 8, 1, 21, 6, 3, 10, 23,
        24, 11, 18, 4, 5,
      ];
      var tierlistData = [];
    
      for (let i = 0; i < tierlistOrder.length; i++) {
        tierlistData[i] = charData[tierlistOrder[i]];
      }
    
     
    }
  }

 // console.log('ordered: ' + tierlistData);
  return(tierlistData);
}

function add(accumulator, a) {
  return accumulator + a;
}

function parseGlobalCharWinrate(
  globalCharStageWins,
  globalCharStageLoss,
  charId
) {
  let resultsObj = {
    charUsage: Array(26).fill(0),
    charWins: Array(26).fill(0),
    charLoss: Array(26).fill(0),
  };

  for (let i = 0; i < 26; i++) {
    resultsObj.charWins[i] = globalCharStageWins[charId][i]
      .flat()
      .reduce(add, 0);
    resultsObj.charUsage[i] += globalCharStageWins[charId][i]
      .flat()
      .reduce(add, 0);

    resultsObj.charLoss[i] = globalCharStageLoss[charId][i]
      .flat()
      .reduce(add, 0);
    resultsObj.charUsage[i] += globalCharStageLoss[charId][i]
      .flat()
      .reduce(add, 0);
  }

  return resultsObj;
}

function parseGlobalFirstBloodCharWinrate(
  globalCharFirstBloodWins,
  globalCharFirstBloodLoss,
  charId
){
  let resultsObj = {
    charUsage: Array(26).fill(0),
    charWins: Array(26).fill(0),
    charLoss: Array(26).fill(0),
  };

  for (let i = 0; i < 26; i++) {
    resultsObj.charWins[i] = globalCharFirstBloodWins[charId][i]
    resultsObj.charUsage[i] += globalCharFirstBloodWins[charId][i]

    resultsObj.charLoss[i] = globalCharFirstBloodLoss[charId][i]
    resultsObj.charUsage[i] += globalCharFirstBloodLoss[charId][i] 
  }

  return resultsObj;
}

function createPieChartCharacterUsage(charUsage, title, labelBool) {
  var dict = {};

  for (let i = 0; i < charUsage.length; i++) {
    dict[i] = charUsage[i];
  }

  var items = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });

  items.sort(function (first, second) {
    return second[1] - first[1];
  });

  var charLabels = [];
  var charData = [];
  var charImage = [];
  var charbackgroundColor = [];
  var charborderColor = [];
  var charhoverColor = [];
  var sum = charUsage.reduce(function (a, b) {
    return a + b;
  }, 0);

  for (let j = 0; j < items.length; j++) {
    if (items[j][1] !== 0) {
      charLabels.push(
        charDict[items[j][0]]
          .substring(charDict[items[j][0]].lastIndexOf('/') + 1)
          .replace('.png', '') +
          ' (' +
          items[j][1] +
          ' games)'
      );
      charData.push(items[j][1]);

      if (items[j][1] / sum > 0.06) {
        charImage.push({
          src: charDict[items[j][0]],
          width: 32,
          height: 32,
        });
      }

      charbackgroundColor.push(charbackgroundColorDict[items[j][0]]);
      charborderColor.push(charborderColorDict[items[j][0]]);
      charhoverColor.push(charhoverColorDict[items[j][0]]);
    }
  }

  return (
    <PieChart
      charData={charData}
      charLabels={charLabels}
      charImage={charImage}
      charbackgroundColor={charbackgroundColor}
      charborderColor={charborderColor}
      charhoverBackgroundColor={charhoverColor}
      title={title}
      labelBool={labelBool}
    />
  );
}

function createBarChartCharacterWinrate(
  myDict,
  charUsage,
  charWins,
  charLoss,
  title
) {
  var dict = {};
  var windict = {};
  var lossdict = {};

  var tierlistOrder = [
    2, 9, 15, 20, 19, 0, 12, 14, 13, 17, 16, 7, 22, 25, 8, 1, 21, 6, 3, 10, 23,
    24, 11, 18, 4, 5,
  ];

  for (let i = 0; i < charUsage.length; i++) {
    dict[i] = charUsage[i];
    windict[i] = charWins[i];
    lossdict[i] = charLoss[i];
  }

  var items = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });

  
  //console.log(items)

  var tempItems = [...Array(26)].map(e => Array(2));

  for (let i = 0; i < items.length; i++) {
    tempItems[i][0] = items[tierlistOrder[i]][0];
    tempItems[i][1] = items[tierlistOrder[i]][1];
    
  }

  items = tempItems;
  // items.sort(function (first, second) {
  //   return second[1] - first[1];
  // });

  var charLabels = [];
  var charData = [];
  var charImage = [];
  var charbackgroundColor = [];
  var charborderColor = [];

  for (let j = 0; j < items.length; j++) {
    if (items[j][1] !== 0) {
      var str = myDict[items[j][0]];
      charLabels.push(
        str.substring(str.lastIndexOf('/') + 1).replace('.png', '') +
          ' (' +
          items[j][1] +
          ' games)'
      );

      var wins = charWins[items[j][0]];
      var loss = charLoss[items[j][0]];

      if (wins === 0) {
        charData.push(0);
      } else {
        charData.push(Math.round((wins / (wins + loss)) * 100));
      }

      charImage.push(myDict[items[j][0]]);
      charbackgroundColor.push(charbackgroundColorDict[items[j][0]]);
      charborderColor.push(charborderColorDict[items[j][0]]);
    }
  }
  // "FOX","MARTH","JIGGLYPUFF","FALCO",
  // "SHEIK","CAPTAIN_FALCON","PEACH",
  // "ICE_CLIMBERS","PIKACHU","YOSHI","SAMUS",
  // "LUIGI","DR_MARIO",
  // "GANONDORF","MARIO",
  // "DONKEY_KONG","YOUNG_LINK","LINK","GAME_AND_WATCH",
  // "MEWTWO","ROY","PICHU","NESS","ZELDA",
  // "KIRBY","BOWSER"

 
  // var tierlistData = [];

  // //console.log('c' + charData);

  

  //console.log('ordered: ' + tierlistData);

  return (
    <CharBarChart
      charData={charData}
      charLabels={charLabels}
      charImage={charImage}
      charbackgroundColor={charbackgroundColor}
      charborderColor={charborderColor}
      title={title}
      type='char'
    />
  );
}

function createQuitoutBarChartCharacterUsage(charUsage, title, labelBool) {
  var dict = {};

  for (let i = 0; i < charUsage.length; i++) {
    dict[i] = charUsage[i];
  }

  var items = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });

  items.sort(function (first, second) {
    return second[1] - first[1];
  });

  var charLabels = [];
  var charData = [];
  var charImage = [];
  var charbackgroundColor = [];
  var charborderColor = [];
  var charhoverColor = [];

  for (let j = 0; j < items.length; j++) {
    if (items[j][1] !== 0) {
      charLabels.push(
        charDict[items[j][0]]
          .substring(charDict[items[j][0]].lastIndexOf('/') + 1)
          .replace('.png', '')
      );
      charData.push(items[j][1]);

      charImage.push({
        src: charDict[items[j][0]],
        width: 32,
        height: 32,
      });

      charbackgroundColor.push(charbackgroundColorDict[items[j][0]]);
      charborderColor.push(charborderColorDict[items[j][0]]);
      charhoverColor.push(charhoverColorDict[items[j][0]]);
    }
  }

  return (
    <QuitoutBarChart
      charData={charData}
      charLabels={charLabels}
      charImage={charImage}
      charbackgroundColor={charbackgroundColor}
      charborderColor={charborderColor}
      charhoverBackgroundColor={charhoverColor}
      title={title}
      labelBool={labelBool}
    />
  );
}

function getQuitOutPercent(quitout, usage) {
  let quitoutPercent = Array(26).fill(0);

  for (let i = 0; i < 26; i++) {
    quitoutPercent[i] = Math.round((quitout[i] / usage[i]) * 100);
  }

  return quitoutPercent;
}

function createBarChartStageWinrate(myDict, stageWins, stageLoss, title) {
  var stageUsage = [];
  for (let k = 0; k < stageWins.length; k++) {
    stageUsage[k] = stageWins[k] + stageLoss[k];
  }

  var dict = {};
  var windict = {};
  var lossdict = {};

  for (let i = 0; i < stageUsage.length; i++) {
    dict[i] = stageUsage[i];
    windict[i] = stageWins[i];
    lossdict[i] = stageLoss[i];
  }

  var items = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });

  items.sort(function (first, second) {
    return second[1] - first[1];
  });

  var stageLabels = [];
  var stageData = [];
  var stageImage = [];
  var stagebackgroundColor = [];
  var stageborderColor = [];

  for (let j = 0; j < items.length; j++) {
    if (items[j][1] !== 0) {
      stageLabels.push(
        myDict[items[j][0]]
          .substring(myDict[items[j][0]].lastIndexOf('/') + 1)
          .replace('.png', '') +
          ' (' +
          items[j][1] +
          ' games)'
      );

      var wins = stageWins[items[j][0]];
      var loss = stageLoss[items[j][0]];

      if (wins === 0) {
        stageData.push(0);
      } else {
        stageData.push(Math.round((wins / (wins + loss)) * 100));
      }

      stageImage.push(myDict[items[j][0]]);
      stagebackgroundColor.push(stagebackgroundColorDict[items[j][0]]);
      stageborderColor.push(stageborderColorDict[items[j][0]]);
    }
  }

  return (
    <StageBarChart
      stageData={stageData.slice(0, 6)}
      stageLabels={stageLabels.slice(0, 6)}
      stageImage={stageImage}
      stagebackgroundColor={stagebackgroundColor}
      stageborderColor={stageborderColor}
      title={title}
      type='stage'
    />
  );
}

function parseCharStageWinLoss(charStageWinLossArr, charId) {
  var stageWinLossArr = Array(33).fill(0);

  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < 33; j++) {
      stageWinLossArr[j] += charStageWinLossArr[charId][i][j];
    }
  }

  return stageWinLossArr;
}

function parseP1vsP2StageWinLoss(charStageWinLossArr, charId, oppCharId) {
  var stageWinLossArr = Array(33).fill(0);

  for (let j = 0; j < 33; j++) {
    stageWinLossArr[j] += charStageWinLossArr[charId][oppCharId][j];
  }

  return stageWinLossArr;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function parseVsCharWinrate(
  charStageWinsArr,
  charStageLossArr,
  charId,
  oppCharId
) {
  let winLossObj = {
    totalLosses: 0,
    totalWins: 0,
  };

  winLossObj.totalWins += charStageWinsArr[charId][oppCharId]
    .flat()
    .reduce(add, 0);
  winLossObj.totalLosses += charStageLossArr[charId][oppCharId]
    .flat()
    .reduce(add, 0);

  return winLossObj;
}

function createCharColorBarChart(charId, charColorsArr, title) {
  let charColorLengthDict = {
    0: 6,
    1: 5,
    2: 4,
    3: 4,
    4: 6,
    5: 4,
    6: 5,
    7: 4,
    8: 5,
    9: 5,
    10: 4,
    11: 4,
    12: 5,
    13: 4,
    14: 4,
    15: 5,
    16: 5,
    17: 6,
    18: 5,
    19: 5,
    20: 4,
    21: 5,
    22: 5,
    23: 5,
    24: 4,
    25: 5,
  };

  var charColorDict = {
    0: ['Blue','Black','Red','Pink','Green','LightBlue'],
    1: ['Brown','Black','Red','Blue','Green'],
    2: ['White', 'Red', 'Blue', 'Green'],
    3: ['Black','Red','Blue','Green'],
    4: ['Pink','Yellow','Blue','Red','Green','Black'],
    5: ['Green','Red','Blue','Black'],
    6: ['Green','Red','Blue','Black','White'],
    7: ['Green','White','LightBlue','Pink'],
    8: ['Red','Yellow','Black','Blue','Green'],
    9: ['Blue','Red','Green','Black','White'],
    10: ['Purple','Yellow','Blue','Green'],
    11: ['Red','Yellow','Blue','Green'],
    12: ['Pink','Yellow','White','Blue','Green'],
    13: ['Yellow','Red','Blue','Green'],
    14: ['Blue','Green','orange','Red'],
    15: ['Pink','Red','Blue','Green','Yellow'],
    16: ['orange','Pink','Brown','Green','Purple'],
    17: ['Green','Red','Blue','Yellow','Pink','LightBlue'],
    18: ['Pink','Red','Blue','Green','Purple'],
    19: ['Blue','Red','LightBlue','Green','Blue'],
    20: ['White','Red','Blue','Green'],
    21: ['Green','Red','Blue','White','Black'],
    22: ['White','Pink','LightBlue','Green','Black'],
    23: ['LightBlue','Red','Blue','Green','Yellow'],
    24: ['Yellow','Red','Blue','Green'],
    25: ['Brown','Red','Blue','Green','Purple'],
  };

  let colorLength = charColorLengthDict[charId];

  charColorsArr[charId] = charColorsArr[charId].slice(0, colorLength);

  let charImage = [];
  let colorData = [];
  let borderColor = [];
  let backgroundColor = [];
  let labels = [];

  for (let i = 0; i < charColorsArr[charId].length; i++) {
    charImage.push(`${charId}/${i}.png`);
    colorData.push(charColorsArr[charId][i]);

    var color = charColorDict[charId][i].toUpperCase()
    backgroundColor.push(colorChartDict[color][0]);

    borderColor.push(colorChartDict[color][1])
  }
  labels = (charColorDict[charId]);

  // console.log(colorData)
  // console.log(charImage)

  return (
    <ColorBarChart colorData={colorData} labels = {labels} borderColor = {borderColor} backgroundColor = {backgroundColor} charImage={charImage} title={title} />
  );
}

// function AlertDismissible() {
//   const [show, setShow] = useState(true);

//   return (
//     <Alert
//       variant='secondary'
//       show={show}
//       onClose={() => setShow(false)}
//       dismissible
//     >
//       <p className='alert'>
//         Database is down for maitenance! Sorry for the inconvenience!
//       </p>
//     </Alert>
//   );
// }

export default class Secret extends Component {
  constructor(props) {
    super(props);
    this.handleCheckChange = this.handleCheckChange.bind(this);

    this.state = {
      gamesTotal: 0,
      playersTotal: 0,
      // 366 803
      globalStats: globalObjModule.globalStats,

      charPieCheck: false,
      selectCharacters: [],
      P1char: {
        value: 'FOX',
        label: {
          type: 'div',
          key: null,
          ref: null,
          props: {
            children: [
              {
                type: 'img',
                key: null,
                ref: null,
                props: {
                  src: 'stock_icons/Fox.png',
                  height: '30px',
                  width: '30px',
                  alt: '',
                },
                _owner: null,
                _store: {},
              },
              ' ',
              'Fox',
            ],
          },
          _owner: null,
          _store: {},
        },
      },
      P2char: {
        value: 'JIGGLYPUFF',
        label: {
          type: 'div',
          key: null,
          ref: null,
          props: {
            children: [
              {
                type: 'img',
                key: null,
                ref: null,
                props: {
                  src: 'stock_icons/Jigglypuff.png',
                  height: '30px',
                  width: '30px',
                  alt: '',
                },
                _owner: null,
                _store: {},
              },
              ' ',
              'Fox',
            ],
          },
          _owner: null,
          _store: {},
        },
      },
      P1vsP2: {},
      P1vsGlobal: {},
      P1vsFirstBlood: {}
    };
  }

  async connect() {
    MatchDataService.getSheet().then(response => {

      doc.useServiceAccountAuth({
        // env var values are copied from service account credentials generated by google
        // see "Authentication" section in docs for more info
        client_email: "chartslp-service-account@chartslp.iam.gserviceaccount.com",
        private_key: response.data.private_key
      });

      console.log("connect()")
      
    })
  };

  async getCharacters() {
    let chararr = [
      'FOX',
      'MARTH',
      'JIGGLYPUFF',
      'FALCO',
      'SHEIK',
      'CAPTAIN_FALCON',
      'PEACH',
      'ICE_CLIMBERS',
      'PIKACHU',
      'YOSHI',
      'SAMUS',
      'LUIGI',
      'DR_MARIO',
      'GANONDORF',
      'MARIO',
      'DONKEY_KONG',
      'YOUNG_LINK',
      'LINK',
      'GAME_AND_WATCH',
      'MEWTWO',
      'ROY',
      'PICHU',
      'NESS',
      'ZELDA',
      'KIRBY',
      'BOWSER',
    ];

    let charpng = [
      'Fox.png',
      'Marth.png',
      'Jigglypuff.png',
      'Falco.png',
      'Sheik.png',
      'Captain Falcon.png',
      'Peach.png',
      'Ice Climbers.png',
      'Pikachu.png',
      'Yoshi.png',
      'Samus.png',
      'Luigi.png',
      'Dr. Mario.png',
      'Ganondorf.png',
      'Mario.png',
      'Donkey Kong.png',
      'Young Link.png',
      'Link.png',
      'Game & Watch.png',
      'Mewtwo.png',
      'Roy.png',
      'Pichu.png',
      'Ness.png',
      'Zelda.png',
      'Kirby.png',
      'Bowser.png',
    ];

    const characters = chararr.map((x, i) => ({
      value: x,
      label: (
        <div>
          <img
            src={`stock_icons/${charpng[i]}`}
            height='30px'
            width='30px'
            alt=''
          />{' '}
          {charpng[i].split('.').slice(0, -1).join('.')}
        </div>
      ),
    }));

    this.setState({ selectCharacters: characters });
  }

  async populateSheet(gstats){
    var tierlistOrder = [
      2, 9, 15, 20, 19, 0, 12, 14, 13, 17, 16, 7, 22, 25, 8, 1, 21, 6, 3, 10, 23,
      24, 11, 18, 4, 5,
    ];
  
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
    const sheet = doc.sheetsByIndex[0];
  
    await sheet.loadCells('A1:AA27'); // loads range of cells into local cache - DOES NOT RETURN THE CELLS
  
    for (let i = 0; i < tierlistOrder.length; i++) {
      let char = parseGlobalCharWinrate(gstats.gloabalCharStageWins, gstats.globalCharStageLoss, tierlistOrder[i]);
      let chararr = populateMUChart(char.charUsage, char.charWins, char.charLoss);
      //let myarr = []
  
      for (let j = 0; j < 26; j++) {
        if (i !== j) {
          let cell = sheet.getCell(i+1, j+1)
          //myarr.push(chararr[j]);
          cell.value = chararr[j];
        }
       
        
      }
  
     // console.log(i + " : " + myarr);
    }
    await sheet.saveUpdatedCells();
  }

  async getStages() {
    let stagearr = [
      'FOUNTAIN_OF_DREAMS',
      'POKEMON_STADIUM',
      'YOSHIS_STORY',
      'DREAMLAND',
      'BATTLEFIELD',
      'FINAL_DESTINATION',
    ];

    let stagepng = [
      'Fountain.png',
      'Pokemon Stadium.png',
      'Yoshis Story.png',
      'Dreamland.png',
      'Battlefield.png',
      'Final Destination.png',
    ];

    const stages = stagearr.map((x, i) => ({
      value: x,
      label: (
        <div>
          <img
            src={`stage_icons/${stagepng[i]}`}
            height='30px'
            width='30px'
            alt=''
          />{' '}
          {stagepng[i].split('.').slice(0, -1).join('.')}
        </div>
      ),
    }));

    this.setState({ selectStages: stages });
  }

  myCharChange(e) {
    //console.log(e)
    this.setState({ P1char: e });

    this.setState({
      P1vsP2: parseVsCharWinrate(
        this.state.globalStats.gloabalCharStageWins,
        this.state.globalStats.globalCharStageLoss,
        Math.round(getKeyByValue(char_dict, e.value)),
        Math.round(getKeyByValue(char_dict, this.state.P2char.value))
      ),
    });

    this.setState({
      P1vsGlobal: parseGlobalCharWinrate(
        this.state.globalStats.gloabalCharStageWins,
        this.state.globalStats.globalCharStageLoss,
        Math.round(getKeyByValue(char_dict, e.value))
      ),
    });

    this.setState({
      P1vsFirstBlood: parseGlobalFirstBloodCharWinrate(
        this.state.globalStats.globalCharFirstBloodWins,
        this.state.globalStats.globalCharFirstBloodLoss,
        Math.round(getKeyByValue(char_dict, e.value))
      ),
    });
  }

  oppCharChange(e) {
    this.setState({ P2char: e });

    this.setState({
      P1vsP2: parseVsCharWinrate(
        this.state.globalStats.gloabalCharStageWins,
        this.state.globalStats.globalCharStageLoss,
        Math.round(getKeyByValue(char_dict, this.state.P1char.value)),
        Math.round(getKeyByValue(char_dict, e.value))
      ),
    });
  }

  handleCheckChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    this.getCharacters();
    this.getStages();
    this.connect()

    this.setState({
      P1vsP2: parseVsCharWinrate(
        this.state.globalStats.gloabalCharStageWins,
        this.state.globalStats.globalCharStageLoss,
        Math.round(getKeyByValue(char_dict, this.state.P1char.value)),
        Math.round(getKeyByValue(char_dict, this.state.P2char.value))
      ),

    });

    MatchDataService.getPlayers().then(response => {
      this.setState({
        playersTotal: response.data
      })
      console.log(response.data)
    })

    MatchDataService.getAll().then(response => {
      this.setState({
        gamesTotal: response.data
      })
      console.log(response.data)
    })

    MatchDataService.getGlobal().then(response =>{
      console.log(response.data);
      this.setState({
        globalStats: response.data,     
      },()=>{
        this.populateSheet(this.state.globalStats);
        this.setState({
          P1vsP2: parseVsCharWinrate(
            this.state.globalStats.gloabalCharStageWins,
            this.state.globalStats.globalCharStageLoss,
            Math.round(getKeyByValue(char_dict, this.state.P1char.value)),
            Math.round(getKeyByValue(char_dict, this.state.P2char.value))
          ),
          P1vsGlobal: parseGlobalCharWinrate(
            this.state.globalStats.gloabalCharStageWins,
            this.state.globalStats.globalCharStageLoss,
            Math.round(getKeyByValue(char_dict, this.state.P1char.value))
          ),
         
            P1vsFirstBlood: parseGlobalFirstBloodCharWinrate(
              this.state.globalStats.globalCharFirstBloodWins,
              this.state.globalStats.globalCharFirstBloodLoss,
              Math.round(getKeyByValue(char_dict,  this.state.P1char.value))
            ),
        
        })
      })
    })
  }

  componentWillMount() {
    this.setState({
      //  globalStats: response.data,
        P1vsGlobal: parseGlobalCharWinrate(
          this.state.globalStats.gloabalCharStageWins,
          this.state.globalStats.globalCharStageLoss,
          Math.round(getKeyByValue(char_dict, this.state.P1char.value))
        ),
        P1vsFirstBlood: parseGlobalFirstBloodCharWinrate(
          this.state.globalStats.globalCharFirstBloodWins,
          this.state.globalStats.globalCharFirstBloodLoss,
          Math.round(getKeyByValue(char_dict,  this.state.P1char.value))
        ),
      })
      
      


    //   console.log(this.state.globalStats);
    // })

  //  console.log(this.state.globalStats)


  }

  render() {
    const { globalStats, P1vsP2, P1vsGlobal, 
      P1vsFirstBlood 
    } = this.state;

    return (
      <div className='container mt-3'>
        {/* <AlertDismissible/> */}
        <div className='list row'>
          <div className='col-md-12'>
            <Container fluid>            
        

              <div className='row'>
                <div className='col-lg-12 globalstats'>
                  <div className='chartDivPie'>
                    {createPieChartCharacterUsage(
                      globalStats.globalCharUsage,
                      'Global Character Usage',
                      this.state.charPieCheck
                    )}
                  </div>
                  <div className='seperator'>
                    <label>
                      <input
                        name='charPieCheck'
                        type='checkbox'
                        checked={this.state.charPieCheck}
                        onChange={this.handleCheckChange}
                      />
                      &nbsp; Show labels
                    </label>
                    <hr></hr>
                  </div>
                </div>  
              </div>

              <div>   
                <h3 id='searchParams'>Data from {this.state.gamesTotal ? this.state.gamesTotal.toLocaleString() : '------'} Matches 
                and {this.state.playersTotal ? this.state.playersTotal.toLocaleString() : '-----'}  Unique Players!</h3>
                <h3 id='searchParams'>{displayTime(this.state.globalStats.globalFrames)} of Melee played!</h3>
                <h3 id='searchParams'>
                  &nbsp; {this.state.globalStats.globalFalcoLasers.toLocaleString()} 
          
          &nbsp;Falco Lasers landed and counting..    &nbsp;
          <img
            src={`stock_icons/Falco.png`}
            height='30px'
            width='30px'
            alt=''
          />&nbsp;
           <img
            src={`Red_laser.png`}
            height='30px'
            width='150px'
            alt=''
          />    &nbsp;

<img
            src={`Red_laser.png`}
            height='30px'
            width='150px'
            alt=''
          />
          </h3>
                <hr></hr>
              </div>
              <h3 id='searchParams'>Global Matchup Chart</h3>
      
              
          
              <div id="Iframe-Liason-Sheet" class="iframe-border center-block-horiz">
 <div class="responsive-wrapper responsive-wrapper-wxh-550x2000">
   <iframe title="test" scrolling="no" seamless="seamless" frameBorder="0" src="https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vTWawPzfAF1Xwba0NAkud-04LDVe16hB27pcGVJM7JIHKQm1YkbzqTO4MtStIolY6ir3wcZteeGwgZO/pubhtml?gid=299811758&amp;single=true&amp;widget=false&amp;headers=false&amp;rm=minimal&amp;&chrome=false&format=image"> 
     <p style={{"font-size": "110%"}}><em><strong>ERROR: </strong>An iframe should be displayed here but your browser version does not support iframes.</em> Please update your browser to its most recent version and try again.</p>
   </iframe>
 </div>
</div> 






            
           
       
              <hr/>
           

              <div className='row'>
                <div className='col-lg-12 globalstats'>
                  <div className='chartDiv'>
                    {createBarChartCharacterWinrate(
                      charDict,
                      globalStats.globalCharUsage,
                      globalStats.globalCharWins,
                      globalStats.globalCharLoss,
                      `Global Character Winrate %`
                    )}
                  </div>
                  <hr></hr>
                </div>
              </div>      

              <div className='row'>
                <div className='col-lg-12 globalstats'>
                  <div className='chartDiv'>
                    {createQuitoutBarChartCharacterUsage(
                      getQuitOutPercent(
                        this.state.globalStats.globalCharQuitout,
                        this.state.globalStats.globalCharUsage
                      ),
                      'Global Character % of Matches Ending in LRAStart',
                      this.state.charPieCheck
                    )}
                  </div>
                  <hr></hr>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12 globalSelectBoxDiv'>
                  <h2 id='searchParams'>Detailed Breakdown</h2>
                  <Select
                    className='selectBox globalSelectBox'
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    options={this.state.selectCharacters}
                    onChange={this.myCharChange.bind(this)}
                    placeholder='Character'
                  />             
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12 globalstats'>
                  <div className='chartDiv'>
                    {createBarChartCharacterWinrate(
                      charDict,
                      P1vsGlobal.charUsage,
                      P1vsGlobal.charWins,
                      P1vsGlobal.charLoss,
                      `${this.state.P1char.label.props.children[0].props.src
                        .replace('.png', '')
                        .replace(
                          'stock_icons/',
                          ''
                        )} vs Global Character Winrate %`
                    )}
                  </div>
                  <hr></hr>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12 globalstats'>
                  <div className='chartDiv'>
                    {createBarChartCharacterWinrate(
                      charDict,
                      P1vsFirstBlood.charUsage,
                      P1vsFirstBlood.charWins,
                      P1vsFirstBlood.charLoss,
                      `${this.state.P1char.label.props.children[0].props.src
                        .replace('.png', '')
                        .replace(
                          'stock_icons/',
                          ''
                        )} Win % After Taking First Stock`
                    )}
                  </div>
                  <hr></hr>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12 globalSelectBoxDiv'>              
                  <Select
                    className='selectBox globalSelectBox'
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    options={this.state.selectCharacters}
                    onChange={this.myCharChange.bind(this)}
                    placeholder='Character'
                  />                  
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12 globalstats'>
                  <div className='chartDiv'>
                    {createCharColorBarChart(
                      Math.round(
                        getKeyByValue(char_dict, this.state.P1char.value)
                      ),
                      globalStats.globalCharColor,
                      `${this.state.P1char.label.props.children[0].props.src
                        .replace('.png', '')
                        .replace('stock_icons/', '')} Colors`
                    )}
                  </div>
                  <hr></hr>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12 globalSelectBoxDiv'>              
                  <Select
                    className='selectBox globalSelectBox'
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    options={this.state.selectCharacters}
                    onChange={this.myCharChange.bind(this)}
                    placeholder='Character'
                  />                 
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12 globalstats'>
                  <div className='chartDiv'>
                    {createBarChartStageWinrate(
                      stageDict,
                      parseCharStageWinLoss(
                        globalStats.gloabalCharStageWins,
                        Math.round(
                          getKeyByValue(char_dict, this.state.P1char.value)
                        )
                      ),
                      parseCharStageWinLoss(
                        globalStats.globalCharStageLoss,
                        Math.round(
                          getKeyByValue(char_dict, this.state.P1char.value)
                        )
                      ),
                      `${this.state.P1char.label.props.children[0].props.src
                        .replace('.png', '')
                        .replace('stock_icons/', '')} Stage Winrate %`
                    )}
                  </div>
                  <hr></hr>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12'>
                  <h2 id='searchParams'>Matchup Breakdown</h2>
                </div>
                <div className='col-lg-6 globalSelectBoxDiv'>
                  <Select
                    className='selectBox globalSelectBox'
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    options={this.state.selectCharacters}
                    onChange={this.myCharChange.bind(this)}
                    placeholder='P1 Character'
                  />
                  <hr></hr>
                </div>
                <div className='col-lg-6 globalSelectBoxDiv'>
                  <Select
                    className='selectBox globalSelectBox'
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    options={this.state.selectCharacters}
                    onChange={this.oppCharChange.bind(this)}
                    placeholder='P2 Character'
                  />
                  <hr></hr>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-4 sumCol'>
                  <div id='imgContainer'>
                    <img src='cssp1bg.png' width='272' height='376' alt='' />
                    <img
                      src={`char_portraits/${Math.round(
                        getKeyByValue(char_dict, this.state.P1char.value)
                      )}/0.png`}
                      width='272'
                      height='376'
                      alt=''
                    />
                  </div>
                </div>
                <div className='col-lg-4 sumCol'>
                  <div className='chartDiv'>
                    <Donut
                      labels={[
                        P1vsP2.totalLosses + ' Loss',
                        P1vsP2.totalWins + ' Wins',
                      ]}
                      data={[P1vsP2.totalLosses, P1vsP2.totalWins]}
                      title='Winrate'
                      percentage={Math.round(
                        (P1vsP2.totalWins /
                          (P1vsP2.totalLosses + P1vsP2.totalWins)) *
                          100
                      )}
                      player={this.state.P1char.value}
                      opponent={this.state.P2char.value}
                    />
                  </div>
                </div>
                <div className='col-lg-4 sumCol'>
                  <div id='imgContainer2'>
                    <img src='cssp2bg.png' width='272' height='376' alt='' />
                    <img
                      src={`char_portraits/${Math.round(
                        getKeyByValue(char_dict, this.state.P2char.value)
                      )}/0.png`}
                      width='272'
                      height='376'
                      alt=''
                    />
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12 globalstats'>
                  <div className='chartDiv'>
                    {createBarChartStageWinrate(
                      stageDict,
                      parseP1vsP2StageWinLoss(
                        globalStats.gloabalCharStageWins,
                        Math.round(
                          getKeyByValue(char_dict, this.state.P1char.value)
                        ),
                        Math.round(
                          getKeyByValue(char_dict, this.state.P2char.value)
                        )
                      ),
                      parseP1vsP2StageWinLoss(
                        globalStats.globalCharStageLoss,
                        Math.round(
                          getKeyByValue(char_dict, this.state.P1char.value)
                        ),
                        Math.round(
                          getKeyByValue(char_dict, this.state.P2char.value)
                        )
                      ),
                      `${this.state.P1char.label.props.children[0].props.src
                        .replace('.png', '')
                        .replace(
                          'stock_icons/',
                          ''
                        )} vs ${this.state.P2char.label.props.children[0].props.src
                        .replace('.png', '')
                        .replace('stock_icons/', '')} Stage Winrate %`
                    )}
                  </div>
                  <hr></hr>
                </div>
              </div>

              <div>
                <div className='col-md-12'>
                  <div className='footer'>
                    <h6>Chart.slp | Slippi Charts</h6>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
