import { useRef, useImperativeHandle, forwardRef } from "react";
import { numberWithCommas } from "../utils/formatter";
import "./BarWithImageLeft.css";

const BarWithImageLeft = forwardRef(
  ({ color, img, size, label, value, unit, team, fixed = 0 }, ref) => {
    const itemRef = useRef(null);
    const itemBarRef = useRef(null);

    const formattedValue = numberWithCommas(value.toFixed(fixed)) + unit;
    const id = `item-id-${label}`;

    useImperativeHandle(ref, () => ({
      setWidth: width => {
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
      value
    }));

    return (
      <div
        ref={itemRef}
        id={id}
        className={`item ${size.toString()}`}
        style={{ opacity: 0 }} // Start invisible and reveal through animation
      >
        <div className="item-icon">
          <img src={img} style={{ width: "15px", height: "15px" }} alt={team} />
        </div>
        <div
          ref={itemBarRef}
          className="item-bar"
          style={{ background: color }}
        >
          <span className="item-label">{label}</span>
          <span className="team-label">{team}</span>
        </div>
        <div className="item-value">{formattedValue}</div>
      </div>
    );
  }
);

BarWithImageLeft.displayName = "BarWithImageLeft";

export default BarWithImageLeft;
