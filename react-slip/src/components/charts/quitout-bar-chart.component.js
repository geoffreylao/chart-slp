import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import "chartjs-plugin-labels";
import Chart from 'chart.js';

export default class QuitoutBarChart extends Component {
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
          data={{
            labels: this.props.charLabels,
            datasets: [
              {
                label: this.props.title,
                backgroundColor: this.props.charbackgroundColor,
                borderColor: this.props.charborderColor,
                hoverBackgroundColor: this.props.charhoverBackgroundColor,
                data: this.props.charData,
                borderWidth: 1
              }
            ]
          }}
          options={{   
            responsive: true,
            maintainAspectRatio: false,
            title:{
              display: true,
              text: this.props.title,
              fontSize: 20,
              position: 'top',
              
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,   
                  suggestedMax: 100               
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
            legend: {
              display: false,
              position: 'left',
            },
            plugins: {
              labels: {
                render: "image",
                images: this.props.charImage
              }
            },
            tooltips: {          
              yAlign: 'center',
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  return dataset.data[tooltipItem.index] + "%";
                },

                
              }
            }
          }}
        />
      </div>
    )
  }
}