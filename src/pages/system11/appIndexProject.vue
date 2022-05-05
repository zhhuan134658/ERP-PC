/* * @Author: NorthWind * @Date: 2021-01-13 17:31:30 * @Last Modified by:
mikey.zhaopeng * @Last Modified time: 2022-01-06 14:45:27 */
<template>
  <div id="projectApprovalList">
    <!-- 立项项目列表 -->
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
                ></el-input>
              </el-form-item>
              <el-form-item label="项目类型:">
                <el-select
                  v-model="formInline.type"
                  clearable
                  filterable
                  placeholder="请选择项目类型"
                >
                  <el-option
                    v-for="(item, index) in projectType"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目状态:">
                <el-select
                  v-model="formInline.bstatus"
                  clearable
                  filterable
                  placeholder="请选择项目状态"
                >
                  <el-option
                    v-for="(item, index) in projectStatus"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
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
              <el-form-item>
                <div style="padding-left: 72px">
                  <el-button type="primary" size="medium" @click="searchClick"
                    >搜索</el-button
                  >
                  <el-button size="medium" plain @click="resetClick"
                    >重置</el-button
                  >
                </div>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mainContent">
        <!-- <el-row :gutter="20" class="appIPmcPie">
                    <el-col :span="6">
                        <div class="grid-content" @click="lookinfo(1)">
                            <div class="gc1">
                                <div>{{ tjData.zong_count }}</div>
                                <p>项目总数</p>
                            </div>
                            <p>
                                造价总金额<span class="gct1">{{
                                    tjData.zong_money
                                }}</span
                                >万元
                            </p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content" @click="lookinfo(2)">
                            <div class="gc2">
                                <div>{{ tjData.zj_count }}</div>
                                <p>在建项目</p>
                            </div>
                            <p>
                                造价总金额<span class="gct2">{{
                                    tjData.zj_money
                                }}</span
                                >万元
                            </p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content" @click="lookinfo(3)">
                            <div class="gc3">
                                <div>{{ tjData.xz_count }}</div>
                                <p>本年新增</p>
                            </div>
                            <p>
                                造价总金额<span class="gct3">{{
                                    tjData.xz_money
                                }}</span
                                >万元
                            </p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content" @click="lookinfo(4)">
                            <div class="gc4">
                                <div>{{ tjData.jg_count }}</div>
                                <p>本年竣工</p>
                            </div>
                            <p>
                                造价总金额<span class="gct4">{{
                                    tjData.jg_money
                                }}</span
                                >万元
                            </p>
                        </div>
                    </el-col>
                </el-row> -->
        <div class="cards">
          <div class="item" @click="lookinfo(1)">
            <div class="box" :style="`background: #FFDCD7;`">
              <div class="left">
                <div>
                  项目总数(个数)：<CountUp :value="tjData.zong_count" />
                </div>
                <div style="position: absolute">
                  造价总额(万元)：<CountUp
                    :value="tjData.zong_money"
                    :decimalPlaces="4"
                  />
                </div>
              </div>
              <div class="right">
                <img src="@/assets/images/xiangmu.png" />
              </div>
            </div>
          </div>
          <div class="item" @click="lookinfo(2)">
            <div class="box" :style="`background: #B8DFFF;`">
              <div class="left">
                <div>在建项目(个数)：<CountUp :value="tjData.zj_count" /></div>
                <div style="position: absolute">
                  造价总额(万元)：<CountUp
                    :value="tjData.zj_money"
                    :decimalPlaces="4"
                  />
                </div>
              </div>
              <div class="right">
                <img src="@/assets/images/zaijian.png" />
              </div>
            </div>
          </div>
          <div class="item" @click="lookinfo(3)">
            <div class="box" :style="`background: #FFE3C0;`">
              <div class="left">
                <div>本年新增(个数)：<CountUp :value="tjData.xz_count" /></div>
                <div style="position: absolute">
                  造价总额(万元)：<CountUp
                    :value="tjData.xz_money"
                    :decimalPlaces="4"
                  />
                </div>
              </div>
              <div class="right">
                <img src="@/assets/images/xinzeng.png" />
              </div>
            </div>
          </div>
          <div class="item" @click="lookinfo(4)">
            <div class="box" :style="`background: #BAFBE4;`">
              <div class="left">
                <div>本年竣工(个数)：<CountUp :value="tjData.jg_count" /></div>
                <div style="position: absolute">
                  造价总额(万元)：<CountUp
                    :value="tjData.jg_money"
                    :decimalPlaces="4"
                  />
                </div>
              </div>
              <div class="right">
                <img src="@/assets/images/jungong.png" />
              </div>
            </div>
          </div>
        </div>
        <el-table
          :border="true"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          @row-click="checkList"
          style="width: 100%; border: 1px solid #ebeef5"
          @selection-change="handleSelectionChange"
          size="mini"
          :row-class-name="tableRowClassName"
        >
          <!-- <el-table-column type="selection" width="55">
                    </el-table-column> -->

          <!-- <el-table-column
                        prop="name"
                        label="项目名称"
                        align="left"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column> -->
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column
            label="项目名称"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span
                style="color: #409eff; cursor: pointer"
                @click="goPanel(scope.row)"
                >{{ scope.row.name }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="project_status"
            label="项目状态"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="stalker_name"
            label="项目负责人"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <!-- <el-table-column
                        prop="stalker"
                        label="项目跟踪人"
                        align="left"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column> -->

          <el-table-column
            prop="construction_unit"
            label="建设单位"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="plan_start_riqi"
            label="计划开始时间"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="plan_end_riqi"
            label="计划结束时间"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="make_cost"
            label="工程造价(元)"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="审批状态" align="right" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '2'" style="color: #17c298"
                >已同意</span
              >
              <span v-else-if="scope.row.status == '1'" style="color: #e8a54c"
                >审批中</span
              >
              <span v-else-if="scope.row.status == '3'" style="color: #f16d6d"
                >已拒绝</span
              >
              <span v-else style="color: #409eff">外部数据</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import CountUp from "@/components/CountUp";

export default {
  name: "appIndexProject",
  components: { CountUp },
  data() {
    return {
      formInline: {
        name: "",
        type: "",
        status: "",
        startTime: "",
        endTime: "",
        p_number: "",
        bstatus: "",
        newstatus: "",
        xz_pro: ""
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      projectType: [],
      approvalStatus: [],
      projectStatus: [],
      tjData: {
        jg_count: 0,
        jg_money: 0,
        xz_count: 0,
        xz_money: 0,
        zj_count: 0,
        zj_money: 0,
        zong_count: 0,
        zong_money: 0
      }
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
    goPanel(row) {
      this.$router.push({
        path: "/appIndex8/appPanel",
        query: { id: row.id, name: row.name }
      });
    },
    lookinfo(val) {
      console.log(val);
      if (val == 1) {
        this.formInline.newstatus = 2;
        this.formInline.bstatus = "";
        this.formInline.xz_pro = "";
        this.getList();
      } else if (val == 2) {
        this.formInline.newstatus = 2;
        this.formInline.bstatus = "在建";
        this.formInline.xz_pro = "";
        this.getList();
      } else if (val == 3) {
        this.formInline.newstatus = 2;
        this.formInline.bstatus = "";
        this.formInline.xz_pro = 1;
        this.getList();
      } else if (val == 4) {
        this.formInline.newstatus = 2;
        this.formInline.bstatus = "竣工";
        this.formInline.xz_pro = 1;
        this.getList();
      }
    },
    resetClick() {
      this.formInline = {
        name: "",
        type: "",
        status: "",
        startTime: "",
        endTime: "",
        p_number: "",
        bstatus: "",
        newstatus: "",
        xz_pro: ""
      };
      this.getList();
    },
    fortStatus(row) {
      switch (row.status) {
        case "1":
          return "审批中";
          break;
        case "2":
          return "审批同意";
          break;
        case "3":
          return "审批拒绝";
          break;
      }
    },
    tableHeaderClass({ row, rowIndex }) {
      return "font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px";
    },
    tableRowClass({ row, rowIndex }) {
      return "color:#5f5f5f;border-color:#F1F8FF;";
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    //查看审批
    checkList(row, column) {
      const _this = this;
      if (column.label != "项目名称") {
        dd.ready(function() {
          dd.biz.util.openSlidePanel({
            url: row.url, //打开侧边栏的url
            title: "详情", //侧边栏顶部标题
            onSuccess: function(result) {},
            onFail: function() {
              setTimeout(() => {
                _this.getList();
              }, 5000);
              setTimeout(() => {
                _this.getList();
              }, 10000);
            }
          });
        });
      }
    },

    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.$axios
        .post("/project/projectInfoRegisterList", {
          page: this.currentPage,
          number: 10,
          start_plan_start_riqi: this.formInline.startTime,
          end_plan_start_riqi: this.formInline.endTime,
          stand_termer: "",
          start_plan_end_riqi: "",
          end_plan_end_riqi: "",
          name: this.formInline.name,
          stalker: "",
          construction_unit: "",
          type: this.formInline.type,
          project_status: this.formInline.bstatus,
          shenpi: this.formInline.status,
          p_number: this.formInline.p_number,
          status: this.formInline.newstatus,
          xz_pro: this.formInline.xz_pro
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.tjData = res.data.tj;
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
    //筛选
    handleSelectionChange(val) {
      this.multSelectData = val.map(item => {
        if (!item.id) return "";
        return item.id;
      });
    },
    //删除列表
    deleteList() {
      if (this.multSelectData.length > 0) {
        this.$axios
          .post("/project/projectInfoRegisterDel", {
            id: this.multSelectData
          })
          .then(res => {
            if (res.data.code == 1) {
              this.getList();
              this.$message({
                message: res.data.msg,
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
        this.$message({
          message: "请您先多选",
          type: "warning",
          duration: 1500
        });
      }
    },
    //还原列表
    backList() {
      this.$axios
        .post("/project/projectInfoRegisterReduction")
        .then(res => {
          if (res.data.code == 1) {
            this.getList();
            this.$message({
              message: "已还原",
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
    },
    deleteExport(url) {
      const _this = this;
      _this.$axios
        .post("/project/fileDownloadDel", { path: url })
        .then(res => {
          if (res.data.code == 1) {
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
          .post("/project/projectInfoRegisterDownload", {
            id: _this.multSelectData
          })
          .then(res => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.data.url, //要下载的文件的url
                name: res.data.data.name, //定义下载文件名字
                onProgress: function(msg) {
                  // 文件下载进度回调
                },
                onSuccess: function(result) {
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
          message: "请您先多选",
          type: "warning",
          duration: 1500
        });
      }
    }
  },
  created() {
    this.$utils.checkding();
    this.projectType = JSON.parse(this.$store.state.pType);
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.projectStatus = JSON.parse(this.$store.state.pStatus);
    this.getList();
  },
  computed: {
    pickerStart() {
      return {
        disabledDate: time => {
          let endDateVal = this.formInline.endTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      };
    },
    pickerEnd() {
      return {
        disabledDate: time => {
          let beginDateVal = this.formInline.startTime;
          if (beginDateVal) {
            return (
              // time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          }
        }
      };
    }
  }
};
</script>
<style lang="less" scoped>
.appIPmcPie {
  margin-bottom: 30px;
  .el-col {
    border-radius: 10px;
    .grid-content {
      width: 100%;
      border-radius: 10px;
      padding: 20px 0;
      text-align: center;
      background-color: #f3f3f3;
      > div {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        text-align: center;
        line-height: 100px;
        // background-color: #91d5ff;
        margin: 0 auto;
        margin-bottom: 15px;
        color: #fff;
        div,
        p {
          height: 44px;
          line-height: 44px;
        }
        div {
          font-size: 22px;
          line-height: 66px;
        }
        p {
          font-size: 14px;
        }
      }
      > p {
        span {
          margin: 0 4px;
          font-size: 22px;
        }
      }
      .gct1 {
        color: #aede82;
      }
      .gct2 {
        color: #6ae0d0;
      }
      .gct3 {
        color: #78c5f5;
      }
      .gct4 {
        color: #ffa39e;
      }
      .gc1 {
        background-color: #aede82;
      }
      .gc2 {
        background-color: #6ae0d0;
      }
      .gc3 {
        background-color: #78c5f5;
      }
      .gc4 {
        background-color: #ffa39e;
      }
    }
  }
}

.cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  .item {
    margin-bottom: 30px;
    .box {
      width: 334px;
      height: 148px;
      border-radius: 7px;
      display: flex;
      justify-content: space-between;
      font-weight: 400;
      font-size: 16px;
      .left {
        margin-left: 39px;
        div:nth-child(1) {
          margin-bottom: 40px;
          margin-top: 44px;
          text-align: left;
        }
      }
      .right {
        margin-top: 29px;
        margin-right: 40px;
        img {
          width: 53px;
          height: 53px;
        }
      }
    }
  }
}
</style>

<style lang="less">
.el-table__row.statistics-warning-row {
  background: #f1f8ff;
}
.hlBottom {
  width: 1240px !important;
  .el-select,
  .el-input {
    width: 280px;
  }
}

.el-table tr {
  height: 49px;
}
</style>
