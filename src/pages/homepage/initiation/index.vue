<template>
  <div id="projectApprovalList">
    <!-- 立项项目列表 -->
    <div class="main">
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
              <el-form-item label="项目名称:">
                <el-select
                  v-model="formInline.name"
                  clearable
                  filterable
                  placeholder="请选择项目名称"
                >
                  <el-option
                    v-for="(item, index) in projectType1"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="searchTime" label="开始时间:">
                <el-date-picker
                  v-model="formInline.startTime"
                  :picker-options="pickerStart"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item class="searchTime" label="结束时间:">
                <el-date-picker
                  v-model="formInline.endTime"
                  :picker-options="pickerEnd"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="项目类型:">
                <el-select
                  v-model="formInline.type"
                  clearable
                  filterable
                  placeholder="请选择项目类型"
                >
                  <el-option
                    v-for="(item, index) in projectType"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目状态:">
                <el-select
                  v-model="formInline.bstatus"
                  clearable
                  filterable
                  placeholder="请选择项目状态"
                >
                  <el-option
                    v-for="(item, index) in projectStatus"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="审批状态:">
                <el-select
                  v-model="formInline.status"
                  clearable
                  filterable
                  placeholder="请选择审批状态"
                >
                  <el-option
                    v-for="(item, index) in approvalStatus"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="申请人:">
                <div class="el-input el-input--suffix names" @click="addManyP1">
                  {{ formInline.namesa }}
                </div>
              </el-form-item>

              <el-form-item label="项目性质:">
                <el-select
                  v-model="formInline.lian_ying"
                  clearable
                  filterable
                  placeholder="请选择项目性质"
                >
                  <el-option label="自营" value="1"></el-option>
                  <el-option label="联营" value="2"></el-option>
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
            <el-button
              v-if="
                $store.state.cid == 'ding1b508a8102d46015ffe93478753d9884' ||
                $store.state.cid == 'dinga090000f57c90b3eee0f45d8e4f7c288'
              "
              type="primary"
              plain
              size="medium"
              icon="el-icon-upload2"
              @click="exportIn"
              >导入</el-button
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
        </el-row>

        <el-table
          :border="true"
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
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column
            v-for="(item, index) in titleList"
            :key="index"
            :prop="item.value"
            :label="item.label"
            :show-overflow-tooltip="true"
            align="left"
            width="120"
          >
          </el-table-column>
          <el-table-column label="审批状态" align="left">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '2'" style="color: #17c298"
                >已同意</span
              >
              <span v-else-if="scope.row.status == '1'" style="color: #e8a54c"
                >审批中</span
              >
              <span v-else-if="scope.row.status == '3'" style="color: #f16d6d"
                >已拒绝</span
              >
              <span v-else style="color: #409eff">外部数据</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="left" min-width="180">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status != '5' && issuite"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                :disabled="scope.row.status == '2' ? false : true"
                @click="editClick(scope.row, 1)"
                >编辑</el-button
              >
              <el-button
                v-if="scope.row.status == '5'"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="editClick(scope.row, 2)"
                >编辑</el-button
              >
              <el-button
                v-if="
                  scope.row.project_status &&
                  scope.row.project_status.indexOf('竣工') != -1 &&
                  scope.row.status == '2'
                "
                type="primary"
                size="mini"
                icon="el-icon-folder-opened"
                @click="fileClick(scope.row, 3)"
                >归档</el-button
              >
              <el-button
                v-else-if="
                  scope.row.project_status != '竣工' &&
                  scope.row.project_status != '归档'
                "
                disabled
                type="primary"
                size="mini"
                icon="el-icon-folder-opened"
                >归档</el-button
              >
              <div
                v-else-if="
                  scope.row.project_status == '归档' && scope.row.status == '2'
                "
              >
                <el-popconfirm
                  title="确定取消归档吗？"
                  @confirm="deleteFiles2(scope.row)"
                >
                  <el-button type="primary" slot="reference" size="mini"
                    >取消归档</el-button
                  >
                </el-popconfirm>
              </div>

              <el-button
                type="text"
                size="mini"
                v-if="printable"
                @click.stop="
                  printPDF(scope.row.id).catch((err) => {
                    console.log(err);
                  })
                "
                >打印</el-button
              >
            </template>
          </el-table-column>
          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">小计</div>
                <div class="sum_footer_unit"></div>
                <div
                  v-for="(item, index) in footerNumList"
                  :key="index"
                  :class="
                    item.xj
                      ? 'over_sum_text sum_footer_unit'
                      : 'sum_footer_unit'
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
                <div class="sum_footer_unit"></div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div
                  v-for="(item, index) in footerNumList"
                  :key="index"
                  :class="
                    item.hj
                      ? 'over_sum_text sum_footer_unit'
                      : 'sum_footer_unit'
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
                <div class="sum_footer_unit"></div>
              </div>
            </div>
          </div>
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
      <el-dialog
        :title="newTitle"
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
              <el-form-item label="项目名称：" prop="name">
                <el-input
                  v-model="dingLogForm.name"
                  placeholder="请输入项目名称"
                  maxlength="40"
                  :disabled="isedit"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目类型:" prop="type">
                <el-select
                  v-model="dingLogForm.type"
                  clearable
                  filterable
                  placeholder="请选择项目类型"
                >
                  <el-option
                    v-for="(item, index) in projectType"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="计划开工日期:" prop="plan_start_riqi">
                <el-date-picker
                  v-model="dingLogForm.plan_start_riqi"
                  :picker-options="planStart"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="计划竣工日期:" prop="plan_end_riqi">
                <el-date-picker
                  v-model="dingLogForm.plan_end_riqi"
                  :picker-options="planEnd"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="项目状态:" prop="project_status">
                <el-select
                  v-model="dingLogForm.project_status"
                  clearable
                  filterable
                  placeholder="请选择项目状态"
                >
                  <el-option
                    v-for="(item, index) in projectStatus"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目负责人:" prop="stalker_name">
                <el-input
                  v-model="dingLogForm.stalker_name"
                  placeholder="请选择项目负责人"
                  id="addinput"
                  @focus="addSingle"
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="项目位置:" prop="procode">
                <el-cascader
                  style="width: 100%"
                  ref="cascaderAddr"
                  v-model="dingLogForm.procode"
                  :options="provinceList"
                  @change="provinceBlur"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="详细地址:" prop="address">
                <el-input
                  v-model="dingLogForm.address"
                  placeholder="请输入详细地址"
                  maxlength="30"
                ></el-input>
              </el-form-item>
              <el-form-item label="工程规模:" prop="quantities">
                <el-input
                  v-model="dingLogForm.quantities"
                  placeholder="请输入工程规模"
                  maxlength="50"
                ></el-input>
              </el-form-item>
              <el-form-item label="工程造价(元):" prop="make_cost">
                <el-input-number
                  v-model="dingLogForm.make_cost"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入工程造价"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="预期利润(元):" prop="expected_profit">
                <el-input-number
                  v-model="dingLogForm.expected_profit"
                  controls-position="right"
                  placeholder="请输入预期利润"
                ></el-input-number>
              </el-form-item>

              <el-form-item
                :label="
                  $store.state.cid == 'ding958cdfb717ce33bb35c2f4657eb6378f'
                    ? '设备编号'
                    : $store.state.cid == 'ding1a9d6aa4c63dfb99ffe93478753d9884'
                    ? '设备编号'
                    : $store.state.cid == 'dingb6f8d3afc6d3c2d024f2f5cc6abecb85'
                    ? '设备编号'
                    : '质量等级'
                "
                prop="quality_level"
              >
                <el-input
                  v-model="dingLogForm.quality_level"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="
                  $store.state.cid == 'ding0ae1ff624a5a383e35c2f4657eb6378f'
                    ? '施工单位:'
                    : $store.state.cid == 'dinga090000f57c90b3eee0f45d8e4f7c288'
                    ? '施工单位'
                    : '所属分公司'
                "
                prop="branch_office"
              >
                <el-select
                  @focus="getCorpList('内部单位')"
                  v-model="dingLogForm.branch_office"
                  clearable
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in branchList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                :label="
                  $store.state.cid == 'ding0ae1ff624a5a383e35c2f4657eb6378f'
                    ? '委托单位:'
                    : $store.state.cid == 'dinga090000f57c90b3eee0f45d8e4f7c288'
                    ? '委托单位'
                    : '建设单位'
                "
                prop="construction_unit"
              >
                <el-select
                  @focus="getCorpList('甲方单位')"
                  v-model="dingLogForm.construction_unit"
                  clearable
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in branchList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item
                                :label="
                                    $store.state.cid ==
                                    'ding0ae1ff624a5a383e35c2f4657eb6378f'
                                        ? '委托单位:'
                                        : $store.state.cid ==
                                          'dinga090000f57c90b3eee0f45d8e4f7c288'
                                        ? '委托单位'
                                        : '建设单位'
                                "
                                prop="construction_unit"
                            >
                                <el-input
                                    v-model="dingLogForm.construction_unit"
                                    placeholder="请输入"
                                    maxlength="50"
                                ></el-input>
                            </el-form-item> -->
              <el-form-item label="联系人:" prop="contacts">
                <el-input
                  v-model="dingLogForm.contacts"
                  placeholder="请输入联系人"
                  maxlength="50"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系方式:" prop="contacts_mobile">
                <el-input
                  v-model="dingLogForm.contacts_mobile"
                  placeholder="请输入联系方式"
                  maxlength="50"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="
                  $store.state.cid == 'ding5ce1bcef4579bcdf35c2f4657eb6378f'
                    ? '合同金额'
                    : '联系地址'
                "
                prop="contacts_address"
              >
                <el-input
                  v-model="dingLogForm.contacts_address"
                  placeholder="请输入"
                  maxlength="240"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item
                                label="单价(元):"
                                prop="price"
                                v-if="
                                    $store.state.cid ==
                                        'ding1a9d6aa4c63dfb99ffe93478753d9884' ||
                                    $store.state.cid ==
                                        'ding958cdfb717ce33bb35c2f4657eb6378f'
                                "
                            >
                                <el-input-number
                                    v-model="dingLogForm.price"
                                    controls-position="right"
                                    :min="0"
                                    placeholder="请输入单价"
                                ></el-input-number>
                            </el-form-item> -->
              <!-- <el-form-item
                                label="单价类型:"
                                prop="price_type"
                                v-if="
                                    $store.state.cid ==
                                        'ding1a9d6aa4c63dfb99ffe93478753d9884' ||
                                    $store.state.cid ==
                                        'ding958cdfb717ce33bb35c2f4657eb6378f'
                                "
                            >
                                <el-select
                                    v-model="dingLogForm.price_type"
                                    clearable
                                    filterable
                                    placeholder="请选择单价类型"
                                >
                                    <el-option
                                        v-for="(item, index) in priceStatus"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item> -->
              <el-form-item
                label="项目成员:"
                prop="extend_five"
                style="width: 100%"
              >
                <div class="addManeger" style="display: flex">
                  <div
                    class="addMList"
                    v-if="dingLogForm.extend_five.length > 3"
                  >
                    <div class="mdnList">
                      <div class="mdren" @click="openAllPeople(3)">
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
                    v-for="(item, index) in dingLogForm.extend_five.slice(0, 3)"
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
                        @click="handleClose(index, 3)"
                      ></i>
                    </div>
                    <div class="mdnPlus">
                      <i class="el-icon-plus"></i>
                    </div>
                  </div>
                  <div class="addMList addMListLast">
                    <div class="mdnList">
                      <div class="mdren" @click="addManyP(3)">
                        <span class="touxiang">
                          <i class="el-icon-plus"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item class="newtijiao" label="上传图片：">
                <imgupload
                  :upImgList="upImgList"
                  :licenceImg="licenceImg"
                  :isShow="isShow"
                  v-on:listenToChildEvent="imgshow"
                ></imgupload>
              </el-form-item>
              <!-- <el-form-item label="图片：" class="dRemarkList">
                                <div class="uploadFileList">
                                    <div class="ufSfz">
                                        <div class="ufsTop">
                                            <div
                                                @click="addFilesClick(1)"
                                                class="addclickFjClass"
                                            >
                                                添加图片
                                            </div>
                                        </div>
                                        <div class="dingFilesClass">
                                            <div
                                                v-for="(
                                                    item, index
                                                ) in dingLogForm.image"
                                                :key="index"
                                            >
                                                <div>
                                                    <div class="fileIcon">
                                                        <i
                                                            class="
                                                                el-icon-document
                                                            "
                                                        ></i>
                                                    </div>
                                                    <div class="filesTitle">
                                                        <div>
                                                            {{ item.fileName }}
                                                        </div>
                                                        <p>
                                                            {{
                                                                (
                                                                    item.fileSize /
                                                                    1024
                                                                ).toFixed(2)
                                                            }}kb
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div
                                                        class="watchBtn"
                                                        @click="
                                                            watchFiles(item)
                                                        "
                                                    >
                                                        预览
                                                    </div>
                                                    <div class="fileIcon2">
                                                        <i
                                                            class="
                                                                el-icon-error
                                                            "
                                                            @click="
                                                                deleteFiles(
                                                                    index,
                                                                    1
                                                                )
                                                            "
                                                        ></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-form-item> -->
              <el-form-item label="附件：" class="dRemarkList">
                <div class="uploadFileList">
                  <div class="ufSfz">
                    <div class="ufsTop">
                      <div @click="addFilesClick(2)" class="addclickFjClass">
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
                              @click="deleteFiles(index, 2)"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>

              <!-- <el-form-item
                                label="备注："
                                prop="remarks"
                                class="dRemarkList"
                            >
                                <el-input
                                    type="textarea"
                                    v-model="dingLogForm.remarks"
                                    maxlength="240"
                                    show-word-limit
                                ></el-input>
                            </el-form-item> -->
              <div v-if="isEdit == 1" class="shenpi dRemarkList">
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
                              <!-- <span class="touxiangdian">*</span> -->
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
            :disabled="disabled"
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
        title="全部项目成员"
        :append-to-body="true"
        :visible.sync="AllProjectPeopleVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
      >
        <div style="margin-bottom: 10px">
          共有{{ dingLogForm.extend_five.length }}人
        </div>
        <div class="showAllPeople">
          <div
            class="addMList"
            v-for="(item, index) in dingLogForm.extend_five"
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
              <i class="el-icon-error" @click="handleClose(index, 3)"></i>
            </div>
            <div class="mdnPlus">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="addMList addMListLast">
            <div class="mdnList">
              <div class="mdren" @click="addManyP(3)">
                <span class="touxiang">
                  <i class="el-icon-plus"></i>
                </span>
              </div>
            </div>
          </div>
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
              <img
                width="50"
                src="../../../assets/workbench/exceladd.png"
                alt
                style="margin-top: 20px"
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
            <div style="margin-left: 100px">
              <p>注意：</p>
              <p>
                导入以下载的模板为准，否则将无法读取报表数据，重复上传数据将被覆盖
              </p>
              <span @click="derive" style="color: #3a99f2; cursor: pointer"
                >下载模板</span
              >
            </div>
          </div>
          <div style="margin-top: 20px; text-align: right">
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
import imgupload from "../../../components/imgUpload.vue";
import commonTable from "@/components/commonTable.vue";
import draggable from "vuedraggable";
import { regionData, CodeToText } from "element-china-area-data";
export default {
  name: "projectApprovalList",
  components: { draggable, commonTable, eupload, imgupload },
  data() {
    let validateuser = (rule, value, callback) => {
      if (value.name) {
        callback();
      } else {
        callback(new Error("请选择负责人"));
      }
    };
    return {
      issuite: true,
      upImgList: [],
      licenceImg: [],
      disabled: false,
      isEdit: 1,
      labelPosition: "right",
      upImgList2: "",
      licenceImg2: "",
      isShow2: ["1"],
      upFormVisible: false,
      upForm: { url: "" },
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      newTitle: "添加",
      dialogFormVisible: false,
      AllProjectPeopleVisible: false,
      branchList: [],
      formInline: {
        name: "",
        type: "",
        status: "",
        startTime: "",
        endTime: "",
        p_number: "",
        bstatus: "",
        namesa: "请选择申请人",
        send_name: "",
        send_userid: "",
        lian_ying: "",
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      projectType: [],
      projectType1: [],
      approvalStatus: [],
      projectStatus: [],
      AllSendPeopleVisible: false,
      AllPeopleVisible: false,
      priceStatus: [
        { name: "综合单价", value: "综合单价" },
        { name: "土层价", value: "土层价" },
        { name: "岩层价", value: "岩层价" },
        { name: "空孔价", value: "空孔价" },
      ],
      dingLogForm: {
        // price: '',
        // price_type: '',
        approval_userid: [],
        cc_userid: [],
        send_userid: this.$store.state.userInfo.uid,
        name: "",
        plan_start_riqi: "",
        plan_end_riqi: "",
        quantities: "",
        address: "",
        make_cost: "",
        mexpected_profit: "",
        type: "",
        quality_level: "",
        stalker_ext: { name: "", avatar: "", emplId: "" },
        branch_office: "",
        project_status: "",
        construction_unit: "",
        contacts: "",
        contacts_mobile: "",
        contacts_address: "",
        extend_five: [],
        enclosure: [],
        id: "",
        extend_three: "",
        procode: [],
        process_instance_id: "",
        process_code: "",
        image: [],
        stalker_name: "",
      },
      printable: false,
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      dingLogRules: {
        name: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "blur",
          },
        ],
        plan_start_riqi: [
          {
            required: true,
            message: "请选择日期",
            trigger: ["blur", "change"],
          },
        ],
        quality_level: [
          {
            required: true,
            message: "请输入",
            trigger: ["blur", "change"],
          },
        ],
        procode: [
          {
            required: true,
            message: "请选择位置",
            trigger: ["blur", "change"],
          },
        ],
        plan_end_riqi: [
          {
            required: true,
            message: "请选择日期",
            trigger: ["blur", "change"],
          },
        ],
        make_cost: [
          {
            required: true,
            message: "请输入工程造价",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择项目类型",
            trigger: ["blur", "change"],
          },
        ],
        stalker_name: [
          {
            required: true,
            message: "请选择项目负责人",
            trigger: ["blur", "change"],
          },
        ],
        project_status: [
          {
            required: true,
            message: "请选择项目状态",
            trigger: ["blur", "change"],
          },
        ],
      },
      addressOptions: regionData,
      provinceList: [],
      isShow: ["1"],
      isedit: false,
      loading: false, // 因为是未定义补充的
      loaded: false, // 因为是未定义补充的
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
    imgshow(url) {
      this.dingLogForm.image = url;
    },

    derive() {
      dd.ready(function () {
        dd.biz.util.downloadFile({
          url: "http://dingzhukuai.zzdingyun.com/public/file/立项信息登记导入模板.xls",
          name: "立项信息登记导入模板.xls", //定义下载文件名字
          onProgress: function (msg) {
            // 文件下载进度回调
          },
          onSuccess: function (result) {},
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
    async getPrintableStatus() {
      const res = await this.$axios.post("/finance/control_display", {
        tableName: "project_info_register",
      });
      if (res.data.code === 1) {
        this.printable = res.data.type === "1";
      }
    },
    etPrintableStatus1() {
      this.$axios
        .post(" /project/projectInfoRegisterZbList", {
          type: "all",
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.projectType1 = res.data.data;
            console.log(res.data.data, "564789456654489984");
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async printPDF(id) {
      const _this = this;
      const res = await _this.$axios.post("/finance/dc_pdf", {
        tableName: "project_info_register",
        id: id,
      });
      if (res.data.code === 1) {
        console.log(res);
        window.open(`http://${res.data.file_path}`);
      }
    },

    upSave() {
      const _this = this;
      if (_this.upForm.url) {
        _this.$axios
          .post("/projecttwo/projectImport", {
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
    provinceBlur(value) {
      if (value) {
        this.dingLogForm.extend_three = this.$refs["cascaderAddr"]
          .getCheckedNodes()[0]
          .pathLabels.join("/");
      }
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
          setTimeout(() => {
            this.adjustWidth();
          }, 500);
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
          name: "project_info_register",
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
    sendTitleList() {
      this.$axios
        .post("/spread/editFiledCurrency", {
          name: "project_info_register",
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
    tableHeaderClass({ row, rowIndex }) {
      return "font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px";
    },
    tableRowClass({ row, rowIndex }) {
      return "color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;border-color:#F1F8FF;";
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 200);
    },
    //查看审批
    checkList(row, column) {
      const _this = this;
      if (
        column.type != "selection" &&
        column.label != "操作" &&
        column.label != "打印"
      ) {
        dd.ready(function () {
          dd.biz.util.openSlidePanel({
            url: row.url, //打开侧边栏的url
            title: "详情", //侧边栏顶部标题
            onSuccess: function (result) {},
            onFail: function () {
              setTimeout(() => {
                _this.getList();
              }, 5000);
              setTimeout(() => {
                _this.getList();
              }, 10000);
            },
          });
        });
      }
    },
    // 取消归档
    deleteFiles2(row, type) {
      console.log("取消归档");
      const _this = this;
      _this.$axios
        .post("/order/cancelFile", { id: row.id })
        .then((res) => {
          if (res.data.code == 1) {
            _this.getList();
            _this.$notify({
              title: "提示",
              message: res.data.msg,
              type: "success",
              duration: 1500,
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
    // 归档
    fileClick(row, type) {
      const _this = this;
      _this.$axios
        .post("/finance/projectfile", { id: row.id })
        .then((res) => {
          if (res.data.code == 1) {
            _this.getList();
            _this.$notify({
              title: "提示",
              message: res.data.msg,
              type: "success",
              duration: 1500,
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
    editClick(row, type) {
      const _this = this;
      _this.isedit = true;
      _this.isEdit = type;
      // _this.getCorpList();
      _this.$axios
        .post("/project/projectInfoRegister")
        .then((res) => {
          if (res.data.code == 1) {
            _this.newTitle = "编辑";
            _this.dialogFormVisible = true;
            _this.$nextTick(() => {
              _this.dingLogForm = {
                approval_userid: [],
                cc_userid: [],
                send_userid: _this.$store.state.userInfo.uid,
                name: "",
                plan_start_riqi: "",
                plan_end_riqi: "",
                quantities: "",
                address: "",
                extend_three: "",
                procode: [],
                make_cost: "",
                mexpected_profit: "",
                type: "",
                quality_level: "",
                stalker_name: "",
                stalker_ext: {
                  name: "",
                  avatar: "",
                  emplId: "",
                },
                branch_office: "",
                project_status: "",
                construction_unit: "",
                contacts: "",
                contacts_mobile: "",
                contacts_address: "",
                extend_five: [],
                enclosure: [],
                id: "",
                process_instance_id: "",
                image: [],
                process_code: "",
              };
              let newGetData = JSON.parse(JSON.stringify(row));

              if (newGetData.make_cost) {
                newGetData.make_cost = newGetData.make_cost.replace(/,/g, "");
              }
              if (newGetData.expected_profit) {
                newGetData.expected_profit = newGetData.expected_profit.replace(
                  /,/g,
                  ""
                );
              }

              if (newGetData.procode) {
                newGetData.procode = newGetData.procode
                  .replace(/\//g, ",")
                  .split(",");
              }
              _this.dingLogForm = JSON.parse(JSON.stringify(newGetData));
              _this.dingLogForm.process_code = res.data.data;
              _this.dingLogForm.send_userid = _this.$store.state.userInfo.uid;
              if (_this.isEdit == 1) {
                _this.dingLogForm.stalker_name = newGetData.stalker_ext.name;
              } else {
                _this.dingLogForm.stalker_name = newGetData.stalker_name;
              }
              delete _this.dingLogForm.status;
              delete _this.dingLogForm.number;
              delete _this.dingLogForm.url;
              delete _this.dingLogForm.created;
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

    //发起审批
    newAdd() {
      let newP = window.location.protocol;
      if (newP == "http:") {
        const _this = this;
        _this.$axios
          .post("/project/projectInfoRegister")
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
      } else {
        const _this = this;
        if (
          _this.$store.state.cid == "ding53c9e0147ed9d5fe35c2f4657eb6378f" ||
          _this.$store.state.cid == "ding7ea9d6291ae87db1a1320dcb25e91351" ||
          _this.$store.state.cid == "ding1a9d6aa4c63dfb99ffe93478753d9884" ||
          _this.$store.state.cid == "dingb2e5997b238d554735c2f4657eb6378f" ||
          _this.$store.state.cid == "ding85b5c1933abfd7f235c2f4657eb6378f" ||
          _this.$store.state.cid == "ding02923b795dc25433ffe93478753d9884" ||
          _this.$store.state.cid == "ding23b12dc5f632063824f2f5cc6abecb85" ||
          _this.$store.state.cid == "ding1cf4c0ec5c7566f735c2f4657eb6378f" ||
          _this.$store.state.cid == "dingec869366cf4713d3a1320dcb25e91351" ||
          _this.$store.state.cid == "ding5cc9f7e976f9cc92acaaa37764f94726" ||
          _this.$store.state.cid == "ding00f1aafe21a95976bc961a6cb783455b" ||
          _this.$store.state.cid == "dingea718b6fb7aa611235c2f4657eb6378f" ||
          _this.$store.state.cid == "ding5ee4ff6292e3498ba39a90f97fcb1e09" ||
          _this.$store.state.cid == "ding3abae6364050807035c2f4657eb6378f" ||
          _this.$store.state.cid == "ding1b508a8102d46015ffe93478753d9884" ||
          _this.$store.state.cid == "dinge9e7294e66af1a01a39a90f97fcb1e09" ||
          _this.$store.state.cid == "ding4cc2495c09c54b8da1320dcb25e91351" ||
          _this.$store.state.cid == "ding48b7e37c986368f3ffe93478753d9884" ||
          _this.$store.state.cid == "dingee167496cb125eaeee0f45d8e4f7c288" ||
          _this.$store.state.cid == "ding2c472b79b3c2b02035c2f4657eb6378f"
        ) {
          _this.isedit = false;
          _this.isEdit = 1;
          // _this.getCorpList();
          _this.$axios
            .post("/project/projectInfoRegister")
            .then((res) => {
              if (res.data.code == 1) {
                _this.newTitle = "添加";
                _this.dingLogForm.id = "";
                _this.dingLogForm.process_code = res.data.data;
                _this.dingLogForm.process_instance_id = "";
                _this.dialogFormVisible = true;
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
        } else {
          _this.$axios
            .post("/project/projectInfoRegister")
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
        }
      }
    },
    //发起审批
    // newAdd() {
    // const _this = this;
    // _this.isedit = false;
    // _this.isEdit = 1;
    // // _this.getCorpList();
    // _this.$axios
    //     .post('/project/projectInfoRegister')
    //     .then((res) => {
    //         if (res.data.code == 1) {
    //             _this.newTitle = '添加';
    //             _this.dingLogForm.id = '';
    //             _this.dingLogForm.process_code = res.data.data;
    //             _this.dingLogForm.process_instance_id = '';
    //             _this.dialogFormVisible = true;
    //         } else {
    //             _this.$notify({
    //                 title: '提示',
    //                 message: res.data.msg,
    //                 type: 'error',
    //                 duration: 1500
    //             });
    //         }
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    inputs() {
      console.log("///");
      this.addManyP();
    },
    addManyP1() {
      console.log("///*-**-*-");
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: that.$store.state.cid, //企业的corpId
          multiple: true, //是否多选
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
          startWithDepartdeptId: 0, //仅支持0和-1
          onSuccess: function (result) {
            // let newPeople = [];
            // newPeople = result.users.map((item) => {
            //     if (!item.emplId) return '';
            //     return item.emplId;
            // });
            console.log(result.users[0], "**---**--*-");
            // that.addRoleUser(result.users);
            that.formInline.send_name = result.users[0].name;
            that.formInline.namesa = result.users[0].name;
            that.formInline.send_userid = result.users[0].emplId;
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
    resetClick() {
      this.formInline = {
        name: "",
        type: "",
        status: "",
        startTime: "",
        endTime: "",
        p_number: "",
        bstatus: "",
        namesa: "请选择申请人",
        send_name: "",
        send_userid: "",
        lian_ying: "",
      };
      this.getList();
    },
    //获取列表
    getList(ntype) {
      this.$axios
        .post("/project/projectInfoRegisterList", {
          page: this.currentPage,
          number: this.pagesize,
          start_plan_start_riqi: this.formInline.startTime,
          end_plan_start_riqi: this.formInline.endTime,
          stand_termer: "",
          start_plan_end_riqi: "",
          end_plan_end_riqi: "",
          name: this.formInline.name,
          stalker_ext: "",
          construction_unit: "",
          type: this.formInline.type,
          project_status: this.formInline.bstatus,
          shenpi: this.formInline.status,
          p_number: this.formInline.p_number,
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

            this.newFooter = res.data.mould_data.mould_data;
            this.titleList.map((item) => {
              this.newFooter.forEach((element) => {
                if (element.value == item.value) {
                  this.footerNumList.push(element);
                }
              });
            });

            this.$nextTick(() => {
              setTimeout(() => {
                this.adjustWidth();
              }, 200);
              if (document.body.scrollHeight > window.innerHeight) {
                setTimeout(() => {
                  this.adjustWidth();
                }, 1000);
              }
            });
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
    //筛选
    handleSelectionChange(val) {
      this.multSelectData = val.map((item) => {
        if (!item.id) return "";
        return item.id;
      });
    },

    //删除列表
    deleteList() {
      if (this.multSelectData.length > 0) {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios
              .post("/project/projectInfoRegisterDel", {
                id: this.multSelectData,
              })
              .then((res) => {
                if (res.data.code == 1) {
                  this.getList();
                  this.updateForm();
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
        .post("/project/projectInfoRegisterReduction")
        .then((res) => {
          if (res.data.code == 1) {
            this.getList();
            this.updateForm();
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
    //刷新
    updateForm() {
      const _this = this;
      _this.$axios
        .post("/project/projectInfoRegisterReductionEup")
        .then((res) => {
          if (res.data.code == 1) {
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
          .post("/project/projectInfoRegisterDownload", {
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
    updateList() {
      this.getList(1);
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
            } else if (type == 3) {
              result.users.forEach((item) => {
                _this.dingLogForm.extend_five.push(item);
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
    addSingle() {
      const _this = this;
      document.getElementById("addinput").blur();
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: _this.$store.state.cid, //企业的corpId
          multiple: false, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1, //最大可选人数
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
            _this.dingLogForm.stalker_ext = result.users[0];
            _this.dingLogForm.stalker_name = result.users[0].name;
            _this.$set(_this.dingLogForm, "stalker_name", result.users[0].name);
            _this.$nextTick(() => {
              _this.dingLogForm = JSON.parse(JSON.stringify(_this.dingLogForm));
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
    //删除人员
    handleClose(index, type) {
      switch (type) {
        case 1:
          this.dingLogForm.approval_userid.splice(index, 1);
          break;
        case 2:
          this.dingLogForm.cc_userid.splice(index, 1);
          break;
        case 3:
          this.dingLogForm.extend_five.splice(index, 1);
          break;
      }
    },
    //查看全部
    openAllPeople(type) {
      if (type == 1) {
        this.AllPeopleVisible = true;
      } else if (type == 2) {
        this.AllSendPeopleVisible = true;
      } else {
        this.AllProjectPeopleVisible = true;
      }
    },
    //添加文件
    addFilesClick(val) {
      const _this = this;
      _this.$axios
        .post("/dingding/getAuthUp", {
          auth: "add",
          fields: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            _this.$store.commit("setSpaceId", res.data.data.toString());
            _this.selectFiles(val);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectFiles(val) {
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
            if (val == 1) {
              result.data.forEach((item) => {
                _this.dingLogForm.image.push(item);
              });
            } else {
              result.data.forEach((item) => {
                _this.dingLogForm.enclosure.push(item);
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
      this.loading = false;
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.dingLogForm.cc_userid = [];
        this.dingLogForm.approval_userid = [];
        this.dingLogForm.enclosure = [];
        this.dingLogForm.extend_five = [];
        this.dingLogForm.stalker_ext = {
          name: "",
          avatar: "",
          emplId: "",
        };
      });
    },
    editInfo(formName) {
      const _this = this;
      _this.disabled = true;
      _this.loading = true;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.dingLogForm));
          if (_this.isEdit == 1) {
            // if (newData.approval_userid.length > 0) {
            delete newData.stalker_name;
            newData.procode = newData.procode.join("/");
            _this.$axios
              .post("/projectfour/projectInfoRegisterSp", newData)
              .then((res) => {
                if (res.data.code == 1) {
                  _this.getList();
                  _this.loading = false;
                  _this.disabled = false;
                  _this.dialogFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.dingLogForm.cc_userid = [];
                  _this.dingLogForm.approval_userid = [];
                  _this.$message({
                    message: res.data.msg,
                    type: "success",
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.disabled = false;
                  _this.$message({
                    message: res.data.msg,
                    type: "warning",
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                _this.disabled = false;
                console.log(error);
              });
            // } else {
            //     _this.loading = false;
            //     _this.disabled = false;
            //     _this.$notify({
            //         title: '警告',
            //         message: '请选择申请人员',
            //         type: 'warning',
            //         duration: 1500
            //     });
            // }
          } else {
            console.log("外部数据");
            // delete newData.stalker_name;
            newData.procode = newData.procode.join("/");
            _this.$axios
              .post("/projecttwo/projectExternalEdit", newData)
              .then((res) => {
                if (res.data.code == 1) {
                  _this.getList();
                  _this.loading = false;
                  _this.disabled = false;
                  _this.dialogFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.dingLogForm.cc_userid = [];
                  _this.dingLogForm.approval_userid = [];
                  _this.$message({
                    message: res.data.msg,
                    type: "success",
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.disabled = false;
                  _this.$message({
                    message: res.data.msg,
                    type: "warning",
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                _this.disabled = false;
                console.log(error);
              });
          }
        } else {
          _this.loading = false;
          _this.disabled = false;
        }
      });
    },
    deleteFiles(index, val) {
      if (val == 1) {
        this.dingLogForm.image.splice(index, 1);
      } else {
        this.dingLogForm.enclosure.splice(index, 1);
      }
    },
    getCorpList(name) {
      const _this = this;
      console.log(name);
      let newName = "";
      // if (
      //     _this.$store.state.cid ==
      //         'ding0ae1ff624a5a383e35c2f4657eb6378f' ||
      //     _this.$store.state.cid == 'dinga090000f57c90b3eee0f45d8e4f7c288'
      // ) {
      //     newName = '施工单位';
      // } else {
      //     newName = '内部单位'; //甲方单位
      // }
      _this.$axios
        .post("/projectfour/contactsUnit", { name })
        .then((res) => {
          if (res.data.code == 1) {
            _this.branchList = res.data.data;
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
    getProvinceList() {
      const _this = this;
      _this.$axios
        .post("/province/province")
        .then((res) => {
          _this.provinceList = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.adjustWidth();
      }, 100);
    });
  },
  created() {
    this.getPrintableStatus();
    this.$utils.checkding();
    this.projectType = JSON.parse(this.$store.state.pType);
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.projectStatus = JSON.parse(this.$store.state.pStatus);
    this.getProvinceList();
    this.getTitleList();
    this.etPrintableStatus1();
    if (
      this.$store.state.cid == "ding53c9e0147ed9d5fe35c2f4657eb6378f" ||
      this.$store.state.cid == "ding7ea9d6291ae87db1a1320dcb25e91351" ||
      this.$store.state.cid == "ding1a9d6aa4c63dfb99ffe93478753d9884" ||
      this.$store.state.cid == "dingb2e5997b238d554735c2f4657eb6378f" ||
      this.$store.state.cid == "ding85b5c1933abfd7f235c2f4657eb6378f" ||
      this.$store.state.cid == "ding02923b795dc25433ffe93478753d9884" ||
      this.$store.state.cid == "ding23b12dc5f632063824f2f5cc6abecb85" ||
      this.$store.state.cid == "ding1cf4c0ec5c7566f735c2f4657eb6378f" ||
      this.$store.state.cid == "dingec869366cf4713d3a1320dcb25e91351" ||
      this.$store.state.cid == "ding5cc9f7e976f9cc92acaaa37764f94726" ||
      this.$store.state.cid == "ding00f1aafe21a95976bc961a6cb783455b" ||
      this.$store.state.cid == "dingea718b6fb7aa611235c2f4657eb6378f" ||
      this.$store.state.cid == "ding5ee4ff6292e3498ba39a90f97fcb1e09" ||
      this.$store.state.cid == "ding3abae6364050807035c2f4657eb6378f" ||
      this.$store.state.cid == "ding1b508a8102d46015ffe93478753d9884" ||
      this.$store.state.cid == "dinge9e7294e66af1a01a39a90f97fcb1e09" ||
      this.$store.state.cid == "ding4cc2495c09c54b8da1320dcb25e91351" ||
      this.$store.state.cid == "ding48b7e37c986368f3ffe93478753d9884" ||
      this.$store.state.cid == "dingee167496cb125eaeee0f45d8e4f7c288" ||
      this.$store.state.cid == "ding2c472b79b3c2b02035c2f4657eb6378f"
    ) {
      this.issuite = true;
    } else {
      this.issuite = false;
    }
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
    planStart() {
      return {
        disabledDate: (time) => {
          let endDateVal = this.dingLogForm.plan_end_riqi;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      };
    },
    planEnd() {
      return {
        disabledDate: (time) => {
          let beginDateVal = this.dingLogForm.plan_start_riqi;
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

<style lang="less" scoped>
#projectApprovalList {
  padding: 20px;
}
.demo-form-inline {
  display: flex;
  flex-direction: row;
  div:nth-child(2) {
    min-width: 180px !important;
  }
}
.sum_footer_unit {
  border: none;
}
.mainContent {
  .page {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>

<style lang="less">
.el-table__row.statistics-warning-row {
  background: #f1f8ff;
}
.hlBottom {
  width: 1240px !important;
  .el-select,
  .el-input .el-input__inner {
    width: 280px;
  }
}
.el-table tr {
  height: 49px;
}
.names {
  border: 1px solid #dcdfe6 !important;
  padding-left: 13px;
  border-radius: 5px;
  color: #c0c9db;
}
</style>
