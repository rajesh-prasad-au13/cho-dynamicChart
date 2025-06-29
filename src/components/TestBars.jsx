import React from "react";
import BarWithImageLeft from "../components/BarWithImageLeft";

const TestBars = () => {
  const testData = [
    { label: "Test Player 1", value: 60, team: "Team A" },
    { label: "Test Player 2", value: 45, team: "Team B" },
    { label: "Test Player 3", value: 30, team: "Team C" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Test Bars (Static)</h2>
      {testData.map((bar, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <BarWithImageLeft
            label={bar.label}
            value={bar.value}
            width={50 + index * 20}
            color="#4CAF50"
            size={1}
            unit=""
            fixed={0}
            rank={index + 1}
            team={bar.team}
          />
        </div>
      ))}
    </div>
  );
};

export default TestBars;
