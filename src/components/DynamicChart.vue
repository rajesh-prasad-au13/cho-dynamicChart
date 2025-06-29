<template>
  <div id="wrapper">
    <template v-for="(scale, i) in scaleList">
      <scale
        :key="'scale' + i"
        v-bind="scale"
        v-bind:unit="unit"
        v-bind:margin="15.3"
      ></scale>
    </template>
    <div
      id="container"
      class="item-container"
      style="height: 500px; overflow: visible"
    >
      <template v-if="barType == 'barWithImageLeft'">
        <template v-for="(bar, i) in barList">
          <barWithImageLeft
            :ref="'bars'"
            :key="i"
            v-bind="bar"
            v-bind:unit="unit"
          ></barWithImageLeft>
        </template>
      </template>
    </div>
    <div id="year" class="year">
      <div>{{ year }}</div>
      <div class="progress" v-bind:style="{ width: progressWidth }"></div>
    </div>
    <div
      class="representative"
      v-bind:style="{ 'background-image': 'url(' + representativeImg + ')' }"
    ></div>
    <div class="additional">
      <table>
        <thead>
          {{
            additionalTitle
          }}
        </thead>
        <tbody id="additional-info"></tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Shuffle from "shufflejs";
import TWEEN from "tween.js";
import barWithImageLeft from "./BarWithImageLeft";
import scale from "./Scale";

// Setup the animation loop.
function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
requestAnimationFrame(animate);

