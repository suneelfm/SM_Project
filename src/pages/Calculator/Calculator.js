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
    debugger;
    let expression = display.replaceAll("\u00D7", "*");
    expression = expression.replaceAll("\u00F7", "/");
    expression = expression.replaceAll("\u0025", "/100");
    expression = expression.replaceAll("(", "*(");
    if (display.split("").shift() === "(") {
      expression = expression.replace("*(", "(");
    }
    if (display === "") {
      setresult("");
    }
    try {
      let res = eval(expression);
      setresult("=" + res);
      setdisplay("");
      setdisppadding(true);
      setlastresult(res);
      setcount(0);
    } catch (error) {}
  };

  const calcyScreen = (value) => {
    setresult("");
    setdisppadding(false);
    if (isNaN(value) && value !== "." && value !== "(" && value !== ")") {
      setdotcount(0);
      debugger;
      lastresult !== "" && displayLogic(lastresult + value);
      if (
        !(
          display === "" &&
          (value === "\u00D7" || value === "\u00F7" || value === "\u0025")
        )
      ) {
        if (count === 0) {
          lastresult === "" && displayLogic(value);
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

  function backSpace() {
    if (!disppadding) {
      let part = display.toString().split("");
      if (part[part.length - 1] === ".") {
        setdotcount(0);
      }
      let disp = display.slice(0, display.length - 1);
      setdisplay(disp);
      setcount(0);
    }
  }

  function clearDisplay() {
    setdisplay("");
    setresult("");
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
      <div className="row" style={{ marginTop: "1vw" }}>
        <table className="tableframe">
          <thead>
            <tr>
              <td colSpan={4}>
                <div className="calcyDisplay">
                  <div
                    className="typeText"
                    style={{
                      display: disppadding ? "none" : "flex",
                      padding: disppadding ? "0px" : "1vw 2vw",
                    }}
                  >
                    {display}
                  </div>
                  <div
                    className="result"
                    style={{
                      color: disppadding ? "black" : "rgb(173, 173, 173)",
                      fontSize: disppadding ? "5vw" : "2vw",
                    }}
                  >
                    {result}
                  </div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: "25%" }}>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={clearDisplay}
                >
                  C
                </button>
              </td>
              <td style={{ width: "25%" }}>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen("(")}
                  style={{ width: "35%" }}
                >
                  (
                </button>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen(")")}
                  style={{ width: "35%", float: "right", marginRight: "4.5vw" }}
                >
                  )
                </button>
              </td>
              <td style={{ width: "25%" }}>
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen("\u0025")}
                >
                  <i className="fas fa-percentage"></i>
                </button>
              </td>
              <td className="operatorbutton">
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={backSpace}
                >
                  <i className="fas fa-backspace" />
                </button>
              </td>
            </tr>
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
                  <i className="fas fa-plus"></i>
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
                  <i className="fas fa-minus"></i>
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
                  onClick={() => calcyScreen("\u00D7")}
                >
                  <i className="fas fa-times"></i>
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
                <button className="fitToCell equalbutton" onClick={calculation}>
                  =
                </button>
              </td>
              <td className="operatorbutton">
                <button
                  className="fitToCell calcybuttonProp"
                  onClick={() => calcyScreen("\u00F7")}
                >
                  <i className="fas fa-divide"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
