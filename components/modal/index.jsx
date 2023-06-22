import React from "react";

export const Modal = () => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      /* tabIndex="-1" */
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Pomodoro Personalizado
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body mt-3">
            <h6 className="mb-2">
              ¡Elija el tiempo de pomodoro y breaks que mas le convengan!
            </h6>
            <form action="" className="mt-2">
              <div className="form-floating mb-3 mt-3">
                <input
                  type="number"
                  className="form-control"
                  id="pomodoro"
                  placeholder="Enter time"
                  name="pomodoro"
                ></input>
                <label htmlFor="pomodoro">Pomodoro</label>
              </div>
              <div className="form-floating mb-3 mt-3">
                <input
                  type="number"
                  className="form-control"
                  id="sbreak"
                  placeholder="Short Break"
                  name="sbreak"
                ></input>
                <label htmlFor="sbreak">Short Break</label>
              </div>
              <div className="form-floating mb-3 mt-3">
                <input
                  type="number"
                  className="form-control"
                  id="lbreak"
                  placeholder="Long Break"
                  name="lbreak"
                ></input>
                <label htmlFor="lbreak">Long Break</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn botonCerrar"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn">
              Set personalizado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
