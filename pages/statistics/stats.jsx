import { useEffect, React } from "react";
import { Chart } from "chart.js/auto";

let canvas;

export default function Stats({ chartType }) {
  function createChart() {
    let ctx = document.getElementById("myChart").getContext("2d");
    canvas = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Time Studying"],
        datasets: [
          {
            label: ["Dia 1"],
            data: [100],
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgb(255, 99, 132)"],
            borderWidth: 1,
          },
          {
            label: ["Dia 2"],
            data: [50],
            backgroundColor: ["rgba(255, 159, 64, 0.2)"],
            borderColor: ["rgb(255, 159, 64)"],
            borderWidth: 1,
          },
          {
            label: ["Dia 3"],
            data: [75],
            backgroundColor: ["rgba(255, 205, 86, 0.2)"],
            borderColor: ["rgb(255, 205, 86)"],
            borderWidth: 1,
          },
        ],
      },
    });
  }

  useEffect(() => {
    try {
      createChart();
    } catch (err) {
      if (canvas) {
        canvas.destroy();
        createChart();
      }
    }
  }, []);

  return <canvas id="myChart"></canvas>;
}
