/* * @Author: NorthWind * @Date: 2020-11-13 08:39:39 * @Last Modified by:
NorthWind * @Last Modified time: 2020-12-21 14:08:51 */

<template>
  <div class="commonMain">
    <el-aside class="homeBottomMenu">
      <div class="hbmMain">
        <menuS ref="projectMenu" :viewMenu="viewMenu"></menuS>
      </div>
    </el-aside>
    <el-main class="homeMain">
      <div id="system">
        <router-view />
      </div>
    </el-main>
  </div>
</template>

<script>
import menuS from "@/components/menuList.vue";
export default {
  name: "system",
  components: {
    menuS
  },
  data() {
    return {
      viewMenu: 3
    };
  },
  methods: {},
  created() {}
};
</script>
