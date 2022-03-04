/* * @Author: NorthWind * @Date: 2020-11-13 08:40:26 * @Last Modified by:
NorthWind * @Last Modified time: 2020-12-23 09:54:47 */

<template>
  <div class="commonMain">
    <el-aside class="homeBottomMenu">
      <div class="hbmMain">
        <menuS ref="projectMenu" :viewMenu="viewMenu"></menuS>
      </div>
    </el-aside>
    <el-main class="homeMain">
      <div id="project">
        <router-view />
      </div>
    </el-main>
  </div>
</template>

<script>
import menuS from "@/components/menuList.vue";
export default {
  name: "project",
  components: {
    menuS
  },
  data() {
    return {
      viewMenu: 2
    };
  },
  created() {}
};
</script>
