<template>
  <div class="progress-liu">
    <div class="progress-liu-bar">
      <div class="progress-liu-bar_inner" :style="{ width: width + '%' }"></div>
    </div>
    <div style="margin-left: 5px; line-height: 9px">{{ width }}%</div>
  </div>
</template>

<script>
export default {
  name: "progress-liu",
  props: {
    width: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style lang="less" scoped>
.progress-liu {
  display: flex;
  flex-direction: row;
  width: 210px !important;
  background-color: transparent;
}
.progress-liu-bar {
  height: 5px;
  border-radius: 100px;
  background: #e3e3e3;
  width: 150px;
  position: relative;
}

.progress-liu-bar_inner {
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0;
  bottom: 0;
  background: #fdae05;
  border-radius: 100px;
}
</style>
