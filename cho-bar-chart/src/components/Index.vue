<template>
  <div class="back">
    <!--<img class="background" src="../assets/colorful-world.png">-->
    <div class="background"></div>
    <div class="title">
      <h1 style="font-size: 4vw;">Most Wickets in ODI Matches</h1>
    </div>
    <!--<div class="detail-value">unit: kWh</div>-->
    <chart v-bind="chartConfig"></chart>
  </div>
</template>

<script setup>
import { ref } from "vue";
import chart from "./DynamicChart.vue";
import { stats, maximum, dates } from "../data/result.js";
import labelInfo from "../data/indiaInfo.js";

// Setup reactive data with composition API
const chartConfig = ref({
  stats: stats,
  labelInfo: labelInfo,
  date: dates,
  interval: 10 * 1000,
  scale: 3,
  maximum: maximum,
  limit: 10,
  fixed: 0
  // unit: '%',
  // dynamic: true
  // additionalStats: additionalStats,
  // additionalCand: ['World', 'Sub-Saharan Africa', 'Euro area', 'Middle East & North Africa', 'European Union', 'East Asia & Pacific', 'Middle East & North Africa', 'North America', 'OECD members'],
  // additionalLimit: 3,
  // additionalUnit: '%'
});

// Sample bar data (not used directly in the current implementation)
const bar = ref({
  color: "#abcded",
  img: "https://www.countryflags.io/kg/flat/64.png",
  size: 10,
  label: "A",
  value: 10340
});
</script>

<style>
body {
  text-shadow: 0 0 10px rgb(187, 12, 12);
  color: #000;
}
.back {
  width: 100vw;
}
.background {
  position: absolute;
  left: 0%;
  width: 105%;
  height: 100%;
  z-index: -3;
  background-color: #fff;
}
.title {
  font-size: 1.75vw;
  padding-top: 2vw;
  padding-bottom: 2.5vw;
  text-align: center;
}
.detail-value {
  font-size: 1vw;
  font-weight: 600;
  position: absolute;
  left: 83vw;
  top: 8vw;
  width: 15vw;
  text-align: right;
}
.additional {
  position: absolute;
  top: 19vw;
  left: 80.5vw;
  z-index: 20;
  text-align: left;
  width: 23vw;
  font-weight: 700;
  font-size: 1vw;
}
.additional thead {
  font-size: 40px;
  text-shadow: -1px 0 blue, 0 1px blue, 1px 0 blue, 0 -1px blue;
}
.additional table {
  width: 100%;
}
.item {
  margin: 0.3vw;
}
.item-bar {
  height: 2.5vw;
}
</style>
