import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { toastMessage } from "../../Components/toastMessage";

export default function SignUp(close) {
  const [fullName, setfullName] = useState("");
  const [mailId, setmailId] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpsw, setconfirmpsw] = useState("");
  const [nameerror, setnameerror] = useState("");
  const [usernameerror, setusernameerror] = useState("");
  const [pswerror, setpswerror] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [viewPsw, setviewPsw] = useState(false);

  const nameinput = useRef();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    nameinput.current.focus();
  }, []);

  const getName = (event) => {
    if (
      /^([a-zA-Z ]){1,15}$/.test(event.target.value.trim()) ||
      event.target.value === ""
    ) {
      setfullName(event.target.value);
      setnameerror("");
    } else {
      setnameerror("Only alphabets up to 15 characters are allowed");
    }
  };

  const getMailId = (event) => {
    if (validator.isEmail(event.target.value)) {
      setEmailError("");
    } else {
      setEmailError("Please enter valid Email");
    }
    setmailId(event.target.value);
  };

  const getPassword = (event) => {
    if (
      validator.isStrongPassword(event.target.value.trim(), {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setpswerror("");
    } else {
      setpswerror(
        "At least 1 upper case, 1 lower case, 1 number, 1 special character and min. 8 characters required"
      );
    }

    setpassword(event.target.value.trim());
  };

  const getUserName = (event) => {
    if (
      /^([a-z0-9-_]){1,10}$/.test(event.target.value) ||
      event.target.value === ""
    ) {
      setuserName(event.target.value);
      setusernameerror("");
    } else {
      setusernameerror(
        `Only lower case alphnumarics with "-" and "_" up to 10 characters are allowed without space`
      );
    }
  };

  const getSognUp = () => {
    if (
      userName !== "" &&
      password !== "" &&
      fullName !== "" &&
      confirmpsw !== "" &&
      pswerror === "" &&
      EmailError === ""
    ) {
      let mailArr = state.signInReducer.loginUserArray.filter(
        (item) => item.mailid === mailId
      );
      if (mailArr.length > 0) {
        toastMessage({
          appearance: "warn",
          message: "Account is already exists for this Mail Id",
        });
      } else {
        if (password === confirmpsw) {
          dispatch({
            type: "signUp",
            credentials: {
              userName: userName,
              mailid: mailId,
              password: confirmpsw,
              name: fullName,
            },
          });
          close.prop(false);
          console.log(state.signInReducer.loginUserArray);
          toastMessage({
            appearance: "success",
            message: "User has been registered successfully.",
          });
        } else {
          toastMessage({
            appearance: "error",
            message: "Password and Confirm Passwords are not matching.",
          });
        }
      }
    } else {
      toastMessage({
        appearance: "warn",
        message: "Please fill all mandatory(*) fields....",
        position: "top_right",
      });
    }
  };
  return (
    <div className="loginpage">
      <div className="row" style={{ overflow: "auto" }}>
        <div className="col-6 loginImageSection">
          <img
            src="Images/logo.png"
            alt=""
            style={{ height: "45vw", width: "35vw", marginLeft: "6vw" }}
          />
        </div>
        <div className="col-6" style={{ overflow: "auto" }}>
          <div style={{ height: "100%", fontSize: "1vw" }}>
            <form
              style={{ boxShadow: "0vw 0vw 5vw black" }}
              className="loginformcontainer"
              onSubmit={(event) => event.preventDefault()}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "2vw",
                }}
              >
                Sign Up
              </span>
              <label
                style={{
                  marginTop: "1vw",
                  marginBottom: "0.5vw !important",
                  fontSize: "1vw",
                }}
              >
                Name*:
              </label>
              <input
                type="text"
                className="loginfield"
                value={fullName}
                ref={nameinput}
                onChange={getName}
              />
              <div className="errorDiv">{nameerror}</div>
              <label
                style={{
                  marginTop: "1vw",
                  marginBottom: "0.5vw !important",
                  fontSize: "1vw",
                }}
              >
                Mail Id*:
              </label>
              <input
                type="text"
                className="loginfield"
                value={mailId}
                onChange={getMailId}
              />
              <div className="errorDiv">{EmailError}</div>
              <label
                style={{
                  marginTop: "1vw",
                  marginBottom: "0.5vw !important",
                  fontSize: "1vw",
                }}
              >
                User Name*:
              </label>
              <input
                type="text"
                className="loginfield"
                value={userName}
                onChange={getUserName}
              />
              <div className="errorDiv">{usernameerror}</div>
              <label for="pass" style={{ marginTop: "1vw", fontSize: "1vw" }}>
                Password*:
              </label>
              <input
                type="password"
                className="loginfield"
                name="password"
                id="psw"
                min="4"
                max="8"
                value={password}
                onChange={getPassword}
              />
              <div className="errorDiv">{pswerror}</div>
              <label for="pass" style={{ marginTop: "1vw", fontSize: "1vw" }}>
                Confirm Password*:
              </label>
              <div
                className="input-group mb-3"
                style={{
                  width: "98%",
                  border: "1px solid",
                  borderRadius: "4px",
                  height: "3vw",
                }}
              >
                <input
                  type={viewPsw ? "text" : "password"}
                  value={confirmpsw}
                  onChange={(event) => setconfirmpsw(event.target.value.trim())}
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    {viewPsw ? (
                      <i
                        className="fas fa-eye-slash"
                        onClick={() => setviewPsw(false)}
                      ></i>
                    ) : (
                      <i
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
                  onClick={getSognUp}
                >
                  Sign Up
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1vw",
                  whiteSpace: "pre",
                }}
              >
                Do you have account?{" "}
                <span
                  style={{ color: "#007bff", cursor: "pointer" }}
                  onClick={() => close.prop(false)}
                >
                  Sign In
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
