/*
 * @Author: NorthWind 
 * @Date: 2020-12-08 10:23:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-04-28 16:23:06
 */
<template>
  <div id="incomeContractList">
    <!-- 收入合同列表 -->
    <div class="main">
      <!-- 搜索条件 -->
      <commonSearch
        :formcommonList="formcommonList"
        :formInline="formInline"
        @searchClick="searchClick"
        @getList="getList"
      ></commonSearch>
      <div class="mainContent">
        <!-- <el-row class="maincBtn mainMoveBtn">
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
    
        </el-row> -->

        <el-row class="maincBtn mainMoveBtn">
          <div class="mmbLeft">
            <el-button type="primary" size="medium" @click="newAdd1"
              >新建</el-button
            >
            <el-button
              type="primary"
              size="medium"
              @click="dialogFormVisible3 = true"
              >延长归还时间</el-button
            >
            <el-button type="primary" size="medium" @click="newAdd"
              >打印</el-button
            >
            <el-button type="primary" size="medium" @click="newAdd"
              >修改</el-button
            >
            <el-button type="primary" size="medium" @click="newAdd"
              >取消处置</el-button
            >
            <el-button type="primary" size="medium" @click="newAdd"
              >审批提醒</el-button
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

        <commonTable
          :tpList="tpList"
          :titleList="titleList"
          :footerNumList="footerNumList"
          :isFooter="isFooter"
          @listenChild="getMult"
          printTableName="revenue_contract"
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
        <el-button size="medium" type="primary" @click="wInfo">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="借用归还"
      :visible.sync="dialogFormVisible1"
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
          label-width="125px"
          style="width: 100%"
        >
          <!-- 基础信息 -->

          <div
            class="dBasicInfo"
            style="
              flex-wrap: wrap;
              justify-content: space-between;
              display: flex;
            "
          >
            <el-form-item
              label="归还日期："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-input
                v-model="addUserForm.sitenumber"
                placeholder="请输入借用人"
                maxlength="50"
                style="width: 165px"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="归还后位置："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-input
                v-model="addUserForm.sitenumber"
                placeholder="请选择验收日期"
                maxlength="50"
                style="width: 165px"
              ></el-input>
            </el-form-item>

            <!-- <el-form-item label="验收日期：" class="dbasicList upOrg" style="width:31%;margin:0;">
                    <el-button @click="selectAddCorp" plain style="width: 165px">
                      <span>{{ addUserForm.ppname || '' }}</span>
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
                  </el-form-item> -->

            <el-form-item
              label="归还处理人："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-select v-model="value" placeholder="请选择位置">
                <el-option
                  label="item.label"
                  style="width: 165px"
                  value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="归还后使用公司："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-input
                v-model="addUserForm.sitenumber"
                placeholder="请选择使用公司"
                maxlength="50"
                style="width: 165px"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="归还后使用部门："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-input
                v-model="addUserForm.sitenumber"
                placeholder="请选择使用部门"
                maxlength="50"
                style="width: 165px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="管理员："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-select
                v-model="value"
                placeholder="请选择管理员"
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

            <el-form-item label="归还备注：" prop="remarks" style="width: 65%">
              <el-input
                type="textarea"
                v-model="basicAddForm.remarks"
                maxlength="240"
                show-word-limit
                placeholder="请输入归还备注"
              ></el-input>
            </el-form-item>
          </div>

          <el-button type="primary" @click="dialogFormVisible2 = true"
            >选择资产</el-button
          >
          <el-button type="primary">删除资产</el-button>
        </el-form>
        <el-table
          :border="true"
          :data="houseList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          max-height="547"
          style="width: 100%; border: 1px solid #ebeef5; margin-top: 10px"
          ref="multipleTable"
          size="mini"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" width="55" fixed> </el-table-column>
          <el-table-column prop="sitenumber" label="序号" align="left">
          </el-table-column>
          <el-table-column prop="name" label="照片" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产编码" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产名称" align="left">
          </el-table-column>
          <el-table-column prop="name" label="残值" align="left">
          </el-table-column>
          <el-table-column prop="name" label="使用状况" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产分类" align="left">
          </el-table-column>
          <el-table-column prop="name" label="品牌" align="left">
          </el-table-column>
          <el-table-column prop="name" label="型号" align="left">
          </el-table-column>
          <el-table-column
            prop="name"
            label="设备序列号"
            width="120"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="当前所属/承租公司"
            width="150"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="当前所在位置"
            width="120"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="当前使用公司"
            width="120"
            align="left"
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
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" @click="editInfo('AddUserForm')"
          >保存</el-button
        >
        <el-button size="medium" @click="editCancel('AddUserForm')"
          >取消</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="处置管理"
      :visible.sync="dialogFormVisible4"
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
          label-width="130px"
          style="width: 100%"
        >
          <!-- 基础信息 -->

          <div class="dBasicInfo" style="flex-wrap: wrap; display: flex">
            <el-form-item
              label="处置单号："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-input
                v-model="addUserForm.sitenumber"
                placeholder="请输入借用人"
                maxlength="50"
                style="width: 165px"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="创建日期："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-input
                v-model="addUserForm.sitenumber"
                placeholder="请选择验收日期"
                maxlength="50"
                style="width: 165px"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="单据状态："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-select v-model="value" placeholder="请选择位置">
                <el-option
                  label="item.label"
                  style="width: 165px"
                  value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="处置发起人："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-input
                v-model="addUserForm.sitenumber"
                placeholder="请选择使用公司"
                maxlength="50"
                style="width: 165px"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="发起人部门："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-input
                v-model="addUserForm.sitenumber"
                placeholder="请选择使用部门"
                maxlength="50"
                style="width: 165px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="完成日期："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-select
                v-model="value"
                placeholder="请选择管理员"
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
              label="处置类型："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-select
                v-model="value"
                placeholder="请选择管理员"
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
              label="处置金额："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-select
                v-model="value"
                placeholder="请选择管理员"
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
              label="处置费用:"
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-select
                v-model="value"
                placeholder="请选择管理员"
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
              label="资产原值合计:"
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-select
                v-model="value"
                placeholder="请选择管理员"
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
              label="资产残值合计:"
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-select
                v-model="value"
                placeholder="请选择管理员"
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
            <el-form-item label="处置说明：" prop="remarks" style="width: 65%">
              <el-input
                type="textarea"
                v-model="basicAddForm.remarks"
                maxlength="240"
                show-word-limit
                placeholder="请输入报修内容"
              ></el-input>
            </el-form-item>

            <el-form-item label="上传附件：" prop="remarks">
              <imgupload
                :upImgList="upImgList"
                :licenceImg="licenceImg"
                :isShow="isShow"
                v-on:listenToChildEvent="show"
              ></imgupload>
            </el-form-item>
          </div>
        </el-form>

        <el-button type="primary" @click="dialogFormVisible2 = true"
          >选择资产</el-button
        >
        <el-button type="primary">移除资产</el-button>
        <el-button type="primary">导入资产</el-button>

        <el-table
          :border="true"
          :data="houseList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          max-height="547"
          style="width: 100%; border: 1px solid #ebeef5; margin-top: 10px"
          ref="multipleTable"
          size="mini"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" width="55" fixed> </el-table-column>
          <el-table-column prop="sitenumber" label="资产编码" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产名称" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产分类" align="left">
          </el-table-column>
          <el-table-column
            prop="name"
            label="设备序列号"
            width="120"
            align="left"
          >
          </el-table-column>
          <el-table-column prop="name" label="处置金额" align="left">
          </el-table-column>

          <el-table-column prop="name" label="处置费用" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产原值" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产残值" align="left">
          </el-table-column>
          <el-table-column prop="name" label="使用状况" align="left">
          </el-table-column>
          <el-table-column prop="name" label="品牌" align="left">
          </el-table-column>
          <el-table-column prop="name" label="型号" align="left">
          </el-table-column>
          <el-table-column prop="name" label="所在位置" align="left">
          </el-table-column>
          <el-table-column prop="name" label="使用公司" align="left">
          </el-table-column>
          <el-table-column prop="name" label="使用部门" align="left">
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
      <div slot="footer" class="dialog-footer">
        <el-button
          size="medium"
          type="primary"
          :loading="loading"
          @click="editInfo('AddUserForm')"
          >保存</el-button
        >
        <el-button size="medium" @click="editCancel('AddUserForm')"
          >取消</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="选择资产"
      :visible.sync="dialogFormVisible2"
      :close-on-click-modal="false"
      width="1020px"
      @close="editCancel('AddUserForm')"
      class="phDialog"
    >
      <div class="phdMain" style="padding: 0 15px">
        <el-form
          @submit.native.prevent
          :inline="true"
          :model="formInline"
          label-width="120px"
          class="demo-form-inline"
          style="margin: 0"
        >
          <div class="hlBottom" style="display: flex">
            <el-form-item label="模糊搜索:">
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
        <el-table
          :border="true"
          :data="houseList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          max-height="547"
          style="width: 100%; border: 1px solid #ebeef5; margin-top: 10px"
          ref="multipleTable"
          size="mini"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" width="55" fixed> </el-table-column>
          <el-table-column prop="sitenumber" label="序号" align="left">
          </el-table-column>
          <el-table-column prop="name" label="照片" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产编码" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产名称" align="left">
          </el-table-column>
          <el-table-column prop="name" label="残值" align="left">
          </el-table-column>
          <el-table-column prop="name" label="使用状况" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产分类" align="left">
          </el-table-column>
          <el-table-column prop="name" label="品牌" align="left">
          </el-table-column>
          <el-table-column prop="name" label="型号" align="left">
          </el-table-column>
          <el-table-column
            prop="name"
            label="设备序列号"
            width="120"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="当前所属/承租公司"
            width="150"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="当前所在位置"
            width="120"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="当前使用公司"
            width="120"
            align="left"
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
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="editCancel('AddUserForm')"
          >确定</el-button
        >
        <el-button size="medium" @click="editCancel('AddUserForm')"
          >取消</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="延长归还时间"
      :visible.sync="dialogFormVisible3"
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
          label-width="125px"
          style="width: 100%"
        >
          <!-- 基础信息 -->

          <div class="dBasicInfo" style="flex-wrap: wrap; display: flex">
            <el-form-item
              label="延长归还时间至："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-select v-model="value" placeholder="请选择位置">
                <el-option
                  label="item.label"
                  style="width: 165px"
                  value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="延长处理人："
              prop=""
              class="dRemarkList"
              style="width: 31%"
            >
              <el-select
                v-model="value"
                placeholder="请选择管理员"
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
            <el-form-item label="备注：" prop="remarks" style="width: 65%">
              <el-input
                type="textarea"
                v-model="basicAddForm.remarks"
                maxlength="240"
                show-word-limit
                placeholder="请输入备注"
              ></el-input>
            </el-form-item>
          </div>

          <el-button type="primary" @click="dialogFormVisible2 = true"
            >选择资产</el-button
          >
          <el-button type="primary">移除资产</el-button>
        </el-form>
        <el-table
          :border="true"
          :data="houseList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          max-height="547"
          style="width: 100%; border: 1px solid #ebeef5; margin-top: 10px"
          ref="multipleTable"
          size="mini"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" width="55" fixed> </el-table-column>
          <el-table-column prop="sitenumber" label="序号" align="left">
          </el-table-column>
          <el-table-column prop="name" label="照片" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产编码" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产名称" align="left">
          </el-table-column>
          <el-table-column prop="name" label="残值" align="left">
          </el-table-column>
          <el-table-column prop="name" label="使用状况" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产分类" align="left">
          </el-table-column>
          <el-table-column prop="name" label="品牌" align="left">
          </el-table-column>
          <el-table-column prop="name" label="型号" align="left">
          </el-table-column>
          <el-table-column
            prop="name"
            label="设备序列号"
            width="120"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="当前所属/承租公司"
            width="150"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="当前所在位置"
            width="120"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="当前使用公司"
            width="120"
            align="left"
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
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" @click="editInfo('AddUserForm')"
          >保存</el-button
        >

        <el-button size="medium" @click="editCancel('AddUserForm')"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import commonTable from "@/components/commonTable.vue";
