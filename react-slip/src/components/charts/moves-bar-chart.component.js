import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import "chartjs-plugin-labels";
import Chart from 'chart.js';

export default class MovesBarChart extends Component {
  render(){
    Chart.Tooltip.positioners.middle = elements => {
      let model = elements[0]._model;
      return {
        x: model.x,
        y: ((model.base + model.y) / 2)
      };
    };

    return(
      <div>
        <Bar
         data = {{
          labels: ['Jab', 'Dash Attack', 'F-tilt', 'U-tilt', 'D-tilt', 'F-Smash',
                  'U-Smash', 'D-Smash', 'Nair', 'Fair', 'Bair', 'Uair', 'Dair', 'Neutral-B',
                  'Side-B', 'Up-B', 'Down-B', 'Get-up Attack', 'Grab', 'Ledge Get-up Attack'],
          datasets: this.props.dataset,
          }}
         options = {{
           maintainAspectRatio: false,
           title:{
             display: true,
             text: this.props.title,
             fontSize: 20,
             position: 'top'
           },
          legend:{
            display: this.props.labelBool,
            position: 'left',
            labels: {
              boxWidth: 13
            }
          },
          layout:{
            padding: 0
          },
          scales: {
            yAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  display: false
                },
              },
            ],
            xAxes: [
              {
                stacked: true,
              },
            ],
          },
          plugins: {
            labels: {
              render: "image",
              images: ''
            }
          },
          tooltips: {
            
            yAlign: 'center',
            position: 'middle',
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                return data.labels[tooltipItem.index] + ': ' + dataset.data[tooltipItem.index];
              },
              title: function(tooltipItem, data) {
                return data.datasets[tooltipItem[0].datasetIndex].label
              }
              
            }
          }
        }}
        />
      </div>
    )
  }
}