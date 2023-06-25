import { useEffect, React } from "react";
import { useSession } from "next-auth/react";
import { Chart } from "chart.js/auto";

let canvas;

export default function Stats({ timeFrame }) {
  const { data: session, status } = useSession();

  function createChart(data) {
    let ctx = document.getElementById("myChart").getContext("2d");

    canvas = new Chart(ctx, data);
  }

  useEffect(() => {
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
        return;
      }

      let data = {
        type: "bar",
        data: {
          labels: new Array(offset + 1),
          datasets: [
            {
              label: ["Hours of study"],
              data: new Array((offset + 1)),
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

      try {
        createChart(data);
      } catch (err) {
        if (canvas) {
          canvas.destroy();
          createChart(data);
        }
      }
    }
    getDataForCharts();
  }, [timeFrame, session]);

  if (status === "loading") {
    return <div>Loading</div>;
  }

  if (!session) {
    return <div>Sorry, you need an acount for statistics</div>;
  }

  return <canvas id="myChart"></canvas>;
}
