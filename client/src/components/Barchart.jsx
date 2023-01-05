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
        borderRadius: Number.MAX_VALUE,
        data: [props.acousticness],
        stack: 1,
        borderColor: "rgb(211, 201, 206)",
        borderWidth: 1,
        backgroundColor: "rgb(211, 201, 206, 0.7)",
        borderSkipped: false,
      },
      {
        label: "liveness",
        borderRadius: Number.MAX_VALUE,
        data: [props.liveness],
        stack: 2,
        borderColor: "rgb(190, 178, 167)",
        borderWidth: 1,
        backgroundColor: "rgb(190, 178, 167, 0.7)",
        borderSkipped: false,
      },
      {
        label: "valence",
        borderRadius: Number.MAX_VALUE,
        data: [props.valence],
        stack: 3,
        borderColor: "rgb(213, 196, 161)",
        borderWidth: 1,
        backgroundColor: "rgb(213, 196, 161, 0.7)",
        borderSkipped: false,
      },
      {
        label: "instrumentalness",
        borderRadius: Number.MAX_VALUE,
        data: [props.instrumentalness],
        stack: 4,
        borderColor: "rgb(181, 178, 146)",
        borderWidth: 1,
        backgroundColor: "rgb(181, 178, 146, 0.7)",
        borderSkipped: false,
      },
      {
        label: "danceability",
        borderRadius: Number.MAX_VALUE,
        data: [props.danceability],
        stack: 5,
        borderColor: "rgb(213, 211, 191)",
        borderWidth: 1,
        backgroundColor: "rgb(213, 211, 191, 0.7)",
        borderSkipped: false,
      },
      {
        label: "speechiness",
        borderRadius: Number.MAX_VALUE,
        data: [props.speechiness],
        stack: 6,
        borderColor: "rgb(168, 173, 180)",
        borderWidth: 1,
        backgroundColor: "rgb(168, 173, 180, 0.7)",
        borderSkipped: false,
      },
      {
        label: "energy",
        borderRadius: Number.MAX_VALUE,
        data: [props.energy],
        stack: 7,
        borderColor: "rgb(210, 214, 217)",
        borderWidth: 1,
        backgroundColor: "rgb(210, 214, 217, 0.7)",
        borderSkipped: false,
      }
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
              categoryPercentage: 0.8
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
