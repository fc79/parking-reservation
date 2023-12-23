import React, { useState } from "react";
import "../css/EditInfoPage.css";

const FilterButton = (props) => {
  const { children, onClick, index, active, className } = props;
  const style = active
    ? "txtcol-active bold focus-border shadow"
    : "txtcol-sec";
  const [btnStyle, setBtnStyle] = useState("");
  const onMouseEnter = () => {
    setBtnStyle("txtcol-active bold");
  };

  const onMouseLeave = () => {
    setBtnStyle("");
  };

  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`ease dark-border flex paddh-1 round-3 marg-05 back-light txtcol-sec txt-sm cur-point ${style}  ${btnStyle} ${className}`}
      onClick={() => onClick && onClick(index)}
    >
      {children}
    </button>
  );
};

export default FilterButton;
