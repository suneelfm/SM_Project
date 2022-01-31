import { Link } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function OtherRecords() {
  const mode = useSelector((state) => state.signInReducer.isDarkMode);
  return (
    <>
      <div className="row" style={{ padding: "0px", marginTop: "1vw" }}>
        <div className="col-12" style={{ padding: "0px 1vw" }}>
          <div
            style={{
              color: mode ? "cornflowerblue" : "rgb(37, 37, 138)",
              marginBottom: "0px",
              fontSize: "1.6vw",
            }}
          >
            Other Records
          </div>
          <div
            style={{
              color: "rgb(152, 152, 202)",
              marginBottom: "0px",
              fontSize: "1.15vw",
            }}
          >
            <Link
              to="/"
              className="link"
              style={{ color: "rgb(152, 152, 202)", marginBottom: "0px" }}
            >
              Home
            </Link>{" "}
            / Other Records
          </div>
        </div>
      </div>
      <div className="row underdevelopment">Need To Develop</div>
    </>
  );
}
