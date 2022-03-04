<template>
  <div id="userInfo">
    <div class="appHeaderLeft">
      <div>
        <!-- <img src="../assets/images/modianlogo.png" alt="" />劳务实名制 -->
      </div>
      <div>筑快科技</div>
    </div>
    <div class="appHeaderRight"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
#userInfo {
  width: 100%;
  width: 100%;
  height: 66px;
  line-height: 66px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .appHeaderLeft {
    display: flex;
    > div:nth-child(1) {
      background-color: #409eff;
      width: 200px;
      border: 1px solid #409eff;
      box-sizing: border-box;
      color: #fff;
      text-align: center;
      font-size: 20px;
      img {
        width: 59px;
      }
    }
  }
}
</style>
