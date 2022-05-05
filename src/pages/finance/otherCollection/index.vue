/* * @Author: NorthWind * @Date: 2020-12-17 11:41:45 * @Last Modified by:
NorthWind * @Last Modified time: 2022-01-13 14:19:53 */
<template>
  <div id="otherCollection">
    <!-- 其他收款列表 -->
    <div class="main">
      <!-- 搜索条件 -->
      <commonSearch
        :formcommonList="formcommonList"
        :formInline="formInline"
        @searchClick="searchClick"
        @getList="getList"
        :isShen="true"
      ></commonSearch>
      <div class="mainContent">
        <el-row class="maincBtn mainMoveBtn">
          <div class="mmbLeft">
            <el-button type="primary" size="medium" @click="newAdd"
              >新建</el-button
            >
          </div>
          <div class="mmbRight">
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-delete"
              @click="deleteList"
              >删除</el-button
            >
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-download"
              @click="exportList"
              >导出</el-button
            >
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-refresh"
              @click="updateList"
              >刷新</el-button
            >
            <el-button
              v-if="$store.state.userInfo.admin == 1"
              type="primary"
              plain
              size="medium"
              icon="el-icon-setting"
              @click="viewShow"
              >设置显示字段</el-button
            >
          </div>
          <!-- <div class="mmbLeft">
                        <el-button
                            type="primary"
                            plain
                            size="medium"
                            round
                            @click="deleteList"
                            >删除</el-button
                        >
                        <el-button
                            type="primary"
                            plain
                            size="medium"
                            round
                            @click="exportList"
                            >导出</el-button
                        >
                        <el-button
                            type="primary"
                            plain
                            size="medium"
                            round
                            @click="updateList"
                            >刷新</el-button
                        >
                    </div>
                    <div
                        class="mmbRight"
                        v-if="$store.state.userInfo.admin == 1"
                    >
                        <i class="el-icon-s-tools"></i>
                        <el-button type="text" @click="viewShow"
                            >设置显示字段</el-button
                        >
                    </div> -->
        </el-row>
        <!-- :isdele6="true" -->
        <commonTable
          :tableloading="tableloading"
          :tpList="tpList"
          :titleList="titleList"
          :footerNumList="footerNumList"
          :isFooter="isFooter"
          @listenChild="getMult"
          @creation="creation"
          @getlist="getList"
          :isdele6="true"
          types="zhukuai_othercollection"
          printTableName="zhukuai_othercollection"
        ></commonTable>
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
        <draggable animation="1000" v-model="myArray">
          <transition-group>
            <el-checkbox
              v-for="element in myArray"
              :key="element.value"
              :label="element.value"
              border
            >
              <span> {{ element.label }}</span>
            </el-checkbox>
          </transition-group>
        </draggable>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="wCancel">取 消</el-button>
        <el-button size="medium" type="primary" @click="wInfo">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="收款"
      :visible.sync="payVisible"
      :close-on-click-modal="false"
      width="600px"
      @close="payCancel"
      class="view_change_title"
    >
      <el-form
        @submit.native.prevent
        :model="payformInline"
        class="demo-form-inline"
        :rules="dingLogRules"
      >
        <div class="hlBottom">
          <el-form-item label="收款账户:" prop="accountname">
            <el-select
              v-model="payformInline.accountname"
              clearable
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in allaccList"
                :key="index"
                :value="item.accountname"
                :label="`${item.accountname}/${item.accountnumber}/${item.bankofdeposit}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="payCancel">取 消</el-button>
        <el-button
          size="medium"
          type="primary"
          :loading="loaded"
          @click="payInfo"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import draggable from "vuedraggable";
import commonTable from "@/components/commonTablenew.vue";
import commonSearch from "@/components/commonSearch.vue";

