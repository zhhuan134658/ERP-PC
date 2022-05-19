/*
 * @Author: NorthWind 
 * @Date: 2020-12-14 13:44:42 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-05-19 09:21:29
 */
<template>
  <div id="contactCorp">
    <div class="main">
      <el-tabs
        class="diaryListtabs"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane label="往来单位" name="first">
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
                  <div class="hlBottom">
                    <el-form-item label="单位名称:">
                      <el-input
                        v-model="formInline.name"
                        clearable
                        placeholder="请输入单位名称"
                        @keyup.enter.native="searchClick"
                      ></el-input>
                    </el-form-item>

                    <el-form-item label="单位类型:">
                      <el-select
                        v-model="formInline.supplier_type"
                        filterable
                        clearable
                        placeholder="请选择单位类型"
                      >
                        <el-option
                          v-for="(item, index) in AbasicList"
                          :key="index"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>

                    <div style="text-align: center">
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
                  </div>
                </el-form>
              </div>
            </div>
            <div class="mainContent">
              <el-row class="maincBtn mainMoveBtn">
                <div class="mmbLeft">
                  <el-button
                    type="primary"
                    size="medium"
                    @click="addPeopleClick"
                    >添加</el-button
                  >
                </div>
                <div class="mmbRight">
                  <el-button
                    size="medium"
                    type="primary"
                    plain
                    icon="el-icon-delete"
                    @click="deleteList"
                    >删除</el-button
                  >
                  <el-button
                    type="primary"
                    plain
                    size="medium"
                    icon="el-icon-download"
                    @click="exportList"
                    >导出</el-button
                  >
                  <el-button
                    type="primary"
                    plain
                    size="medium"
                    icon="el-icon-upload2"
                    @click="exportIn"
                    >导入</el-button
                  >
                  <el-button
                    v-if="$store.state.userInfo.admin == 1"
                    type="primary"
                    plain
                    size="medium"
                    icon="el-icon-setting"
                    @click="viewShow"
                    >设置显示字段</el-button
                  >
                </div>
              </el-row>
              <commonTable
                :houseList="houseList"
                :titleList="titleList"
                @listenChild="getMult"
                @listenChildID="deleteFiles"
                @listenChildMain="editPeopleInfo"
              ></commonTable>
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="单位类型" name="second">
          <div class="content">
            <div class="page-two">
              <div class="actions">
                <div class="but">
                  <el-button type="primary" @click="newAddBasic()" size="small"
                    >新建</el-button
                  >
                </div>
              </div>
              <div class="projectBasic">
                <el-collapse v-model="basicActiveNames">
                  <el-collapse-item
                    title="单位类型"
                    name="1"
                    v-if="AbasicList.length > 0"
                  >
                    <div>
                      <el-tag
                        v-for="list in AbasicList"
                        :key="list.id"
                        :closable="list.status == '2' ? true : false"
                        @close="deleteTitleClick(list, 1)"
                        >{{ list.name }}</el-tag
                      >
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 
      <div class="content">
        <div v-show="!activeTop">
          <div class="header">
            <div class="headerContent">
              <div class="headerBtn" style="position: relative">
                <div
                  v-for="(item, index) in btnList"
                  :class="activeTop == index ? 'blue' : ''"
                  @click="btnClick(index)"
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
                <div class="hlBottom">
                  <el-form-item label="单位名称:">
                    <el-input
                      v-model="formInline.name"
                      clearable
                      placeholder="请输入单位名称"
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="单位类型:">
                    <el-select
                      v-model="formInline.supplier_type"
                      filterable
                      clearable
                      placeholder="请选择单位类型"
                    >
                      <el-option
                        v-for="(item, index) in AbasicList"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>

                  <div style="text-align: center">
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
                </div>
              </el-form>
            </div>
          </div>
          <div class="mainContent">
            <el-row class="maincBtn mainMoveBtn">
              <div class="mmbLeft">
                <el-button type="primary" size="medium" @click="addPeopleClick"
                  >添加</el-button
                >
              </div>
              <div class="mmbRight">
                <el-button
                  size="medium"
                  type="primary"
                  plain
                  icon="el-icon-delete"
                  @click="deleteList"
                  >删除</el-button
                >
                <el-button
                  type="primary"
                  plain
                  size="medium"
                  icon="el-icon-download"
                  @click="exportList"
                  >导出</el-button
                >
                <el-button
                  type="primary"
                  plain
                  size="medium"
                  icon="el-icon-upload2"
                  @click="exportIn"
                  >导入</el-button
                >
                <el-button
                  v-if="$store.state.userInfo.admin == 1"
                  type="primary"
                  plain
                  size="medium"
                  icon="el-icon-setting"
                  @click="viewShow"
                  >设置显示字段</el-button
                >
              </div>
            </el-row>
            <commonTable
              :houseList="houseList"
              :titleList="titleList"
              @listenChild="getMult"
              @listenChildID="deleteFiles"
              @listenChildMain="editPeopleInfo"
            ></commonTable>
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
        </div>
        <div v-show="activeTop" class="page-two">
          <div class="actions">
            <div>
              <div class="headerBtn" style="position: relative">
                <div
                  v-for="(item, index) in btnList"
                  :class="activeTop == index ? 'blue' : ''"
                  @click="btnClick(index)"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="but">
              <el-button type="primary" @click="newAddBasic()" size="small"
                >新建</el-button
              >
            </div>
          </div>
          <div class="projectBasic">
            <el-collapse v-model="basicActiveNames">
              <el-collapse-item
                title="单位类型"
                name="1"
                v-if="AbasicList.length > 0"
              >
                <div>
                  <el-tag
                    v-for="list in AbasicList"
                    :key="list.id"
                    :closable="list.status == '2' ? true : false"
                    @close="deleteTitleClick(list, 1)"
                    >{{ list.name }}</el-tag
                  >
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div> -->
      <el-dialog
        :title="newDialogTitle"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="1020px"
        @close="editCancel('AddUserForm')"
        class="phDialog"
      >
        <div class="phdMain">
          <el-form
            @submit.native.prevent
            :model="addUserForm"
            :rules="aufRules"
            ref="AddUserForm"
            label-width="126px"
          >
            <div class="dBasicInfo" style="justify-content: space-between">
              <!-- <h2>基本信息</h2> -->
              <el-form-item label="单位名称" prop="name" class="dRemarkList">
                <el-input
                  v-model="addUserForm.name"
                  placeholder="请输入单位名称"
                  maxlength="50"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="单位类型"
                prop="supplier_type"
                class="dbasicList"
              >
                <el-select
                  clearable
                  filterable
                  v-model="addUserForm.supplier_type"
                  placeholder="请选择单位类型"
                >
                  <el-option
                    v-for="(item, index) in AbasicList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="单位性质" prop="unit_nature">
                <el-select
                  v-model="addUserForm.unit_nature"
                  placeholder="请选择单位性质"
                >
                  <el-option label="事业" value="事业"></el-option>
                  <el-option label="企业" value="企业"></el-option>
                  <el-option label="社团" value="社团"></el-option>
                  <el-option label="自然人" value="自然人"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="单位简称"
                prop="abbre_name"
                class="dbasicList"
              >
                <el-input
                  v-model="addUserForm.abbre_name"
                  placeholder="请输入单位简称"
                  maxlength="50"
                ></el-input>
              </el-form-item>
              <el-form-item label="单位编号" prop="number">
                <el-input
                  v-model="addUserForm.number"
                  placeholder="请输入单位编号"
                  maxlength="50"
                ></el-input>
              </el-form-item>
              <el-form-item label="法定代表人" prop="contacts_mobile">
                <el-input
                  v-model="addUserForm.taxation_code"
                  placeholder="请输入法定代表人"
                ></el-input>
              </el-form-item>
              <el-form-item label="助记码" prop="zhuji_code" class="dbasicList">
                <el-input
                  v-model="addUserForm.zhuji_code"
                  placeholder="请输入助记码"
                  maxlength="50"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="纳税人类型"
                prop="zhuji_code"
                class="dbasicList"
              >
                <el-select
                  v-model="addUserForm.region"
                  placeholder="请选择纳税人类型"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="税号" prop="extend_first" class="dbasicList">
                <el-input
                  v-model="addUserForm.extend_first"
                  placeholder="请输入税号"
                  maxlength="30"
                ></el-input>
              </el-form-item>
              <el-form-item label="票种" prop="extend_two">
                <el-input
                  v-model="addUserForm.extend_two"
                  placeholder="请输入票种"
                  maxlength="50"
                ></el-input>
              </el-form-item>
              <el-form-item label="开户行" prop="bank" class="dbasicList">
                <el-input
                  v-model="addUserForm.bank"
                  maxlength="50"
                  placeholder="请输入开户行"
                ></el-input>
              </el-form-item>
              <el-form-item label="银行卡号" prop="bank_cert">
                <el-input
                  v-model="addUserForm.bank_cert"
                  maxlength="30"
                  placeholder="请输入银行卡号"
                ></el-input>
              </el-form-item>

              <el-form-item label="公司地址" prop="company_address">
                <el-input
                  v-model="addUserForm.company_address"
                  maxlength="50"
                  placeholder="请输入公司地址"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="contacts_mobile">
                <el-input
                  v-model="addUserForm.tax_rate"
                  placeholder="请输入电话"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人" prop="contacts" class="dbasicList">
                <el-input
                  v-model="addUserForm.contacts"
                  maxlength="10"
                  placeholder="请输入联系人"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="contacts_mobile">
                <el-input
                  v-model="addUserForm.contacts_mobile"
                  placeholder="请输入联系电话"
                ></el-input>
              </el-form-item>
              <el-form-item label="成立时间" prop="establish_time">
                <el-date-picker
                  v-model="addUserForm.establish_time"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="人员规模" prop="personnel_size">
                <el-input
                  v-model="addUserForm.personnel_size"
                  placeholder="请输入规模"
                  maxlength="10"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="分管部门"
                prop="charge_dept"
                class="dbasicList"
              >
                <el-input
                  placeholder="请输入分管部门"
                  v-model="addUserForm.charge_dept"
                  id="addinputdet"
                  readonly
                  @focus="addSingD"
                ></el-input>
              </el-form-item>
              <el-form-item label="分管人" prop="charge_person">
                <el-input
                  placeholder="请输入分管人"
                  v-model="addUserForm.charge_person"
                  id="addinput"
                  readonly
                  @focus="addSingP"
                ></el-input>
              </el-form-item>

              <!-- <el-form-item label="税率(%)" prop="tax_rate" class="dbasicList">
                <el-input
                  v-model="addUserForm.tax_rate"
                  placeholder="请输入税率"
                  maxlength="50"
                ></el-input>
              </el-form-item>

              <el-form-item label="所在区域" prop="region" class="dbasicList">
                <el-input
                  v-model="addUserForm.region"
                  maxlength="50"
                  placeholder="请输入所在区域"
                ></el-input>
              </el-form-item> -->
              <!-- 
              <el-form-item label="股东结构" prop="contacts_mobile">
                <el-input
                  type="textarea"
                  v-model="addUserForm.extend_four"
                  placeholder="请输入股东结构"
                  class="dRemarkList"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item label="具备资质" prop="contacts_mobile">
                <el-input
                  type="textarea"
                  class="dRemarkList"
                  v-model="addUserForm.extend_five"
                  placeholder="请输入具备资质"
                  show-word-limit
                ></el-input>
              </el-form-item> -->

              <el-form-item label="股东结构" prop="brief_info" class="dRemarkList">
                <el-input
                  type="textarea"
                  v-model="addUserForm.extend_four"
                  placeholder="请输入股东结构"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item
                label="具备资质"
                prop="brief_info"
                class="dRemarkList"
              >
                <el-input
                  type="textarea"
                  v-model="addUserForm.extend_five"
                  placeholder="请输入具备资质"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item
                label="单位简介"
                prop="brief_info"
                class="dRemarkList"
              >
                <el-input
                  type="textarea"
                  v-model="addUserForm.brief_info"
                  placeholder="请输入简介"
                  maxlength="240"
                  show-word-limit
                ></el-input>
              </el-form-item>

              <el-form-item class="newtijiao" label="上传文件：">
                <div @click="addFilesClick(3)" style="color: skyblue">
                  添加文件
                </div>
                <div class="dingFilesClass">
                  <div
                    v-for="(item, index) in addUserForm.extend_three"
                    :key="index"
                  >
                    <div style="display: flex">
                      <div style="display: flex; width: 700px">
                        <div class="fileIcon">
                          <!-- <i class="el-icon-document"></i> -->
                          <!-- <img
                            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png"
                            alt=""
                            style="width: 50px; height: 50px;margin:right:10px"
                          /> -->
                          <img
                            :src="imgData(item.fileName)"
                            mode=""
                            style="width: 50px; height: 50px;margin:10px"
                          ></img>
                        </div>
                        <div class="filesTitle">
                          <div class="yichu">
                            {{ item.fileName }}
                          </div>
                          <p>{{ (item.fileSize / 1024).toFixed(2) }}kb</p>
                        </div>
                      </div>
                      <div style="display: flex">
                        <div
                          class="watchBtn"
                          @click="watchFiles(item)"
                          style="width: 55px"
                        >
                          预览
                        </div>
                        <div class="fileIcon2">
                          <i
                            class="el-icon-error"
                            @click="deleteFiles1(index, 3)"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
        title="添加单位类型"
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
          @submit.native.prevent
        >
          <div>
            <el-form-item label="单位类型名称：" prop="name">
              <el-input v-model="basicAddForm.name" maxlength="50"></el-input>
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
      <el-dialog title="删除类型" :visible.sync="dbWarnVisible" width="500px">
        <span
          >确定删除<span style="color: #409eff">{{ deleteTypeData.name }}</span
          >?</span
        >
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :loading="loading" @click="deleteTypeId"
            >确定</el-button
          >
          <el-button @click="dbWarnVisible = false">取消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="设置"
        :visible.sync="wFormVisible"
        :close-on-click-modal="false"
        width="600px"
        @close="wCancel"
        class="view_change_title"
      >
        <el-checkbox-group
          v-model="checkedLists"
          @change="handleCheckedListChange"
        >
          <draggable animation="1000" v-model="myArray">
            <transition-group>
              <el-checkbox
                v-for="element in myArray"
                :key="element.value"
                :label="element.value"
                border
              >
                <span> {{ element.label }}</span>
              </el-checkbox>
            </transition-group>
          </draggable>
        </el-checkbox-group>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="wCancel">取 消</el-button>
          <el-button size="medium" type="primary" @click="wInfo"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="导入"
        :visible.sync="upFormVisible"
        :close-on-click-modal="false"
        @close="upCancel"
        class="uploadExcel"
        width="520px"
      >
        <el-form ref="upFormRef" :model="upForm" label-width="100px">
          <el-form-item class="newtijiao" label="上传文件：">
            <div class="newcom">
              <img width="50" src="../../../assets/workbench/exceladd.png" alt />
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
import draggable from "vuedraggable";
import commonTable from "@/components/commonTableL.vue";
import eupload from "../../../components/excelUpload.vue";
import imgupload from "../../../components/imgUpload.vue";

