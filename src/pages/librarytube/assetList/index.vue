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

              <!-- <el-dropdown
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
                </el-dropdown-menu>
              </el-dropdown> -->

              <!-- <el-dropdown
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
              </el-dropdown> -->

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
                  <el-dropdown-item command="修改">修改</el-dropdown-item>
                  <el-dropdown-item command="删除">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <!-- <el-dropdown
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
              </el-dropdown> -->

              <!-- <el-dropdown
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
              </el-dropdown> -->
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
                :assetlist="true"
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
            :rules="aufRules"
            ref="addUserForm"
            label-width="120px"
            style="width: 100%"
          >
            <!-- 使用信息 -->
            <div
              style="border-bottom: 1px solid #d8e0e6; margin-bottom: 10px"
              v-if="userShow"
            >
              <div
                style="
                  border-bottom: 1px solid #32cacb;
                  width: 61px;
                  padding-bottom: 5px;
                "
              >
                使用信息
              </div>
            </div>

            <div
              style="
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
              "
            >
              <el-form-item
                :disabled="newDialogTitle == '编辑'"
                label="人员姓名："
                prop="lycontent"
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-if="newDialogTitle == '编辑'"
                  v-model="addUserForm.lycontent.lyuserid.name"
                  placeholder="请输入调入部门"
                  readonly
                ></el-input>
                <el-input
                  v-else
                  v-model="addUserForm.lycontent.lyuserid.name"
                  placeholder="请输入调入部门"
                  @click.native="DDselect('r')"
                  readonly
                ></el-input>

                <!-- <div class="DDselect" v-if="newDialogTitle == '编辑'">
                  {{
                    addUserForm.lycontent.lyuserid
                      ? addUserForm.lycontent.lyuserid.name
                      : ""
                  }}
                </div>
                <div v-else class="DDselect" @click="DDselect('r')">
                  {{
                    addUserForm.lycontent.lyuserid
                      ? addUserForm.lycontent.lyuserid.name
                      : ""
                  }}
                </div> -->
              </el-form-item>
              <el-form-item
                style="width: 30%"
                label="使用项目："
                prop="xmid"
                class="dRemarkList"
              >
                <el-select
                  v-model="addUserForm.lycontent.xmid"
                  placeholder="请选择使用项目"
                >
                  <el-option
                    v-for="(item, index) in allProjectList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                :disabled="newDialogTitle == '编辑'"
                label="使用部门:"
                prop="lyusername"
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-if="newDialogTitle == '编辑'"
                  v-model="addUserForm.lycontent.orgname.name"
                  placeholder="请输入调入部门"
                  readonly
                ></el-input>
                <el-input
                  v-else
                  v-model="addUserForm.lycontent.orgname.name"
                  placeholder="请输入调入部门"
                  @click.native="DDorg"
                  readonly
                ></el-input>

                <!-- <div class="DDselect" v-if="newDialogTitle == '编辑'">
                  {{
                    addUserForm.lycontent.orgname
                      ? addUserForm.lycontent.orgname.name
                      : ""
                  }}
                </div>
                <div v-else class="DDselect" @click="DDorg">
                  {{
                    addUserForm.lycontent.orgname
                      ? addUserForm.lycontent.orgname.name
                      : ""
                  }}
                </div> -->
              </el-form-item>

              <el-form-item
                class="searchTime"
                label="领用日期:"
                style="width: 30%"
                prop="lytime"
              >
                <el-date-picker
                  v-model="addUserForm.lycontent.lytime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  style="width: 165px"
                ></el-date-picker>
              </el-form-item>
            </div>

            <!-- 基本信息 -->
            <div style="border-bottom: 1px solid #d8e0e6; margin-bottom: 10px">
              <div
                style="
                  border-bottom: 1px solid #32cacb;
                  width: 61px;
                  padding-bottom: 5px;
                "
              >
                基本信息
              </div>
            </div>
            <div
              class="dBasicInfo"
              style="
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
              "
            >
              <el-form-item
                label="资产编码："
                prop="zznumber"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.zznumber"
                  disabled
                  placeholder="资产编码由系统生成"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="资产名称："
                prop="name"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.name"
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
                <el-button
                  @click="selectAddCorp('type')"
                  plain
                  style="width: 165px"
                >
                  <span>{{ addUserForm.type || "" }}</span>
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
                prop="lyusername"
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-model="addUserForm.adminuser.name"
                  placeholder="请输入管理员"
                  @click.native="DDselect('g')"
                  readonly
                ></el-input>

                <!-- <div class="DDselect" @click="DDselect('g')">
                  {{ addUserForm.adminuser ? addUserForm.adminuser.name : "" }}
                </div> -->
              </el-form-item>
              <el-form-item
                label="品牌："
                prop="brand"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.brand"
                  placeholder="请输入品牌"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="型号："
                prop="model"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.model"
                  placeholder="请输入型号"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="所属/承租公司:"
                prop="chengzuorg"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-select
                  v-model="addUserForm.chengzuorg"
                  placeholder="请选择所属/承租公司"
                >
                  <el-option label="所属" style="width: 165px" value="1">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="使用状态："
                prop="usestatus"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-select
                  v-model="addUserForm.usestatus"
                  placeholder="请选择使用状态"
                >
                  <el-option label="正常" style="width: 165px" value="正常">
                  </el-option>
                  <el-option label="故障" style="width: 165px" value="故障">
                  </el-option>
                  <el-option label="维修中" style="width: 165px" value="维修中">
                  </el-option>
                </el-select>
              </el-form-item>

              <!-- <el-form-item
                label="所在位置："
                prop="address"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-select
                  v-model="addUserForm.address"
                  placeholder="请选择所在位置"
                >
                  <el-option
                    label="所在位置"
                    style="width: 165px"
                    value="所在位置"
                  >
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item
                label="所在位置："
                class="dbasicList upOrg"
                style="width: 30%; margin: 0"
              >
                <el-button
                  @click="selectAddCorp('address')"
                  plain
                  style="width: 165px"
                >
                  <span>{{ addUserForm.address || "" }}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
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
              <el-form-item
                label="预计使用期限："
                prop="expectancy"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.expectancy"
                  placeholder="请输入预计使用期限"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="金额："
                prop="money"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.money"
                  placeholder="请输入金额"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                class="searchTime"
                label="购置/起购时间:"
                prop="starttime"
                style="width: 30%"
              >
                <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="addUserForm.starttime"
                  type="date"
                  placeholder="选择日期"
                  style="width: 165px"
                ></el-date-picker>
              </el-form-item>

              <el-form-item
                label="购置方式："
                prop="shoptype"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-select
                  v-model="addUserForm.shoptype"
                  placeholder="请选择购置方式"
                >
                  <el-option label="采购" value="采购"> </el-option>
                  <el-option label="内购" value="内购"> </el-option>
                  <el-option label="租赁" value="租赁"> </el-option>
                  <el-option label="自建" value="自建"> </el-option>
                  <el-option label="盘盈" value="盘盈"> </el-option>
                  <el-option label="接受投资" value="接受投资"> </el-option>
                  <el-option label="接受捐赠" value="接受捐赠"> </el-option>
                  <el-option label="其他" value="其他"> </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="订单号："
                prop="orderid"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.orderid"
                  placeholder="请输入订单号"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="计量单位："
                prop="measuring"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.measuring"
                  placeholder="请输入计量单位"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="供应商编码："
                prop="suppliernumber"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.suppliernumber"
                  placeholder="请输入供应商编码"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="未含税金额："
                prop="weishuimoney"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.weishuimoney"
                  placeholder="请输入未含税金额"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label=""
                prop=""
                class="dRemarkList"
                style="width: 30%"
              >
              </el-form-item>

              <el-form-item label="备注：" prop="remark" style="width: 65%">
                <el-input
                  type="textarea"
                  v-model="addUserForm.remark"
                  maxlength="240"
                  show-word-limit
                  placeholder="请输入备注"
                ></el-input>
              </el-form-item>

              <el-form-item label="资产图片：" prop="asseturl">
                <imgupload
                  :upImgList="upImgList"
                  :licenceImg="licenceImg"
                  :isShow="isShow"
                  v-on:listenToChildEvent="show"
                ></imgupload>
              </el-form-item>
            </div>

            <!-- 扩展信息 -->
            <div style="border-bottom: 1px solid #d8e0e6; margin-bottom: 10px">
              <div
                style="
                  border-bottom: 1px solid #32cacb;
                  width: 61px;
                  padding-bottom: 5px;
                "
              >
                扩展信息
              </div>
            </div>

            <el-form-item
              label="设备序列号："
              prop="shsn"
              class="dRemarkList"
              style="width: 30%"
            >
              <el-input
                v-model="addUserForm.shsn"
                placeholder="请输入设备序列号"
                maxlength="50"
                style="width: 165px"
              ></el-input>
            </el-form-item>

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
              style="
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
              "
            >
              <el-form-item
                label="供应商："
                prop="suppliername"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.suppliername"
                  placeholder="请输入供应商"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="联系人："
                prop="supplieruser"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.supplieruser"
                  placeholder="请输入联系人"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="联系方式："
                prop="supplierphone"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.supplierphone"
                  placeholder="请输入联系方式"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="维保到期时间："
                prop="wbstoptime"
                style="width: 30%"
              >
                <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="addUserForm.wbstoptime"
                  type="date"
                  placeholder="请选择维保到期时间"
                  style="width: 165px"
                ></el-date-picker>
              </el-form-item>

              <el-form-item
                label="维修次数："
                prop="wbcount"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.wbcount"
                  placeholder=""
                  maxlength="50"
                  disabled
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="维修金额合计："
                prop="wbmoney"
                class="dRemarkList"
                style="width: 30%"
              >
                <el-input
                  v-model="addUserForm.wbmoney"
                  placeholder=""
                  maxlength="50"
                  disabled
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="维保说明："
                prop="wbremark"
                style="width: 65%"
              >
                <el-input
                  type="textarea"
                  v-model="addUserForm.wbremark"
                  maxlength="240"
                  show-word-limit
                  placeholder="请输入维保说明"
                ></el-input>
              </el-form-item>
            </div>
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

      <el-dialog
        :title="newDialogTitle1"
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
            v-if="commends == 'a'"
          >
            <!-- 基础信息 -->

            <div
              class="dBasicInfo"
              style="flex-wrap: wrap; justify-content: space-between"
            >
              <el-form-item
                label="验收处理人："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请输入验收处理人"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="验收日期："
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
                label="验收后所在位置："
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
                label="使用项目："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请选择使用项目"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="使用部门："
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
              <el-form-item
                label="验收备注："
                prop="remarks"
                style="width: 65%"
              >
                <el-input
                  type="textarea"
                  v-model="basicAddForm.remarks"
                  maxlength="240"
                  show-word-limit
                  placeholder="请输入验收备注"
                ></el-input>
              </el-form-item>
            </div>

            <el-button type="primary" @click="dialogFormVisible2 = true"
              >选择资产</el-button
            >
            <el-button type="primary">删除资产</el-button>
            <el-button type="primary" @click="upFormVisible = true"
              >导入资产</el-button
            >
          </el-form>

          <el-form
            @submit.native.prevent
            :model="addUserForm"
            label-position="right"
            :rules="aufRules"
            ref="AddUserForm"
            label-width="125px"
            style="width: 100%"
            v-if="commends == 'b'"
          >
            <!-- 基础信息 -->

            <div
              class="dBasicInfo"
              style="flex-wrap: wrap; justify-content: space-between"
            >
              <el-form-item
                label="领用人："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请输入领用人"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="领用日期："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                label="领用后位置："
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
                label="使用项目："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请选择使用项目"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="使用部门："
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
                label="处理人："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-select
                  v-model="value"
                  placeholder="请选择处理人"
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
                label="领用备注："
                prop="remarks"
                style="width: 65%"
              >
                <el-input
                  type="textarea"
                  v-model="basicAddForm.remarks"
                  maxlength="240"
                  show-word-limit
                  placeholder="请输入领用备注"
                ></el-input>
              </el-form-item>
            </div>

            <el-button type="primary" @click="dialogFormVisible2 = true"
              >选择资产</el-button
            >
            <el-button type="primary">移除资产</el-button>
            <el-button type="primary" @click="upFormVisible = true"
              >导入资产</el-button
            >
          </el-form>

          <el-form
            @submit.native.prevent
            :model="addUserForm"
            label-position="right"
            :rules="aufRules"
            ref="AddUserForm"
            label-width="125px"
            style="width: 100%"
            v-if="commends == 'c'"
          >
            <!-- 基础信息 -->

            <div
              class="dBasicInfo"
              style="flex-wrap: wrap; justify-content: space-between"
            >
              <el-form-item
                label="借用人："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请输入领用人"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="借用时间："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="value1"
                  type="date"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                label="预计归还时间："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="value1"
                  type="date"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                label="借用后位置："
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
                label="使用项目："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请选择使用项目"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="使用部门："
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
                label="借用处理人："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-select
                  v-model="value"
                  placeholder="请选择处理人"
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
                label="借用备注："
                prop="remarks"
                style="width: 65%"
              >
                <el-input
                  type="textarea"
                  v-model="basicAddForm.remarks"
                  maxlength="240"
                  show-word-limit
                  placeholder="请输入借用备注"
                ></el-input>
              </el-form-item>
            </div>

            <el-button type="primary" @click="dialogFormVisible2 = true"
              >选择资产</el-button
            >
            <el-button type="primary">移除资产</el-button>
          </el-form>

          <el-form
            @submit.native.prevent
            :model="addUserForm"
            label-position="right"
            :rules="aufRules"
            ref="AddUserForm"
            label-width="125px"
            style="width: 100%"
            v-if="commends == 'd'"
          >
            <!-- 基础信息 -->

            <div
              class="dBasicInfo"
              style="flex-wrap: wrap; justify-content: space-between"
            >
              <el-form-item
                label="退货处理人："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder=""
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="实际退货时间："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="value1"
                  type="date"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                label="退货后所在位置："
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
                label="退货后使用项目："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请选择使用项目"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="退货后使用部门："
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
              <el-form-item
                label="退货备注："
                prop="remarks"
                style="width: 65%"
              >
                <el-input
                  type="textarea"
                  v-model="basicAddForm.remarks"
                  maxlength="240"
                  show-word-limit
                  placeholder="请输入退货备注"
                ></el-input>
              </el-form-item>
            </div>

            <el-button type="primary" @click="dialogFormVisible2 = true"
              >选择资产</el-button
            >
            <el-button type="primary">移除资产</el-button>
            <el-button type="primary" @click="upFormVisible = true"
              >导入资产</el-button
            >
          </el-form>

          <el-form
            @submit.native.prevent
            :model="addUserForm"
            label-position="right"
            :rules="aufRules"
            ref="AddUserForm"
            label-width="125px"
            style="width: 100%"
            v-if="commends == 'e'"
          >
            <!-- 基础信息 -->

            <div
              class="dBasicInfo"
              style="flex-wrap: wrap; justify-content: space-between"
            >
              <el-form-item
                label="归还处理人："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder=""
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="归还日期："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="value1"
                  type="date"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                label="归还后位置："
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
                label="归还后使用项目："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请选择使用项目"
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
              <el-form-item
                label="归还备注："
                prop="remarks"
                style="width: 65%"
              >
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
            <el-button type="primary">移除资产</el-button>
          </el-form>

          <el-form
            @submit.native.prevent
            :model="addUserForm"
            label-position="right"
            :rules="aufRules"
            ref="AddUserForm"
            label-width="125px"
            style="width: 100%"
            v-if="commends == 'f'"
          >
            <!-- 基础信息 -->

            <div
              class="dBasicInfo"
              style="flex-wrap: wrap; justify-content: space-between"
            >
              <el-form-item
                label="变更发起人："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder=""
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="领用日期："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="value1"
                  type="date"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                label="变更后位置："
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
                label="变更后使用项目："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-input
                  v-model="addUserForm.sitenumber"
                  placeholder="请选择使用项目"
                  maxlength="50"
                  style="width: 165px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="变更后使用部门："
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
                label="变更后使用人："
                prop=""
                class="dRemarkList"
                style="width: 31%"
              >
                <el-select
                  v-model="value"
                  placeholder="请选择变使用人"
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
                label="变更说明："
                prop="remarks"
                style="width: 65%"
              >
                <el-input
                  type="textarea"
                  v-model="basicAddForm.remarks"
                  maxlength="240"
                  show-word-limit
                  placeholder="请输入变更说明"
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
            :data="tableList"
            :header-cell-style="tableHeaderClass"
            :cell-style="tableRowClass"
            max-height="547"
            style="width: 100%; border: 1px solid #ebeef5; margin-top: 10px"
            ref="multipleTable"
            size="mini"
            :row-class-name="tableRowClassName"
          >
            <el-table-column type="selection" width="55" fixed>
            </el-table-column>
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
              label="当前使用项目"
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
          <el-button
            size="medium"
            type="primary"
            :loading="loading"
            v-if="commends == 'a'"
            @click="editInfo('AddUserForm')"
            >确定验收</el-button
          >
          <el-button
            size="medium"
            type="primary"
            :loading="loading"
            v-if="commends == 'b'"
            @click="editInfo('AddUserForm')"
            >保存</el-button
          >
          <el-button
            size="medium"
            type="primary"
            :loading="loading"
            v-if="commends == 'c'"
            @click="editInfo('AddUserForm')"
            >提交</el-button
          >
          <el-button
            size="medium"
            type="primary"
            :loading="loading"
            v-if="commends == 'd'"
            @click="editInfo('AddUserForm')"
            >保存</el-button
          >
          <el-button
            size="medium"
            type="primary"
            :loading="loading"
            v-if="commends == 'e'"
            @click="editInfo('AddUserForm')"
            >保存</el-button
          >
          <el-button
            size="medium"
            type="primary"
            :loading="loading"
            v-if="commends == 'f'"
            @click="editInfo('AddUserForm')"
            >提交</el-button
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
            <div class="hlBottom" style="display: flex; align-items: center">
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
            :data="tableList"
            :header-cell-style="tableHeaderClass"
            :cell-style="tableRowClass"
            max-height="547"
            style="width: 100%; border: 1px solid #ebeef5; margin-top: 10px"
            ref="multipleTable"
            size="mini"
            :row-class-name="tableRowClassName"
          >
            <el-table-column type="selection" width="55" fixed>
            </el-table-column>
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
              label="当前使用项目"
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
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
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
      ref="child"
      :showName="showName"
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
import { regionData, CodeToText } from "element-china-area-data";
import imgupload from "../../../components/imgUpload.vue";
import draggable from "vuedraggable";
// const echarts = require("echarts");
export default {
  name: "materialBasic",
  components: { eupload, imgupload, commonTable, draggable, commondraggable },
  data() {
    return {
      allCk: [],
      userShow: true,
      showName: "资质列表", //设置显示字段 唯一标识
      allProjectList: [],
      allSupplier: [],
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
        lycontent: {
          lytime: "",
          lyuserid: "",
          orgname: "",
          xmid: "",
          xmname: "",
        },
        corp_id: "", //企业ID
        zznumber: "", //

        name: "", //资质名称
        type: "", //资质分类
        adminuser: "", //管理员
        brand: "", //品牌
        model: "", //型号
        chengzuorg: "", //所属/承租公司
        usestatus: "", //使用状况
        address: "", //所在位置
        expectancy: "", //预计使用期限
        money: "", //金额
        starttime: "", //购置/起租日期
        shoptype: "", //购置方式
        orderid: "", //订单号
        measuring: "", //计量单位
        suppliernumber: "", //供应商编码
        weishuimoney: "", //金额
        remark: "", //备注
        asseturl: "", //资产图片
        shsn: "", //设备序列号
        extendcontent: "", //扩展信息
        wbstoptime: "", //维保到期时间
        wbremark: "", //维保说明
        qianziurl: "", //签字图片
        lynumber: "", //领用单号
        lytype: "", //领用类型
        squserid: "", //申请人

        cluserid: "", //处理人
        syorgid: "", //使用部门
        lyremark: "", //领用备注
        sptime: "", //申请时间
        pftime: "", //派发时间
        qrlytime: "", //确认领用时间
        suppliername: "", //供应商名称
        supplieruser: "", //供应商联系人
        supplierphone: "", //供应商联系人电话
        wbcount: "", //维修次数
        wbmoney: "", //维修金额合计
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
      aufRules: {
        // name: [
        //   {
        //     required: true,
        //     message: "请输入物资名称",
        //     trigger: "blur",
        //   },
        // ],
      },
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
    };
  },
  methods: {
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
            that.addUserForm.lycontent.orgname = result.departments[0];
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
            if (val === "r") {
              that.addUserForm.lycontent.lyuserid = result.users[0];
            } else if (val === "g") {
              that.addUserForm.adminuser = result.users[0];
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

        if (this.allCk.length == 1) {
          if (this.allCk[0].status == "0") {
            this.userShow = false;
          } else {
            this.userShow = true;
          }
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
      this.$confirm("删除资产将无法找回，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/erp_check/deleteassetlists", {
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
        .post("/erp_check/assetidcontent", {
          corp_id: this.$store.state.cid,
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
      this.getListinfo(val);
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
        .post("/erp_check/assetlists", this.searchFormData)
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
      this.allCk = val;
      console.log("getMult", val);
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
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.addUserForm));

          if (_this.viewOwnType == 1) {
            console.log("787979");
            _this.$axios
              .post("/erp_check/assetcreatedadd", newData)
              .then((res) => {
                if (res.data.code == 1) {
                  //   _this.updateTemp();
                  _this.getList();
                  //   _this.getBasicList();
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
                  //   _this.$refs[formName].resetFields();

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
    //!分割线

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
    selectAddCorp(val) {
      if (val === "type") {
        this.newAddView = !this.newAddView;
      } else if (val === "address") {
        this.newView = !this.newView;
      }
      this.getBasicList();
    },
    handleNewAddClick(a) {
      this.addUserForm.type = a.name;

      //   this.addUserForm.extend_two = a.all_fid;
      console.log(this.addUserForm);
      this.newAddView = false;
    },
    handleNewClick(a) {
      console.log(a);
      this.addUserForm.address = a.name;
      //   this.basicAddForm.pid = a.id;
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
    //
    getBasicList() {
      this.$axios
        .post("/erp_check/assetxilatypelist", {
          corp_id: this.$store.state.cid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.noLastList = [
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
            this.tableList = res.data.content;
            if (this.total > 0 && this.tableList.length < 1) {
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
      this.dialogFormVisible1 = false;
      this.dialogFormVisible2 = false;
      this.newAddView = false;
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
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
  created() {
    // this.$refs.child.getTitleList(); //设置显示字段
    this.$utils.commonAllPro().then((res) => {
      this.allProjectList = res;
      console.log("9999", res); //res为公共接口返回的数据;返回的数据为utils.js中return的数据
    });
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
.el-select-dropdown {
  width: 160px !important;
}
#basicInfo #contactCorp .phDialog .el-dialog__body .phdMain,
#system #contactCorp .phDialog .el-dialog__body .phdMain,
#basicInfo #materialBasic .phDialog .el-dialog__body .phdMain,
#system #materialBasic .phDialog .el-dialog__body .phdMain {
  height: 100%;
}
// #materialBasic .upOrg .addNewDiv,
// #system #materialBasic .upOrg .addNewDiv {
//   position: relative;
//   top: 0;
// }

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
