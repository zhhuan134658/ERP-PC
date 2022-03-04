<template>
  <div id="commonTable">
    <el-table
      :border="true"
      v-if="titleList.length > 0"
      :data="houseList"
      :header-cell-style="tableHeaderClass"
      :cell-style="tableRowClass"
      @row-click="checkList"
      @header-dragend="checkWidth"
      ref="htable"
      max-height="650"
      style="width: 100%; border: 1px solid #ebeef5"
      @selection-change="handleSelectionChange"
      size="mini"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" width="55" label="序号" />
      <el-table-column
        v-for="(item, index) in titleList"
        :key="index"
        :prop="item.value"
        :label="item.label"
        :show-overflow-tooltip="true"
        align="left"
      >
      </el-table-column>
      <el-table-column label="操作" align="left" width="100">
        <template slot-scope="scope">
          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="deleteFiles(scope.row)"
          >
            <el-button
              type="text"
              slot="reference"
              icon="el-icon-delete"
              size="mini"
              >删除</el-button
            >
          </el-popconfirm>
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
    houseList: Array,
    titleList: Array,
    isFooter: Number,
    footerNumList: Array
  },
  data() {
    return {
      multSelectData: []
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
    //筛选
    handleSelectionChange(val) {
      this.multSelectData = val.map(item => {
        if (!item.id) return "";
        return item.id;
      });
      this.$emit("listenChild", this.multSelectData);
    },
    deleteFiles(row) {
      this.$emit("listenChildID", row.id);
    },
    tableHeaderClass({ row, rowIndex }) {
      return "font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px";
    },
    tableRowClass({ row, rowIndex }) {
      return "color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;";
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 200);
    },
    //查看
    checkList(row, column) {
      if (column.label != "操作") {
        let newRow = JSON.parse(JSON.stringify(row));
        this.$emit("listenChildMain", newRow);
      }
    }
  },
  mounted() {},
  watch: {
    houseList: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        // setTimeout(() => {
        //     this.adjustWidth();
        // }, 500);
      }
    },
    titleList: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        // setTimeout(() => {
        //     this.adjustWidth();
        // }, 500);
      }
    }
  }
};
</script>
