<template>
  <div id="appIndex">
    <div class="main">
      <!-- <div class="appdiv">Hello World</div> -->
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
        </div>
        <div class="appSheet">
          <div class="mainContent">
            <el-row class="maincBtn mainMoveBtn"> </el-row>
            <index-table
              :tpList="tpList"
              :titleList="titleList"
              :footerNumList="footerNumList"
              :isFooter="isFooter"
              @listenChild="getMult"
              printTableName="software_order"
            ></index-table>
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 50, 100]"
                :page-size="pagesize"
                layout="sizes,prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
          <el-dialog
            title="设置"
            :visible.sync="wFormVisible"
            :close-on-click-modal="false"
            width="600px"
            @close="wCancel"
            class="view_change_title"
          >
            <el-checkbox-group
              v-model="checkedLists"
              @change="handleCheckedListChange"
            >
              <draggable animation="1000">
                <transition-group>
                  <el-checkbox
                    v-for="element in myArray"
                    :key="element.value"
                    :label="element.label"
                    border
                  >
                    <span> {{ element.label }}</span>
                  </el-checkbox>
                </transition-group>
              </draggable>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
              <el-button size="medium" @click="wCancel">取 消</el-button>
              <el-button size="medium" type="primary" @click="wInfo"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountUp from "@/components/CountUp";
import Word from "@/config/word";
import * as dd from "dingtalk-jsapi";
import draggable from "vuedraggable";
import IndexTable from "../components/indexTable.vue";

