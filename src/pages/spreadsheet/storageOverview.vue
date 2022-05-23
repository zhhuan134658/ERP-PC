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
                >
                </el-input>
              </el-form-item>
              <el-form-item label="开始日期:">
                <el-date-picker
                  v-model="formInline.start_riqi"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束日期:">
                <el-date-picker
                  v-model="formInline.end_riqi"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
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
          border
        >
          <el-table-column
            type="selection"
            width="55"
            :selectable="selectable"
          ></el-table-column>
          <el-table-column align="center" prop="name" label="物资名称">
          </el-table-column>
          <el-table-column align="center" prop="t4" label="期初数量">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="extendEdit(scope.row)"
                >{{ scope.row.t4 ? scope.row.t4 : "0" }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="rk_number" label="入库数量">
          </el-table-column>
          <el-table-column align="center" prop="ck_number" label="出库数量">
          </el-table-column>
          <el-table-column
            align="center"
            prop="jie_number"
            label="借出数量"
            width="180"
          >
          </el-table-column>
          <el-table-column align="center" prop="re_number" label="归还数量">
          </el-table-column>
          <el-table-column align="center" prop="stock_number" label="库存数量">
          </el-table-column>
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
        <el-dialog :visible.sync="showExtendEdit">
          <el-form>
            <el-form-item label="期初数量">
              <el-input v-model="editForm.value" />
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
      if (column) {
        if (
          this.tpList[rowIndex + 1] &&
          row.id === this.tpList[rowIndex + 1].id &&
          (columnIndex < 4 || columnIndex >= 25) &&
          columnIndex !== 0
        ) {
          return [2, 1];
        } else if (
          this.tpList[rowIndex - 1] &&
          row.id === this.tpList[rowIndex - 1].id &&
          (columnIndex < 4 || columnIndex >= 25) &&
          columnIndex !== 0
        ) {
          return [0, 0];
        } else {
          return [1, 1];
        }
      }
    },
    extendEdit(row) {
      this.editForm.value = row["t4"];
      this.editForm.label = row["b_id"];
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
        qc_number: this.editForm.value,
        b_id: this.editForm.label,
      };
      const res = await this.$axios.post("/project/qiChuEdit", form);
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
      };
      this.getList();
    },
    updateList() {
      this.getList(1);
    },
    //获取列表
    getList(ntype) {
      this.$axios
        .post("/project/stockDetailedReport", {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.name,
          start_riqi: this.formInline.start_riqi,
          end_riqi: this.formInline.end_riqi,
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
          .post("/project/stockDetailedDownload", {
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
