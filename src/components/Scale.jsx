import React from "react";
import { numberWithCommas } from "../utils/formatter";
import "./Scale.css";

const Scale = ({ left, value, unit, margin, fixed = 0 }) => {
  const formattedValue = numberWithCommas(value.toFixed(fixed)) + unit;

  return (
    <div
      className="scale"
      style={{ left: `${left}vw`, marginLeft: `${margin}vw` }}
    >
      <div className="scale-bar"></div>
      <div className="scale-value">{formattedValue}</div>
    </div>
  );
};

export default Scale;
