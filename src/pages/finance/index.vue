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
    menuS,
  },
  data() {
    return {
      viewMenu: 5,
    };
  },
  methods: {},
  created() {},
};
</script>
