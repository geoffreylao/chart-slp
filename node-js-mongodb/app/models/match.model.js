// TODO update with new model

module.exports = mongoose => {
  const Match = mongoose.model(
    "matches",
    mongoose.Schema({
      matchid: {
        type: String
      },
      settings: {
        isTeams: {
          type: Boolean
        },
        isPal: {
          type: Boolean
        },
        stageId: {
          type: Number
        },
        stageString: {
          type: String
        }
      },
      metadata: {
        startAt: {
          type: Date
        },
        lastFrame: {
          type: Number
        },
        minutes: {
          type: Number
        },
        gameComplete: {
          type: Boolean
        },
        winner: {
          type: String
        },
        firstBlood: {
          type: String
        },
      },
      players:[{
        _id: false,
        playerIndex: {
          type: Number
        },
        characterId: {
          type: Number
        },
        characterColor: {
          type: Number
        },
        code: {
          type: String
        },
        name: {
          type: String
        },
        characterString: {
          type: String
        },
        actionCounts: {
          wavedashCount: {
            type: Number
          },
          wavelandCount: {
            type: Number
          },
          airDodgeCount: {
            type: Number
          },
          dashDanceCount: {
            type: Number
          },
          spotDodgeCount: {
            type: Number
          },
          ledgegrabCount: {
            type: Number
          },
          rollCount: {
            type: Number
          }
        },
        conversions: [{
          _id: false,
          playerIndex: {
            type: Number
          },
          opponentIndex: {
            type: Number
          },
          startFrame: {
            type: Number
          },
          endFrame: {
            type: Number
          },
          startPercent: {
            type: Number
          },
          currentPercent: {
            type: Number
          },
          endPercent: {
            type: Number
          },
          moves: [{
            _id: false,
            frame: {
              type: Number
            },
            moveId: {
              type: Number
            },
            hitCount: {
              type: Number
            },
            damage: {
              type: Number
            }
          }],
          didKill: {
            type: Boolean
          },
          openingType: {
            type: String
          }
        }],
        inputCounts: {
          buttons: {
            type: Number
          },
          triggers: {
            type: Number
          },
          cstick: {
            type: Number
          },
          joystick: {
            type: Number
          },
          total: {
            type: Number
          }
        },
        conversionCount: {
          type: Number
        },
        totalDamage: {
          type: Number
        },
        killCount: {
          type: Number
        },
        creditedKillCount: {
          type: Number
        },
        successfulConversions: {
          type: Number
        },
        openings: {
          type: Number
        },
        neutralWins: {
          type: Number
        },
        counterHits: {
          type: Number
        },
        trades: {
          type: Number
        },
        deathCount: {
          type: Number
        },
        lcancelPercent: {
          type: Number
        },
        grabCount: {
          success: {
            type: Number
          },
          fail: {
            type: Number
          },
        },
        throwCount: {
          up: {
            type: Number
          },
          forward: {
            type: Number
          },
          back: {
            type: Number
          },
          down: {
            type: Number
          },
        },
        groundTechCount: {
          backward: {
            type: Number
          },
          forward: {
            type: Number
          },
          neutral: {
            type: Number
          },
          fail: {
            type: Number
          },
        },
        wallTechCount: {
          success: {
            type: Number
          },
          fail: {
            type: Number
          },
        },
        stocks: [{
          _id: false,
          playerIndex: {
            type: Number
          },
          opponentIndex: {
            type: Number
          },
          startFrame: {
            type: Number
          },
          endFrame: {
            type: Number
          },
          startPercent: {
            type: Number
          },
          endPercent: {
            type: Number
          },
          currentPercent: {
            type: Number
          },
          count: {
            type: Number
          },
          deathAnimation: {
            type: Number
          }
        }]
      }]
    }
    )
  );

  return Match;
}