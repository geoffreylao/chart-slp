import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import "chartjs-plugin-labels";

export default class CharBarChart extends Component {
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
          image.src = this.props.charImage[index]

            ctx.drawImage(image, xAxis.left - 30, y - 13, image.width*.31, image.height*.31);

          
        });  
        ctx.restore();    
    }}];
  
    return (
      <div>
        <HorizontalBar
          data={{
            labels: this.props.charLabels,
            datasets: [
              {
                label: "Winrate %",
                data: this.props.charData,
                backgroundColor: this.props.charbackgroundColor,
                borderColor: this.props.charborderColor,
                borderWidth: 1,
              },
            ],
          }}       
          options={{  
            maintainAspectRatio:false,          
            layout: {
              padding: {
                left: 20,              
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
                  max: 100
                },
                gridLines: {
                  
                }
              }],
            },
            title: {
              display: true,
              text: this.props.title,
              fontSize: 20
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