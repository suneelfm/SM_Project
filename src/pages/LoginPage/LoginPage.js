import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SignUp from "../SignUp/SignUp";
import ForgotPassword from "../ForgotPasswordPage/ForgotPassword";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { toastMessage } from "../../Components/toastMessage";
import { useDispatch } from "react-redux";

export default function LoginPage(close) {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [isclicked, setisclicked] = useState(false);
  const [showSignUpPage, setshowSignUpPage] = useState(false);
  const [showForgotPasswordPage, setshowForgotPasswordPage] = useState(false);
  const [isRemeberUser, setisRemeberUser] = useState(false);
  const [viewPsw, setviewPsw] = useState(false);
  const username = useRef();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const mode = useSelector((state) => state.signInReducer.isDarkMode);

  useEffect(() => {
    username.current.focus();
  }, []);

  useEffect(() => {
    if (isclicked) {
      checkCredentials();
      setisclicked(false);
    }
  }, [state.signInReducer.isLoginTrue, isclicked]);

  const getlogin = () => {
    if (userName !== "" && password !== "") {
      setisclicked(true);
    } else {
      toastMessage({
        appearance: "warn",
        message: "Please enter User Name and Password",
      });
    }
  };

  const checkCredentials = () => {
    const filArr = state.signInReducer.loginUserArray.filter(
      (val) => userName === val.userName && password === val.password
    );
    if (filArr.length > 0) {
      dispatch({ type: "signIn", userDetails: filArr[0] });
      isRemeberUser
        ? localStorage.setItem("SMPuser", filArr[0].name)
        : sessionStorage.setItem("SMPuser", filArr[0].name);
      isRemeberUser
        ? localStorage.setItem("SMPuserimage", filArr[0].img.name)
        : sessionStorage.setItem("SMPuserimage", filArr[0].img.name);
      close.prop.setuser(
        sessionStorage.getItem("SMPuser") === null
          ? localStorage.getItem("SMPuser") === null
            ? "Sign In"
            : localStorage.getItem("SMPuser")
          : sessionStorage.getItem("SMPuser")
      );
      close.prop.setuserImage(
        sessionStorage.getItem("SMPuserimage") === null
          ? localStorage.getItem("SMPuserimage") === null
            ? "/Images/profile.png"
            : localStorage.getItem("SMPuserimage")
          : sessionStorage.getItem("SMPuserimage")
      );
    } else {
      toastMessage({
        appearance: "error",
        message: "Invalid User Name and Password.",
      });
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
            overflow: "auto",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
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
                Sign In
              </span>
              <label className="loginFieldLabel">User Name:</label>
              <input
                type="text"
                className={mode ? "loginfieldDark" : "loginfieldLight"}
                value={userName}
                ref={username}
                onChange={(event) => setuserName(event.target.value)}
              />
              <label className="loginFieldLabel">Password:</label>
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
                  value={password}
                  style={{
                    height: "3vw",
                    border: "1px solid black",
                    minHeight: "15px",
                    fontSize: "1.2vw",
                  }}
                  onChange={(event) => setpassword(event.target.value)}
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

              <span>
                <FormControlLabel
                  style={{ margin: "0.8vw 0" }}
                  control={
                    <Checkbox
                      checked={isRemeberUser}
                      onChange={() =>
                        isRemeberUser
                          ? setisRemeberUser(false)
                          : setisRemeberUser(true)
                      }
                      sx={{
                        "&.Mui-checked": {
                          color: "rgb(37, 37, 138)",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: "1.5vw",
                        },
                        padding: "0",
                        margin: "0 0.5vw 0 0vw",
                      }}
                    />
                  }
                  label={
                    <Typography
                      style={{ fontSize: "1vw", fontFamily: "inherit" }}
                    >
                      Remember user
                    </Typography>
                  }
                />
              </span>
              <span
                onClick={() => setshowForgotPasswordPage(true)}
                style={{
                  marginTop: "1vw",
                  fontSize: "1vw",
                  color: "blue",
                  cursor: "pointer",
                  marginRight: "0.5vw",
                  float: "right",
                  textAlign: "right",
                }}
              >
                Forgot Password
              </span>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{ marginTop: "1vw", fontSize: "1vw" }}
                  type="submit"
                  className="buttonProp"
                  onClick={getlogin}
                >
                  Login
                </button>
              </div>
              <span
                style={{
                  marginTop: "1vw",
                  fontSize: "1vw",
                  display: "flex",
                  justifyContent: "center",
                  whiteSpace: "pre",
                }}
              >
                Don't have account?{" "}
                <span
                  style={{ color: "#007bff", cursor: "pointer" }}
                  onClick={() => setshowSignUpPage(true)}
                >
                  Sign Up
                </span>
              </span>
            </form>
          </div>
        </div>
      </div>
      {showSignUpPage && <SignUp prop={setshowSignUpPage} />}
      {showForgotPasswordPage && (
        <ForgotPassword prop={setshowForgotPasswordPage} />
      )}
    </div>
  );
}
