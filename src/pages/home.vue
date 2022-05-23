<template>
  <div id="home">
    <el-container class="homeContain" style="border: 1px solid #eee">
      <el-header class="homeHeader">
        <div class="workbench-img">
          <img :src="logoUrl" alt="" />
        </div>
        <div class="workbench_main">
          <div class="workbench-center">
            <ul class="firstInjs">
              <li
                v-for="(item, index) in titleList"
                :key="index"
                :class="cNameTwoS(item.url)"
                @click="buttonTop(item.url)"
              >
                <div style="height: 70px; line-height: 70px">
                  <div
                    style="
                      white-space: nowrap;
                      line-height: inherit;
                      display: flex;
                      align-items: center;
                    "
                  >
                    <span>{{ item.name }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="workbench_right">
            <div class="relation-box">
              <ul>
                <li>
                  <div class="noticeBox" style="width: 24px; height: 24px">
                    <img
                      src="../assets/images/notice.png"
                      alt=""
                      @click="viewMore"
                    />
                    <!-- <span>*</span> -->
                  </div>
                </li>
              </ul>
            </div>
            <div class="admin">
              <img :src="Image" v-if="Image" />
              <img src="../assets/menu/YH.png" v-else />
              <div
                style="white-space: nowrap; margin-left: 20px; overflow: hidden"
              >
                {{ uname }}
              </div>
            </div>
          </div>
        </div>
      </el-header>
      <el-container class="homeBottomContain">
        <router-view v-if="menushow" />
      </el-container>
    </el-container>
    <el-dialog :visible.sync="createVisible" class="carouselDialog">
      <el-carousel
        trigger="click"
        height="559px"
        :autoplay="false"
        arrow="always"
      >
        <el-carousel-item v-for="(item, index) in helplist" :key="index">
          <el-image style="width: 100%; height: 100%" :src="item"></el-image>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
    <el-dialog
      title="意见反馈"
      :visible.sync="addFormVisible"
      @close="handleClose('addEditForm')"
      width="600px"
    >
      <el-form
        :model="addForm"
        label-width="80px"
        :rules="addFormRules"
        ref="addEditForm"
        label-position="right"
      >
        <div>
          <el-form-item label="意见：" prop="parere">
            <el-input
              type="textarea"
              v-model="addForm.parere"
              maxlength="240"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="tel">
            <el-input v-model="addForm.tel" maxlength="11"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loaded"
            @click="addSave('addEditForm')"
            >提交</el-button
          >
          <el-button @click="handleClose('addEditForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import "dingtalk-jsapi/entry/union";
import * as dd from "dingtalk-jsapi";

export default {
  name: "home",
  data() {
    return {
      maincorpid: "",
      menushow: false,
      muvisible: false,
      formInline: {
        region: "",
      },
      allregion: [],
      helplist: [
        "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/zXDkXNeNkd1609724091928.png",
        "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/7s26jHzTtf1609724267189.png",
        "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/KHEMpJfKJT1609724623208.png",
        "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/7KAxBPaE7F1609724624335.png",
      ],
      createVisible: false,
      addFormRules: {
        parere: [
          {
            required: true,
            message: "请输入意见",
            trigger: "blur",
          },
        ],
        tel: [
          {
            required: true,
            message: "请选择手机号",
            trigger: "blur",
          },
        ],
      },
      loaded: false,
      addFormVisible: false,
      Image: "",
      cname: "",
      name: "",
      corp_time: "",
      corp_name: "",
      uname: "",
      cNameOne: "colorName",
      cNameTwo: "",
      checkedLists: [],
      titleList: [],
      addForm: {
        tel: "",
        parere: "",
      },
      logoUrl: "",
    };
  },
  methods: {
    onok() {
      this.muvisible = false;
      this.$router.push({ path: this.formInline.region });
    },
    viewMore() {
      this.$router.push({
        path: "/appIndex8/appIndexMsg",
      });
    },
    // 所有路由
    getallrouter() {
      this.$axios
        .post("/order/menuSou")
        .then((res) => {
          if (res.data.code == 1) {
            this.allregion = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getLogo() {
      this.logoUrl =
        "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/H4wMiseYbS1617767784128.png"; //写死LOGO地址
    },

    gohelp() {
      dd.ready(function () {
        dd.biz.util.openLink({
          url: "https://www.yuque.com/books/share/834d6476-ad45-4f80-8a94-51d767673b9d?#", //要打开链接的地址
          onSuccess: function () {
            /**/
          },
          onFail: function () {},
        });
      });
    },
    open() {
      this.$notify.error({
        title: "错误",
        message: "获取数据失败，请刷新页面",
      });
    },
    addBack() {
      this.addFormVisible = true;
    },
    //意见
    addSave(formName) {
      const _this = this;
      _this.loaded = true;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$axios
            .post("/finance/parereadd", {
              tel: this.addForm.tel,
              img: "",
              parere: this.addForm.parere,
            })
            .then((res) => {
              if (res.data.code == 1) {
                _this.loaded = false;
                _this.addFormVisible = false;
                _this.$refs[formName].resetFields();
                _this.$message({
                  message: "提交意见成功",
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
    //取消意见
    handleClose(formName) {
      this.$refs[formName].resetFields();
      this.addFormVisible = false;
    },
    getMenuList() {
      this.$axios
        .post("/erp_check/roles", {
          type: 0,
          corp_id: this.$store.state.cid,
          userid: this.$store.state.userInfo.uid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.titleList = res.data.data;
            console.log(this.titleList);
            //新手指引
            // this.$nextTick(() => {
            //     this.guide();
            // });
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: "1500",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    buttonTop(url) {
      this.$router.push(url);
    },
    gophone() {
      let newP = window.location.protocol;
      if (
        this.$store.state.userInfo.uid == "1955162522782338" ||
        this.$store.state.userInfo.uid == "1743511105903146" ||
        this.$store.state.userInfo.uid == "195516252224279904" ||
        this.$store.state.userInfo.uid == "manager9288"
      ) {
        if (newP == "http:") {
          window.location.href =
            "http://glzhukuai.zzdingyun.comapp/mobile/index.html";
        } else {
          window.location.href =
            "https://dingzhukuai.zzdingyun.com/app/mobile/index.html";
        }
      }
    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    getReady() {
      const that = this;
      let corpId = that.GetQueryString("corpid");
      // 免登录信息获取
      console.log("CorpId", corpId);
      dd.ready(function () {
        // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
        dd.runtime.permission.requestAuthCode({
          // corpId: "dingea47c602975497f935c2f4657eb6378f",
          corpId: corpId,
          onSuccess: function (result) {
            console.log("code", result.code);
            if (result.code != "") {
              that.$axios
                .post("/erp_user/userinfo", {
                  corp_id: corpId,
                  code: result.code,
                })
                .then((res) => {
                  if (res.data.code == 1) {
                    that.$nextTick(() => {
                      that.menushow = true;
                    });
                    that.getLogo();
                    sessionStorage.setItem("errcode", 1);
                    let userData = JSON.parse(
                      JSON.stringify(res.data.data.content)
                    );
                    if (userData.jobnumber == 0) {
                      that.createVisible = true;
                    } else {
                      that.createVisible = false;
                    }
                    let user = userData.userid;
                    that.Image = userData.avatar;
                    that.uname = userData.name;
                    that.$store.commit("setUname", that.uname);
                    that.$store.commit("setCname", userData.company);
                    that.$store.commit("setAvatar", that.Image);
                    that.$store.commit("setUid", user);
                    that.$store.commit("setAdmin", userData.zk_admin);
                    // 判断是不是个人版   个人版 2  企业版 1
                    // if (res.data.data.content.type == 2) {
                    //     that.firstshow = true;
                    // } else {
                    //     that.firstshow = false;
                    // }
                    that.$store.commit(
                      "setmaincorpid",
                      res.data.data.content.mainCorpId
                    );
                    that.$store.commit(
                      "setfirstshow",
                      res.data.data.content.type
                    );
                    that.maincorpid = res.data.data.content.mainCorpId;

                    that.$utils.checkding();
                    that.getMenuList();
                    that.$utils.utilProjectType();
                    that.$utils.utilProjectStatus();
                    that.$utils.utilAllProject();
                  } else if (res.data.code == 2) {
                    sessionStorage.setItem("errMsg", res.data.msg);
                    sessionStorage.setItem("errcode", 2);
                    that.$router.push("/error");
                  } else if (res.data.code == 3) {
                    that.$store.commit("setOutTime", res.data.data.time);
                    sessionStorage.setItem("errStatus", res.data.data.status);
                    sessionStorage.setItem("errcode", 3);
                    that.$router.push("/errorOut");
                  } else if (res.data.code == 0) {
                    sessionStorage.setItem("errcode", 0);
                    sessionStorage.setItem("errMsg", res.data.msg);
                    that.$router.push("/error");
                  }
                });
            }
          },
          onFail: function () {},
        });
      });
    },
    login() {
      const that = this;
      const code = "";
      that.$axios
        .post("/erp_user/userinfo", {
          corp_id: that.$store.state.cid,
          code: code,
        })
        .then((res) => {
          if (res.data.code == 1) {
            that.$nextTick(() => {
              that.menushow = true;
            });
            that.getMenuList();
            that.getLogo();
            // sessionStorage.setItem("errcode", 1);
            let userData = JSON.parse(JSON.stringify(res.data.data.content));

            that.$store.commit("setUname", userData.name);
            that.$store.commit("setCname", userData.company);
            that.$store.commit("setAvatar", that.Image);
            that.$store.commit("setUid", "612812294724352370");
            that.$store.commit("setAdmin", userData.zk_admin);

            // that.$utils.utilProjectType();
            // that.$utils.utilProjectStatus();
            // that.$utils.utilAllProject();
          } else if (res.data.code == 2) {
            sessionStorage.setItem("errMsg", res.data.msg);
            sessionStorage.setItem("errcode", 2);
            that.$router.push("/error");
          } else if (res.data.code == 3) {
            that.$store.commit("setOutTime", res.data.data.time);
            sessionStorage.setItem("errStatus", res.data.data.status);
            sessionStorage.setItem("errcode", 3);
            that.$router.push("/errorOut");
          } else if (res.data.code == 0) {
            sessionStorage.setItem("errcode", 0);
            sessionStorage.setItem("errMsg", res.data.msg);
            that.$router.push("/error");
          }
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    menuClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeColor(val) {
      let newPath = this.$route.path,
        newUrl = "",
        valUrl = "";
      console.log("99999999", this.$route.path);
      let index = newPath.lastIndexOf("/");
      let valIndex = val.lastIndexOf("/");

      newUrl = newPath.substring(0, index + 1);

      valUrl = val.substring(0, valIndex + 1);

      console.log("valUrl", valUrl);
      console.log("newUrl", newUrl);
      if (valUrl == "/appIndex8/") {
        if (newUrl == "/appIndex8/") {
          return this.cNameOne;
        } else {
          return this.cNameFour;
        }
      } else if (valUrl == "/librarytube/") {
        //库管
        if (newUrl == "/librarytube/") {
          return this.cNameOne;
        } else {
          return this.cNameFour;
        }
      } else if (valUrl == "/purchase/") {
        //   采购
        if (newUrl == "/purchase/") {
          console.log("8887871111");
          return this.cNameOne;
        } else {
          console.log("888787882222");
          return this.cNameFour;
        }
      } else if (valUrl == "/maintain/") {
        //   维护
        if (newUrl == "/maintain/") {
          return this.cNameOne;
        } else {
          return this.cNameFour;
        }
      } else if (valUrl == "/system/") {
        //系统管理
        if (newUrl == "/system/") {
          return this.cNameOne;
        } else {
          return this.cNameFour;
        }
      } else if (valUrl == "/finance/") {
        //财务
        if (newUrl == "/finance/") {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == "/files/") {
        if (newUrl == "/files/") {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == "/certificate/") {
        if (newUrl == "/certificate/") {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == "/system/") {
        if (newUrl == "/system/") {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == "/scene/") {
        if (newUrl == "/scene/") {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == "/task/") {
        if (newUrl == "/task/") {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == "/production/") {
        if (newUrl == "/production/") {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == "/administration/") {
        if (newUrl == "/administration/") {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      }
    },
    guide() {
      const _this = this;
      let introJs = require("intro.js");
      introJs()
        .setOptions({
          nextLabel: "下一步 &rarr;",
          prevLabel: "&larr; 上一步",
          skipLabel: "退出",
          doneLabel: "下一步",
          // showButtons: false,
          showBullets: false,
          steps: [
            {
              element: document.querySelector(".firstInjs"),
              intro: "您可以在这里选择操作",
            },
            {
              element: document.querySelector(".secondInjs"),
              intro: "在这里联系我们",
            },
            {
              element: document.querySelector(".thirdInjs"),
              intro: "在这里获取更多帮助",
            },

            // {
            //     title: 'Farewell!',
            //     element: document.querySelector('.card__image'),
            //     intro: 'And this is our final step!'
            // }
          ],
        })
        .oncomplete(function () {
          //点击跳过按钮后执行的事件
        })
        .onexit(function () {
          _this.createVisible = true;
          // introJs().refresh();
          //点击结束按钮后， 执行的事件
          // _this.$router.push({ path: '/project/tenderProject' });
        })
        // .onchange(function (targetElement) {
        //     console.log('45+++' + targetElement.className);
        //     _this.currentClass = targetElement.className;
        // })
        // .onbeforechange(function (targetElement) {
        //     console.log('47+++' + targetElement.className);
        //     if (_this.currentClass == 'firstInjs') {
        //         _this.$router.push({ path: '/project/tenderProject' });
        //     }
        // })
        .start();
    },
  },
  mounted() {
    // this.framework();
    // this.$nextTick(() => {
    //     let gonext = document.getElementsByClassName('.introGoNext');
    //     gonext.onclick = function () {
    //         console.log('45666++');
    //     };
    // });
  },
  created() {
    const _this = this;
    let CorpId = "";
    var url = decodeURIComponent(location.search); //获取url中"?"符后的字串
    CorpId = url.split("?corpid=")[1];
    _this.$store.commit("setCid", CorpId);

    // _this.getallrouter();
    if (process.env.VUE_APP_AUTH_CODE == 666) {
      console.log("测试1环境");
      _this.$message(`测试1环境`);
      //   _this.$store.commit("setCid", "dingea47c602975497f935c2f4657eb6378f");
      //   _this.login();

      _this.getReady();
    } else {
      _this.getReady();
    }
  },
  computed: {
    ImageShow() {
      if (this.Image == "" || this.Image == null || this.Image == undefined) {
        return true;
      } else {
        return false;
      }
    },
    cNameOneS() {
      let newPath = this.$route.path,
        newUrl = "";
      let index = newPath.lastIndexOf("/");
      newUrl = newPath.substring(0, index + 1);
      if (newUrl == "/project/") {
        return this.cNameOne;
      } else {
        return this.cNameTwo;
      }
    },
    cNameTwoS() {
      return function (value) {
        return this.changeColor(value);
      };
    },
    cNameFourS() {
      return true;
    },
    cNameThreeS() {
      return true;
    },
    cNameTS() {
      return true;
    },
  },
};
</script>
