<template>
  <div id="systemRole">
    <div class="main">
      <div class="appContent">
        <div class="appContentRight" style="width: 100%">
          <div v-if="!searchingUser" class="appCRLine">
            <div class="appCRHeader">
              <div class="appCRHLeft">
                <div
                  v-for="(item, index) in titleList"
                  :key="index"
                  :class="index === activeAppItem ? 'activeRoleClass' : ''"
                  @click="changeItem(item, index)"
                  style="font-weight: bold"
                >
                  {{ item.name }}
                </div>
                <div
                  v-if="!viewPage"
                  class="appCRHRight"
                  style="margin-left: 20px"
                >
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="点击添加角色成员"
                  >
                    <i class="el-icon-plus" @click="addManyP"></i>
                  </el-tooltip>
                </div>
              </div>

              <div v-if="viewPage" class="appCRHRight">
                <span style="margin-right: 10px" @click="viewShow"
                  >设置一级显示顺序和名称</span
                >
                <span v-if="isDisa" @click="editRole" :class="comEdit"
                  >编辑</span
                >
                <span v-else @click="saveRole">保存</span>
              </div>
              <div v-else class="appCRHRight">
                <span @click="allDelete">批量删除</span>

                &nbsp;
                <!-- <i class="el-icon-plus" @click="addManyP"></i> -->
              </div>
            </div>
          </div>
          <div v-else class="appCRLine">
            <div class="appCRHeader">
              <div class="appCRHLeft">
                <div :class="'activeRoleClass'" style="font-weight: bold">
                  {{ "用户详情" }}
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="!searchingUser"
            class="appCRBottom"
            style="padding-top: 0px"
          >
            <div v-if="viewPage">
              <div v-for="(item, index) in PowerList" :key="index">
                <el-collapse v-model="activeNames" accordion>
                  <el-collapse-item
                    :title="item.name"
                    :name="index + 1"
                    style="border-top: none; position: relative"
                  >
                    <!-- :class="
                        liindex % 2 == 0 ? 'arcbMain' : 'grayDiv arcbMain'
                      " -->
                    <div
                      style="
                        position: absolute;
                        top: 14px;
                        right: 71px;
                        color: #409eff;
                      "
                      @click="viewShow('1', item, index)"
                    >
                      设置{{ item.name }}下级显示顺序和名称
                    </div>
                    <div
                      v-for="(litem, liindex) in item.children"
                      :key="liindex"
                      class="grayDiv arcbMain"
                    >
                      <div class="acrbHeader">
                        {{ litem.name }}

                        <el-collapse v-model="activeNames1" accordion>
                          <el-collapse-item
                            :title="'\xa0\xa0\xa0\xa0\xa0下级菜单'"
                            :name="liindex + 1"
                            style="border-top: none; position: relative"
                            v-if="litem.children.length != 0"
                          >
                            <div
                              style="
                                position: absolute;
                                top: 14px;
                                right: 71px;
                                color: #409eff;
                              "
                              @click="viewShow('1', litem, liindex)"
                            >
                              设置{{ litem.name }}下级显示顺序和名称
                            </div>
                            <div
                              v-for="(ilist, lindex) in litem.children"
                              class=""
                              :key="index"
                              style="margin-top: 10px; margin-left: 30px"
                            >
                              {{ ilist.name }}
                            </div>
                          </el-collapse-item>
                        </el-collapse>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
            <div v-else class="acrbUser">
              <div v-if="roleUserList.length > 0">
                <el-checkbox-group
                  v-model="checkList"
                  @change="handleCheckedCitiesChange"
                >
                  <div
                    class="userLine"
                    v-for="(item, index) in roleUserList"
                    :key="index"
                  >
                    <div class="userContent">
                      <div class="ucLeft">
                        <el-checkbox :label="item.userid">
                          <div class="touPic" v-if="item.avatar">
                            <img :src="item.avatar" :alt="item.name + '头像'" />
                          </div>
                          <div class="notou" v-else>
                            {{
                              2 >= item.name.length
                                ? item.name
                                : item.name.substr(item.name.length - 2, 2)
                            }}
                          </div>
                          <div>{{ item.name }}</div>
                        </el-checkbox>
                      </div>

                      <div>
                        <el-button
                          v-if="false"
                          type="text"
                          size="small"
                          @click="selectSubbranch(item.userid)"
                          >添加下属</el-button
                        >
                        <el-button
                          v-if="false"
                          type="text"
                          size="small"
                          @click="showSubbranch(item.userid)"
                          >查看下属</el-button
                        >
                        <i
                          style="margin-left: 16px"
                          class="el-icon-delete"
                          @click="deleteRoleUser(item, index)"
                        ></i>
                      </div>
                    </div>
                  </div>
                </el-checkbox-group>
              </div>
              <div v-if="roleUserList.length < 1" style="text-align: center">
                <img
                  src="../../../assets/menu/NoData.png"
                  alt=""
                  style="width: 200px; margin-top: 80px"
                />
                <p style="margin-top: 20px">暂无数据</p>
              </div>
            </div>
          </div>
          <div v-else class="appCRBottom" style="padding-top: 0px">
            <div class="acrbUser">
              <div v-if="searchingUserInfo.name">
                <div class="userLine">
                  <div class="userContent">
                    <div class="ucLeft">
                      <div class="touPic" v-if="searchingUserInfo.avatar">
                        <img
                          :src="searchingUserInfo.avatar"
                          :alt="searchingUserInfo.name + '头像'"
                        />
                      </div>
                      <div class="notou" v-else>
                        {{
                          2 >= searchingUserInfo.name.length
                            ? searchingUserInfo.name
                            : searchingUserInfo.name.substr(
                                searchingUserInfo.name.length - 2,
                                2
                              )
                        }}
                      </div>
                      <div>
                        {{ `${searchingUserInfo.name}`
                        }}<span class="roles">{{
                          `角色：${searchingUserInfo.role
                            .map((role) => role["role_name"])
                            .join("、")}`
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="新建角色"
      :visible.sync="addFormVisible"
      @close="handleClose('addEditForm')"
    >
      <el-form
        @submit.native.prevent
        :model="addForm"
        label-width="130px"
        :rules="addFormRules"
        ref="addEditForm"
        label-position="right"
        @submit.native.prevent
      >
        <div>
          <el-form-item label="角色名称：" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <input type="hidden" />
        </div>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loaded"
            @click="addSave('addEditForm')"
            >保存</el-button
          >
          <el-button @click="handleClose('addEditForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="删除成员" :visible.sync="dialogVisible">
      <span>
        确认删除
        <span class="deleteRoleClass">{{ deleteRoleName }}</span>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRoleUserSure()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="二级权限" :visible.sync="subbranchVisible">
      <div class="subList">
        <div
          class="userLine"
          v-for="(item, index) in subbranchList"
          :key="index"
        >
          <div class="userContent">
            <div class="ucLeft">
              <div class="touPic" v-if="item.pullman_news">
                <img
                  :src="item.pullman_news"
                  :alt="item.pullman_user + '头像'"
                />
              </div>
              <div class="notou" v-else>
                {{
                  2 >= item.pullman_user.length
                    ? item.pullman_user
                    : item.pullman_user.substr(item.pullman_user.length - 2, 2)
                }}
              </div>
              <div>{{ item.pullman_user }}</div>
            </div>

            <div>
              <i
                style="margin-left: 16px"
                class="el-icon-delete"
                @click="deleteSubbranch(item.id)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="删除角色" :visible.sync="deleteVisible">
      <span>
        确认删除
        <span class="deleteRoleClass">{{ deleteRoleIdName }}</span>
        <span>角色？</span>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRoleIdSure()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="批量删除角色" :visible.sync="alldeleteVisible">
      <span> 是否确认删除 </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alldeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="alldeleteRoleIdSure()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="角色重命名" :visible.sync="editVisible">
      <span>
        原角色名:
        <span class="deleteRoleClass">{{ editRoleIdName }}</span>
      </span>
      <el-input
        style="margin-top: 10px"
        v-model="newRoleName"
        placeholder="请输入新的角色名"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleIdSure()">确 定</el-button>
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
      <!-- <el-checkbox-group
        v-model="checkedLists"
        @change="handleCheckedListChange"
      > -->
      <div
        style="position: absolute; top: 22px; right: 71px; color: #409eff"
        @click="setNmae1"
      >
        编辑名称
      </div>
      <draggable animation="1000" v-model="myArray">
        <transition-group>
          <div v-for="element in myArray" :key="element.id">
            <div class="paixuOne" v-if="noeShow">{{ element.label }}</div>
            <!-- <div class="paixuOne" > -->
            <el-input
              v-model="element.label"
              clearable
              placeholder=""
              v-else
              @input="inputs(element)"
              style="margin-top: 10px"
            ></el-input>
            <!-- </div> -->
          </div>
        </transition-group>
      </draggable>
      <!-- </el-checkbox-group> -->
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="wCancel">取 消</el-button>
        <el-button size="medium" type="primary" @click="wInfo">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="设置"
      :visible.sync="wFormVisible1"
      :close-on-click-modal="false"
      width="600px"
      @close="wCancel"
      class="view_change_title"
    >
      <div
        style="position: absolute; top: 22px; right: 71px; color: #409eff"
        @click="setNmae1"
      >
        编辑名称
      </div>
      <draggable animation="1000" v-model="myArray1">
        <transition-group>
          <div v-for="element in myArray1" :key="element.id">
            <div class="paixuOne" v-if="noeShow">{{ element.label }}</div>
            <el-input
              v-model="element.label"
              clearable
              placeholder=""
              v-else
              @input="inputs(element)"
              style="margin-top: 10px"
            ></el-input>
          </div>
        </transition-group>
      </draggable>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="wCancel">取 消</el-button>
        <el-button size="medium" type="primary" @click="wInfo1"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";
import draggable from "vuedraggable";
export default {
  name: "systemRole",
  components: { draggable },
  data() {
    return {
      AllCheckedList: [],
      alldeleteVisible: false,
      checkList: [],
      newRoleName: "",
      editVisible: false,
      isDisa: true,
      activeNames: "1",
      activeNames1: "1",
      wFormVisible: false,
      wFormVisible1: false,
      dialogVisible: false,
      isIndeterminate: false,
      deleteVisible: false,
      deleteRoleName: "",
      searchKey: "",
      roleNum: 0,
      noeShow: true,
      searchingUser: false,
      searchingUserInfo: {},
      addFormRules: {
        name: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur",
          },
        ],
      },
      roleList: [],
      roleListNum: [],
      activeAppRole: 0,
      activeAppItem: 0,
      titleList: [
        { name: "功能权限", value: "1" },
        // { name: '角色成员', value: '2' },
      ],
      viewPage: true,
      loaded: false,
      addFormVisible: false,
      cover_set_id: 0,
      subbranchList: [],
      subbranchVisible: false,
      addForm: {
        name: "",
      },
      roleId: "1", //角色id
      roleUserList: [],
      deleteRoleUserData: {}, //删除角色数据
      deleteRoleUserIndex: 0, //删除角色索引
      PowerList: [],
      rolePower: [],
      postPowerId: [],
      deleteRoleId: "",
      deleteRoleIdName: "",
      deleteRoleIdIndex: 0,
      editRoleId: "",
      editRoleIdName: "",
      editRoleIdIndex: 0,
      addUserId: [],
      isEditId: "1",
      checkedLists: [],
      myArray: [],
      myArray1: [],
      newList: [],
    };
  },
  methods: {
    //一级修改名称
    setNmae1() {
      this.noeShow = !this.noeShow;
      console.log(this.noeShow);
    },
    inputs(row) {
      let arr = { id: row.id, name: row.label, corp_id: this.$store.state.cid };
      console.log(arr);
      this.$axios
        .post("/erp_check/updatebiaodan", arr)
        .then((res) => {
          if (res.data.code == 1) {
            this.getAllPower();
            // this.wFormVisible = false;
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
    wCancel() {
      this.wFormVisible = false;
      this.wFormVisible1 = false;
      this.myArray1 = [];
      let Ids = this.titleList.map((item) => item.value);
      this.myArray.forEach((item) => {
        if (!Ids.includes(item.value)) {
          item.check = false;
        } else {
          item.check = true;
        }
      });
    },
    //一级修改排序
    wInfo() {
      let newT = [];
      this.PowerList.forEach((element) => {
        newT.push({ sort: element.sort });
      });
      this.myArray.forEach((e, index) => {
        newT[index].id = e.id;
        newT[index].name = e.label;
      });
      console.log(newT);
      //    newT = JSON.stringify(newT)
      this.$axios
        .post("/erp_check/updatebiaodan", {
          corp_id: this.$store.state.cid,
          content: newT,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.getAllPower();
            this.wFormVisible = false;
            this.$message({
              title: "提示",
              message: res.data.msg,
              type: "",
              duration: 1500,
            });
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
    //二级修改排序
    wInfo1() {
      let newT = [];
      console.log(this.newList);
      this.newList.forEach((element) => {
        newT.push({ sort: element.sort });
      });
      this.myArray1.forEach((e, index) => {
        newT[index].id = e.id;
        newT[index].name = e.label;
      });
      console.log(newT);
      //    newT = JSON.stringify(newT)
      this.$axios
        .post("/erp_check/updatebiaodan", {
          corp_id: this.$store.state.cid,
          content: newT,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.getAllPower();
            this.wFormVisible1 = false;
            this.$message({
              title: "提示",
              message: res.data.msg,
              type: "",
              duration: 1500,
            });
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
    viewShow(type, item, index) {
      //   this.getTitleList();
      console.log(type);
      if (type == "1") {
        this.wFormVisible1 = true;
        this.newList = item.child;
        item.children.forEach((e, index) => {
          this.myArray1.push({ id: e.id, label: e.name });
        });
        console.log(item.child);
      } else {
        this.wFormVisible = true;
      }
    },

    getTitleList() {
      this.$axios
        .post("/spread/showFiledCurrencyList", {
          name: "case_manage",
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
    handleCheckedListChange(value) {
      this.myArray.forEach((element) => {
        if (value.includes(element.value)) {
          element.check = true;
        } else {
          element.check = false;
        }
      });
    },
    //   批量删除dialog
    allDelete() {
      if (this.AllCheckedList.length == 0) {
        this.$message({
          message: "请您先选择要删除的角色",
          type: "success",
          duration: "2000",
        });
      } else {
        this.alldeleteVisible = true;
      }
    },
    //批量选中
    handleCheckedCitiesChange(value) {
      this.AllCheckedList = value;
      console.log(value);
    },
    //批量删除角色
    alldeleteRoleIdSure() {
      const _this = this;
      _this.loaded = true;
      _this.$axios
        .post("/finance/ryqx_del", {
          userid: _this.AllCheckedList,
          j_id: _this.roleId,
        })
        .then((res) => {
          if (res.data.code == 1) {
            _this.getRoleUserList();
            _this.loaded = false;
            _this.alldeleteVisible = false;
            _this.$message({
              message: "删除成功",
              type: "success",
              duration: "2000",
            });

            _this.dialogVisible = false;
          } else {
            _this.loaded = false;
            _this.$message({
              message: res.data.msg,
              type: "error",
              duration: "2000",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //启动编辑
    editRole() {
      if (this.isEditId !== "1") {
        this.isDisa = false;
      }
    },
    saveRole() {
      this.$axios
        .post("/finance/roleupdate", {
          id: this.roleId,
          rules: JSON.stringify(this.PowerList),
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.roleUserList = res.data.content;
            this.$message({
              type: "success",
              message: "编辑成功",
              duration: 1500,
            });
          } else {
            this.$message({
              type: "warning",
              message: res.data.msg,
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      this.isDisa = true;
    },
    //一级全选
    handleTotalAllChange(e, item, index) {
      item.checkAll = e;
      if (e == false) {
        item.isIndeterminate = false;
        item.check = 0;
      } else {
        item.check = 1;
      }
      let childArray = this.PowerList[index].child;
      let nonArray = [];
      if (childArray) {
        for (let i = 0, len = childArray.length; i < len; i++) {
          childArray[i].checkAll = e;
          if (e) {
            childArray[i].check = 1;
            childArray[i].isCheckNum = 1;
          } else {
            childArray[i].check = 0;
            childArray[i].isCheckNum = 0;
          }
          childArray[i].child.forEach((element) => {
            element.checkAll = e;
            if (e) {
              element.check = 1;
            } else {
              element.check = 0;
            }
          });
        }
      }
      this.PowerList = this.PowerList.concat(nonArray);
    },
    //二级全选
    handleCheckAllChange(e, item, lindex, index) {
      let tottc = 0;
      item.checkAll = e;
      if (e == false) {
        item.isIndeterminate = false;
        item.check = 0;
        item.isCheckNum = 0;
      } else {
        item.isCheckNum = 1;
        item.check = 1;
      }
      this.PowerList[index].child[lindex].checkedRole = e;

      let childrenArray = this.PowerList[index].child[lindex].child;
      let noneArray = [];
      if (childrenArray) {
        for (let i = 0, len = childrenArray.length; i < len; i++) {
          childrenArray[i].checkAll = e;
          if (e) {
            childrenArray[i].check = 1;
          } else {
            childrenArray[i].check = 0;
          }
        }
      }
      for (let k = 0; k < this.PowerList[index].child.length; k++) {
        if (this.PowerList[index].child[k].checkAll == true) {
          tottc++;
        }
      }
      if (tottc == this.PowerList[index].child.length) {
        this.PowerList[index].checkAll = true;
        this.PowerList[index].check = 1;
        this.PowerList[index].isIndeterminate = false;
      } else {
        this.PowerList[index].checkAll = false;
        this.PowerList[index].check = 0;
        this.PowerList[index].isIndeterminate = true;
      }
      this.PowerList = this.PowerList.concat(noneArray);

      // this.updateRolePower();
    },
    //子级选择
    handlecheckedRoleChange(e, list, ilist, index, liindex) {
      let tickCount = 0, //二级判断选中数
        unTickCount = 0, //二级判断未选中数
        tottc = 0; //一级判断选中数
      let noneArray = [];
      ilist.checkAll = e;
      if (e) {
        ilist.check = 1;
      } else {
        ilist.check = 0;
      }
      console.log("123", e, ilist);
      // if (ilist.name != '修改' && ilist.checkAll) {
      //     // if (e) {
      //     //     list[2].checkAll = true;
      //     //     list[2].check = 1;
      //     // }
      //     if (e) {
      //     }
      // }

      if (ilist.title == "新增") {
        console.log("122", list);
        if (e) {
          list.map((item, index) => {
            if (item.title == "查看") {
              list[index].checkAll = true;
              list[index].check = 1;
            }
          });
          // list[2].checkAll = true;
          // list[2].check = 1;
        }
      }
      for (let i = 0; i < list.length; i++) {
        if (list[i].checkAll == true) tickCount++;
        if (list[i].checkAll == false) unTickCount++;
      }
      if (tickCount == list.length) {
        //子级全勾选
        let SList = this.PowerList[index].child;
        this.PowerList[index].child[liindex].checkAll = true;
        this.PowerList[index].child[liindex].isIndeterminate = false;
        for (let i = 0; i < SList.length; i++) {
          if (SList[i].checkAll == true) tottc++;
        }
        if (tottc == SList.length) {
          this.PowerList[index].checkAll = true;
          this.PowerList[index].isIndeterminate = false;
        } else {
          this.PowerList[index].checkAll = false;
          this.PowerList[index].isIndeterminate = true;
        }
      } else if (unTickCount == list.length || tickCount < list.length) {
        //子级全不勾选或没有全勾选
        this.PowerList[index].child[liindex].checkAll = false;
        this.PowerList[index].child[liindex].isIndeterminate = false;
        this.PowerList[index].checkAll = false;
        this.PowerList[index].isIndeterminate = true;
      } else {
        this.PowerList[index].child[liindex].checkAll = false;
        this.PowerList[index].child[liindex].isIndeterminate = true; //添加不确定状态
      }
      if (unTickCount == list.length) {
        this.PowerList[index].child[liindex].isCheckNum = 0;
      } else {
        this.PowerList[index].child[liindex].isCheckNum = 1;
      }
      this.PowerList = this.PowerList.concat(noneArray);
      // this.updateRolePower();
    },
    //切换角色
    changeRole(item, index) {
      this.checkList = [];
      this.isDisa = true;
      if (item.name == "管理员") {
        this.isEditId = item.extend_first;
      } else {
        this.isEditId = null;
      }

      this.activeAppRole = index;
      this.roleId = item.id;
      this.getAllPower();
      this.getRoleUserList();
    },
    //切换页面
    changeItem(item, index) {
      this.activeAppItem = index;
      this.checkList = [];
      if (index == 0) {
        this.viewPage = true;
        this.changeRoleList();
      } else {
        this.viewPage = false;
        this.getRoleUserList();
      }
    },
    async searchUser(userName) {
      if (!userName) {
        this.searchingUser = false;
        this.getRoleList();
        return false;
      }
      const res = await this.$axios.post("/finance/personnel_search", {
        user_name: userName,
      });
      if (res.data.code === 1) {
        this.searchingUser = true;
        this.roleList = res.data.data;
        if (res.data.data && res.data.data.length > 0) {
          this.changeSearchUser(
            res.data.data[0].name,
            res.data.data[0].group,
            res.data.data[0].avatar
          );
        }
      }
    },
    async changeSearchUser(userName, group, avatar) {
      const res = await this.$axios.post("/finance/personnel", {
        name: userName,
        group: group,
        avatar: avatar,
      });
      if (res.data.code === 1) {
        this.searchingUserInfo = res.data.data;
      }
    },
    //获取角色成员列表
    getRoleUserList() {
      this.$axios
        .post("/finance/rolemember", {
          id: this.roleId,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.roleUserList = res.data.content;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    changeRoleList() {
      //   this.$axios
      //     .post('/finance/rolelist')
      //     .then(res => {
      //       if (res.data.code == 1) {
      //         this.roleList = res.data.content;
      //         this.getAllPower();
      //       }
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
    },
    // 获取角色数量
    getRoleListNum() {
      //   this.$axios
      //     .post('/finance/rolelist')
      //     .then(res => {
      //       if (res.data.code == 1) {
      //         this.roleList = res.data.content;
      //         this.roleId = res.data.content[0].id;
      //         this.getAllPower();
      //         this.getRoleUserList();
      //       }
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
    },
    //获取角色列表
    getRoleList() {
      //   this.$axios
      //     .post('/finance/rolelist')
      //     .then(res => {
      //       if (res.data.code == 1) {
      //         this.roleList = res.data.content;
      //         this.roleId = res.data.content[0].id;
      //         this.getAllPower();
      //         this.getRoleUserList();
      //         if (res.data.content && res.data.content.length >= 1) {
      //           const roleNums = res.data.content.map(item => item.num);
      //           this.roleNum = roleNums.reduce((a, b) => a + b, 0);
      //         }
      //       }
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
    },
    //新建角色
    addSave(formName) {
      const _this = this;
      _this.loaded = true;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$axios
            .post("/finance/addqxuser", {
              user_id: "",
              rules: [],
              role_name: this.addForm.name,
            })
            .then((res) => {
              if (res.data.code == 1) {
                _this.getRoleList();
                _this.loaded = false;
                _this.addFormVisible = false;
                _this.$refs[formName].resetFields();
                _this.$message({
                  message: "添加角色成功",
                  type: "success",
                  duration: 1500,
                });
              } else {
                _this.loaded = false;
                _this.$message({
                  message: res.data.msg,
                  type: "error",
                  duration: 1500,
                });
              }
            })
            .catch(function (error) {
              _this.loaded = false;
              console.log(error);
            });
        } else {
          _this.loaded = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消新建
    handleClose(formName) {
      this.$refs[formName].resetFields();
      this.addFormVisible = false;
    },
    addRole() {
      this.addFormVisible = true;
    },
    //删除角色成员页面
    deleteRoleUser(item, index) {
      this.dialogVisible = true;
      this.deleteRoleName = item.name;
      this.deleteRoleUserData = item;
      this.deleteRoleUserIndex = index;
    },
    //删除角色成员
    deleteRoleUserSure() {
      const _this = this;
      _this.loaded = true;
      _this.$axios
        .post("/finance/ryqx_del", {
          userid: [_this.deleteRoleUserData.userid],
          j_id: _this.roleId,
        })
        .then((res) => {
          if (res.data.code == 1) {
            _this.loaded = false;
            _this.$message({
              message: "删除成功",
              type: "success",
              duration: "2000",
            });
            _this.roleUserList.splice(_this.deleteRoleUserIndex, 1);
            _this.dialogVisible = false;
          } else {
            _this.loaded = false;
            _this.$message({
              message: res.data.msg,
              type: "error",
              duration: "2000",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取所有权限
    getAllPower() {
      this.$axios
        .post("/erp_check/genbenbiaodan", {
          corp_id: this.$store.state.cid,
          pid: "0",
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.PowerList = res.data.data;
            let arr = [];
            this.PowerList.forEach((e) => {
              arr.push({ id: e.id, label: e.name });
            });
            this.myArray = arr;
            console.log(this.PowerList);
            this.PowerList = this.PowerList.map((item) => {
              return Object.assign(item, {
                isIndeterminate: false,
                checkAll: false,
                checkedRole: false,
              });
            });
            this.PowerList.forEach((item) => {
              item.child = item.child.map((item) => {
                return Object.assign(item, {
                  isIndeterminate: false,
                  checkAll: false,
                  checkedRole: false,
                  isCheckNum: 0,
                });
              });
            });
            this.PowerList.forEach((item) => {
              item.child.forEach((element) => {
                element.child = element.child.map((element) => {
                  return Object.assign(element, {
                    checkAll: false,
                  });
                });
              });
              // item.child = item.child.map((item) => {
              //     return Object.assign(item, {
              //         checkAll: false
              //     });
              // });
            });
            this.PowerList.forEach((item) => {
              if (item.check == 1) {
                item.isIndeterminate = false;
                item.checkAll = true;
                item.checkedRole = true;
              } else {
                item.isIndeterminate = false;
                item.checkAll = false;
                item.checkedRole = false;
              }
              if (item.child.length > 0) {
                item.child.forEach((list) => {
                  if (list.check == 1) {
                    list.isIndeterminate = false;
                    list.checkAll = true;
                    list.checkedRole = true;
                  } else {
                    list.isIndeterminate = false;
                    list.checkAll = false;
                    list.checkedRole = false;
                  }
                  if (list.child.length > 0) {
                    list.child.forEach((element) => {
                      if (element.check == 1) {
                        element.checkAll = true;
                        list.isCheckNum = 1;
                      } else {
                        element.checkAll = false;
                      }
                    });
                  }
                });
              }
            });
            // console.log('456++' + JSON.stringify(this.PowerList));
            // this.getRolePower();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取角色权限
    // getRolePower() {
    //     const _this = this;
    //     _this.$axios
    //         .post('/finance/roleqxxq', {
    //             id: _this.roleId
    //         })
    //         .then((res) => {
    //             if (res.data.code == 1) {
    //                 let newArray = res.data.content;
    //                 if (newArray.length > 0) {
    //                     // _this.rolePower = newArray.map(item => {
    //                     //     if (!item.id) return '';
    //                     //     return item.id;
    //                     // });
    //                     _this.rolePower = newArray;
    //                     _this.comparison(_this.PowerList, _this.rolePower);
    //                 }
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // },
    //对比相同值更改是否checked
    // comparison(arr, Newarr) {
    //     const _this = this;
    //     for (let i = 0; i < arr.length; i++) {
    //         let item = arr[i];
    //         for (let j = 0; j < Newarr.length; j++) {
    //             let items = Newarr[j];
    //             if (item.id == items) {
    //                 // item.isIndeterminate;
    //                 item.checkAll = true;
    //             }
    //         }
    //         if (item.child.length > 0) {
    //             for (let k = 0; k < item.child.length; k++) {
    //                 for (let p = 0; p < Newarr.length; p++) {
    //                     let items = Newarr[p];
    //                     if (item.child[k].id == items) {
    //                         // item.isIndeterminate;
    //                         item.child[k].checkAll = true;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     let noneArray = [];
    //     _this.PowerList = _this.PowerList.concat(noneArray);
    //     console.log('对比++' + JSON.stringify(_this.PowerList));
    // },
    //更改角色权限
    updateRolePower() {
      const _this = this;
      _this.getPostPowerId();
      _this.$axios
        .post("/index.php/api/dapplication/distributeRoleAuth", {
          id: _this.roleId,
          rules: _this.postPowerId.toString(),
        })
        .then((res) => {
          if (res.data.code == 1) {
            _this.getAllPower();
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //抽取更改权限id
    getPostPowerId() {
      const _this = this;
      _this.postPowerId = [];
      for (let i = 0, len = _this.PowerList.length; i < len; i++) {
        if (_this.PowerList[i].checkAll == true)
          _this.postPowerId.push(_this.PowerList[i].id);
        if (_this.PowerList[i].child && _this.PowerList[i].child.length > 0) {
          let sonPermissionArray = _this.PowerList[i].child;
          for (let j = 0, leng = sonPermissionArray.length; j < leng; j++)
            if (sonPermissionArray[j].checkAll == true) {
              _this.postPowerId.push(sonPermissionArray[j].id);
            }
        }
      }
    },
    //打开重命名覆盖层
    editRoleBtn(item, index) {
      console.log(item);
      this.editRoleId = item.id;
      this.editRoleIdName = item.name;
      this.editRoleIdIndex = index;
      this.editVisible = true;
    },
    //打开删除覆盖层
    deleteRoleBtn(item, index) {
      console.log(item);
      this.deleteRoleId = item.id;
      this.deleteRoleIdName = item.name;
      this.deleteRoleIdIndex = index;
      this.deleteVisible = true;
    },
    //角色重命名
    editRoleIdSure() {
      const _this = this;

      if (_this.newRoleName) {
        _this.$axios
          .post("/finance/role_alter", {
            id: _this.editRoleId,
            name: _this.newRoleName,
          })
          .then((res) => {
            if (res.data.code == 1) {
              _this.editVisible = false;
              _this.getRoleList();
              _this.newRoleName = "";
              _this.$message({
                type: "success",
                message: "角色修改成功",
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
          message: "请输入新的角色名",
          duration: 1500,
        });
      }
    },
    //删除角色
    deleteRoleIdSure() {
      const _this = this;
      _this.$axios
        .post("/finance/roledel", {
          id: _this.deleteRoleId,
        })
        .then((res) => {
          if (res.data.code == 1) {
            _this.roleList.splice(_this.deleteRoleIdIndex, 1);
            _this.deleteVisible = false;
            _this.$message({
              type: "success",
              message: "删除角色成功",
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
    },
    //添加角色人员
    addRoleUser(newarr) {
      const _this = this;
      _this.$axios
        .post("/finance/ryqxadd", {
          j_id: _this.roleId,
          userid: newarr,
        })
        .then((res) => {
          if (res.data.code == 1) {
            _this.getRoleUserList();
            _this.$message({
              type: "success",
              message: "添加人员成功",
              duration: 1500,
            });
          } else {
            _this.$message({
              type: "warning",
              message: res.data.msg,
              duration: 2000,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async showSubbranch(cover_set_id) {
      this.cover_set_id = cover_set_id;
      void (await this.getSubbranch(cover_set_id));
      this.subbranchVisible = true;
    },
    async getSubbranch(cover_set_id) {
      const url = "/finance/two_power_list";
      const res = await this.$axios.post(url, {
        cover_set_id,
      });
      if (res.data.code === 1) {
        this.subbranchList = res.data.content;
      } else {
        this.$message.error(res.msg);
      }
    },
    async deleteSubbranch(subId) {
      const url = "/finance/two_power_del";
      const res = await this.$axios.post(url, {
        id: subId,
      });
      if (res.data.code === 1) {
        this.$message.success("删除成功");
        this.getSubbranch(this.cover_set_id);
      } else {
        this.$message.error(res.data.msg);
      }
    },
    async addSubbranch(users) {
      const url = "/finance/two_power";
      const res = await this.$axios.post(url, {
        user: users,
        j_id: this.roleId,
        cover_set_id: this.cover_set_id,
      });
      if (res.data.code == 1) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });
      } else {
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },
    selectSubbranch(id) {
      const _this = this;
      _this.cover_set_id = id;
      dd.ready(() => {
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
          appId: _this.agentid, //微应用的Id
          permissionType: "GLOBAL", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartdeptId: 0, //仅支持0和-1
          onSuccess: function (result) {
            // let newPeople = [];
            // newPeople = result.users.map((item) => {
            //     if (!item.emplId) retÎurn '';
            //     return item.emplId;
            // });
            _this.addSubbranch(result.users);
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
    addManyP() {
      const that = this;
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
          startWithDepartdeptId: 0, //仅支持0和-1
          onSuccess: function (result) {
            // let newPeople = [];
            // newPeople = result.users.map((item) => {
            //     if (!item.emplId) return '';
            //     return item.emplId;
            // });
            that.addRoleUser(result.users);
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
  },
  mounted() {
    this.getRoleList();
    this.$utils.checkding();
    this.getAllPower();
  },
  computed: {
    comEdit() {
      if (this.isEditId == "1") {
        return "crhrSpan";
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.paixuOne {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  line-height: 40px;
  border: 1px solid #999;
  padding: 0 0 10px 10px;
}
.el-collapse {
  border-top: none;
}
.subList {
  min-height: 380px;
  .userLine {
    border-bottom: 1px solid #e6e6e7;
    .userContent {
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      line-height: 48px;
      .ucLeft {
        display: flex;
        .notou {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: 30px;
          background-color: #409eff;
          text-align: center;
          color: #fff;
        }
        .touPic {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: 30px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      i {
        cursor: pointer;
      }
      .el-icon-delete {
        color: red;
      }
    }
  }
}

span.roles {
  color: #ccc;
  font-size: 14px;
  margin-left: 10px;
}
#systemRole {
  .item {
    .iconOperation {
      opacity: 0;
    }
    .line:hover {
      .iconOperation {
        opacity: 1;
      }
    }
  }
}
/deep/.el-dropdown-menu {
  .el-dropdown-menu__item {
    padding: 0 !important;
  }
}
#system #systemRole .appContent .appContentRight .appCRBottom .acrbHeader,
#system #systemRole .appContent .appContentRight .appCRBottom .acf2 {
  width: 95%;
}
</style>
