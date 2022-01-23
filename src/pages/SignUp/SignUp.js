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

  const handleSubmit = () => {
    if (!fullName) {
      setnameerror("Please enter your full name.");
    } else if (/^([a-zA-Z ]){1,15}$/.test(fullName)) {
      setnameerror("");
    } else {
      setnameerror("Only alphabets up to 15 characters are allowed");
    }

    if (validator.isEmail(mailId)) {
      setEmailError("");
    } else {
      setEmailError("Please enter valid Email");
    }

    if (!password) {
      setpswerror("Please enter password.");
    } else if (
      validator.isStrongPassword(password, {
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

    if (!userName) {
      setusernameerror("Please enter your user name.");
    } else if (/^([a-z0-9-_]){4,10}$/.test(userName)) {
      setusernameerror("");
    } else {
      setusernameerror(
        `Only lower case alphnumarics with "-" and "_" at least 4 up to 10 characters are allowed without space`
      );
    }
    getSognUp();
  };

  const getSognUp = () => {
    if (
      usernameerror === "" &&
      pswerror === "" &&
      nameerror === "" &&
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
    }
  };
  return (
    <div className="loginpage">
      <div
        className="row"
        style={{ overflow: "auto", display: "flex", alignItems: "center" }}
      >
        <div className="col-md-6 loginImageSection">
          <img
            src="Images/logo.png"
            alt=""
            style={{ height: "45vw", width: "35vw" }}
          />
        </div>
        <div
          className="col-md-6"
          style={{
            fontSize: "1vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
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
            <div
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                maxHeight: "30vw",
              }}
            >
              <label className="loginFieldLabel">Name*:</label>
              <input
                type="text"
                className="loginfield"
                value={fullName}
                ref={nameinput}
                onChange={(event) => setfullName(event.target.value)}
              />
              <div className="errorDiv">{nameerror}</div>
              <label className="loginFieldLabel">Mail Id*:</label>
              <input
                type="text"
                className="loginfield"
                value={mailId}
                onChange={(event) => setmailId(event.target.value)}
              />
              <div className="errorDiv">{EmailError}</div>
              <label className="loginFieldLabel">User Name*:</label>
              <input
                type="text"
                className="loginfield"
                value={userName}
                onChange={(event) => setuserName(event.target.value)}
              />
              <div className="errorDiv">{usernameerror}</div>
              <label for="pass" className="loginFieldLabel">
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
                onChange={(event) => setpassword(event.target.value.trim())}
              />
              <div className="errorDiv">{pswerror}</div>
              <label for="pass" className="loginFieldLabel">
                Confirm Password*:
              </label>
              <div
                className="input-group mb-3"
                style={{
                  width: "98%",
                  borderRadius: "4px",
                  height: "3vw",
                  margin: "0.5vw",
                }}
              >
                <input
                  type={viewPsw ? "text" : "password"}
                  value={confirmpsw}
                  style={{
                    height: "3vw",
                    border: "1px solid black",
                    minHeight: "15px",
                    fontSize: "1.2vw",
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
                    fontSize: "1vw",
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
                  onClick={handleSubmit}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
