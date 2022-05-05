<template>
  <div class="commonMain">
    <el-aside class="homeBottomMenu">
      <div class="hbmMain">
        <menuS ref="projectMenu" :viewMenu="viewMenu"></menuS>
      </div>
    </el-aside>
    <el-main class="homeMain">
      <div id="purchase">
        <router-view />
      </div>
    </el-main>
  </div>
</template>

<script>
import menuS from "@/components/menuList.vue";
export default {
  name: "purchase",
  components: {
    menuS,
  },
  data() {
    return {
      viewMenu: 2,
    };
  },
  methods: {},
  created() {},
};
</script>
