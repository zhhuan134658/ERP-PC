<template>
  <div id="materialBasic">
    <div class="main">
      <div class="content">
        <div class="mainContent">
          <div>
            <div>
              <el-row>
                <el-col :span="24"
                  ><div style="border-bottom: 1px solid #d8e0e6">
                    <div style="width: 150px; border-bottom: 2px solid #3894ff">
                      标签设置
                    </div>
                  </div></el-col
                >
              </el-row>
            </div>

            <div class="center">
              <el-row>
                <el-col :span="24">
                  <div class="centerItem">
                    <div style="width: 20%; color: red">温馨提示</div>
                    <div style="width: 70%">
                      web端配置打印机纸张长、宽比为2.5可得到最佳打印效果。如：纸带宽度为18mm，设置长度为45mm最佳；纸带宽度为24mm，设置长度为60最佳
                    </div>
                  </div>

                  <div class="centerItem">
                    <div style="width: 20%">选择标签模板</div>
                    <div style="width: 70%" class="biaoqian">
                      <div class="moban">
                        <div
                          style="
                            border-bottom: 1px dashed #999;
                            padding-bottom: 5px;
                          "
                        >
                          <el-radio
                            v-model="info.name"
                            label="模板1"
                            @change="change1"
                            >模板1</el-radio
                          >
                        </div>
                        <div class="erma">
                          <div class="left">
                            <img
                              class="right"
                              src="../../../assets/images/erwe.jpg"
                              alt=""
                            />
                            <div style="padding-left: 0">自定义选取字段</div>
                          </div>
                          <div>
                            <img
                              style="width: 60px; height: 60px"
                              src="../../../assets/images/erwe.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        class="moban"
                        style="width: 120px; height: 120px; margin-left: 30px"
                      >
                        <div
                          style="
                            border-bottom: 1px dashed #999;
                            padding-bottom: 5px;
                          "
                        >
                          <el-radio
                            v-model="info.name"
                            label="模板2"
                            @change="change1"
                            >模板2</el-radio
                          >
                        </div>

                        <div style="text-align: center; margin-top: 10px">
                          <img
                            style="width: 60px; height: 60px"
                            src="../../../assets/images/erwe.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="centerItem" v-if="info.name == '模板1'">
                    <div style="width: 20%">自定义选取字段</div>
                    <div style="width: 70%">
                      <div>
                        <el-button type="primary" @click="addZ"
                          >添加字段</el-button
                        ><span style="margin-left: 25px"
                          >注: 三个字段为最佳效果</span
                        >
                      </div>

                      <div style="margin-top: 20px" class="xuanZ">
                        <span
                          v-for="(item, index) in newList"
                          :key="index"
                          class="xuanzh"
                        >
                          <!-- :style="(index % 2)== 0 ? 'marginLeft:10px' : ''" -->

                          {{ item }}
                          <span style="font-size: 16px" @click="close(index)"
                            >x</span
                          >
                        </span>
                        <span class="line"></span>
                        <span class="xuanzh" @click="clear" style="width: 50px"
                          >清空</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- -->
                  <div class="centerItem" v-if="isLogo">
                    <div style="width: 20%">上传公司logo</div>
                    <div style="width: 70%" class="biaoqian">
                      <div class="moban" style="padding: 0">
                        <div style="width: 100%; height: 100%">
                          <img
                            style="width: 100%; height: 85%"
                            :src="info.logo"
                            alt=""
                          />
                          <div class="addLogo">
                            <imgupload
                              v-on:listenToChildEvent="show"
                            ></imgupload>
                          </div>
                        </div>
                      </div>

                      <div
                        class="moban"
                        style="margin-left: 30px; width: 100%; border: none"
                      >
                        <div>
                          <span style="color: #409eff">注：</span
                          ><span
                            >1.选择的标签模板中含有logo,则支持企业自定义</span
                          >
                        </div>
                        <div style="margin: 10px 0 0 28px">
                          2.尺寸要求：logo的宽度不能小于236px,高度不能小于89px
                        </div>
                        <div style="margin: 10px 0 0 28px">
                          3.格式要求：透明背景或者白色背景的jpg,png图片
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="centerItem">
                    <div style="width: 20%">扫码二维码页面展示字段</div>
                    <div style="width: 70%">
                      <div>
                        <el-button type="primary" @click="dialogVisible1 = true"
                          >添加字段</el-button
                        >
                      </div>

                      <div style="margin-top: 20px" class="xuanZ">
                        <span
                          v-for="(item, index) in newList1"
                          :key="index"
                          class="xuanzh"
                        >
                          <!-- :style="(index % 2)== 0 ? 'marginLeft:10px' : ''" -->

                          {{ item }}
                          <span style="font-size: 16px" @click="close1(index)"
                            >x</span
                          >
                        </span>
                        <span class="line"></span>
                        <span
                          class="xuanzh"
                          @click="newList1 = []"
                          style="width: 50px"
                          >清空</span
                        >
                      </div>
                    </div>
                  </div>

                  <div class="centerItem">
                    <div style="width: 20%">设置打印纸类型</div>
                    <div style="width: 70%">
                      <el-radio v-model="info.papertape" label="标签专用纸"
                        >标签专用纸
                      </el-radio>
                      <el-radio v-model="info.papertape" label="A4纸"
                        >A4纸</el-radio
                      >
                    </div>
                  </div>

                  <div class="centerItem" v-if="info.name == '模板1'">
                    <div style="width: 20%">标签字体大小设置</div>
                    <div style="width: 70%">
                      <el-input-number
                        v-model="info.fontsiz"
                        controls-position="right"
                        :min="0"
                      ></el-input-number>
                      <span style="margin-left: 25px"
                        >注: 10号字体大小为最佳效果</span
                      >
                    </div>
                  </div>

                  <div class="centerItem">
                    <div style="width: 20%">打印预览</div>
                    <div style="width: 70%">
                      <div class="yulan" v-if="info.name == '模板1'">
                        <div class="yulanItem">
                          <div>
                            <img
                              :src="info.logo"
                              alt=""
                              style="width: 100px; height: 20px"
                              v-if="item == 'logo'"
                              v-for="(item, index) in newList"
                              :key="index"
                            />
                            <div
                              style="color: black; margin-top: 5px"
                              v-if="item != 'logo'"
                              v-for="(item, index) in newList"
                              :key="index"
                            >
                              {{ item }}
                            </div>
                          </div>
                          <div>
                            <img
                              src="../../../assets/images/erwe.jpg"
                              alt=""
                              class="imgs"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="yulan" style="width: 200px" v-else>
                        <div class="yulanItem" style="width: 130px">
                          <div style="margin: auto">
                            <img
                              src="../../../assets/images/erwe.jpg"
                              alt=""
                              class="imgs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style="text-align: center; margin-top: 30px">
                    <el-button type="primary" @click="save">保存</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="字段选择"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>基本信息</span>
      <el-checkbox-group v-model="newList">
        <el-checkbox
          :label="item.name"
          v-for="(item, index) in checkList"
          :key="index"
          style="margin: 10px"
          @change="change"
        ></el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="字段选择"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose"
    >
      <span>基本信息</span>
      <el-checkbox-group v-model="newList1">
        <el-checkbox
          :label="item.name"
          v-for="(item, index) in checkList1[0]"
          :key="index"
          style="margin: 10px"
          @change="change"
        ></el-checkbox>
      </el-checkbox-group>

      <span>领用信息</span>
      <el-checkbox-group v-model="newList1">
        <el-checkbox
          :label="item.name"
          v-for="(item, index) in checkList1[1]"
          :key="index"
          style="margin: 10px"
          @change="change"
        ></el-checkbox>
      </el-checkbox-group>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import imgupload from "../../../components/imgUpload1.vue";
