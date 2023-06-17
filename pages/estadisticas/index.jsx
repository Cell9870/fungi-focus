"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";

import { Bar } from "react-chartjs-2";

//elementos de un barchart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["Dia 1", "Dia 2", "Dia 3", "Dia 4", "Dia 5"],
      datasets: [
        {
          label: "Hours of Study",
          data: [2, 2, 3, 4, 2],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53, 162, 235, 0.4)",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        //titulo del grafico
        title: {
          display: true,
          text: "Daily Study hours",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
}
