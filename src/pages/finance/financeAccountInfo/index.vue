/* * @Author: NorthWind * @Date: 2020-12-15 14:17:29 * @Last Modified by:
NorthWind * @Last Modified time: 2022-01-13 14:17:20 */
<template>
  <div id="financeAccountInfo">
    <!-- 账户信息列表 -->
    <div class="main">
      <div class="header">
        <div class="headerContent">
          <el-form
            @submit.native.prevent
            :inline="true"
            :model="formInline"
            label-width="120px"
            class="demo-form-inline"
          >
            <div class="hlBottom">
              <el-form-item label="账户名称:">
                <!-- <el-input
                                    v-model="formInline.accountname"
                                    clearable
                                    placeholder="请输入账户名称"
                                ></el-input> -->
                <el-select
                  v-model="formInline.accountid"
                  @change="accChange"
                  clearable
                  filterable
                  placeholder="请选择账户"
                >
                  <el-option
                    v-for="(item, index) in accountList"
                    :key="index"
                    :label="item.accountname"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="searchTime" label="开始时间:">
                <el-date-picker
                  v-model="formInline.startTime"
                  :picker-options="pickerStart"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item class="searchTime" label="结束时间:">
                <el-date-picker
                  v-model="formInline.endTime"
                  :picker-options="pickerEnd"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="账号:">
                <!-- <el-input
                                    v-model="formInline.accountnumber"
                                    clearable
                                    placeholder="请输入账号"
                                ></el-input> -->
                <el-select
                  v-model="formInline.accountnumber"
                  clearable
                  filterable
                  placeholder="请选择账号"
                >
                  <el-option
                    v-for="(item, index) in accountNumList"
                    :key="index"
                    :label="item.accountnumber"
                    :value="item.accountnumber"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="审批状态:">
                <el-select
                  v-model="formInline.status"
                  clearable
                  filterable
                  placeholder="请选择审批状态"
                >
                  <el-option
                    v-for="(item, index) in approvalStatus"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="申请人:">
                <el-input
                  @focus="addManyP1"
                  v-model="formInline.namesa"
                  clearable
                  placeholder="请输入"
                ></el-input>
              </el-form-item>

              <el-form-item label="项目性质:">
                <el-select
                  v-model="formInline.lian_ying"
                  clearable
                  filterable
                  placeholder="请选择项目性质"
                >
                  <el-option label="自营" value="1"></el-option>
                  <el-option label="联营" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
          <div style="text-align: center; background-color: #fff">
            <el-button
              type="primary"
              size="medium"
              @click="searchClick"
              style="margin-right: 10px"
              >搜索</el-button
            >
            <el-button plain size="medium" @click="resetClick">重置</el-button>
          </div>
        </div>
      </div>
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
        </el-row>
        <commonTable
          :tableloading="tableloading"
          :tpList="tpList"
          :titleList="titleList"
          :footerNumList="footerNumList"
          :isFooter="isFooter"
          @listenChild="getMult"
          printTableName="zhukuai_finance_accountnews"
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
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import draggable from "vuedraggable";
import commonTable from "@/components/commonTablenew.vue";
export default {
  name: "financeAccountInfo",
  components: { draggable, commonTable },
  data() {
    return {
      tableloading: false,
      formInline: {
        accountname: "",
        accountnumber: "",
        status: "",
        startTime: "",
        endTime: "",
        accountid: "",
        send_name: "",
        send_userid: "",
        namesa: "请选择申请人",
        lian_ying: "",
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      projectType: [],
      approvalStatus: [],
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      accountList: [],
      accountNumList: [],
    };
  },
  methods: {
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
    getAccNumber() {
      this.$axios
        .post("/task/accountlinkage", {
          id: this.formInline.accountid,
          type: 1,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.accountNumList = res.data.content;
            this.formInline.accountnumber =
              this.accountNumList[0].accountnumber;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getAccount() {
      this.$axios
        .post("/task/accountselect", {
          corp_id: this.$store.state.cid,
          type: 1,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.accountList = res.data.content;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    accChange(val) {
      if (val) {
        this.formInline.accountname = this.accountList.find(
          (item) => item.id == val
        ).accountname;
      } else {
        this.formInline.accountname = "";
      }
      this.getAccNumber();
    },
    resetClick() {
      this.formInline = {
        accountname: "",
        accountnumber: "",
        status: "",
        startTime: "",
        endTime: "",
        accountid: "",
        send_name: "",
        send_userid: "",
        namesa: "请选择申请人",
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
          name: "zhukuai_finance_accountnews",
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
    addManyP1() {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: that.$store.state.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: that.agentid, //微应用的Id
          permissionType: "GLOBAL", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartdeptId: 0, //仅支持0和-1
          onSuccess: function (result) {
            // let newPeople = [];
            // newPeople = result.users.map((item) => {
            //     if (!item.emplId) return '';
            //     return item.emplId;
            // }); send_name: '',
            console.log(result.users[0], "**---**--*-");
            // that.addRoleUser(result.users);
            that.formInline.send_name = result.users[0].name;
            that.formInline.namesa = result.users[0].name;
            that.formInline.send_userid = result.users[0].emplId;
          },
          onFail: function (err) {
            console.log(err);
          },
        });
      });
      dd.error(function (err) {
        console.log(err);
      });
    },
    sendTitleList() {
      this.$axios
        .post("/spread/editFiledCurrency", {
          name: "zhukuai_finance_accountnews",
          mould_data: JSON.stringify(this.myArray),
        })
        .then((res) => {
          if (res.data.code == 1) {
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
        .post("/finance/accountnews")
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
                onSuccess: function (result) {
                  /**/
                },
                onFail: function (err) {},
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
        .post("/finance/accountnewslist", {
          current_page: this.currentPage,
          starttime: this.formInline.startTime,
          stoptime: this.formInline.endTime,
          bankofdeposit: "",
          accountname: this.formInline.accountname,
          agent: "",
          accountnumber: this.formInline.accountnumber,
          zstatus: this.formInline.status,
          num: this.pagesize,
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
              .post("/finance/accountnewsdel", {
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
        .post("/finance/reduction", { type: 3 })
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
          .post("/finance/template_download", {
            id: _this.multSelectData,
          })
          .then((res) => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.content.path, //要下载的文件的url
                name: res.data.content.filename, //定义下载文件名字
                onProgress: function (msg) {
                  // 文件下载进度回调
                },
                onSuccess: function (result) {},
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
    createType() {
      this.$axios
        .post("/project/supplierTypeCreate")
        .then((res) => {
          if (res.data.code == 1) {
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
  },
  mounted() {
    this.createType();
    this.$utils.checkding();
    this.getTitleList();
    this.getAccount();
  },
  created() {
    this.projectType = JSON.parse(this.$store.state.pType);
    this.approvalStatus = this.$utils.utilApprovalStatus();
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
<style scoped>
.names {
  border: 1px solid #dcdfe6 !important;
  padding-left: 13px;
  border-radius: 5px;
  color: #c0c9db;
}
</style>
