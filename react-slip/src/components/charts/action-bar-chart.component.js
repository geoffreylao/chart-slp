import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import "chartjs-plugin-labels";
import Chart from 'chart.js';

export default class ActionsBarChart extends Component {
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
          labels: ['Wavedash', 'Waveland', 'Air Dodge', 'Dash Dance', 'Spot Dodge', 'Ledge Grab', 'Roll'],
          datasets: this.props.dataset,
        }}
         options = {{
           maintainAspectRatio:false,
           title: {
             display: true,
             text: 'Action Counts',
             fontSize: 20
           },
          legend: {
            display: this.props.labelBool,
            position: 'left',
            labels: {
              boxWidth: 13
            }
          },
          layout:{
            padding: {
              left: 0,
            }
          },
          scales: {
            yAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  display: true
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
                return data.labels[tooltipItem.index] + '  : ' + dataset.data[tooltipItem.index];
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