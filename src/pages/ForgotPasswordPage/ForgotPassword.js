import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import emailjs from "emailjs-com";
import OTPInput from "../../Components/OTPInput";
import { toastMessage } from "../../Components/toastMessage";

export default function ForgotPassword(close) {
  const [mailId, setmailId] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpsw, setconfirmpsw] = useState("");
  const [pswerror, setpswerror] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [otpError, setotpError] = useState("");
  const [okPsw, setokPsw] = useState(false);
  const [viewPsw, setviewPsw] = useState(false);
  const [okOTP, setokOTP] = useState(false);
  const [otp, setotp] = useState("");
  const [enteredotp, setenteredotp] = useState({});
  const mailinput = useRef();
  const pswinput = useRef();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    // okOTP
    //   ? otpinput.current.focus()
    //   :
    okPsw ? pswinput.current.focus() : mailinput.current.focus();
  }, [okPsw]);

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

  const sendOTP = async () => {
    if (mailId !== "") {
      if (EmailError === "") {
        let mailArr = state.signInReducer.loginUserArray.filter(
          (item) => item.mailid === mailId
        );
        if (mailArr.length > 0) {
          const date = new Date();
          const hh = date.getHours();
          const ss = date.getSeconds();
          const mm = date.getMinutes();
          const oTP =
            (hh < 10 ? "0" + hh : hh) +
            "" +
            (ss < 10 ? "0" + ss : ss) +
            (mm < 10 ? "0" + mm : mm);
          debugger;
          setotp(oTP);
          const from = "SM Project";
          try {
            await emailjs.send(
              "service_k1oxn2k",
              "template_7zax92w",
              { from, mailId, oTP },
              "user_1q1BTdJ8p43prsypF7dRH"
            );
          } catch (error) {
            toastMessage({
              appearance: "error",
              message:
                "Failed to send verification code. Error: " +
                { error } +
                ". Please try again later.",
            });
          }
          setEmailError("");
          setokOTP(true);
          setTimeout(() => {
            setotp("");
          }, 300000);
        } else {
          toastMessage({
            appearance: "warn",
            message: "Account does not exists for this Mail Id.",
          });
        }
      }
    } else {
      setEmailError("Please enter mail id.");
    }
  };

  const verifyOTP = () => {
    debugger;
    if (Object.values(enteredotp).join("") === otp) {
      setotpError("");
      setokPsw(true);
      setokOTP(false);
    } else {
      setotpError("Invalid OTP");
    }
  };

  const getChange = () => {
    if (password !== "" && confirmpsw !== "" && pswerror === "") {
      if (password === confirmpsw) {
        dispatch({
          type: "forgotPsw",
          credentials: {
            mailid: mailId,
            password: confirmpsw,
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
        message: "Please enter strong password",
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
        <div className="col-6" style={{ fontSize: "1vw" }}>
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
                  <label
                    className="loginFieldLabel"
                  >
                    Mail Id*:
                  </label>
                  <input
                    type="text"
                    ref={mailinput}
                    className="loginfield"
                    value={mailId}
                    onChange={getMailId}
                  />
                  <div className="errorDiv">{EmailError}</div>
                </div>
              )}
              {okOTP && !okPsw && (
                <div>
                  <label
                    className="loginFieldLabel"
                  >
                    Enter OTP*:
                  </label>
                  <OTPInput
                    numofinputs={6}
                    onChangeofInut={setenteredotp}
                    inputValue={enteredotp}
                  ></OTPInput>
                  <div className="errorDiv">{otpError}</div>
                </div>
              )}

              {okPsw && (
                <div>
                  <label
                    for="pass"
                    className="loginFieldLabel"
                  >
                    New Password*:
                  </label>
                  <input
                    type="password"
                    ref={pswinput}
                    style={{ minHeight: "15px", fontSize: "1.2vw" }}
                    className="loginfield"
                    name="password"
                    id="psw"
                    min="4"
                    max="8"
                    value={password}
                    onChange={getPassword}
                  />
                  <div className="errorDiv">{pswerror}</div>
                  <label
                    for="pass"
                    className="loginFieldLabel"
                  >
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
                      value={confirmpsw}
                      style={{
                        height: "3vw",
                        minHeight: "15px",
                        border: "1px solid black",
                        fontSize: "1.2vw",
                      }}
                      onChange={(event) =>
                        setconfirmpsw(event.target.value.trim())
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
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{ marginTop: "1vw", fontSize: "1vw" }}
                  type="button"
                  className="buttonProp"
                  onClick={() => close.prop(false)}
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
                    onClick={getChange}
                  >
                    Set
                  </button>
                ) : (
                  <button
                    style={{ marginTop: "1vw", fontSize: "1vw" }}
                    type="submit"
                    className="buttonProp"
                    onClick={sendOTP}
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
