/* * @Author: NorthWind * @Date: 2020-12-08 09:54:27 * @Last Modified by:
NorthWind * @Last Modified time: 2022-01-13 09:31:02 */
<template>
  <div class="container-main" id="hardwareLend">
    <!-- 项目一览表 -->
    <div class="main">
      <div class="header">
        <div class="headerContent">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <div class="hlBottom">
              <el-form-item label="项目名称:">
                <el-input
                  v-model="formInline.name"
                  clearable
                  placeholder="请输入项目名称"
                  style="width: 160px"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="单位名称:">
                <el-input
                  v-model="formInline.unit_name"
                  clearable
                  placeholder="请输单位名称"
                  style="width: 160px"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="申请人:">
                <el-input
                  v-model="formInline.income_send_name"
                  clearable
                  placeholder="请输入申请人名称"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="完结状态:">
                <el-select v-model="formInline.wj_status" clearable>
                  <el-option value="已完结" label="已完结" />
                  <el-option value="未完结" label="未完结" />
                </el-select>
              </el-form-item>

              <el-form-item>
                <div style="margin-left: 72px">
                  <el-button
                    type="primary"
                    size="medium"
                    @click="searchClick"
                    style="margin-right: 10px"
                    >搜索</el-button
                  >
                  <el-button plain size="medium" @click="resetClick"
                    >重置</el-button
                  >
                </div>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mainContent">
        <el-row class="maincBtn mainMoveBtn">
          <div class="mmbLeft"></div>
          <div class="mmbRight">
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
          </div>
        </el-row>
        <el-table
          :data="tpList"
          :span-method="spanMethod"
          @selection-change="getMult"
        >
          <el-table-column
            type="selection"
            width="55"
            :selectable="selectable"
          ></el-table-column>
          <el-table-column align="center" label="基础库-客户基础库">
            <el-table-column
              prop="name"
              label="项目名称"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="unit_name"
              label="单位名称"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="framework"
              label="网上下单架构"
              width="180"
            ></el-table-column>
          </el-table-column>
          <el-table-column align="center" label="收入">
            <el-table-column
              prop="income_riqi"
              label="提交日期"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="income_send_name"
              label="申请人"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="income_type"
              label="收入类型"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="income_zk_money"
              label="筑快收入金额"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="income_cj_money"
              label="驰建收入金额"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="income_soft_money"
              label="软件下单金额"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="income_yongjin"
              label="佣金"
              width="180"
            ></el-table-column>
          </el-table-column>
          <el-table-column align="center" label="软件下单">
            <el-table-column
              prop="software_riqi"
              label="提交日期"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="software_money"
              label="下单金额"
              width="180"
            ></el-table-column>
          </el-table-column>
          <el-table-column align="center" label="返佣">
            <el-table-column
              prop="fan_riqi"
              label="提交日期"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="fan_money"
              label="返佣金额"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="fan_mx"
              label="返佣明细"
              width="180"
            ></el-table-column>
          </el-table-column>
          <el-table-column align="center" label="发票申请">
            <el-table-column
              prop="invoice_riqi"
              label="提交日期"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="zk_invoice_money"
              label="筑快开票总金额"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="cj_invoice_money"
              label="驰建开票总金额"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="bs_invoice_money"
              label="邦胜开票总金额"
              width="180"
            ></el-table-column>
          </el-table-column>
          <el-table-column align="center" label="材料出库">
            <el-table-column
              prop="delivery_riqi"
              label="提交日期"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="delivery_an"
              label="是否安装"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="delivery_money"
              label="报价总金额"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="delivery_mx"
              label="明细"
              width="180"
            ></el-table-column>
            <el-table-column prop="delivery_yeji" label="业绩" width="180">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.id !== 'subtotal' && scope.row.id !== 'total'"
                  type="text"
                  size="mini"
                  @click="edit(scope.row, 'delivery_yeji')"
                  >{{ scope.row.delivery_yeji }}</el-button
                >
                <span v-else>{{ scope.row.delivery_yeji }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            prop="extend_first"
            label="完结状态"
            width="180"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.id !== 'subtotal' && scope.row.id !== 'total'"
                >{{
                  scope.row.extend_first ? scope.row.extend_first : "未完结"
                }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="extend_two"
            label="发工资时间"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.extend_two }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ops" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="extendEdit(scope.row)"
                v-if="scope.row.id !== 'subtotal' && scope.row.id !== 'total'"
                >{{ "修改" }}</el-button
              >
            </template>
          </el-table-column>
          <!-- <div slot="append" class="subTotal">
            <el-table :data="subTotalList">
              <el-table-column
                label="小计/合计"
                prop="type"
                width="180"
              ></el-table-column>
              <el-table-column
                label="筑快收入金额"
                prop="income_zk_money"
                width="180"
              ></el-table-column>
              <el-table-column
                label="驰建收入金额"
                prop="income_cj_money"
                width="180"
              ></el-table-column>
              <el-table-column
                label="收入软件下单金额"
                prop="income_soft_money"
                width="180"
              ></el-table-column>
              <el-table-column
                label="佣金"
                prop="income_yongjin"
                width="180"
              ></el-table-column>
              <el-table-column
                label="软件下单金额"
                prop="software_money"
              ></el-table-column>
              <el-table-column
                label="筑快开票金额"
                prop="zk_invoice_money"
                width="180"
              ></el-table-column>
              <el-table-column
                label="驰建开票金额"
                prop="cj_invoice_money"
                width="180"
              ></el-table-column>
              <el-table-column
                label="邦胜开票金额"
                prop="bs_invoice_money"
                width="180"
              ></el-table-column>
              <el-table-column
                label="返佣金额"
                prop="fan_money"
                width="180"
              ></el-table-column>
              <el-table-column
                label="报价总金额"
                prop="delivery_money"
                width="180"
              ></el-table-column>
              <el-table-column
                label="业绩"
                prop="delivery_yeji"
                width="180"
              ></el-table-column>
            </el-table>
          </div> -->
        </el-table>
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
        <el-dialog :visible.sync="showEdit">
          <el-form>
            <el-form-item :label="currentLabel">
              <el-input v-model="editForm.value" placeholder="请输入数值" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEdit">取 消</el-button>
            <el-button type="primary" @click="submitEdit">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="showExtendEdit">
          <el-form>
            <el-form-item label="完结状态">
              <el-select
                v-model="extendForm.extend_first"
                placeholder="请输入数值"
              >
                <el-option label="未完结" value="未完结" />
                <el-option label="已完结" value="已完结" />
              </el-select>
            </el-form-item>
            <el-form-item label="发工资时间">
              <el-date-picker
                v-model="extendForm.extend_two"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelExtendEdit">取 消</el-button>
            <el-button type="primary" @click="submitExtendEdit"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
export default {
  name: "hardwarePurchase",
  data() {
    return {
      formInline: {
        name: "",
        filler: "",
        status: "",
        start_riqi: "",
        end_riqi: "",
        theme: "",
        wj_status: "",
        unit_name: "",
        income_send_name: "",
      },
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
      showEdit: false,
      currentLabel: "",
      editForm: {
        label: "",
        value: "",
      },
      editingRow: "",
      showExtendEdit: false,
      extendForm: {
        extend_first: "",
        extend_two: "",
      },
      checkedLists: [],
      titleList: [],
      allProjectList: [],
      subTotalList: [],
    };
  },
  methods: {
    getMult(val) {
      this.multSelectData = val;
    },
    selectable(row) {
      if (row.id === "subtotal" || row.id === "total") {
        return false;
      } else {
        return true;
      }
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      //   if (column) {
      //     if (
      //       this.tpList[rowIndex + 1] &&
      //       row.id === this.tpList[rowIndex + 1].id &&
      //       (columnIndex < 4 || columnIndex >= 25) &&
      //       columnIndex !== 0
      //     ) {
      //       return [2, 1];
      //     } else if (
      //       this.tpList[rowIndex - 1] &&
      //       row.id === this.tpList[rowIndex - 1].id &&
      //       (columnIndex < 4 || columnIndex >= 25) &&
      //       columnIndex !== 0
      //     ) {
      //       return [0, 0];
      //     } else {
      //       return [1, 1];
      //     }
      //   }
    },
    edit(row, label) {
      let labelstr;
      switch (label) {
        case "delivery_yeji":
          labelstr = "业绩";
          break;
        case "extend_first":
          labelstr = "完结状态";
          break;
        case "extend_two":
          labelstr = "发工资时间";
          break;
        default:
          labelstr = "完结状态";
      }
      this.currentLabel = labelstr;
      this.editForm.value = row[label];
      this.editForm.label = label;
      this.editingRow = row;
      this.showEdit = true;
    },
    cancelEdit() {
      this.showEdit = false;
      this.currentLabel = "";
      this.editForm.value = "";
      this.editForm.label = "";
    },
    async submitEdit() {
      const label = this.editForm.label;
      let endPoint;
      switch (label) {
        case "delivery_yeji":
          endPoint = "yeji";
          break;
        case "extend_first":
          endPoint = "extend_first";
          break;
        case "extend_two":
          endPoint = "extend_two";
          break;
        default:
          endPoint = "extend_first";
          break;
      }
      const form = {};
      switch (label) {
        case "delivery_yeji":
          form["ck_id"] = this.editingRow["ck_id"];
          form[endPoint] = this.editForm.value;
          break;
        default:
          form["id"] = this.editingRow["id"];
          form[endPoint] = this.editForm.value;
          break;
      }
      const res = await this.$axios.post("/project/yejiStatusEdit", form);
      if (res.data.code === 1) {
        this.editingRow = "";
        this.showEdit = false;
        this.currentLabel = "";
        this.editForm.value = "";
        this.editForm.label = "";
        this.getList();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    extendEdit(row) {
      this.extendForm.extend_first = row["extend_first"];
      this.extendForm.extend_two = row["extend_two"];
      this.editingRow = row;
      this.showExtendEdit = true;
    },
    cancelExtendEdit() {
      this.showExtendEdit = false;
      this.editingRow = "";
      this.extendForm.extend_first = "";
      this.extendForm.extend_two = "";
    },
    async submitExtendEdit() {
      const form = {
        id: this.editingRow["id"],
        extend_first: this.extendForm.extend_first,
        extend_two: this.extendForm.extend_two,
      };
      const res = await this.$axios.post("/project/yejiStatusEdit", form);
      if (res.data.code === 1) {
        this.showExtendEdit = false;
        this.editingRow = "";
        this.extendForm.extend_first = "";
        this.extendForm.extend_two = "";
        this.getList();
      } else {
        this.$message.error(res.data.msg);
      }
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
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    resetClick() {
      this.formInline = {
        name: "",
        filler: "",
        status: "",
        start_riqi: "",
        end_riqi: "",
        theme: "",
        wj_status: "",
        unit_name: "",
        income_send_name: "",
      };
      this.getList();
    },
    updateList() {
      this.getList(1);
    },
    //获取列表
    getList(ntype) {
      this.$axios
        .post("/project/projectLanReport", {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.name,
          wj_status: this.formInline.wj_status,
          unit_name: this.formInline.unit_name,
          income_send_name: this.formInline.income_send_name,
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
            this.total = res.data.count;
            this.tpList = res.data.data;
            console.log(res.data.data, "data");
            this.footerNumList = [];
            const total = [
              { id: "subtotal", name: "小计", ...res.data.total["subtotal"] },
              { id: "total", name: "合计", ...res.data.total["total"] },
            ];
            this.subTotalList = total;
            // this.tpList = this.tpList.concat(this.subTotalList);
            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.page_number;
              this.getList();
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //删除列表
    deleteExport(url) {
      const _this = this;
      _this.$axios
        .post("/project/fileDownloadDel", { path: url })
        .then((res) => {
          if (res.data.code === 1) {
            return true;
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
          .post("/project/projectLanDownload", {
            id: JSON.stringify(_this.multSelectData),
          })
          .then((res) => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.data.url, //要下载的文件的url
                name: res.data.data.name, //定义下载文件名字
                onProgress: function () {
                  // 文件下载进度回调
                },
                onSuccess: function () {
                  _this.deleteExport(res.data.data.path);
                },
                onFail: function () {
                  _this.deleteExport(res.data.data.path);
                },
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
    this.allProjectList = JSON.parse(this.$store.state.allPro);
    this.getList();
  },
  created() {
    this.$utils.checkding();
    // this.$utils.utilAllProject();
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
