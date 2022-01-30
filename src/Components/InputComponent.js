import React from "react";
import { useSelector } from "react-redux";

export default function InputComponent({
  State,
  setState,
  placeHolder,
  error,
}) {
  const mode = useSelector((state) => state.signInReducer.isDarkMode);

  return (
    <>
      <input
        onChange={(event) => setState(event.target.value)}
        value={State}
        className={mode ? "fieldPropDark":"fieldPropLight"}
        type="text"
        placeholder={placeHolder}
      />
      <div className="errorDiv">{error}</div>
    </>
  );
}
