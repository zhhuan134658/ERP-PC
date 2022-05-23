<template>
  <div class="container-main" id="hardwareLend">
    <!-- 项目一览表 -->
    <div class="main">
      <div class="header">
        <div class="headerContent">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <div class="hlBottom">
              <el-form-item label="物资名称:">
                <el-input
                  v-model="formInline.name"
                  clearable
                  placeholder="请输入项目名称"
                >
                </el-input>
              </el-form-item>
                <el-form-item label="唯一标识码:">
                <el-input
                  v-model="formInline.sn_ma"
                  clearable
                  placeholder="请输入项目名称"
                >
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="开始日期:">
                <el-date-picker
                  v-model="formInline.start_riqi"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束日期:">
                <el-date-picker
                  v-model="formInline.end_riqi"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item> -->
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
          <el-table-column align="center" label="材料入库">

          <el-table-column
            type="selection"
            width="55"
            :selectable="selectable"
          ></el-table-column>
          <el-table-column align="center" prop="name" label="物资名称">
          </el-table-column>
          <el-table-column align="center" prop="sn_ma" label="唯一标识码">
            <!-- <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="extendEdit(scope.row)"
                >{{ scope.row.t4 ? scope.row.t4 : "0" }}</el-button
              >
            </template> -->
          </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="安装费用报销">

          <el-table-column align="center" prop="project_name" label="项目名称">
          </el-table-column>
          <el-table-column align="center" prop="unit_name" label="单位名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="salesman"
            label="业务员"
         
          >
          </el-table-column>
          <el-table-column align="center" prop="created" label="使用日期">
          </el-table-column>

          </el-table-column>
          <el-table-column align="center" label="">

          <el-table-column align="center" prop="sett_status" label="结算状态">
          </el-table-column>
                <el-table-column align="center" prop="explain" label="说明">
          </el-table-column>
                     <el-table-column  label="操作" align="left">
        <template slot-scope="scope">
            <!-- v-if="scope.row.extend_five == 2"
            :disabled="scope.row.status != '2'"
             -->
          <el-button
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="addIllustrates(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
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
                 <el-dialog
      title="修改"
      :visible.sync="producVisible"
      :close-on-click-modal="false"
      width="600px"
      @close="producVisible=false"
      class="view_change_title"
    >
    <div class="return_content">
        <el-form :label-position="'right'" :model="producitnForm" ref="producitnForm">
          </el-form-item>
          <el-form-item label="结算状态">
             <el-select v-model="producitnForm.sett_status" placeholder="请选择结算状态">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="说明">
            <el-input v-model="producitnForm.explain" placeholder="请输入说明"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="producVisible=false">取 消</el-button>
        <el-button size="medium" type="primary" @click="addShouMing">确 定</el-button>
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
        sn_ma:''
      },
         options: [{
          value: '已结算',
          label: '已结算'
        }, {
          value: '未结算',
          label: '未结算'
        }, {
          value: '无需结算',
          label: '无需结算'
        }],
      producVisible: false,
      producitnForm: {
        id: null,
        sett_status: null,
        explain: null,
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
    addIllustrates(item) {
      this.producVisible = true;
      this.producitnForm = item;
    },
    addIllustrate() {
      this.producVisible = false;
      this.producitnForm.sett_status = null;
      this.producitnForm.explain = null;
      this.producitnForm.id = 0;
      this.updateList();
    },
    async addShouMing() {
      const returnData = {
        id: this.producitnForm.id,
        sett_status: this.producitnForm.sett_status,
        explain: this.producitnForm.explain,
      };
      const res = await this.$axios.post(
        "/mobile/kuCunSnSettlement",
        returnData
      );
      if (res.data.code === 1) {
        this.$message.success("修改成功");
        this.producVisible = false;
        this.producitnForm.sett_status = null;
        this.producitnForm.explain = null;
        this.producitnForm.id = 0;
        this.updateList();
      } else {
        this.$message.error(res.data.msg);
      }
    },
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
        sn_ma:''
      };
      this.getList();
    },
    updateList() {
      this.getList(1);
    },
    //获取列表
    getList(ntype) {
      this.$axios
        .post("/project/stockGoodsReport", {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.name,
          sn_ma: this.formInline.sn_ma,
        //   start_riqi: this.formInline.start_riqi,
        //   end_riqi: this.formInline.end_riqi,
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
