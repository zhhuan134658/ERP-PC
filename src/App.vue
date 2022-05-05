<template>
  <div id="app">
    <router-view class="app-bottom" />
    <div class="version">
      <span>{{ version }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      version: "0.1.0rc1",
    };
  },
  methods: {},
  created() {
    console.error(window.location);
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  background: #f6f6f6;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  .version {
    position: fixed;
    bottom: 16px;
    right: 0;
    opacity: 0.15;
  }
  .app-bottom {
    height: 100%;
    min-height: 100vh;
  }
  .app-right {
    display: flex;
    width: 15.73rem;
  }
}
</style>
