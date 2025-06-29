<template>
  <div
    ref="itemEl"
    v-bind:id="id"
    class="item"
    v-bind:class="[size.toString()]"
    style="opacity: 0;"
  >
    <div class="item-icon">
      <!--{{ team }}-->
      <img v-bind:src="img" style="width: 15px; height: 15px;" />
    </div>
    <div class="item-bar" v-bind:style="{ background: color }">
      <span class="item-label">{{ label }}</span>
      <span class="team-label">{{ team }}</span>
    </div>
    <div class="item-value">{{ formattedValue }}</div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { formatter } from "./mixin/formatter.js";

// Props
const props = defineProps({
  color: String,
  img: String,
  size: Number,
  label: String,
  value: Number,
  unit: String,
  team: String,
  fixed: {
    type: Number,
    default: 0
  }
});

// Template refs
const itemEl = ref(null);

// Use the formatter mixin methods
const { numberWithCommas } = formatter.methods;

// Computed properties
const id = computed(() => {
  return `item-id-${props.label}`;
});

const formattedValue = computed(() => {
  return numberWithCommas(props.value.toFixed(props.fixed)) + props.unit;
});

const imgUrl = computed(() => {
  return `url(${props.img})`;
});

// Methods
const setWidth = width => {
  if (itemEl.value) {
    const itemBar = itemEl.value.querySelector(".item-bar");
    if (itemBar) {
      itemBar.style.width = width;
    }
  }
};

const invisible = () => {
  if (itemEl.value) {
    itemEl.value.style.opacity = 0;
  }
};

const visible = () => {
  if (itemEl.value) {
    itemEl.value.style.opacity = 1;
  }
};

// Expose methods to parent
defineExpose({
  setWidth,
  invisible,
  visible,
  label: props.label,
  value: props.value,
  $el: itemEl
});
</script>

<style scoped>
.item {
  font-weight: 600;
  margin-left: 11vw;
  position: relative;
  display: flex;
  flex-direction: row;
}
.team-label {
  display: block;
  float: left;
  text-align: left;
  line-height: 3vw;
  margin-left: 1vw;
  color: #fff;
  text-shadow: 0 0 10px #000;
  /*width:100%;*/
}
.item-label {
  /*width: 100%;*/
  height: 3vw;
  line-height: 3vw;
  /*height: 2.5vw;*/
  /*line-height: 2.5vw;*/
  color: #fff;
  text-shadow: 0 0 10px #000;
  margin-right: 1vw;
}
.item-bar {
  height: 3vw;
  /*height: 2.5vw;*/
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
  width: 10vw;
  /* display: flex; */
}
.item-value {
  /* display: flex; */
  text-align: left;
  padding-left: 0.5vw;
  line-height: 3vw;
  /*line-height: 2.5vw;*/
}
.item-icon {
  width: 3vw;
  /* height: 3vw; */
  /* background-size: contain; */
  /* background-repeat: no-repeat; */
  /* height: 100%; */
  /* position: absolute; */
  padding-right: 1vw;
  /* display: flex; */
}
.item-icon .item-marker {
  /* position: absolute; */
  /*width: 100%;*/
  /*right: 135%;*/
  right: 105%;
  top: 20%;
  text-align: right;
}
.item-icon .item-marker span {
  color: #fff;
  text-shadow: 0 0 10px #000;
}
.item-icon img {
  /* position: absolute; */
  width: 3vw;
  height: auto;
  /*max-height: 3vw;*/
  margin: 0;
  top: 0vw;
}
.item-icon span {
  margin-right: 0.5vw;
  white-space: nowrap;
  display: inline-block;
}
</style>
