import React, { Component } from "react"; //useState
import MatchDataService from "../services/match.service";
import ReactSpinner from 'react-bootstrap-spinner'
import Select from 'react-select'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
//import Alert from 'react-bootstrap/Alert'

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import Donut from './charts/donut-chart.component';
import PieChart from './charts/pie-chart.component';
import CharBarChart from './charts/char-bar-chart.component';
import StageBarChart from './charts/stage-bar-chart.component';
import VerticalBarChart from './charts/vertical-bar-chart.component';
import ActionsBarChart from './charts/action-bar-chart.component';
import MovesBarChart from './charts/moves-bar-chart.component';
import TimeLineChart from './charts/time-line-chart.component';
import QuitoutBarChart from './charts/quitout-bar-chart.component';
import FourStatBarChart from './charts/four-stat-bar-chart.component';
import SuccessWhiffBarChart from './charts/success-whiff-bar-chart.component';

import Form from 'react-bootstrap/Form'
import { Card, Col } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

var charDict =
 {
  0 : "https://i.ibb.co/MPC7g2Q/Captain-Falcon.png",
  1 : "https://i.ibb.co/wMgP68L/Donkey-Kong.png",
  2 : "https://i.ibb.co/YPb9X5q/Fox.png" ,
  3 : "https://i.ibb.co/2h6Nvm0/Game-Watch.png",
  4 : "https://i.ibb.co/wRgh3Wr/Kirby.png",
  5 : "https://i.ibb.co/m699djC/Bowser.png",
  6 : "https://i.ibb.co/sJRtFQF/Link.png",
  7 : "https://i.ibb.co/fVgKMrY/Luigi.png",
  8 : "https://i.ibb.co/q0DvGG6/Mario.png",
  9 : "https://i.ibb.co/nQMZSwp/Marth.png",
  10 : "https://i.ibb.co/rbrpYm1/Mewtwo.png",
  11 : "https://i.ibb.co/h204mHN/Ness.png",
  12 : "https://i.ibb.co/kJkBfJz/Peach.png",
  13 : "https://i.ibb.co/SnBSTt3/Pikachu.png",
  14 : "https://i.ibb.co/gtJYS7s/Ice-Climbers.png",
  15 : "https://i.ibb.co/QrbsqFM/Jigglypuff.png",
  16 : "https://i.ibb.co/TH90YvM/Samus.png",
  17 : "https://i.ibb.co/SwNfkRp/Yoshi.png",
  18 : "https://i.ibb.co/HV3LxWZ/Zelda.png",
  19 : "https://i.ibb.co/gvcMjPN/Sheik.png",
  20 : "https://i.ibb.co/bJDqzSw/Falco.png",
  21 : "https://i.ibb.co/G9Y8xZ3/Young-Link.png",
  22 : "https://i.ibb.co/mGvdwGT/Dr-Mario.png",
  23 : "https://i.ibb.co/Q87fQgv/Roy.png",
  24 : "https://i.ibb.co/FVr7Dh2/Pichu.png",
  25 : "https://i.ibb.co/3TyxwcJ/Ganondorf.png"
}

var charbackgroundColorDict = {
  0 : 'rgba(255, 99, 132, 0.2)',
  1 : 'rgba(170, 85, 0, 0.2)',
  2 : 'rgba(255, 159, 36, 0.2)' ,
  3 : 'rgba(15, 15, 15, 0.2)',
  4 : 'rgba(255, 99, 192, 0.2)',
  5 : 'rgba(50, 128, 20, 0.2)',
  6 : 'rgba(20, 192, 20, 0.2)',
  7 : 'rgba(20, 150, 70, 0.2)',
  8 : 'rgba(255, 99, 132, 0.2)',
  9 : 'rgba(114, 162, 235, 0.2)',
  10 : 'rgba(153, 102, 255, 0.2)',
  11 : 'rgba(200, 99, 132, 0.2)',
  12 : 'rgba(255, 186, 0, 0.3)',
  13 : 'rgba(255, 186, 90, 0.3)',
  14 : 'rgba(54, 162, 235, 0.2)',
  15 : 'rgba(255, 99, 255, 0.2)',
  16 : 'rgba(255, 65, 50, 0.2)',
  17 : 'rgba(75, 192, 192, 0.2)',
  18 : 'rgba(255, 150, 50, 0.3)',
  19 : 'rgba(154, 162, 235, 0.3)',
  20 : 'rgba(54, 50, 235, 0.2)',
  21 : 'rgba(75, 192, 20, 0.2)',
  22 : 'rgba(192, 192, 192, 0.4)',
  23 : 'rgba(191, 0, 0, 0.2)',
  24 : 'rgba(255, 242, 0, 0.3)',
  25 : 'rgba(128, 0, 64, 0.3)'
}

var charborderColorDict = {
  0 : 'rgba(195, 99, 132, 1)',
  1 : 'rgba(170, 85, 0, 1)',
  2 : 'rgba(255, 159, 36, 1)' ,
  3 : 'rgba(15, 15, 15, 0.5)',
  4 : 'rgba(255, 99, 192, 1)',
  5 : 'rgba(50, 128, 20, 1)',
  6 : 'rgba(20, 192, 20, 1)',
  7 : 'rgba(20, 150, 70, 1)',
  8 : 'rgba(255, 99, 132, 1)',
  9 : 'rgba(114, 162, 235, 1)',
  10 : 'rgba(153, 102, 255, 1)',
  11 : 'rgba(200, 99, 132, 1)',
  12 : 'rgba(141, 141, 0, 1)',
  13 : 'rgba(141, 141, 90, 1)',
  14 : 'rgba(54, 162, 235, 1)',
  15 : 'rgba(255, 99, 255, 1)',
  16 : 'rgba(255, 65, 50, 1)',
  17 : 'rgba(75, 192, 192, 1)',
  18 : 'rgba(255, 150, 50, 1)',
  19 : 'rgba(50, 5, 150, 0.5)',
  20 : 'rgba(54, 50, 235, 1)',
  21 : 'rgba(75, 192, 20, 1)',
  22 : 'rgba(100, 100, 100, 1 )',
  23 : 'rgba(191, 0, 0, 1)',
  24 : 'rgba(147, 147, 0, 1)',
  25 : 'rgba(128, 0, 64, 1)'
}

var charhoverColorDict = {
  0 : 'rgba(255, 99, 132, 0.6)',
  1 : 'rgba(170, 85, 0, 0.6)',
  2 : 'rgba(255, 159, 36, 0.6)' ,
  3 : 'rgba(15, 15, 15, 0.6)',
  4 : 'rgba(255, 99, 192, 0.6)',
  5 : 'rgba(50, 128, 20, 0.6)',
  6 : 'rgba(20, 192, 20, 0.6)',
  7 : 'rgba(20, 150, 70, 0.6)',
  8 : 'rgba(255, 99, 132, 0.6)',
  9 : 'rgba(114, 162, 235, 0.6)',
  10 : 'rgba(153, 102, 255, 0.6)',
  11 : 'rgba(200, 99, 132, 0.6)',
  12 : 'rgba(255, 186, 0, 0.6)',
  13 : 'rgba(255, 186, 90, 0.6)',
  14 : 'rgba(54, 162, 235, 0.6)',
  15 : 'rgba(255, 99, 255, 0.6)',
  16 : 'rgba(255, 65, 50, 0.6)',
  17 : 'rgba(75, 192, 192, 0.6)',
  18 : 'rgba(255, 150, 50, 0.6)',
  19 : 'rgba(154, 162, 235, 0.6)',
  20 : 'rgba(54, 50, 235, 0.6)',
  21 : 'rgba(75, 192, 20, 0.6)',
  22 : 'rgba(192, 192, 192, 0.6)',
  23 : 'rgba(191, 0, 0, 0.6)',
  24 : 'rgba(255, 242, 0, 0.6)',
  25 : 'rgba(128, 0, 64, 0.6)'
}

var stageDict = {
  2 : "https://i.ibb.co/RcgQQvB/Fountain.png",
  3 : "https://i.ibb.co/1nfhPdD/Pokemon-Stadium.png",
  4 : "Peachs Castle.png",
  5 : "Kongo Jungle.png",
  6 : "Brinstar.png",
  7 : "Corneria.png",
  8 : "https://i.ibb.co/mFSJfyd/Yoshis-Story.png",
  9 : "Onett.png",
  10 : "Mute City.png",
  11 : "Rainbow Cruise.png",
  12 : "Jungle Japes.png",
  13 : "Great Bay.png",
  14 : "Hyrule Temple.png",
  15 : "Brinstar Depths.png",
  16 : "Yoshis Island.png",
  17 : "Green Greens.png",
  18 : "Fourside.png",
  19 : "Mushroom Kingdom.png",
  20 : "Mushroom Kingdom 2.png",
  22 : "Venom.png",
  23 : "Poke Floats.png",
  24 : "Big Blue.png",
  25 : "Icicle Mountain.png",
  26 : "Icetop.png",
  27 : "Flat Zone.png",
  28 : "https://i.ibb.co/9by4DY6/Dreamland.png",
  29 : "Yoshis Island N64.png",
  30 : "Kongo Jungle N64.png",
  31 : "https://i.ibb.co/xCsmTzq/Battlefield.png",
  32 : "https://i.ibb.co/dDVC3rJ/Final-Destination.png"
}

