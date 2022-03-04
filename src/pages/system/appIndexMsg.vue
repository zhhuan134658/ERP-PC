<template>
  <div id="appIndex2">
    <div class="main">
      <div class="content">
        <h3>消息通知</h3>
        <div class="sec">
          <div></div>
          <div>
            <el-button type="primary" plain size="medium" @click="backClick"
              >返回</el-button
            >
          </div>
        </div>
        <div class="msgMain">
          <div>
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) in tableData"
                :key="index"
                :timestamp="item.createdtime"
                placement="top"
              >
                <el-card>
                  <p>{{ item.parere }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import * as dd from "dingtalk-jsapi";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    getList() {
      this.$axios
        .post("/finance/tonotice")
        .then(res => {
          if (res.data.code == 1) {
            this.tableData = res.data.content;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    backClick() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang="less" scoped>
.msgMain {
  width: 800px;
  margin: 0 auto;
  text-align: left;
  div {
    padding: 20px;
  }
}
.main {
  background: #fff;
  border-radius: 5px;
  .content {
    h3 {
      margin: 0px !important;
      padding: 20px;
    }
  }
}
</style>
