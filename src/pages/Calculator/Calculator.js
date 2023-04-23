import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./calculatorStyle.css";

export default function Calculator() {
  const [display, setDisplay] = useState("");
  const [count, setCount] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const [result, setResult] = useState("");
  const [disPadding, setDisPadding] = useState(false);
  const [lastResult, setLastResult] = useState("");

  const mode = useSelector((state) => state.signInReducer.isDarkMode);

  const displayLogic = (value) => {
    setLastResult("");
    let disp = display + value.toString();
    setDisplay(disp.toString());
  };

  const calculation = () => {
    let expression = display.replaceAll("\u00D7", "*");
    expression = expression.replaceAll("\u00F7", "/");
    expression = expression.replaceAll("\u0025", "/100");
    // expression = expression.replaceAll("(", "*(");
    // if (display.split("").shift() === "(") {
    //   expression = expression.replace("*(", "(");
    // }
    if (display === "") {
      setResult("");
    }
    try {
      let res = eval(expression);
      setResult("=" + res);
      setDisplay("");
      setDisPadding(true);
      setLastResult(res);
      setCount(0);
    } catch (error) {}
  };

  const calcyScreen = (value) => {
    setResult("");
    setDisPadding(false);
    if (isNaN(value) && value !== "." && value !== "(" && value !== ")") {
      setDotCount(0);
      lastResult !== "" && displayLogic(lastResult + value);
      if (
        !(
          display === "" &&
          (value === "\u00D7" || value === "\u00F7" || value === "\u0025")
        )
      ) {
        if (count === 0) {
          lastResult === "" && displayLogic(value);
          setCount(count + 1);
        } else {
          alert("Consegative operators are not allowed.");
        }
      }
    } else {
      setCount(0);
      if (value === ".") {
        if (dotCount === 0) {
          displayLogic(value);
          setDotCount(count + 1);
        } else {
          alert("Tow dots are not allowed.");
        }
      } else {
        displayLogic(value);
      }
    }
  };

  function backSpace() {
    if (!disPadding) {
      let part = display.toString().split("");
      if (part[part.length - 1] === ".") {
        setDotCount(0);
      }
      let disp = display.slice(0, display.length - 1);
      setDisplay(disp);
      setCount(0);
    }
  }

  function clearDisplay() {
    setDisplay("");
    setResult("");
    setCount(0);
    setDotCount(0);
    setDisPadding(false);
  }
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
      <div
        className="row"
        style={{ marginTop: "1vw", display: "flex", justifyContent: "center" }}
      >
        <div className="tableframe">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <td colSpan={4}>
                  <div className="calcyDisplay">
                    <div
                      className="typeText"
                      style={{
                        display: disPadding ? "none" : "flex",
                        padding: disPadding ? "0px" : "1vw 2vw",
                      }}
                    >
                      {display}
                    </div>
                    <div
                      className="result"
                      style={{
                        color: disPadding ? "black" : "rgb(173, 173, 173)",
                        fontSize: disPadding ? "5vw" : "2vw",
                      }}
                    >
                      {result}
                    </div>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody style={{ padding: "1vw" }}>
              <tr>
                <td style={{ width: "25%", padding: "1vw" }}>
                  <button
                    className="fitToCell calcybuttonProp"
                    onClick={clearDisplay}
                  >
                    C
                  </button>
                </td>
                <td style={{ width: "25%", padding: "1vw" }}>
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
                    style={{ width: "35%", marginLeft: "1vw" }}
                  >
                    )
                  </button>
                </td>
                <td style={{ width: "25%", padding: "1vw" }}>
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
                <td style={{ padding: "1vw" }}>
                  <button
                    className="fitToCell calcybuttonProp"
                    onClick={() => calcyScreen(7)}
                  >
                    7
                  </button>
                </td>
                <td style={{ padding: "1vw" }}>
                  <button
                    className="fitToCell calcybuttonProp"
                    onClick={() => calcyScreen(8)}
                  >
                    8
                  </button>
                </td>
                <td style={{ padding: "1vw" }}>
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
                <td style={{ padding: "1vw" }}>
                  <button
                    className="fitToCell calcybuttonProp"
                    onClick={() => calcyScreen(4)}
                  >
                    4
                  </button>
                </td>
                <td style={{ padding: "1vw" }}>
                  <button
                    className="fitToCell calcybuttonProp"
                    onClick={() => calcyScreen(5)}
                  >
                    5
                  </button>
                </td>
                <td style={{ padding: "1vw" }}>
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
                <td style={{ padding: "1vw" }}>
                  <button
                    className="fitToCell calcybuttonProp"
                    onClick={() => calcyScreen(1)}
                  >
                    1
                  </button>
                </td>
                <td style={{ padding: "1vw" }}>
                  <button
                    className="fitToCell calcybuttonProp"
                    onClick={() => calcyScreen(2)}
                  >
                    2
                  </button>
                </td>
                <td style={{ padding: "1vw" }}>
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
                <td style={{ padding: "1vw" }}>
                  <button
                    className="fitToCell calcybuttonProp"
                    onClick={() => calcyScreen(".")}
                  >
                    .
                  </button>
                </td>
                <td style={{ padding: "1vw" }}>
                  <button
                    className="fitToCell calcybuttonProp"
                    onClick={() => calcyScreen(0)}
                  >
                    0
                  </button>
                </td>
                <td style={{ padding: "1vw" }}>
                  <button
                    className="fitToCell equalbutton"
                    onClick={calculation}
                  >
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
      </div>
    </>
  );
}