export default {
  components: { imgupload },
  data() {
    return {
      radio: "1",
      radios: "1",
      checkList: [],
      newList: [],
      checkList1: [],
      newList1: [],
      upImgList: [],
      licenceImg: [],
      xuanList: [
        { name: "logo" },
        { name: "备注" },
        { name: "备注" },
        { name: "备注" },
        { name: "备注" },
        { name: "备注" },
      ],
      weight: "",
      dialogVisible: false,
      dialogVisible1: false,
      checkList1: [],
      isLogo: true,
      info: {},
    };
  },
  methods: {
    //保存
    save() {
      this.xuanZduan();
      this.info.corp_id = this.$store.state.cid;
      this.$axios
        .post("/erp_check/templateupdate", this.info)
        .then((res) => {
          if (res.data.code == "1") {
            this.$message({
              message: res.data.msg,
              type: "success",
              duration: 1500,
            });
            this.getinfo();
          }
        })
        .catch(function (error) {});
    },
    xuanZduan() {
      var arr = [],
        arr1 = [];
      this.checkList.forEach((e) => {
        this.newList.forEach((i) => {
          if (e.name == i) {
            arr.push(e);
          }
        });
      });

      this.checkList1[0].forEach((e) => {
        this.newList1.forEach((i) => {
          if (e.name == i) {
            arr1.push(e);
          }
        });
      });
      this.checkList1[1].forEach((e) => {
        this.newList1.forEach((i) => {
          if (e.name == i) {
            arr1.push(e);
          }
        });
      });
      this.info.labelcontent = arr;
      this.info.erweicontent = arr1;
      console.log(this.newList1, this.checkList1);
    },
    addZ() {
      this.dialogVisible = true;
    },
    show(data) {
      console.log(data);
      this.info.logo = data;
    },
    //自定义标签保存
    send() {},
    close(row) {
      this.newList.splice(row, 1);
      this.isLogoPost();
    },
    close1(row) {
      this.newList1.splice(row, 1);
    },
    change(row) {
      this.isLogoPost();
    },
    isLogoPost() {
      var num = 0;
      this.newList.forEach((e) => {
        if (e == "logo") {
          num += 1;
        }
      });
      if (num == 1) {
        this.isLogo = true;
      } else {
        this.isLogo = false;
      }
    },
    clear() {
      this.newList = [];
    },
    change1(row) {
      console.log(row);
      this.getinfo(row);
    },
    handleClose() {
      this.dialogVisible = false;
      this.dialogVisible1 = false;
      this.getinfo();
    },
    getinfo(row) {
      this.$axios
        .post("/erp_check/templatecontent", {
          corp_id: this.$store.state.cid,
          name: row,
        })
        .then((res) => {
          if (res.data.code == 1) {
            let arr = [],
              arr1 = [];
            if (row == "模板1") {
              res.data.content.labelcontent.forEach((e) => {
                arr.push(e.name);
              });
            }
            res.data.content.erweicontent.forEach((e) => {
              arr1.push(e.name);
            });
            this.info = res.data.content;
            this.newList = arr;
            this.newList1 = arr1;
            this.isLogoPost();
          }
        })
        .catch(function (error) {});
    },
    getList(row) {
      this.$axios
        .post("/erp_check/assetfileds", {
          type: 1,
        })
        .then((res) => {
          this.checkList = res.data.content;
        })
        .catch(function (error) {});
      this.$axios
        .post("/erp_check/assetfileds", {
          type: 2,
        })
        .then((res) => {
          this.checkList1 = res.data.content;
        })
        .catch(function (error) {});
    },
  },
  mounted() {
    this.getinfo("模板1");
    this.getList();
  },
};
</script>
<style scoped lang='less'>
.homeMain {
  background-color: white;
}
.center {
  padding: 20px 300px;
  .centerItem {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .yulan {
    width: 350px;
    //   height: 130px;
    border: 1px solid #999;
    padding: 20px;
    .yulanItem {
      width: 300px;
      //   height: 80px;
      background-color: white;
      margin: auto;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      -webkit-box-shadow: 0 0 10px 5px black;
      -moz-box-shadow: 0 0 10px 5px black;
      box-shadow: 0 0 5px 2px black;
      .imgs {
        width: 100px;
        height: 100px;
      }
    }
  }
  .moban {
    width: 230px;
    height: 120px;
    border: 1px dashed #999;
    padding: 5px 15px;
  }
  .addLogo {
    width: 100%;
    height: 15%;
    text-align: center;
    font-size: 12px;
    background-color: #dddddd;
  }
  .erma {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .right {
      width: 50px;
      height: 20px;
      margin-bottom: 15px;
    }
  }
  .biaoqian {
    display: flex;
  }
  .xuanZ {
    width: 100%;
  }
  .xuanzh {
    margin-top: 10px;
    // width: 16%;
    font-size: 12px;
    padding: 2px 8px;
    border: 1px solid #999;
    display: inline-block;
    margin-left: 10px;
    text-align: center;
  }
  .line {
    width: 1px;
    margin: 0 20px;
    height: 15px;
    display: inline-block;
    background-color: #999;
  }
}
</style>
