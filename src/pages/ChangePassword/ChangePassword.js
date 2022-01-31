import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ChangePassword() {
  const [viewPsw, setviewPsw] = useState(false);
  const mode = useSelector((state) => state.signInReducer.isDarkMode);

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
            Change Password
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
            /{" "}
            <Link
              to="/settings"
              className="link"
              style={{ color: "rgb(152, 152, 202)", marginBottom: "0px" }}
            >
              Settings
            </Link>{" "}
            / Change Password
          </div>
        </div>
      </div>
      <div className="row col-12" style={{ height: "85%" }}>
        <div
          className="col-12"
          style={{
            backgroundColor: mode ? "#202124" : "white",
            color: mode ? "white" : "black",
            borderRadius: "0.5vw",
            marginTop: "2vw",
            height: "80%",
          }}
        >
          {/* {okPsw && ( */}
          <div className="col-3">
            <label for="pass" className="loginFieldLabel">
              Current Password*:
            </label>
            <input
              type="password"
              // ref={pswinput}
              style={{ minHeight: "15px", fontSize: "1.2vw" }}
              className={mode ? "loginfieldDark" : "loginfieldLight"}
              name="password"
              id="psw"
              min="4"
              max="8"
              // value={password}
              // onChange={(event) => setpassword(event.target.value.trim())}
            />
            {/* <div className="errorDiv">{pswerror}</div> */}
            <label for="pass" className="loginFieldLabel">
              New Password*:
            </label>
            <input
              type="password"
              // ref={pswinput}
              style={{ minHeight: "15px", fontSize: "1.2vw" }}
              className={mode ? "loginfieldDark" : "loginfieldLight"}
              name="password"
              id="psw"
              min="4"
              max="8"
              // value={password}
              // onChange={(event) => setpassword(event.target.value.trim())}
            />
            {/* <div className="errorDiv">{pswerror}</div> */}
            <label for="pass" className="loginFieldLabel">
              Confirm Password*:
            </label>
            <div
              className="input-group m-2"
              style={{
                width: "98%",
                borderRadius: "4px",
                height: "3vw",
                backgroundColor: mode ? "rgb(59, 59, 59)" : "white",
                color: mode ? "white" : "black",
              }}
            >
              <input
                type={viewPsw ? "text" : "password"}
                //   value={confirmpsw}
                style={{
                  height: "3vw",
                  minHeight: "15px",
                  border: "1px solid black",
                  fontSize: "1.2vw",
                  backgroundColor: "inherit",
                  color: "inherit",
                }}
                //   onChange={(event) => setconfirmpsw(event.target.value.trim())}
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
              />
              <div
                className="input-group-append"
                style={{
                  height: "3vw",
                  minHeight: "15px",
                  border: "1px solid black",
                  borderRadius: "0 4px 4px 0",
                }}
              >
                <span className="input-group-text">
                  {viewPsw ? (
                    <i
                      style={{ fontSize: "1.5vw" }}
                      className="fas fa-eye-slash"
                      onClick={() => setviewPsw(false)}
                    ></i>
                  ) : (
                    <i
                      style={{ fontSize: "1.5vw" }}
                      className="fas fa-eye"
                      onClick={() => setviewPsw(true)}
                    ></i>
                  )}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{ marginTop: "1vw", fontSize: "1vw" }}
                type="button"
                className="buttonProp"
                //   onClick={() => {
                //     close.prop(false);
                //     setotp("");
                //   }}
              >
                Cancel
              </button>
              {/* {okOTP ? ( */}
              okPsw ? (
              <button
                style={{ marginTop: "1vw", fontSize: "1vw" }}
                type="submit"
                className="buttonProp"
                // onClick={getPassword}
              >
                Change Password
              </button>
              ) : (
              <button
                style={{ marginTop: "1vw", fontSize: "1vw" }}
                type="submit"
                className="buttonProp"
                // onClick={getMailId}
              >
                Check Password
              </button>
              {/* )} */}
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
}
