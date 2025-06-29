<template>
  <div
    class="scale"
    v-bind:style="{ left: left + 'vw', 'margin-left': margin + 'vw' }"
  >
    <div class="scale-bar"></div>
    <div class="scale-value">{{ formattedValue }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatter } from "./mixin/formatter.js";

// Props
const props = defineProps({
  left: Number,
  value: Number,
  unit: String,
  margin: Number,
  fixed: {
    type: Number,
    default: 0
  }
});

// Use the formatter mixin methods
const { numberWithCommas } = formatter.methods;

// Computed properties
const formattedValue = computed(() => {
  return numberWithCommas(props.value.toFixed(props.fixed)) + props.unit;
});
</script>

<style scoped>
.scale {
  position: absolute;
  z-index: -1;
  font-size: 0.75vw;
  top: 10.5vw;
  color: #302b2b;
}
.scale-bar {
  position: absolute;
  /*top: -51vw;*/
  /*top: -800px;*/
  width: 0.1vw;
  /*height: 45vw;*/
  height: 43vw;
  background: rgba(85, 81, 81, 0.8);
}
.scale-value {
  position: absolute;
  width: 8vw;
  left: 0.5vw;
  text-align: left;
  font-weight: 800;
}
</style>
