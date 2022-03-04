<template>
  <div class="main">
    <div class="top">
      <div class="title">我的订单</div>
      <div class="but">
        <el-button size="small" @click="goback">返回</el-button>
      </div>
    </div>
    <div class="xian">
      <el-divider></el-divider>
    </div>
    <div class="table">
      <el-table
        :border="true"
        :data="orders"
        :header-cell-style="tableHeaderClass"
        :cell-style="tableRowClass"
        style="border: 1px solid #ebeef5"
        size="mini"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" label="序号" width="55" />
        <el-table-column label="订单名称" prop="item_name" />
        <el-table-column label="订单编号" prop="order_id" />
        <el-table-column label="订单金额" prop="pay_fee" />
        <el-table-column label="购买时长(天)" prop="duration" />
        <el-table-column label="到期时间" prop="end_time" />
        <el-table-column label="已用人数" prop="use_people" />
        <el-table-column label="剩余人数" prop="surplus_people" />
        <el-table-column label="发票状态" prop="b_status">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.b_status == 0"
              @click="handleClick(scope.row)"
              type="primary"
              >开具发票</el-button
            >
            <span
              v-else-if="scope.row.b_status == 1"
              style="color: #15bc83"
              @click="handleClick(scope.row)"
              >开票中 ></span
            >
            <span
              v-else-if="scope.row.b_status == 2"
              style="color: #15bc83"
              @click="handleClick(scope.row)"
              >开票成功 ></span
            >
            <span v-else-if="scope.row.b_status == 3"> </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Orders",
  data() {
    return {
      orders: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleClick(data) {
      this.$router.push({ path: "/system/Invoice", query: { data } });
    },
    tableHeaderClass({ row, rowIndex }) {
      return "font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px";
    },
    tableRowClass({ row, rowIndex }) {
      return "color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;border-color:#F1F8FF;";
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "statistics-warning-row";
      } else {
        return "";
      }
    },
    goback() {
      this.$router.push({ path: "/system/valueAdded" });
    },
    getList() {
      this.$axios.post("/finance/order_list").then(res => {
        this.orders = res.data.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  background: #fff;
  border-radius: 5px;
  .top {
    display: flex;
    justify-content: space-between;
    padding: 30px 40px 0px 40px;
    .title {
      color: #666;
      font-weight: bold;
      font-size: 18px;
    }
  }
  .xian {
    margin-top: 20px;
    .el-divider--horizontal {
      margin: 0px;
    }
  }
  .table {
    padding: 30px;
    min-height: 620px;
  }
}
</style>
