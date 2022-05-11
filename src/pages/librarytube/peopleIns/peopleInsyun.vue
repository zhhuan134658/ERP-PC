/* * @Author: NorthWind * @Date: 2020-12-14 16:06:31 * @Last Modified by:
mikey.zhaopeng * @Last Modified time: 2022-02-24 16:49:54 */
<template>
  <div id="materialBasic">
    <div class="main">
      <div class="content">
        <div class="header">
          <div class="headerContent">
            <el-form
              @submit.native.prevent
              :inline="true"
              :model="formInline"
              label-width="120px"
              class="demo-form-inline"
            >
              <div class="hlBottom" style="display: flex">
                <div style="text-align: center">
                  <el-button size="medium" type="primary" plain @click="jupBack"
                    >返回资产列表</el-button
                  >
                </div>
                <!-- <el-form-item label="创建人:">
                    
                  <el-input
                    v-model="addUserForm.name2"
                    clearable
                    placeholder=""
                    @keyup.enter.native="searchClick"
                  ></el-input>
                </el-form-item> -->
                <el-form-item label="高级搜索:">
                  <el-input
                    v-model="addUserForm.name2"
                    clearable
                    placeholder=""
                    @keyup.enter.native="searchClick"
                  ></el-input>
                </el-form-item>
                <div style="text-align: center">
                  <el-button size="medium" type="primary" @click="searchClick"
                    >搜索</el-button
                  >
                  <el-button size="medium" type="primary" @click="searchClick"
                    >重置</el-button
                  >
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mainContent">
          <el-row class="maincBtn mainMoveBtn">
            <div class="mmbRight">
              <!-- <el-button
                type="primary"
                plain
                size="medium"
                @click="exportIn"
                >打印</el-button
              >
              <el-button
                type="primary"
                plain
                size="medium"
                @click="exportList"
                >导入</el-button
              > -->
            </div>
          </el-row>
          <div class="basicCreate">
            <div
              class="bcRight"
              style="border: 1px solid #dde0e2; margin-left: -1px; width: 100%"
            >
              <el-table
                :border="true"
                :data="houseList"
                :header-cell-style="tableHeaderClass"
                :cell-style="tableRowClass"
                max-height="547"
                style="width: 100%; border: 1px solid #ebeef5"
                @row-click="editPeopleInfo"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                size="mini"
                :row-class-name="tableRowClassName"
              >
                <el-table-column type="selection" width="55" fixed>
                </el-table-column>
                <el-table-column prop="sitenumber" label="订单号" align="left">
                </el-table-column>
                <el-table-column prop="name" label="收货人" align="left">
                </el-table-column>
                <el-table-column prop="name" label="收货地址" align="left">
                </el-table-column>
                <el-table-column prop="name" label="资产分类" align="left">
                </el-table-column>
                <el-table-column prop="name" label="所属公司" align="left">
                </el-table-column>
                <el-table-column prop="name" label="设备序列号" align="left">
                </el-table-column>
                <el-table-column prop="name" label="入库状态" align="left">
                </el-table-column>
                <el-table-column prop="name" label="品牌" align="left">
                </el-table-column>
                <el-table-column prop="name" label="型号" align="left">
                </el-table-column>
                <el-table-column prop="name" label="租金" align="left">
                </el-table-column>
                <el-table-column prop="name" label="起租日期" align="left">
                </el-table-column>
                <el-table-column prop="name" label="入库类型" align="left">
                </el-table-column>
                <el-table-column prop="name" label="订单备注" align="left">
                </el-table-column>
                <el-table-column prop="name" label="CPU型号" align="left">
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 50, 100, 150, 200]"
                :page-size="pagesize"
                layout="sizes,prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>

      <el-dialog
        :title="newDialogTitle"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="1020px"
        @close="editCancel('AddUserForm')"
        class="phDialog"
      >
        <div class="phdMain" style="padding: 0 15px">
          <el-form
            @submit.native.prevent
            :model="addUserForm"
            label-position="right"
            :rules="aufRules"
            ref="AddUserForm"
            label-width="120px"
            style="width: 100%"
          >
            <!-- 模板信息 -->
            <div style="border-bottom: 1px solid #d8e0e6; margin-bottom: 10px">
              <div
                style="
                  border-bottom: 1px solid #32cacb;
                  width: 61px;
                  padding-bottom: 5px;
                "
              >
                模板信息
              </div>
            </div>

            <el-form-item label="模板名称：" prop="name" class="dRemarkList">
              <el-input
                v-model="addUserForm.name"
                placeholder="请输入模板名称"
                maxlength="50"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <!-- 基础信息 -->
            <div style="border-bottom: 1px solid #d8e0e6; margin-bottom: 10px">
              <div
                style="
                  border-bottom: 1px solid #32cacb;
                  width: 61px;
                  padding-bottom: 5px;
                "
              >
                基础信息
              </div>
            </div>
            <div
              class="dBasicInfo"
              style="flex-wrap: wrap; justify-content: space-between"
            >
              <el-form-item
                label="资产名称："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请输入资产名称"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="资产分类："
                class="dbasicList upOrg"
                style="width: 30%; margin: 0"
              >
                <el-button @click="selectAddCorp" plain style="width: 165px">
                  <span>{{ addUserForm.ppname || "" }}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <div class="addNewDiv" v-if="newAddView">
                  <div class="addNewMain">
                    <div class="addNewList">
                      <el-tree
                        :data="noLastList"
                        show-checkbox
                        :default-expand-all="false"
                        :expand-on-click-node="false"
                        node-key="id"
                        ref="ftree"
                        highlight-current
                        check-strictly
                        :props="defaultProps"
                        @check="handleNewAddClick"
                      >
                      </el-tree>
                    </div>
                  </div>
                </div>
              </el-form-item>

              <el-form-item
                label="管理员："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-select v-model="value" placeholder="请选择管理员">
                  <el-option
                    label="item.label"
                    style="width: 165px"
                    value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="品牌："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请输入品牌"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="型号："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请输入型号"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="所属/承租公司:"
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-select v-model="value" placeholder="请选择所属/承租公司">
                  <el-option
                    label="item.label"
                    style="width: 165px"
                    value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="使用公司："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-select v-model="value" placeholder="请选择使用公司">
                  <el-option
                    label="item.label"
                    style="width: 165px"
                    value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="使用状态："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-select v-model="value" placeholder="请选择使用状态">
                  <el-option
                    label="item.label"
                    style="width: 165px"
                    value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="所在位置："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-select
                  v-model="value"
                  placeholder="请选择所在位置"
                  style="margin-left: "
                >
                  <el-option
                    label="item.label"
                    style="width: 165px"
                    value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="订单号："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请输入订单号"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="购置方式："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-select v-model="value" placeholder="请选择购置方式">
                  <el-option
                    label="item.label"
                    style="width: 165px"
                    value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="预计使用期限："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请输入预计使用期限"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="金额："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请输入金额"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="计量单位："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请输入计量单位"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                class="searchTime"
                label="购置/起购时间:"
                style="width: 30%"
              >
                <el-date-picker
                  v-model="formInline.startTime"
                  :picker-options="pickerStart"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  style="width: 165px"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="备注：" prop="remarks" style="width: 65%">
                <el-input
                  type="textarea"
                  v-model="basicAddForm.remarks"
                  maxlength="240"
                  show-word-limit
                  placeholder="请输入备注"
                ></el-input>
              </el-form-item>

              <el-form-item label="资产图片：" prop="remarks">
                <imgupload
                  :upImgList="upImgList"
                  :licenceImg="licenceImg"
                  :isShow="isShow"
                  v-on:listenToChildEvent="show"
                ></imgupload>
              </el-form-item>
            </div>

            <!-- 维保信息 -->
            <div style="border-bottom: 1px solid #d8e0e6; margin-bottom: 10px">
              <div
                style="
                  border-bottom: 1px solid #32cacb;
                  width: 61px;
                  padding-bottom: 5px;
                "
              >
                维保信息
              </div>
            </div>

            <div
              class="dBasicInfo"
              style="flex-wrap: wrap; justify-content: space-between"
            >
              <el-form-item
                label="供应商："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请输入供应商"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="联系人："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请输入联系人"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="联系方式："
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请输入联系方式"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="维保说明："
                prop="remarks"
                style="width: 65%"
              >
                <el-input
                  type="textarea"
                  v-model="basicAddForm.remarks"
                  maxlength="240"
                  show-word-limit
                  placeholder="请输入维保说明"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="维保到期时间："
                prop="remarks"
                style="width: 30%"
              >
                <el-date-picker
                  :picker-options="pickerStart"
                  v-model="basicAddForm.remarks"
                  type="date"
                  placeholder="请选择维保到期时间"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  style="width: 165px"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="editCancel('AddUserForm')"
            >取 消</el-button
          >
          <el-button
            size="medium"
            type="primary"
            :loading="loading"
            @click="editInfo('AddUserForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="添加物资类型"
        :visible.sync="addFormVisible"
        @close="titleCancel('addEditForm')"
        width="600px"
      >
        <el-form
          @submit.native.prevent
          :model="basicAddForm"
          label-width="150px"
          :rules="basicAddFormRules"
          ref="addEditForm"
          label-position="right"
        >
          <div>
            <el-form-item label="物资类型名称：" prop="name">
              <el-input v-model="basicAddForm.name" maxlength="50"></el-input>
            </el-form-item>
            <input type="hidden" />
            <el-form-item label="父类型：" class="upOrg" prop="uname">
              <el-button @click="selectCorp" plain style="width: 100%">
                <span>{{ basicAddForm.uname }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <div class="addNewDiv" v-if="newView">
                <div class="addNewMain">
                  <div class="addNewList">
                    <el-tree
                      :data="noLastList1"
                      show-checkbox
                      :default-expand-all="false"
                      :expand-on-click-node="false"
                      node-key="id"
                      ref="tree"
                      highlight-current
                      check-strictly
                      :props="defaultProps"
                      @check="handleNewClick"
                    >
                    </el-tree>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              @click="titleSave('addEditForm')"
              >保存</el-button
            >
            <el-button @click="titleCancel('addEditForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="导入"
        :visible.sync="upFormVisible"
        :close-on-click-modal="false"
        @close="upCancel"
        class="uploadExcel"
        width="520px"
      >
        <el-form
          @submit.native.prevent
          ref="upFormRef"
          :label-position="labelPosition"
          :model="upForm"
          label-width="100px"
        >
          <el-form-item class="newtijiao" label="上传文件：">
            <div class="newcom">
              <img
                width="50"
                src="../../../assets/workbench/exceladd.png"
                alt
              />
              <p>请上传文件</p>
              <eupload
                @listenToChild="showe"
                :upImgList2="upImgList2"
                :licenceImg2="licenceImg2"
                :isShow2="isShow2"
              ></eupload>
            </div>
          </el-form-item>
          <div class="warn">
            <div>
              <p>注意：</p>
              <p>
                导入以下载的模板为准，否则将无法读取报表数据，重复上传数据将被覆盖
              </p>
              <span @click="derive" style="color: #3a99f2; cursor: pointer"
                >下载模板</span
              >
            </div>
          </div>
          <div style="margin-top: 20px; text-align: center">
            <el-button
              type="primary"
              plain
              size="medium"
              :loading="loading"
              @click="upSave"
              >确定</el-button
            >
            <el-button type="primary" plain size="medium" @click="upCancel"
              >取消</el-button
            >
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";
import eupload from "../../../components/excelUpload.vue";
import { regionData, CodeToText } from "element-china-area-data";
import imgupload from "../../../components/imgUpload.vue";

// const echarts = require("echarts");
export default {
  name: "materialBasic",
  components: { eupload, imgupload },
  data() {
    return {
      multSelectData1: [],
      pagesize: 10,
      labelPosition: "right",
      upImgList: [],
      licenceImg: [],
      upImgList2: "",
      licenceImg2: "",
      isShow2: ["1"],
      upFormVisible: false,
      upForm: { url: "" },
      defaultProps: {
        children: "children",
        label: "name",
      },
      activeNewName: "basic",
      options: regionData,
      projectAddress: "请选择所在区域",
      basicActiveNames: "1",
      aufRules: {
        name: [
          {
            required: true,
            message: "请输入物资名称",
            trigger: "blur",
          },
        ],
        astypenumber: [
          {
            required: true,
            message: "请输入位置编号",
            trigger: "blur",
          },
        ],
        上级位置: [
          {
            required: true,
            message: "请选择上级位置",
            trigger: "blur",
          },
        ],
      },
      newDialogTitle: "编辑",
      dialogFormVisible: false,
      activeName: "first",
      viewOwnType: 1,
      viewType: 1,
      currentPage: 1,
      total: 0,
      userList: [],
      multSelectData: [],
      loading: false,
      addFormVisible: false,
      wjaddressList: [],
      AbasicList: [],
      formInline: {
        name: "",
        zsxingzhi: "",
        wjaddress: "",
        nature: "",
        type: "",
      },
      houseList: [],
      value: "",
      basicAddFormRules: {
        name: [
          {
            required: true,
            message: "物资类型名称不能为空",
            trigger: "blur",
          },
        ],
      },
      basicAddForm: {
        name: "",
        uname: "",
        pid: "",
      },
      addUserForm: {
        sitenumber: "",
        name: "",
        corp_id: "",
        ppsite: "",
      },
      cid: this.$store.state.cid,
      agentid: "",
      listNodeID: "0",
      basicNodeID: "0",
      basicGoods: [],
      newView: false,
      newAddView: false,
      noLastList: [],
      noLastList1: [],
      manySelectData: [],

      activeTop: 0,
      btnList: [{ name: "物资名称" }, { name: "物资类型" }],
      deleArr1: [],
      deleArr2: [],
    };
  },
  methods: {
    show(data) {
      console.log(data);
      //   this.dingLogForm.enclosure = data;
    },
    // 生成 删除
    delete2(arr) {
      this.$axios
        .post("/newtao/materialTypeHide", {
          id: arr,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.getBasicGoodsList();
            this.getBasicList();
            this.$message({
              message: res.data.msg,
              type: "success",
              duration: 1500,
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    newdeleBasic() {
      if (this.multSelectData1.length > 0) {
        // this.delete1(this.deleArr1);
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.delete2(this.multSelectData1);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          message: "请先勾选要删除的数据！",
          type: "warning",
          duration: 1500,
        });
      }
    },
    handleSelectionChange1(val) {
      this.multSelectData1 = val.map((item) => {
        if (!item.id) return "";
        return item.id;
      });
      // let detaArr = [];
      // let deta2 = [];
      // val.map((item) => {
      //     if (item.corp_id == '0') {
      //         detaArr.push(item);
      //     } else {
      //         deta2.push(item);
      //     }
      // });
      // detaArr = detaArr.map((item) => {
      //     if (!item.id) return '';
      //     return item.id;
      // });
      // deta2 = deta2.map((item) => {
      //     if (!item.id) return '';
      //     return item.id;
      // });
      // this.deleArr1 = detaArr;
      // this.deleArr2 = deta2;
      // console.log('detaArr', detaArr, 'deta2', deta2);
    },
    jupBack() {
      this.$router.go(-1);
    },
    checkSelectable(row) {
      return row.children.length == 0;
    },
    btnClick(index) {
      this.activeTop = index;

      if (index == 0) {
        this.handleClick({ name: "first" });
      }
      if (index == 1) {
        this.handleClick({ name: "third" });
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (row && rowIndex % 2 == 1) {
        return "statistics-warning-row";
      } else {
        return "";
      }
    },
    cgChange(currentValue) {
      // let newLv =
      this.addUserForm.no_tax_price = (
        currentValue /
        (1 + this.addUserForm.output_tax_rate / 100)
      ).toFixed(2);
    },
    cglChange(currentValue) {
      this.addUserForm.no_tax_price = (
        this.addUserForm.tax_price /
        (1 + currentValue / 100)
      ).toFixed(2);
    },
    inChange(currentValue) {
      this.addUserForm.notax_pur_price = (
        currentValue /
        (1 + this.addUserForm.input_tax_rate / 100)
      ).toFixed(2);
    },
    inlChange(currentValue) {
      this.addUserForm.notax_pur_price = (
        this.addUserForm.tax_pur_price /
        (1 + currentValue / 100)
      ).toFixed(2);
    },
    derive() {
      dd.ready(function () {
        dd.biz.util.downloadFile({
          url: "http://dingzhukuai.zzdingyun.com/public/file/物资导入.xls",
          name: "物资导入模板.xls", //定义下载文件名字
          onProgress: function () {
            // 文件下载进度回调
          },
          onSuccess: function () {},
          onFail: function () {},
        });
      });
    },
    upCancel() {
      this.upForm.url = "";
      this.upImgList2 = "";
      this.licenceImg2 = "";
      this.isShow2 = [];
      this.upFormVisible = false;
    },
    upSave() {
      const _this = this;
      if (_this.upForm.url) {
        _this.$axios
          .post("/projecttwo/materialImport", {
            url: _this.upForm.url,
          })
          .then((res) => {
            if (res.data.code == 1) {
              _this.upForm.url = "";
              _this.upImgList2 = "";
              _this.licenceImg2 = "";
              _this.isShow2 = [];
              _this.upFormVisible = false;
              _this.$message({
                type: "success",
                message: res.data.msg,
                duration: 1500,
              });
            } else {
              _this.$message({
                type: "warning",
                message: res.data.msg,
                duration: 1500,
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        _this.$message({
          type: "warning",
          message: "请您先上传文件",
          duration: 1500,
        });
      }
    },
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post("/projecttwo/materialDownload", {
            id: _this.multSelectData,
          })
          .then((res) => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.data.url, //要下载的文件的url
                name: res.data.data.name, //定义下载文件名字
                onProgress: function () {
                  // 文件下载进度回调
                },
                onSuccess: function () {},
                onFail: function () {},
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
    exportIn() {
      this.upFormVisible = true;
      this.upForm.url = "";
      this.upImgList2 = "";
      this.licenceImg2 = "";
      this.isShow2 = ["1"];
    },
    //导入
    showe(url) {
      this.upForm.url = url;
    },
    selectAddCorp() {
      this.getBasicList();
      this.newAddView = !this.newAddView;
    },
    handleNewAddClick(a) {
      this.addUserForm.ppname = a.name;
      this.addUserForm.ppsite = a.id;
      //   this.addUserForm.extend_two = a.all_fid;
      console.log(this.addUserForm);
      this.newAddView = false;
    },
    handleNewClick(a) {
      console.log(a);
      this.basicAddForm.uname = a.name;
      this.basicAddForm.pid = a.id;
      this.newView = false;
    },
    selectCorp() {
      this.getBasicList();
      this.newView = !this.newView;
    },
    handleNodeClick(data) {
      this.basicNodeID = data.id;
      this.getBasicGoodsList();
    },
    handleClickList(data) {
      //   this.addUserForm.name = data.name;
      //   this.addUserForm.name1 = data.name;
      this.addUserForm.ppname = data.name;
      this.addUserForm.ppsite = data.id;
      this.addUserForm.id = data.id;
      this.currentPage = 1;
      this.getList();
    },
    tableHeaderClass() {
      return "font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px";
    },
    tableRowClass() {
      return "color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;";
    },
    //多选数据
    handleSelectionChange(val) {
      this.multSelectData = val.map((item) => {
        if (!item.id) return "";
        return item.id;
      });
    },
    handleManyChange(val) {
      this.manySelectData = val.map((item) => {
        if (!item.id) return "";
        return item.id;
      });
    },
    //删除物资类型
    deleteTitleClick(list) {
      this.$axios
        .post("/project/materialTypeEdit", {
          id: list.id,
          status: 0,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.AbasicList.splice(this.AbasicList.indexOf(list), 1);
          } else {
            this.$message({
              type: "warnning",
              message: res.data.msg,
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getBasicGoodsList() {
      this.$axios
        .post("/project/materialTypeGoodsList", {
          type: this.basicNodeID,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.basicGoods = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取物资类型列表
    getBasicList() {
      this.$axios
        .post("/erp_check/addressxilatypelist", {
          corp_id: this.$store.state.cid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.AbasicList = [
              {
                id: 0,
                pid: "0",
                name: "固定资产",
                children: res.data.content,
              },
            ];
            if (res.data.content.length == 0) {
              this.addUserForm.ppsite = "0";
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      this.$axios
        .post("/erp_check/addressxilatypelist", {
          corp_id: this.$store.state.cid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.noLastList = [
              {
                id: "0",
                pid: "0",
                name: "固定资产",
                children: res.data.content,
                disabled: true,
              },
            ];
            if (res.data.content.length == 0) {
              this.addUserForm.ppsite = "0";
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //新建物资类型
    newAddBasic() {
      this.addFormVisible = true;
    },
    titleCancel(formName) {
      this.addFormVisible = false;
      this.newView = false;
      this.$refs[formName].resetFields();
    },
    //新建基础按钮
    titleSave(formName) {
      const _this = this;
      let newData = JSON.parse(JSON.stringify(_this.basicAddForm));
      delete newData.uname;
      _this.loading = true;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (newData.pid) {
            _this.$axios
              .post("/project/materialTypeAdd", newData)
              .then((res) => {
                if (res.data.code == 1) {
                  _this.getBasicList();
                  _this.getBasicGoodsList();
                  _this.loading = false;
                  _this.addFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.$message({
                    message: res.data.msg,
                    type: "success",
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.$message({
                    message: res.data.msg,
                    type: "error",
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                console.log(error);
              });
          } else {
            _this.loading = false;
            _this.$message({
              type: "warning",
              message: "请选择父类型",
              duration: 1500,
            });
          }
        } else {
          _this.loading = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCommand(command) {
      // this.$message('click on item ' + command);
      if (command == "a") {
        this.upFormVisible = true;
      }
    },
    handleClick(tab) {
      if (tab.name == "first") {
        this.currentPage = 1;
        this.getList();
      } else if (tab.name == "third") {
        this.getBasicGoodsList();
        this.getBasicList();
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
    addressChange(arr) {
      let province = CodeToText[arr[0]];
      let city = CodeToText[arr[1]];
      let area = CodeToText[arr[2]];
      this.addUserForm.region = province + city + area;
      // alert(this.selectedOptions)
    },
    //预览附件
    watchFiles(item) {
      const _this = this;
      _this.$axios
        .post("/dingding/GetDingPanFileID", {
          type: "download",
          fileids: item.fileId,
        })
        .then((res) => {
          if (res.data.status == 1) {
            dd.ready(function () {
              dd.biz.cspace.preview({
                corpId: _this.cid,
                spaceId: item.spaceId,
                fileId: item.fileId,
                fileName: item.fileName,
                fileSize: item.fileSize,
                fileType: item.fileType,
                onSuccess: function () {
                  //无，直接在native显示文件详细信息
                },
                onFail: function () {
                  // 无，直接在native页面显示具体的错误
                },
              });
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addManyP(type) {
      const that = this;
      that.clickType = type;
      // that.pickerVisible = true;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: that.$store.state.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 99, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: that.agentid, //微应用的Id
          permissionType: "GLOBAL", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            if (type == 1) {
              let newPeople = JSON.parse(JSON.stringify(that.tagsData));
              result.users.forEach((item) => {
                newPeople.push(item);
              });
              newPeople = that.$utils.unique(newPeople);
              that.tagsData = newPeople;
              that.fDrawerForm.spuser = newPeople;
            } else if (type == 2) {
              let newPeople = JSON.parse(JSON.stringify(that.tagsPeopleData));
              result.users.forEach((item) => {
                newPeople.push(item);
              });
              newPeople = that.$utils.unique(newPeople);
              that.tagsPeopleData = newPeople;
              that.fDrawerForm.csuser = newPeople;
            }
          },
          onFail: function (err) {
            console.log(err);
          },
        });
      });
      dd.error(function (err) {
        console.log(err);
      });
    },
    searchClick() {
      this.getList1();
    },
    getList1() {
      this.$axios
        .post("/erp_check/assettypelist", {
          corp_id: this.$store.state.cid,
          //   id: this.addUserForm.id,
          name: this.addUserForm.name2,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.houseList = res.data.content;
            if (this.total > 0 && this.houseList.length < 1) {
              this.currentPage = res.data.page_number;
              this.getList1();
            }
          } else {
            dd.ready(function () {
              dd.device.notification.alert({
                message: res.data.msg,
                title: "提示", //可传空
                buttonName: "收到",
                onSuccess: function () {
                  //onSuccess将在点击button之后回调
                  /*回调*/
                },
                onFail: function () {},
              });
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取列表
    getList() {
      this.$axios
        .post("/erp_check/addresstypelist", {
          corp_id: this.$store.state.cid,
          id: this.addUserForm.id,
          name: this.addUserForm.type_name || this.addUserForm.ppname,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.houseList = res.data.content;
            if (this.total > 0 && this.houseList.length < 1) {
              this.currentPage = res.data.page_number;
              this.getList();
            }
          } else {
            dd.ready(function () {
              dd.device.notification.alert({
                message: res.data.msg,
                title: "提示", //可传空
                buttonName: "收到",
                onSuccess: function () {
                  //onSuccess将在点击button之后回调
                  /*回调*/
                },
                onFail: function () {},
              });
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addSingD() {
      const that = this;
      if (that.viewType == 1) {
        document.getElementById("addinputdet").blur();

        dd.ready(function () {
          dd.biz.contact.departmentsPicker({
            title: "通讯录", //标题
            corpId: that.$store.state.cid, //企业的corpId
            multiple: false, //是否多选
            limitTips: "超出了", //超过限定人数返回提示
            maxDepartments: 1, //最大选择部门数量
            pickedDepartments: [], //已选部门
            disabledDepartments: [], //不可选部门
            requiredDepartments: [], //必选部门（不可取消选中状态）
            appId: that.agentid, //微应用的Id
            permissionType: "GLOBAL",
            onSuccess: function (result) {
              that.addUserForm.charge_dept = result.departments[0].name;
            },
            onFail: function (err) {
              console.log(err);
            },
          });
        });
        dd.error(function (err) {
          console.log(err);
        });
      } else {
        console.log("修改");
      }
    },
    //选择保管人
    addSingP() {
      const that = this;
      if (that.viewType == 1) {
        document.getElementById("addinput").blur();

        dd.ready(function () {
          dd.biz.contact.complexPicker({
            title: "通讯录", //标题
            corpId: that.$store.state.cid, //企业的corpId
            multiple: false, //是否多选
            limitTips: "超出了", //超过限定人数返回提示
            maxUsers: 1, //最大可选人数
            pickedUsers: [], //已选用户
            pickedDepartments: [], //已选部门
            disabledUsers: [], //不可选用户
            disabledDepartments: [], //不可选部门
            requiredUsers: [], //必选用户（不可取消选中状态）
            requiredDepartments: [], //必选部门（不可取消选中状态）
            appId: that.agentid, //微应用的Id
            permissionType: "GLOBAL", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
            responseUserOnly: true, //返回人，或者返回人和部门
            startWithDepartmentId: 0, //仅支持0和-1
            onSuccess: function (result) {
              that.addUserForm.charge_person = result.users[0].name;
            },
            onFail: function (err) {
              console.log(err);
            },
          });
        });
        dd.error(function (err) {
          console.log(err);
        });
      } else {
        console.log("修改");
      }
    },
    //添加物品
    addPeopleClick() {
      this.viewOwnType = 1;
      this.viewType = 1;
      this.newDialogTitle = "添加";
      this.dialogFormVisible = true;
      this.addUserForm.id = "";
    },
    //编辑信息
    editPeopleInfo(row, column) {
      const _this = this;

      if (column.label != "操作") {
        _this.activeNewName = "basic";
        _this.newDialogTitle = "编辑";
        _this.viewType = 2;
        _this.viewOwnType = 2;
        _this.dialogFormVisible = true;
        _this.$nextTick(() => {
          _this.addUserForm = {
            sitenumber: "",
            name: "",
            corp_id: "",
            ppsite: "",
          };
          _this.$axios
            .post("/erp_check/addresscontent", {
              id: row.id,
            })
            .then((res) => {
              if (res.data.code == 1) {
                _this.addUserForm = res.data.content;
                _this.addUserForm.ppsite = res.data.content.ppname;
                console.log(
                  _this.addUserForm,
                  "_this.addUserForm _this.addUserForm "
                );
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      }
    },
    deleteFiles(index) {
      this.addUserForm.image.splice(index, 1);
    },
    //关闭覆盖层
    editCancel(formName) {
      this.dialogFormVisible = false;
      this.newAddView = false;
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.addUserForm.sitenumber = "";
      });
      this.addUserForm.ppsite = "0";
      this.addUserForm.ppname = "无上级(一级)";
    },
    updateTemp() {
      const _this = this;
      _this.$axios
        .post("/project/wuziCailiaoUpdate", {
          corp_id: _this.$store.state.cid,
        })
        .then((res) => {
          if (res.data.code !== 1) {
            _this.$message({
              message: res.data.msg,
              type: "error",
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    editInfo(formName) {
      const _this = this;
      _this.loading = true;
      _this.addUserForm.corp_id = _this.$store.state.cid;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.addUserForm));

          if (_this.viewOwnType == 1) {
            _this.$axios
              .post("/erp_check/addressaddtype", newData)
              .then((res) => {
                if (res.data.code == 1) {
                  _this.updateTemp();
                  _this.getList();
                  _this.getBasicList();
                  _this.loading = false;
                  _this.dialogFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.addUserForm.ppsite = "";
                  _this.$message({
                    message: res.data.msg,
                    type: "success",
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.$message({
                    message: res.data.msg,
                    type: "warning",
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                console.log(error);
              });
          } else {
            _this.$axios
              .post("/erp_check/addressupdatetype", newData)
              .then((res) => {
                if (res.data.code == 1) {
                  _this.updateTemp();
                  _this.getList();
                  _this.getBasicList();
                  _this.loading = false;
                  _this.dialogFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.addUserForm.ppsite = "";

                  _this.$message({
                    message: res.data.msg,
                    type: "success",
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.$message({
                    message: res.data.msg,
                    type: "warning",
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                console.log(error);
              });
          }
        } else {
          _this.loading = false;
        }
      });
    },
    //添加文件
    addFilesClick() {
      const _this = this;
      _this.$axios
        .post("/dingding/GetDingPanFileID", {
          type: "add",
          fileids: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            _this.$store.commit("setSpaceId", res.data.spaceid.toString());
            _this.selectFiles();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectFiles() {
      const _this = this;

      dd.ready(function () {
        dd.biz.util.uploadAttachment({
          image: {
            multiple: true,
            compress: false,
            max: 9,
            spaceId: _this.$store.state.spaceId,
          },
          space: {
            corpId: _this.$store.state.cid,
            spaceId: _this.$store.state.spaceId,
            max: 9,
          },
          file: { spaceId: _this.$store.state.spaceId, max: 9 },
          types: ["photo", "file", "space"],
          onSuccess: function (result) {
            //onSuccess将在文件上传成功之后调用

            result.data.forEach((item) => {
              _this.addUserForm.image.push(item);
            });
          },
          onFail: function (err) {
            console.log("err++" + err);
          },
        });
      });
      dd.error(function (err) {
        console.log(err);
      });
    },
    //删除类型
    newdeleteType(row) {
      console.log("13");
      if (row.children.length > 0) {
        this.$message({
          message: "该类型下有子类型,不能删除",
          type: "warning",
          duration: 1500,
        });
      } else {
        this.$axios
          .post("/newtao/materialTypeHide", {
            id: [row.id],
          })
          .then((res) => {
            if (res.data.code == 1) {
              this.getBasicGoodsList();
              this.getBasicList();
              this.$message({
                message: res.data.msg,
                type: "success",
                duration: 1500,
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
                duration: 1500,
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    deleteType(row) {
      console.log("13");
      this.$axios
        .post("/project/materialTypeDel", {
          id: [row.id],
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.getBasicGoodsList();
            this.getBasicList();
            this.$message({
              message: res.data.msg,
              type: "success",
              duration: 1500,
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 批量删除
    deleteall() {
      console.log(this.multSelectData);
      if (this.multSelectData.length > 0) {
        this.$axios
          .post("/projecttwo/materialBatchDel", {
            id: this.multSelectData,
          })
          .then((res) => {
            if (res.data.code == 1) {
              this.getList();
              this.$message({
                message: res.data.msg,
                type: "success",
                duration: 1500,
              });
            } else {
              this.$message({
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
        this.$message({
          message: "请先勾选要删除的数据！",
          type: "warning",
          duration: 1500,
        });
      }
    },
    //删除列表
    deleteList(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/erp_check/addressdeletetype", {
              id: row.id,
            })
            .then((res) => {
              if (res.data.code == 1) {
                this.getList();
                this.getBasicList();
                this.$message({
                  message: res.data.msg,
                  type: "success",
                  duration: 1500,
                });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                  duration: 1500,
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.$utils.checkding();
    this.getList();
    this.getBasicGoodsList();
    this.getBasicList();
    this.addUserForm.ppname = "无上级(一级)";
  },
  created() {},
  computed: {},
};
</script>

<style lang="less" scoped>
#basicInfo #contactCorp .phDialog .el-dialog__body .phdMain,
#system #contactCorp .phDialog .el-dialog__body .phdMain,
#basicInfo #materialBasic .phDialog .el-dialog__body .phdMain,
#system #materialBasic .phDialog .el-dialog__body .phdMain {
  height: 100%;
}
#basicInfo #materialBasic .upOrg .addNewDiv,
#system #materialBasic .upOrg .addNewDiv {
  position: relative;
  top: 0;
}
.headerBtn {
  display: flex;
  text-align: center;
  margin-bottom: 30px;
  // border-bottom: 2px solid #409eff;
  div {
    // border: 1px solid #409eff;
    border-bottom: 0;
    // color: #409eff;
    background-color: #fff;
    padding: 6px 20px;
    cursor: pointer;
  }
  // > div:nth-child(1) {
  //     border-top-left-radius: 40px;
  //     border-bottom-left-radius: 40px;
  // }
  // > div:nth-child(2) {
  //     border-top-right-radius: 40px;
  //     border-bottom-right-radius: 40px;
  // }
  .blue {
    color: #3296fa;
    // background-color: #409eff;
  }
  .blue::after {
    content: " ";
    background: #3296fa;
    height: 2px;
    width: 55px;
    position: absolute;
    transform: translateX(-50%);
    margin-top: 24px;
    margin-left: -32px;
  }
}

.page-two {
  background: #fff;
  border-radius: 5px;
  min-height: 800px;
  .actions {
    padding: 30px 30px 8px 30px;
    display: flex;
    justify-content: space-between;
  }
  .projectBasic {
    padding: 0px 20px;
  }
}
</style>
