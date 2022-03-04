<template>
  <div id="initializeApp">
    <div class="main">
      <div class="initContent">
        <img
          src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//YsK63f4ESm1640936121006.png"
          alt=""
        />
        <div class="initText">
          提示：初始化设置后，数据将会清空，不能恢复，请谨慎操作！
        </div>
        <div class="initBut">
          <el-button type="primary" @click="clear">数据初始化</el-button>
        </div>

        <!-- <el-button @click="clear">111</el-button> -->
      </div>
    </div>
    <div v-if="dialog" class="allFixed">
      <dv-loading>初始化中...</dv-loading>

      <dv-percent-pond
        :config="config"
        style="width: 90%; height: 20px; margin: auto"
      />
    </div>
  </div>
</template>

<script>
const fullWidth = 300;
const borderGap = 3;
const borderWidth = 3;
const usefulWidth = fullWidth - (borderGap + borderWidth) * 2;

const pieceLength = [0.25, 0.5, 0.25];
const pieceGap = 3;

const lineDash = pieceLength
  .map(l => [usefulWidth * l, pieceGap])
  .reduce((all, current) => [...all, ...current], []);
export default {
  name: "initializeApp",
  data() {
    return {
      config: {
        value: 0,
        colors: ["#01c4f9", "#c135ff"]
      },
      dialog: false,

      fullscreenLoading: false,
      apiList: ["/order/zhuEmpty1", "/order/zhuEmpty2", "/order/zhuEmpty3"],
      allList: [],
      speed: ""
    };
  },
  methods: {
    // 更新数据的示例方法
    updateHandler(data) {
      const { config } = this;

      /**
       * 只是这样做是无效
       * config指向的内存地址没有发生变化
       * 组件无法侦知数据变化
       */
      this.config.value = data;

      /**
       * 使用ES6拓展运算符生成新的props对象
       * 组件侦知数据变化 自动刷新状态
       */
      this.config = { ...this.config };
    },
    get_code(apiData, index) {
      return new Promise((resolve, reject) => {
        this.$axios
          .post(apiData)
          .then(res => {
            if (res.data.code == 1) {
              resolve(index);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },

    clear1() {
      let allList = [];

      for (var i = 0; i < this.apiList.length; i++) {
        allList.push(this.get_code(this.apiList[i], i));
      }
      this.$nextTick(function() {
        this.getResult(allList);
      });

      console.log(allList);
    },
    getA() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/order/zhuEmpty1")
          .then(res => {
            if (res.data.code == 1) {
              this.updateHandler(Math.round(Math.random() * 10));
              resolve("1");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    getB() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/order/zhuEmpty2")
          .then(res => {
            if (res.data.code == 1) {
              this.updateHandler(Math.round(Math.random() * 10 + 10));
              resolve("2");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    getC() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/order/zhuEmpty3")
          .then(res => {
            if (res.data.code == 1) {
              this.updateHandler(Math.round(Math.random() * 10 + 20));
              resolve("3");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    getD() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/order/zhuEmpty4")
          .then(res => {
            if (res.data.code == 1) {
              this.updateHandler(Math.round(Math.random() * 10 + 30));
              resolve("4");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    getE() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/order/zhuEmpty5")
          .then(res => {
            if (res.data.code == 1) {
              this.updateHandler(Math.round(Math.random() * 10 + 50));
              resolve("5");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    getF() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/order/zhuEmpty6")
          .then(res => {
            if (res.data.code == 1) {
              this.updateHandler(Math.round(Math.random() * 10 + 70));
              resolve("6");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    getG() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/order/zhuEmpty7")
          .then(res => {
            if (res.data.code == 1) {
              this.updateHandler(Math.round(Math.random() * 10 + 80));
              resolve("7");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    getH() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/order/zhuEmpty8")
          .then(res => {
            if (res.data.code == 1) {
              this.updateHandler(100);

              setTimeout(() => {
                this.dialog = false;
                this.updateHandler(0);
              }, 1000);

              resolve("8");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    async getResult(promiseArr) {
      var res = [];
      for (let fun of promiseArr) {
        var resData = await fun();
        res.push(resData);
      }
      return await res;
    },

    clear() {
      // this.config.value = 10;
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dialog = true;
          // 同步调用函数
          this.getResult([
            this.getA,
            this.getB,
            this.getC,
            this.getD,
            this.getE,
            this.getF,
            this.getG,
            this.getH
          ])
            .then(res => {
              console.log(res); // 打印： ['A执行了', 'B执行了', 'C执行了']
              // this.config.value = 100;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    clear3() {
      console.log(Math.round(Math.random() * 10 + 10));
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
#initializeApp {
  .main {
    .initContent {
      background-color: #fff;
      border-radius: 5px;
      text-align: center;
      padding-bottom: 127px;
      img {
        width: 483px;
        height: 229px;
        margin-top: 187px;
      }
      .initText {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #fb7293;
        line-height: 55px;
      }
      .initBut {
      }
    }
  }
  .allFixed {
    // display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.8);
    .dv-loading {
      width: 100%;
      text-align: center;
      height: inherit;
      display: inherit;
      margin-top: 20%;
      margin-bottom: 50px;
      color: #fff;
    }
    .dv-percent-pond text {
      display: none !important;

      // font-size: 20px !important;
    }
  }
}
</style>
