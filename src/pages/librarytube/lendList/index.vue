
<template>
  <div id="materialBasic">
    <div class="main">
      <div class="content">
        <div class="header">
          <div class="headerContent">
            <div class="changtype">
              <div
                class="left_item"
                v-for="(item, index) in toptitleList"
                :style="activeindex == index ? 'color:#409EFF' : ''"
                @click="activechange(index)"
              >
                {{ item.name }}
              </div>
            </div>
            <el-form
              @submit.native.prevent
              :inline="true"
              :model="formInline"
              label-width="120px"
              class="demo-form-inline"
            >
              <div class="hlBottom" style="display: flex; align-items: center">
                <el-form-item label="模糊搜索:" style="margin-bottom: 0">
                  <el-input
                    v-model="searchFormData.content"
                    clearable
                    placeholder=""
                    @keyup.enter.native="searchClick"
                    @clear="searchClick"
                  >
                    <i
                      @click="searchClick"
                      slot="suffix"
                      class="el-icon-search"
                    ></i>
                  </el-input>
                </el-form-item>
                <div style="margin: 0 10px">
                  <el-checkbox v-model="searchChecked">模糊搜索</el-checkbox>
                </div>

                <div style="text-align: center">
                  <el-button size="medium" type="primary" @click="openDrawer"
                    >高级筛选</el-button
                  >
                  <el-button size="medium" type="primary" @click="viewShow"
                    >设置显示字段</el-button
                  >
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mainContent">
          <el-row class="maincBtn mainMoveBtn">
            <div class="mmbLeft" style="width: 100%">
              <el-button type="primary" size="medium" @click="addPeopleClick"
                >新增</el-button
              >

              <el-dropdown
                @command="handleCommand"
                trigger="click"
                size="medium"
                type="primary"
                style="margin-left: 10px"
              >
                <el-button type="primary">
                  资产入库<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">批量导入资产</el-dropdown-item>
                  <el-dropdown-item command="b">导入任务查询</el-dropdown-item>
                  <el-dropdown-item command="c">云入库(0)</el-dropdown-item>
                  <el-dropdown-item command="d">采购入库(12)</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown
                @command="handleCommand1"
                trigger="click"
                size="medium"
                type="primary"
                style="margin-left: 10px"
              >
                <el-button type="primary">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">资产验收</el-dropdown-item>
                  <el-dropdown-item command="b">派发</el-dropdown-item>
                  <el-dropdown-item command="c">借出</el-dropdown-item>
                  <el-dropdown-item command="d">领用退库</el-dropdown-item>
                  <el-dropdown-item command="e">借出归还</el-dropdown-item>
                  <el-dropdown-item command="f">变更领用人</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown
                @command="editCommand"
                trigger="click"
                size="medium"
                type="primary"
                style="margin-left: 10px"
              >
                <el-button type="primary">
                  编辑<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>

                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item command="修改">修改</el-dropdown-item> -->
                  <el-dropdown-item command="删除">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown
                @command="handleCommand"
                trigger="click"
                size="medium"
                type="primary"
                style="margin-left: 10px"
              >
                <el-button type="primary">
                  打印<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">打印资产标签</el-dropdown-item>
                  <el-dropdown-item command="b">打印入库单</el-dropdown-item>
                  <el-dropdown-item command="b">打印领用单</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown
                @command="handleCommand"
                trigger="click"
                size="medium"
                type="primary"
                style="margin-left: 10px"
              >
                <el-button type="primary">
                  导出<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">导出查询结果</el-dropdown-item>
                  <el-dropdown-item command="b">导出选择资产</el-dropdown-item>
                  <el-dropdown-item command="b">导出全部资产</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="mmbRight"></div>
          </el-row>
          <div class="basicCreate">
            <div
              class="bcRight"
              style="border: 1px solid #dde0e2; margin-left: -1px; width: 100%"
            >
              <commonTable
                :tpList="tableList"
                :titleList="titleList"
                :footerNumList="footerNumList"
                :isFooter="isFooter"
                :DistributedList="true"
                @listenChild="getMult"
                @editFrom="editFrom"
                printTableName="project_info_register"
                :showStatus="false"
              ></commonTable>
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
      <!-- 新增 -->
      <el-dialog
        :title="newDialogTitle"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="1020px"
        @close="editCancel('addUserForm')"
        class="phDialog"
      >
        <div class="phdMain" style="padding: 0 15px">
          <el-form
            @submit.native.prevent
            :model="addUserForm"
            label-position="right"
            ref="addUserForm"
            label-width="120px"
            style="width: 100%"
          >
            <div
              v-if="activeindex == 0"
              style="
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
              "
            >
              <el-form-item
                label="借用人姓名："
                prop="username"
                style="width: 30%"
                class="dRemarkList"
              >
                <el-input
                  v-model="addUserForm.username"
                  placeholder="请输入人员姓名"
                  maxlength="50"
                ></el-input>
              </el-form-item>
              <el-form-item
                class="searchTime"
                label="借用时间:"
                style="width: 30%"
                prop="jytime"
              >
                <el-date-picker
                  v-model="addUserForm.jytime"
                  type="date"
                  placeholder="选择日期"
                  style="width: 165px"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                label="处理人姓名："
                prop="cluserid"
                style="width: 30%"
                class="dRemarkList"
              >
                <el-input
                  v-model="addUserForm.cluserid"
                  placeholder="请输入人员姓名"
                  maxlength="50"
                ></el-input>
              </el-form-item>
              <el-form-item
                style="width: 30%"
                label="使用部门："
                prop="syorgid"
                class="dRemarkList"
              >
                <el-select
                  v-model="addUserForm.syorgid"
                  placeholder="请选择使用公司"
                >
                  <el-option label="测试部门" style="width: 165px" value="1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                style="width: 30%"
                label="使用项目："
                prop="xmid"
                class="dRemarkList"
              >
                <el-select
                  v-model="addUserForm.xmid"
                  placeholder="请选择使用项目"
                >
                  <el-option label="测试项目" style="width: 165px" value="1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                style="width: 30%"
                label="领用后位置:"
                prop="jyaddress"
                class="dRemarkList"
              >
                <el-select
                  v-model="addUserForm.jyaddress"
                  placeholder="请选择使用项目"
                >
                  <el-option label="测试项目" style="width: 165px" value="1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                prop="jyremark"
                style="width: 30%"
                label="领用备注:"
                class="dRemarkList"
              >
                <el-input
                  v-model="addUserForm.jyremark"
                  placeholder="领用备注"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>
            <div
              v-else
              style="
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
              "
            >
              <el-form-item
                label="借用人："
                prop="userid"
                style="width: 30%"
                class="dRemarkList"
              >
                <el-input
                  v-model="addUserForm.userid"
                  placeholder="请输入人员姓名"
                  maxlength="50"
                ></el-input>
              </el-form-item>
              <el-form-item
                class="searchTime"
                label="借用时间:"
                style="width: 30%"
                prop="jytime"
              >
                <el-date-picker
                  v-model="addUserForm.jytime"
                  type="date"
                  placeholder="选择日期"
                  style="width: 165px"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                class="searchTime"
                label="预计归还时间:"
                style="width: 30%"
                prop="yjghtime"
              >
                <el-date-picker
                  v-model="addUserForm.yjghtime"
                  type="date"
                  placeholder="选择日期"
                  style="width: 165px"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                label="处理人姓名："
                prop="cluserid"
                style="width: 30%"
                class="dRemarkList"
              >
                <el-input
                  v-model="addUserForm.cluserid"
                  placeholder="请输入人员姓名"
                  maxlength="50"
                ></el-input>
              </el-form-item>

              <el-form-item
                style="width: 30%"
                label="使用项目："
                prop="xmid"
                class="dRemarkList"
              >
                <el-select
                  v-model="addUserForm.xmid"
                  placeholder="请选择使用项目"
                >
                  <el-option label="测试项目" style="width: 165px" value="1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                style="width: 30%"
                label="借用后位置:"
                prop="jyaddress"
                class="dRemarkList"
              >
                <el-select
                  v-model="addUserForm.jyaddress"
                  placeholder="请选择使用项目"
                >
                  <el-option label="测试项目" style="width: 165px" value="1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                prop="jyremark"
                style="width: 30%"
                label="借用备注:"
                class="dRemarkList"
              >
                <el-input
                  v-model="addUserForm.jyremark"
                  placeholder="领用备注"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>
            <choiceList ref="headerChild"></choiceList>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="editCancel('addUserForm')"
            >取 消</el-button
          >
          <el-button
            size="medium"
            type="primary"
            :loading="loading"
            @click="editInfo('addUserForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <!-- 高级搜索 -->
      <el-drawer
        title="高级筛选"
        :visible.sync="earchDrawer"
        :with-header="false"
        class="searchdrawer"
        @close="closeelDrawer"
      >
        <div class="demo-drawer__footer">
          <!-- <el-button @click="resetDrawer('searchFormData')">重 置</el-button> -->
        </div>
        <el-form :model="searchFormData" :inline="true" ref="searchFormData">
          <el-form-item style="width: 100%">
            <el-button @click="resetDrawer('searchFormData')">重 置</el-button>
            <el-button type="primary" @click="searchClick">查 询</el-button>
          </el-form-item>
          <div class="title1">分字段搜索</div>

          <el-form-item prop="name">
            <el-input
              v-model="searchFormData.name"
              placeholder="资产名称"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="brand">
            <el-input
              v-model="searchFormData.brand"
              placeholder="品牌"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="model">
            <el-input
              v-model="searchFormData.model"
              placeholder="型号"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="shsn">
            <el-input
              v-model="searchFormData.shsn"
              placeholder="设备序列号"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="adminuser">
            <el-input
              v-model="searchFormData.adminuser"
              placeholder="管理员"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="orderid">
            <el-input
              v-model="searchFormData.orderid"
              placeholder="订单号"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="remark">
            <el-input
              v-model="searchFormData.remark"
              placeholder="备注"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="zznumber">
            <el-input
              v-model="searchFormData.zznumber"
              placeholder="资产编码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div class="title1">筛选</div>
          <el-form-item prop="extendone">
            <el-select
              v-model="searchFormData.extendone"
              placeholder="资产状态"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="type">
            <el-select v-model="searchFormData.type" placeholder="资产分类">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="usestatus">
            <el-select
              v-model="searchFormData.usestatus"
              placeholder="使用状况"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="shoptype">
            <el-select v-model="searchFormData.shoptype" placeholder="购置方式">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="starttime">
            <el-date-picker
              v-model="searchFormData.starttime"
              type="date"
              placeholder="购置起租开始日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="stoptime">
            <el-date-picker
              v-model="searchFormData.stoptime"
              type="date"
              placeholder="购置起租结束日期填"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="address">
            <el-select v-model="searchFormData.address" placeholder="位置">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="chengzuorg">
            <el-select
              v-model="searchFormData.chengzuorg"
              placeholder="所属承租公司"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>

    <commondraggable
      :key="pierceTableid"
      ref="child"
      :showName="activeindex == 0 ? '借出' : '归还'"
      :wFormVisible="wFormVisible"
      :getList="getList"
      v-on:changeShow="changeShow"
      @changeName="lockValue"
    ></commondraggable>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";
