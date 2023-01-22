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
            labels: this.props.labels,
            datasets: [
              {
                label: "Picked",
                data: this.props.colorData,
                backgroundColor: this.props.backgroundColor,
                borderColor: this.props.borderColor,
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