var stagebackgroundColorDict = {
  2 : 'rgba(79, 60, 97, 0.3)', // rgb(79,60,97)
  3 : 'rgba(141, 186, 145, 0.4)', //rgb(78,101,80)
  4 : 'rgba(255, 99, 132, 0.2)',
  5 : 'rgba(255, 99, 132, 0.2)',
  6 : 'rgba(255, 99, 132, 0.2)',
  7 : 'rgba(255, 99, 132, 0.2)',
  8 : 'rgba(151,195,134, 0.3)', //rgb(151,195,134)
  9 : 'rgba(255, 99, 132, 0.2)',
  10 : 'rgba(255, 99, 132, 0.2)',
  11 : 'rgba(255, 99, 132, 0.2)',
  12 : 'rgba(255, 99, 132, 0.2)',
  13 : 'rgba(255, 99, 132, 0.2)',
  14 : 'rgba(255, 99, 132, 0.2)',
  15 : 'rgba(255, 99, 132, 0.2)',
  16 : 'rgba(255, 99, 132, 0.2)',
  17 : 'rgba(255, 99, 132, 0.2)',
  18 : 'rgba(255, 99, 132, 0.2)',
  19 : 'rgba(255, 99, 132, 0.2)',
  20 : 'rgba(255, 99, 132, 0.2)',
  22 : 'rgba(255, 99, 132, 0.2)',
  23 : 'rgba(255, 99, 132, 0.2)',
  24 : 'rgba(255, 99, 132, 0.2)',
  25 : 'rgba(255, 99, 132, 0.2)',
  26 : 'rgba(255, 99, 132, 0.2)',
  27 : 'rgba(255, 99, 132, 0.2)',
  28 : 'rgba(117, 191, 226, 0.4)', //rgb(117,191,226)
  29 : 'rgba(255, 99, 132, 0.2)',
  30 : 'rgba(255, 99, 132, 0.2)',
  31 : 'rgba(33, 35, 48, 0.3)', //rgb(33,35,48)
  32 : 'rgba(54, 15, 127, 0.3)', //rgb(54,15,127)
}

var stageborderColorDict = {
  2 : 'rgba(28, 1, 54, 1)',
  3 : 'rgba(78,101,80, 1)',
  4 : 'rgba(255, 99, 132, 0.2)',
  5 : 'rgba(255, 99, 132, 0.2)',
  6 : 'rgba(255, 99, 132, 0.2)',
  7 : 'rgba(255, 99, 132, 0.2)',
  8 : 'rgba(18, 140, 99, 1)',
  9 : 'rgba(255, 99, 132, 0.2)',
  10 : 'rgba(255, 99, 132, 0.2)',
  11 : 'rgba(255, 99, 132, 0.2)',
  12 : 'rgba(255, 99, 132, 0.2)',
  13 : 'rgba(255, 99, 132, 0.2)',
  14 : 'rgba(255, 99, 132, 0.2)',
  15 : 'rgba(255, 99, 132, 0.2)',
  16 : 'rgba(255, 99, 132, 0.2)',
  17 : 'rgba(255, 99, 132, 0.2)',
  18 : 'rgba(255, 99, 132, 0.2)',
  19 : 'rgba(255, 99, 132, 0.2)',
  20 : 'rgba(255, 99, 132, 0.2)',
  22 : 'rgba(255, 99, 132, 0.2)',
  23 : 'rgba(255, 99, 132, 0.2)',
  24 : 'rgba(255, 99, 132, 0.2)',
  25 : 'rgba(255, 99, 132, 0.2)',
  26 : 'rgba(255, 99, 132, 0.2)',
  27 : 'rgba(255, 99, 132, 0.2)',
  28 : 'rgba(46, 85, 209, 1)',
  29 : 'rgba(255, 99, 132, 0.2)',
  30 : 'rgba(255, 99, 132, 0.2)',
  31 : 'rgba(33, 35, 48, 1)',
  32 : 'rgba(54, 15, 127, 1)',
}