import commonSearch from "@/components/commonSearch.vue";
import draggable from "vuedraggable";
import imgupload from "../../../components/imgUpload.vue";

export default {
  name: "incomeContractList",
  components: { draggable, commonTable, commonSearch, imgupload },
  data() {
    return {
      upImgList: [],
      licenceImg: [],

      aufRules: {
        name: [
          {
            required: true,
            message: "请输入物品名称",
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
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      basicAddForm: {
        name: "",
        uname: "",
        pid: "",
      },
      value: "",
      addUserForm: {
        sitenumber: "",
        name: "",
        corp_id: "",
        ppsite: "",
      },
      //搜索条件
      formcommonList: [
        {
          labelName: "模糊查询",
          labelData: "name",
        },
      ],
      activeName: "first",
      formInline: {
        party_a: "",
        party_b: "",
        project_name: "",
        name: "",
        type: "",
        status: "",
        startTime: "",
        endTime: "",
      },
      currentPage: 1,
      dialogFormVisible4: false,
      dialogFormVisible2: false,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      contractType: [
        { name: "总价合同", value: "总价合同" },
        { name: "单价合同", value: "单价合同" },
        { name: "成本加酬金合同", value: "成本加酬金合同" },
        { name: "施工合同", value: "施工合同" },
      ],
      approvalStatus: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      allProjectList: [],
      dialogFormVisible1: false,
      dialogFormVisible3: false,
      houseList: [],
    };
  },
  methods: {
    //关闭覆盖层
    editCancel(formName) {
      this.dialogFormVisible = false;
      this.dialogFormVisible1 = false;
      this.dialogFormVisible2 = false;
      this.newAddView = false;
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.addUserForm.sitenumber = "";
      });
    },
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
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
          name: "revenue_contract",
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
    tableHeaderClass() {
      return "font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px";
    },
    tableRowClass() {
      return "color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;";
    },
    tableRowClassName({ row, rowIndex }) {
      if (row && rowIndex % 2 == 1) {
        return "statistics-warning-row";
      } else {
        return "";
      }
    },
    sendTitleList() {
      this.$axios
        .post("/spread/editFiledCurrency", {
          name: "revenue_contract",
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
    handleClick(tab, event) {
      console.log(tab, event);
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
    newAdd() {
      this.dialogFormVisible1 = true;
    },
    newAdd1() {
      this.dialogFormVisible4 = true;
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    resetClick() {
      this.formInline = {
        party_a: "",
        party_b: "",
        project_name: "",
        name: "",
        type: "",
        status: "",
        startTime: "",
        endTime: "",
      };
      this.getList();
    },
    updateList() {
      this.getList(1);
    },
    //获取列表
    getList(ntype) {
      this.$axios
        .post("/project/revenueContractList", {
          page: this.currentPage,
          number: this.pagesize,
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
          name: this.formInline.name,
          project_name: this.formInline.project_name,
          party_b: this.formInline.party_b,
          party_a: this.formInline.party_a,
          signer: "",
          type: this.formInline.type,
          p_number: "",
          shenpi: this.formInline.status,
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
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios
              .post("/project/revenueContractDel", {
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
        .post("/project/revenueContractReduction")
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
          .post("/project/revenueContractDownload", {
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
  },
  mounted() {
    this.allProjectList = JSON.parse(this.$store.state.allPro);
  },
  created() {
    this.$utils.checkding();
    this.$utils.utilAllProject();
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.getTitleList();
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