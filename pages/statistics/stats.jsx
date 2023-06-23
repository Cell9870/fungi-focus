import { useEffect, React } from "react";
import { Chart } from "chart.js/auto";

let canvas;

export default function Stats({ timeFrame }) {
  function createChart() {
    let ctx = document.getElementById("myChart").getContext("2d");
    var canvak;
    switch (timeFrame) {
      case "day":
        canvak = ChartDay;
        break;
      case "week":
        canvak = chartWeeks;
        break;
      case "month":
        canvak = chartMonths;
        break;
      default:
        canvak = ChartDay;
        break;
    }

    canvas = new Chart(ctx, canvak);
  }

  useEffect(() => {
    async function getDataForCharts() {
      const actualDate = new Date();
      let idUser = "0";
      let response = await fetch(`http:localhost:3000/api/tasks/focusTimes/${idUser}/${timeFrame}`);
      let res = await response.json();

      console.log(res);

    }

    getDataForCharts();

    try {
      createChart();
    } catch (err) {
      if (canvas) {
        canvas.destroy();
        createChart();
      }
    }
  }, [timeFrame]);

  return (<canvas id="myChart"></canvas>);
}

let ChartDay = {
  type: "bar",
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: ["Hours of Study"],
        data: [3, 1, 2, 4],
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(54, 162, 235)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
      }
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

let chartWeeks = {
  type: "bar",
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: ["LGBT+ Hours of Study"],
        data: [3, 1, 2, 4, 5, 6, 3, 1, 2, 4, 5, 6],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
      }
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

let chartMonths = {
  type: "line",
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: ["LGBT+ Hours of Study"],
        data: [3, 5, 6],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
      }
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};