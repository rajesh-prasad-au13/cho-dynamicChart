import React, { useState, useEffect, useRef, useCallback } from "react";
import * as TWEEN from "@tweenjs/tween.js";
import Shuffle from "shufflejs";
import BarWithImageLeft from "./BarWithImageLeft";
import Scale from "./Scale";
import { stats } from "../data/result";
import { labelInfo } from "../data/indiaInfo";
import "./DynamicChart.css";

const DynamicChart = ({
  barType = "barWithImageLeft",
  interval = 2000,
  limit = 15,
  shuffleSpeed = 1000,
  stats,
  labelInfo,
  date,
  fixed = 0,
  scale = 500000000,
  maximum = 0,
  dynamic = false,
  unit = "",
  tweening = true,
  additional = false,
  additionalLimit = 0,
  additionalTitle = "",
  additionalStats = [],
  additionalUnit = "",
  additionalCand = []
}) => {
  const [barList, setBarList] = useState([]);
  const [scaleList, setScaleList] = useState([]);
  const [scaleUnit, setScaleUnit] = useState(scale);
  const [nullNumber] = useState(0);
  const [representativeImg, setRepresentativeImg] = useState("");
  const [year, setYear] = useState(0);
  const [progress, setProgress] = useState(1);
  const [barDict, setBarDict] = useState({});

  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const animationRef = useRef(null);

  const progressWidth = `${progress * 100}%`;

  // Setup animation loop with a more robust animation frame handler
  useEffect(() => {
    let animationFrameId;

    function animate(time) {
      animationFrameId = requestAnimationFrame(animate);
      TWEEN.update(time);
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      // Clean up animation frame on unmount
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const charToNum = str => {
    let ret = 0;
    for (let i = 0; i < Math.max(str.length, 5); i++) {
      ret +=
        (100 - (str.charCodeAt(i) - " ".charCodeAt(0))) / Math.pow(100, i + 1);
    }
    return ret;
  };

  const getBarValue = useCallback(
    element => {
      const label = element.id.slice(8);
      if (barDict[label]) {
        return barDict[label].value + charToNum(label);
      } else {
        console.log(label);
        console.log(barDict);
        return 0;
      }
    },
    [barDict]
  );

  const getWidth = useCallback(
    (cur, max, min = 0) => {
      const maximumValue = Math.max(max, maximum);
      const offset = 0.1;
      const frontWidth = 0.7;
      const backWidth = 0.2;
      if (dynamic)
        return (
          (offset +
            ((cur - min) / (max - min)) * frontWidth +
            (cur / maximumValue) * backWidth) *
          75
        );
      else
        return (
          (offset +
            (cur / max) * frontWidth +
            (cur / maximumValue) * backWidth) *
          75
        );
    },
    [maximum, dynamic]
  );

  // Define function references to break circular dependencies
  const adjustWidthRef = useRef(null);
  const adjustScaleRef = useRef(null);

  const adjustWidth = useCallback(
    (bars, max, min) => {
      for (const [i, v] of bars.entries()) {
        if (i < limit) {
          const width = getWidth(v.value, max, min);
          if (v.value === parseInt(v.value.toString())) v.value += 0.0001;
          v.ref?.current?.visible();
          v.ref?.current?.setWidth(width + "vw");
        } else {
          v.ref?.current?.invisible();
        }
      }
    },
    [limit, getWidth]
  );

  // Store function in ref
  adjustWidthRef.current = adjustWidth;

  const adjustScale = useCallback(
    (max, min) => {
      setScaleList(prevScaleList => {
        let newScaleList = [...prevScaleList];
        const start = newScaleList.length
          ? newScaleList[newScaleList.length - 1].value + scaleUnit
          : scaleUnit;

        for (let value = start; value < max * 1.1; value += scaleUnit) {
          newScaleList.push({
            value: value,
            left: 0
          });
        }

        const cnt = newScaleList.length;
        if (cnt > 8) {
          setScaleUnit(scaleUnit * 2);
          newScaleList = newScaleList.filter((_, i) => (i & 1) === 0);
        } else if (cnt < 4) {
          const newUnit = Math.round(scaleUnit / 2);
          setScaleUnit(newUnit);
          newScaleList = newScaleList.concat(
            newScaleList.map(v => ({
              value: v.value - newUnit,
              left: 0
            }))
          );
        }

        newScaleList = newScaleList.filter(
          v => min <= v.value && v.value <= max
        );

        for (const scale of newScaleList) {
          scale.left = getWidth(scale.value, max, min);
        }

        return newScaleList;
      });
    },
    [scaleUnit, getWidth]
  );

  // Store function in ref
  adjustScaleRef.current = adjustScale;

  const adjustChart = useCallback(() => {
    const bars = Object.values(barDict).sort((v1, v2) => {
      return v2.value + charToNum(v2.label) - (v1.value + charToNum(v1.label));
    });
    if (bars.length > 0) {
      const top = bars[0];
      const max = top.value;
      const min =
        dynamic && bars.length >= limit ? bars[limit - 1].value * 0.9 : 0;

      setRepresentativeImg(top.img);
      if (adjustWidthRef.current) adjustWidthRef.current(bars, max, min);
      if (adjustScaleRef.current) adjustScaleRef.current(max, min);
    }
  }, [barDict, dynamic, limit, charToNum]);

  const createBar = useCallback(
    data => {
      const value = parseFloat(data.value);
      if (!isNaN(value)) {
        const { color, img } = getBarLabelInfo(data);
        const bar = {
          label: data.label,
          value: value,
          color: color || "#000",
          img: img || "",
          size: 10,
          fixed: fixed,
          team: data.team,
          ref: React.createRef()
        };
        return bar;
      }
      return null;
    },
    [fixed]
  );

  const getBarLabelInfo = useCallback(
    data => {
      if (data.team) {
        const info = labelInfo[data.team];
        if (info) return info;
      }
      if (data.label) {
        const info = labelInfo[data.label];
        if (info) return info;
      }
      return { color: "#000", img: "" };
    },
    [labelInfo]
  );

  const sortNodeBar = useCallback(() => {
    if (instanceRef.current && containerRef.current) {
      instanceRef.current.sort({
        by: element => {
          return getBarValue(element);
        },
        reverse: true
      });
    }
  }, [getBarValue]);

  const getBarObject = useCallback(
    label => {
      return barList.find(bar => bar.label === label);
    },
    [barList]
  );

  // Use a ref to track if initialization has run
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run initialization once
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    if (containerRef.current) {
      instanceRef.current = new Shuffle(containerRef.current, {
        itemSelector: ".item",
        speed: shuffleSpeed
      });
    }

    // Set initial data
    setYear(parseInt(date[0]));
    const initialBars = [];
    const initialBarDict = {};

    if (stats && stats[0]) {
      for (const i in stats[0]) {
        const curData = { ...stats[0][i] }; // Create a copy to avoid mutating original data
        curData.value = Number(curData.value).toString();
        const bar = createBar(curData);
        if (bar) {
          initialBars.push(bar);
          initialBarDict[bar.label] = bar;
        }
      }
    }

    setBarList(initialBars);
    setBarDict(initialBarDict);

    // Start animation after initial setup
    const initTimeout = setTimeout(() => {
      let index = 1;
      let currentBarDict = { ...initialBarDict };

      const startTimeout = setTimeout(() => {
        const loop = setInterval(() => {
          if (stats && index < stats.length) {
            setYear(parseInt(date[index]));
            const before = {};
            const after = {};

            for (const [i, stat] of stats[index].entries()) {
              if (i >= 10) break; // Limit to top 10 items for performance

              let prevData = currentBarDict[stat.label];
              if (!prevData) {
                const newBar = createBar({
                  label: stat.label,
                  value: nullNumber.toString(),
                  team: stat.team
                });
                if (newBar) {
                  currentBarDict[stat.label] = newBar;
                  setBarList(prev => [...prev, newBar]);
                  prevData = newBar;
                }
              }
              if (prevData) {
                before[stat.label] = parseFloat(prevData.value) || 0;
                after[stat.label] = parseFloat(stat.value) || 0;
              }
            }

            // Animation tween
            if (tweening && Object.keys(before).length > 0) {
              // Clear any existing animation
              if (animationRef.current) {
                animationRef.current.stop();
              }

              before["progress"] = progress;
              after["progress"] = 1;

              const tween = new TWEEN.Tween(before)
                .to(after, interval * 0.8)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(obj => {
                  setProgress(obj.progress || 0);

                  // Update bar values directly in the dict
                  for (const label in obj) {
                    if (label !== "progress" && currentBarDict[label]) {
                      currentBarDict[label].value = obj[label];
                    }
                  }

                  // Update state with new values
                  setBarDict({ ...currentBarDict });
                })
                .start();

              animationRef.current = tween;
            } else {
              // Instant update without animation
              for (const label in after) {
                if (currentBarDict[label]) {
                  currentBarDict[label].value = after[label];
                }
              }
              setBarDict({ ...currentBarDict });
              setProgress(1);
            }

            index++;
          } else {
            clearInterval(loop);
          }
        }, interval);
      }, 1000);

      return () => {
        clearTimeout(startTimeout);
        clearInterval(loop);
      };
    }, 500);

    return () => {
      clearTimeout(initTimeout);
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, []); // Empty dependency array to run only once

  // Separate effect for handling chart adjustments when barDict changes
  useEffect(() => {
    if (Object.keys(barDict).length > 0) {
      // Use a timeout to batch updates and avoid excessive re-renders
      const adjustTimeout = setTimeout(() => {
        adjustChart();
        if (instanceRef.current && containerRef.current) {
          instanceRef.current.sort({
            by: element => {
              return getBarValue(element);
            },
            reverse: true
          });
        }
      }, 50);

      return () => clearTimeout(adjustTimeout);
    }
  }, [barDict, adjustChart, getBarValue]);

  return (
    <div id="wrapper">
      {scaleList.map((scale, i) => (
        <Scale
          key={`scale${i}`}
          value={scale.value}
          left={scale.left}
          unit={unit}
          margin={15.3}
          fixed={fixed}
        />
      ))}
      <div
        ref={containerRef}
        id="container"
        className="item-container"
        style={{ height: "500px", overflow: "visible" }}
      >
        {barType === "barWithImageLeft" &&
          barList.map((bar, i) => (
            <BarWithImageLeft
              key={i}
              ref={bar.ref}
              color={bar.color}
              img={bar.img}
              size={bar.size}
              label={bar.label}
              value={bar.value}
              unit={unit}
              team={bar.team}
              fixed={bar.fixed}
            />
          ))}
      </div>
      <div id="year" className="year">
        <div>{year}</div>
        <div className="progress" style={{ width: progressWidth }}></div>
      </div>
      <div
        className="representative"
        style={{ backgroundImage: `url(${representativeImg})` }}
      ></div>
      {additional && (
        <div className="additional">
          <table>
            <thead>
              <tr>
                <th>{additionalTitle}</th>
              </tr>
            </thead>
            <tbody id="additional-info"></tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DynamicChart;
