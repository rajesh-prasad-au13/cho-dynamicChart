import React, { useState, useEffect, useRef, useCallback } from "react";
import * as TWEEN from "@tweenjs/tween.js";
import Shuffle from "shufflejs";
import BarWithImageLeft from "./BarWithImageLeft";
import Scale from "./Scale";
import "./DynamicChart.css";

const DynamicChartFixed = ({
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
  additionalCand = [],
}) => {
  const [barList, setBarList] = useState([]);
  const [scaleList, setScaleList] = useState([]);
  const [scaleUnit, setScaleUnit] = useState(scale);
  const [nullNumber] = useState(0);
  const [representativeImg, setRepresentativeImg] = useState("");
  const [year, setYear] = useState(0);
  const [progress, setProgress] = useState(1);
  const [barDict, setBarDict] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const animationRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const progressWidth = `${progress * 100}%`;

  // Setup animation loop with TWEEN
  useEffect(() => {
    let animationFrameId;

    function animate(time) {
      animationFrameId = requestAnimationFrame(animate);
      TWEEN.update(time);
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const charToNum = (str) => {
    let ret = 0;
    for (let i = 0; i < Math.max(str.length, 5); i++) {
      ret +=
        (100 - (str.charCodeAt(i) - " ".charCodeAt(0))) / Math.pow(100, i + 1);
    }
    return ret;
  };

  const getBarValue = useCallback(
    (element) => {
      const label = element.id.slice(8);
      if (barDict[label]) {
        return barDict[label].value + charToNum(label);
      } else {
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
        return (offset + (cur / maximumValue) * (frontWidth + backWidth)) * 75;
    },
    [dynamic, maximum]
  );

  const getMax = useCallback(() => {
    if (barList.length === 0) return 1;
    return Math.max(...barList.map((bar) => parseFloat(bar.value) || 0));
  }, [barList]);

  const getMin = useCallback(() => {
    if (barList.length === 0) return 0;
    return Math.min(...barList.map((bar) => parseFloat(bar.value) || 0));
  }, [barList]);

  const createBar = (data) => {
    if (!data || !data.label) return null;

    return {
      ...data,
      value: parseFloat(data.value) || 0,
      id: `chartBar${data.label}`,
      team: data.team || "",
    };
  };

  const adjustChart = useCallback(() => {
    if (barList.length === 0) return;

    const maxVal = getMax();
    const minVal = getMin();

    // Update scale
    const newScaleList = [];
    const step = maxVal / 5;
    for (let i = 1; i <= 5; i++) {
      newScaleList.push({
        value: step * i,
        left: getWidth(step * i, maxVal, minVal),
      });
    }
    setScaleList(newScaleList);
    setScaleUnit(maxVal);
  }, [barList, getMax, getMin, getWidth]);

  // Initialize chart with first data
  useEffect(() => {
    if (!stats || !stats.length || !date || !date.length) {
      console.log("No stats or date data available");
      return;
    }

    console.log("Initializing chart with data:", stats[0]);

    if (containerRef.current && !instanceRef.current) {
      instanceRef.current = new Shuffle(containerRef.current, {
        itemSelector: ".item",
        speed: shuffleSpeed,
      });
    }

    // Set initial data
    setYear(parseInt(date[0]));
    const initialBars = [];
    const initialBarDict = {};

    if (stats[0]) {
      for (const stat of stats[0]) {
        const bar = createBar(stat);
        if (bar) {
          initialBars.push(bar);
          initialBarDict[bar.label] = bar;
        }
      }
    }

    console.log("Initial bars created:", initialBars.length, initialBars);
    setBarList(initialBars);
    setBarDict(initialBarDict);
    setCurrentIndex(0);

    // Start animation timer
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % stats.length;
          console.log(`Moving to index ${nextIndex}, year ${date[nextIndex]}`);
          return nextIndex;
        });
      }, interval);
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [stats, date, interval, shuffleSpeed]);

  // Update chart when index changes
  useEffect(() => {
    if (!stats || !stats[currentIndex] || !date || !date[currentIndex]) return;

    console.log(
      `Updating chart for index ${currentIndex}, year ${date[currentIndex]}`
    );

    setYear(parseInt(date[currentIndex]));

    const before = {};
    const after = {};
    const newBarDict = { ...barDict };

    // Process current data
    for (const stat of stats[currentIndex]) {
      let prevData = newBarDict[stat.label];

      if (!prevData) {
        // Create new bar for new entries
        const newBar = createBar({
          label: stat.label,
          value: 0,
          team: stat.team,
        });
        if (newBar) {
          newBarDict[stat.label] = newBar;
          setBarList((prev) => [...prev, newBar]);
          prevData = newBar;
        }
      }

      if (prevData) {
        before[stat.label] = parseFloat(prevData.value) || 0;
        after[stat.label] = parseFloat(stat.value) || 0;
      }
    }

    // Animate the changes
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
        .onUpdate((obj) => {
          setProgress(obj.progress || 0);

          // Update bar values
          for (const label in obj) {
            if (label !== "progress" && newBarDict[label]) {
              newBarDict[label].value = obj[label];
            }
          }

          // Update state
          setBarDict({ ...newBarDict });
        })
        .start();

      animationRef.current = tween;
    } else {
      // Instant update
      for (const label in after) {
        if (newBarDict[label]) {
          newBarDict[label].value = after[label];
        }
      }
      setBarDict({ ...newBarDict });
      setProgress(1);
    }
  }, [currentIndex, stats, date, barDict, tweening, interval, progress]);

  // Adjust chart when barDict changes
  useEffect(() => {
    if (Object.keys(barDict).length > 0) {
      adjustChart();

      // Sort items
      if (instanceRef.current && containerRef.current) {
        setTimeout(() => {
          instanceRef.current.sort({
            by: (element) => {
              return -getBarValue(element); // Negative for descending order
            },
          });
        }, 100);
      }
    }
  }, [barDict, adjustChart, getBarValue]);

  return (
    <div id="wrapper">
      <div
        className="year-display"
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Year: {year} | Bars: {barList.length} | Index: {currentIndex}
      </div>

      {scaleList.map((scaleItem, i) => (
        <Scale
          key={`scale${i}`}
          value={scaleItem.value}
          left={scaleItem.left}
          unit={unit}
          margin={15.3}
          fixed={fixed}
        />
      ))}

      <div
        ref={containerRef}
        id="container"
        className="item-container"
        style={{
          height: "500px",
          overflow: "visible",
          border: "2px solid red",
          padding: "10px",
        }}
      >
        <div style={{ marginBottom: "10px", color: "blue", fontSize: "14px" }}>
          Debug: barType="{barType}", barList.length={barList.length}, limit=
          {limit}
        </div>

        {barList.length === 0 && (
          <div style={{ color: "red", fontSize: "18px" }}>
            No bars to display! Check data loading.
          </div>
        )}

        {barType === "barWithImageLeft" && barList.length > 0 && (
          <>
            {console.log(
              "Rendering bars:",
              barList.length,
              "Max:",
              getMax(),
              "Min:",
              getMin()
            )}
            {barList
              .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
              .slice(0, limit)
              .map((bar, index) => {
                const width = getWidth(
                  parseFloat(bar.value),
                  getMax(),
                  getMin()
                );
                console.log(
                  `Bar ${bar.label}: value=${bar.value}, width=${width}`
                );
                return (
                  <BarWithImageLeft
                    key={bar.id}
                    id={bar.id}
                    label={bar.label}
                    value={parseFloat(bar.value) || 0}
                    width={width}
                    color="#4CAF50"
                    size={1}
                    unit={unit}
                    fixed={fixed}
                    rank={index + 1}
                    team={bar.team}
                  />
                );
              })}
          </>
        )}
      </div>

      <div className="progress-bar" style={{ marginTop: "20px" }}>
        <div
          className="progress-fill"
          style={{
            width: progressWidth,
            height: "4px",
            backgroundColor: "#4CAF50",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

export default DynamicChartFixed;
