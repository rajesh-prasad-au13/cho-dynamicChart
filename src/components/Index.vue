<template>
  <div class="back">
    <!--<img class="background" src="../assets/colorful-world.png">-->
    <div class="background"></div>
    <div class="title">
      <h1 style="font-size: 4vw;">Most Wickets in ODI Matches</h1>
    </div>
    <!--<div class="detail-value">unit: kWh</div>-->
    <chart v-bind="chart"></chart>
  </div>
</template>

<script>
import { stats, maximum, dates } from '../data/result'
import labelInfo from '../data/indiaInfo'
import chart from './DynamicChart.vue'

export default {
  data: function () {
    return {
      chart: {
        stats: stats,
        labelInfo: labelInfo,
        date: dates,
        interval: 10 * 1000,
        scale: 3,
        maximum: maximum,
        limit: 10,
        fixed: 0,
        // unit: '%',
        // dynamic: true
        // additionalStats: additionalStats,
        // additionalCand: ['World', 'Sub-Saharan Africa', 'Euro area', 'Middle East & North Africa', 'European Union', 'East Asia & Pacific', 'Middle East & North Africa', 'North America', 'OECD members'],
        // additionalLimit: 3,
        // additionalUnit: '%'
      },
      bar: {
        color: '#abcded',
        img: 'https://www.countryflags.io/kg/flat/64.png',
        size: 10,
        label: 'A',
        value: 10340
      }
    }
  },
  components: {
    chart
  }
}
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
    background-color: #FFF;
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
