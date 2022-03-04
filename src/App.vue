/* * @Author: NorthWind * @Date: 2020-11-12 16:48:55 * @Last Modified by:
Liuzhipeng * @Last Modified time: 2021-12-10 16:21:36 */

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
      version: "0.1.0rc1"
    };
  },
  methods: {
    getReady() {
      const that = this;
      // 免登录信息获取
      that.$dd.ready(function() {
        // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
        that.$dd.runtime.permission.requestAuthCode({
          // corpId: "dingea47c602975497f935c2f4657eb6378f",
          corpId: that.$store.state.cid,
          onSuccess: function(result) {
            if (result.code != "") {
              that.$axios
                .post("/user/userinfo", {
                  corp_id: that.$store.state.cid,
                  code: result.code,
                  type: 1
                })
                .then(res => {
                  if (res.data.code == 1) {
                    sessionStorage.setItem("errcode", 1);

                    that.$utils.checkding();
                  } else if (res.data.code == 2) {
                    sessionStorage.setItem("errMsg", res.data.msg);
                    sessionStorage.setItem("errcode", 2);
                    that.$router.push("/error");
                  } else if (res.data.code == 3) {
                    that.$store.commit("setOutTime", res.data.data.time);
                    sessionStorage.setItem("errcode", 3);
                    sessionStorage.setItem("errStatus", res.data.data.status);
                    that.$router.push("/errorOut");
                  } else if (res.data.code == 0) {
                    sessionStorage.setItem("errcode", 0);
                    sessionStorage.setItem("errMsg", res.data.msg);
                    that.$router.push("/error");
                  }
                });
            }
          },
          onFail: function() {}
        });
      });
    }
  },
  created() {
    const _this = this;

    let CorpId = "";
    var url = decodeURIComponent(location.search); //获取url中"?"符后的字串
    CorpId = url.split("?corpid=")[1];
    _this.$store.commit("setCid", CorpId);
    // _this.getReady();
    console.error(window.location);
  }
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
