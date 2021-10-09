import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';
import "chartjs-plugin-labels";

export default class PieChart extends Component {
  render(){
    return(
      <div>
        <Pie
          data={{
            labels: this.props.charLabels,
            datasets: [
              {
                label: this.props.title,
                backgroundColor: this.props.charbackgroundColor,
                borderColor: this.props.charborderColor,
                hoverBackgroundColor: this.props.charhoverBackgroundColor,
                data: this.props.charData
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
              position: 'top'
            },
            legend: {
              display: this.props.labelBool,
              position: 'left',
              labels: {
                boxWidth: 20,
              
              }
            },
            plugins: {
              labels: {
                render: "image",
                images: this.props.charImage
              }
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });

                  var currentValue = dataset.data[tooltipItem.index];
                  var oglabel = data.labels[tooltipItem.index];
                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
                  return oglabel + " : " + precentage + "%";
                }
              }
            }
          }}
        />
      </div>
    )
  }
}