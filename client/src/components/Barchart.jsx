import React from "react";
import 'chart.js/auto'
import {Chart} from "chart.js"
import { Bar } from "react-chartjs-2";

export default function Barchart(props) {
  const labels = ["audio features"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "acousticness",
        borderRadius: 0,
        data: [props.acousticness],
        stack: 1,
        borderColor: "rgb(51, 185, 65)",
        borderWidth: 1,
        backgroundColor: "rgb(51, 185, 65, 0.7)",
        borderSkipped: false,
      },
      {
        label: "liveness",
        borderRadius: 0,
        data: [props.liveness],
        stack: 2,
        borderColor: "rgb(62, 141, 220)",
        borderWidth: 1,
        backgroundColor: "rgb(62, 141, 220, 0.7)",
        borderSkipped: false,
      },
      {
        label: "valence",
        borderRadius: 0,
        data: [props.valence],
        stack: 3,
        borderColor: "rgb(229, 76, 76)",
        borderWidth: 1,
        backgroundColor: "rgb(229, 76, 76, 0.7)",
        borderSkipped: false,
      },
      {
        label: "instrumentalness",
        borderRadius: 0,
        data: [props.instrumentalness],
        stack: 4,
        borderColor: "rgb(92, 215, 246)",
        borderWidth: 1,
        backgroundColor: "rgb(92, 215, 246, 0.7)",
        borderSkipped: false,
      },
      {
        label: "danceability",
        borderRadius: 0,
        data: [props.danceability],
        stack: 5,
        borderColor: "rgb(182, 136, 250)",
        borderWidth: 1,
        backgroundColor: "rgb(182, 136, 250, 0.7)",
        borderSkipped: false,
      },
      {
        label: "speechiness",
        borderRadius: 0,
        data: [props.speechiness],
        stack: 6,
        borderColor: "rgb(253, 227, 56)",
        borderWidth: 1,
        backgroundColor: "rgb(253, 227, 56, 0.7)",
        borderSkipped: false,
      },
      {
        label: "energy",
        borderRadius: 0,
        data: [props.energy],
        stack: 7,
        borderColor: "rgb(255, 144, 215)",
        borderWidth: 1,
        backgroundColor: "rgb(255, 144, 215, 0.7)",
        borderSkipped: false,
      },
    ]
  };
  return (
    <div style={{height:"98%", width:"98%", position:"relative", marginBottom:"1%", padding:"1%"}}>
      <Bar 
        options={{
          maintainAspectRatio : false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                title : () => null
              }
            }
          },
          datasets: {
            bar: {
              barPercentage: 0.9,
              categoryPercentage: 0.95
            }
          },
          scales: {
            x: {
              grid: {
                display: false,
              }, 
              ticks: {
                display: false 
              },
              barThickness: 2

            },
            y: {
              grid: {
                display: false
              }, 
              display: false
            }
          }
        }}
        data={data} />
    </div>
  );
};
