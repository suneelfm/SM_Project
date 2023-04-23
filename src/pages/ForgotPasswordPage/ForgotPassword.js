import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import emailjs from "emailjs-com";
import OTPInput from "../../Components/OTPInput";
import { toastMessage } from "../../Components/toastMessage";

export default function ForgotPassword(close) {
  const [mailId, setMailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPsw, setConfirmPsw] = useState("");
  const [pswError, setPswError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [okPsw, setOkPsw] = useState(false);
  const [viewPsw, setViewPsw] = useState(false);
  const [okOTP, setOkOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState({});
  const mailInput = useRef();
  const pswInput = useRef();
  const mode = useSelector((state) => state.signInReducer.isDarkMode);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    // okOTP
    //   ? otpinput.current.focus()
    //   :
    okPsw ? pswInput.current.focus() : mailInput.current.focus();
  }, [okPsw]);

  const getMailId = () => {
    if (validator.isEmail(mailId)) {
      setEmailError("");
      sendOTP();
    } else {
      setEmailError("Please enter valid Email");
    }
  };

  const getPassword = () => {
    if (!password) {
      setPswError("Please enter new password.");
    } else if (
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setPswError("");
      getChange();
    } else {
      setPswError(
        "At least 1 upper case, 1 lower case, 1 number, 1 special character and min. 8 characters required"
      );
    }
  };

  const sendOTP = async () => {
    if (mailId !== "") {
      let mailArr = state.signInReducer.loginUserArray.filter(
        (item) => item.mailid === mailId
      );
      if (mailArr.length > 0) {
        const oTP = Math.floor(Math.random() * 999999) + 100000;
        setOtp(oTP);
        await emailjs
          .send(
            "service_k1oxn2k",
            "template_7zax92w",
            {
              fromId: "hr@testyantra.com",
              subject: "SM Project(Verification Code)",
              mailIds: mailId,
              message: oTP,
            },
            "user_1q1BTdJ8p43prsypF7dRH"
          )
          .then((resp) => {
            setEmailError("");
            setOkOTP(true);
          })
          .catch((error) => {
            toastMessage({
              appearance: "error",
              message:
                "Failed to send verification code. Error: " +
                { error } +
                ". Please try again later.",
            });
          });

        setTimeout(() => {
          setOtp("");
        }, 300000);
      } else {
        toastMessage({
          appearance: "warn",
          message: "Account does not exists for this Mail Id.",
        });
      }
    } else {
      setEmailError("Please enter mail id.");
    }
  };

  const verifyOTP = () => {
    if (Number(Object.values(enteredOtp).join("")) === otp) {
      setOtpError("");
      setOkPsw(true);
      setOkOTP(false);
    } else {
      setOtpError("Invalid OTP");
    }
  };

  const getChange = () => {
    if (confirmPsw !== "") {
      if (password === confirmPsw) {
        dispatch({
          type: "forgotPsw",
          credentials: {
            mailid: mailId,
            password: confirmPsw,
          },
        });
        close.prop(false);
        console.log(state.signInReducer.loginUserArray);
        toastMessage({
          appearance: "success",
          message: "Password has been changed successfully",
        });
      } else {
        toastMessage({
          appearance: "error",
          message: "Password and Confirm Passwords are not matching.",
        });
      }
    } else {
      toastMessage({
        appearance: "info",
        message: "Please confirm the password",
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
                Forgot Password
              </span>
              {!okOTP && !okPsw && (
                <div>
                  <label className="loginFieldLabel">Mail Id*:</label>
                  <input
                    type="text"
                    ref={mailInput}
                    className={mode ? "loginfieldDark" : "loginfieldLight"}
                    value={mailId}
                    onChange={(event) => setMailId(event.target.value)}
                  />
                  <div className="errorDiv">{EmailError}</div>
                </div>
              )}
              {okOTP && !okPsw && (
                <div>
                  <label className="loginFieldLabel">Enter OTP*:</label>
                  <OTPInput
                    numofinputs={6}
                    onChangeofInut={setEnteredOtp}
                    inputValue={enteredOtp}
                  ></OTPInput>
                  <div className="errorDiv">{otpError}</div>
                  <div
                    onClick={() => sendOTP()}
                    className="loginFieldLabel"
                    style={{
                      marginTop: "1vw",
                      fontSize: "1vw",
                      color: "blue",
                      cursor: "pointer",
                      marginRight: "0.5vw",
                    }}
                  >
                    Resend OTP
                  </div>
                </div>
              )}

              {okPsw && (
                <div>
                  <label for="pass" className="loginFieldLabel">
                    New Password*:
                  </label>
                  <input
                    type="password"
                    ref={pswInput}
                    style={{ minHeight: "15px", fontSize: "1.2vw" }}
                    className="loginfield"
                    name="password"
                    id="psw"
                    min="4"
                    max="8"
                    value={password}
                    onChange={(event) => setPassword(event.target.value.trim())}
                  />
                  <div className="errorDiv">{pswError}</div>
                  <label for="pass" className="loginFieldLabel">
                    Confirm Password*:
                  </label>
                  <div
                    className="input-group m-2"
                    style={{
                      width: "98%",
                      borderRadius: "4px",
                      height: "3vw",
                    }}
                  >
                    <input
                      type={viewPsw ? "text" : "password"}
                      value={confirmPsw}
                      style={{
                        height: "3vw",
                        minHeight: "15px",
                        border: "1px solid black",
                        fontSize: "1.2vw",
                      }}
                      onChange={(event) =>
                        setConfirmPsw(event.target.value.trim())
                      }
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
                            onClick={() => setViewPsw(false)}
                          ></i>
                        ) : (
                          <i
                            style={{ fontSize: "1.5vw" }}
                            className="fas fa-eye"
                            onClick={() => setViewPsw(true)}
                          ></i>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{ marginTop: "1vw", fontSize: "1vw" }}
                  type="button"
                  className="buttonProp"
                  onClick={() => {
                    close.prop(false);
                    setOtp("");
                  }}
                >
                  Cancel
                </button>
                {okOTP ? (
                  <button
                    style={{ marginTop: "1vw", fontSize: "1vw" }}
                    type="submit"
                    className="buttonProp"
                    onClick={verifyOTP}
                  >
                    Verify OTP
                  </button>
                ) : okPsw ? (
                  <button
                    style={{ marginTop: "1vw", fontSize: "1vw" }}
                    type="submit"
                    className="buttonProp"
                    onClick={getPassword}
                  >
                    Set
                  </button>
                ) : (
                  <button
                    style={{ marginTop: "1vw", fontSize: "1vw" }}
                    type="submit"
                    className="buttonProp"
                    onClick={getMailId}
                  >
                    Send OTP
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
