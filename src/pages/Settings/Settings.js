import { Switch } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./settingStyle.css";

export default function Settings() {
  const mode = useSelector((state) => state.signInReducer.isDarkMode);

  const dispatch = useDispatch();

  return (
    <>
      <div className="row" style={{ padding: "0px", marginTop: "1vw" }}>
        <div className="col-12" style={{ padding: "0px 1vw" }}>
          <div
            style={{
              color: "rgb(37, 37, 138)",
              marginBottom: "0px",
              fontSize: "1.6vw",
            }}
          >
            Setting
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
            / Settings
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table
            className={
              mode ? "table table-dark table-hover" : "table table-hover"
            }
            style={{
              backgroundColor: mode ? "#1d1b1b" : "white",
              padding: "0",
              marginTop: "1vw",
              borderRadius: "0.5vw",
            }}
          >
            <tbody>
              <tr className="trow">
                <td className="tcol">
                  <Link
                    to={"/settings/profile"}
                    className="link"
                    style={{
                      color: mode ? "white" : "black",
                      marginBottom: "0px",
                      textDecoration: "none",
                    }}
                  >
                    <div className="profilefield">Profole</div>
                  </Link>
                </td>
              </tr>
              <tr className="trow">
                <td
                  className="tcol"
                  onClick={() =>
                    mode
                      ? dispatch({ type: "darkMode", mode: false })
                      : dispatch({ type: "darkMode", mode: true })
                  }
                >
                  <label
                    style={{
                      fontSize: "calc(2.5px + 1.1vw",
                      margin: "0.5vh 0",
                    }}
                  >
                    Dark Mode
                  </label>
                  <Switch
                    sx={{
                      "& .MuiSwitch-switchBase": {
                        fontSize: "1.5vw",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "rgb(37, 37, 138)",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "rgb(37, 37, 138)",
                        },
                      float: "right",
                    }}
                    checked={mode || mode}
                    // onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </td>
              </tr>
              <tr className="trow">
                <td className="tcol">
                  <div className="profilefield">Profole</div>
                </td>
              </tr>
              <tr className="trow">
                <td className="tcol">
                  <div className="profilefield">Profole</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
