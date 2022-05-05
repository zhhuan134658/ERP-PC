<template>
  <div class="main">
    <div class="header">
      <div class="user-info">
        <div class="left">
          <!-- <div class="avatar">
            <img v-if="circleUrl" :src="circleUrl" />
            <img v-else src="@/assets/menu/YH.png" />
          </div>
          <div class="name-version">
            <div class="name">{{ name }}</div>
            <div class="version-info">
              {{ orderInfo.item_name }}
            </div>
          </div> -->
          <div>筑快OA</div>
        </div>
        <!-- <div class="right">
                    <div class="but">
                        <el-button
                            type="primary"
                            @click="jumpOrder"
                            size="small"
                            >我的订单</el-button
                        >
                    </div>
                    <div class="order-num-date">
                        <div class="date">
                            <div class="label">订单日期</div>
                            <div class="value">{{ orderInfo.open_time }}</div>
                        </div>
                        <div class="num">
                            <div class="label">订单编号</div>
                            <div class="value">{{ orderInfo.order_id }}</div>
                        </div>
                    </div>
                </div> -->
      </div>
      <div style="margin: 20px 40px">
        <el-divider />
      </div>
      <div class="order-info">
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
          <el-table-column label="购买时间" prop="open_time" />
          <el-table-column label="到期时间" prop="end_time" />
          <el-table-column label="已用人数" prop="use_people" />
          <el-table-column label="剩余人数" prop="surplus_people" />

          <el-table-column show-overflow-tooltip prop="surplus_people">
            <template slot="header">
              <span>发票状态</span>
              <a-icon
                @click="iconClick"
                style="margin-left: 5px"
                type="question-circle"
              />
            </template>
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.b_status == 0"
                @click="handleClick(scope.row)"
                type="primary"
                size="mini"
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

          <!-- <el-table-column label="发票状态" prop="b_status">
                        <template slot-scope="scope">
                            <el-button
                                v-if="scope.row.b_status == 0"
                                @click="handleClick(scope.row)"
                                type="primary"
                                size="mini"
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
                    </el-table-column> -->
        </el-table>
      </div>
    </div>
    <div class="goods">
      <div class="top">
        <div class="logo">
          <img src="@/assets/images/logo.png" />
        </div>
        <div><el-divider direction="vertical" /></div>
        <div class="title">更多产品服务</div>
      </div>
      <div class="items">
        <div class="item" @click="goods1">
          <img src="@/assets/images/goods1.png" />
        </div>
        <div class="item" @click="goods2">
          <img src="@/assets/images/goods2.png" />
        </div>
        <div class="item" @click="goods3">
          <img src="@/assets/images/goods3.png" />
        </div>
      </div>
    </div>
    <el-dialog
      title="在线开票常见问题"
      class="icondie"
      :visible.sync="iconVisible"
      width="60%"
    >
      <div class="iconTtle">
        <!-- <div class="icon1">
                    <div class="icon2"></div>
                    <div class="icon3">在线开票常见问题</div>
                </div> -->
        <div class="icon4">
          <div class="icon_tit">
            1、电子发票和纸质发票分别怎么提供?
          </div>
          <div class="icon_font">
            电子发票：申请时需要填写您的邮箱地址，发票会发往您填写的电子邮箱中。
          </div>
          <div class="icon_font">
            纸质发票：我们会以快递的形式寄出，发票开好后您可以在“发票详情”中查询到快递单号。
          </div>
          <div class="icon_tit">2、发票开票进度如何查看?</div>
          <div class="icon_font">
            您可以在“发票详情”中查询到开票进度，发票开好后，您可以在系统中看到发票号码和快递单号。
          </div>
          <div class="icon_tit">3、发票开票信息错误，如何退换票?</div>
          <div class="icon_font">
            请您对开票信息和收票地址务必仔细填写并检查，如果发票信息有误需要退换票，请联系客服处理。
          </div>
        </div>
      </div>
      <div class="ivon_bto">
        <div>客服热线：13949010263 (黄女士)</div>
        <div>在线人工：手机端-我的-我的客服-在线咨询</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SystemValueAdded",
  data() {
    return {
      iconVisible: false,
      orders: [],
      circleUrl: "",
      name: "",
      orderInfo: {}
    };
  },
  created() {
    this.circleUrl = this.$store.state.userInfo.avatar
      ? this.$store.state.userInfo.avatar
      : "";
    this.name = this.$store.state.userInfo.uname;
    this.getList();
  },
  methods: {
    iconClick() {
      this.iconVisible = true;
    },
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
    },
    jumpOrder() {
      this.$router.push({
        path: "/system/orders"
      });
    },

    goods1() {
      window.location.href =
        "https://h5.dingtalk.com/appcenter/index-pc.html?corpId=dingea47c602975497f935c2f4657eb6378f#/detail/DT_GOODS_881600848240673";
    },
    goods2() {
      window.location.href =
        "https://h5.dingtalk.com/appcenter/index-pc.html?corpId=dingea47c602975497f935c2f4657eb6378f#/detail/DD_GOODS-101001037004";
    },
    goods3() {
      window.location.href =
        "https://h5.dingtalk.com/appcenter/index-pc.html?corpId=dingea47c602975497f935c2f4657eb6378f#/detail/DT_GOODS_881611736069676";
    }
  }
};
</script>

