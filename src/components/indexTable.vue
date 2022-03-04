<template>
  <div id="indexTable">
    <el-table
      :border="true"
      v-loading="tableloading"
      :data="tpList"
      :header-cell-style="tableHeaderClass"
      :cell-style="tableRowClass"
      @row-click="checkList"
      @header-dragend="checkWidth"
      ref="table"
      max-height="650"
      style="width: 100%; border: 1px solid #ebeef5"
      @selection-change="handleSelectionChange"
      size="mini"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="index" width="65" label="序号" />
      <el-table-column
        prop="name"
        label="审批标题"
        :show-overflow-tooltip="true"
        align="left"
        :min-width="watchMinWidth('审批标题')"
      >
      </el-table-column>
      <el-table-column label="审批摘要">
        <template slot-scope="scope">
          <div class="digest">
            <div class="digestContent" v-if="scope.row.field_one">
              <span>{{ scope.row.field_one }}</span>
            </div>
            <div class="digestContent" v-if="scope.row.field_two">
              <span>{{ scope.row.field_two }}</span>
            </div>
            <div class="digestContent" v-if="scope.row.field_three">
              <span>{{ scope.row.field_three }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发起人" align="left">
        <template slot-scope="scope">
          <div class="userContent">
            <span class="avatar" v-if="scope.row.avatar">
              <img :src="scope.row.avatar" :alt="scope.row.send_name" />
              <span>{{ scope.row.send_name }}</span>
            </span>
            <span v-else class="avatar no-img">
              <span class="make-shift-avatar">
                {{
                  2 >= scope.row.send_name.length
                    ? scope.row.send_name
                    : scope.row.send_name.substr(
                        scope.row.send_name.length - 2,
                        2
                      )
                }}</span
              >
              <span> {{ scope.row.send_name }}</span>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="created"
        label="发起时间"
        :show-overflow-tooltip="true"
        align="left"
        :min-width="watchMinWidth('发起时间')"
      >
      </el-table-column>
      <el-table-column
        prop="finishtime"
        label="完成时间"
        :show-overflow-tooltip="true"
        align="left"
        :min-width="watchMinWidth('完成时间')"
      >
      </el-table-column>
      <el-table-column label="审批状态" align="left">
        <template slot-scope="scope">
          <span v-if="scope.row.status == '2'" style="color: #17c298"
            >已同意</span
          >
          <span v-else-if="scope.row.status == '1'" style="color: #e8a54c"
            >审批中</span
          >
          <span v-else-if="scope.row.status == '3'" style="color: #f16d6d"
            >已拒绝</span
          ><span v-else style="color: #409eff">外部数据</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";
export default {
  name: "commonTable",
  props: {
    tpList: Array,
    titleList: Array,
    isFooter: Number,
    footerNumList: Array,
    isdele: Boolean,
    tableloading: Boolean,
    isdele2: Boolean,
    hasPrint: {
      type: Boolean,
      default: false
    },
    printTableName: {
      type: String,
      default: ""
    }
  },
  data: props => {
    return {
      multSelectData: [],
      printable: props.hasPrint
    };
  },
  methods: {
    watchMinWidth(label) {
      if (label.length > 14) return "300px";

      if (label.length == 10) return "280px";

      if (label.length > 8) return "200px";

      if (label.length > 4) return "160px";
    },
    tableRowClassName({ row, rowIndex }) {
      if (row && rowIndex % 2 == 1) {
        return "statistics-warning-row";
      } else {
        return "";
      }
    },
    creation(row) {
      this.$emit("creation", row);
    },
    async printPDF(id) {
      const _this = this;
      const res = await _this.$axios.post("/finance/dc_pdf", {
        tableName: this.printTableName,
        id: id
      });
      if (res.data.code === 1) {
        console.log(res);
        window.open(`http://${res.data.file_path}`);
      }
    },
    async getPrintableStatus() {
      //   const res = await this.$axios.post("/finance/control_display", {
      //     tableName: this.printTableName
      //   });
      //   if (res.data.code === 1) {
      //     this.printable = res.data.type === "1";
      //   }
    },
    //筛选
    handleSelectionChange(val) {
      this.$emit("newlistenChild", this.$utils.canDelete(val));
      this.multSelectData = val.map(item => {
        if (!item.id) return "";
        return item.id;
      });
      this.$emit("listenChild", this.multSelectData);
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
    tableHeaderClass() {
      return "font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px";
    },
    tableRowClass() {
      return "color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;border-color:#F1F8FF;";
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 200);
    },
    //查看审批
    checkList(row, column) {
      if (column.type != "selection" && column.label !== "打印") {
        let newUrl = "";
        if (row.filename) {
          newUrl = row.filename;
        } else {
          newUrl = row.url;
        }
        dd.ready(function() {
          dd.biz.util.openSlidePanel({
            url: newUrl, //打开侧边栏的url
            title: "详情", //侧边栏顶部标题
            onSuccess: function() {},
            onFail: function() {}
          });
        });
      }
    }
  },
  mounted() {
    this.getPrintableStatus();
    window.addEventListener("resize", () => {
      this.$nextTick(() => {
        if (this.$refs.table) {
          this.$refs.table.doLayout();
        }
        setTimeout(() => {
          this.adjustWidth();
        }, 100);
      });
    });
  },
  watch: {
    tpList: {
      //深度监听，可监听到对象、数组的变化
      handler() {
        setTimeout(() => {
          this.adjustWidth();
        }, 500);
      }
    },
    titleList: {
      //深度监听，可监听到对象、数组的变化
      handler() {
        setTimeout(() => {
          this.adjustWidth();
        }, 500);
      }
    }
  }
};
</script>

<style lang="less">
.el-table__row.statistics-warning-row {
  background: #f1f8ff;
}

.el-table tr {
  height: 49px;
}

.avatar {
  img {
    max-width: 32px;
    max-height: 32px;
    border-radius: 50%;
    margin-right: 8px;
  }
}
.avatar.no-img {
  .make-shift-avatar {
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #409eff;
    color: #fff;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    margin-right: 8px;
  }
}
</style>
