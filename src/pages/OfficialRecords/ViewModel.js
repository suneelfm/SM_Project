import React from "react";

export default function ViewModel({
  empName,
  dateOfJoining,
  dateOfLeaving,
  Department,
  image,
}) {
  return (
    <div>
      <div
        className="col-12"
        style={{ padding: "0", display: "flex", justifyContent: "center" }}
      >
        <img
          src={`data:image/png;base64,${image}`}
          alt=""
          loading="lazy"
          style={{
            height: "8vw",
            width: "8vw",
            margin: "1.1vw 2vw 0.5vw 2vw",
            borderRadius: "0.5vw",
          }}
        />
      </div>
      <div className="row" style={{margin:"1vw 0"}}>
        <div className="col-5">
          <b>Employee Name: </b>
        </div>
        <div className="col-7">{empName}</div>
      </div>
      <div className="row" style={{margin:"1vw 0"}}>
        <div className="col-5">
          <b>Date of Joining: </b>
        </div>
        <div className="col-7">{dateOfJoining}</div>
      </div>
      <div className="row" style={{margin:"1vw 0"}}>
        <div className="col-5">
          <b>Date of Leaving: </b>
        </div>
        <div className="col-7">{dateOfLeaving}</div>
      </div>
      <div className="row" style={{margin:"1vw 0"}}>
        <div className="col-5">
          <b>Department: </b>
        </div>
        <div className="col-7">{Department}</div>
      </div>
    </div>
  );
}