import eupload from "../../../components/excelUpload.vue";
import commonTable from "@/components/commonTable.vue";
import commondraggable from "@/components/commondraggable.vue";
import choiceList from "@/components/choiceList.vue";
import { regionData, CodeToText } from "element-china-area-data";
import imgupload from "../../../components/imgUpload.vue";
import draggable from "vuedraggable";
// const echarts = require("echarts");
export default {
  name: "materialBasic",
  components: {
    eupload,
    imgupload,
    commonTable,
    draggable,
    commondraggable,
    choiceList,
  },
  data() {
    return {
      activeindex: 0,
      toptitleList: [{ name: "借出" }, { name: "归还" }],
      showName: "派发", //设置显示字段 唯一标识
      wFormVisible: false,
      footerNumList: [],
      isFooter: 0,
      searchChecked: false,
      titleList: [],
      checkedLists: [],
      earchDrawer: false,
      myArray: [],
      searchFormData: {
        corp_id: this.$store.state.cid,
        sortname: "", //排序参数 资产状态extendone，资产编码zznumber，资产名称name，资产分类type，品牌brand，型号model，设备序列号shsn
        sort: "", //正序ASC，倒叙DESC
        current_page: this.currentPage, //页码必填
        num: this.pagesize, //每页显示数量
        mohu: 2, //搜索前缀  1位模糊搜索2位精准搜索，3为高级搜索
        content: "", //mohu参数1.2时必填
        name: "", //资产名称
        brand: "", //品牌
        model: "", //型号填
        shsn: "", //设备序列号
        adminuser: "", //管理员
        orderid: "", //订单号
        remark: "", //备注
        zznumber: "", //资质编码
        extendone: "", //资产状态
        type: "", //资产分类，分类数组
        usestatus: "", //使用状况
        shoptype: "", //购置方式
        starttime: "", //购置起租开始日期
        stoptime: "", //购置起租结束日期填
        address: "", //位置
        chengzuorg: "", //所属承租公司
      },
      addUserForm: {
        corp_id: "", //企业ID
        asset: [], //
        xmid: "", //项目id
        // 借用

        jynumber: "", //借用单号
        userid: "", //借用人
        username: "", //
        jytime: "", //借用时间
        yjghtime: "", //预计归还时间
        cluserid: "", //处理人
        syorgid: "", //使用部门
        jyaddress: "", //借用后位置
        jyremark: "", //借用备注

        // 归还

        // jynumber: "", //借用单号
        // userid: "", //借用人
        // jytime: "", //借用时间
        // yjghtime: "", //预计归还时间
        // cluserid: "", //处理人
        // syorgid: "", //使用部门
        // jyaddress: "", //借用后位置
        // jyremark: "", //借用备注
      },
      //!分割线
      multSelectData1: [],

      pagesize: 10,
      labelPosition: "right",
      upImgList: [],
      licenceImg: [],
      upImgList2: "",
      licenceImg2: "",
      isShow2: ["1"],
      isShow: ["1"],
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
      aufRules: {},
      newDialogTitle: "编辑",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      newDialogTitle1: "",
      commends: "",
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
      tableList: [],
      value: "",
      basicAddFormRules: {},
      basicAddForm: {
        name: "",
        uname: "",
        pid: "",
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
      pierceTableid: +new Date(),
    };
  },
  methods: {
    activechange(index) {
      this.activeindex = index;
      this.pierceTableid = +new Date();
      this.getList();
    },
    wqeasd() {
      console.log("778888", this.$refs.headerChild.checkedList);
    },
    //   操做
    editCommand(command) {
      if (command == "修改") {
        if (this.multSelectData.length != 1) {
          return this.$message({
            type: "warning",
            message: "请选择一个需要修改的资产项",
            duration: 1500,
          });
        }

        this.editFrom(this.multSelectData[0]);
      } else if (command == "删除") {
        if (this.multSelectData.length == 0) {
          return this.$message({
            type: "warning",
            message: "请选择需要删除的资产项",
            duration: 1500,
          });
        }
        this.listDataDele();
      }
    },
    // 列表删除
    listDataDele() {
      let APIname =
        this.activeindex == 0
          ? "/erp_check/deletejclists"
          : "/erp_check/deleteghlists";

      this.$confirm("删除资产将无法找回，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post(APIname, {
              id: this.multSelectData,
            })
            .then((res) => {
              if (res.data.code == 1) {
                this.getList();

                this.$message({
                  message: res.data.msg,
                  type: "warning",
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
            message: "已取消",
          });
        });
    },
    // 获取详情
    getListinfo(id) {
      this.$axios
        .post("/erp_check/pftkcontent", {
          id,
        })
        .then((res) => {
          this.addUserForm = res.data.content;
        });
    },
    //   修改
    editFrom(val) {
      this.editData = val;
      this.newDialogTitle = "编辑";
      this.dialogFormVisible = true;
      this.viewOwnType = 2;
      this.getListinfo(val.id);
      console.log("1234864568", val);
    },
    //重置抽屉表单
    resetDrawer(formName) {
      this.$refs[formName].resetFields();
    },
    //   打开抽屉
    openDrawer() {
      this.searchFormData.mohu = 3;
      this.earchDrawer = true;
    },
    // 关闭抽屉
    closeelDrawer() {
      if (this.searchChecked) {
        this.searchFormData.mohu = 1;
      } else {
        this.searchFormData.mohu = 2;
      }
      console.log("关闭抽屉");
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
      this.earchDrawer = false;
    },
    //获取列表
    getList() {
      console.log("1235");
      let APIname =
        this.activeindex == 0 ? "/erp_check/jclists" : "/erp_check/ghlists";
      this.$axios
        .post(APIname, this.searchFormData)
        .then((res) => {
          if (res.data.code == 1) {
            this.total = res.data.content.total;
            this.tableList = res.data.content.list;
            if (this.total > 0 && this.tableList.length < 1) {
              this.currentPage = res.data.content.current_page;
              this.getList();
            }
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    // 筛选
    getMult(val) {
      this.multSelectData = val;
      console.log("getMult", val);
    },
    //关闭覆盖层
    editCancel(formName) {
      this.dialogFormVisible = false;

      //   this.newAddView = false;
      //   this.$nextTick(() => {
      //     this.$refs[formName].resetFields();
      //     this.addUserForm.sitenumber = "";
      //   });
      //   this.addUserForm.ppsite = "0";
      //   this.addUserForm.ppname = "无上级(一级)";
    },
    //设置显示字段
    viewShow() {
      this.wFormVisible = true;
    },
    lockValue(province) {
      console.log("111sss", province);
      this.titleList = province;
    },
    changeShow(res) {
      this.wFormVisible = res;
    },
    editInfo(formName) {
      const _this = this;

      _this.loading = true;
      _this.addUserForm.corp_id = _this.$store.state.cid;
      _this.addUserForm.asset = _this.$refs.headerChild.checkedList;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.addUserForm));

          if (_this.viewOwnType == 1) {
            let APIname =
              this.activeindex == 0
                ? "/erp_check/jccreatedadd"
                : "/erp_check/ghcreatedadd";

            console.log("787979");
            delete newData.id;
            _this.$axios
              .post(APIname, newData)
              .then((res) => {
                if (res.data.code == 1) {
                  _this.getList();
                  _this.loading = false;
                  _this.dialogFormVisible = false;
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
              .post("/erp_check/updateassetlists", newData)
              .then((res) => {
                if (res.data.code == 1) {
                  //   _this.updateTemp();
                  _this.getList();
                  //   _this.getBasicList();
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
    tableRowClassName({ row, rowIndex }) {
      if (row && rowIndex % 2 == 1) {
        return "statistics-warning-row";
      } else {
        return "";
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
    //!分割线

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

    handleCommand(command) {
      // this.$message('click on item ' + command);
      if (command == "a") {
        this.upFormVisible = true;
      } else if (command == "b") {
        this.$router.push({
          path: "/librarytube/peopleIns",
        });
      } else if (command == "c") {
        this.$router.push({
          path: "/librarytube/peopleInsyun",
        });
      } else if (command == "d") {
        this.$router.push({
          path: "/librarytube/peopleInsru",
        });
      }
    },
    handleCommand1(command) {
      this.dialogFormVisible1 = true;
      this.commends = command;
      if (command == "a") {
        this.newDialogTitle1 = "资产验收";
      } else if (command == "b") {
        this.newDialogTitle1 = "资产领用";
      } else if (command == "c") {
        this.newDialogTitle1 = "借出单";
      } else if (command == "d") {
        this.newDialogTitle1 = "领用退库";
      } else if (command == "e") {
        this.newDialogTitle1 = "借用归还";
      } else if (command == "f") {
        this.newDialogTitle1 = "变更领用人";
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

    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
  },
  mounted() {
    this.$utils.checkding();
    this.getList();
  },
  created() {
    // this.$refs.child.getTitleList(); //设置显示字段
  },
  computed: {},
  watch: {
    searchChecked(oldvalue, newvalue) {
      if (newvalue) {
        this.searchFormData.mohu = 2;
      } else {
        this.searchFormData.mohu = 1;
      }
    },
  },
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
