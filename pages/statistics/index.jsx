import React from "react";
import Stats from "./stats";

export default function Statistics() {
  return (
    <div className="container w-75 my-3 rounded rounded-2 shadow shadow-lg">
      <div className="row align-items-stretch">
        <div className="col bg-white p-5 rounded">
          <div className="px-4">
            <h3>Estadisticas</h3>
            <p>
              Las siguientes son tus Estadisticas de tus tiempos de
              concentracicon utilizando Fungi Focus
            </p>
          </div>

          <ul className="nav nav-pills justify-content-center">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Resumen
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Detallado
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Ranking
              </a>
            </li>
          </ul>

          <hr
            className="my-4 mx-auto rounded"
            style={{ color: "#0c3e74", width: "80%" }}
          ></hr>

          <div className="px-4">
            <h5>Resumen de actividad</h5>
            <span>This report will be able when you are logged in</span>
            <div className="row text-center my-4">
              <div className="col-3 container shadow rounded p-2 statPersonalize">
                <div className="row">
                  <div className="col-4 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      className="bi bi-clock"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                    </svg>
                  </div>
                  <div className="col-8">
                    <div>-- aca irian los dias</div>
                    <div>horas focus</div>
                  </div>
                </div>
              </div>
              <div className="col-3 container shadow rounded p-2 statPersonalize">
                <div className="row">
                  <div className="col-4 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      className="bi bi-calendar-week"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                    </svg>
                  </div>
                  <div className="col-8">
                    <div>-- aca irian los dias</div>
                    <div>dias fungi mode</div>
                  </div>
                </div>
              </div>
              <div className="col-3 container shadow rounded p-2 statPersonalize">
                <div className="row">
                  <div className="col-4 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      className="bi bi-fire"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                    </svg>
                  </div>
                  <div className="col-8">
                    <div>-- aca irian los dias</div>
                    <div>record</div>
                  </div>
                </div>
              </div>
              <hr
                className="mt-5 mx-auto rounded"
                style={{ color: "#0c3e74", width: "80%" }}
              ></hr>
            </div>
            <div>
              <div className="row">
                <div className="col-8">
                  <h5>Focus hours</h5>
                  <p>
                    A continuacion se encuentra tu resumen de horas de
                    concentracion
                  </p>
                </div>
                <div className="col-4">
                  <div className="d-flex flex-row-reverse">
                    <a
                      href=""
                      className="text-white"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="p-2 bg-primary rounded text-center"
                        style={{ width: "5rem" }}
                      >
                        Mes
                      </div>
                    </a>
                    <a
                      href=""
                      className="text-white"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="p-2 bg-dark text-white rounded text-center"
                        style={{ width: "5rem" }}
                      >
                        Semana
                      </div>
                    </a>
                    <a
                      href=""
                      className="text-white"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="p-2 bg-info rounded text-center"
                        style={{ width: "5rem" }}
                      >
                        Dia
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="container p-4 w-75">
                <Stats chartType={"days"} />
              </div>
            </div>
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn botonCerrar text-white mt-1 mb-2 p-2"
              id="logInBtnConfirm"
            >
              Volver hacia atras
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
