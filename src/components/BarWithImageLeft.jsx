import { useRef, useImperativeHandle, forwardRef } from "react";
import { numberWithCommas } from "../utils/formatter";
import "./BarWithImageLeft.css";

const BarWithImageLeft = forwardRef(
  (
    {
      color = "#4CAF50",
      img,
      size = 1,
      label,
      value,
      unit = "",
      team,
      fixed = 0,
      width = 0,
      rank = 1,
    },
    ref
  ) => {
    const itemRef = useRef(null);
    const itemBarRef = useRef(null);

    const formattedValue = numberWithCommas(value.toFixed(fixed)) + unit;
    const id = `chartBar${label}`; // Match the ID format expected by DynamicChart

    useImperativeHandle(ref, () => ({
      setWidth: (width) => {
        if (itemBarRef.current) {
          itemBarRef.current.style.width = width;
        }
      },
      invisible: () => {
        if (itemRef.current) {
          itemRef.current.style.opacity = "0";
        }
      },
      visible: () => {
        if (itemRef.current) {
          itemRef.current.style.opacity = "1";
        }
      },
      label,
      value,
    }));

    return (
      <div
        ref={itemRef}
        id={id}
        className={`item ${size.toString()}`}
        style={{ opacity: 1 }} // Make visible by default
      >
        <div className="item-icon">
          {img && (
            <img
              src={img}
              style={{ width: "15px", height: "15px" }}
              alt={team || label}
            />
          )}
          {!img && (
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: color,
                borderRadius: "2px",
              }}
            />
          )}
        </div>
        <div
          ref={itemBarRef}
          className="item-bar"
          style={{ background: color, width: `${width}%` }}
        >
          <span className="item-label">{label}</span>
          <span className="team-label">{team}</span>
        </div>
        <div className="item-value">{formattedValue}</div>
        <div className="item-rank">#{rank}</div>
      </div>
    );
  }
);

BarWithImageLeft.displayName = "BarWithImageLeft";

export default BarWithImageLeft;
