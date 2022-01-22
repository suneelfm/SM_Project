import React, { useEffect, useRef } from "react";

export default function OTPInput({
  numofinputs,
  onChangeofInut,
  inputValue,
}) {
    const firstinput = useRef();
    const nextinput = useRef()

  useEffect(() => {
    firstinput.current.focus();
    const keys = {};
    for (let index = 1; index <= numofinputs; index++) {
      keys["key" + index] = "";
    }
    onChangeofInut(keys);
  }, []);

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      console.log("next");
      const next = elmnt.target.tabIndex;
      if (next < numofinputs) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  const handleChange = (e) => {
    const otp = { ...inputValue };
    otp["key" + e.target.tabIndex] = e.target.value;
    onChangeofInut(otp);
  };

  const inputs = [];
  const renderInputs = () => {
    for (let index = 0; index < numofinputs; index++) {
      inputs.push(
        <input
          type="text"
          ref={index === 0 ? firstinput : nextinput}
          tabIndex={"" + (index + 1)}
          onKeyUp={(e) => inputfocus(e)}
          style={{
            height: "2.5vw",
            width: "2.5vw",
            borderRadius: "4px",
            border: "1px solid",
            padding: "0.5vw",
            font: "inherit",
            margin: "0.5vw",
            textAlign: "center",
          }}
          value={inputValue["key" + (index + 1)]}
          onChange={(e) => handleChange(e)}
          maxLength={1}
        />
      );
    }
    return inputs;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {renderInputs().map((item) => item)}
    </div>
  );
}
