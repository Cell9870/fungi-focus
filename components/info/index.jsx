import React from "react";

export default function FungiInfo() {
  return (
    <div className="container w-75">
      <div className="text-center my-4">
        <h5>Acerca de fungi focus</h5>
      </div>
      <div></div>
      <b>
        <h6>Que es Fungifocus?</h6>
      </b>
      <hr
        className="rounded"
        style={{
          color: "#ffa751",
          border: "0.17rem solid",
          width: "5%",
        }}
      ></hr>
      <p>
        FungiFocus es un temporizador pomodoro personalizable que funciona en el
        navegador de escritorio. El objetivo de esta aplicación es ayudarlo a
        concentrarse en cualquier tarea en la que esté trabajando, como
        estudiar, escribir o programar. Esta aplicación está inspirada en la{" "}
        <a
          href="https://francescocirillo.com/products/the-pomodoro-technique"
          style={{ color: "#ffa751", textDecoration: "none" }}
        >
          Técnica Pomodoro
        </a>
        .
      </p>
      <div>
        <b>
          <h6>Cúal es la tecnica pomodoro?</h6>
        </b>
        <hr
          className="rounded"
          style={{
            color: "#ffa751",
            border: "0.17rem solid",
            width: "5%",
          }}
        ></hr>
        <p>
          La Técnica Pomodoro es creada por Francesco Cirillo para una forma más
          productiva de trabajar y estudiar. La técnica utiliza un temporizador
          para dividir el trabajo en intervalos, tradicionalmente de 25 minutos
          de duración, separados por breves descansos. Cada intervalo se conoce
          como pomodoro, de la palabra italiana para tomate, en honor al reloj
          de cocina con forma de tomate que Cirillo usaba cuando era estudiante
          universitario.{" "}
          <a
            href="https://es.wikipedia.org/wiki/T%C3%A9cnica_Pomodoro"
            style={{ color: "#ffa751", textDecoration: "none" }}
          >
            - Wikipedia
          </a>
        </p>
      </div>
      <div>
        <b>
          <h6>Cómo usar la tecnica pomodoro?</h6>
        </b>
        <hr
          className="rounded"
          style={{
            color: "#ffa751",
            border: "0.17rem solid",
            width: "5%",
          }}
        ></hr>
        <ol>
          <li>Agregue tareas para trabajar en el dia</li>
          <li>
            Seleccione un tiempo de pomodoro estimado (p.e 25min para cada
            trabajo)
          </li>
          <li>
            Seleccione una tarea en la que trabajar (puede utilizar solo el
            reloj pomodoro)
          </li>
          <li>
            Comience el temporizador y concentrese en la tarea durante el tiempo
            que selecciono
          </li>
          <li>
            Tomese un descanso de 5 minutos cuando termine el temporizador
          </li>
          <li>
            Itere este procedimiento hasta que finalice con exito sus tareas!
          </li>
        </ol>
      </div>
      <div>
        <b>
          <h6>Basic features</h6>
        </b>
        <hr
          className="rounded"
          style={{
            color: "#ffa751",
            border: "0.17rem solid",
            width: "5%",
          }}
        ></hr>
        <ul>
          <li>Tiempo de finalizacion estimado</li>
          <li>Agregue templates (tareas)</li>
          <li>Obtenga reportes visuales, estadisticas y mas</li>
          <li>
            Configuracion personalizada: Seleccione los tiempos de pomodoro y de
            descanso que usted prefiera
          </li>
        </ul>
      </div>
      <div>
        <b>
          <h6>Premium Features</h6>
        </b>
        <hr
          className="rounded"
          style={{
            color: "#ffa751",
            border: "0.17rem solid",
            width: "5%",
          }}
        ></hr>
        <ul>
          <li>Nothing: This app is totally FREE</li>
        </ul>
      </div>
      <div>
        <b>
          <h6>Focus time!</h6>
        </b>
        <hr
          className="rounded"
          style={{
            color: "#ffa751",
            border: "0.17rem solid",
            width: "5%",
          }}
        ></hr>
        <ul>
          <li>Just be cool, be focus, be fungi</li>
        </ul>
      </div>
    </div>
  );
};
