import React from "react";

export default function Register() {
  return (
    <div className="container w-75 mt-5 rounded rounded-2 shadow shadow-lg">
      <div className="row align-items-stretch">
        <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded rounded-2"></div>
        <div className="col bg-white p-5 rounded-end">
          <div>
            <h3>Crear una cuenta</h3>
            <p>Please, join to the family. Be focus, be fungi!</p>
          </div>
          <form action="">
            <div className="mb-2">
              <div className="form-floating   ">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="diaLluvioso"
                ></input>
                <label htmlFor="floatingInput">Username</label>
              </div>
            </div>
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
            <div className="mb-2">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                ></input>
                <label htmlFor="floatingPassword">Confirm Password</label>
              </div>
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn text-white mt-1 mb-2 p-2"
                id="logInBtnConfirm"
              >
                Confirmar
              </button>
            </div>
            <div className="my-1">
              <span>
                ¿Ya tienes cuenta? <a href="/login">Inicia sesion</a>
              </span>
              <br></br>
            </div>
          </form>

          <div className="container w-100 my-3">
            <div className="row text-center">
              <div className="col-12">Or you can Sign Up with:</div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <button
                  className="btn btn-outline w-100 my-1"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid rgb(79, 87, 86)",
                  }}
                >
                  <div className="row align-items-center">
                    <div className="col-2 d-none d-md-block">
                      <img
                        className="rounded rounded-3"
                        src="/img/googleLogIn.png"
                        width="32"
                        alt=""
                      ></img>
                    </div>
                    <div className="col-12 col-md-10 text-center">Google</div>
                  </div>
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-outline w-100 my-1"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid rgb(79, 87, 86)",
                  }}
                >
                  <div className="row align-items-center">
                    <div className="col-2 d-none d-md-block">
                      <img
                        className="rounded rounded-3"
                        src="/img/facebookLogIn.png"
                        width="32"
                        alt=""
                      ></img>
                    </div>
                    <div className="col-12 col-md-10 text-center">Facebook</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
