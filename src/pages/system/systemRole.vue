/* * @Author: NorthWind * @Date: 2020-12-21 10:35:31 * @Last Modified by:
mikey.zhaopeng * @Last Modified time: 2022-01-06 14:44:08 */
<template>
  <div id="systemRole">
    <div class="main">
      <div class="appContent">
        <div class="appContentLeft">
          <div class="top">
            <div class="line">
              <div style="font-weight: bold">角色列表</div>
              <div>
                <i class="el-icon-circle-plus-outline" @click="addRole"></i>
              </div>
            </div>
          </div>
          <div class="item" v-for="(item, index) in roleList" :key="index">
            <div class="line">
              <div
                :class="index === activeAppRole ? 'activeRoleClass' : ''"
                @click="changeRole(item, index)"
              >
                {{ item.name }}（{{ item.number }}）
              </div>
              <div>
                <i
                  v-if="item.name != '管理员'"
                  class="el-icon-delete"
                  @click="deleteRoleBtn(item, index)"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div class="appContentRight">
          <div class="appCRLine">
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
              </div>
              <div v-if="viewPage" class="appCRHRight">
                <span v-if="editable" @click="editRole" :class="comEdit"
                  >编辑</span
                >
                <span v-else @click="saveRole">保存</span>
              </div>
              <div v-else class="appCRHRight">
                <i class="el-icon-plus" @click="addManyP"></i>
              </div>
            </div>
          </div>
          <div class="appCRBottom" style="padding-top: 0px">
            <div v-if="viewPage">
              <div v-for="(item, index) in PowerList" :key="index">
                <el-collapse v-model="activeNames" accordion>
                  <el-collapse-item
                    :title="item.title"
                    :name="index + 1"
                    style="border-top: none"
                  >
                    <div
                      class="acrbHeader"
                      style="width: 100%;isplay: flex;background-color: #e6e6e7;"
                    >
                      <el-checkbox
                        class="acf2"
                        :indeterminate="item.isIndeterminate"
                        :disabled="editable"
                        v-model="item.checkAll"
                        :label="item.id"
                        :key="index"
                        @change="handleTotalAllChange($event, item, index)"
                        >全部</el-checkbox
                      >
                      <div
                        class="acf1"
                        :class="editable == true ? 'garyDivColor' : 'bDivColor'"
                        style="padding-left: 40px"
                      >
                        表单权限
                      </div>
                      <div
                        class="acf2"
                        :class="editable == true ? 'garyDivColor' : 'bDivColor'"
                        style="padding-left: 40px"
                      >
                        项目权限
                      </div>
                    </div>
                    <div v-if="item.children">
                      <div
                        v-for="(liItem, liIndex) in item.children"
                        :key="liIndex"
                        :class="
                          index % 2 == 0 ? 'arcbMain' : 'grayDiv arcbMain'
                        "
                      >
                        <div class="acrbHeader">
                          <el-checkbox
                            :indeterminate="liItem.isIndeterminate"
                            :disabled="editable"
                            v-model="liItem.checkAll"
                            :label="liItem.id"
                            :key="liIndex"
                            @change="
                              handleCheckAllChange(
                                $event,
                                liItem,
                                liIndex,
                                index
                              )
                            "
                            >{{ liItem.title }}</el-checkbox
                          >
                        </div>
                        <div class="acrbFooter acf1">
                          <el-checkbox
                            v-for="(ilist, lindex) in liItem.children"
                            :label="ilist.id"
                            :disabled="editable"
                            v-model="ilist.checkAll"
                            :key="lindex"
                           
                            :class="[lindex ==4 ? 'rightCheckOne' :'',lindex == 5 ?'rightCheckTwo':'']"
                            @change="
                              handlecheckedRoleChange(
                                $event,
                                liItem.children,
                                ilist,
                                index,
                                liIndex
                              )
                            "
                            >{{ ilist.title }}</el-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
            <div v-else class="acrbUser">
              <div v-if="roleUserList.length > 0">
                <div
                  class="userLine"
                  v-for="(item, index) in roleUserList"
                  :key="index"
                >
                  <div class="userContent">
                    <div class="ucLeft">
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
                    </div>
                    <div>
                      <i
                        class="el-icon-delete"
                        @click="deleteRoleUser(item, index)"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="roleUserList.length < 1" style="text-align: center">
                <img
                  src="../../assets/menu/NoData.png"
                  alt=""
                  style="width: 200px; margin-top: 80px"
                />
                <p style="margin-top: 20px">暂无数据</p>
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
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";
export default {
  name: "systemRole",
  data() {
    return {
      editable: true,
      activeNames: "1",
      dialogVisible: false,
      isIndeterminate: false,
      deleteVisible: false,
      deleteRoleName: "",
      addFormRules: {
        name: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur"
          }
        ]
      },
      roleList: [],
      roleListNum: [],
      activeAppRole: 0,
      activeAppItem: 0,
      titleList: [
        { name: "功能权限", value: "1" },
        { name: "角色成员", value: "2" }
      ],
      viewPage: true,
      loaded: false,
      addFormVisible: false,
      addForm: {
        name: ""
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
      addUserId: [],
      isEditId: "1"
    };
  },
  methods: {
    //启动编辑
    editRole() {
      if (this.isEditId !== "1") {
        this.editable = false;
      }
    },
    saveRole() {
      this.$axios
        .post("/spread/roleEdit", {
          id: this.roleId,
          rules: JSON.stringify(this.PowerList)
        })
        .then(res => {
          if (res.data.code == 1) {
            this.roleUserList = res.data.content;
            this.$message({
              type: "success",
              message: "编辑成功",
              duration: 1500
            });
          } else {
            this.$message({
              type: "warning",
              message: res.data.msg,
              duration: 1500
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      this.editable = true;
    },
    //一级全选
    handleTotalAllChange(e, item, index) {
      item.checkAll = e;
      if (e == false) {
        item.isIndeterminate = false;
        item.check = false;
      } else {
        item.check = true;
      }
      let childArray = this.PowerList[index].children;
      let nonArray = [];
      if (childArray) {
        for (let i = 0, len = childArray.length; i < len; i++) {
          childArray[i].checkAll = e;
          if (e) {
            childArray[i].check = true;
            childArray[i].isCheckNum = 1;
          } else {
            childArray[i].check = false;
            childArray[i].isCheckNum = 0;
          }
          childArray[i].children.forEach(element => {
            element.checkAll = e;
            if (e) {
              element.check = true;
            } else {
              element.check = false;
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
        item.check = false;
        item.isCheckNum = 0;
      } else {
        item.isCheckNum = 1;
        item.check = true;
      }
      this.PowerList[index].children[lindex].checkedRole = e;

      let childrenArray = this.PowerList[index].children[lindex].children;
      let noneArray = [];
      if (childrenArray) {
        for (let i = 0, len = childrenArray.length; i < len; i++) {
          childrenArray[i].checkAll = e;
          if (e) {
            childrenArray[i].check = true;
          } else {
            childrenArray[i].check = false;
          }
        }
      }
      for (let k = 0; k < this.PowerList[index].children.length; k++) {
        if (this.PowerList[index].children[k].checkAll == true) {
          tottc++;
        }
      }
      if (tottc == this.PowerList[index].children.length) {
        this.PowerList[index].checkAll = true;
        this.PowerList[index].check = true;
        this.PowerList[index].isIndeterminate = false;
      } else {
        this.PowerList[index].checkAll = false;
        this.PowerList[index].check = false;
        this.PowerList[index].isIndeterminate = true;
      }
      this.PowerList = this.PowerList.concat(noneArray);

      // this.updateRolePower();
    },
    //子级选择
    handlecheckedRoleChange(e, list, ilist, index, liindex) {
        console.log(e,list, ilist, index, liindex)
      let tickCount = 0, //二级判断选中数
        unTickCount = 0, //二级判断未选中数
        tottc = 0; //一级判断选中数//一级判断未选中数
      let noneArray = [];
      ilist.checkAll = e;
      if (e) {
        ilist.check = true;
      } else {
        ilist.check = false;
      }
    //   console.log("123", e, ilist);

        if(ilist.title == '全部'){
            list.map((item, index) => {
            if (item.title == "参与") {
              list[index].checkAll = false;
              list[index].check = false;
            }
          });
        }else if(ilist.title == '参与'){
            list.map((item, index) => {
            if (item.title == "全部") {
              list[index].checkAll = false;
              list[index].check = false;
            }
          });
        }

      if (ilist.title == "新增") {
        // console.log("122", list);
        if (e) {
          list.map((item, index) => {
            if (item.title == "查看") {
              list[index].checkAll = true;
              list[index].check = true;
            }
          });
        }
      }
      for (let i = 0; i < list.length; i++) {
        if (list[i].checkAll == true) tickCount++;
        if (list[i].checkAll == false) unTickCount++;
      }
      if (tickCount == list.length) {
        //子级全勾选
        let SList = this.PowerList[index].children;
        this.PowerList[index].children[liindex].checkAll = true;
        this.PowerList[index].children[liindex].isIndeterminate = false;
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
        this.PowerList[index].children[liindex].checkAll = false;
        if (tickCount > 0) {
          this.PowerList[index].children[liindex].isIndeterminate = true;
        } else {
          this.PowerList[index].children[liindex].isIndeterminate = false;
        }
        this.PowerList[index].checkAll = false;
        this.PowerList[index].isIndeterminate = true;
      } else {
        this.PowerList[index].children[liindex].checkAll = false;
        this.PowerList[index].children[liindex].isIndeterminate = true; //添加不确定状态
      }
      if (unTickCount == list.length) {
        this.PowerList[index].children[liindex].isCheckNum = 0;
      } else {
        this.PowerList[index].children[liindex].isCheckNum = 1;
      }
      this.PowerList = this.PowerList.concat(noneArray);
    },
    //切换角色
    changeRole(item, index) {
      this.editable = true;
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
      if (index == 0) {
        this.viewPage = true;
        this.changeRoleList();
      } else {
        this.viewPage = false;
        this.getRoleUserList();
      }
    },
    //获取角色成员列表
    getRoleUserList() {
      this.$axios
        .post("/spread/memberList", {
          role_id: this.roleId
        })
        .then(res => {
          if (res.data.code == 1) {
            this.roleUserList = res.data.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeRoleList() {
      this.$axios
        .post("/spread/roleList")
        .then(res => {
          if (res.data.code == 1) {
            this.roleList = res.data.data;
            this.getAllPower();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取角色列表
    getRoleList() {
      this.$axios
        .post("/spread/roleList")
        .then(res => {
          if (res.data.code == 1) {
            this.roleList = res.data.data;
            this.roleId = res.data.data[0].id;
            this.isEditId = res.data.data[0].extend_first;
            this.getAllPower();
            this.getRoleUserList();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //新建角色
    addSave(formName) {
      const _this = this;
      _this.loaded = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$axios
            .post("/spread/roleAdd", {
              name: this.addForm.name
            })
            .then(res => {
              if (res.data.code == 1) {
                _this.getRoleList();
                _this.loaded = false;
                _this.addFormVisible = false;
                _this.$refs[formName].resetFields();
                _this.$message({
                  message: "添加角色成功",
                  type: "success",
                  duration: 1500
                });
              } else {
                _this.loaded = false;
                _this.$message({
                  message: res.data.msg,
                  type: "error",
                  duration: 1500
                });
              }
            })
            .catch(function(error) {
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
        .post("/spread/memberDel", {
          userid: _this.deleteRoleUserData.userid,
          role_id: _this.roleId
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.loaded = false;
            _this.$message({
              message: "删除成功",
              type: "success",
              duration: "2000"
            });
            _this.roleUserList.splice(_this.deleteRoleUserIndex, 1);
            _this.dialogVisible = false;
          } else {
            _this.loaded = false;
            _this.$message({
              message: res.data.msg,
              type: "error",
              duration: "2000"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取所有权限
    getAllPower() {
      this.$axios
        .post("/spread/rolePowerList", { id: this.roleId })
        .then(res => {
          if (res.data.code == 1) {
            this.PowerList = res.data.data;
            this.PowerList = this.PowerList.map(item => {
              return Object.assign(item, {
                checkAll: false,
                checkedRole: false
              });
            });
            this.PowerList.forEach(item => {
              item.children = item.children.map(item => {
                return Object.assign(item, {
                  checkAll: false,
                  checkedRole: false,
                  isCheckNum: 0
                });
              });
            });
            this.PowerList.forEach(item => {
              item.children.forEach(element => {
                element.children = element.children.map(element => {
                  return Object.assign(element, {
                    checkAll: false
                  });
                });
              });
              // item.child = item.child.map((item) => {
              //     return Object.assign(item, {
              //         checkAll: false
              //     });
              // });
            });
            this.PowerList.forEach(item => {
              if (item.check) {
                item.isIndeterminate = false;
                item.checkAll = true;
                item.checkedRole = true;
              } else {
                item.checkAll = false;
                item.checkedRole = false;
              }
              if (item.children.length > 0) {
                item.children.forEach(list => {
                  if (list.check) {
                    list.isIndeterminate = false;
                    list.checkAll = true;
                    list.checkedRole = true;
                  } else {
                    list.checkAll = false;
                    list.checkedRole = false;
                  }
                  if (list.children.length > 0) {
                    list.children.forEach(element => {
                      if (element.check) {
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
        .catch(function(error) {
          console.log(error);
        });
    },
    //更改角色权限
    updateRolePower() {
      const _this = this;
      _this.getPostPowerId();
      _this.$axios
        .post("/index.php/api/dapplication/distributeRoleAuth", {
          id: _this.roleId,
          rules: _this.postPowerId.toString()
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.getAllPower();
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function(error) {
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
        if (
          _this.PowerList[i].children &&
          _this.PowerList[i].children.length > 0
        ) {
          let sonPermissionArray = _this.PowerList[i].children;
          for (let j = 0, leng = sonPermissionArray.length; j < leng; j++)
            if (sonPermissionArray[j].checkAll == true) {
              _this.postPowerId.push(sonPermissionArray[j].id);
            }
        }
      }
    },
    //打开删除覆盖层
    deleteRoleBtn(item, index) {
      this.deleteRoleId = item.id;
      this.deleteRoleIdName = item.name;
      this.deleteRoleIdIndex = index;
      this.deleteVisible = true;
    },
    //删除角色
    deleteRoleIdSure() {
      const _this = this;
      _this.$axios
        .post("/spread/roleDel", {
          id: _this.deleteRoleId
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.roleList.splice(_this.deleteRoleIdIndex, 1);
            _this.deleteVisible = false;
            _this.$message({
              type: "success",
              message: "删除角色成功",
              duration: 1500
            });
          } else {
            _this.$message({
              type: "warning",
              message: res.data.msg,
              duration: 1500
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //添加角色人员
    addRoleUser(newarr) {
      const _this = this;
      _this.$axios
        .post("/spread/memberAdd", {
          role_id: _this.roleId,
          userid: newarr
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.getRoleUserList();
            _this.$message({
              type: "success",
              message: "添加人员成功",
              duration: 1500
            });
          } else {
            _this.$message({
              type: "warning",
              message: res.data.msg,
              duration: 2000
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addManyP() {
      const that = this;
      dd.ready(function() {
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
          onSuccess: function(result) {
            // let newPeople = [];
            // newPeople = result.users.map((item) => {
            //     if (!item.emplId) return '';
            //     return item.emplId;
            // });
            that.addRoleUser(result.users);
          },
          onFail: function(err) {
            console.log(err);
          }
        });
      });
      dd.error(function(err) {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getRoleList();
    this.$utils.checkding();
  },
  computed: {
    comEdit() {
      if (this.isEditId == "1") {
        return "crhrSpan";
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="less">
.el-collapse {
  border-top: none;
}
.rightCheckOne{
    position: relative;
    right: -50px;
    bottom: 10px;
}
.rightCheckTwo{
    position: relative;
    left: 379px;
    bottom: 10px;
}
</style>
