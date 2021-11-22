import React from "react";

import "./modal.css";

const Modal = (props) => {
  return (
    <div>
      <div
        className="modal-wrapper"
        style={{
          transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        <div className="modal-header">
          <h2>Modal Header</h2>
          <span className="close-modal-btn" onClick={props.close}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <p>Body Modal</p>
        </div>
        <div className="modal-footer">
          <p>This is Modal footer</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
