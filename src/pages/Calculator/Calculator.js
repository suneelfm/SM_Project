import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Calculator() {
  const [display, setdisplay] = useState("");
  const [count, setcount] = useState(0);
  const [dotcount, setdotcount] = useState(0);
  const [result, setresult] = useState("");
  const [disppadding, setdisppadding] = useState(false);
  const [lastresult, setlastresult] = useState("");

  const displayLogic = (value) => {
    setlastresult("");
    let disp = display + value.toString();
    setdisplay(disp.toString());
  };

  const calculation = () => {
    // debugger;
    // console.log(display);
    let part = display.toString().split("");
    if (display === "") {
      setresult("");
    }
    if (!isNaN(part[part.length - 1])) {
      let res = eval(display);
      setresult(res);
    }
  };

  useEffect(() => {
    calculation();
  }, [display]);

  const calcyScreen = (value) => {
    setdisppadding(false);
    if (isNaN(value) && value !== ".") {
      setdotcount(0);
      if (!(display === "" && (value === "*" || value === "/"))) {
        if (count === 0) {
          displayLogic(lastresult + value);
          setcount(count + 1);
        } else {
          alert("Consegative operators are not allowed.");
        }
      }
    } else {
      setcount(0);
      if (value === ".") {
        if (dotcount === 0) {
          displayLogic(value);
          setdotcount(count + 1);
        } else {
          alert("Tow dots are not allowed.");
        }
      } else {
        displayLogic(value);
      }
    }
  };

  const calculate = () => {
    setdisppadding(true);
    setlastresult(result);
    setdisplay("");
    setcount(0);
  };

  function backSpace() {
    if (!disppadding) {
      let part = display.toString().split("");
      if (part[part.length - 1] === ".") {
        setdotcount(0);
      }
      let disp = display.slice(0, display.length - 1);
      setdisplay(disp);
      calculation();
      setcount(0);
    }
  }

  function clearDisplay() {
    setdisplay("");
    setcount(0);
    setdotcount(0);
    setdisppadding(false);
  }
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
            Calculator
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
            / Calculator
          </div>
        </div>
      </div>
      <div className="row" style={{ height: "75%", marginTop: "10px" }}>
        <table className="tableframe table fitToCell">
          <thead>
            <tr>
              <td colSpan={3}>
                <div className="calcyDisplay">
                  <div
                    className="typeText"
                    style={{
                      display: disppadding ? "none" : "flex",
                      padding: disppadding ? "0px" : "10px 20px",
                    }}
                  >
                    {display}
                  </div>
                  <div
                    className="result"
                    style={{
                      color: disppadding ? "black" : "rgb(173, 173, 173)",
                      fontSize: disppadding ? "70px" : "xx-large",
                    }}
                  >
                    {disppadding
                      ? "=" + lastresult
                      : display === ""
                      ? ""
                      : "=" + result}
                  </div>
                </div>
              </td>
              <td className="operatorbutton">
                <button
                  type="button"
                  className="clearButton calcycalcybuttonProp"
                  onClick={clearDisplay}
                >
                  <i>Clear</i>
                </button>
                <button
                  type="button"
                  className="clearButton calcycalcybuttonProp"
                  onClick={backSpace}
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
              </td>
            </tr>
          </thead>
          <tbody style={{ height: "80%" }}>
            <tr>
              <td>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen(7)}
                >
                  7
                </button>
              </td>
              <td>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen(8)}
                >
                  8
                </button>
              </td>
              <td>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen(9)}
                >
                  9
                </button>
              </td>
              <td className="operatorbutton">
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen("+")}
                >
                  +
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen(4)}
                >
                  4
                </button>
              </td>
              <td>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen(5)}
                >
                  5
                </button>
              </td>
              <td>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen(6)}
                >
                  6
                </button>
              </td>
              <td className="operatorbutton">
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen("-")}
                >
                  -
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen(1)}
                >
                  1
                </button>
              </td>
              <td>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen(2)}
                >
                  2
                </button>
              </td>
              <td>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen(3)}
                >
                  3
                </button>
              </td>
              <td className="operatorbutton">
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen("*")}
                >
                  x
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen(".")}
                >
                  .
                </button>
              </td>
              <td>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen(0)}
                >
                  0
                </button>
              </td>
              <td>
                <button className="fitToCell equalbutton" onClick={calculate}>
                  =
                </button>
              </td>
              <td className="operatorbutton">
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen("/")}
                >
                  /
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
