<template>
  <div id="materialBasic">
    <div class="main">
      <div class="war_content_a">
        <div class="war_title">预警设置</div>
        <div class="war_content">
          <div class="waring_left">
            <div class="telelist">
              <div class="alltype1">全部分类</div>
              <div
                v-for="(item, index) in rTeleList"
                class="telelist_item1"
                :style="defdeinx == index ? 'color:#0089ff' : ''"
                @click="rightClick(item, index)"
              >
                <el-tooltip :content="item.name" placement="top">
                  <span> {{ item.j_nane }}</span>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="waring_right">
            <el-table
              :border="true"
              :data="tableData"
              style="width: 100%; border: 1px solid #ebeef5"
              :header-cell-style="tableHeaderClass"
              :cell-style="tableRowClass"
              size="mini"
              :row-class-name="tableRowClassName"
            >
              <el-table-column prop="name" label="预警名称" align="left">
              </el-table-column>
              <!-- <el-table-column
                                prop="biao_shi"
                                label="预警唯一标识"
                                align="left"
                            >
                            </el-table-column> -->
              <el-table-column prop="symbol" label="预警符号" align="left">
              </el-table-column>
              <el-table-column prop="bi_li" label="预警比例(%)" align="left">
              </el-table-column>
              <el-table-column prop="status_s" label="弱预警状态" align="left">
                <template slot-scope="scope">
                  <el-switch
                    disabled
                    v-model="scope.row.status_s"
                    @change="changeswitch(scope.row, 1)"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="qyj_status_s"
                label="强预警状态"
                align="left"
              >
                <template slot-scope="scope">
                  <!-- :disabled="scope.row.status_s == '1' ? false : true" -->

                  <el-switch
                    disabled
                    v-model="scope.row.qyj_status_s"
                    @change="changeswitch(scope.row, 2)"
                  ></el-switch>
                </template>
              </el-table-column>
              <!-- <el-table-column
                                align="left"
                                prop="address"
                                label="状态"
                            >
                                <template slot-scope="scope">
                                    <span style="color: #17c298">未到期</span>
                                    <span style="color: #f16d6d">已到期</span>
                                    <span style="color: #e8a54c">即将到期</span>
                                </template>
                            </el-table-column> -->
              <el-table-column label="操作" align="left">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editRow(scope.row)"
                    type="text"
                    size="small"
                  >
                    编辑
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 50, 100, 150, 200]"
                :page-size="pagesize"
                layout="sizes,prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="预警消息设置"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="600px"
      @close="editCancel('waringForm')"
      class="phDialog liuDialog"
    >
      <el-form
        @submit.native.prevent
        :model="waringForm"
        label-position="right"
        :rules="aufRules"
        ref="waringForm"
        label-width="126px"
        style="padding-right: 10px"
      >
        <div
          style="
            background: #f0f0f0;
            width: 105%;
            margin-left: -20px;
            height: 1px;
            margin-bottom: 20px;
          "
        ></div>
        <el-form-item label="预警名称:" prop="name" class="dRemarkList">
          <el-input
            readonly
            v-model="waringForm.name"
            placeholder="自动获取"
            size="small"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item
                    label="预警唯一标识:"
                    prop="biao_shi"
                    class="dRemarkList"
                >
                    <el-input
                        readonly
                        v-model="waringForm.biao_shi"
                        placeholder="自动获取"
                    ></el-input>
                </el-form-item> -->
        <el-form-item label="预警符号" prop="symbol" class="newform">
          <!-- <el-select
            v-model="waringForm.symbol"
            placeholder="请选择"
            size="small"
          >
            <el-option label="大于" value="大于"></el-option>
            <el-option label="等于" value="等于"></el-option>
            <el-option label="小于" value="小于"></el-option>
          </el-select> -->
          <el-input
            readonly
            placeholder="大于"
            size="small"
            disabled
          ></el-input>
          <!-- content="预警计算规则：等于：预警比例填写0；大于：对比值+对比值*预警比例；小于：对比值*预警比例" -->

          <el-tooltip
            content="预警计算规则：大于：对比值*预警比例"
            placement="top"
          >
            <i
              class="el-icon-question"
              style="font-size: 18px; margin-left: 5px"
            ></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="预警比例">
          <el-input-number
            v-model="waringForm.bi_li"
            controls-position="right"
            :min="0"
            :max="100"
            size="small"
          ></el-input-number>
          <span style="margin-left: 5px">%</span>
        </el-form-item>
        <el-form-item label="弱预警状态" prop="status">
          <el-switch
            v-model="waringForm.status_s"
            @change="change1"
          ></el-switch>
          <el-tooltip
            content="超出预警比例，将在工作通知中向预警接收人推送预警消息"
            placement="top"
          >
            <i
              class="el-icon-question"
              style="font-size: 18px; margin-left: 5px"
            ></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="强预警状态" prop="qyj_status">
          <el-switch
            v-model="waringForm.qyj_status_s"
            @change="change2"
          ></el-switch>
          <el-tooltip content="超出预警比例，无法发起审批单" placement="top">
            <i
              class="el-icon-question"
              style="font-size: 18px; margin-left: 5px"
            ></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="对比值">
          <el-input
            readonly
            type="textarea"
            placeholder="自动获取"
            v-model="waringForm.content"
            maxlength="300"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="预警接收人"
          prop="yj_person"
          v-if="types == '1' && waringForm.status_s"
        >
          <div class="addManeger" style="display: flex">
            <div class="addMList" v-if="cctagsData.length > 3">
              <div class="mdnList">
                <div class="mdren" @click="openAllPeople">
                  <span class="touxiang">
                    <i class="el-icon-s-custom"></i>
                  </span>
                </div>
                <p>查看全部</p>
              </div>
              <div class="mdnPlus">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div
              class="addMList"
              v-for="(item, index) in cctagsData.slice(0, 3)"
              :key="index"
            >
              <div class="mdnList">
                <div class="mdren">
                  <img v-if="item.avatar" :src="item.avatar" alt />
                  <span class="touxiang" v-else>{{
                    item.name.length <= 2
                      ? item.name
                      : item.name.substr(item.name.length - 2, 2)
                  }}</span>
                </div>
                <p>{{ item.name }}</p>
                <i class="el-icon-error" @click="handleClose(item, index)"></i>
              </div>
              <div class="mdnPlus">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="addMList addMListLast">
              <div class="mdnList">
                <div class="mdren" @click="addManyPnew(1)">
                  <span class="touxiang">
                    <i class="el-icon-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div
        style="
          background: #f0f0f0;
          width: 105%;
          margin-left: -20px;
          height: 1px;
          margin-bottom: 10px;
        "
      ></div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="editCancel('waringForm')"
          >取 消</el-button
        >
        <el-button
          size="medium"
          type="primary"
          :loading="loading"
          @click="editInfo('waringForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="全部人员"
      :append-to-body="true"
      :visible.sync="ccAllPeopleVisible"
      class="contractOpenPeopleDialog"
      :close-on-click-modal="false"
    >
      <div style="margin-bottom: 10px">共有{{ cctagsData.length }}人</div>
      <div class="showAllPeople">
        <div class="addMList" v-for="(item, index) in cctagsData" :key="index">
          <div class="mdnList">
            <div class="mdren">
              <img v-if="item.avatar" :src="item.avatar" alt />
              <span class="touxiang" v-else>{{
                item.name.length <= 2
                  ? item.name
                  : item.name.substr(item.name.length - 2, 2)
              }}</span>
            </div>
            <p>{{ item.name }}</p>
            <i class="el-icon-error" @click="handleClose(item, index)"></i>
          </div>
          <div class="mdnPlus">
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <div class="addMList addMListLast">
          <div class="mdnList">
            <div class="mdren" @click="addManyPnew(1)">
              <span class="touxiang">
                <i class="el-icon-plus"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";
