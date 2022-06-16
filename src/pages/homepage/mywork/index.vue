<template>
  <div id="appIndex">
    <div class="main">
      <div class="appMain">
        <div class="appML">
          <div class="hello">
            <div class="left">
              <div class="text">
                <div class="hello-title">
                  Hello,{{ $store.state.userInfo.uname }}
                </div>
                <div class="hello-desc">{{ randWord }}</div>
              </div>
              <div class="img">
                <img src="@/assets/images/home-hello.png" />
              </div>
            </div>
            <div class="right">
              <div
                class="item item-bottom item-left"
                @click="goapp('待我审批', 1)"
              >
                <div class="text">
                  <div class="title">待我审批</div>
                  <div class="num">
                    <CountUp :value="udata.dai" />
                  </div>
                </div>
                <div class="img">
                  <img src="@/assets/images/home-left1.png" />
                </div>
              </div>
              <div
                class="item item-bottom item-left"
                @click="goapp('我已审批', 2)"
              >
                <div class="text">
                  <div class="title">我已审批</div>
                  <div class="num">
                    <CountUp :value="udata.yi" />
                  </div>
                </div>
                <div class="img">
                  <img src="@/assets/images/home-left2.png" />
                </div>
              </div>
              <div class="item item-left" @click="goapp('我发起的', 3)">
                <div class="text">
                  <div class="title">我发起的</div>
                  <div class="num">
                    <CountUp :value="udata.fa" />
                  </div>
                </div>
                <div class="img">
                  <img src="@/assets/images/home-left3.png" />
                </div>
              </div>
              <div class="item item-left" @click="goapp('抄送我的', 4)">
                <div class="text">
                  <div class="title">抄送我的</div>
                  <div class="num">
                    <CountUp :value="udata.chao" />
                  </div>
                </div>
                <div class="img">
                  <img src="@/assets/images/home-left4.png" />
                </div>
              </div>
            </div>
          </div>
          <div class="bottomTable">
            <div class="appIndexMain">
              <div class="leftMain app-left-main">
                <div class="lmt" style="margin-bottom: 20px; line-height: 40px">
                  <div class="title">
                    <div class="span"></div>
                    <div class="text">常用应用</div>
                  </div>
                  <div>
                    <i
                      style="vertical-align: middle"
                      class="el-icon-edit-outline"
                    ></i>
                    <el-button type="text" @click="openEdit">编辑</el-button>
                  </div>
                </div>
                <div class="apps">
                  <div
                    class="item"
                    v-for="(item, index) in useTypeList"
                    :key="index"
                    @click="goNow(item.url)"
                  >
                    <div class="img">
                      <img :src="item.imgsrc" alt="" />
                    </div>
                    <div class="label">{{ item.name }}</div>
                  </div>
                  <div class="item" @click="watchNow">
                    <div class="img">
                      <img
                        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/wGRkGa2SWw1615433897713.png"
                        alt=""
                      />
                    </div>
                    <div class="label" style="color: #409eff">查看更多应用</div>
                  </div>
                </div>
              </div>
              <div class="rightMain app-right-main">
                <div>
                  <div class="lmt" style="line-height: 40px">
                    <div class="title">
                      <div class="span"></div>
                      <div class="text">最近预警信息</div>
                    </div>
                    <el-button type="text" @click="watchMore"
                      >查看更多>></el-button
                    >
                  </div>
                  <el-table
                    :border="true"
                    :data="tableData"
                    :header-cell-style="tableHeaderClass"
                    :cell-style="tableRowClass"
                    @row-click="checkList"
                    max-height="300"
                  >
                    <template slot="empty">
                      <div class="liu-empty">
                        <img src="@/assets/images/empty.png" />
                        <div class="text">暂时还没有数据哦~</div>
                      </div>
                    </template>
                    <el-table-column
                      prop="content"
                      label="预警内容"
                      :show-overflow-tooltip="true"
                      align="left"
                    >
                    </el-table-column>
                    <el-table-column
                      label="时间"
                      prop="created"
                      :show-overflow-tooltip="true"
                      align="left"
                    >
                    </el-table-column>
                    <el-table-column
                      label="状态"
                      width="60"
                      align="left"
                      :show-overflow-tooltip="true"
                    >
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.extend_first == 2"
                          style="color: #17c298"
                          >已读</span
                        >
                        <span v-else style="color: #f16d6d">未读</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="appMr">
                    <div class="textTitle">
                        <i class="el-icon-bell"></i>通知
                    </div>
                    <div class="text"><p>通知</p></div>
                    <el-button type="text">查看更多>></el-button>
                </div> -->
      </div>
    </div>
    <el-dialog
      title="编辑常用应用"
      :visible.sync="dialogVisible"
      @close="closeD"
      width="1100px"
      :close-on-click-modal="false"
    >
      <div class="allmoreType">
        <div class="leftMain app-left-main-dialog">
          <div class="lmt">
            <div style="line-height: 40px; color: #666666">常用应用</div>
            <!-- <el-button v-if="isUse" type="text" @click="editWatch"
                            >查看</el-button
                        >
                        <el-button v-else type="text" @click="startEdit"
                            >编辑</el-button
                        > -->
          </div>
          <div class="apps" style="padding: 0px">
            <div v-for="(item, index) in useTypeList" :key="index">
              <div class="useIcon" @click="deleteNow(item, index)">
                <i class="el-icon-remove"></i>
              </div>
              <div
                :class="
                  isUse == true
                    ? 'item dislog-item useClass'
                    : 'item dislog-item noUse'
                "
                @click="deleteNow(item, index)"
                style="margin: 10px 7px; margin-top: -10px"
              >
                <div class="img" style="margin-top: 0px !important">
                  <img :src="item.imgsrc" alt="" />
                </div>
                <div class="label" style="height: 68px; line-height: 68px">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div v-for="(item, index) in allTypeList" :key="index">
              <div style="line-height: 40px; color: #666666">
                {{ item.name }}
              </div>
              <div class="apps" style="padding: 0px">
                <div v-for="(list, lindex) in item.children" :key="lindex">
                  <div class="useIcon" @click="addNow(list, lindex)">
                    <i class="el-icon-circle-plus"></i>
                  </div>
                  <div
                    :class="
                      isUse == true && list.isselected == 1
                        ? 'item dislog-item useClass'
                        : 'item dislog-item noUse'
                    "
                    @click="addNow(list, lindex)"
                    style="margin: 10px 7px; margin-top: -10px"
                  >
                    <div class="img" style="margin-top: 0px !important">
                      <img :src="list.imgsrc" alt="" />
                    </div>
                    <div class="label" style="height: 68px; line-height: 68px">
                      {{ list.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CountUp from "@/components/CountUp";
import Word from "@/config/word";

export default {
  name: "appIndex",
  components: { CountUp },
  data() {
    const word = Word;
    return {
      tableData: [],
      udata: { dai: 0, yi: 0, fa: 0, chao: 0 },
      useTypeList: [],
      allTypeList: [],
      dialogVisible: false,
      isUse: false,
      msgList: [{ createdtime: "", parere: "" }],
      word: word,
      randNumber: Math.ceil(Math.random() * 6),
      randWord: "",
    };
  },
  created() {
    const data = new Date();
    switch (data.getDay()) {
      case 0:
        this.randWord = `今天星期日，${this.word[this.randNumber]}`;
        break;
      case 1:
        this.randWord = `今天星期一，${this.word[this.randNumber]}`;
        break;
      case 2:
        this.randWord = `今天星期二，${this.word[this.randNumber]}`;
        break;
      case 3:
        this.randWord = `今天星期三，${this.word[this.randNumber]}`;
        break;
      case 4:
        this.randWord = `今天星期四，${this.word[this.randNumber]}`;
        break;
      case 5:
        this.randWord = `今天星期五，${this.word[this.randNumber]}`;
        break;
      case 6:
        this.randWord = `今天星期六，${this.word[this.randNumber]}`;
        break;

      default:
        break;
    }
  },
  methods: {
    getMsgList() {
      this.$axios
        .post("/finance/tonotice")
        .then((res) => {
          if (res.data.code == 1) {
            if (res.data.content.length > 0) {
              this.msgList = res.data.content;
            } else {
              this.msgList = [];
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    watchMore() {
      this.$router.push({
        path: "/appIndex8/appIndexWarn",
      });
    },
    closeD() {
      this.isUse = false;
      this.dialogVisible = false;
    },
    editWatch() {
      this.isUse = false;
    },
    watchNow() {
      this.dialogVisible = true;
      this.isUse = false;
    },
    startEdit() {
      this.isUse = true;
    },
    openEdit() {
      this.isUse = true;
      this.getUseList();
      this.getAllList();
      this.dialogVisible = true;
    },
    goNow(url) {
      this.$router.push({
        path: url,
      });
    },
    goapp(tname, tid) {
      this.$router.push({
        path: "/appIndex8/appIndex2",
        query: { id: tid, name: tname },
      });
    },
    tableHeaderClass() {
      return "font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px";
    },
    tableRowClass() {
      return "color:#5f5f5f;border-color:#F1F8FF;";
    },
    getNum() {
      this.$axios
        .post("/mobile/dingApprovalCount")
        .then((res) => {
          if (res.data.code == 1) {
            if (res.data.data.wait_count > 99) {
              this.udata.dai = res.data.data.wait_count;
            } else {
              this.udata.dai = res.data.data.wait_count;
            }
            if (res.data.data.cc_count > 99) {
              this.udata.chao = res.data.data.cc_count;
            } else {
              this.udata.chao = res.data.data.cc_count;
            }
            this.udata.yi = res.data.data.sp_count;
            this.udata.fa = res.data.data.my_count;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getList() {
      this.$axios
        .post("/projectfour/yujingList", {
          page: 1,
          number: 10,
          type: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.tableData = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    checkList(row) {
      const _this = this;
      if (row.extend_first == 1) {
        _this.$axios
          .post("/projectfour/yujingEdit", {
            id: row.id,
          })
          .then((res) => {
            if (res.data.code == 1) {
              _this.getList();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    createType() {
      this.$axios
        .post("/project/supplierTypeCreate")
        .then((res) => {
          if (res.data.code != 1) {
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: "1500",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    createRole() {
      this.$axios
        .post("/erp_user/createRoles")
        .then((res) => {
          if (res.data.code != 1) {
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: "1500",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getUseList() {
      this.$axios
        .post("/erp_check/changyongphoneroles", { type: 1 })
        .then((res) => {
          if (res.data.code == 1) {
            this.useTypeList = res.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: "1500",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getAllList() {
      this.$axios
        .post("/erp_check/phoneroles", { type: 1 })
        .then((res) => {
          if (res.data.code == 1) {
            this.allTypeList = res.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: "1500",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteNow(item) {
      if (this.isUse) {
        this.$axios
          .post("/mobile/commonlyTypeDel", { id: item.id })
          .then((res) => {
            if (res.data.code == 1) {
              // this.useTypeList.splice(index, 1);
              this.getUseList();
              this.getAllList();
              this.$message({
                message: "删除成功",
                type: "success",
                duration: 1500,
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
                duration: 1500,
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.$router.push({
          path: item.url,
        });
      }
    },
    addNow(list) {
      if (this.isUse) {
          
        if (list.isselected == 0) {
          this.$axios
            .post("/mobile/commonlyTypeAdd", { cid: list.id })
            .then((res) => {
              if (res.data.code == 1) {
                // this.useTypeList.push(list);
                this.getUseList();
                this.getAllList();
                this.$message({
                  message: "添加成功",
                  type: "success",
                  duration: 1500,
                });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                  duration: 1500,
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          let newID = list.id;
          let newArr = this.useTypeList.filter((item) =>
            newID.includes(item.cid)
          );
          this.$axios
            .post("/mobile/commonlyTypeDel", { id: newArr[0].id })
            .then((res) => {
              if (res.data.code == 1) {
                // this.useTypeList.splice(
                //     this.useTypeList.indexOf(newArr),
                //     1
                // );
                this.getUseList();
                this.getAllList();
                this.$message({
                  message: "删除成功",
                  type: "warning",
                  duration: 1500,
                });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                  duration: 1500,
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      } else {
        this.$router.push({
          path: list.url,
        });
      }
    },
  },
  mounted() {
    if (this.$store.state.userInfo.uid) {
      this.$utils.checkding();
      this.getUseList();
      this.getAllList();
      this.getNum();
      this.getList();
      this.createType();
      this.createRole();
      this.getMsgList();
    }
  },
  computed: {
    userData() {
      return this.$store.state.userInfo;
    },
  },
  watch: {
    userData: {
      handler(newVal) {
        if (newVal.uid) {
          this.$utils.checkding();
          this.getUseList();
          this.getAllList();
          this.getNum();
          this.getList();
          this.createType();
          this.createRole();
          this.getMsgList();
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.hello {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1600px;
  .left {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    background: #ffffff;
    border-radius: 10px;
    width: 985px;
    height: 257px;
    .text {
      margin-left: 72px;
      .hello-title {
        margin-top: 58px;
        font-size: 33px;
        font-weight: bold;
        color: #353b45;
        min-width: 215px;
      }
      .hello-desc {
        margin-top: 40px;
        font-size: 20px;
        font-weight: 400;
        color: #7e8796;
        max-width: 310px;
      }
    }
    .img {
      // margin-left: 90px;
      margin-top: 26px;
      width: 542px;
      height: 209px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    // flex-direction: row;
    flex-wrap: wrap;
    width: 610px;
    .item-bottom {
      margin-bottom: 17px;
    }
    .item-left {
      margin-left: 25px;
    }
    .item:hover {
      cursor: pointer;
      box-shadow: 1px 10px 23px #dbdbdb;
    }
    .item {
      background: #ffffff;
      border-radius: 10px;
      width: 280px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .text {
        margin-left: 40px;
        .title {
          margin-top: 18px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
        .num {
          margin-top: 29px;
          font-size: 30px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #41475c;
        }
      }
      .img {
        margin-top: 47px;
        margin-right: 40px;
        width: 45px;
        height: 47px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  @media screen and (max-width: 1870px) {
    .right {
      width: 580px;
      .item {
        width: 250px;
      }
    }
  }
  @media screen and (max-width: 1820px) and (min-width: 1771px) {
    .right {
      width: 500px;
      .item {
        width: 225px;
      }
    }
  }
  @media screen and (max-width: 1770px) and (min-width: 1301px) {
    .right {
      min-width: 985px;
      .item {
        width: 225px;
      }
      .item:nth-child(1) {
        margin-left: 0px;
      }
    }
  }
  @media screen and (max-width: 1300px) {
    .right {
      width: 500px;
      .item {
        width: 225px;
      }
    }
  }
}

.app-left-main {
  padding: 0px !important;
  width: 1189px !important;
  height: 510px !important;
  overflow: auto;
  .lmt {
    margin: 10px !important;
  }
  .title {
    margin-top: 15px;
    .span {
      width: 3px;
      height: 16px;
      background: #3296fa;
      color: #3296fa;
      margin-right: 4px;
      display: inline-block;
    }
    .text {
      line-height: 16px;
    }
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #000000;
    line-height: 55px;
    display: flex;
    flex-direction: row;
  }
}
.app-left-main::-webkit-scrollbar {
  display: none;
}

.app-left-main-dialog {
  height: 510px !important;
  overflow: auto;
}
.app-left-main-dialog::-webkit-scrollbar {
  display: none;
}

.app-right-main {
  width: 385px !important;
  height: 510px !important;
  max-height: 510px !important;
  margin-left: 20px;
  .title {
    margin-top: 15px;
    .span {
      content: " ";
      width: 3px;
      height: 16px;
      background: #3296fa;
      color: #3296fa;
      margin-right: 4px;
      display: inline-block;
    }
    .text {
      line-height: 16px;
    }
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #000000;
    line-height: 55px;
    display: flex;
    flex-direction: row;
  }
}

.apps {
  padding-top: 10px;
  padding-left: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .dislog-item {
    background: #ffffff !important;
    border: 1px solid #e8e8e8 !important;
    border-radius: 5px !important;
    height: 68px !important;
    line-height: 68px !important;
    .img {
      margin-top: 14px !important;
      width: 40px !important;
      height: 40px !important;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .item {
    margin: 0px 20px;
    margin-bottom: 20px;
    width: 242px;
    height: 90px;
    background: #f8f8fb;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .img {
    //   margin-top: 19px;
      margin-left: 30px;
      width: 52px;
      height: 52px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .label {
      line-height: 90px;
      height: 90px;
      margin-left: 20px;
    }
  }
  .item:hover {
    cursor: pointer;
    box-shadow: 1px 0px 23px #dfdfde;
  }
  .useIcon {
    position: relative;
    margin-top: -10px;
    margin-left: 220px;
    i {
      font-size: 20px;
      color: #b9bdc1 !important;
    }
  }
  @media screen and (max-width: 1770px) {
    .item {
      width: 220px;
    }
  }
  @media screen and (max-width: 1770px) {
    .item {
      width: 220px;
    }
  }
}

.liu-empty {
  img {
    margin-top: 90px;
    height: 97px;
    width: 123px;
  }
  .text {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #999999;
    line-height: 30px !important;
  }
}
.el-table::before {
  height: 0px;
}
</style>
