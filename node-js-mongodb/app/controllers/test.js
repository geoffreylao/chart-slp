for (let i = 0; i < oppchar.length; i++) {
   docCount = 0;
   count = 0;
   limit = 5000;
   skip = 0;


  do{
    const cursor = Match.aggregate([
      {
        '$match': {
          'players.characterString': {$in: characters}
        }
      }, {
        '$match': {
          'players.characterString': {$in: oppcharacters}
        }
      }, {
        '$match': {
          'settings.stageString': {
            '$in': [
              stages
            ]
          }
        }
      }, {
        '$match': {
          'metadata.gameComplete': {
            '$in': [
              complete
            ]
          }
        }
      }, {
        '$match': {
          'metadata.startAt': {
            '$gte': startdate, 
            '$lte': enddate
          }
        }
      }
    ]).lean().map(function(u) {return u}).skip(skip).limit(limit).sort('matchid')
    .cursor();
    
    docCount = 0;

    for (let doc = yield cursor.next(); doc != null; doc = yield cursor.next()) {
      docCount++;
      accumulateStats(mycode, doc);
    }

    count++;
    skip = count * limit
  }while(docCount !== 0)
}

function accumulateStatsGlobal(charString, res){
  if(!res.settings.isTeams){
    myTotalMatches++;

    frames += res.metadata.lastFrame;

    myTotalMinutes += res.metadata.minutes;

    // Total L R A Start
    if(res.metadata.winner === "INCOMPLETE"){
      myTotalLRAStart++;
      for (let j = 0; j < res.players.length; j++) {
        if(res.players[j].characterString === charString){
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




    // Character Usage, Neutral Wins, Counter Hits, Openings
    for (let j = 0; j < res.players.length; j++) {
      if(res.players[j].characterString === charString){
        if(res.players[j].code === res.metadata.firstBlood){
          myFirstBloods++;
        }else{
          myOppFirstBloods++;
        }

        if(res.players[j].code === res.metadata.winner){
          myTotalWins++;
          myStageWins[res.settings.stageId]++;
          // Vs and As Character Wins
          for (let j = 0; j < res.players.length; j++) {
            if(res.players[j].characterString === charString){
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
        }else if(res.players[j].code === res.metadata.winner && res.metadata.winner !== 'INCOMPLETE' && res.metadata.winner !== 'DRAW'){
          myTotalLosses++;
          myStageLoss[res.settings.stageId]++;
    
          // Vs and As Character Loss
          for (let j = 0; j < res.players.length; j++) {
            if(res.players[j].characterString === charString){
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
        if(res.metadata.winner === res.players[j].code){
          oppTally[current][3]++;
          gametimeWins.push(res.metadata.lastFrame)
        }
        if(res.metadata.winner !== res.players[j].code && res.metadata.winner !== 'INCOMPLETE' && res.metadata.winner !== 'DRAW'){
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
