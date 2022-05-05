<template>
  <div class="commonMain">
    <el-aside class="homeBottomMenu">
      <div class="hbmMain">
        <menuS ref="projectMenu" :viewMenu="viewMenu"></menuS>
      </div>
    </el-aside>
    <el-main class="homeMain">
      <div id="appIndex8">
        <router-view />
      </div>
    </el-main>
  </div>
</template>

<script>
import "dingtalk-jsapi/entry/union";
import menuS from "@/components/menuList.vue";
export default {
  name: "appIndex8",
  components: {
    menuS,
  },
  data() {
    return {
      viewMenu: 1,
    };
  },
  methods: {},
  created() {},
};
</script>