import * as dd from "dingtalk-jsapi";

import { regionData, CodeToText } from "element-china-area-data";
const echarts = require("echarts");
export default {
  name: "contactCorp",
  components: { draggable, commonTable, eupload, imgupload },
  data() {
    return {
      upImgList: [],
      licenceImg: [],
      activeName: "first",
      labelPosition: "right",
      upImgList2: "",
      licenceImg2: "",
      isShow2: ["1"],
      upFormVisible: false,
      upForm: { url: "" },
      warnDList: {},
      dbWarnVisible: false,
      deleteTypeData: { id: "", name: "" },
      options: regionData,
      projectAddress: "请选择所在区域",
      basicActiveNames: "1",
      aufRules: {
        supplier_type: [
          {
            required: true,
            message: "请选择单位类型",
            trigger: ["blur", "change"],
          },
        ],
        unit_nature: [
          {
            required: true,
            message: "请选择单位性质",
            trigger: ["blur", "change"],
          },
        ],

        name: [
          {
            required: true,
            message: "请输入单位名称",
            trigger: "blur",
          },
        ],
        // charge_person: [
        //     {
        //         required: true,
        //         message: '请选择分管人员',
        //         trigger: ['blur', 'change']
        //     }
        // ]
      },
      newDialogTitle: "编辑",
      dialogFormVisible: false,
      activeName: "first",
      viewOwnType: 1,
      viewType: 1,
      currentPage: 1,
      total: 0,
      pagesize: 10,
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
        supplier_type: "",
      },
      houseList: [],
      basicAddFormRules: {
        name: [
          {
            required: true,
            message: "单位类型名称不能为空",
            trigger: "blur",
          },
        ],
      },
      basicAddForm: {
        name: "",
        pid: 0,
      },
      options: [
        {
          value: "一般纳税人",
          label: "一般纳税人",
        },
        {
          value: "小规模纳税人",
          label: "小规模纳税人",
        },
        {
          value: "双定户",
          label: "双定户",
        },
      ],
      addUserForm: {
        name: "",
        number: "",
        abbre_name: "",
        zhuji_code: "",
        establish_time: "",
        unit_nature: "",
        personnel_size: "",
        region: "",
        tax_rate: "",
        charge_dept: "",
        charge_person: "",
        brief_info: "",
        contacts: "",
        contacts_mobile: "",
        bank: "",
        bank_cert: "",
        supplier_type: "",
        extend_two: "",
        extend_first: "",
        company_address: "",
        taxation_code: "",
        extend_five: "",
        extend_four: "",
        extend_three: [],
      },
      cid: this.$store.state.cid,
      agentid: "",
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],

      activeTop: 0,
      btnList: [{ name: "往来单位" }, { name: "单位类型" }],
    };
  },
  methods: {
    imgData(leixing) {
      let $url = "";
      let $leixing = leixing.split(".")[1];
      switch ($leixing) {
        case "bmp":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "jpg":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";
          break;

        case "png":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "tif":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "gif":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "pcx":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "jpeg":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "tiff":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "doc":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/3N8rDSxbWY1599028418394.png";

          break;

        case "docx":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/3N8rDSxbWY1599028418394.png";

          break;

        case "xls":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/yYQffEzfj51599028426375.png";

          break;

        case "xlsx":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/yYQffEzfj51599028426375.png";

          break;

        case "pdf":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/cP3jnxmJbM1599028432693.png";

          break;

        case "ppt":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png";

          break;

        case "pps":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png";

          break;

        case "pptx":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png";

          break;

        case "ppsx":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png";

          break;

        case "ppa":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png";

          break;

        case "pot":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png";

          break;

        case "rar":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/5ZefDfefAP1599028449154.png";

          break;

        case "zip":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/5ZefDfefAP1599028449154.png";

          break;

        case "AVI":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "mov":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "rmvb":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "rm":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "FLV":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "mp4":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "3GP":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "dwg":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/2GytfM5BY41599028466155.png";

          break;

        case "dxf":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/2GytfM5BY41599028466155.png";

          break;

        case "dwt":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/2GytfM5BY41599028466155.png";

          break;

        case "ai":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/3QX6Xwexr71599028901919.png";

          break;

        case "3dm":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/epfBYhnxZF1599028496013.png";

          break;

        case "dae":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/w6wXH3rRJn1599028908835.png";

          break;

        case "abc":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "glTF":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "fbx":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "bvh":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "obj":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "stl":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "3ds":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "ply":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "x3d":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        default:
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/5wH5QxaXPB1599029452541.png";
      }
      return $url;
    },
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
    // btnClick(index) {
    //   this.activeTop = index;

    //   if (index == 0) {
    //     this.handleClick({ name: 'first' });
    //   }
    //   if (index == 1) {
    //     this.handleClick({ name: 'third' });
    //   }
    // },
    derive() {
      let that = this;
      that.$axios
        .post("/projecttwo/createWangModel", {})
        .then((res) => {
          if (res.data.code == 1) {
            dd.ready(function () {
              dd.biz.util.downloadFile({
                url: res.data.data.url,
                name: res.data.data.name, //定义下载文件名字
                onProgress: function (msg) {
                  // 文件下载进度回调
                  that.deleteExport(res.data.data.path);
                },
                onSuccess: function (result) {
                  that.deleteExport(res.data.data.path);
                },
                onFail: function () {},
              });
            });
          } else {
            that.$message({
              type: "warning",
              message: res.data.msg,
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteExport(url) {
      const _this = this;
      _this.$axios
        .post("/project/fileDownloadDel", { path: url })
        .then((res) => {
          if (res.data.code == 1) {
          }
        })
        .catch(function (error) {
          console.log(error);
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
          .post("/projecttwo/currentUnitImport", {
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
          .post("/projecttwo/currentUnitDownload", {
            id: _this.multSelectData,
          })
          .then((res) => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.data.url, //要下载的文件的url
                name: res.data.data.name, //定义下载文件名字
                onProgress: function (msg) {
                  // 文件下载进度回调
                },
                onSuccess: function (result) {
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
          message: "先勾选要导出的数据",
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
    resetClick() {
      this.formInline = {
        name: "",
        zsxingzhi: "",
        wjaddress: "",
        nature: "",
        supplier_type: "",
      };
      this.getList();
    },
    getMult(val) {
      this.multSelectData = val;
    },
    handleCheckedListChange(value) {
      this.myArray.forEach((element) => {
        if (value.includes(element.value)) {
          element.check = true;
        } else {
          element.check = false;
        }
      });
    },
    wCancel() {
      this.wFormVisible = false;
      let Ids = this.titleList.map((item) => item.value);
      this.myArray.forEach((item) => {
        if (!Ids.includes(item.value)) {
          item.check = false;
        } else {
          item.check = true;
        }
      });
    },
    wInfo() {
      let newT = [];
      this.myArray.forEach((element) => {
        if (element.check) {
          newT.push(element);
        }
      });

      if (newT.length > 0) {
        this.$nextTick(() => {
          this.titleList = JSON.parse(JSON.stringify(newT));
          this.sendTitleList();
          this.wFormVisible = false;
        });
      } else {
        this.$message({
          type: "warning",
          message: "不能为空！",
          duration: 1500,
        });
      }
    },
    viewShow() {
      this.getTitleList();
      this.wFormVisible = true;
    },

    getTitleList() {
      this.$axios
        .post("/spread/showFiledCurrencyList", {
          name: "supplier_info",
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.myArray = res.data.data;
            this.titleList = [];
            this.checkedLists = [];
            this.myArray.forEach((element) => {
              if (element.check) {
                this.titleList.push(element);
                this.checkedLists.push(element.value);
              }
            });
            this.getList();
            console.log("测试1");
          } else {
            this.$message({
              title: "提示",
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
    sendTitleList() {
      this.$axios
        .post("/spread/editFiledCurrency", {
          name: "supplier_info",
          mould_data: JSON.stringify(this.myArray),
        })
        .then((res) => {
          if (res.data.code == 1) {
          } else {
            this.$message({
              title: "提示",
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
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    tableHeaderClass({ row, rowIndex }) {
      return "font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px";
    },
    tableRowClass({ row, rowIndex }) {
      return "color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;";
    },
    //多选数据
    handleSelectionChange(val) {
      this.multSelectData = val.map((item) => {
        if (!item.id) return "";
        return item.id;
      });
    },
    deleteFiles(val) {
      this.$axios
        .post("/project/supplierInfoDel", {
          id: [val],
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
    },
    deleteFiles1(index, type) {
      switch (type) {
        case 1:
          this.addUserForm.fjurl.sfz.splice(index, 1);
          break;
        case 2:
          this.addUserForm.fjurl.zjz.splice(index, 1);
          break;
        case 3:
          this.addUserForm.extend_three.splice(index, 1);
          break;
        case 4:
          this.addUserForm.fjurl.enclosure.splice(index, 1);
          break;
      }
    },
    deleteList() {
      if (this.multSelectData.length > 0) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios
              .post("/project/supplierInfoDel", {
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
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          message: "先勾选要删除的数据",
          type: "warning",
          duration: 1500,
        });
      }
    },
    deleteTypeId() {
      const _this = this;
      _this.loading = true;
      _this.$axios
        .post("/project/supplierTypeDel", {
          id: _this.deleteTypeData.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            _this.dbWarnVisible = false;
            _this.loading = false;
            _this.AbasicList.splice(
              _this.AbasicList.indexOf(_this.warnDList),
              1
            );
          } else {
            _this.loading = false;
            _this.$message({
              type: "warning",
              message: res.data.msg,
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          _this.loading = false;
          console.log(error);
        });
    },
    //删除单位类型
    deleteTitleClick(list, type) {
      this.deleteTypeData.id = list.id;
      this.deleteTypeData.name = list.name;
      this.warnDList = list;
      this.dbWarnVisible = true;
    },
    //获取单位类型列表
    getBasicList() {
      this.$axios
        .post("/project/supplierTypeList", {
          name: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            if (res.data.content == null) {
              res.data.content = [];
            }
            this.AbasicList = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //新建单位类型
    newAddBasic() {
      this.addFormVisible = true;
    },
    titleCancel(formName) {
      this.addFormVisible = false;
      this.$refs[formName].resetFields();
    },
    updateTemp() {
      const _this = this;
      _this.$axios
        .post("/project/wanglaiUpdate", {
          corp_id: _this.$store.state.cid,
        })
        .then((res) => {
          if (res.data.code == 1) {
          } else {
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
    //新建基础按钮
    titleSave(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$axios
            .post("/project/supplierTypeAdd", _this.basicAddForm)
            .then((res) => {
              if (res.data.code == 1) {
                _this.updateTemp();
                _this.getBasicList();
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClick(tab) {
      if (tab.name == "first") {
        this.currentPage = 1;
        this.getList();
      } else if (tab.name == "second") {
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
      this.$axios
        .post("/dingding/getAuthUp", {
          auth: "download",
          fields: item.fileId,
        })
        .then((res) => {
          if (res.data.code == 1) {
            console.log(item);
            const _this = this;
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
                onFail: function (err) {
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
    //获取列表
    getList() {
      this.$axios
        .post("/project/supplierInfoList", {
          name: this.formInline.name,
          page: this.currentPage,
          supplier_type: this.formInline.supplier_type,
          number: this.pagesize,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.houseList = res.data.data;
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
                onFail: function (err) {},
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
    },
    //选择保管人
    addSingP() {
      const that = this;
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
    },
    //添加单位
    addPeopleClick() {
      this.viewOwnType = 1;
      this.viewType = 1;
      this.newDialogTitle = "添加";
      //   this.addUserForm = {
      //     name: '',
      //     number: '',
      //     abbre_name: '',
      //     zhuji_code: '',
      //     establish_time: '',
      //     unit_nature: '',
      //     personnel_size: '',
      //     region: '',
      //     tax_rate: '',
      //     charge_dept: '',
      //     charge_person: '',
      //     brief_info: '',
      //     contacts: '',
      //     contacts_mobile: '',
      //     bank: '',
      //     bank_cert: '',
      //     supplier_type: '',
      //     extend_two: '',
      //     extend_first: '',
      //     company_address: '',
      //     taxation_code: '',
      //     extend_five: '',
      //     extend_four: '',
      //     extend_three: [],
      //   };
      this.dialogFormVisible = true;
      this.addUserForm.id = "";
    },
    //编辑信息
    editPeopleInfo(row) {
      const _this = this;
      console.log(row);
      _this.newDialogTitle = "编辑";
      _this.viewType = 2;
      _this.viewOwnType = 2;
      _this.dialogFormVisible = true;
      _this.$nextTick(() => {
        _this.addUserForm = {
          name: "",
          number: "",
          abbre_name: "",
          zhuji_code: "",
          establish_time: "",
          unit_nature: "",
          personnel_size: "",
          region: "",
          tax_rate: "",
          charge_dept: "",
          charge_person: "",
          brief_info: "",
          contacts: "",
          contacts_mobile: "",
          bank: "",
          bank_cert: "",
          supplier_type: "",
          extend_two: "",
          extend_first: "",
          company_address: "",
          taxation_code: "",
          extend_five: "",
          extend_four: "",
          extend_three: [],
        };
        _this.addUserForm = JSON.parse(JSON.stringify(row));
        console.log(JSON.parse(JSON.stringify(row)), "回显回显回显回显");
        delete _this.addUserForm.supplier_type_name;
      });
    },
    //关闭覆盖层
    editCancel(formName) {
      this.dialogFormVisible = false;
      this.addUserForm.extend_three = [];

      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    editInfo(formName) {
      console.log(formName);
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.addUserForm));
          if (_this.viewOwnType == 1) {
            _this.$axios
              .post("/project/supplierInfoAdd", newData)
              .then((res) => {
                if (res.data.code == 1) {
                  _this.updateTemp();
                  _this.getList();
                  _this.loading = false;
                  _this.dialogFormVisible = false;
                  _this.addUserForm.extend_three = [];
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
            console.log(_this.addUserForm);
            _this.$axios
              .post("/project/supplierInfoEdit", newData)
              .then((res) => {
                if (res.data.code == 1) {
                  _this.updateTemp();
                  _this.getList();
                  _this.loading = false;
                  _this.dialogFormVisible = false;
                  _this.addUserForm.extend_three = [];
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
          }
        } else {
          _this.loading = false;
        }
      });
    },
    //添加文件
    addFilesClick(type) {
      const _this = this;
      _this.$axios
        .post("/dingding/getAuthUp", {
          type: "add",
          fileids: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            console.log(res.data);
            _this.$store.commit("setSpaceId", res.data.data.toString());
            _this.selectFiles(type);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectFiles(type) {
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
            console.log(result);
            //onSuccess将在文件上传成功之后调用
            switch (type) {
              case 3:
                result.data.forEach((item) => {
                  _this.addUserForm.extend_three.push(item);
                });
                break;
            }
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
  },
  mounted() {
    this.$utils.checkding();
    this.getTitleList();
    this.getBasicList();
  },
  created() {},
  computed: {},
};
</script>

<style lang="less" scoped>
.yichu {
  width: 300px;
  height: 36px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.filesTitle {
  width: 500px;
}
.dbasicList {
  margin-right: 0 !important;
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
