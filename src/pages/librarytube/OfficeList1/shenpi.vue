<template>
  <div id="materialTotalPlan">
    <!-- 材料总计划列表 -->
    <div class="main">
      <!-- 搜索条件 -->
      <commonSearch
        :formcommonList="formcommonList"
        :formInline="formInline"
        @searchClick="searchClick"
        @getList="getList"
        :isShen="true"
      ></commonSearch>
      <div class="mainContent">
        <el-row class="maincBtn mainMoveBtn">
          <div class="mmbLeft">
            <el-button type="primary" size="medium" @click="newAdd"
              >新建</el-button
            >
          </div>
          <div class="mmbRight">
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-delete"
              @click="deleteList"
              >删除</el-button
            >
            <!-- <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-upload2"
              @click="exportIn"
              >导入</el-button
            > -->
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
              icon="el-icon-refresh"
              @click="updateList"
              >刷新</el-button
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
          <!-- <div class="mmbLeft">
                        <el-button
                            type="primary"
                            plain
                            size="medium"
                            round
                            @click="deleteList"
                            >删除</el-button
                        >
                        <el-button
                            type="primary"
                            plain
                            size="medium"
                            round
                            @click="exportList"
                            >导出</el-button
                        >
                        <el-button
                            type="primary"
                            plain
                            size="medium"
                            round
                            @click="updateList"
                            >刷新</el-button
                        >
                    </div>
                    <div
                        class="mmbRight"
                        v-if="$store.state.userInfo.admin == 1"
                    >
                        <i class="el-icon-s-tools"></i>
                        <el-button type="text" @click="viewShow"
                            >设置显示字段</el-button
                        >
                    </div> -->
        </el-row>
        <commonTable
          :tpList="tpList"
          :titleList="titleList"
          :footerNumList="footerNumList"
          :isFooter="isFooter"
          @listenChild="getMult"
          printTableName="material_master_plan"
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
      <el-dialog
        title="导入"
        :visible.sync="upFormVisible"
        :close-on-click-modal="false"
        @close="upCancel('ruleForm')"
        class="uploadExcel"
        width="520px"
      >
        <el-form
          @submit.native.prevent
          :model="upForm"
          :rules="aufRules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="计划主题" prop="name">
            <el-input
              v-model="upForm.name"
              placeholder="请输入计划主题"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目名称：" prop="project_name">
            <el-select
              v-model="upForm.project_name"
              filterable
              placeholder="请选择项目名称"
            >
              <el-option
                v-for="(item, index) in projectList"
                :key="index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              v-model="upForm.remarks"
              maxlength="240"
              show-word-limit
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
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
              @click="upSave('ruleForm')"
              >确定</el-button
            >
            <el-button
              type="primary"
              plain
              size="medium"
              @click="upCancel('ruleForm')"
              >取消</el-button
            >
          </div>
        </el-form>
      </el-dialog>
      <el-dialog
        title="添加"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="1200px"
        @close="editCancel('dingLogRef')"
        class="phDialog"
      >
        <div class="phdMain">
          <div class="cDrawerContent">
            <el-form
              @submit.native.prevent
              :model="dingLogForm"
              :rules="dingLogRules"
              ref="dingLogRef"
              label-width="130px"
            >
              <el-form-item label="计划主题：" prop="name">
                <el-input
                  v-model="dingLogForm.name"
                  maxlength="50"
                  placeholder="请输入计划主题"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目名称：" prop="project_name">
                <el-input
                  v-model="dingLogForm.project_name"
                  placeholder="请选择项目"
                  readonly
                  @focus="viewProject"
                ></el-input>
              </el-form-item>
              <el-form-item label="附件：" class="dRemarkList">
                <div class="uploadFileList">
                  <div class="ufSfz">
                    <div class="ufsTop">
                      <!-- <div style="width: 100px">附件</div> -->
                      <div @click="addFilesClick" class="addclickFjClass">
                        添加附件
                      </div>
                    </div>
                    <div class="dingFilesClass">
                      <div
                        v-for="(item, index) in dingLogForm.enclosure"
                        :key="index"
                      >
                        <div>
                          <div class="fileIcon">
                            <i class="el-icon-document"></i>
                          </div>
                          <div class="filesTitle">
                            <div>
                              {{ item.fileName }}
                            </div>
                            <p>{{ (item.fileSize / 1024).toFixed(2) }}kb</p>
                          </div>
                        </div>
                        <div>
                          <div class="watchBtn" @click="watchFiles(item)">
                            预览
                          </div>
                          <div class="fileIcon2">
                            <i
                              class="el-icon-error"
                              @click="deleteFiles(index, 4)"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="备注：" prop="remarks" class="dRemarkList">
                <el-input
                  type="textarea"
                  v-model="dingLogForm.remarks"
                  maxlength="240"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <div class="dRemarkList">
                <el-row class="editBtn">
                  <div>材料明细</div>
                  <div>
                    <el-button
                      size="medium"
                      type="primary"
                      plain
                      @click="addTable"
                      icon="el-icon-plus"
                      >添加</el-button
                    >
                    <el-button
                      size="medium"
                      type="primary"
                      plain
                      @click="deleteTable"
                      icon="el-icon-delete"
                      >删除</el-button
                    >
                  </div>
                </el-row>
                <el-table
                  :border="true"
                  ref="manyTable"
                  :data="dingLogForm.detailed"
                  style="width: 100%; border: 1px solid #ebeef5"
                  @selection-change="handleTableChange"
                  size="mini"
                  :row-class-name="tableRowClassName"
                >
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column label="序号" type="index" width="60">
                  </el-table-column>
                  <el-table-column>
                    <template slot="header" slot-scope="scope">
                      <span style="color: red">*</span>材料名称
                    </template>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.name" readonly></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="规格型号">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.size" readonly></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="单位" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.unit" readonly></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column show-overflow-tooltip>
                    <template slot="header" slot-scope="scope">
                      <span style="color: red">*</span>总计划量
                    </template>
                    <template slot-scope="scope">
                      <el-input-number
                        v-model="scope.row.zh_number"
                        :controls="false"
                        :min="0"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column label="使用部位" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.position"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.remarks"
                        maxlength="50"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="printable" label="打印" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="mini"
                        @click.stop="
                          printPDF(scope.row.id).catch((err) => {
                            console.log(err);
                          })
                        "
                        >打印</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="shenpi dRemarkList">
                <div>审批流程</div>
                <div class="line">
                  <div class="spList">
                    <div>
                      <div>审批人</div>
                      <p>请选择申请人</p>
                    </div>
                    <div class="addManeger">
                      <div
                        class="addMList"
                        v-if="dingLogForm.approval_userid.length > 3"
                      >
                        <div class="mdnList">
                          <div class="mdren" @click="openAllPeople(1)">
                            <span class="touxiang">
                              <i class="el-icon-s-custom"></i>
                            </span>
                          </div>
                          <p>查看全部</p>
                        </div>
                        <div class="mdnPlus">
                          <i class="el-icon-plus"></i>
                        </div>
                      </div>
                      <div
                        class="addMList"
                        v-for="(
                          item, index
                        ) in dingLogForm.approval_userid.slice(0, 3)"
                        :key="index"
                      >
                        <div class="mdnList">
                          <div class="mdren">
                            <img v-if="item.avatar" :src="item.avatar" alt />
                            <span class="touxiang" v-else>{{
                              item.name.length <= 2
                                ? item.name
                                : item.name.substr(item.name.length - 2, 2)
                            }}</span>
                          </div>
                          <p>{{ item.name }}</p>
                          <i
                            class="el-icon-error"
                            @click="handleClose(index, 1)"
                          ></i>
                        </div>
                        <div class="mdnPlus">
                          <i class="el-icon-plus"></i>
                        </div>
                      </div>
                      <div class="addMList addMListLast">
                        <div class="mdnList">
                          <div class="mdren" @click="addManyP(1)">
                            <span class="touxiang">
                              <span class="touxiangdian">*</span>
                              <i class="el-icon-plus"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="spList">
                    <div>
                      <div>抄送人</div>
                      <p>请选择抄送人</p>
                    </div>
                    <div class="addManeger">
                      <div
                        class="addMList"
                        v-if="dingLogForm.cc_userid.length > 3"
                      >
                        <div class="mdnList">
                          <div class="mdren" @click="openAllPeople(2)">
                            <span class="touxiang">
                              <i class="el-icon-s-custom"></i>
                            </span>
                          </div>
                          <p>查看全部</p>
                        </div>
                        <div class="mdnPlus">
                          <i class="el-icon-plus"></i>
                        </div>
                      </div>
                      <div
                        class="addMList"
                        v-for="(item, index) in dingLogForm.cc_userid.slice(
                          0,
                          3
                        )"
                        :key="index"
                      >
                        <div class="mdnList">
                          <div class="mdren">
                            <img v-if="item.avatar" :src="item.avatar" alt />
                            <span class="touxiang" v-else>{{
                              item.name.length <= 2
                                ? item.name
                                : item.name.substr(item.name.length - 2, 2)
                            }}</span>
                          </div>
                          <p>{{ item.name }}</p>
                          <i
                            class="el-icon-error"
                            @click="handleClose(index, 2)"
                          ></i>
                        </div>
                        <div class="mdnPlus">
                          <i class="el-icon-plus"></i>
                        </div>
                      </div>
                      <div class="addMList addMListLast">
                        <div class="mdnList">
                          <div class="mdren" @click="addManyP(2)">
                            <span class="touxiang">
                              <i class="el-icon-plus"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="shenpiThree">
                    <span><span></span></span>
                  </div>
                  <div class="shenpiFore">
                    <span><span></span></span>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="editCancel('dingLogRef')"
            >取 消</el-button
          >
          <el-button
            size="medium"
            type="primary"
            :loading="loading"
            @click="editInfo('dingLogRef')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="全部审批人员"
        :append-to-body="true"
        :visible.sync="AllPeopleVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
      >
        <div style="margin-bottom: 10px">
          共有{{ dingLogForm.approval_userid.length }}人
        </div>
        <div class="showAllPeople">
          <div
            class="addMList"
            v-for="(item, index) in dingLogForm.approval_userid"
            :key="index"
          >
            <div class="mdnList">
              <div class="mdren">
                <img v-if="item.avatar" :src="item.avatar" alt />
                <span class="touxiang" v-else>{{
                  item.name.length <= 2
                    ? item.name
                    : item.name.substr(item.name.length - 2, 2)
                }}</span>
              </div>
              <p>{{ item.name }}</p>
              <i class="el-icon-error" @click="handleClose(index, 1)"></i>
            </div>
            <div class="mdnPlus">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="addMList addMListLast">
            <div class="mdnList">
              <div class="mdren" @click="addManyP(1)">
                <span class="touxiang">
                  <i class="el-icon-plus"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="全部抄送人员"
        :append-to-body="true"
        :visible.sync="AllSendPeopleVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
      >
        <div style="margin-bottom: 10px">
          共有{{ dingLogForm.cc_userid.length }}人
        </div>
        <div class="showAllPeople">
          <div
            class="addMList"
            v-for="(item, index) in dingLogForm.cc_userid"
            :key="index"
          >
            <div class="mdnList">
              <div class="mdren">
                <img v-if="item.avatar" :src="item.avatar" alt />
                <span class="touxiang" v-else>{{
                  item.name.length <= 2
                    ? item.name
                    : item.name.substr(item.name.length - 2, 2)
                }}</span>
              </div>
              <p>{{ item.name }}</p>
              <i class="el-icon-error" @click="handleClose(index, 2)"></i>
            </div>
            <div class="mdnPlus">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="addMList addMListLast">
            <div class="mdnList">
              <div class="mdren" @click="addManyP(2)">
                <span class="touxiang">
                  <i class="el-icon-plus"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="选择材料"
        :visible.sync="xFormVisible"
        :close-on-click-modal="false"
        append-to-body
        width="1000px"
        @close="xCancel('dingXRef')"
        class="phDialog"
      >
        <div class="phdMain">
          <div class="cDrawerContent">
            <commonMa @listenChild="getSelect" :isClose="isClose"></commonMa>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="xCancel('dingXRef')"
            >取 消</el-button
          >
          <el-button
            size="medium"
            type="primary"
            :loading="loaded"
            @click="xInfo('dingXRef')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="选择项目"
        :visible.sync="pFormVisible"
        :close-on-click-modal="false"
        append-to-body
        width="1000px"
        @close="pCancel"
        class="phDialog"
      >
        <div class="phdMain">
          <div class="cDrawerContent">
            <commonPro
              v-if="pFormVisible"
              @listenChild="getPid"
              :isCloseP="isCloseP"
            ></commonPro>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="pCancel">取 消</el-button>
          <el-button
            size="medium"
            type="primary"
            :loading="loaded"
            @click="pInfo"
            >确 定</el-button
          >
        </div>
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
    </div>
  </div>