<style lang="less">
.main {
  .header {
    background: #ffffff;
    border-radius: 5px;
    min-height: 232px;
    padding: 10px;
    .user-info {
      padding: 30px 40px 0px 40px;
      display: flex;
      justify-content: space-between;
      height: 48px;
      .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        .avatar {
          height: 48px;
          width: 48px;
          img {
            height: 100%;
            width: 100%;
            border-radius: 30px;
          }
        }
        .name-version {
          display: flex;
          flex-direction: column;
          margin-left: 15px;
          .name {
            font-size: 14px;
            font-weight: 600;
            color: #333333;
          }
          .version-info {
            font-size: 12px;
            font-weight: 400;
            color: #999999;
          }
        }
      }
      .right {
        display: flex;
        flex-direction: row;
        align-items: center;
        .order-num-date {
          margin-left: 15px;
          .date,
          .num {
            display: flex;
            flex-direction: row;
            .label {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #666666;
            }
            .value {
              margin-left: 20px;
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #333333;
            }
          }
        }
      }
    }
    .order-info {
      padding: 0px 40px 0px 40px;
    }
  }
  .goods {
    margin-top: 20px;
    min-height: 520px;
    background: #ffffff;
    border-radius: 5px;
    .top {
      padding: 30px 40px 0px 40px;
      display: flex;
      flex-direction: row;
      height: 20px;
      .logo {
        margin-top: 3px;
        width: 78px;
        height: 13px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        color: #000000;
      }
    }
    .items {
      margin: 0px 35px 30px 35px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        width: 480px;
        height: 220px;
        padding: 40px 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.icondie {
  .el-dialog {
    border-radius: 0px 0px 7px 7px;
    .el-dialog__body {
      padding: initial !important;
    }
  }

  .iconTtle {
    .icon1 {
      display: flex;
      align-items: center;
      .icon2 {
        width: 3px;
        height: 12px;
        background: #3093f6;
        border-radius: 2px;
        margin-right: 10px;
      }
      .icon3 {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
      }
    }
    .icon4 {
      margin-left: 30px;
      .icon_tit {
        margin-top: 20px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #3296fa;
        line-height: 40px;
      }
      .icon_font {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        line-height: 40px;
      }
    }
  }
  .ivon_bto {
    width: 100%;
    height: 85px;
    background: #3296fa;
    opacity: 0.9;
    border-radius: 0px 0px 7px 7px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 30px;
    padding: 15px 30px;
  }
}
</style>
