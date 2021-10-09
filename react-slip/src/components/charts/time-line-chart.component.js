import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

function showTwoDigits(number) {
  return ("00" + number).slice(-2);
}

function displayTime(currentFrame) {
  var fps = 60;

  var m = Math.floor(currentFrame / (60 * fps)) % 60;
  var s = Math.floor(currentFrame / fps) % 60;

  return showTwoDigits(m) + ":" + showTwoDigits(s);
}

export default class TimeLineChart extends Component {
  render() {
    var labelsarr = [];

    for (let i = 0; i < this.props.rangearr.length - 1; i++) {
      labelsarr.push(displayTime(this.props.rangearr[i]) + "-" + displayTime(this.props.rangearr[i + 1]));
    }

    var totalMatchRangeTotal = this.props.bardata.reduce((a, b) => a + b, 0)
    var totalranges = new Array(10).fill(0);

    var mybardata = this.props.bardata

    for (let i = 0; i < totalranges.length; i++) {
      totalranges[i] = ((this.props.bardata[i] / totalMatchRangeTotal) * 100).toFixed(2)
    }

    return (
      <div>
        <Bar 
        data ={{     
          labels: labelsarr,
          datasets: [
            {
              type: 'line',
              label: "Winrate",
              data: this.props.linedata,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)"
            },
            {
              type: 'bar',
              label: "% of Matches Played",
              data: totalranges,
              fill: false,
              backgroundColor: "rgb(0, 99, 132)",
              borderColor: "rgba(0, 99, 132, 0.2)"
            }
          ]            
        }}
        options={{
          maintainAspectRatio:false,
          scales: {
            yAxes: [
              {
                ticks: {
                  max: 100,
                  min: 0
                }
              }
            ]
          },
          spanGaps: true,
          legend:{
              display: false            
          },
          title: {
            display: true,
            text: "Winrate over Match Duration",
            fontSize: 20
          },
          layout: {
            padding: {
              top: 10
            }
          },
          plugins: {
            labels: {
              render: "image",
              images: ''
            }
          },
          tooltips: {              
            yAlign: 'bottom',
            xAlign: 'center',
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];

                if(dataset.type === 'line'){
                  return "Winrate: " +  Math.ceil(dataset.data[tooltipItem.index]) + "%";
                }else{
                  return "Games in Range: " +  mybardata[tooltipItem.index] + " (" + dataset.data[tooltipItem.index] + "%)";
                }
                
               
                // 
              },              
            }
          }
        }}
        />
      </div>
    );
  }
}

