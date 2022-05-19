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
              <el-form-item label="企业名称:">
                <el-input
                  v-model="formInline.corp_name"
                  clearable
                  placeholder="请输入项目名称"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="订单号:">
                <el-input
                  v-model="formInline.order_sn"
                  clearable
                  placeholder="请输入项目名称"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="开始日期:">
                <el-date-picker
                  v-model="formInline.start_time"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束日期:">
                <el-date-picker
                  v-model="formInline.end_time"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="开票状态:">
                <el-select v-model="formInline.status" clearable>
                  <el-option value="2" label="开票中" />
                  <el-option value="3" label="已开票" />
                  <el-option value="1" label="未开票" />
                </el-select>
              </el-form-item>
              <el-form-item label="代理商:">
                <el-input
                  v-model="formInline.agent"
                  clearable
                  placeholder="请输入项目名称"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="业务员:">
                <el-input
                  v-model="formInline.salesman"
                  clearable
                  placeholder="请输入项目名称"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="返现时间:">
                <el-date-picker
                  v-model="formInline.ding_back_time"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="客服人员:">
                <el-input
                  v-model="formInline.customer_person"
                  clearable
                  placeholder="请输入项目名称"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="客户来源:">
                <el-input
                  v-model="formInline.customer_source"
                  clearable
                  placeholder="请输入项目名称"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="代理商返现时间:">
                <el-date-picker
                  v-model="formInline.agent_back_time"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
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
            <!-- <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-download"
              @click="exportList"
              >导出</el-button
            > -->
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
          v-loading="loading"
        >
          <el-table-column
            type="selection"
            width="55"
            :selectable="selectable"
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
            prop="order_time"
            label="下单时间"
            width="180"
            v-if="type === 'zk'"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="end_time"
            width="180"
            label="到期时间"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="salesman"
            width="180"
            label="业务员"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="agent"
            width="180"
            label="代理商"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="ding_back_moeny"
            label="钉钉返现金额"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="ding_back_time"
            label="返现时间"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="customer_source"
            label="客户来源"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="customer_person"
            label="客服人员"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="agent_back_money"
            label="代理商返现金额"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="agent_back_time"
            label="代理商返现时间"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="180"
            prop="b_status"
            label="发票状态"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.b_status == 2"
                @click="jupDetail(scope.row.id)"
                >已开发票</span
              >
              <span
                v-else-if="scope.row.b_status == 1"
                @click="jupDetail(scope.row.id)"
                >开票中</span
              >
              <span v-else-if="scope.row.b_status == 0">未开票</span>
              <span v-else>数据有误</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                :disabled="!scope.row.b_status >= 1"
                @click="showBindForm(scope.row)"
                type="text"
                size="mini"
                >绑定</el-button
              >
              <el-button
                v-if="scope.row.b_status >= 1"
                type="text"
                size="mini"
                @click="showUpload(scope.row.id)"
                >上传发票</el-button
              >
              <el-button
                v-if="scope.row.b_status >= 1"
                type="text"
                size="mini"
                @click="getInvoiceDetail(scope.row.id)"
                >查看发票</el-button
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
      <!-- 新增绑定弹窗 -->
      <el-dialog :visible.sync="bindVisible" @close="cancelBind">
        <el-form>
          <el-form-item label="业务员">
            <el-input v-model="bindForm.salesman" />
          </el-form-item>
          <el-form-item label="代理商">
            <el-input v-model="bindForm.agent" />
          </el-form-item>
          <el-form-item label="钉钉返现金额">
            <el-input v-model="bindForm.ding_back_moeny" />
          </el-form-item>
          <el-form-item label="返现时间">
            <el-date-picker
              v-model="bindForm.ding_back_time"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="客户来源">
            <el-input v-model="bindForm.customer_source" />
          </el-form-item>
          <el-form-item label="客服人员">
            <el-input v-model="bindForm.customer_person" />
          </el-form-item>
          <el-form-item label="代理商返现金额">
            <el-input v-model="bindForm.agent_back_money" />
          </el-form-item>
          <el-form-item label="代理商返现时间">
            <el-date-picker
              v-model="bindForm.agent_back_time"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelBind">取 消</el-button>
          <el-button type="primary" @click="submitBind">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 上传发票弹窗 -->
      <el-dialog :visible.sync="uploadInvoiceVisible" @close="cancelUpload">
        <el-form>
          <el-form-item label="发票编号">
            <el-input v-model="invoiceForm.invoiceNumber" />
          </el-form-item>
        </el-form>
        <img-upload
          :upImgLists="upImgList"
          :licenceImg="licenceImg"
          :isShow="isShow"
          @listenToChildEvent="show"
        />
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelUpload">取 消</el-button>
          <el-button type="primary" @click="submitUpload">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 显示发票弹窗 -->
      <el-dialog :visible.sync="invoiceDetailVisible">
        <el-descriptions title="发票详情">
          <el-descriptions-item label="发票编号">
            <span class="descriptionDetail">{{
              invoiceDetail.extend_first
            }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="发票类型">
            <span class="descriptionDetail">{{ invoiceDetail.type }} </span>
          </el-descriptions-item>
          <el-descriptions-item label="发票抬头">
            <span class="descriptionDetail"
              >{{ invoiceDetail.invoice_header }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item label="发票金额">
            <span class="descriptionDetail">
              {{ invoiceDetail.invoice_money }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item label="税号">
            <span class="descriptionDetail">{{
              invoiceDetail.duty_paragraph
            }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="开户行">
            <span class="descriptionDetail">{{
              invoiceDetail.bank_deposit
            }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="开户行账号">
            <span class="descriptionDetail">{{
              invoiceDetail.account_bank
            }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="公司电话">
            <span class="descriptionDetail">{{
              invoiceDetail.company_mobile
            }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="地址">
            <span class="descriptionDetail">{{
              invoiceDetail.company_address
            }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="发票状态">
            <span class="descriptionDetail">{{
              invoiceDetail.invoice_status
            }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="发票图片">
            <img
              :src="invoiceDetail.image"
              alt="发票图片"
              :style="{
                display: 'block',
                maxWidth: '120px',
                maxHeight: '90px',
              }"
            />
          </el-descriptions-item>
          <el-descriptions-item label="邮寄地址">
            <span class="descriptionDetail">{{
              invoiceDetail.recipient_address
            }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="电子邮箱">
            <span class="descriptionDetail">{{
              invoiceDetail.recipient_email
            }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import ImgUpload from "@/components/imgUpload.vue";
export default {
  name: "hardwarePurchase",
  props: {
    type: {
      type: String,
      default: "zk",
    },
  },
  components: {
    ImgUpload,
  },
  data() {
    return {
      formInline: {
        corp_name: "",
        order_sn: "",
        start_time: "",
        end_time: "",
        salesman: "",
        agent: "",
        ding_back_time: "",
        customer_source: "",
        customer_person: "",
        agent_back_time: "",
        status: "",
      },
      loading: false,
      bindVisible: false,
      pageType: "",
      uploadUrl: {
        uploadInvoice: "/order/up_order",
        orderList: "/order/order",
        orderAddBind: "/order/order_news_add",
        invoiceDetail: "/order/invoicingInfoDetails",
      },
      apiUrl: {
        zk: {
          uploadInvoice: "/order/up_order",
          orderList: "/order/order",
          orderAddBind: "/order/order_news_add",
          invoiceDetail: "/order/invoicingInfoDetails",
        },
        labor: {
          uploadInvoice: "/order/laowuup_order",
          orderList: "/order/laowuorder",
          orderAddBind: "/order/laowuorder_news_add",
          invoiceDetail: "/order/laowuordercontentfapiao",
        },
        uniteConstruct: {
          uploadInvoice: "/order/xiezhuup_order",
          orderList: "/order/xiejianorder",
          orderAddBind: "/order/xiezhuorder_news_add",
          invoiceDetail: "/order/xiezhuordercontentfapiao",
        },
        cert: {
          uploadInvoice: "/order/zhengshuup_order",
          orderList: "/order/zhengshuorder",
          orderAddBind: "/order/zhengshuorder_news_add",
          invoiceDetail: "/order/zhengshuordercontentfapiao",
        },
      },
      bindForm: {
        id: "",
        salesman: "", //业务员
        agent: "", //代理商
        ding_back_time: "", //钉钉返现时间
        ding_back_moeny: "", //钉钉返现金额
        customer_source: "", //客户来源
        customer_person: "", //客服人员
        agent_back_time: "", //代理商返现时间
        agent_back_money: "", //代理商返现金额
      },
      uploadInvoiceVisible: false,
      invoiceForm: {
        invoiceNumber: "",
      },
      upImgList: [],
      licenceImg: [],
      isShow: [],
      uploadImg: "",
      uploadId: 0,
      invoiceDetailVisible: false,
      invoiceDetail: {
        extend_first: "",
        type: "",
        invoice_header: "",
        invoice_money: "",
        duty_paragraph: "",
        bank_deposit: "",
        account_bank: "",
        company_mobile: "",
        company_address: "",
        recipient_address: "",
        invoice_status: "",
        image: "",
        recipient_email: "",
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
    jupDetail(data) {
      this.$router.push({ path: "/spreadsheet/Invoice", query: { data } });
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
    async show(data) {
      let imgURL = data[0];
      if (imgURL) {
        this.uploadImg = imgURL;
      }
    },
    async submitUpload() {
      const uploadId = this.uploadId;
      const uploadImg = this.uploadImg;
      const uploadRes = await this.$axios.post(this.uploadUrl.uploadInvoice, {
        id: uploadId,
        invoice_number: this.invoiceForm.invoiceNumber,
        invoice_image: uploadImg,
      });
      if (uploadRes.data.code === 1) {
        this.$message.success("上传成功");
        this.resetUpload();
        this.uploadInvoiceVisible = false;
      } else {
        this.$message.error(uploadRes.data.msg);
      }
    },
    resetUpload() {
      this.upImgList = [];
      this.licenceImg = [];
      this.uploadImg = "";
      this.uploadId = 0;
      this.invoiceForm.invoiceNumber = "";
    },
    showUpload(id) {
      this.uploadId = id;
      this.uploadInvoiceVisible = true;
    },
    cancelUpload() {
      this.resetUpload();
      this.uploadInvoiceVisible = false;
    },
    async getInvoiceDetail(id) {
      const res = await this.$axios.post(this.uploadUrl.invoiceDetail, {
        gl_id: id,
      });
      if (res.data.code === 1) {
        this.invoiceDetail = res.data.data;
        this.invoiceDetailVisible = true;
      } else {
        this.$message.error(res.data.msg);
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
    resetBindForm() {
      this.bindForm = {
        id: "",
        salesman: "", //业务员
        agent: "", //代理商
        ding_back_time: "", //钉钉返现时间
        ding_back_moeny: "", //钉钉返现金额
        customer_source: "", //客户来源
        customer_person: "", //客服人员
        agent_back_time: "", //代理商返现时间
        agent_back_money: "", //代理商返现金额
      };
    },
    showBindForm(row) {
      this.bindVisible = true;
      this.bindForm.id = row.id;
      this.bindForm.salesman = row.salesman;
      this.bindForm.agent = row.agent;
      this.bindForm.ding_back_time = row.ding_back_time;
      this.bindForm.ding_back_moeny = row.ding_back_moeny;
      this.bindForm.customer_source = row.customer_source;
      this.bindForm.customer_person = row.customer_person;
      this.bindForm.agent_back_time = row.agent_back_time;
      this.bindForm.agent_back_money = row.agent_back_money;
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
        corp_name: "",
        order_sn: "",
        start_time: "",
        end_time: "",
        salesman: "",
        agent: "",
        ding_back_time: "",
        customer_source: "",
        customer_person: "",
        agent_back_time: "",
        status: "",
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
          ...this.formInline,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.loading = false;
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
    const type = this.type;
    if (type) {
      this.uploadUrl = this.apiUrl[type];
    }
  },
  watch: {
    "$route.params.type": {
      handler: function (val) {
        this.uploadUrl = this.apiUrl[val];
        this.getList();
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {},
};
</script>
<style lang="less" scoped>
.descriptionDetail {
  color: #666;
}
</style>
