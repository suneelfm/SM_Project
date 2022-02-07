import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toastMessage } from "../../Components/toastMessage";
import validator from "validator";

export default function ChangePassword() {
  const [viewPsw, setviewPsw] = useState(false);
  const mode = useSelector((state) => state.signInReducer.isDarkMode);
  const [currentPassword, setcurrentPassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpsw, setconfirmpsw] = useState("");

  const pswinput = useRef();

  const state = useSelector((state) => state.signInReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    pswinput.current.focus();
  }, []);

  const changePassword = () => {
    if (state.loggedInUser.password === currentPassword) {
      if (
        validator.isStrongPassword(newpassword, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        if (newpassword === confirmpsw) {
          dispatch({ type: "ChagePassword", password: confirmpsw });
          toastMessage({
            appearance: "success",
            message: "Password has been changed successfully",
          });
          window.history.back();
        } else {
          toastMessage({
            appearance: "error",
            message: "New Password and Confirm Passwords are not matching.",
          });
        }
      } else {
        toastMessage({
          appearance: "error",
          message:
            "Please enter strong new password. At least 1 upper case, 1 lower case, 1 number, 1 special character and min. 8 characters required",
        });
      }
    } else {
      toastMessage({
        appearance: "error",
        message: "Invalid current password.",
      });
    }
  };

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
          <div className="col-3">
            <label for="pass" className="loginFieldLabel">
              Current Password*:
            </label>
            <input
              type="password"
              ref={pswinput}
              style={{ minHeight: "15px", fontSize: "1.2vw" }}
              className={mode ? "loginfieldDark" : "loginfieldLight"}
              name="password"
              id="psw"
              min="4"
              max="8"
              value={currentPassword}
              onChange={(event) =>
                setcurrentPassword(event.target.value.trim())
              }
            />
            <label for="pass" className="loginFieldLabel">
              New Password*:
            </label>
            <input
              type="password"
              style={{ minHeight: "15px", fontSize: "1.2vw" }}
              className={mode ? "loginfieldDark" : "loginfieldLight"}
              name="password"
              id="psw"
              min="4"
              max="8"
              value={newpassword}
              onChange={(event) => setnewpassword(event.target.value.trim())}
            />
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
                value={confirmpsw}
                style={{
                  height: "3vw",
                  minHeight: "15px",
                  border: "1px solid black",
                  fontSize: "1.2vw",
                  backgroundColor: "inherit",
                  color: "inherit",
                }}
                onChange={(event) => setconfirmpsw(event.target.value.trim())}
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
                style={{ marginTop: "1vw", fontSize: "1vw", width: "5vw" }}
                type="button"
                className="buttonProp"
                onClick={() => {
                  window.history.back();
                }}
              >
                Cancel
              </button>
              {newpassword !== "" ? (
                <button
                  style={{ marginTop: "1vw", fontSize: "1vw" }}
                  type="submit"
                  className="buttonProp"
                  onClick={changePassword}
                >
                  Change Password
                </button>
              ) : (
                <button
                  style={{
                    marginTop: "1vw",
                    fontSize: "1vw",
                    cursor: "no-drop",
                    backgroundColor: "rgb(152, 152, 202)",
                  }}
                  type="submit"
                  className="buttonProp"
                >
                  Change Password
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
