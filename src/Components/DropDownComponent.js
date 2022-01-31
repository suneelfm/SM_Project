import React from "react";
import { useSelector } from "react-redux";

export default function DropDownComponent({
  Value,
  onchange,
  placeHolder,
  options,
}) {
  const mode = useSelector((state) => state.signInReducer.isDarkMode);
  return (
    <>
      <select
        onChange={onchange}
        value={Value}
        className={
          mode
            ? "fieldPropDark browser-default custom-select"
            : "fieldPropLight browser-default custom-select"
        }
        name={placeHolder}
        defaultValue={placeHolder}
      >
        <option value={placeHolder} hidden>
          {placeHolder}
        </option>
        {options.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </>
  );
}