import eupload from "../../../components/excelUpload.vue";
import { regionData, CodeToText } from "element-china-area-data";
// const echarts = require("echarts");
export default {
  name: "materialBasic",
  components: { eupload },
  data() {
    return {
      disabled1: 1,
      disabled2: 1,
      aufRules: {
        yj_person: [
          {
            required: true,
            message: "请选择",
            trigger: ["blur", "change"],
          },
        ],
        symbol: [
          {
            required: true,
            message: "请选择",
            trigger: ["blur", "change"],
          },
        ],
      },
      ccAllPeopleVisible: false,
      cctagsData: [],
      types: "1",
      value1: false,
      switch1: false,
      switch2: false,
      rIsshow: true,
      qIsshow: true,
      currentPage: 1,
      total: 0,
      pagesize: 10,

      loading: false,
      waringForm: {
        id: "",
        name: "",
        biao_shi: "",
        symbol: "",
        bi_li: "",
        qyj_status: "",
        status: "",
        content: "",
        yj_person: [],
      },
      dialogFormVisible: false,
      defdeinx: "0",
      deftype: 1,
      rTeleList: [],
      tableData: [],
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "statistics-warning-row";
      } else {
        return "";
      }
    },
    tableHeaderClass({ row, rowIndex }) {
      return "font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px";
    },
    tableRowClass({ row, rowIndex }) {
      return "color:#5f5f5f;border-color:#F1F8FF;";
    },
    unique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.emplId) && res.set(arr.emplId, 1)
      );
    },

    openAllPeople() {
      this.ccAllPeopleVisible = true;
    },
    handleClose(item, index) {
      this.cctagsData.splice(this.cctagsData.indexOf(item), 1);

      // if (this.cctagsData.lenth > 0) {
      //     this.waringForm.yj_person = this.cctagsData;
      // } else {
      //     this.waringForm.yj_person = [];
      // }
      console.log("132456", JSON.stringify(this.cctagsData));
    },
    addManyPnew() {
      const that = this;

      // that.pickerVisible = true;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: that.$store.state.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 100, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: that.agentid, //微应用的Id
          permissionType: "GLOBAL", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            const newarr = that.cctagsData;
            that.cctagsData = that.unique(newarr.concat(result.users));
            console.log(that.cctagsData);
            // that.waringForm.yj_person = that.cctagsData;
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
    change1(val) {
      console.log(val, "/**");
      this.types = "1";

      if (val == true) {
        console.log(this.waringForm.qyj_status_s);
        this.waringForm.qyj_status_s = false;
      } else {
        // this.waringForm.qyj_status_s = true;
      }
      if (this.switch1 == true) {
        this.waringForm.status = "1";
      } else {
        this.waringForm.status = "2";
      }
      if (this.cctagsData.length == 0) {
        this.$message({
          message: "请添加接收预警人",
          type: "warning",
          duration: 1500,
        });
      }
    },
    change2(val) {
      console.log(val, "lllllllll");
      this.types = "2";
      if (val == true && this.waringForm.status_s) {
        this.waringForm.status_s = false;
      } else {
        // this.waringForm.status_s = true;
      }
      //   if (this.switch2 == true) {
      //     this.waringForm.qyj_status = '1';
      //   } else {
      //     this.waringForm.qyj_status = '2';
      //   }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList(this.deftype);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList(this.deftype);
    },
    rightClick(item, index) {
      console.log(item);
      this.defdeinx = index;
      this.deftype = item.type;
      this.getList(item.type);
    },
    editCancel() {
      this.dialogFormVisible = false;
    },
    editRow(data) {
      console.log(data, "datadata");
      if (data.qyj_status_s) {
        this.types = "2";
      } else {
        this.types = "1";
      }
      this.waringForm = data;
      this.cctagsData = data.yj_person;
      this.dialogFormVisible = true;
      //   if(data.qyj_status_s=='2')
    },
    editInfo(formName) {
      const _this = this;
      console.log(_this.cctagsData);
      if (_this.waringForm.status_s == true) {
        _this.waringForm.status = 1;
      } else {
        _this.waringForm.status = 2;
      }
      if (_this.waringForm.qyj_status_s == true) {
        _this.waringForm.qyj_status = 1;
      } else {
        _this.waringForm.qyj_status = 2;
      }
      _this.waringForm.yj_person = _this.cctagsData;

      console.log(
        _this.waringForm,
        "_this.waringForm.symbol_this.waringForm.symbol"
      );
      console.log(
        _this.waringForm.status_s,
        "///",
        _this.waringForm.qyj_status_s,
        "----"
      );
      if (
        _this.waringForm.status_s == false &&
        _this.waringForm.qyj_status_s == false
      ) {
        //   _this.waringForm.qyj_status_s = false;
        //   _this.waringForm.status_s =false;
        _this.waringForm.qyj_status = "2";
        _this.waringForm.status = "2";
      }
      //   console.log(_this.waringForm,'_this_this')
      if (_this.waringForm.symbol == null) {
        this.$message({
          type: "error",
          message: "请选择预警符号!",
        });
        return;
      }
      if (
        _this.cctagsData.length == 0 &&
        _this.types == "1" &&
        _this.waringForm.status_s
      ) {
        _this.$message({
          message: "请添加接收预警人",
          type: "warning",
          duration: 1500,
        });
        return;
      }
      if (_this.types == "1" || _this.types == "2") {
        _this.waringForm.symbol = "大于";
        _this.$axios
          .post("/order/earlyWarning", _this.waringForm)
          .then((res) => {
            if (res.data.code == 1) {
              _this.loading = false;
              _this.dialogFormVisible = false;

              _this.getList(_this.deftype);
              _this.$message({
                message: res.data.msg,
                type: "success",
                duration: 1500,
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
            _this.loading = false;
            console.log(error);
          });
      } else if (_this.cctagsData.length < 0 && _this.types == "1") {
        _this.$message({
          message: "请添加接收预警人",
          type: "warning",
          duration: 1500,
        });
      }
    },
    changeswitch(data, val) {
      console.log(val, "-----");
      if (val == 1) {
        if (data.status == "1") {
          this.waringForm = data;
          this.waringForm.status = "2";
          this.editInfo("waringForm");
        } else {
          this.waringForm = data;
          this.waringForm.status = "1";
          this.editInfo("waringForm");
        }
      } else {
        // if (data.status == '1') {
        //     return this.$message({
        //         message: '请先开启预警',
        //         type: 'success',
        //         duration: 2000
        //     });
        // }
        if (data.qyj_status == "1") {
          this.waringForm = data;
          this.waringForm.qyj_status = "2";
          this.editInfo("waringForm");
        } else {
          this.waringForm = data;
          this.waringForm.qyj_status = "1";
          this.editInfo("waringForm");
        }
      }
    },
    getList(type) {
      this.$axios
        .post("/order/earlyWarningShow", {
          page: this.currentPage,
          type: type,
          number: this.pagesize,
        })
        .then((res) => {
          this.total = res.data.count;
          this.tableData = res.data.data;

          if (this.total > 0 && this.tableData.length < 1) {
            this.currentPage = res.data.page_number;
            this.getList(type);
          }
        })
        .catch(function (error) {});
    },
    // 预警类型
    gettypeList() {
      this.$axios
        .post("/order/earlyWarningType")
        .then((res) => {
          this.rTeleList = res.data.data;
        })
        .catch(function (error) {});
    },
  },
  mounted() {},
  created() {
    this.gettypeList();
    this.getList(1);
  },
  computed: {},
};
</script>
<style lang="less">
.newform {
  .el-form-item__content {
    display: flex;
    align-items: center;
  }
}
</style>

<style lang="less" scoped>
.main {
  .war_content_a {
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    .page {
      padding-top: 20px;
      display: flex;
      flex-direction: row-reverse;
    }
  }

  .telelist_item1 {
    height: 55px !important;
    text-align: left !important;
    padding: 0px 20px;
    line-height: 55px !important;
    overflow: hidden;
    border-top: 1px solid #f5f6f8;
  }
  .alltype1 {
    height: 48px !important;
    line-height: 48px !important;
    text-align: left !important;
    padding: 0px 20px;
    overflow: hidden;
  }
}
</style>

<style lang="less">
.liuDialog {
  .el-dialog {
    .el-dialog__body {
      padding-bottom: 0px;
    }
  }
}
</style>
