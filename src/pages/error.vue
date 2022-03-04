/* * @Author: NorthWind * @Date: 2020-11-13 09:02:39 * @Last Modified by:
NorthWind * @Last Modified time: 2021-03-04 18:29:30 */
<template>
  <div id="error">
    <div class="errorMain">
      <img src="../assets/workbench/noPower.png" alt="" />
      <h4 style="margin-top: 40px">{{ msg }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  data() {
    return {
      isFlag: 0,
      msg: ""
    };
  },
  created() {
    this.isFlag = sessionStorage.getItem("errcode");
    this.msg = sessionStorage.getItem("errMsg");
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
    }
    h2 {
      font-size: 22px;
      margin-bottom: 30px;
    }
    h4 {
      font-size: 16px;
      margin-bottom: 34px;
    }
    .bottomBtn {
      text-align: center;
    }
  }
}
</style>
