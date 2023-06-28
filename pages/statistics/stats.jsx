import { useEffect, React, useState } from "react";
import { useSession } from "next-auth/react";
import { Chart } from "chart.js/auto";

let canvas;

export default function Stats({ timeFrame, setTime }) {
  const { data: session, status } = useSession();
  const [hasData, setHasData] = useState(false);

  function createChart(data) {
    let ctx = document.getElementById("myChart").getContext("2d");

    canvas = new Chart(ctx, data);
  }

  useEffect(() => {
    async function getTotalHours() {
      let idUser = session ? session.user.email : "0";
      let response = await fetch(
        `http://localhost:3000/api/tasks/focusTimes/${idUser}`
      );
      let res = await response.json();

      if (res.focusTime.length === 0) {
        return;
      }

      let totalHours = res.focusTime[0].concentracionTime;
      let days = 1;
      let streak = 1;
      let fecha = new Date(Date.parse(res.focusTime[0].horaAndFecha));
      for (let j = 1; j < res.focusTime.length; j++) {
        let current = new Date(Date.parse(res.focusTime[j].horaAndFecha));

        if (fecha.getDate() != current.getDate()) {
          days += 1;
          streak += 1;
          fecha = current;
        }

        if (Math.floor((fecha.getDate() - current.getDate()) / (1000 * 60 * 60 * 24)) > 1) {
          streak = 1;
        }

        totalHours += res.focusTime[j].concentracionTime;
      }

      setTime({
        hours: totalHours,
        days,
        streak,
      });
    }
    async function getDataForCharts() {
      let offset;
      switch (timeFrame) {
        case "day":
          offset = 0;
          break;
        case "week":
          offset = 6;
          break;
        case "month":
          offset = 29;
          break;
      }

      let idUser = session ? session.user.email : "0";
      let response = await fetch(
        `http://localhost:3000/api/tasks/focusTimes/${idUser}/${offset}`
      );
      let res = await response.json();

      /* console.log(res); */
      if (res.focusTime.length === 0) {
        setHasData(false);
        return;
      }

      let data = {
        type: "bar",
        data: {
          labels: new Array(offset + 1),
          datasets: [
            {
              label: ["Hours of study"],
              data: new Array(offset + 1),
            },
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      for (let i = 0; i < offset + 1; i++) {
        data.data.datasets[0].data[i] = 0;
      }
      let date = new Date();

      for (let i = 0; i < offset + 1; i++) {
        data.data.labels[offset - i] = date.toLocaleDateString("es-US");

        for (let j = 0; j < res.focusTime.length; j++) {
          let current = new Date(Date.parse(res.focusTime[j].horaAndFecha));

          if (current.getDate() == date.getDate()) {
            data.data.datasets[0].data[offset - i] +=
              res.focusTime[j].concentracionTime;
          }
        }
        date.setDate(date.getDate() - 1);
      }
      setHasData(true);

      try {
        createChart(data);
      } catch (err) {
        if (canvas) {
          canvas.destroy();
          createChart(data);
        }
      }
    }
    getTotalHours();
    getDataForCharts();
  }, [timeFrame, session]);

  if (status === "loading") {
    return <div>Loading</div>;
  }

  if (!session) {
    return <div>Sorry, you need an acount for statistics</div>;
  }

  return (
    <>
      <canvas hidden={!hasData} id="myChart"></canvas>
      <div hidden={hasData}>No data for the selected time period</div>
    </>
  );
}
