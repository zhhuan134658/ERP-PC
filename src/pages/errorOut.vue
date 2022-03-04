<template>
  <div id="error">
    <div class="errorMain">
      <img src="../assets/workbench/outtime.png" alt="" />
      <h2>版本到期提醒</h2>
      <h4 v-if="status == 0">
        您公司于<span style="color: #409eef">{{
          this.$store.state.outTime
        }}</span
        >开始试用的筑快OA已到期，感谢您的支持和信任，请您及时购买正式版。
      </h4>
      <h4 v-if="status == 1">
        您公司于<span style="color: #409eef">{{
          this.$store.state.outTime
        }}</span
        >开始购买的筑快OA已到期，感谢您的支持和信任，请您及时续费购买。
      </h4>
      <div class="bottomBtn">
        <el-popover placement="top" width="300" trigger="click">
          <img style="width: 100%" src="../assets/workbench/buy.png" alt />
          <el-button
            type="primary"
            style="margin-right: 30px"
            round
            slot="reference"
            >购买升级</el-button
          >
        </el-popover>
        <el-popover placement="top" width="300" trigger="click">
          <img style="width: 100%" src="../assets/workbench/erweima.png" alt />
          <div style="text-align: center; margin: 0">
            <div style="text-align: center">
              手机钉钉扫描二维码加入“用户服务群”
            </div>

            <div style="text-align: center">
              联系电话：0371-56775558
            </div>
          </div>
          <el-button type="primary" round slot="reference">联系客服</el-button>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  data() {
    return {
      start: "",
      status: 2
    };
  },
  mounted() {
    this.start = sessionStorage.getItem("errTime");
    this.status = sessionStorage.getItem("errStatus");
  }
};
</script>

<style lang="less">
#error {
  width: 100%;
  height: 90vh;
  .errorMain {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    text-align: center;
    z-index: 1200;
    img {
      margin-top: 100px;
      width: 240px;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 22px;
      margin-bottom: 30px;
    }
    h4 {
      font-size: 16px;
      margin-bottom: 80px;
    }
    .bottomBtn {
      text-align: center;
    }
  }
}
</style>
