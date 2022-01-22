import React from "react";

export default function ConfirmationPopup({
  message,
  selectedrecords,
  onClickofYes,
  onClickofNo,
}) {
  return (
    <div className="popupBack">
      <div className="confirmationPopup">
        <div style={{ padding: "1vw" }}>
          <i
            className="fas fa-question-circle"
            style={{ fontSize: "2vw", marginTop: "2vw", marginBottom: "1vw" }}
          />
          <h5 style={{fontSize:"1.2vw"}}>{message}</h5>
          <div style={{fontSize:"0.8vw"}}>{selectedrecords    }</div>
          <button className="buttonProp" onClick={onClickofNo}>
            No
          </button>
          <button className="buttonProp" onClick={onClickofYes}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
