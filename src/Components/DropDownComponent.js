import React from "react";

export default function DropDownComponent({
  Value,
  onchange,
  placeHolder,
  options,
}) {
  return (
    <>
      <select
        onChange={onchange}
        value={Value}
        className="fieldProp browser-default custom-select"
        name={placeHolder}
        defaultValue={placeHolder}
      >
        <option value={placeHolder} hidden>
          {placeHolder}
        </option>
        {options.map((item) => (
          <option value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}
