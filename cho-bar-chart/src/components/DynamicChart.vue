<template>
  <div id="wrapper">
    <scale
      v-for="(scale, i) in scaleList"
      :key="'scale' + i"
      v-bind="scale"
      v-bind:unit="unit"
      v-bind:margin="15.3"
    ></scale>
    <div
      id="container"
      class="item-container"
      style="height: 500px; overflow: visible"
    >
      <barWithImageLeft
        v-if="barType === 'barWithImageLeft'"
        v-for="(bar, i) in barList"
        :key="i"
        v-bind="bar"
        :unit="unit"
      ></barWithImageLeft>
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
          <tr>
            <th>{{ additionalTitle }}</th>
          </tr>
        </thead>
        <tbody id="additional-info"></tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUpdated, nextTick } from "vue";
import Shuffle from "shufflejs";
import TWEEN from "tween.js";
import barWithImageLeft from "./BarWithImageLeft.vue";
import scale from "./Scale.vue";

// Setup the animation loop.
function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
requestAnimationFrame(animate);

// Props
const props = defineProps({
  barType: {
    type: String,
    default: "barWithImageLeft",
    validator: function(value) {
      return ["barWithImageLeft"].indexOf(value) !== -1;
    }
  },
  interval: {
    type: Number,
    default: 2 * 1000
  },
  limit: {
    type: Number,
    default: 15
  },
  shuffleSpeed: {
    type: Number,
    default: 1000
  },
  stats: {
    type: Array
  },
  labelInfo: {
    type: Object
  },
  date: {
    type: Array
  },
  fixed: {
    type: Number,
    default: 0
  },
  scale: {
    type: Number,
    default: 500000000
  },
  maximum: {
    type: Number,
    default: 0
  },
  dynamic: {
    type: Boolean,
    default: false
  },
  unit: {
    type: String,
    default: ""
  },
  tweening: {
    type: Boolean,
    default: true
  },
  additional: {
    type: Boolean,
    default: false
  },
  additionalLimit: {
    type: Number,
    default: 0
  },
  additionalTitle: {
    type: String,
    default: ""
  },
  additionalStats: {
    type: Array,
    default: () => []
  },
  additionalUnit: {
    type: String,
    default: ""
  },
  additionalCand: {
    type: Array,
    default: () => []
  }
});

// Reactive data
const barList = ref([]);
const instance = ref(null);
const scaleList = ref([]);
const scaleUnit = ref(props.scale);
const nullNumber = ref(0);
const representativeImg = ref("");
const year = ref(0);
const progress = ref(1);
const barDict = ref({});

// Computed properties
const progressWidth = computed(() => {
  return progress.value * 100 + "%";
});

// Methods
const charToNum = str => {
  let ret = 0;
  for (let i = 0; i < Math.max(str.length, 5); i++) {
    ret += (100 - (str.charCodeAt(i) - " ".charCodeAt(0))) / 100 ** (i + 1);
  }
  return ret;
};

const getBarValue = element => {
  const label = element.id.slice(8);
  if (barDict.value[label]) {
    return barDict.value[label].value + charToNum(label);
  } else {
    console.log(label);
    console.log(barDict.value);
    return 0;
  }
};

const getWidth = (cur, max, min = 0) => {
  const maximum = Math.max(max, props.maximum);
  const offset = 0.1;
  const frontWidth = 0.7;
  const backWidth = 0.2;
  if (props.dynamic)
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
};

const adjustChart = () => {
  const bars = Object.values(barDict.value).sort((v1, v2) => {
    return v2.value + charToNum(v2.label) - (v1.value + charToNum(v1.label));
  });
  if (bars.length > 0) {
    const top = bars[0];
    const max = top.value;
    const min =
      props.dynamic && bars.length >= props.limit
        ? bars[props.limit - 1].value * 0.9
        : 0;

    representativeImg.value = top.img;
    adjustWidth(bars, max, min);
    adjustScale(max, min);
  }
};

