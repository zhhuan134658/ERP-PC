
<template>
  <div id="materialPlanReport">
    <!-- 材料出库报表 -->
    <div class="changtype" style="background-color: #fff">
      <div
        class="left_item"
        v-for="(item, index) in toptitleList"
        :style="activeindex == index ? 'color:#409EFF' : ''"
        @click="activechange(index)"
      >
        {{ item.name }}
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import commonSearch from "@/components/commonSearch.vue";

export default {
  name: "materialSettleReport",
  components: { commonSearch },

  data() {
    return {
      activeindex: 0,
      toptitleList: [{ name: "审批列表" }, { name: "报表" }],
    };
  },
  methods: {
    activechange(index) {
      this.activeindex = index;
      this.pierceTableid = +new Date();
      if (index == 0) {
        this.$router.push("/librarytube/outLibrary/shenpi");
      } else {
        this.$router.push("/librarytube/outLibrary/baobiao");
      }
    },
  },
  mounted() {},
  created() {},
  computed: {},
};
</script>