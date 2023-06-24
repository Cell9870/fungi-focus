import React from "react";
import styles from "../login/styles.module.css";
import Image from "next/image";

export default function Error404() {
    return (
        <div className="container w-75 mt-5 rounded rounded-2 shadow shadow-lg">
            <div className="row align-items-stretch">
                <div className="col bg404 d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded rounded-2"></div>
                <div className="col bg-white p-5 rounded-end">
                    <div className="container mt-5 text-center" style={{ height: "25rem" }}>
                        <h3>OOOPS!</h3>
                        <p>
                            Nos atrapaste. Aun no hemos terminado de programar esta funcionalidad!
                            Lo sentimos mucho.

                            <br></br>
                            Pero prometemos que ya la vamos a realizar, ademas de muchas otras funciones!
                        </p>
                        <a className="mt-5" href="/">
                            <button
                                type="submit"
                                className="btn text-white mt-1 mb-2 p-2"
                                id="logInBtnConfirm"

                            >
                                Volver a la home page
                            </button>
                        </a>

                    </div>

                </div>
            </div>
        </div >
    );
}