export default {
  name: "appIndex",
  components: { CountUp, draggable, IndexTable },
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
      formInline: {
        name: "",
        filler: "",
        status: "",
        startTime: "",
        endTime: "",
        theme: ""
      },
      approveStatus: 3,
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      allProjectList: []
    };
  },
  created() {
    this.$utils.checkding();
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.getTitleList();
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
    watchMore() {
      this.$router.push({
        path: "/appIndex8/appIndexWarn"
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
        path: url
      });
    },
    goapp(tname, tid) {
      const name = tname;
      const type = tid;
      if (name && type) {
        this.approveStatus = type;
        this.getList(1);
      }
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
        .then(res => {
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
        .catch(function(error) {
          console.log(error);
        });
    },
    checkList(row) {
      const _this = this;
      if (row.extend_first == 1) {
        _this.$axios
          .post("/projectfour/yujingEdit", {
            id: row.id
          })
          .then(res => {
            if (res.data.code == 1) {
              _this.getList();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    createType() {},
    createRole() {},
    getUseList() {
      this.$axios
        .post("/mobile/commonlyTypeList", { type: 1 })
        .then(res => {
          if (res.data.code == 1) {
            this.useTypeList = res.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: "1500"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAllList() {
      this.$axios
        .post("/mobile/commonlyTypeAllList", { type: 1 })
        .then(res => {
          if (res.data.code == 1) {
            this.allTypeList = res.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: "1500"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteNow(item) {
      if (this.isUse) {
        this.$axios
          .post("/mobile/commonlyTypeDel", { id: item.id })
          .then(res => {
            if (res.data.code == 1) {
              // this.useTypeList.splice(index, 1);
              this.getUseList();
              this.getAllList();
              this.$message({
                message: "删除成功",
                type: "success",
                duration: 1500
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
                duration: 1500
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$router.push({
          path: item.url
        });
      }
    },
    addNow(list) {
      if (this.isUse) {
        if (list.isselected == 0) {
          this.$axios
            .post("/mobile/commonlyTypeAdd", { cid: list.id })
            .then(res => {
              if (res.data.code == 1) {
                // this.useTypeList.push(list);
                this.getUseList();
                this.getAllList();
                this.$message({
                  message: "添加成功",
                  type: "success",
                  duration: 1500
                });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                  duration: 1500
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          let newID = list.id;
          let newArr = this.useTypeList.filter(item =>
            newID.includes(item.cid)
          );
          this.$axios
            .post("/mobile/commonlyTypeDel", { id: newArr[0].id })
            .then(res => {
              if (res.data.code == 1) {
                this.getUseList();
                this.getAllList();
                this.$message({
                  message: "删除成功",
                  type: "warning",
                  duration: 1500
                });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                  duration: 1500
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      } else {
        this.$router.push({
          path: list.url
        });
      }
    },
    getMult(val) {
      this.multSelectData = val;
    },
    handleCheckedListChange(value) {
      this.myArray.forEach(element => {
        if (value.includes(element.label)) {
          element.check = true;
        } else {
          element.check = false;
        }
      });
    },
    wCancel() {
      this.wFormVisible = false;
      let Ids = this.titleList.map(item => item.value);
      this.myArray.forEach(item => {
        if (!Ids.includes(item.value)) {
          item.check = false;
        } else {
          item.check = true;
        }
      });
    },
    wInfo() {
      let newT = [];
      this.myArray.forEach(element => {
        if (element.check) {
          newT.push(element);
        }
      });

      if (newT.length > 0) {
        this.$nextTick(() => {
          this.titleList = JSON.parse(JSON.stringify(newT));
          this.sendTitleList();
          if (this.isFooter == 1) {
            let newFArr = [];
            this.titleList.map(item => {
              this.newFooter.forEach(element => {
                if (element.value == item.value) {
                  newFArr.push(element);
                }
              });
            });
            this.footerNumList = JSON.parse(JSON.stringify(newFArr));
          }
          this.wFormVisible = false;
        });
      } else {
        this.$message({
          type: "warning",
          message: "不能为空！",
          duration: 1500
        });
      }
    },
    viewShow() {
      this.getTitleList();
      this.wFormVisible = true;
    },
    getTitleList() {
      this.titleList = [];
    },
    sendTitleList() {
      this.$axios
        .post("/spread/editFiledCurrency", {
          name: "software_order",
          mould_data: JSON.stringify(this.myArray)
        })
        .then(res => {
          if (res.data.code !== 1) {
            this.$message({
              title: "提示",
              message: res.data.msg,
              type: "error",
              duration: 1500
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    //发起审批
    newAdd() {
      const _this = this;
      _this.$axios
        .post("/project/softwareOrder")
        .then(res => {
          if (res.data.code === 1) {
            let newUrl =
              "https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=" +
              _this.$store.state.cid +
              "#/custom/?processCode=" +
              res.data.data;
            dd.ready(function() {
              dd.biz.util.openLink({
                url: newUrl, //要打开链接的地址
                onSuccess: function() {
                  /**/
                },
                onFail: function() {}
              });
            });
          } else {
            _this.$notify({
              title: "提示",
              message: res.data.msg,
              type: "error",
              duration: 1500
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    resetClick() {
      this.formInline = {
        name: "",
        filler: "",
        status: "",
        startTime: "",
        endTime: "",
        theme: ""
      };
      this.getList();
    },
    updateList() {
      this.getList(1);
    },
    //获取列表
    getList(ntype) {
      this.$axios
        .post("/mobile/dingApprovalList", {
          page: this.currentPage,
          number: this.pagesize,
          type: this.approveStatus
        })
        .then(res => {
          if (res.data.code == 1) {
            if (ntype == 1) {
              this.$message({
                message: "列表刷新成功",
                type: "success",
                duration: 1500
              });
            }
            const data = res.data.data;
            this.total = res.data.count;
            this.tpList = data;
            this.footerNumList = [];
            this.isFooter = 0;
            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.page_number;
              this.getList();
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteExport(url) {
      const _this = this;
      _this.$axios
        .post("/project/fileDownloadDel", { path: url })
        .then(res => {
          if (res.data.code === 1) {
            return true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post("/project/softwareOrderload", {
            id: _this.multSelectData
          })
          .then(res => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.data.url, //要下载的文件的url
                name: res.data.data.name, //定义下载文件名字
                onProgress: function() {
                  // 文件下载进度回调
                },
                onSuccess: function() {
                  _this.deleteExport(res.data.data.path);
                },
                onFail: function() {
                  _this.deleteExport(res.data.data.path);
                }
              });
            } else {
              _this.$message({
                message: res.data.msg,
                type: "warning",
                duration: 1500
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        _this.$message({
          message: "请先勾选要导出的数据！",
          type: "warning",
          duration: 1500
        });
      }
    }
  },
  mounted() {
    this.allProjectList = JSON.parse(this.$store.state.allPro);

    if (this.$store.state.userInfo.uid) {
      this.$utils.checkding();
      this.getUseList();
      this.getAllList();
      this.getNum();
      this.getList();
      this.createType();
      this.createRole();
    }
  },

  computed: {
    userData() {
      return this.$store.state.userInfo;
    }
  },
  watch: {
    userData: {
      handler(newVal) {
        if (newVal.uid) {
          this.$utils.checkding();
          this.getUseList();
          this.getAllList();
          this.getNum();
          this.createType();
          this.createRole();
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.hello {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  .left {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 10px;
    width: 73%;
    height: 257px;
    padding: 16px;
    justify-content: space-around;
    .text {
      width: 35%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .hello-title {
        font-size: 33px;
        font-weight: bold;
        color: #353b45;
      }
      .hello-desc {
        font-size: 20px;
        font-weight: 400;
        color: #7e8796;
      }
    }
    .img {
      width: 70%;
      display: flex;
      align-items: center;
      img {
        width: 100%;
      }
    }
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    width: 35%;
    margin-left: 20px;
    .item-bottom {
      margin-bottom: 17px;
    }
    .item:hover {
      cursor: pointer;
      box-shadow: 1px 10px 23px #dbdbdb;
    }
    .item {
      background: #ffffff;
      border-radius: 10px;
      width: 48%;
      height: 120px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .text {
        .title {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
        .num {
          font-size: 30px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #41475c;
        }
      }
      .img {
        width: 45px;
        height: 47px;
        img {
          width: 100%;
          height: 100%;
        }
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
.appSheet {
  .maincBtn {
    justify-content: flex-end;
    display: none !important;
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
    .img {
      margin-top: 19px;
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
    margin-left: 240px;
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
