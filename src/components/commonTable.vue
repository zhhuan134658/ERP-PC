<template>
  <div id="commonTable">
    <el-table
      :border="true"
      v-loading="tableloading"
      v-if="titleList.length > 0"
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
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" width="55" label="序号" />
      <el-table-column
        v-for="(item, index) in titleList"
        :key="index"
        :prop="item.value"
        :label="item.label"
        :show-overflow-tooltip="true"
        align="left"
        :min-width="watchMinWidth(item.label)"
      >
      </el-table-column>
            <el-table-column v-if="showStatus" label="审批状态" align="left">
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
      <el-table-column v-if="jieSuanStatus" label="结算状态" align="left">
        <template slot-scope="scope">
            <span>{{scope.row.sett_status}}</span>
          <!-- <span v-if="scope.row.sett_status == '1'" style="color: #17c298"
            >已结算</span
          >
          <span v-else-if="scope.row.sett_status == '2'" style="color: #e8a54c"
            >未结算</span
          >
          <span v-else-if="scope.row.sett_status == '3'" style="color: #f16d6d"
            >无需结算</span
          ><span v-else style="color: #409eff">外部数据</span> -->
        </template>
      </el-table-column>
           <el-table-column v-if="jieSuanStatus" label="说明" align="left">
        <template slot-scope="scope">
          <span  
            >{{scope.row.explain}}</span
          >
        </template>
      </el-table-column>

            <el-table-column v-if="jieSuanStatus" label="操作" align="left">
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

      <el-table-column v-if="hasReturn" label="归还状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.wz_return === 0" style="color: #f16d6d"
            >未归还</span
          >
          <span v-else-if="scope.row.wz_return === 1" style="color: #17c298"
            >已归还</span
          >
          <span v-else style="color: #e8a54c">部分归还</span>
        </template>
      </el-table-column>
      <el-table-column v-if="hasReturn" label="归还操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            disabled
            v-if="scope.row.status !== '2'"
            >审批中</el-button
          >

          <el-button
            size="mini"
            type="text"
            disabled
            v-if="scope.row.wz_return == '1' && scope.row.status == '2'"
            >已归还</el-button
          >
          <el-button
            v-if="scope.row.wz_return != '1' && scope.row.status == '2'"
            type="text"
            size="mini"
            :disabled="!isAdmin"
            @click.stop="showReturn(scope.row.id)"
            >归还</el-button
          >
        </template>
      </el-table-column>

      <el-table-column label="付款状态" align="left" v-if="isdele">
        <template slot-scope="scope">
          <span v-if="scope.row.creationtime == '2'">已付款</span>
          <span v-else>待付款</span>
        </template>
      </el-table-column>
      <el-table-column v-if="isdele" label="操作" align="left" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.creationtime == 2"
            :disabled="scope.row.status != '2'"
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation(scope.row)"
            >撤销</el-button
          >

          <!--        -->
          <el-button
            v-if="scope.row.creationtime != 2"
            :disabled="scope.row.status != '2'"
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation(scope.row)"
            >付款</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="收款状态" align="left" v-if="isdele2">
        <template slot-scope="scope">
          <span v-if="scope.row.extend_five == '2'">已收款</span>
          <span v-else>待收款</span>
        </template>
      </el-table-column>
      <el-table-column label="付款状态" align="left" v-if="hasUpload">
        <template slot-scope="scope">
          <el-button
            v-if="!(scope.row.fk_image && scope.row.fk_image.length > 0)"
            type="text"
            size="mini"
            :disabled="
              (scope.row.fk_image && scope.row.fk_image.length > 0) ||
                scope.row.status != '2' ||
                !isAdmin
            "
            @click.stop="uploadPayment(scope.row.id)"
            >{{ scope.row.fk_image ? "已付款" : "待付款" }}</el-button
          >
          <el-button
            v-else
            type="text"
            size="mini"
            @click.stop="showImg(scope.row.fk_image)"
            >{{ "付款详情" }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="发票状态" align="left" v-if="hasUpload">
        <template slot-scope="scope">
          <el-button
            v-if="
              !(scope.row.fp_image && scope.row.fp_image.length > 0) &&
                scope.row.unit_name === '是'
            "
            type="text"
            size="mini"
            :disabled="
              (scope.row.fp_image && scope.row.fp_image.length > 0) ||
                scope.row.status != '2' ||
                !isAdmin
            "
            @click.stop="uploadInvoice(scope.row.id)"
            >{{ scope.row.fp_image ? "已收发票" : "待收发票" }}</el-button
          >
          <el-button
            v-else-if="
              scope.row.fp_image &&
                scope.row.fp_image.length > 0 &&
                scope.row.unit_name === '是'
            "
            type="text"
            size="mini"
            @click.stop="showImg(scope.row.fp_image)"
            >{{ "发票详情" }}</el-button
          >
          <el-button v-else type="text" size="mini" disabled>
            {{ "无需发票" }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="isdele2" label="操作" align="left">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.extend_five == 2"
            :disabled="scope.row.status != '2'"
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation(scope.row)"
            >撤销</el-button
          >
          <el-button
            v-if="scope.row.extend_five != 2"
            :disabled="scope.row.status != '2'"
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation(scope.row)"
            >收款</el-button
          >
        </template>
      </el-table-column>
      <el-table-column v-if="printable" label="打印" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click.stop="printPDF(scope.row.id)"
            >打印</el-button
          >
        </template>
      </el-table-column>
      <div slot="append" v-if="isFooter == 1">
        <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
          <div class="sum_footer xiaoji" ref="sum_xiaoji">
            <div class="sum_footer_unit center">小计</div>
            <div class="sum_footer_unit"></div>
            <div
              v-for="(item, index) in footerNumList"
              :key="index"
              :class="
                item.xj ? 'over_sum_text sum_footer_unit' : 'sum_footer_unit'
              "
            >
              <el-tooltip
                v-if="item.xj"
                class="item"
                effect="dark"
                :content="item.xj"
                placement="top"
              >
                <div style="text-align: left">
                  {{ item.xj }}
                </div>
              </el-tooltip>
            </div>
            <div class="sum_footer_unit"></div>
            <div v-if="isdele2" class="sum_footer_unit"></div>
            <div v-if="isdele2" class="sum_footer_unit"></div>
            <div v-if="isdele" class="sum_footer_unit"></div>
            <div v-if="isdele" class="sum_footer_unit"></div>
          </div>
          <div class="sum_footer" ref="sum_heji">
            <div class="sum_footer_unit center">合计</div>
            <div class="sum_footer_unit"></div>
            <div
              v-for="(item, index) in footerNumList"
              :key="index"
              :class="
                item.hj ? 'over_sum_text sum_footer_unit' : 'sum_footer_unit'
              "
            >
              <el-tooltip
                v-if="item.hj"
                class="item"
                effect="dark"
                :content="item.hj"
                placement="top"
              >
                <div style="text-align: left">
                  {{ item.hj }}
                </div>
              </el-tooltip>
            </div>
            <div class="sum_footer_unit"></div>
            <div v-if="isdele2" class="sum_footer_unit"></div>
            <div v-if="isdele2" class="sum_footer_unit"></div>
            <div v-if="isdele" class="sum_footer_unit"></div>
            <div v-if="isdele" class="sum_footer_unit"></div>
          </div>
        </div>
      </div>
    </el-table>
    <el-dialog title="上传图片" :visible.sync="uploadVisible">
      <img-upload
        :upImgLists="upImgList"
        :licenceImg="licenceImg"
        :isShow="isShow"
        @listenToChildEvent="show"
      />
    </el-dialog>
    <el-dialog title="查看详情" :visible.sync="showDetail">
      <div class="imgContainer">
        <img :src="uploadImg" alt="详情图片" />
      </div>
    </el-dialog>

    <el-dialog
      style="text-align:left;"
      title="归还"
      :visible.sync="returnVisible"
      @close="cancelReturn"
    >
      <div class="return_content">
        <el-form :label-position="'right'" :model="returnForm" ref="returnForm">
          <el-form-item label="物资名称">
            <el-select
              v-model="returnForm.materialId"
              @change="selectReturnMaterial"
            >
              <el-option
                v-for="item in returnForm.returnMaterialList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="已借出数量">
            <el-input v-model="returnForm.totalQuantity" disabled></el-input>
          </el-form-item>

          <el-form-item label="已归还数量">
            <el-input v-model="returnForm.returned" disabled></el-input>
          </el-form-item>
          <el-form-item label="本次归还数量">
            <el-input
              v-model="returnForm.returnNum"
              :max="returnForm.returnNumMax"
              :step="1"
              @change="roundToMax"
            ></el-input>
          </el-form-item>
          <el-form-item label="归还时间">
            <el-date-picker
              v-model="returnForm.returnTime"
              type="date"
              placeholder="选择日期"
              value-format="timestamp"
              format="yyyy-MM-dd"
              :editable="false"
              :clearable="true"
              :size="'small'"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelReturn">取 消</el-button>
        <el-button type="primary" @click="submitReturn">确 定</el-button>
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
</template>
<script>
import * as dd from "dingtalk-jsapi";
import ImgUpload from "@/components/imgUpload.vue";
export default {
  name: "commonTable",
  components: {
    ImgUpload,
  },
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
      default: false,
    },
    hasReturn: {
      type: Boolean,
      default: false,
    },
    hasUpload: {
      type: Boolean,
      default: false,
    },
    printTableName: {
      type: String,
      default: "",
    },
    showStatus: {
      type: Boolean,
      default: true,
    },
    jieSuanStatus: {
      type: Boolean,
      default: false,
    },
    daiShuaStatus: {
      type: Boolean,
      default: false,
    },
  },
  data: (props) => {
    return {
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
      multSelectData: [],
      printable: props.hasPrint,
      uploadVisible: false,
      returnVisible: false,
      producVisible: false,
      isAdmin: false,
      upImgList: [],
      isShow: [],
      licenceImg: [],
      uploadType: "payment",
      uploadImg: "",
      uploadId: 0,
      showDetail: false,
      returnForm: {
        id: null,
        totalQuantity: null,
        returnMaterialList: [],
        returnTime: "",
        materialId: null,
        returnNum: null,
        returned: null,
        maxReturnNum: null,
      },
      producitnForm: {
        id: null,
        sett_status: null,
        explain: null,
      },
    };
  },
  methods: {
    setEditMode(row) {
      row.editMode = true;
    },
    saveRow(row) {
      row.editMode = false;
    },
    setAdmin() {
      const admin = this.$store.state.userInfo.admin;
      if (admin === 1) {
        this.isAdmin = true;
      }
    },
    roundToMax(current) {
      if (current <= this.returnForm.maxReturnNum) {
        this.returnForm.returnNum = current;
      } else {
        this.returnForm.returnNum = this.returnForm.maxReturnNum;
      }
    },
    addIllustrates(item) {
      this.producVisible = true;
      this.producitnForm = item;
    },
    addIllustrate() {
      this.producVisible = false;
      this.producitnForm.sett_status = null;
      this.producitnForm.explain = null;
      this.producitnForm.id = 0;
      this.$emit("refresh");
    },
    async addShouMing() {
      var urls = "";
      if (this.daiShuaStatus) {
        urls = "/mobile/daiBrushSettlement";
      } else {
        urls = "/mobile/henanSettlement";
      }
      const returnData = {
        id: this.producitnForm.id,
        sett_status: this.producitnForm.sett_status,
        explain: this.producitnForm.explain,
      };
      const res = await this.$axios.post(urls, returnData);
      if (res.data.code === 1) {
        this.$message.success("修改成功");
        this.producVisible = false;
        this.producitnForm.sett_status = null;
        this.producitnForm.explain = null;
        this.producitnForm.id = 0;
        this.$emit("refresh");
      } else {
        this.$message.error(res.data.msg);
      }
    },
    cancelReturn() {
      this.returnVisible = false;
      this.returnForm.totalQuantity = null;
      this.returnForm.returned = 0;
      this.returnForm.returnNum = 0;
      this.returnForm.returnTime = "";
      this.returnForm.id = 0;
      this.returnForm.materialId = null;
      this.returnForm.returnMaterialList = [];
      this.$emit("refresh");
    },
    async submitReturn() {
      const returnData = {
        id: this.returnForm.id,
        re_number: this.returnForm.returned,
        ben_number: this.returnForm.returnNum,
        re_riqi: new Date(this.returnForm.returnTime).toLocaleDateString(),
        re_status:
          Number(this.returnForm.returnNum) ===
          Number(this.returnForm.maxReturnNum)
            ? "全部归还"
            : "部分归还",
      };
      const res = await this.$axios.post(
        "/project/equipmentReturnAdd",
        returnData
      );
      if (res.data.code === 1) {
        this.$message.success("归还成功");
        this.returnVisible = false;
        this.returnForm.totalQuantity = null;
        this.returnForm.returned = 0;
        this.returnForm.returnNum = 0;
        this.returnForm.returnTime = "";
        this.returnForm.id = 0;
        this.returnForm.materialId = null;
        this.returnForm.returnMaterialList = [];
        this.$emit("refresh");
      } else {
        this.$message.error(res.data.msg);
      }
    },
    async showReturn(id) {
      const res = await this.$axios.post("/project/equipmentLendDetailed", {
        id: id,
      });
      if (res.data.code === 1) {
        if (res.data.data && res.data.data.length > 0) {
          const data = res.data.data;
          data.forEach((e) => {
            const material = {
              name: e.name,
              id: e.id,
              returnNumMax: e.quantity - e.re_number,
              returned: e.re_number,
              totalQuantity: e.quantity,
            };
            this.returnForm.returnMaterialList.push(material);
          });
        }
        this.returnVisible = true;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    selectReturnMaterial(id) {
      const currentMaterial = this.returnForm.returnMaterialList.find(
        (e) => e.id === id
      );
      this.returnForm.id = currentMaterial.id;
      this.returnForm.maxReturnNum = currentMaterial.returnNumMax;
      this.returnForm.returned = currentMaterial.returned;
      this.returnForm.totalQuantity = currentMaterial.totalQuantity;
    },
    async show(data) {
      console.log(data);
      let imgURL = "";
      switch (this.uploadType) {
        case "payment":
          imgURL = data[0];
          break;
        case "invoice":
          imgURL = data[0];
          break;
      }
      if (imgURL) {
        this.uploadImg = imgURL;
        this.uploadVisible = false;
        const uploadId = this.uploadId;
        const uploadType = this.uploadType;
        const uploadImg = imgURL;
        const uploadRes = await this.$axios.post(
          "/project/hardPurApplyUpload",
          {
            id: uploadId,
            type: uploadType === "payment" ? "fk_image" : "fp_image",
            url: uploadImg,
          }
        );
        if (uploadRes.data.code === 1) {
          this.$message.success("上传成功");
          this.licenceImg = [];
          this.$emit("upload", imgURL);
        } else {
          this.$message.error(uploadRes.data.msg);
          this.upImgList = [];
          this.licenceImg = [];
        }
      }
    },
    showImg(url) {
      this.uploadImg = url;
      this.showDetail = true;
    },
    uploadInvoice(id) {
      this.uploadType = "invoice";
      this.uploadVisible = true;
      this.uploadId = id;
    },
    uploadPayment(id) {
      this.uploadType = "payment";
      this.uploadVisible = true;
      this.uploadId = id;
    },
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
        id: id,
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
      this.multSelectData = val.map((item) => {
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
        dd.ready(function () {
          dd.biz.util.openSlidePanel({
            url: newUrl, //打开侧边栏的url
            title: "详情", //侧边栏顶部标题
            onSuccess: function () {},
            onFail: function () {},
          });
        });
      }
    },
  },
  mounted() {
    this.setAdmin();
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
      },
    },
    titleList: {
      //深度监听，可监听到对象、数组的变化
      handler() {
        setTimeout(() => {
          this.adjustWidth();
        }, 500);
      },
    },
  },
};
</script>

<style lang="less">
.el-table__row.statistics-warning-row {
  background: #f1f8ff;
}

.el-table tr {
  height: 49px;
}
.imgContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 650px;
  }
}
</style>