export default {
  name: "otherCollection",
  components: { draggable, commonTable, commonSearch },
  data() {
    return {
      payVisible: false,
      payformInline: {
        accountname: "",
        newaccountname: "",
      },
      newitemdata: "",
      allaccList: [],
      //搜索条件
      formcommonList: [
        {
          labelName: "收款名称",
          labelData: "skname",
        },
        {
          labelName: "收款人",
          labelData: "payee",
        },

        {
          labelName: "开始时间",
          labelData: "startTime",
        },
        {
          labelName: "结束时间",
          labelData: "endTime",
        },

        {
          labelName: "项目名称",
          labelData: "project_name",
        },
        // {
        //   labelName: '申请人',
        //   labelData: 'name',
        // },
        {
          labelName: "审批状态",
          labelData: "status",
        },
        {
          labelName: "项目性质",
          labelData: "lian_ying",
        },
      ],
      tableloading: false,
      formInline: {
        name: "",
        project_name: "",
        skname: "",
        sknumber: "",
        status: "",
        startTime: "",
        endTime: "",
        payee: "",
        departmentname: "",
        filledby: "",
        send_name: "",
        send_userid: "",
        lian_ying: "",
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      allProjectList: [],
    };
  },
  methods: {
    getallaccList() {
      this.$axios
        .post("/finance/accountnewslist", {
          current_page: 1,
          num: 9999,
          zstatus: 7,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.allaccList = res.data.content.list;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 待付款
    creation(val) {
      console.log(val);
      this.newitemdata = val;
      if (val.collectiontype == "2") {
        this.$confirm("此操作将永久撤销付款, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios
              .post("/newtao/payOperation", {
                account: "",
                id: val.id,
                pay_status: "1",
                biao_name: "zhukuai_othercollection",
              })
              .then((res) => {
                if (res.data.code == 1) {
                  this.getList();
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
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      } else {
        this.payVisible = true;
      }
    },
    payCancel() {
      this.payVisible = false;
    },
    payInfo() {
      if (!this.payformInline.accountname) {
        return this.$message({
          title: "提示",
          message: "请选择账户",
          type: "error",
          duration: 1500,
        });
      }
      this.$axios
        .post("/newtao/payOperation", {
          pay_status: "2",
          id: this.newitemdata.id,
          account: this.payformInline.accountname,
          biao_name: "zhukuai_othercollection",
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.payVisible = false;
            this.payformInline.accountname = "";
            this.getList();
            this.$message({
              message: res.data.msg,
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
    },
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
    resetClick() {
      this.formInline = {
        name: "",
        project_name: "",
        skname: "",
        sknumber: "",
        status: "",
        startTime: "",
        endTime: "",
        payee: "",
        departmentname: "",
        filledby: "",
        send_name: "",
        send_userid: "",
        lian_ying: "",
      };
      this.getList();
    },
    getMult(val) {
      this.multSelectData = val;
    },
    handleCheckedListChange(value) {
      this.myArray.forEach((element) => {
        if (value.includes(element.value)) {
          element.check = true;
        } else {
          element.check = false;
        }
      });
    },
    wCancel() {
      this.wFormVisible = false;
      let Ids = this.titleList.map((item) => item.value);
      this.myArray.forEach((item) => {
        if (!Ids.includes(item.value)) {
          item.check = false;
        } else {
          item.check = true;
        }
      });
    },
    wInfo() {
      let newT = [];
      this.myArray.forEach((element) => {
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
            this.titleList.map((item) => {
              this.newFooter.forEach((element) => {
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
          duration: 1500,
        });
      }
    },
    viewShow() {
      this.getTitleList();
      this.wFormVisible = true;
    },
    getTitleList() {
      this.$axios
        .post("/spread/showFiledCurrencyList", {
          name: "zhukuai_othercollection",
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.myArray = res.data.data;
            this.titleList = [];
            this.checkedLists = [];
            this.myArray.forEach((element) => {
              if (element.check) {
                this.titleList.push(element);
                this.checkedLists.push(element.value);
              }
            });
            this.getList();
          } else {
            this.$message({
              title: "提示",
              message: res.data.msg,
              type: "error",
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    sendTitleList() {
      this.$axios
        .post("/spread/editFiledCurrency", {
          name: "zhukuai_othercollection",
          mould_data: JSON.stringify(this.myArray),
        })
        .then((res) => {
          if (res.data.code == 1) {
            console.log("123");
          } else {
            this.$message({
              title: "提示",
              message: res.data.msg,
              type: "error",
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
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
        .post("/finance/othersk")
        .then((res) => {
          if (res.data.code == 1) {
            let newUrl =
              "https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=" +
              _this.$store.state.cid +
              "#/custom/?processCode=" +
              res.data.content.process_code;
            dd.ready(function () {
              dd.biz.util.openLink({
                url: newUrl, //要打开链接的地址
                onSuccess: function () {
                  /**/
                },
                onFail: function () {},
              });
            });
          } else {
            _this.$notify({
              title: "提示",
              message: res.data.msg,
              type: "error",
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    updateList() {
      this.getList(1);
    },
    //获取列表
    getList(ntype) {
      this.tableloading = true;
      this.$axios
        .post("/finance/qtsklist", {
          current_page: this.currentPage,
          project_name: this.formInline.project_name,
          payee: this.formInline.payee,
          sknumber: this.formInline.sknumber,
          status: this.formInline.status,
          zgskamount: "",
          zdskamount: "",
          starttime: this.formInline.startTime,
          stoptime: this.formInline.endTime,
          num: this.pagesize,
          skname: this.formInline.skname,
          name: this.formInline.name,
          send_name: this.formInline.send_name,
          send_userid: this.formInline.send_userid,
          lian_ying: this.formInline.lian_ying,
        })
        .then((res) => {
          if (res.data.code == 1) {
            if (ntype == 1) {
              this.$message({
                message: "列表刷新成功",
                type: "success",
                duration: 1500,
              });
            }
            this.total = res.data.content.total;
            this.tpList = res.data.content.list;
            this.footerNumList = [];
            this.isFooter = res.data.mould_data.is_heji;
            if (this.isFooter == 1) {
              this.newFooter = res.data.mould_data.mould_data;
              this.titleList.map((item) => {
                this.newFooter.forEach((element) => {
                  if (element.value == item.value) {
                    this.footerNumList.push(element);
                  }
                });
              });
            }
            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.content.page;
              this.getList();
            }
            this.tableloading = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //筛选
    handleSelectionChange(val) {
      this.multSelectData = val.map((item) => {
        if (!item.id) return "";
        return item.id;
      });
    },
    //删除列表
    deleteList() {
      if (this.multSelectData.length > 0) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios
              .post("/finance/qtskdel", {
                id: this.multSelectData,
              })
              .then((res) => {
                if (res.data.code == 1) {
                  this.getList();
                  this.$message({
                    message: res.data.msg,
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
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          message: "请先勾选要删除的数据！",
          type: "warning",
          duration: 1500,
        });
      }
    },
    //还原列表
    backList() {
      this.$axios
        .post("/finance/reduction", { type: 2 })
        .then((res) => {
          if (res.data.code == 1) {
            this.getList();
            this.$message({
              message: "已还原",
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
    },
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post("/finance/qtsk_export", { id: _this.multSelectData })
          .then((res) => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.content.path, //要下载的文件的url
                name: res.data.content.filename, //定义下载文件名字
                onProgress: function () {
                  // 文件下载进度回调
                },
                onSuccess: function () {},
                onFail: function () {},
              });
            } else {
              _this.$message({
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
        _this.$message({
          message: "请先勾选要导出的数据！",
          type: "warning",
          duration: 1500,
        });
      }
    },
  },
  mounted() {
    this.$utils.checkding();
    this.getTitleList();
    this.allProjectList = JSON.parse(this.$store.state.allPro);
  },
  created() {
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.getallaccList();
  },
  computed: {
    pickerStart() {
      return {
        disabledDate: (time) => {
          let endDateVal = this.formInline.endTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      };
    },
    pickerEnd() {
      return {
        disabledDate: (time) => {
          let beginDateVal = this.formInline.startTime;
          if (beginDateVal) {
            return (
              // time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          }
        },
      };
    },
  },
};
</script>
