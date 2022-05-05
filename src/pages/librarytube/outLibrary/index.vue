/*
 * @Author: NorthWind 
 * @Date: 2021-01-20 09:15:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-04-28 18:11:00
 */
<template>
  <div id="materialPlanReport">
    <!-- 材料入库报表 -->
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
            label="入库单号"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="入库主题"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="supplier"
            label="供应商"
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
          <!-- <el-table-column label="审批状态" align="left">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '2'" style="color: #17c298"
                >已同意</span
              >
              <span v-else-if="scope.row.status == '1'" style="color: #e8a54c"
                >审批中</span
              >
              <span v-else style="color: #f16d6d">已拒绝</span>
            </template>
          </el-table-column> -->
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
            label="入库数量"
            align="left"
            :show-overflow-tooltip="true"
            prop="rk_number"
          >
          </el-table-column>
          <el-table-column
            label="税额(元)"
            align="left"
            :show-overflow-tooltip="true"
            prop="notax_price"
          >
          </el-table-column>
          <el-table-column
            label="含税单价(元)"
            align="left"
            :show-overflow-tooltip="true"
            prop="tax_price"
          >
          </el-table-column>
          <el-table-column
            label="不含税金额(元)"
            align="left"
            :show-overflow-tooltip="true"
            prop="notax_money"
          >
          </el-table-column>
          <el-table-column
            label="含税金额(元)"
            align="left"
            :show-overflow-tooltip="true"
            prop="tax_money"
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
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="rnxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ rnxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="nsdxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ nsdxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="sdxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">{{ sdxiaoji }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="nszxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ nszxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="szxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ szxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
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
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="rnheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ rnheji || 0 }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="nsdheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ nsdheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="sdheji"
                    placement="top"
                  >
                    <div style="text-align: left">{{ sdheji }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="nszheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ nszheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="szheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ szheji }}
                    </div>
                  </el-tooltip>
                </div>
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
  name: "materialInReport",
  components: { commonSearch },

  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: "入库主题",
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
          labelName: "供应商",
          labelData: "supplier",
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
      allmaterial_name: [],
      tableloading: false,
      allProjectList: [],
      formInline: {
        material_name: "",
        name: "",
        status: "",
        startTime: "",
        endTime: "",
        project_name: "",
        supplier: "",
        send_name: "",
        send_userid: "",
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      rnxiaoji: 0,
      rnheji: 0,
      nsdxiaoji: 0,
      nsdheji: 0,
      sdxiaoji: 0,
      sdheji: 0,
      nszxiaoji: 0,
      nszheji: 0,
      szxiaoji: 0,
      szheji: 0,
      spanArr: [],
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
        material_name: "",
        name: "",
        status: "",
        startTime: "",
        endTime: "",
        project_name: "",
        supplier: "",
        send_name: "",
        send_userid: "",
      };
      this.getList();
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 500);
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
        columnIndex === 6
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
    //获取列表
    getList() {
      this.tableloading = true;
      this.$axios
        .post("/projectone/materialWarehousingReport", {
          page: this.currentPage,
          number: this.pagesize,
          material_name: this.formInline.material_name,
          name: this.formInline.name,
          project_name: this.formInline.project_name,
          supplier: this.formInline.supplier,
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
          send_name: this.formInline.send_name,
          send_userid: this.formInline.send_userid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.getSpanArr(this.tpList);
            this.rnxiaoji = res.data.rk_number_subtotal;
            this.rnheji = res.data.rk_number_total;

            this.nsdxiaoji = res.data.notax_price_subtotal;
            this.nsdheji = res.data.notax_price_total;

            this.sdxiaoji = res.data.tax_price_subtotal;
            this.sdheji = res.data.tax_price_total;

            this.nszxiaoji = res.data.notax_money_subtotal;
            this.nszheji = res.data.notax_money_total;

            this.szxiaoji = res.data.tax_money_subtotal;
            this.szheji = res.data.tax_money_total;
            this.$nextTick(() => {
              this.adjustWidth();
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
          .post("/projectone/materialWarehousingDownload", {
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