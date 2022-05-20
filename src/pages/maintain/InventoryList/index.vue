
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
                @command="editCommand"
                trigger="click"
                size="medium"
                type="primary"
                style="margin: 0 10px"
              >
                <el-button type="primary">
                  编辑<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>

                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item command="修改">修改</el-dropdown-item> -->
                  <el-dropdown-item command="删除">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <!-- <el-button type="primary" size="medium" @click="newAdd"
                >导出查询结果</el-button
              >
              <el-button type="primary" size="medium" @click="newAdd"
                >打印</el-button
              >
              <el-button type="primary" size="medium" @click="newAdd"
                >审批提醒</el-button
              > -->
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
                :AllocateList="true"
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
        width="1200px"
        @close="editCancel('addUserForm')"
        class="phDialog"
      >
        <div class="phdMain" style="padding: 0 15px">
          <div class="cDrawerContent">
            <el-form
              @submit.native.prevent
              :model="addUserForm"
              label-position="right"
              ref="addUserForm"
              label-width="130px"
              style="width: 100%"
            >
              <!-- 基础信息 -->

              <el-form-item label="维修单号：" prop="wxnumber">
                <el-input
                  v-model="addUserForm.wxnumber"
                  placeholder="请输入维修单号"
                  maxlength="50"
                ></el-input>
              </el-form-item>

              <el-form-item label="创建日期：" prop="starttime">
                <el-date-picker
                  v-model="addUserForm.starttime"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="维修状态：" prop="wxstatus">
                <el-select
                  v-model="addUserForm.wxstatus"
                  placeholder="请选择位置"
                >
                  <el-option label="测试" style="width: 165px" value="测试">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="报修人：" prop="bxuserid">
                <el-input
                  v-model="addUserForm.bxusername.name"
                  placeholder="请输入使用部门"
                  @click.native="DDselect('b')"
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="保修人部门:" prop="syorgid">
                <el-input
                  v-model="addUserForm.userteam.name"
                  placeholder="请输入使用部门"
                  @click.native="DDorg"
                  readonly
                ></el-input>
              </el-form-item>

              <el-form-item label="发起人：" prop="fquserid">
                <el-input
                  v-model="addUserForm.fquserid.name"
                  placeholder="请输入使用部门"
                  @click.native="DDselect('f')"
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item
                label="送修地点"
                class="dbasicList upOrg"
                style="width: 45%; margin: 0"
              >
                <!-- <el-button
                  @click="selectAddCorp('in')"
                  plain
                  style="width: 165px"
                >
                  <span>{{ addUserForm.extendone || "" }}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button> -->

                <el-input
                  v-model="addUserForm.extendone"
                  placeholder="请输入调入位置"
                  @click.native="selectAddCorp('in')"
                  readonly
                ></el-input>
                <div class="addNewDiv" v-if="newView">
                  <div class="addNewMain">
                    <div class="addNewList">
                      <el-tree
                        :data="LastList"
                        show-checkbox
                        :default-expand-all="false"
                        :expand-on-click-node="false"
                        node-key="id"
                        ref="ftree"
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

              <el-form-item label="完成日期：" prop="stoptime">
                <el-date-picker
                  v-model="addUserForm.stoptime"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="本次维修合计:" prop="wxmoney">
                <el-input
                  v-model="addUserForm.wxmoney"
                  placeholder="请填写"
                  maxlength="50"
                ></el-input>
              </el-form-item>
              <el-form-item label="报修内容:" prop="bxremark">
                <el-input
                  v-model="addUserForm.bxremark"
                  placeholder="请填写"
                  maxlength="50"
                ></el-input>
              </el-form-item>

              <el-form-item label="报修图片：" prop="remarks">
                <imgupload
                  :upImgList="upImgList"
                  :licenceImg="licenceImg"
                  :isShow="isShow"
                  v-on:listenToChildEvent="show"
                ></imgupload>
              </el-form-item>

              <el-tabs
                v-model="activeName"
                type="card"
                @tab-click="handleClick"
                style="width: 100%"
              >
                <el-tab-pane label="资产" name="first">
                  <choiceList ref="headerChild"></choiceList>
                </el-tab-pane>
                <el-tab-pane label="耗材" name="second">
                  <commonMa ref="marheaderChild"></commonMa>
                  <!-- <div style="margin: 10px 0">
                    仓库:
                    <el-select
                      v-model="value"
                      placeholder="请选择仓库"
                      style="width: 185px"
                    >
                      <el-option label="item.label" value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <el-button type="primary" @click="dialogFormVisible2 = true"
                    >选择物料</el-button
                  >
                  <el-button type="primary">移除物料</el-button>
                  <el-button type="primary">导入物料</el-button>

                  <el-table
                    :border="true"
                    :data="houseList"
                    :header-cell-style="tableHeaderClass"
                    :cell-style="tableRowClass"
                    max-height="547"
                    style="
                      width: 100%;
                      border: 1px solid #ebeef5;
                      margin-top: 10px;
                    "
                    ref="multipleTable"
                    size="mini"
                    :row-class-name="tableRowClassName"
                  >
                    <el-table-column type="selection" width="55" fixed>
                    </el-table-column>
                    <el-table-column
                      prop="sitenumber"
                      label="物料编码"
                      align="left"
                    >
                    </el-table-column>
                    <el-table-column prop="name" label="资产名称" align="left">
                    </el-table-column>
                    <el-table-column prop="name" label="物料分类" align="left">
                    </el-table-column>
                    <el-table-column prop="name" label="品牌" align="left">
                    </el-table-column>
                    <el-table-column prop="name" label="规格型号" align="left">
                    </el-table-column>
                    <el-table-column prop="name" label="库存单位" align="left">
                    </el-table-column>
                    <el-table-column prop="name" label="当前库存" align="left">
                    </el-table-column>
                    <el-table-column prop="name" label="出库数量" align="left">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="出库物料备注"
                      align="left"
                      width="120"
                    >
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
                  ></el-pagination> -->
                </el-tab-pane>
              </el-tabs>
            </el-form>
          </div>
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
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="购置起租开始日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="stoptime">
            <el-date-picker
              v-model="searchFormData.stoptime"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
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
      :showName="'维修'"
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
import materList from "@/components/materList.vue";
import commonMa from "@/components/commonMaterial.vue";

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
    materList,
    commonMa,
  },
  data() {
    return {
      allSupplier: [],
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
        corp_id: this.$store.state.cid, //企业ID
        starttime: "", //创建日期
        wxnumber: "", //维修单号
        wxstatus: "", //维修状态
        bxuserid: "", //报修人
        bxusername: "",
        userteam: "", //报修人部门
        fquserid: "", //发起人
        fqusername: "", //发起人
        sxaddress: "", //送修地点
        stoptime: "", //完成日期
        bxremark: "", //保修内容
        wxmoney: "", //本次维修金额合计
        bxurl: "", //保修图片
        assetcontent: [], //资产内容
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
      isClose: 1,
      cid: this.$store.state.cid,
      agentid: "",
      listNodeID: "0",
      basicNodeID: "0",
      basicGoods: [],
      newView: false,
      newAddView: false,
      LastList: [],
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
    //获取子传父选择的值
    getSelect(val) {
      this.listenTable = val;
    },
    DDorg() {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.departmentsPicker({
          title: "测试标题", //标题
          corpId: that.$store.state.cid, //企业的corpId
          multiple: false, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxDepartments: 100, //最大选择部门数量
          pickedDepartments: [], //已选部门
          disabledDepartments: [], //不可选部门
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: "", //微应用的Id
          permissionType: "GLOBAL", //选人权限，目前只有GLOBAL这个参数
          onSuccess: function (result) {
            that.addUserForm.userteam = result.departments[0];
          },
          onFail: function (err) {},
        });
      });
    },
    DDselect(val) {
      console.log("789798");
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: that.$store.state.cid, //企业的corpId
          multiple: false, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 99, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: "", //微应用的Id
          permissionType: "GLOBAL", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            if (val === "b") {
              that.addUserForm.bxuserid = result.users[0];
              //   that.addUserForm.bxusername = result.users[0].name;
            } else if (val === "f") {
              that.addUserForm.fquserid = result.users[0];
              //   that.addUserForm.fqusername = result.users[0].name;
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
    selectAddCorp(val) {
      if (val === "in") {
        this.newView = !this.newView;
      } else if (val === "out") {
        this.newAddView = !this.newAddView;
      }
      this.getBasicList();
    },
    handleNewClick(a) {
      console.log(a);
      this.addUserForm.extendone = a.name;
      //   this.basicAddForm.pid = a.id;
      this.newView = false;
    },
    getBasicList() {
      //   this.$axios
      //     .post("/erp_check/assetxilatypelist", {
      //       corp_id: this.$store.state.cid,
      //     })
      //     .then((res) => {
      //       if (res.data.code == 1) {
      //         this.noLastList = [
      //           {
      //             id: 0,
      //             pid: "0",
      //             name: "固定资产",
      //             children: res.data.content,
      //           },
      //         ];
      //       }
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      this.$axios
        .post("/erp_check/addressxilatypelist", {
          corp_id: this.$store.state.cid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.LastList = [
              {
                id: 0,
                pid: "0",
                name: "固定资产",
                children: res.data.content,
              },
            ];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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

        this.editFrom(this.multSelectData.id);
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
      this.$confirm("删除资产将无法找回，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/erp_check/deleteweixiuguanli", {
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
      this.$axios
        .post("/erp_check/weixiuguanlilists", this.searchFormData)
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
    show(val) {
      console.log(val);
    },
    editInfo(formName) {
      const _this = this;

      _this.loading = true;
      _this.addUserForm.corp_id = _this.$store.state.cid;
      _this.addUserForm.assetcontent = _this.$refs.headerChild.checkedList;
      //!
      //   _this.addUserForm.assetcontent = _this.$refs.marheaderChild.chemList;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.addUserForm));

          if (_this.viewOwnType == 1) {
            console.log("787979");
            delete newData.id;
            _this.$axios
              .post("/erp_check/weixiuguanlicreatadd", newData)
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
    this.$utils.commonAlltouSupplier().then((res) => {
      this.allSupplier = res;
      console.log("9999", res); //res为公共接口返回的数据;返回的数据为utils.js中return的数据
    });
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
