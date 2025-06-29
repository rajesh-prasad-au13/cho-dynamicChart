import React from "react";
import DynamicChartFixed from "../components/DynamicChartFixed";
import TestBars from "../components/TestBars";
import { stats } from "../data/result";
import { labelInfo } from "../data/indiaInfo";

const HomePage = () => {
  // Sample date array - you can modify this based on your data
  const dateArray = Array.from({ length: stats.length }, (_, i) =>
    (1970 + i).toString()
  );

  return (
    <div className="home-page">
      <TestBars />
      <hr />
      <DynamicChartFixed
        barType="barWithImageLeft"
        interval={2000}
        limit={15}
        shuffleSpeed={1000}
        stats={stats}
        labelInfo={labelInfo}
        date={dateArray}
        fixed={1}
        scale={10}
        maximum={100}
        dynamic={false}
        unit=""
        tweening={true}
        additional={false}
        additionalLimit={0}
        additionalTitle=""
        additionalStats={[]}
        additionalUnit=""
        additionalCand={[]}
      />
    </div>
  );
};

export default HomePage;
