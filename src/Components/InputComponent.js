import React from "react";

export default function InputComponent({ State, setState, placeHolder, error }) {
  return (
    <>
      <input
        onChange={(event) => setState(event.target.value)}
        value={State}
        className="fieldProp"
        type="text"
        placeholder={placeHolder}
      />
      <div className="errorDiv">{error}</div>
    </>
  );
}
