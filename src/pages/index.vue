<template>
  <div class="commonMain">
    <el-aside class="homeBottomMenu">
      <div class="hbmMain">
        <menuS ref="projectMenu" :viewMenu="viewMenu"></menuS>
      </div>
    </el-aside>
    <el-main class="homeMain">
      <div id="appIndex8">
        <div class="dingtalk" v-if="firstshow">
          <div>
            <img
              style="width: 24px;height: 24px;margin: 0 8px 0 16px;"
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/eZkBANm35M1621325500394.png"
              alt=""
            />
            <span> 你正在使用个人体验版,如需正式使用,请联系管理员</span>
          </div>
          <div style="display: flex; align-items: center">
            <el-button type="primary" @click="verification"
              >联系管理员</el-button
            >
          </div>
        </div>
        <router-view />
      </div>
    </el-main>
  </div>
</template>

<script>
import "dingtalk-jsapi/entry/union";
import * as dd from "dingtalk-jsapi";
import { contactAdminToUseApp } from "dingtalk-design-libs";
import menuS from "@/components/menuList.vue";
export default {
  name: "appIndex",
  components: {
    menuS
  },
  data() {
    return {
      firstshow: false,
      viewMenu: 4
    };
  },
  methods: {
    verification() {
      const that = this;

      dd.ready(() => {
        // alert('进入ready');
        contactAdminToUseApp({
          id: "58708",
          corpId: that.$store.state.userInfo.maincorpid
        }).catch(err => {
          // 入参不正确，或者遇到技术异常时才会进入这个链路
          console.error(err);
          // alert(JSON.stringify(err));
        });
      });
    }
  },
  created() {
    const that = this;
    if (that.$store.state.userInfo.firstshow == 2) {
      that.firstshow = true;
    } else {
      that.firstshow = false;
    }
  }
};
</script>
