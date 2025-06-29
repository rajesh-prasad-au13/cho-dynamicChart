<template>
  <div
    v-bind:id="id"
    class="item"
    v-bind:class="[size.toString()]"
    style="
       {
        opacity: 0;
      }
    "
  >
    <div class="item-icon">
      <!--{{ team }}-->
      <img
        v-bind:src="img"
        style="
           {
            width: 15px;
            height: 15px;
          }
        "
      />
    </div>
    <div class="item-bar" v-bind:style="{ background: color }">
      <span class="item-label">{{ label }}</span>
      <span class="team-label">{{ team }}</span>
    </div>
    <div class="item-value">{{ formattedValue }}</div>
  </div>
</template>

<script>
import { formatter } from "./mixin/formatter";

export default {
  name: "BarWithImageLeft",
  mixins: [formatter],
  props: {
    color: String,
    img: String,
    size: Number,
    label: String,
    value: Number,
    unit: String,
    team: String,
    fixed: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    id: function () {
      return `item-id-${this.label}`;
    },
    formattedValue: function () {
      return this.numberWithCommas(this.value.toFixed(this.fixed)) + this.unit;
    },
    imgUrl: function () {
      return `url(${this.img})`;
    },
  },
  methods: {
    setWidth: function (width) {
      this.$el.querySelector(".item-bar").style.width = width;
    },
    invisible: function () {
      this.$el.style.opacity = 0;
    },
    visible: function () {
      this.$el.style.opacity = 1;
    },
  },
};
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
  color: #FFF;
  text-shadow: 0 0 10px #000;
  /*width:100%;*/
}
.item-label {
  /*width: 100%;*/
  height: 3vw;
  line-height: 3vw;
  /*height: 2.5vw;*/
  /*line-height: 2.5vw;*/
  color: #FFF;
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
  color: #FFF;
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
