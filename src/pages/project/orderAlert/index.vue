/* * @Author: NorthWind * @Date: 2020-12-08 09:54:27 * @Last Modified by:
NorthWind * @Last Modified time: 2022-01-13 09:31:02 */
<template>
  <div class="container-main" id="hardwareLend">
    <!--订单一览表 -->
    <div class="main">
      <div class="header">
        <div class="headerContent">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <div class="hlBottom">
              <el-form-item label="到期前:">
                <el-select v-model="formInline.due_date" clearable>
                  <el-option value="1" label="一个月" />
                  <el-option value="2" label="半个月" />
                  <el-option value="3" label="三个月" />
                  <el-option value="4" label="一星期" />
                  <el-option value="5" label="已逾期" />
                </el-select>
              </el-form-item>
              <el-form-item label="续费状态:">
                <el-select v-model="formInline.renew" clearable>
                  <el-option value="1" label="是" />
                  <el-option value="0" label="否" />
                </el-select>
              </el-form-item>
              <el-form-item label="备注:">
                <el-select v-model="formInline.remarks_status" clearable>
                  <el-option value="1" label="已填" />
                  <el-option value="0" label="未填" />
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
        <el-tabs v-model="activeName">
          <el-tab-pane label="筑快OA" name="zk"></el-tab-pane>
          <el-tab-pane label="证书管理" name="cert"></el-tab-pane>
          <el-tab-pane label="协同建设" name="uniteConstruct"></el-tab-pane>
          <el-tab-pane label="劳务实名制" name="labor"></el-tab-pane>
        </el-tabs>
        <el-row class="maincBtn mainMoveBtn">
          <div class="mmbLeft"></div>
          <div class="mmbRight">
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
        <el-table :data="tpList" border v-loading="loading">
          <el-table-column
            type="index"
            width="55"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="corp_name"
            width="180"
            label="企业名称"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="item_name"
            width="180"
            label="订单名称"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="order_id"
            width="180"
            label="订单编号"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="pay_fee"
            width="180"
            label="订单金额"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="duration"
            label="购买时长(天)"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="service_stop_time"
            width="180"
            label="到期时间"
          >
            <template slot-scope="scope">
              <span>{{ convertDate(scope.row.service_stop_time) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="status"
            width="180"
            label="续费状态"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.status === "1" ? "续费" : " 不续费" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="oa_remarks_status"
            width="180"
            label="备注状态"
          >
            <template slot-scope="scope">
              <span>{{
                scope.row.oa_remarks_status === "1" ? "已填写" : " 未填写"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="status"
            width="180"
            label="续费状态"
          >
            <template slot-scope="scope">
              <el-checkbox
                @change="submitUpload(scope.row)"
                v-model="scope.row.status"
                true-label="1"
                false-label="0"
                >续费</el-checkbox
              >
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                @click="showBindForm(scope.row)"
                type="text"
                size="mini"
                >写小计</el-button
              >
              <el-button type="text" size="mini" @click="showSub(scope.row)"
                >查看</el-button
              >
            </template>
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
      </div>
      <!-- 新增绑定弹窗 -->
      <el-dialog :visible.sync="bindVisible" @close="cancelBind">
        <el-form>
          <el-form-item>
            <el-input
              v-model="bindForm.oa_remarks"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入小计"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelBind">取 消</el-button>
          <el-button type="primary" @click="submitBind">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 显示发票弹窗 -->
      <el-dialog
        :visible.sync="invoiceDetailVisible"
        title="小计详情"
        width="30%"
      >
        <el-timeline v-if="oaRemarks.length > 0" :reverse="true">
          <el-timeline-item
            v-for="(item, index) in oaRemarks"
            :key="index"
            :timestamp="item.oa_remarks_date"
            placement="top"
          >
            <el-card>
              <div class="user-info">
                <div class="avatar" v-if="item.oa_user_info && item.name">
                  <img :src="item.oa_user_info" :alt="item.name + '头像'" />
                </div>
                <div class="no-avatar" v-else-if="item.name">
                  {{
                    2 >= item.name.length
                      ? item.name
                      : item.name.substr(item.name.length - 2, 2)
                  }}
                </div>
                <div class="no-avatar" v-else>
                  无名
                </div>

                <span>{{ item.name ? item.name : "无名氏" }}</span>
              </div>
              <p>{{ item.oa_remarks }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <div v-else class="emptyPlaceholder" style="text-align:center">
          <img
            :style="{ width: '50%', height: 'auto' }"
            src="@/assets/images/empty.png"
            alt="暂无信息"
          />
          <h1>暂无小计</h1>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "hardwarePurchase",
  props: {
    type: {
      type: String,
      default: "zk"
    }
  },
  data() {
    return {
      formInline: {
        due_date: "",
        renew: "",
        remarks_status: ""
      },
      loading: false,
      bindVisible: false,
      pageType: "",
      uploadUrl: {
        uploadInvoice: "/order/renew_status",
        orderList: "/order/order_warning",
        orderAddBind: "/order/add_remarks",
        invoiceDetail: "/order/see"
      },
      activeName: "zk",
      apiUrl: {
        zk: {
          uploadInvoice: "/order/renew_status",
          orderList: "/order/order_warning",
          orderAddBind: "/order/add_remarks",
          invoiceDetail: "/order/see"
        },
        labor: {
          uploadInvoice: "/order/renew_status",
          orderList: "/order/laowuorder_warning",
          orderAddBind: "/order/add_remarks",
          invoiceDetail: "/order/see"
        },
        uniteConstruct: {
          uploadInvoice: "/order/renew_status",
          orderList: "/order/xiezhuorder_warning",
          orderAddBind: "/order/add_remarks",
          invoiceDetail: "/order/see"
        },
        cert: {
          uploadInvoice: "/order/renew_status",
          orderList: "/order/zhengshuorder_warning",
          orderAddBind: "/order/add_remarks",
          invoiceDetail: "/order/see"
        }
      },
      bindForm: {
        id: "",
        oa_remarks: ""
      },
      uploadInvoiceVisible: false,
      upImgList: [],
      licenceImg: [],
      isShow: [],
      uploadImg: "",
      uploadId: 0,
      invoiceDetailVisible: false,
      oaRemarks: [],
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
      editingRow: "",
      showExtendEdit: false,
      extendForm: {
        extend_first: "",
        extend_two: ""
      },
      checkedLists: [],
      titleList: [],
      allProjectList: [],
      subTotalList: []
    };
  },
  methods: {
    getMult(val) {
      this.multSelectData = val;
    },
    convertDate(date) {
      let timeStamp = Number(date) * 1000;
      const dates = new Date(timeStamp);
      return dates.toLocaleDateString();
    },
    selectable(row) {
      if (row.id === "subtotal" || row.id === "total") {
        return false;
      } else {
        return true;
      }
    },
    async show(data) {
      let imgURL = data[0];
      if (imgURL) {
        this.uploadImg = imgURL;
      }
    },
    async submitUpload(row) {
      try {
        const uploadRes = await this.$axios.post(this.uploadUrl.uploadInvoice, {
          id: row.id,
          renew: row.status
        });
        if (uploadRes.data.code === 1) {
          this.$message.success("修改成功");
          this.getList();
        } else {
          this.$message.error(uploadRes.data.msg);
        }
      } catch (error) {
        console.error(error);
        this.$message.error(error);
        this.getList();
      }
    },
    async submitBind() {
      const url = this.uploadUrl.orderAddBind;
      try {
        const res = await this.$axios.post(url, this.bindForm);
        if (res.data.code === 1) {
          this.$message.success("操作成功");
          this.bindVisible = false;
          this.resetBindForm();
          this.getList();
        } else {
          this.$message.error(res.data.msg);
        }
      } catch (error) {
        this.$message.error("操作失败");
        console.error(error);
      }
    },
    async showSub(row) {
      const url = this.uploadUrl.invoiceDetail;
      try {
        const res = await this.$axios.post(url, {
          id: row.id
        });
        if (res.data.code === 1) {
          console.log("OARemarks", Array.isArray(res.data.oa_remarks));
          if (Array.isArray(res.data.oa_remarks)) {
            this.oaRemarks = res.data.oa_remarks;
          } else {
            this.oaRemarks = [res.data.oa_remarks];
          }
        }
        this.invoiceDetailVisible = true;
      } catch (error) {
        console.error(error);
      }
    },
    resetBindForm() {
      this.bindForm = {
        id: "",
        oa_remarks: ""
      };
    },
    showBindForm(row) {
      this.bindVisible = true;
      this.bindForm.id = row.id;
    },
    cancelBind() {
      this.bindVisible = false;
      this.resetBindForm();
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
        due_date: "",
        renew: "",
        remarks_status: ""
      };
      this.getList();
    },
    updateList() {
      this.getList(1);
    },
    //获取列表
    getList(ntype) {
      this.loading = true;
      this.$axios
        .post(this.uploadUrl.orderList, {
          page: this.currentPage,
          number: this.pagesize,
          ...this.formInline
        })
        .then(res => {
          if (res.data.code == 1) {
            this.loading = false;
            if (ntype == 1) {
              this.$message({
                message: "列表刷新成功",
                type: "success",
                duration: 1500
              });
            }
            this.total = res.data.count;
            this.tpList = res.data.data;
            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.page_number;
              this.getList();
            }
          } else {
            this.loading = false;
            console.error(res.data.msg);
            this.$message.error(`Bad Request ${res.data.msg}`);
          }
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  },
  mounted() {
    this.allProjectList = JSON.parse(this.$store.state.allPro);
    this.getList();
  },
  created() {
    this.$utils.checkding();
    // this.$utils.utilAllProject();
    this.approvalStatus = this.$utils.utilApprovalStatus();
    const type = this.activeName;
    if (type) {
      this.uploadUrl = this.apiUrl[type];
    }
  },
  watch: {
    activeName: {
      handler: function(val, prevVal) {
        if (val !== prevVal) {
          this.formInline = {
            due_date: "",
            renew: "",
            remarks_status: ""
          };
          this.currentPage = 1;
          this.uploadUrl = this.apiUrl[val];
          this.getList();
        }
      }
    }
  },
  computed: {}
};
</script>
<style lang="less" scoped>
.descriptionDetail {
  color: #666;
}
.no-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  font-size: 10px;
}
.avatar {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.user-info {
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px dashed #ccc;
  span {
    font-size: 12px;
    color: #666;
    margin-left: 8px;
  }
}
</style>