const adjustWidth = (bars, max, min) => {
  for (const [i, v] of bars.entries()) {
    if (i < props.limit) {
      const width = getWidth(v.value, max, min);
      const dict = getBarObject(v.label);
      if (dict.value === parseInt(dict.value)) dict.value += 0.0001;
      v.visible();
      v.setWidth(width + "vw");
    } else {
      v.invisible();
    }
  }
};

const adjustScale = (max, min) => {
  const start = scaleList.value.length
    ? scaleList.value[scaleList.value.length - 1].value + scaleUnit.value
    : scaleUnit.value;
  for (let value = start; value < max * 1.1; value += scaleUnit.value) {
    scaleList.value.push({
      value: value,
      left: 0
    });
  }
  const cnt = scaleList.value.length;
  if (cnt > 8) {
    scaleUnit.value = scaleUnit.value * 2;
    scaleList.value = scaleList.value.filter((_, i) => (i & 1) === 0);
  } else if (cnt < 4) {
    scaleUnit.value = Math.round(scaleUnit.value / 2);
    scaleList.value = scaleList.value.concat(
      scaleList.value.map(v => ({
        value: v.value - scaleUnit.value,
        left: 0
      }))
    );
  }
  scaleList.value = scaleList.value.filter(
    v => min <= v.value && v.value <= max
  );
  for (const scale of scaleList.value) {
    scale.left = getWidth(scale.value, max, min);
  }
};

const createBar = data => {
  const value = parseFloat(data.value);
  if (!isNaN(value)) {
    const { color, img } = getBarLabelInfo(data);
    const bar = {
      label: data.label,
      value: value,
      color: color,
      img: img,
      size: 10,
      fixed: props.fixed,
      team: data.team
    };
    barList.value.push(bar);
  }
};

const getBarLabelInfo = data => {
  if (data.team) {
    const info = props.labelInfo[data.team];
    if (info) return info;
  }
  if (data.label) {
    const info = props.labelInfo[data.label];
    if (info) return info;
  }
  throw new Error(`Unknown label ${data.label}`);
};

const sortNodeBar = () => {
  instance.value.sort({
    by: element => {
      return getBarValue(element);
    },
    reverse: true
  });
};

const getBarObject = label => {
  return barList.value.find(bar => bar.label === label);
};

// Skipping onUpdated hook since it was causing URI malformed errors
// We'll handle bar updates directly in onMounted

onMounted(() => {
  scaleUnit.value = props.scale;

  instance.value = new Shuffle(document.getElementById("container"), {
    itemSelector: ".item",
    speed: props.shuffleSpeed
  });

  // set initial data
  year.value = props.date[0];
  for (const i in props.stats[0]) {
    const curData = props.stats[0][i];
    curData.value = Number(curData.value);
    createBar(curData);
  }

  sortNodeBar();

  let index = 1;
  setTimeout(() => {
    const loop = setInterval(() => {
      if (index < props.stats.length) {
        year.value = props.date[index];
        const before = {};
        const after = {};
        for (const [i, stat] of props.stats[index].entries()) {
          if (i >= 10) break;
          let prevData = barDict.value[stat.label];
          if (!prevData) {
            prevData = {
              label: stat.label,
              value: nullNumber.value,
              team: stat.team
            };
            createBar(prevData);
          }
          before[stat.label] = prevData.value;
          after[stat.label] = parseFloat(stat.value) || 0;
        }

        before["progress"] = 0;
        after["progress"] = 1;
        new TWEEN.Tween(before)
          .to(after, props.interval * 0.99)
          .easing(TWEEN.Easing.Linear.None)
          .onUpdate(() => {
            for (const label in before) {
              if (label === "progress") {
                progress.value = before["progress"];
              } else {
                const value = before[label];
                getBarObject(label).value = value;
              }
            }
            adjustChart();
          })
          .start();
      } else {
        clearInterval(loop);
      }
      index++;
    }, props.interval);
  }, 3000);

  setInterval(() => {
    sortNodeBar();
    adjustChart();
  }, 100);
});
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
