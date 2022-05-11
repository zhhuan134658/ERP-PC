/*
 * @Author: NorthWind 
 * @Date: 2021-01-20 08:35:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-04-28 18:12:43
 */
<template>
  <div id="materialPlanReport">
    <!-- 材料期初报表 -->
    <div class="main">
      <!-- 搜索条件 -->
      <commonSearch
        :formcommonList="formcommonList"
        :formInline="formInline"
        @searchClick="searchClick"
        @getList="getList"
        :isShen="false"
      ></commonSearch>
      <div class="mainContent">
        <el-row class="maincBtn">
          <el-button
            type="primary"
            plain
            size="medium"
            icon="el-icon-download"
            @click="exportList"
            >导出</el-button
          >
        </el-row>
        <el-table
          :border="true"
          v-loading="tableloading"
          class="moterialTotalClass"
          :max-height="650"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          @header-dragend="checkWidth"
          ref="table"
          style="width: 100%; border: 1px solid #ebeef5"
          @selection-change="handleSelectionChange"
          :span-method="objectSpanMethod"
          size="mini"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" width="55" label="序号" />
          <el-table-column
            prop="number"
            label="调拨编号"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="调拨名称"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="inputer"
            label="录入人"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="project_out"
            label="调出项目"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="cang_out"
            label="调出仓库"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="project_income"
            label="调入项目"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="cang_income"
            label="调入仓库"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="riqi"
            label="日期"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="材料"
            align="left"
            :show-overflow-tooltip="true"
            prop="b_name"
          >
          </el-table-column>
          <el-table-column
            label="规格"
            align="left"
            :show-overflow-tooltip="true"
            prop="size"
          >
          </el-table-column>
          <el-table-column
            label="单位"
            align="left"
            :show-overflow-tooltip="true"
            prop="unit"
          >
          </el-table-column>
          <el-table-column
            label="物资类型"
            align="center"
            :show-overflow-tooltip="true"
            prop="type_name"
          >
          </el-table-column>
          <el-table-column
            label="调拨数量"
            align="left"
            :show-overflow-tooltip="true"
            prop="db_number"
          >
          </el-table-column>
          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">小计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="dxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ dxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <!-- <div class="sum_footer_unit over_sum_text">
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="mxiaoji"
                                    placement="top"
                                >
                                    <div>{{ mxiaoji }}</div>
                                </el-tooltip>
                            </div>
                            <div class="sum_footer_unit over_sum_text">
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="xxiaoji"
                                    placement="top"
                                >
                                    <div>{{ xxiaoji }}</div>
                                </el-tooltip>
                            </div> -->
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="dheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ dheji }}
                    </div>
                  </el-tooltip>
                </div>
                <!-- <div class="sum_footer_unit over_sum_text">
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="mheji"
                                    placement="top"
                                >
                                    <div>{{ mheji }}</div>
                                </el-tooltip>
                            </div>
                            <div class="sum_footer_unit over_sum_text">
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="xheji"
                                    placement="top"
                                >
                                    <div>{{ xheji }}</div>
                                </el-tooltip>
                            </div> -->
              </div>
            </div>
          </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import commonSearch from "@/components/commonSearch.vue";

export default {
  name: "materialAllotReport",
  components: { commonSearch },

  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: "调拨名称",
          labelData: "name",
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
        {
          labelName: "录入人",
          labelData: "inputer",
        },
        {
          labelName: "物资类型",
          labelData: "material_name",
        },
        // {
        //   labelName: '审批状态',
        //   labelData: 'status',
        // },
      ],
      tableloading: false,
      allmaterial_name: [],
      formInline: {
        name: "",
        status: "",
        startTime: "",
        material_name: "",
        endTime: "",
        project_name: "",
        inputer: "",
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      dxiaoji: 0,
      dheji: 0,
      mxiaqoji: 0,
      mheji: 0,
      xxiaoji: 0,
      xheji: 0,
      allProjectList: [],
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
    resetClick() {
      this.formInline = {
        name: "",
        status: "",
        startTime: "",
        material_name: "",
        endTime: "",
        project_name: "",
        inputer: "",
      };
      this.getList();
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 500);
    },
    adjustWidth() {
      const _this = this;

      _this.$nextTick(() => {
        let newW = document.getElementsByClassName(
          "el-table__append-wrapper"
        )[0];
        _this.$utils.utilAdjustWidth(
          _this.$refs.table,
          newW,
          _this.$refs.sum_xiaoji,
          _this.$refs.sum_heji
        );
      });
    },
    tableHeaderClass({ row, rowIndex }) {
      return "font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px";
    },
    tableRowClass({ row, rowIndex }) {
      return "color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;";
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        columnIndex === 1 ||
        columnIndex === 2 ||
        columnIndex === 3 ||
        columnIndex === 4 ||
        columnIndex === 5 ||
        columnIndex === 6 ||
        columnIndex === 7 ||
        columnIndex === 8
      ) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    getSpanArr(data) {
      this.spanArr = [];
      let pos = 0;
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          // 如果是第一条记录（即索引是0的时候），向数组中加入１
          this.spanArr.push(1);
          pos = 0;
        } else {
          if (data[i].id === data[i - 1].id) {
            // 如果itemCode相等就累加，并且push 0
            this.spanArr[pos] += 1;
            this.spanArr.push(0);
          } else {
            // 不相等push 1
            this.spanArr.push(1);
            pos = i;
          }
        }
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
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.tableloading = true;
      this.$axios
        .post("/projectone/materialAllocationReport", {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.name,
          material_name: this.formInline.material_name,
          project_name: this.formInline.project_name,
          inputer: this.formInline.inputer,
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.getSpanArr(this.tpList);
            this.dxiaoji = res.data.db_number_subtotal;
            this.dheji = res.data.db_number_total;
            this.mxiaoji = res.data.price_subtotal;
            this.mheji = res.data.price_total;
            this.xxiaoji = res.data.subtotal;
            this.xheji = res.data.total;
            this.$nextTick(() => {
              setTimeout(() => {
                this.adjustWidth();
              }, 500);
              if (document.body.scrollHeight > window.innerHeight) {
                setTimeout(() => {
                  this.adjustWidth();
                }, 1000);
              }
            });
            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.page_number;
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
      this.multSelectData = val;
    },
    deleteExport(url) {
      const _this = this;
      _this.$axios
        .post("/project/fileDownloadDel", { path: url })
        .then((res) => {
          if (res.data.code == 1) {
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
          .post("/projectone/materialAllocationDownload", {
            id: JSON.stringify(_this.multSelectData),
          })
          .then((res) => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.data.url, //要下载的文件的url
                name: res.data.data.name, //定义下载文件名字
                onProgress: function (msg) {
                  // 文件下载进度回调
                },
                onSuccess: function (result) {
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
          message: "请先勾选要删除的数据！",
          type: "warning",
          duration: 1500,
        });
      }
    },
  },
  mounted() {
    this.$utils.getmaterialList().then((res) => {
      console.log(res);
      this.allmaterial_name = res;
    });
    this.allProjectList = JSON.parse(this.$store.state.allPro);
    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.adjustWidth();
      }, 100);
    });
  },
  created() {
    this.$utils.checkding();
    this.$utils.utilAllProject();
    // this.approvalStatus = this.$utils.utilApprovalStatus();
    this.getList();
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