export default {
  name: "DynamicChart",
  props: {
    barType: {
      type: String,
      default: "barWithImageLeft",
      validator: function (value) {
        return ["barWithImageLeft"].indexOf(value) !== -1;
      },
    },
    interval: {
      type: Number,
      default: 2 * 1000,
    },
    limit: {
      type: Number,
      default: 15,
    },
    shuffleSpeed: {
      type: Number,
      default: 1000,
    },
    stats: {
      type: Array,
    },
    labelInfo: {
      type: Object,
    },
    date: {
      type: Array,
    },
    fixed: {
      type: Number,
      default: 0,
    },
    scale: {
      type: Number,
      default: 500000000,
    },
    maximum: {
      type: Number,
      default: 0,
    },
    dynamic: {
      type: Boolean,
      default: false,
    },
    unit: {
      type: String,
      default: "",
    },
    tweening: {
      type: Boolean,
      default: true,
    },
    additional: {
      type: Boolean,
      default: false,
    },
    additionalLimit: {
      type: Number,
      default: 0,
    },
    additionalTitle: {
      type: String,
      default: "",
    },
    additionalStats: {
      type: Array,
      default: () => [],
    },
    additionalUnit: {
      type: String,
      default: "",
    },
    additionalCand: {
      type: Array,
      default: () => [],
    },
  },
  data: function () {
    return {
      barList: [],
      instance: null,
      scaleList: [],
      scaleUnit: 1,
      nullNumber: 0,
      representativeImg: "",
      year: 0,
      progress: 1,
    };
  },
  computed: {
    progressWidth: function () {
      // console.log(this.progress * 100 + '%')
      return this.progress * 100 + "%";
    },
  },
  created: function () {
    this.scaleUnit = this.scale;
    this.$options.barDict = {};
  },
  updated: function () {
    this.$refs["bars"].forEach((vue) => {
      if (!(vue.label in this.$options.barDict)) {
        this.$options.barDict[vue.label] = vue;
        this.instance.add([vue.$el]);
        this.$_adjustChart();
      }
    });
  },
  methods: {
    $_charToNum: function (str) {
      // console.log(str)
      let ret = 0;
      for (let i = 0; i < Math.max(str.length, 5); i++) {
        ret += (100 - (str.charCodeAt(i) - " ".charCodeAt(0))) / 100 ** (i + 1);
      }
      return ret;
    },
    $_getBarValue: function (element) {
      const label = element.id.slice(8);
      // console.log(label)
      if (this.$options.barDict[label]) {
        return this.$options.barDict[label].value + this.$_charToNum(label);
      } else {
        console.log(label);
        console.log(this.$options.barDict);
        return 0;
      }
    },
    $_getWidth: function (cur, max, min = 0) {
      const maximum = Math.max(max, this.maximum);
      const offset = 0.1;
      const frontWidth = 0.7;
      const backWidth = 0.2;
      if (this.dynamic)
        return (
          (offset +
            ((cur - min) / (max - min)) * frontWidth +
            (cur / maximum) * backWidth) *
          75
        );
      else
        return (
          (offset + (cur / max) * frontWidth + (cur / maximum) * backWidth) * 75
        );
    },
    $_adjustChart: function () {
      const bars = Object.values(this.$options.barDict).sort((v1, v2) => {
        return (
          v2.value +
          this.$_charToNum(v2.label) -
          (v1.value + this.$_charToNum(v1.label))
        );
      });
      if (bars.length > 0) {
        const top = bars[0];
        const max = top.value;
        const min = this.dynamic ? bars[this.limit - 1] * 0.9 : 0;

        this.representativeImg = top.img;
        this.$_adjustWidth(bars, max, min);
        this.$_adjustScale(max, min);
      }
    },
    $_adjustWidth: function (bars, max, min) {
      // to handle the equal value problem
      // top.value = top.value + 0.00000000000001
      for (const [i, v] of bars.entries()) {
        if (i < this.limit) {
          const width = this.$_getWidth(v.value, max, min);
          const dict = this.$_getBarObject(v.label);
          if (dict.value === parseInt(dict.value)) dict.value += 0.0001;
          v.visible();
          v.setWidth(width + "vw");
        } else {
          v.invisible();
        }
      }
    },
    $_adjustScale: function (max, min) {
      const start = this.scaleList.length
        ? this.scaleList[this.scaleList.length - 1].value + this.scaleUnit
        : this.scaleUnit;
      for (let value = start; value < max * 1.1; value += this.scaleUnit) {
        this.scaleList.push({
          value: value,
          left: 0,
        });
      }
      const cnt = this.scaleList.length;
      if (cnt > 8) {
        this.scaleUnit = this.scaleUnit * 2;
        this.scaleList = this.scaleList.filter((_, i) => i & (1 === 0));
      } else if (cnt < 4) {
        this.scaleUnit = Math.round(this.scaleUnit / 2);
        this.scaleList = this.scaleList.concat(
          this.scaleList.map((v) => ({
            value: v.value - this.scaleUnit,
            left: 0,
          }))
        );
      }
      this.scaleList = this.scaleList.filter(
        (v) => min <= v.value && v.value <= max
      );
      for (const scale of this.scaleList) {
        scale.left = this.$_getWidth(scale.value, max, min);
      }
    },
    $_createBar: function (data) {
      const value = parseFloat(data.value);
      if (!isNaN(value)) {
        const { color, img } = this.$_getBarLabelInfo(data);
        const bar = {
          label: data.label,
          value: value,
          color: color,
          img: img,
          size: 10,
          fixed: this.fixed,
          team: data.team,
        };
        this.barList.push(bar);
      }
    },
    $_getBarLabelInfo: function (data) {
      if (data.team) {
        const info = this.labelInfo[data.team];
        if (info) return info;
      }
      if (data.label) {
        const info = this.labelInfo[data.label];
        if (info) return info;
      }
      throw new Error(`Unknown label ${data.label}`);
    },
    $_sortNodeBar: function () {
      this.instance.sort({
        by: (element) => {
          return this.$_getBarValue(element);
        },
        reverse: true,
      });
    },
    $_getBarObject: function (label) {
      return this.barList.find((bar) => bar.label === label);
    },
  },
  mounted() {
    this.instance = new Shuffle(document.getElementById("container"), {
      itemSelector: ".item",
      speed: this.shuffleSpeed,
    });
    // set initial data
    this.year = this.date[0];
    for (const i in this.stats[0]) {
      const curData = this.stats[0][i];
      curData.value = Number(curData.value);
      this.$_createBar(curData);
    }

    this.$_sortNodeBar();

    let index = 1;
    setTimeout(() => {
      const loop = setInterval(() => {
        if (index < this.stats.length) {
          this.year = this.date[index];
          const before = {};
          const after = {};
          for (const [i, stat] of this.stats[index].entries()) {
            if (i >= 10) break;
            let prevData = this.$options.barDict[stat.label];
            if (!prevData) {
              prevData = {
                label: stat.label,
                value: this.nullNumber,
                team: stat.team,
              };
              this.$_createBar(prevData);
            }
            before[stat.label] = prevData.value;
            after[stat.label] = parseFloat(stat.value) || 0;
          }

          before["progress"] = 0;
          after["progress"] = 1;
          new TWEEN.Tween(before)
            .to(after, this.interval * 0.99)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
              for (const label in before) {
                if (label === "progress") {
                  this.progress = before["progress"];
                } else {
                  const value = before[label];
                  this.$_getBarObject(label).value = value;
                }
              }
              this.$_adjustChart();
            })
            .start();
        } else {
          clearInterval(loop);
        }
        index++;
      }, this.interval);
    }, 3000);

    setInterval(() => {
      this.$_sortNodeBar();
      this.$_adjustChart();
    }, 100);
  },
  components: {
    barWithImageLeft,
    scale,
  },
};
</script>

<style>
.item-container {
  font-family: sans-serif;
  font-size: 1.25vw;
}
.year {
  position: absolute;
  top: 44vw;
  left: 80vw;
  font-size: 7vw;
  z-index: 20;
  font-weight: 600;
}
.year .progress {
  height: 1.5vw;
  background: rgb(194, 6, 6);
  margin-top: -1vw;
}
.representative {
  background-size: contain;
  background-position: center bottom;
  background-repeat: no-repeat;
  width: 18vw;
  height: 15vw;
  position: absolute;
  top: 29.5vw;
  left: 79vw;
  z-index: 20;
  /* border:1px solid green; */
}
</style>
