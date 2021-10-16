import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import "chartjs-plugin-labels";

export default class ColorBarChart extends Component {
  render() {
    const plugins = [{
      afterDraw: chart => {
        let ctx = chart.chart.ctx; 
        ctx.save();
        let xAxis = chart.scales['x-axis-0'];
        let yAxis = chart.scales['y-axis-0'];
        yAxis.ticks.forEach((value, index) => {  
          let y = yAxis.getPixelForTick(index);      
          let image = new Image();
          image.src = 'char_portraits/' + this.props.charImage[index]

            ctx.drawImage(image, xAxis.left - 90, y - 52, image.width*.50, image.height*.50);

          
        });  
        ctx.restore();    
    }}];
  
    return (
<div>
        <HorizontalBar
          data={{
            labels: ['Default', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt'],
            datasets: [
              {
                label: "Picked",
                data: this.props.colorData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{    
            maintainAspectRatio:false,         
            layout: {
              padding: {
                left: 120,
              }
            },
            scales: {
              yAxes: [{
                ticks: {
                  display: false,
                  beginAtZero: true,                  
                },
              }],
              xAxes: [{
                ticks: {
                  beginAtZero: true,
                //  suggestedMax: 100     
                },
                gridLines: {
                  
                }
              }],
            }, 
            title: {
              display: true,
              text: this.props.title,
              fontSize: 20,
            },
            legend: {
              display: false
            }
                        
          }}
          plugins={plugins}
        />
      </div>
    );
  }
}