function createPieChartCharacterUsage(charUsage, title, labelBool){
  var dict = {}

  for (let i = 0; i < charUsage.length; i++) {        
    dict[i] = charUsage[i];
  }

  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  var charLabels = [];
  var charData = [];
  var charImage = [];
  var charbackgroundColor = [];
  var charborderColor = [];
  var charhoverColor = [];
  var sum = charUsage.reduce(function(a, b){
    return a + b;
  }, 0);

  for (let j = 0; j < items.length; j++) {
    if((items[j][1]) !== 0){
      charLabels.push((charDict[items[j][0]]).substring((charDict[items[j][0]]).lastIndexOf("/") + 1).replace(".png", "") + " (" + items[j][1] + " games)");
      charData.push(items[j][1]);

      if(items[j][1]/sum > 0.060) {
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

  return <PieChart 
            charData = {charData}
            charLabels = {charLabels}
            charImage = {charImage}
            charbackgroundColor = {charbackgroundColor}
            charborderColor = {charborderColor}
            charhoverBackgroundColor = {charhoverColor}
            title = {title}
            labelBool = {labelBool}
/>

}

function createQuitoutBarChartCharacterUsage(charUsage, title, labelBool){
  var dict = {}

  for (let i = 0; i < charUsage.length; i++) {        
    dict[i] = charUsage[i];
  }

  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  var charLabels = [];
  var charData = [];
  var charImage = [];
  var charbackgroundColor = [];
  var charborderColor = [];
  var charhoverColor = [];

  for (let j = 0; j < items.length; j++) {
    if((items[j][1]) !== 0){
      charLabels.push((charDict[items[j][0]]).substring((charDict[items[j][0]]).lastIndexOf("/") + 1).replace(".png", ""));
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

  return <QuitoutBarChart 
            charData = {charData}
            charLabels = {charLabels}
            charImage = {charImage}
            charbackgroundColor = {charbackgroundColor}
            charborderColor = {charborderColor}
            charhoverBackgroundColor = {charhoverColor}
            title = {title}
            labelBool = {labelBool}
/>

}

function createBarChartCharacterWinrate(myDict, charUsage, charWins, charLoss, title){
  var dict = {}
  var windict = {}
  var lossdict = {}

  for (let i = 0; i < charUsage.length; i++) {        
    dict[i] = charUsage[i];
    windict[i] = charWins[i];
    lossdict[i] = charLoss[i];
  }

  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  var charLabels = [];
  var charData = [];
  var charImage = [];
  var charbackgroundColor = [];
  var charborderColor = []

  for (let j = 0; j < items.length; j++) {
    if((items[j][1]) !== 0){
      var str = myDict[items[j][0]];
      charLabels.push(str.substring(str.lastIndexOf("/") + 1).replace(".png", "") + " (" + items[j][1] + " games)")

      var wins = charWins[items[j][0]];
      var loss = charLoss[items[j][0]];

      if(wins === 0){
        charData.push(0) 
      }else{
        charData.push(parseInt (wins/(wins+loss)* 100) ) 
      }

      charImage.push(myDict[items[j][0]]);
      charbackgroundColor.push(charbackgroundColorDict[items[j][0]]);
      charborderColor.push(charborderColorDict[items[j][0]]);
    }    
  }

  return <CharBarChart 
            charData = {charData}
            charLabels = {charLabels}
            charImage = {charImage}
            charbackgroundColor = {charbackgroundColor}
            charborderColor = {charborderColor}
            title = {title}
            type = 'char'
/>

}

function createBarChartStageWinrate(myDict, stageWins, stageLoss, title){
  var stageUsage = []
  for (let k = 0; k < stageWins.length; k++) {
    stageUsage[k] = stageWins[k] + stageLoss[k]    
  }

  var dict = {}
  var windict = {}
  var lossdict = {}

  for (let i = 0; i < stageUsage.length; i++) {        
    dict[i] = stageUsage[i];
    windict[i] = stageWins[i];
    lossdict[i] = stageLoss[i];
  }

  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  var stageLabels = [];
  var stageData = [];
  var stageImage = [];
  var stagebackgroundColor = [];
  var stageborderColor = []

  for (let j = 0; j < items.length; j++) {
    if((items[j][1]) !== 0){
      stageLabels.push((myDict[items[j][0]]).substring((myDict[items[j][0]]).lastIndexOf("/") + 1).replace(".png", "") + " (" + items[j][1] + " games)")

      var wins = stageWins[items[j][0]];
      var loss = stageLoss[items[j][0]];

      if(wins === 0){
        stageData.push(0) 
      }else{
        stageData.push(parseInt (wins/(wins+loss)* 100) ) 
      }

      stageImage.push(myDict[items[j][0]]);
      stagebackgroundColor.push(stagebackgroundColorDict[items[j][0]]);
      stageborderColor.push(stageborderColorDict[items[j][0]]);
    }    
  }

  return < StageBarChart 
            stageData = {stageData.slice(0,6)}
            stageLabels = {stageLabels.slice(0,6)}
            stageImage = {stageImage}
            stagebackgroundColor = {stagebackgroundColor}
            stageborderColor = {stageborderColor}
            title = {title}
            type = 'stage'
/>

}

function actionsBarChartData(charUsage, actionArr, oppCharUsage, oppActionArr, checked, opponent){
  // creates sorted 2d array for character id and character usage
  var dict = {}

  for (let i = 0; i < charUsage.length; i++) {        
    dict[i] = charUsage[i];
  }

  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  var oppdict = {}

  for (let i = 0; i < oppCharUsage.length; i++) {        
    oppdict[i] = oppCharUsage[i];
  }

  var oppitems = Object.keys(dict).map(function(key) {
    return [key, oppdict[key]];
  });

  oppitems.sort(function(first, second) {
    return second[1] - first[1];
  });

  var orderedActionsArr = []

  for (let i = 0; i < items.length; i++) {
    if(items[i][1] !== 0){
      orderedActionsArr.push(
        {
          label: (charDict[items[i][0]]).substring((charDict[items[i][0]]).lastIndexOf("/") + 1).replace(".png", ""),
          data: actionArr[items[i][0]],
          backgroundColor: charbackgroundColorDict[items[i][0]],
          borderColor: charborderColorDict[items[i][0]],
          borderWidth: 1,
          stack: 'player',          
        }
      )
    }  
  }
  for (let i = 0; i < oppitems.length; i++) {
    if(oppitems[i][1] !== 0){
      orderedActionsArr.push(
        {
          label: (charDict[oppitems[i][0]]).substring((charDict[items[i][0]]).lastIndexOf("/") + 1).replace(".png", ` (${opponent})`),
          data: oppActionArr[oppitems[i][0]],
          backgroundColor: charbackgroundColorDict[oppitems[i][0]],
          borderColor: charborderColorDict[oppitems[i][0]],
          borderWidth: 1,
          stack: 'opponent',
          hidden: !checked
        }
      )
    } 
  }

  return orderedActionsArr;

}

function movesBarChartData(
  charUsage, neutralArr, counterArr, tradeArr, killsArr,
  oppCharUsage, oppNeutralArr, oppCounterArr, oppTradeArr, oppKillsArr,
  checked, radio, opponent){
  // creates sorted 2d array for character id and character usage
  var dict = {}

  for (let i = 0; i < charUsage.length; i++) {        
    dict[i] = charUsage[i];
  }

  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  var oppdict = {}

  for (let i = 0; i < oppCharUsage.length; i++) {        
    oppdict[i] = oppCharUsage[i];
  }

  var oppitems = Object.keys(dict).map(function(key) {
    return [key, oppdict[key]];
  });

  oppitems.sort(function(first, second) {
    return second[1] - first[1];
  });

  var movesArr = []
  var downb;

  if(radio === 'Neutral Wins'){
    for (let i = 0; i < items.length; i++) {
      if(items[i][1] !== 0){
        downb = items[i][0] === "12" ? neutralArr[items[i][0]][21] +neutralArr[items[i][0]][1] : neutralArr[items[i][0]][21]
        movesArr.push(
          {
            label: (charDict[items[i][0]]).substring((charDict[items[i][0]]).lastIndexOf("/") + 1).replace(".png", ""),
            data: [
              neutralArr[items[i][0]][2]+neutralArr[items[i][0]][3]+neutralArr[items[i][0]][4]+neutralArr[items[i][0]][5],
              neutralArr[items[i][0]][6],neutralArr[items[i][0]][7],neutralArr[items[i][0]][8],neutralArr[items[i][0]][9],
              neutralArr[items[i][0]][10],neutralArr[items[i][0]][11],neutralArr[items[i][0]][12],neutralArr[items[i][0]][13],
              neutralArr[items[i][0]][14],neutralArr[items[i][0]][15],neutralArr[items[i][0]][16],neutralArr[items[i][0]][17],
              neutralArr[items[i][0]][18],neutralArr[items[i][0]][19],neutralArr[items[i][0]][20],downb,
              neutralArr[items[i][0]][50]+neutralArr[items[i][0]][51],
              neutralArr[items[i][0]][52]+neutralArr[items[i][0]][53]+neutralArr[items[i][0]][54]+neutralArr[items[i][0]][55]+neutralArr[items[i][0]][56],
              neutralArr[items[i][0]][61]+neutralArr[items[i][0]][62]
            ],
            backgroundColor: charbackgroundColorDict[items[i][0]],
            borderColor: charborderColorDict[items[i][0]],
            borderWidth: 1,
            stack: 'player'
          }
        )
      }
    }
    for (let i = 0; i < oppitems.length; i++) {
      if(oppitems[i][1] !== 0){
        downb = oppitems[i][0] === "12" ? oppNeutralArr[oppitems[i][0]][21] +oppNeutralArr[oppitems[i][0]][1] : oppNeutralArr[oppitems[i][0]][21]
        movesArr.push(
          {
            label: (charDict[oppitems[i][0]]).substring((charDict[items[i][0]]).lastIndexOf("/") + 1).replace(".png", ` (${opponent})`),
            data: [
              oppNeutralArr[oppitems[i][0]][2]+oppNeutralArr[oppitems[i][0]][3]+oppNeutralArr[oppitems[i][0]][4]+oppNeutralArr[oppitems[i][0]][5],
              oppNeutralArr[oppitems[i][0]][6],oppNeutralArr[oppitems[i][0]][7],oppNeutralArr[oppitems[i][0]][8],oppNeutralArr[oppitems[i][0]][9],
              oppNeutralArr[oppitems[i][0]][10],oppNeutralArr[oppitems[i][0]][11],oppNeutralArr[oppitems[i][0]][12],oppNeutralArr[oppitems[i][0]][13],
              oppNeutralArr[oppitems[i][0]][14],oppNeutralArr[oppitems[i][0]][15],oppNeutralArr[oppitems[i][0]][16],oppNeutralArr[oppitems[i][0]][17],
              oppNeutralArr[oppitems[i][0]][18],oppNeutralArr[oppitems[i][0]][19],oppNeutralArr[oppitems[i][0]][20],downb,
              oppNeutralArr[oppitems[i][0]][50]+oppNeutralArr[oppitems[i][0]][51],
              oppNeutralArr[oppitems[i][0]][52]+oppNeutralArr[oppitems[i][0]][53]+oppNeutralArr[oppitems[i][0]][54]+oppNeutralArr[oppitems[i][0]][55]+oppNeutralArr[oppitems[i][0]][56],
              oppNeutralArr[oppitems[i][0]][61]+oppNeutralArr[oppitems[i][0]][62]
            ],
            backgroundColor: charbackgroundColorDict[oppitems[i][0]],
            borderColor: charborderColorDict[oppitems[i][0]],
            borderWidth: 1,
            stack: 'opponent',
            hidden: !checked
          }
        )
      }
    }   
  }

  if(radio === 'Counter Hits'){
    for (let i = 0; i < items.length; i++) {
      if(items[i][1] !== 0){
        downb = items[i][0] === "12" ? counterArr[items[i][0]][21] +counterArr[items[i][0]][1] : counterArr[items[i][0]][21]
        movesArr.push(
          {
            label: (charDict[items[i][0]]).substring((charDict[items[i][0]]).lastIndexOf("/") + 1).replace(".png", ""),
            data: [
              counterArr[items[i][0]][2]+counterArr[items[i][0]][3]+counterArr[items[i][0]][4]+counterArr[items[i][0]][5],
              counterArr[items[i][0]][6],counterArr[items[i][0]][7],counterArr[items[i][0]][8],counterArr[items[i][0]][9],
              counterArr[items[i][0]][10],counterArr[items[i][0]][11],counterArr[items[i][0]][12],counterArr[items[i][0]][13],
              counterArr[items[i][0]][14],counterArr[items[i][0]][15],counterArr[items[i][0]][16],counterArr[items[i][0]][17],
              counterArr[items[i][0]][18],counterArr[items[i][0]][19],counterArr[items[i][0]][20],downb,
              counterArr[items[i][0]][50]+counterArr[items[i][0]][51],
              counterArr[items[i][0]][52]+counterArr[items[i][0]][53]+counterArr[items[i][0]][54]+counterArr[items[i][0]][55]+counterArr[items[i][0]][56],
              counterArr[items[i][0]][61]+counterArr[items[i][0]][62]
            ],
            backgroundColor: charbackgroundColorDict[items[i][0]],
            borderColor: charborderColorDict[items[i][0]],
            borderWidth: 1,
            stack: 'player'
          }
        )
      }
    }
    for (let i = 0; i < oppitems.length; i++) {
      if(oppitems[i][1] !== 0){
        downb = oppitems[i][0] === "12" ? oppCounterArr[oppitems[i][0]][21] +oppCounterArr[oppitems[i][0]][1] : oppCounterArr[oppitems[i][0]][21]
        movesArr.push(
          {
            label: (charDict[oppitems[i][0]]).substring((charDict[items[i][0]]).lastIndexOf("/") + 1).replace(".png", ` (${opponent})`),
            data: [
              oppCounterArr[oppitems[i][0]][2]+oppCounterArr[oppitems[i][0]][3]+oppCounterArr[oppitems[i][0]][4]+oppCounterArr[oppitems[i][0]][5],
              oppCounterArr[oppitems[i][0]][6],oppCounterArr[oppitems[i][0]][7],oppCounterArr[oppitems[i][0]][8],oppCounterArr[oppitems[i][0]][9],
              oppCounterArr[oppitems[i][0]][10],oppCounterArr[oppitems[i][0]][11],oppCounterArr[oppitems[i][0]][12],oppCounterArr[oppitems[i][0]][13],
              oppCounterArr[oppitems[i][0]][14],oppCounterArr[oppitems[i][0]][15],oppCounterArr[oppitems[i][0]][16],oppCounterArr[oppitems[i][0]][17],
              oppCounterArr[oppitems[i][0]][18],oppCounterArr[oppitems[i][0]][19],oppCounterArr[oppitems[i][0]][20],downb,
              oppCounterArr[oppitems[i][0]][50]+oppCounterArr[oppitems[i][0]][51],
              oppCounterArr[oppitems[i][0]][52]+oppCounterArr[oppitems[i][0]][53]+oppCounterArr[oppitems[i][0]][54]+oppCounterArr[oppitems[i][0]][55]+oppCounterArr[oppitems[i][0]][56],
              oppCounterArr[oppitems[i][0]][61]+oppCounterArr[oppitems[i][0]][62]
            ],
            backgroundColor: charbackgroundColorDict[oppitems[i][0]],
            borderColor: charborderColorDict[oppitems[i][0]],
            borderWidth: 1,
            stack: 'opponent',
            hidden: !checked
          }
        )
      }
    }   
  }

  if(radio === 'Trades'){
    for (let i = 0; i < items.length; i++) {
      if(items[i][1] !== 0){
        downb = items[i][0] === "12" ? tradeArr[items[i][0]][21] +tradeArr[items[i][0]][1] : tradeArr[items[i][0]][21]
        movesArr.push(
          {
            label: (charDict[items[i][0]]).substring((charDict[items[i][0]]).lastIndexOf("/") + 1).replace(".png", ""),
            data: [
              tradeArr[items[i][0]][2]+tradeArr[items[i][0]][3]+tradeArr[items[i][0]][4]+tradeArr[items[i][0]][5],
              tradeArr[items[i][0]][6],tradeArr[items[i][0]][7],tradeArr[items[i][0]][8],tradeArr[items[i][0]][9],
              tradeArr[items[i][0]][10],tradeArr[items[i][0]][11],tradeArr[items[i][0]][12],tradeArr[items[i][0]][13],
              tradeArr[items[i][0]][14],tradeArr[items[i][0]][15],tradeArr[items[i][0]][16],tradeArr[items[i][0]][17],
              tradeArr[items[i][0]][18],tradeArr[items[i][0]][19],tradeArr[items[i][0]][20],downb,
              tradeArr[items[i][0]][50]+tradeArr[items[i][0]][51],
              tradeArr[items[i][0]][52]+tradeArr[items[i][0]][53]+tradeArr[items[i][0]][54]+tradeArr[items[i][0]][55]+tradeArr[items[i][0]][56],
              tradeArr[items[i][0]][61]+tradeArr[items[i][0]][62]
            ],
            backgroundColor: charbackgroundColorDict[items[i][0]],
            borderColor: charborderColorDict[items[i][0]],
            borderWidth: 1,
            stack: 'player'
          }
        )
      }
    }
    for (let i = 0; i < oppitems.length; i++) {
      if(oppitems[i][1] !== 0){
        downb = oppitems[i][0] === "12" ? oppTradeArr[oppitems[i][0]][21] +oppTradeArr[oppitems[i][0]][1] : oppTradeArr[oppitems[i][0]][21]
          movesArr.push(
            {
              label: (charDict[oppitems[i][0]]).substring((charDict[items[i][0]]).lastIndexOf("/") + 1).replace(".png", ` (${opponent})`),
              data: [
                oppTradeArr[oppitems[i][0]][2]+oppTradeArr[oppitems[i][0]][3]+oppTradeArr[oppitems[i][0]][4]+oppTradeArr[oppitems[i][0]][5],
                oppTradeArr[oppitems[i][0]][6],oppTradeArr[oppitems[i][0]][7],oppTradeArr[oppitems[i][0]][8],oppTradeArr[oppitems[i][0]][9],
                oppTradeArr[oppitems[i][0]][10],oppTradeArr[oppitems[i][0]][11],oppTradeArr[oppitems[i][0]][12],oppTradeArr[oppitems[i][0]][13],
                oppTradeArr[oppitems[i][0]][14],oppTradeArr[oppitems[i][0]][15],oppTradeArr[oppitems[i][0]][16],oppTradeArr[oppitems[i][0]][17],
                oppTradeArr[oppitems[i][0]][18],oppTradeArr[oppitems[i][0]][19],oppTradeArr[oppitems[i][0]][20],downb,
                oppTradeArr[oppitems[i][0]][50]+oppTradeArr[oppitems[i][0]][51],
                oppTradeArr[oppitems[i][0]][52]+oppTradeArr[oppitems[i][0]][53]+oppTradeArr[oppitems[i][0]][54]+oppTradeArr[oppitems[i][0]][55]+oppTradeArr[oppitems[i][0]][56],
                oppTradeArr[oppitems[i][0]][61]+oppTradeArr[oppitems[i][0]][62]
              ],
              backgroundColor: charbackgroundColorDict[oppitems[i][0]],
              borderColor: charborderColorDict[oppitems[i][0]],
            borderWidth: 1,
            stack: 'opponent',
            hidden: !checked
          }
        )
      }
    }   
  }

  if(radio === 'Kill Moves'){
    for (let i = 0; i < items.length; i++) {
      if(items[i][1] !== 0){
        downb = items[i][0] === "12" ? killsArr[items[i][0]][21] +killsArr[items[i][0]][1] : killsArr[items[i][0]][21]
        movesArr.push(
          {
            label: (charDict[items[i][0]]).substring((charDict[items[i][0]]).lastIndexOf("/") + 1).replace(".png", ""),
            data: [
              killsArr[items[i][0]][2]+killsArr[items[i][0]][3]+killsArr[items[i][0]][4]+killsArr[items[i][0]][5],
              killsArr[items[i][0]][6],killsArr[items[i][0]][7],killsArr[items[i][0]][8],killsArr[items[i][0]][9],
              killsArr[items[i][0]][10],killsArr[items[i][0]][11],killsArr[items[i][0]][12],killsArr[items[i][0]][13],
              killsArr[items[i][0]][14],killsArr[items[i][0]][15],killsArr[items[i][0]][16],killsArr[items[i][0]][17],
              killsArr[items[i][0]][18],killsArr[items[i][0]][19],killsArr[items[i][0]][20],downb,
              killsArr[items[i][0]][50]+killsArr[items[i][0]][51],
              killsArr[items[i][0]][52]+killsArr[items[i][0]][53]+killsArr[items[i][0]][54]+killsArr[items[i][0]][55]+killsArr[items[i][0]][56],
              killsArr[items[i][0]][61]+killsArr[items[i][0]][62]
            ],
            backgroundColor: charbackgroundColorDict[items[i][0]],
            borderColor: charborderColorDict[items[i][0]],
            borderWidth: 1,
            stack: 'player'
          }
        )
      }
    }
    for (let i = 0; i < oppitems.length; i++) {
      if(oppitems[i][1] !== 0){
        downb = oppitems[i][0] === "12" ? oppKillsArr[oppitems[i][0]][21] +oppKillsArr[oppitems[i][0]][1] : oppKillsArr[oppitems[i][0]][21]
        movesArr.push(
          {
            label: (charDict[oppitems[i][0]]).substring((charDict[items[i][0]]).lastIndexOf("/") + 1).replace(".png", ` (${opponent})`),
            data: [
              oppKillsArr[oppitems[i][0]][2]+oppKillsArr[oppitems[i][0]][3]+oppKillsArr[oppitems[i][0]][4]+oppKillsArr[oppitems[i][0]][5],
              oppKillsArr[oppitems[i][0]][6],oppKillsArr[oppitems[i][0]][7],oppKillsArr[oppitems[i][0]][8],oppKillsArr[oppitems[i][0]][9],
              oppKillsArr[oppitems[i][0]][10],oppKillsArr[oppitems[i][0]][11],oppKillsArr[oppitems[i][0]][12],oppKillsArr[oppitems[i][0]][13],
              oppKillsArr[oppitems[i][0]][14],oppKillsArr[oppitems[i][0]][15],oppKillsArr[oppitems[i][0]][16],oppKillsArr[oppitems[i][0]][17],
              oppKillsArr[oppitems[i][0]][18],oppKillsArr[oppitems[i][0]][19],oppKillsArr[oppitems[i][0]][20],downb,
              oppKillsArr[oppitems[i][0]][50]+oppKillsArr[oppitems[i][0]][51],
              oppKillsArr[oppitems[i][0]][52]+oppKillsArr[oppitems[i][0]][53]+oppKillsArr[oppitems[i][0]][54]+oppKillsArr[oppitems[i][0]][55]+oppKillsArr[oppitems[i][0]][56],
              oppKillsArr[oppitems[i][0]][61]+oppKillsArr[oppitems[i][0]][62]
            ],
            backgroundColor: charbackgroundColorDict[oppitems[i][0]],
            borderColor: charborderColorDict[oppitems[i][0]],
            borderWidth: 1,
            stack: 'opponent',
            hidden: !checked
          }
        )
      }
    }   
  }
  return movesArr;

}

function fourStatBarChartComponent(charUsage, charStats, oppCharUsage, oppCharStats, checked, opponent){
  // creates sorted 2d array for character id and character usage
  var dict = {}

  for (let i = 0; i < charUsage.length; i++) {        
    dict[i] = charUsage[i];
  }

  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  var oppdict = {}

  for (let i = 0; i < oppCharUsage.length; i++) {        
    oppdict[i] = oppCharUsage[i];
  }

  var oppitems = Object.keys(dict).map(function(key) {
    return [key, oppdict[key]];
  });

  oppitems.sort(function(first, second) {
    return second[1] - first[1];
  });

  var deathsArr = []

  for (let i = 0; i < items.length; i++) {
    if(items[i][1] !== 0){
      deathsArr.push(
        {
          label: (charDict[items[i][0]]).substring((charDict[items[i][0]]).lastIndexOf("/") + 1).replace(".png", ""),
          data: [
            charStats[0][items[i][0]],
            charStats[1][items[i][0]],
            charStats[2][items[i][0]],
            charStats[3][items[i][0]]
          ],
          backgroundColor: charbackgroundColorDict[items[i][0]],
          borderColor: charborderColorDict[items[i][0]],
          borderWidth: 1,
          stack: 'player'
        }
      )
    }
  }

  for (let i = 0; i < oppitems.length; i++) {
    if(oppitems[i][1] !== 0){
      deathsArr.push(
        {
          label: (charDict[oppitems[i][0]]).substring((charDict[items[i][0]]).lastIndexOf("/") + 1).replace(".png", ` (${opponent})`),
          data: [
            oppCharStats[0][oppitems[i][0]],
            oppCharStats[1][oppitems[i][0]],
            oppCharStats[2][oppitems[i][0]],
            oppCharStats[3][oppitems[i][0]]
          ],
          backgroundColor: charbackgroundColorDict[oppitems[i][0]],
          borderColor: charborderColorDict[oppitems[i][0]],
          borderWidth: 1,
          stack: 'opponent',
          hidden: !checked
        }
      )
    }
  }   

  return deathsArr;

}

function createSuccessWhiffBarChart(success, whiff, title, successLabel, whiffLabel){
  var dict = {}

  for (let i = 0; i < success.length; i++) {        
    dict[i] = success[i];
  }

  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  var charLabels = [];
  var datasetArr = [];
  var succData = [];
  var failData = [];
  var charImage = [];

  for (let j = 0; j < items.length; j++) {
    if((items[j][1]) !== 0){
      charLabels.push((charDict[items[j][0]]).substring((charDict[items[j][0]]).lastIndexOf("/") + 1).replace(".png", ""))
      charImage.push(charDict[items[j][0]]);
      succData.push(success[items[j][0]])
      failData.push(whiff[items[j][0]])
    }    
  }

  datasetArr.push({
    label: successLabel,
    data: succData,
    backgroundColor: "rgb(64, 176, 166, 0.3)",
    borderColor: "rgb(64, 176, 166, 1)",
    borderWidth: 1
  })

  datasetArr.push({
    label: whiffLabel,
    data: failData,
    backgroundColor: "rgb(255, 190, 106, 0.5)",
    borderColor: "rgb(255, 190, 106, 1)",
    borderWidth: 1.5
  })

  return <SuccessWhiffBarChart 
            labels = {charLabels}
            charImage = {charImage}
            dataset = {datasetArr}
            title = {title}
/>
}

// function AlertDismissible() {
//   const [show, setShow] = useState(true);

//     return (
//       <Alert variant="secondary" show={show} onClose={() => setShow(false)} dismissible>
//         <p>
//         To get started just enter your connect code and hit search!<br></br>
//         </p>
//       </Alert>
//     );
  

// }

var chararr = [
  "FOX","MARTH","JIGGLYPUFF","FALCO",
  "SHEIK","CAPTAIN_FALCON","PEACH",
  "ICE_CLIMBERS","PIKACHU","YOSHI","SAMUS",
  "LUIGI","DR_MARIO",
  "GANONDORF","MARIO",
  "DONKEY_KONG","YOUNG_LINK","LINK","GAME_AND_WATCH",
  "MEWTWO","ROY","PICHU","NESS","ZELDA",
  "KIRBY","BOWSER"
]

var charpng = [
  "Fox.png", "Marth.png", "Jigglypuff.png", "Falco.png",
  "Sheik.png", "Captain Falcon.png", "Peach.png",
  "Ice Climbers.png", "Pikachu.png", "Yoshi.png", "Samus.png",
  "Luigi.png", "Dr. Mario.png",
  "Ganondorf.png", "Mario.png",
  "Donkey Kong.png", "Young Link.png", "Link.png", "Game & Watch.png",
  "Mewtwo.png", "Roy.png", "Pichu.png","Ness.png", "Zelda.png",
  "Kirby.png", "Bowser.png"
]

var characters = chararr.map((x,i) => ({
  "value": x,
  "label": <div><img src={`stock_icons/${charpng[i]}`} height="30px" width="30px" alt=""/> {charpng[i].split('.').slice(0, -1).join('.')}</div>
}))

export default class MatchStats extends Component {
  constructor(props) {
    super(props);
    //this.onChangeSearchCode = this.onChangeSearchCode.bind(this);
    this.searchCode = this.searchCode.bind(this);
    //this.onChangeOppCode = this.onChangeOppCode.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleGlobalChange = this.handleGlobalChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchCodeVal = React.createRef();
    this.oppCodeVal = React.createRef();

    this.state = {
      // search params
      selectCharacters: [],
      oppSelectCharacters: [],
      myCharValue: [],
      oppCharValue: [],
      selectStages: [],
      stageValue: [],
      isOnlyComplete: false,
      startDate: null,
      endDate: null,

      // data
      myStats: "",

      // buttons
      actionCheck: false,
      charPieCheck: false,
      actionsBarCheck: false,
      movesBarCheck: false,
      fourBarCheck: false,

      // moves chart buttons
      radio: 'Neutral Wins',
      check: false,

      global: false
    };
  }

  async getCharacters(){
    this.setState({
      selectCharacters: characters,
      oppSelectCharacters: characters
    })
  }

  async getStages(){
    let stagearr = [
      "FOUNTAIN_OF_DREAMS","POKEMON_STADIUM","YOSHIS_STORY","DREAMLAND",
      "BATTLEFIELD","FINAL_DESTINATION"
    ]

    let stagepng = [
      "Fountain.png","Pokemon Stadium.png","Yoshis Story.png","Dreamland.png",
      "Battlefield.png","Final Destination.png"
    ]

    const stages = stagearr.map((x,i) => ({
      "value": x,
      "label": <div><img src={`stage_icons/${stagepng[i]}`} height="30px" width="30px" alt=""/> {stagepng[i].split('.').slice(0, -1).join('.')}</div>
    }))

    this.setState({selectStages: stages})
  }

  myCharChange(e){

    this.setState(
      {myCharValue: e}
      
      )
      console.log(this.state.myCharValue)
  }

  myOppChange(e){
    this.setState({oppCharValue: e})
  }

  stageChange(e){
    this.setState({stageValue: e})
  }
   
  componentDidMount() {
    this.getCharacters();
    this.getStages();
   
  }

  // onChangeSearchCode(e) {
  //   const searchCode = e.target.value;

  //   this.setState({
  //     searchCode: searchCode
  //   });
  // }

  // onChangeOppCode(e) {
  //   const oppCode = e.target.value;

  //   this.setState({
  //     oppCode: oppCode
  //   });
  // }

  handleInputChange(e){
    this.setState({
       radio: e.target.value
    })
  }

  handleGlobalChange(e){
    this.setState({
      global: !this.state.global
    })
  }

  handleCheckChange(e){
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value    
    });
  }

  searchCode() {
    
    let mycode = this.searchCodeVal.current.value.replace("#", "-").toUpperCase();
    let myoppcode = this.oppCodeVal.current.value.replace("#", "-").toUpperCase();

    this.setState({
      statsLoaded: "loading"
    });

    let params = new URLSearchParams()
    
    if(mycode){
      params.append(`code`, mycode)
    }

    if(myoppcode){
      params.append('oppcode', myoppcode);
    }

    for (let i = 0; i < this.state.myCharValue.length; i++) {
      params.append('character', this.state.myCharValue[i].value);
    }

    for (let i = 0; i < this.state.oppCharValue.length; i++) {
      params.append('oppcharacter', this.state.oppCharValue[i].value);
    }

    for (let i = 0; i < this.state.stageValue.length; i++) {
      params.append('stage', this.state.stageValue[i].value);
    }

    if(this.state.isOnlyComplete){
      params.append('complete', true)
    }

    if(this.state.startDate){
      params.append('start', (this.state.startDate._d).toISOString())
    }

    if(this.state.endDate){
      params.append('end', (this.state.endDate._d).toISOString())
    }

    if(this.state.global){
      params.append('global', true)
    }

    MatchDataService.findByCode(params.toString())
      .then(response => {

        if(response.data !== 'fail'){
          this.setState({
            statsLoaded: "loaded",
            myStats: response.data
          });
        }else{
          this.setState({
            statsLoaded: "error",
          });
        }
        
        console.log(response.data);     
      })
      .catch(e => {
        this.setState({
          statsLoaded: "error"
        });
      }); 
  }

  render() {
    const { statsLoaded, myStats, global } = this.state;

    const renderStats = () => {
      if (statsLoaded === "loaded") {
        var textOppCode = myStats.oppTally === 1 ? myStats.rival : 'Opponent'
        return(
          <Container fluid>
            <h2 className="sectionH2">Summary</h2>
            <div className="row">
              <div className="col-lg-4 sumCol">
                <div id="imgContainer">
                    <img src="cssp1bg.png" width="272" height="376" alt=""/>
                    <img src={`char_portraits/${myStats.main}/${myStats.mainColor}.png`} width="272" height="376" alt=""/>
                    <img src="cssp1.png" width="272" height="376" alt=""/>
                    <p id="tagText">
                      {myStats.code}
                    </p>
                </div>
              </div>
              <div className="col-lg-4 sumCol">
                <Card id='sumCard'>
                  <p>
                    <strong>Overview</strong><br/><br/>
                    {myStats.totalMatches} games <br/><br/>
                    {myStats.totalTime} time played (h:m:s:f)<br/><br/>
                    {myStats.totalLRAStart} L+R+A+Starts <br/><br/>
                    {myStats.totalTimeouts} Timeouts <br/><br/>

                    {myStats.uniqueOpps} Unique Opponents <br/><br/>
                    {myStats.oneAndDoned} One And Doned <br/>
                  </p>
                </Card>
              </div>
              {/* WinRate Donut Chart */}
              <div className="col-lg-4 sumCol">
                <div className="chartDiv">
                  <Donut
                    labels={[myStats.totalLosses + ' Loss', myStats.totalWins + ' Wins']}
                    data={[myStats.totalLosses, myStats.totalWins]}
                    title='Winrate'
                    percentage = {parseInt((myStats.totalWins/(myStats.totalLosses + myStats.totalWins)) * 100)}
                    player={myStats.code}
                    opponent={textOppCode}
                  />
                </div>
              </div>
            </div>

            <hr className="my-4"></hr>

            <h2 className="sectionH2">Character Usage</h2>
            <div className="row">
              <div className="col-md-6" id='pie1'>
                <div className="chartDiv">
                  {createPieChartCharacterUsage(myStats.charUsage, 'Character Usage', this.state.charPieCheck)}
                </div>                
              </div>
              <div className="col-md-6" id='pie2'>
                <div className="chartDiv">
                  {createPieChartCharacterUsage(myStats.oppCharUsage, `${textOppCode} Character Usage`, this.state.charPieCheck)}
                </div>                
              </div>
              <label>                  
                  <input
                    name="charPieCheck"            
                    type="checkbox"
                    checked={this.state.charPieCheck}
                    onChange={this.handleCheckChange} />
                     &nbsp; Show labels
                </label>
               
            </div>

            <hr className="my-4"></hr>

            <div className="row">
              <div className="col-md" id="bigbar">
                <div className="chartDiv">
                {createBarChartCharacterWinrate(
                  charDict,
                  myStats.charUsage,
                  myStats.asCharWins,
                  myStats.asCharLoss,
                  'Character Winrate %'
                  )}
                  </div>
              </div>              
            </div>

            <hr className="my-4"></hr>


            <div className="row">
              <div className="col-md" id="bigbar">
                <div className="chartDiv">
                  {createBarChartCharacterWinrate(
                    charDict, 
                    myStats.oppCharUsage, 
                    myStats.vsCharWins, 
                    myStats.vsCharLoss, 
                    'VS Opponent\'s Character Winrate %')}
                  </div>
                </div>
            </div>

            <hr className="my-4"></hr>

            <div className="row">
              <div className="col-md" id="bigbar">
                <div className="chartDiv">
                  {createBarChartStageWinrate(
                    stageDict, 
                    myStats.stageWins, 
                    myStats.stageLoss, 
                    'Stage Winrate %')}
                </div>
              </div>
            </div>

            <hr className="my-4"></hr>

            <h2 className="sectionH2">Openings</h2>
            <div className="row">
              <div className="col-md-3 openingCols">
                <div className="chartDiv">
                  <Donut
                    labels={[myStats.oppNeutralWins, myStats.neutralWins ]}
                    data={[myStats.oppNeutralWins, myStats.neutralWins ]}
                    title='Neutral Wins'
                    percentage = {parseInt((myStats.neutralWins/(myStats.oppNeutralWins + myStats.neutralWins)) * 100)}
                    player={myStats.code}
                    opponent={textOppCode}
                    options={{
                      maintainAspectRatio:false}}
                  />
                </div>
              </div>   
              <div className="col-md-3 openingCols">
                <div className="chartDiv">
                  <Donut
                    labels={[myStats.oppCounterHits, myStats.counterHits, ]}
                    data={[myStats.oppCounterHits, myStats.counterHits]}
                    title='Counter Hits'
                    percentage = {parseInt((myStats.counterHits/(myStats.oppCounterHits + myStats.counterHits)) * 100)}
                    player={myStats.code}
                    opponent={textOppCode}
                    options={{
                      maintainAspectRatio:false}}
                  />
                </div>
              </div>    
              <div className="col-md-3 openingCols">
                <div className="chartDiv">
                  <Donut
                    labels={[myStats.oppBeneficialTrades , myStats.beneficialTrades ]}
                    data={[ myStats.oppBeneficialTrades, myStats.beneficialTrades]}
                    title='Beneficial Trades'
                    percentage = {parseInt((myStats.beneficialTrades/(myStats.oppBeneficialTrades + myStats.beneficialTrades)) * 100)}
                    player={myStats.code}
                    opponent={textOppCode}
                    options={{
                      maintainAspectRatio:false}}
                  />
                </div> 
              </div>  
              <div className="col-md-3 openingCols">
                <div className="chartDiv">
                  <Donut
                    labels={[myStats.oppFirstBloods, myStats.firstBloods]}
                    data={[myStats.oppFirstBloods , myStats.firstBloods]}
                    title='First Bloods'
                    percentage = {parseInt((myStats.firstBloods/(myStats.oppFirstBloods + myStats.firstBloods)) * 100)}
                    player={myStats.code}
                    opponent={textOppCode}
                    options={{
                      maintainAspectRatio:false}}
                  />
                 </div>    
              </div>         
            </div>

            <hr className="my-4"></hr>

            <h2 className="sectionH2">KOs and Damage</h2>
            <div className="row">
              <div className="col-sm-3 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='Average KO Percent'
                  data={[myStats.avgKOpercent , myStats.oppAvgKOpercent]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>
              <div className="col-sm-3 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='Openings Per KO' 
                  data={[myStats.openingsPerKO.toFixed(2) , myStats.oppOpeningsPerKO.toFixed(2)]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>
              <div className="col-sm-3 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='Successful Conversion Percent'
                  data={[myStats.conversionRate , myStats.oppConversionRate]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>  
              <div className="col-sm-3 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='Average Damage Per Opening'
                  data={[myStats.avgDamagePerOpening , myStats.oppAvgDamagePerOpening]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>  
            </div>
            <div className="row">
              <div className="col-sm-3 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='Highest Damage Punish'
                  data={[myStats.bestPunish.toFixed(2) , myStats.oppBestPunish.toFixed(2)]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>
              <div className="col-sm-3 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='0 to Deaths'
                  data={[myStats.zeroToDeaths , myStats.oppZeroToDeaths]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>
              <div className="col-sm-3 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='Lowest % Kill'
                  data={[myStats.lowestKill.toFixed(2) , myStats.oppLowestKill.toFixed(2)]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>
              <div className="col-sm-3 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='Highest % Kill'
                  data={[myStats.highestKill.toFixed(2) , myStats.oppHighestKill.toFixed(2)]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>  
            </div>

            <hr className="my-4"></hr>

            <h2 className="sectionH2">Stocks</h2>
            <div className="row">
              <div className="col-sm-4 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='4 Stocks'
                  data={[myStats.fourStocks , myStats.oppFourStocks]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>
              <div className="col-sm-4 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='Average Stocks Taken'
                  data={[myStats.avgStocksTaken.toFixed(2) , myStats.oppAvgStocksTaken.toFixed(2)]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>
              <div className="col-sm-4 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='Average Stocks Won By'
                  data={[myStats.avgStockDifferential.toFixed(2) , myStats.oppAvgStockDifferential.toFixed(2)]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>  
            </div>

            <hr className="my-4"></hr>
                  
            <h2 className="sectionH2">Inputs</h2>
            <div className="row">
              <div className="col-sm-4 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='Inputs Per Minute'
                  data={[myStats.inputsPM.toFixed(2) , myStats.oppIPM.toFixed(2)]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>
              <div className="col-sm-4 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='Digital IPM'
                  data={[myStats.digitalIPM.toFixed(2) , myStats.oppDigitalIPM.toFixed(2)]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>
              <div className="col-sm-4 twoBar">
              <div className="chartDiv">
                <VerticalBarChart
                  label='Successful L Cancel %'
                  data={[myStats.lcancels , myStats.oppLcancels]}
                  player={myStats.code}
                  opponent={textOppCode}
                />
                </div>
              </div>  
            </div>

            <hr className="my-4"></hr>

            <div className="row">
              <div className="col-md vertbigbar">
              <div className="chartDiv">
                <ActionsBarChart
                  dataset = {actionsBarChartData(
                    myStats.charUsage, 
                    myStats.actionCountArr, 
                    myStats.oppCharUsage, 
                    myStats.oppActionCountArr, 
                    this.state.actionCheck,
                    textOppCode
                    )}
                  labelBool = {this.state.actionsBarCheck}
                />
              </div>
              <div className="labelDiv">
                <label>                  
                  <input
                    name="actionsBarCheck"            
                    type="checkbox"
                    checked={this.state.actionsBarCheck}
                    onChange={this.handleCheckChange} />
                </label>
                &nbsp;Show labels&nbsp;
                <label>
                  <input
                    name="actionCheck"            
                    type="checkbox"
                    checked={this.state.actionCheck}
                    onChange={this.handleCheckChange} />                  
                </label>
                &nbsp;Toggle Opponent Data&nbsp;
                </div>
              </div>

            </div>

            <hr className="my-4"></hr>

            <h2 className="sectionH2">Move Usage</h2>
            <div className="row">
              <div className="col-md vertbigbar">
                <div onChange={this.handleInputChange} id='radiobuttons'>
                  <input type="radio" value="Neutral Wins" checked = {this.state.radio === 'Neutral Wins'} name="move" /> Neutral Wins &nbsp; 
                  <input type="radio" value="Counter Hits" checked = {this.state.radio === 'Counter Hits'} name="move" /> Counter Hits &nbsp; 
                  <input type="radio" value="Trades" checked = {this.state.radio === 'Trades'} name="move" /> Trades &nbsp; 
                  <input type="radio" value="Kill Moves" checked = {this.state.radio === 'Kill Moves'} name="move" /> Kill Moves &nbsp; 
                </div>
                <div className="chartDiv">
                  <MovesBarChart
                    dataset = {movesBarChartData(
                      myStats.charUsage,
                      myStats.moveUsageArr.neutralWinMoves, 
                      myStats.moveUsageArr.counterHitMoves, 
                      myStats.moveUsageArr.tradeMoves, 
                      myStats.moveUsageArr.killMoves,
                      myStats.oppCharUsage,
                      myStats.oppMoveUsageArr.neutralWinMoves, 
                      myStats.oppMoveUsageArr.counterHitMoves, 
                      myStats.oppMoveUsageArr.tradeMoves, 
                      myStats.oppMoveUsageArr.killMoves,
                      this.state.check, 
                      this.state.radio,
                      textOppCode
                      )}
                    title = {this.state.radio}
                    labelBool = {this.state.movesBarCheck}
                  />
                </div>
                <div className="labelDiv">
                <label>                  
                  <input
                    name="movesBarCheck"            
                    type="checkbox"
                    checked={this.state.movesBarCheck}
                    onChange={this.handleCheckChange} />
                </label>
                &nbsp;Show labels&nbsp;
                <label>                  
                  <input
                    name="check"            
                    type="checkbox"
                    checked={this.state.check}
                    onChange={this.handleCheckChange} />                  
                </label>
                &nbsp;Toggle Opponent Data:&nbsp;
                </div>
              </div>

            </div>

            <hr className="movesHR"></hr>

            <h2 className="sectionH2">Rival</h2>
            <div className="row">
              <div className="col-lg-4 sumCol"> 
                <div id="imgContainer2">
                  <img src="cssp2bg.png" width="272" height="376" alt=""/>
                  <img src={`char_portraits/${myStats.rivalsCharId}/${myStats.rivalsColorId}.png`} width="272" height="376" alt=""/>
                  <img src="cssp2.png" width="272" height="376" alt=""/>
                  <p id="tagText">
                    {myStats.rival}
                  </p>
                </div>
              </div>
              <div className="col-lg-4 sumCol">
                <div className="chartDiv">
                <Donut
                  labels={[myStats.vsRivalLoss + ' Loss', myStats.vsRivalWin + ' Wins']}
                  data={[myStats.vsRivalLoss, myStats.vsRivalWin]}
                  title='Winrate'
                  percentage = {parseInt((myStats.vsRivalWin/(myStats.vsRivalLoss + myStats.vsRivalWin)) * 100)}
                  player={myStats.rival}
                />
                </div>
              </div>
              <div className="col-lg-4 sumCol">
                <Card id='sumCard'>
                  <h6>&nbsp;</h6>
                  <p>
                    Try entering your rival's code as well to see head to head stats!
                  </p>
                </Card>
              </div>
            </div>

            <hr className="my-4"></hr>

            <div className="row">
              <div className="col-md medbar">
                <div className="chartDiv">
                <TimeLineChart 
                  linedata={myStats.timeRangeWinrate}
                  bardata={myStats.totalranges}
                  rangearr={myStats.timeRanges} 
                />
                </div>
              </div>
            </div>

            <hr className="my-4"></hr>

            <div className="row">
              <div className="col-md medbar">
              <div className="chartDiv">
                {createQuitoutBarChartCharacterUsage(myStats.quitoutPercent, 'Character % of Matches Ending in LRAStart', this.state.charPieCheck)}
                </div>
              </div>
            </div>

            <hr className="my-4"></hr>

            <div className="row">
              <div className="col-md medbar">
              <div className="chartDiv">
                {createQuitoutBarChartCharacterUsage(myStats.quitoutOppPercent, `${textOppCode} Character % of Matches Ending in LRAStart`, this.state.charPieCheck)}
                </div>
              </div>
            </div>

            <hr className="my-4"></hr>
            
            <div className="row">              
              <div className="col-md fourbar">
              <div className="chartDiv">
                <FourStatBarChart
                  dataset = {fourStatBarChartComponent(
                    myStats.charUsage,
                    myStats.deathDirectionCharUsage,
                    myStats.oppCharUsage,
                    myStats.deathDirectionOppCharUsage,
                    this.state.check,
                    textOppCode
                      )}
                  title = 'Deaths Direction'
                  labels = {['Down', 'Left', 'Right', 'Up']}
                  labelBool = {this.state.fourBarCheck}
                />
              </div>
              <label>                  
                  <input
                    name="fourBarCheck"            
                    type="checkbox"
                    checked={this.state.fourBarCheck}
                    onChange={this.handleCheckChange} />
                </label>
                &nbsp;Show labels&nbsp;
              <label>                
                <input
                  name="check"            
                  type="checkbox"
                  checked={this.state.check}
                  onChange={this.handleCheckChange} />
                  &nbsp;Toggle Opponent Data
              </label>
              </div>

            </div>

            <hr className="my-4"></hr>

            <div className="row">
              <div className="col-md fourbar">
                <div className="chartDiv">
                <FourStatBarChart
                  dataset = {fourStatBarChartComponent(
                    myStats.charUsage,
                    myStats.throwCountCharUsage,
                    myStats.oppCharUsage,
                    myStats.throwCountOppCharUsage,
                    this.state.check,
                    textOppCode
                      )}
                  title = 'Throws Direction'
                  labels = {['Up', 'Forward', 'Back', 'Down']}
                  labelBool = {this.state.fourBarCheck}
                />
                </div>
                <label>                  
                  <input
                    name="fourBarCheck"            
                    type="checkbox"
                    checked={this.state.fourBarCheck}
                    onChange={this.handleCheckChange} />
                </label>
                &nbsp;Show labels&nbsp;
              <label>                
                <input
                  name="check"            
                  type="checkbox"
                  checked={this.state.check}
                  onChange={this.handleCheckChange} />
                  &nbsp;Toggle Opponent Data
              </label>
              </div>

            </div>

            <hr className="my-4"></hr>

            <div className="row">
              <div className="col-md fourbar">
              <div className="chartDiv">
                <FourStatBarChart
                  dataset = {fourStatBarChartComponent(
                    myStats.charUsage,
                    myStats.groundTechCountCharUsage,
                    myStats.oppCharUsage,
                    myStats.groundTechCountOppCharUsage,
                    this.state.check,
                    textOppCode
                      )}
                  title = 'Tech Direction'
                  labels = {['Backward', 'Forward', 'Neutral', 'Missed']}
                  labelBool = {this.state.fourBarCheck}
                />
                </div>
                <label>                  
                  <input
                    name="fourBarCheck"            
                    type="checkbox"
                    checked={this.state.fourBarCheck}
                    onChange={this.handleCheckChange} />
                </label>
                &nbsp;Show labels&nbsp;
              <label>                
                <input
                  name="check"            
                  type="checkbox"
                  checked={this.state.check}
                  onChange={this.handleCheckChange} />
                  &nbsp;Toggle Opponent Data
              </label>
              </div>

            </div>

            <hr className="my-4"></hr>

            <div className="row">
              <div className="col-md medbar">
              <div className="chartDiv">
                {createSuccessWhiffBarChart(
                  myStats.grabCountSuccessCharUsage,
                  myStats.grabCountWhiffCharUsage,
                  'Player Grab Whiff %',
                  'Success',
                  'Whiffed')}
                  </div>
              </div>
            </div>

            <hr className="my-4"></hr>

            <div className="row">
            <div className="col-md medbar">
            <div className="chartDiv">
                {createSuccessWhiffBarChart(
                  myStats.grabCountSuccessOppCharUsage,
                  myStats.grabCountWhiffOppCharUsage,
                  `${textOppCode} Grab Whiff %`,
                  'Success',
                  'Whiffed')}
                  </div>
              </div>
            </div>

            <hr className="my-4"></hr>

            <div className="row">
            <div className="col-md medbar">
            <div className="chartDiv">
                {createSuccessWhiffBarChart(
                  myStats.wallTechCountSuccessCharUsage,
                  myStats.wallTechCountFailCharUsage,
                  'Wall Tech %',
                  'Success',
                  'Missed')}
                  </div>
              </div>
            </div>

            <hr className="my-4"></hr>

            <div className="row">
            <div className="col-md medbar">
            <div className="chartDiv">
                {createSuccessWhiffBarChart(
                  myStats.wallTechCountSuccessOppCharUsage,
                  myStats.wallTechCountFailOppCharUsage,
                  `${textOppCode} Wall Tech %`,
                  'Success',
                  'Missed')}
                  </div>
              </div>
            </div>

            <hr className="my-4"></hr>

            <div className="row">
            <div className="col-md medbar">
            <div className="chartDiv">
                {createSuccessWhiffBarChart(
                  myStats.sdCharUsage,
                  myStats.deathUsage,
                  'SD %',
                  'SD',
                  'Regular Death')}
                  </div>
              </div>
            </div>

            <hr className="my-4"></hr>

            <div className="row">
            <div className="col-md medbar">
            <div className="chartDiv">
                {createSuccessWhiffBarChart(
                  myStats.sdOppCharUsage,
                  myStats.deathOppUsage,
                  `${textOppCode} SD %`,
                  'SD',
                  'Regular Death')}
                  </div>
              </div>
            </div>

            <hr className="my-4"></hr>            

          </Container>
        )
      }
      else if (statsLoaded === "loading")
      {
        return(
          <div id="outer">
            <div id="inner"><ReactSpinner type="border" color="secondary" size="5" /></div>
          </div>
        )
      }
      else if (statsLoaded === 'error'){
        return(
          <div className="noMatches">
            <p>No matches found! Please head to <a href={"/add"}>UPLOAD GAMES</a> to learn how to start uploading your games</p>
          </div>
        )
      }
    };
    
    const renderCodeForm = () => {
      if(global){
        return(
          <Form.Row>
          <Col sm={12} md={6} className="formCol">
            <input                  
              type="text"
              className="form-control"
              placeholder="Your Connect Code Ex: GEFF#353"
              // value={"GEFF#353"}
              ref={this.searchCodeVal}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.searchCode();
                }
              }}
              readOnly
            />
          </Col>
          <Col sm={12} md={6} className="formCol">
            <input
              type="text"
              className="form-control"
              placeholder="Opponents Connect Code"
              // value={oppCode}
              ref={this.oppCodeVal}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.searchCode();
                }
              }}
              readOnly
            />
          </Col>
        </Form.Row>
        )
      }
      else{
        return(
          <Form.Row>
          <Col sm={12} md={6} className="formCol">
            <input                  
              type="text"
              className="form-control"
              placeholder="Your Connect Code Ex: GEFF#353"
              // value={"GEFF#353"}
              ref={this.searchCodeVal}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.searchCode();
                }
              }}
              
            />
          </Col>
          <Col sm={12} md={6} className="formCol">
            <input
              type="text"
              className="form-control"
              placeholder="Opponents Connect Code"
              // value={oppCode}
              ref={this.oppCodeVal}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.searchCode();
                }
              }}
            />
          </Col>
        </Form.Row>
        )
      }
    }

    const renderCharForm = () => {
      if(global){
        return(
        <Form.Row id='formRow'>
        <Col xs={12} sm={6} className="formCol">
          <Select 
            className="selectBox"
            menuPortalTarget={document.body} 
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 })}} 
            options={this.state.selectCharacters} 
            onChange={this.myCharChange.bind(this)} 
            placeholder = "Your Characters"
            isMulti
          />
        </Col>
        <Col xs={12} sm={6} className="formCol">
          <Select 
            menuPortalTarget={document.body} 
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 })}} 
            options={this.state.oppSelectCharacters} 
            onChange={this.myOppChange.bind(this)} 
            placeholder = "Opponents Characters"
            isMulti 
          />
        </Col>
      </Form.Row>
        )
      }else{
        return (
        <Form.Row id='formRow'>
        <Col xs={12} sm={6} className="formCol">
          <Select 
            className="selectBox"
            menuPortalTarget={document.body} 
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 })}} 
            options={this.state.selectCharacters} 
            onChange={this.myCharChange.bind(this)} 
            placeholder = "Your Characters"
            isMulti 
          />
        </Col>
        <Col xs={12} sm={6} className="formCol">
          <Select 
            menuPortalTarget={document.body} 
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 })}} 
            options={this.state.selectCharacters} 
            onChange={this.myOppChange.bind(this)} 
            placeholder = "Opponents Characters"
            isMulti 
          />
        </Col>
      </Form.Row>
        )
      }
        
    }

    return (
      <div className="container mt-3">
      <div className="list row">
        <div className="col-md-12">
        {/* <AlertDismissible/> */}
          <Card>
            <Card.Body>
            <h2 id="searchParams">Search</h2>
            <Form>
              {renderCodeForm()}
              {renderCharForm()}
              {/* <Form.Row id='formRow'>
                <Col xs={12} sm={6} className="formCol">
                  <Select 
                    className="selectBox"
                    menuPortalTarget={document.body} 
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 })}} 
                    options={this.state.selectCharacters} 
                    onChange={this.myCharChange.bind(this)} 
                    placeholder = "Your Characters"
                    isMulti 
                  />
                </Col>
                <Col xs={12} sm={6} className="formCol">
                  <Select 
                    menuPortalTarget={document.body} 
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 })}} 
                    options={this.state.selectCharacters} 
                    onChange={this.myOppChange.bind(this)} 
                    placeholder = "Opponents Characters"
                    isMulti 
                  />
                </Col>
              </Form.Row> */}
              <Form.Row id='formRow'>
                <Col xs={12} sm={6} className="formCol">
                  <Select 
                    menuPortalTarget={document.body} 
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 })}} 
                    options={this.state.selectStages} 
                    onChange={this.stageChange.bind(this)} 
                    placeholder = "Stages"
                    isMulti 
                  />
                </Col>
                <Col xs={12} sm={6} className="formCol">
                  <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    isOutsideRange={() => false}
                    small={true}
                    block={true}   
                    numberOfMonths={1}              
                  />
                </Col>
                <Col className="formCol">
                  <div className="col text-center">
                    <label>
                      <input
                        name="isOnlyComplete"
                        type="checkbox"
                        checked={this.state.isOnlyComplete}
                        onChange={this.handleCheckChange}
                      />
                        &nbsp; Exclude games ending in LRA-Start
                    </label>
                  </div>
                </Col>
              </Form.Row>
              <Form.Row>
              <Col className="formCol">
                  <div className="col text-center">
                    <label>
                    <BootstrapSwitchButton
                        checked={this.state.global}
                        onlabel=' '
                        offlabel=' '
                        size="xs"
                        onstyle="success"    
                        offstyle="secondary"                    
                        onChange= {
                          this.handleGlobalChange
                      }
                    />
                       &nbsp; Global Search
                    </label>
                  </div>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col className="formCol">
                  <div className="col text-center">
                    <button
                      className="btn btn-outline-secondary reg-btn"
                      type="button"
                      onClick={this.searchCode}
                    >
                      SEARCH
                    </button>
                  </div>
                </Col>
              </Form.Row>
            </Form>
            </Card.Body>
          </Card>
          <hr className="my-4"></hr>
        </div>
        <div className="col-md-12">
          {renderStats()}
        </div>
        <div className="col-md-12">
          <div className="footer">
            <h6>Chart.slp | Slippi Charts</h6>
          </div>
        </div>
      </div>
      </div>
    );
  }

}