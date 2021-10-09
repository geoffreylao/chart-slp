import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import "chartjs-plugin-labels";

export default class VerticalBarChart extends Component {
  render(){
    return(
      <div>
        <Bar
          data={{
            labels: [this.props.player, this.props.opponent],
            datasets: [
              {
                label: this.props.label,
                backgroundColor: ["rgba(165, 247, 184, 0.5)", "rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(72, 219, 143, 1)", "rgba(255, 99, 132, 1)"],
                data: this.props.data,
                borderWidth: 1
              }
            ]
          }}
          options={{   
            responsive: true,
            maintainAspectRatio: false,
            title:{
              display: true,
              text: this.props.label,
              fontSize: 20,
              position: 'top',
              padding: 15
            },
            legend: {
              display: false,
              labels: {
                boxWidth: 20,
                
              }
            },
            plugins: {
              labels: {
                render: 'value' 
              }
            },
            scales: {
              yAxes: [
                {
                  gridlines: {
                    display: false,
                    tickMarkLength: 15
                  },
                  ticks: {
                    beginAtZero: true,

                  }
                }
              ],
              xAxes: [
                {
                  //barThickness: 45,
                  //barPercentage: 1.0,
                  gridlines: {
                    display: false
                  },
                  ticks: {
                    beginAtZero: true,

                  }
                }
              ]
            },
            tooltips: {
              enabled: false
            }
          }}
        />
      </div>
    )
  }
}