</template>

<script>
import commonMa from "@/components/commonMaterial.vue";
import commonPro from "@/components/commonProject.vue";
import eupload from "../../../components/excelUpload.vue";
import commonTable from "@/components/commonTablenew.vue";
import commonSearch from "@/components/commonSearch.vue";

import draggable from "vuedraggable";
import * as dd from "dingtalk-jsapi";
export default {
  name: "materialTotalPlan",
  components: {
    commonMa,
    commonPro,
    draggable,
    commonTable,
    eupload,
    commonSearch,
  },
  data() {
    return {
      loading: false,
      //搜索条件
      formcommonList: [
        {
          labelName: "计划主题",
          labelData: "name",
        },
        {
          labelName: "开始时间",
          labelData: "startTime",
        },
        {
          labelName: "结束时间",
          labelData: "endTime",
        },
        {
          labelName: "项目名称",
          labelData: "project_name",
        },

        {
          labelName: "审批状态",
          labelData: "status",
        },
        {
          labelName: "项目性质",
          labelData: "lian_ying",
        },
      ],
      aufRules: {
        project_name: [
          {
            required: true,
            message: "请选择项目",
            trigger: ["blur", "change"],
          },
        ],
        name: [
          {
            required: true,
            message: "请输入计划主题",
            trigger: "blur",
          },
        ],
      },
      printable: false,
      upImgList2: "",
      licenceImg2: "",
      isShow2: ["1"],
      upFormVisible: false,
      upForm: {
        url: "",
        name: "",
        project_name: "",
        remarks: "",
      },
      allProjectList: [],
      projectList: [],
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      xFormVisible: false,
      loaded: false,
      formInline: {
        name: "",
        type: "",
        status: "",
        startTime: "",
        endTime: "",
        organizer: "",
        project_name: "",
        send_name: "",
        send_userid: "",
        lian_ying: "",
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      dialogFormVisible: false,
      AllSendPeopleVisible: false,
      AllPeopleVisible: false,
      dingLogForm: {
        process_code: "",
        name: "",
        project_name: "",
        remarks: "",
        fjurl: [],

        approval_userid: [],
        cc_userid: [],
        send_userid: this.$store.state.userInfo.uid,
        detailed: [],
        enclosure: [],
      },
      manyTableData: [],
      listenTable: [],
      isClose: 1,
      isCloseP: 1,
      listenPname: "",
      pFormVisible: false,
      dingLogRules: {
        project_name: [
          {
            required: true,
            message: "请选择项目",
            trigger: ["blur", "change"],
          },
        ],
        name: [
          {
            required: true,
            message: "请输入计划主题",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "statistics-warning-row";
      } else {
        return "";
      }
    },
    resetClick() {
      this.formInline = {
        name: "",
        type: "",
        status: "",
        startTime: "",
        endTime: "",
        organizer: "",
        project_name: "",
        send_name: "",
        send_userid: "",
        lian_ying: "",
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
      console.log(this.myArray);
      if (newT.length > 0) {
        this.$nextTick(() => {
          this.titleList = JSON.parse(JSON.stringify(newT));
          this.sendTitleList();
          if (this.isFooter == 1) {
            let newFArr = [];
            this.titleList.map((item) => {
              this.newFooter.forEach((element) => {
                if (element.value == item.value) {
                  newFArr.push(element);
                }
              });
            });
            this.footerNumList = JSON.parse(JSON.stringify(newFArr));
          }
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
          name: "material_master_plan",
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
    async getPrintableStatus() {
      const res = await this.$axios.post("/finance/control_display", {
        tableName: "material_master_plan",
      });
      if (res.data.code === 1) {
        this.printable = res.data.type === "1";
      }
    },

    async printPDF(id) {
      const _this = this;
      const res = await _this.$axios.post("/finance/dc_pdf", {
        tableName: "material_master_plan",
        id: id,
      });
      if (res.data.code === 1) {
        console.log(res);
        window.open(`http://${res.data.file_path}`);
      }
    },

    sendTitleList() {
      this.$axios
        .post("/spread/editFiledCurrency", {
          name: "material_master_plan",
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
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    viewProject() {
      this.pFormVisible = true;
    },
    pCancel() {
      this.isCloseP = 2;
      this.pFormVisible = false;
    },
    pInfo() {
      if (this.listenPname) {
        this.dingLogForm.project_name = this.listenPname;
        this.isCloseP = 2;
        this.pFormVisible = false;
      } else {
        this.$message({
          type: "warning",
          message: "请您选择项目",
          duration: 1500,
        });
      }
    },
    getPid(val) {
      this.listenPname = val;
    },
    xCancel() {
      this.isClose = 2;
      this.xFormVisible = false;
    },
    xInfo() {
      if (this.listenTable.length > 0) {
        let newData = this.listenTable.map((item) => ({
          id: item.id,
          name: item.name,
          size: item.size,
          unit: item.unit,
          zh_number: "",
          position: "",
          remarks: "",
        }));
        newData.forEach((item) => {
          this.dingLogForm.detailed.push(item);
        });
        this.dingLogForm.detailed = this.$utils.idunique(
          this.dingLogForm.detailed
        );
        this.isClose = 2;
        this.xFormVisible = false;
      } else {
        this.$message({
          type: "warning",
          message: "请您选择材料",
          duration: 1500,
        });
      }
    },
    //获取子传父选择的值
    getSelect(val) {
      this.listenTable = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    //发起审批
    newAdd() {
      const _this = this;

      _this.$axios
        .post("/project/materialMasterPlan")
        .then((res) => {
          if (res.data.code == 1) {
            let newUrl =
              "https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=" +
              _this.$store.state.cid +
              "#/custom/?processCode=" +
              res.data.data;
            dd.ready(function () {
              dd.biz.util.openLink({
                url: newUrl, //要打开链接的地址
                onSuccess: function (result) {
                  /**/
                },
                onFail: function (err) {},
              });
            });
          } else {
            _this.$notify({
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
    updateList() {
      this.getList(1);
    },
    //获取列表
    getList(ntype) {
      this.$axios
        .post("/project/materialMasterPlanList", {
          page: this.currentPage,
          number: this.pagesize,
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
          organizer: this.formInline.organizer,
          project_name: this.formInline.project_name,
          name: this.formInline.name,
          shenpi: this.formInline.status,
          send_name: this.formInline.send_name,
          send_userid: this.formInline.send_userid,
          lian_ying: this.formInline.lian_ying,
        })
        .then((res) => {
          if (res.data.code == 1) {
            if (ntype == 1) {
              this.$message({
                message: "列表刷新成功",
                type: "success",
                duration: 1500,
              });
            }
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.footerNumList = [];
            this.isFooter = res.data.mould_data.is_heji;
            if (this.isFooter == 1) {
              this.newFooter = res.data.mould_data.mould_data;
              this.titleList.map((item) => {
                this.newFooter.forEach((element) => {
                  if (element.value == item.value) {
                    this.footerNumList.push(element);
                  }
                });
              });
            }
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
    deleteList() {
      if (this.multSelectData.length > 0) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios
              .post("/project/materialMasterPlanDel", {
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
          message: "请先勾选要删除的数据！",
          type: "warning",
          duration: 1500,
        });
      }
    },
    //还原列表
    backList() {
      this.$axios
        .post("/project/materialMasterPlanReduction")
        .then((res) => {
          if (res.data.code == 1) {
            this.getList();
            this.$message({
              message: "已还原",
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
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post("/project/materialMasterPlanDownload", {
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
          message: "请先勾选要导出的数据！",
          type: "warning",
          duration: 1500,
        });
      }
    },
    //查看全部
    openAllPeople(type) {
      if (type == 1) {
        this.AllPeopleVisible = true;
      } else {
        this.AllSendPeopleVisible = true;
      }
    },
    //删除审批人员
    handleClose(index, type) {
      switch (type) {
        case 1:
          this.dingLogForm.approval_userid.splice(index, 1);
          break;
        case 2:
          this.dingLogForm.cc_userid.splice(index, 1);
          break;
      }
    },
    //填加审批人员
    addManyP(type) {
      const _this = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: _this.$store.state.cid, //企业的corpId
          multiple: true, //是否多选
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
            if (type == 1) {
              result.users.forEach((item) => {
                _this.dingLogForm.approval_userid.push(item);
              });
            } else if (type == 2) {
              result.users.forEach((item) => {
                _this.dingLogForm.cc_userid.push(item);
              });
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
    //增加明细
    addTable() {
      // this.dingLogForm.detailed.push({
      //     id: '',
      //     name: '',
      //     size: '',
      //     unit: '',
      //     zh_number: '',
      //     position: '',
      //     remarks: ''
      // });
      this.xFormVisible = true;
    },
    handleTableChange(val) {
      this.manyTableData = val;
    },
    //删除明细
    deleteTable() {
      const _this = this;
      if (_this.manyTableData.length > 0) {
        // 拿到选中的数据；
        let val = JSON.parse(JSON.stringify(_this.manyTableData));
        // 如果选中数据存在
        if (val) {
          // 将选中数据遍历
          val.forEach(function (item, index) {
            // 遍历源数据
            _this.dingLogForm.detailed.forEach(function (itemI, indexI) {
              // 如果选中数据跟元数据某一条标识相等，删除对应的源数据
              if (item.id === itemI.id) {
                _this.dingLogForm.detailed.splice(indexI, 1);
              }
            });
          });
        }
        // 清除选中状态
        // this.$refs.multipleTable.clearSelection();
      } else {
        _this.$message({
          type: "warning",
          message: "请您先选择",
          duration: 1500,
        });
      }
    },
    //添加文件
    addFilesClick() {
      const _this = this;
      _this.$axios
        .post("/dingding/getAuthUp", {
          auth: "add",
          fields: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            _this.$store.commit("setSpaceId", res.data.data.toString());
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
              _this.dingLogForm.enclosure.push(item);
            });
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
    //预览文件
    watchFiles(item) {
      const _this = this;
      _this.$axios
        .post("/dingding/getAuthUp", {
          auth: "download",
          fields: item.fileId,
        })
        .then((res) => {
          if (res.data.code == 1) {
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
    //关闭覆盖层
    editCancel(formName) {
      this.dialogFormVisible = false;
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.dingLogForm.detailed = [
          {
            name: "",
            size: "",
            unit: "",
            zh_number: "",
            position: "",
            remarks: "",
          },
        ];
        this.dingLogForm.cc_userid = [];
        this.dingLogForm.approval_userid = [];
      });
    },
    editInfo(formName) {
      const _this = this;
      let titcount = 0;
      _this.loading = true;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.dingLogForm));
          if (newData.detailed.length > 0) {
            for (let i = 0; i < newData.detailed.length; i++) {
              if (newData.detailed[i].name && newData.detailed[i].zh_number) {
                titcount++;
              } else {
                if (!newData.detailed[i].zh_number) {
                  _this.$notify({
                    title: "警告",
                    message: "请输入总计划量",
                    type: "warning",
                    duration: 1500,
                  });
                  _this.loading = false;
                  return false;
                }
                if (!newData.detailed[i].name) {
                  _this.$notify({
                    title: "警告",
                    message: "请选择材料",
                    type: "warning",
                    duration: 1500,
                  });
                  _this.loading = false;
                  return false;
                }
              }
            }
            let newL = newData.detailed.length;
            if (titcount == newL) {
              if (newData.approval_userid.length > 0) {
                newData.detailed.forEach((item) => {
                  if (item.id) {
                    delete item.id;
                  }
                });
                _this.$axios
                  .post("/projectfour/materialMasterPlanSp", newData)
                  .then((res) => {
                    if (res.data.code == 1) {
                      _this.getList();
                      _this.loading = false;
                      _this.dialogFormVisible = false;
                      _this.$refs[formName].resetFields();
                      _this.dingLogForm.detailed = [
                        {
                          name: "",
                          size: "",
                          unit: "",
                          zh_number: "",
                          position: "",
                          remarks: "",
                        },
                      ];
                      _this.dingLogForm.cc_userid = [];
                      _this.dingLogForm.approval_userid = [];
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
                _this.loading = false;
                _this.$notify({
                  title: "警告",
                  message: "请选择申请人员",
                  type: "warning",
                  duration: 1500,
                });
              }
            }
          } else {
            _this.loading = false;
            _this.$notify({
              title: "警告",
              message: "请增加借证明细，明细不能为空",
              type: "warning",
              duration: 1500,
            });
          }
        } else {
          _this.loading = false;
        }
      });
    },
    zsChange() {
      this.xFormVisible = true;
    },
    //导入
    derive() {
      dd.ready(function () {
        dd.biz.util.downloadFile({
          url: "http://dingzhukuai.zzdingyun.com/public/Materialtemplate.xls",
          name: "Materialtemplate.xls", //定义下载文件名字
          onProgress: function (msg) {
            // 文件下载进度回调
          },
          onSuccess: function (result) {},
          onFail: function () {},
        });
      });
    },
    upCancel(formName) {
      this.loading = false;
      this.upForm.url = "";
      this.upImgList2 = "";
      this.licenceImg2 = "";
      this.isShow2 = [];
      this.$refs[formName].resetFields();
      this.upFormVisible = false;
    },
    upSave(formName) {
      const _this = this;
      _this.loading = true;
      if (_this.upForm.url) {
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$axios
              .post("/finance/import", _this.upForm)
              .then((res) => {
                if (res.data.code == 1) {
                  _this.loading = false;
                  _this.getList();
                  _this.$refs[formName].resetFields();
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
          } else {
            _this.loading = false;
          }
        });
      } else {
        _this.loading = false;
        _this.$message({
          type: "warning",
          message: "请您先上传文件",
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
  },
  created() {
    this.$utils.checkding();
    this.$utils.utilAllProject();
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.getTitleList();
    this.getPrintableStatus();
  },
  mounted() {
    this.allProjectList = JSON.parse(this.$store.state.allPro);
    this.projectList = JSON.parse(this.$store.state.allPro);
  },
  computed: {
    pickerStart() {
      return {
        disabledDate: (time) => {
          let endDateVal = this.formInline.endTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      };
    },
    pickerEnd() {
      return {
        disabledDate: (time) => {
          let beginDateVal = this.formInline.startTime;
          if (beginDateVal) {
            return (
              // time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          }
        },
      };
    },
  },
};
</script>
