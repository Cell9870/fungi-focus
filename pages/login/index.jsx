import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LogIn() {
  return (
    <div className="container w-75 mt-5 rounded rounded-2 shadow shadow-lg log-in">
      <div className="row align-items-stretch">
        <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded rounded-2"></div>
        <div className="col bg-white p-5 rounded-end">
          <div>
            <h3>Bienvenido</h3>
            <p>
              Please, log in into our website to see your full statistics and
              options. Be focus, be fungi!
            </p>
          </div>
          <form action="">
            <div className="mb-2">
              <div className="form-floating   ">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                ></input>
                <label htmlFor="floatingInput">Email address</label>
              </div>
            </div>
            <div className="mb-2">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                ></input>
                <label htmlFor="floatingPassword">Password</label>
              </div>
            </div>
            <div className="mb-2 form-check">
              <input
                type="checkbox"
                name="connected"
                className="form-check-input"
                id=""
              ></input>
              <label htmlFor="connected" className="form-check-label">
                Recordar mi usuario
              </label>
            </div>

            <a href="/error404" style={{ textDecoration: "none" }}>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn text-white mt-1 mb-2 p-2"
                  id="logInBtnConfirm"
                >
                  Confirmar
                </button> </div>
            </a>


            <div className="my-1">
              <span>
                ¿No tienes cuenta? <a href="/register">Registrate</a>
              </span>
              <br></br>
              <span>
                {" "}
                <a href="/error404">Recuperar contraseña</a>
              </span>
            </div>
          </form>

          <div className="container w-100 my-3">
            <div className="row text-center">
              <div className="col-12">Iniciar Sesion</div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <button
                  className={styles.btn + " btn-outline w-100 my-1 p-2"}
                  onClick={signIn}
                >
                  <div className="row align-items-center">
                    <div className="col-2 d-none d-md-block">
                      <Image
                        className="rounded rounded-3"
                        src="/../public/googleLogIn.png"
                        height="32"
                        width="32"
                        alt=""
                      />
                    </div>
                    <div className="col-12 col-md-10 text-center">Google</div>
                  </div>
                </button>
              </div>
              <div className="col">
                <a href="/error404">
                  <button className={styles.btn + " btn-outline w-100 my-1 p-2"}>
                    <div className="row align-items-center">
                      <div className="col-2 d-none d-md-block">
                        <Image
                          className="rounded rounded-3"
                          src="/../public/facebookLogIn.png"
                          width="32"
                          height="32"
                          alt=""
                        />
                      </div>
                      <div className="col-12 col-md-10 text-center">Facebook</div>
                    </div>
                  </button>
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
