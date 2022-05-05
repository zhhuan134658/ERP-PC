<template>
  <div id="box">
    <div>
      <p>温馨提示：通过选择一个或者多个字段，来设置编码规则</p>
      <p style="margin-left: 69px">
        可通过多项选择
        <span style="color: #3296fa"
          >（编码分类、所属/承租公司编号、自定义文本、购置起止日期+流水号）</span
        >
        的方式组成编号
      </p>
    </div>

    <div class="lineS" v-if="isShow">
      <div class="line">
        <div class="box" style="border-right: 1px solid #999">
          <div class="title">
            <span
              :class="{ active: leftSelect === data1.length }"
              @click="selectAll(data1)"
              >可选字段</span
            >
            <!-- <span>{{ leftSelect ? leftSelect : 0 }}/{{ data1.length }}</span> -->
          </div>

          <!-- <div class="search_parent">
        <div class="search_div">
        <input
          class="search_input"
          v-model="sourceData"
          :class="heightLight ? 'search_input_focus' : ''"
          type="text"
          @focus="heightLight = true"
          @blur="heightLight = false"
          placeholder="请输入课件级别/编号"
        />
        </div>
      </div> -->

          <div @drop="dropPub($event, 2)" @dragover.prevent class="left">
            <div
              @drag="ondrag"
              @dragstart="dragstart($event, item, 1)"
              @dragend="dragend"
              draggable="true"
              class="hover-color"
              :class="{ active: item.isSelect }"
              v-on:click="hanldleClick(data1, item.id)"
              v-for="(item, index) in changeSourceData"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div>

        <div class="middle">
          <div
            v-on:click="moveItem(data2, data1, 1)"
            :class="{ active: rightSelect > 0 }"
          >
            <i class="el-icon-arrow-left"></i>
          </div>
          <div
            v-on:click="moveItem(data1, data2, 2)"
            :class="{ active: leftSelect > 0 }"
          >
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>

        <div class="box rightBox" style="border-left: 1px solid #999">
          <div class="title">
            <span
              :class="{ active: rightSelect === data2.length }"
              @click="selectAll(data2)"
              >已选字段</span
            >
            <!-- <span>{{ rightSelect ? rightSelect : 0 }}/{{ data2.length }}</span> -->
          </div>

          <!-- <div class="search_parent">
        <div class="search_div">
        <input
          class="search_input"
          v-model="targetData"
          :class="heightLight1 ? 'search_input_focus' : ''"
          @focus="heightLight1 = true"
          @blur="heightLight1 = false"
          type="text"
          placeholder="请输入课件级别/编号"
        />
        </div>
      </div> -->

          <div @drop="dropPub($event, 1)" @dragover.prevent class="right">
            <div class="nameZd">
              <div class="itemOne">字段名</div>
              <div class="itemTwo">连字符</div>
            </div>
            <div
              class="hover-color"
              @drag="ondrag"
              @dragstart="dragstart($event, item, 2)"
              @dragend="dragend"
              draggable="true"
              :class="{ active: item.isSelect }"
              v-on:click="hanldleClick(data2, item.id)"
              v-for="(item, index) in changeTargetData"
              :key="index"
            >
              <span style="display: inline-block; width: 46%; margin-top: 10px">
                {{ item.value }}
              </span>
              <el-select
                v-model="item.zifu"
                placeholder="连字符"
                style="width: 100px; margin-left: px"
              >
                <el-option label="_" value="_"> </el-option>
                <el-option label="-" value="-"> </el-option>
              </el-select>
              <el-input
                v-model="item.message"
                placeholder=""
                style="width: 100px; margin-left: 10px"
                v-if="item.value == '自定义文本'"
              ></el-input>
            </div>

            <div>
              <span style="display: inline-block; width: 46%; margin-top: 10px">
                流水号 <a-icon style="margin-left: 5px" type="question-circle"
              /></span>
              <el-select
                v-model="infos[0].weishu"
                placeholder="位数"
                style="width: 100px; margin-left: px"
              >
                <el-option label="4位" value="4位"> </el-option>
                <el-option label="5位" value="5位"> </el-option>
                <el-option label="6位" value="6位"> </el-option>
                <el-option label="7位" value="7位"> </el-option>
              </el-select>
              <el-select
                v-model="infos[0].liushui"
                placeholder="流水"
                style="width: 100px; margin-left: 10px"
              >
                <el-option label="小流水" value="小流水"> </el-option>
                <el-option label="大流水" value="大流水"> </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="botm">
        <div>
          如需手工输入资产编码 ,请<span
            @click="dialogVisible = true"
            style="color: #3296fa"
            >关闭</span
          >该功能
        </div>
        <div><el-button type="primary" @click="save">保存</el-button></div>
      </div>
    </div>

    <div class="lineS" v-else>
      <div class="line">
        <div style="height: 290px; line-height: 290px">
          当前仅支持手工输入"资产编码" ,如需自动生成 ,请点击开启
        </div>
      </div>
      <div class="botm" style="justify-content: end">
        <div>
          <el-button type="primary" @click="dialogVisible = true"
            >开启</el-button
          >
        </div>
      </div>
    </div>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span v-if="isShow">点击"关闭"则资产编码仅支持手工输入!</span>
      <span v-else>点击“开启”则资产编码将自动生成！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  props: {
    //   sourceLeft: {
    //     type: Array
    //   },
    // targetRight: {
    //   type: Array,
    // },
    // value: {
    //   type: Array,
    //   detault: [],
    // },
  },
  data() {
    return {
      heightLight: false,
      heightLight1: false,
      data1: [],
      data2: [],
      target: {
        x: "",
        y: "",
        id: "",
      },
      sourceData: "",
      targetData: "",
      changeSourceData: [],
      changeTargetData: [],
      sourceLeft: [],
      targetRight: [],
      value: [],
      dialogVisible: false,
      isShow: true,
      info: {
        input: "",
      },
      infos: [
        {
          liushui: "",
          weishu: "",
        },
      ],
      isWei: false,
    };
  },
  created() {},
  mounted() {
    this.getList();
    this.getListRight();
  },
  watch: {
    sourceLeft() {
      this.sourceLeft.forEach((item) => {
        this.data1.push({
          id: item.key,
          value: item.label,
          isSelect: false,
        });
      });
      this.changeSourceData = this.data1;
      this.changeTargetData = this.data2;
    },
    value() {
      // console.log(this.value)
      // 通过编辑按钮的接口拿到已经存在的课件id，然后遍历源数据，删除已经存在的课件
      if (this.value.length > 0) {
        this.value.forEach((item) => {
          this.data1.forEach((v, i) => {
            if (item == v.id) {
              this.data1.splice(i, 1);
            }
          });
        });
        // console.log(this.data1, 'changesourceData')
      }
    },
    targetRight() {
      let empty = [];
      if (this.targetRight.length > 0) {
        this.targetRight.forEach((item) => {
          empty.push({
            id: item.key,
            value: item.label,
            isSelect: false,
          });
        });
        this.data2 = empty;
        this.changeTargetData = empty;
      }
    },
    sourceData(val) {
      let emptyArr = [];
      if (val) {
        for (let i = 0; i < this.data1.length; i++) {
          if (this.data1[i].value.indexOf(val) != -1) {
            emptyArr.push(this.data1[i]);
          }
        }
        this.changeSourceData = emptyArr;
      } else {
        this.changeSourceData = this.data1;
      }
    },
    targetData(val) {
      let emptyArr = [];
      if (val) {
        for (let i = 0; i < this.data2.length; i++) {
          if (this.data2[i].value.indexOf(val) != -1) {
            emptyArr.push(this.data2[i]);
          }
        }
        this.changeTargetData = emptyArr;
      } else {
        this.changeTargetData = this.data2;
      }
    },
  },
  methods: {
    save() {
      let arr = [...this.changeTargetData, ...this.infos];
      this.$axios
        .post("/erp_check/assetencodingupdate", {
          corp_id: this.$store.state.cid,
          codingcontent: arr,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              message: res.data.msg,
              type: "",
              duration: 1500,
            });
          }
        })
        .catch(function (error) {});
    },
    handleClose() {
      this.dialogVisible = false;
    },
    close() {
      this.isShow = !this.isShow;
      this.dialogVisible = !this.dialogVisible;
      let type = "0";
      if (this.isShow) {
        type = "1";
      } else {
        type = "0";
      }
      this.$axios
        .post("/erp_check/assetencodingstart", {
          corp_id: this.$store.state.cid,
          status: type,
        })
        .then((res) => {
          if (res.data.code == 1) {
          }
        })
        .catch(function (error) {});
    },
    getList() {
      this.$axios
        .post("/erp_check/assetencodingfileds", {
          corp_id: this.$store.state.cid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            let arr = [];
            res.data.content.forEach((e, index) => {
              arr.push({
                key: index,
                value: e.name,
                isSelect: false,
                canshu: e.canshu,
                message: "",
                zifu: "",
              });
            });
            this.sourceLeft = arr;
            this.sourceLeft.forEach((item) => {
              this.data1.push({
                id: item.key,
                value: item.value,
                isSelect: false,
              });
            });
            this.changeSourceData = this.data1;
            this.changeTargetData = this.data2;
          }
        })
        .catch(function (error) {});
    },
    getListRight() {
      this.$axios
        .post("/erp_check/assetencodingcontent", {
          corp_id: this.$store.state.cid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            // console.log(res.data.content.option);
            //   this.changeTargetData = res.data.content.option;
            let arr = [];
            // res.data.content.option.forEach((e, index) => {
            //   this.data2.push({
            //     key: index,
            //     value: e.name,
            //     isSelect: false,
            //     canshu: e.canshu,
            //     message: '',
            //     zifu: '',
            //   });
            // });
            res.data.content.option.forEach((item) => {
              arr.push({
                id: item.id,
                value: item.value,
                isSelect: false,
                zifu: item.zifu || "",
              });
            });
            this.infos[0] = res.data.content.option.at(-1);
            this.data2 = arr;
            this.data2.pop();
            this.changeTargetData = this.data2;
          }
        })
        .catch(function (error) {});
    },
    ondrag(event) {
      this.target.y = event.y;
      this.target.x = event.x;
    },
    dropPub(event, type) {
      if (type == 1) {
        this.drop(event, this.data1, this.data2, type);
      } else {
        this.drop(event, this.data2, this.data1, type);
      }
    },
    drop(event, handle, target, type) {
      // 被拖拽数据中的id值
      let id = event.dataTransfer.getData("id");
      let arr = [];
      handle.forEach((item, index) => {
        if (item.id == id) {
          let temp = handle.splice(index, 1);
          temp[0].isSelect = false;
          target.push(temp[0]);
          arr.push(temp[0]);
        }
      });
      arr.forEach((eve, index) => {
        if (eve.value == undefined) {
          arr.splice(index, 1);
        }
      });
      //   console.log(arr);
      this.isChang();
      this.resort(event, target, type);
    },
    isChang() {
      if (this.isWei) {
        let list = [];
        this.changeTargetData.forEach((item, index) => {
          if (item.value == undefined) {
            this.changeTargetData.splice(index, 1);
          }
        });
        this.changeTargetData.forEach((item, index) => {
          item.ids = index;
          if (item.value.substring(0, 2) == "购置") {
            list.push(item);
          }
        });
        console.log(list);
        if (list.length > 1) {
          this.changeTargetData.splice(list[0].ids, 1);
          this.changeSourceData.push(list[0]);
        }
      }
    },
    resort(event, target, type) {
      let eles = event.currentTarget.children;
      let emptyArray = [];
      // type=1 从左往右拖拽 type=2 从右往左拖拽
      if (type == 1) {
        target.forEach((item, index) => {
          emptyArray.push(item.id);
        });
        this.changeTargetData.forEach((e, index) => {
          if (e.value == undefined) {
            //  console.log('空的下标为'+index)
            this.changeTargetData.splice(index, 1);
          }
        });
        // v-model 可以监听这个input事件的触发
        // this.$emit('input', emptyArray);
      }
      if (type == 2) {
        let tempId = event.dataTransfer.getData("id");
        this.changeTargetData.forEach((item) => {
          if (item.id != tempId) {
            emptyArray.push(item.id);
          }
        });
        // console.log(this.changeTargetData)
        // v-model 可以监听这个input事件的触发
        // this.$emit('input', emptyArray);
      }
      // 两个框拖拽数据
      for (let i = 0; i < target.length; i++) {
        if (target[i].id == this.target.id) {
          target[i].y = this.target.y;
        } else {
          // 获取元素在页面上位置，纵坐标
          target[i].y = eles[i].getBoundingClientRect().y;
        }
      }
      // 单个框中换位置
      for (let i = 0; i < target.length - 1; i++) {
        for (let j = 0; j < target.length - i - 1; j++) {
          if (target[j].y > target[j + 1].y) {
            let swap = target[j];
            target[j] = target[j + 1];
            target[j + 1] = swap;
          }
        }
      }
      // vue强制更新视图
      this.$forceUpdate();
    },
    dragstart(event, item, type) {
      this.target.id = item.id;
      event.dataTransfer.setData("id", item.id);
      if (type == 1) {
        this.isWei = true;
      } else {
        this.isWei = false;
      }
    },
    dragend(event) {
      event.dataTransfer.clearData();
    },
    hanldleClick(data, id) {
      data.forEach((element) => {
        if (element.id == id) {
          element.isSelect = !element.isSelect;
        }
      });
    },
    moveItem(handle, target, direction) {
      let temp = handle.filter((item) => {
        return item.isSelect == true;
      });
      if (temp.length <= 0) return false;
      temp.forEach((item) => {
        let index = handle.indexOf(item);
        handle.splice(index, 1);
        item.isSelect = false;
        target.push(item);
      });
      if (direction === 1) {
        let hEmArr = [];
        handle.forEach((item) => {
          hEmArr.push(item.id);
        });
        this.$emit("rightToLeft", hEmArr);
      } else {
        let tEmArr = [];
        target.forEach((item) => {
          tEmArr.push(item.id);
        });
        this.$emit("leftToRight", tEmArr);
      }
    },
    selectAll(data) {
      let isSelectAll = data.every((item) => {
        return item.isSelect == true;
      });
      data.forEach((item) => {
        if (isSelectAll) {
          item.isSelect = false;
        } else {
          item.isSelect = true;
        }
      });
    },
  },
  computed: {
    leftSelect() {
      if (this.data1.length === 0) return false;
      let arr = this.data1.filter((item) => {
        return item.isSelect == true;
      });
      return arr.length;
    },
    rightSelect() {
      if (this.data2.length == 0) return false;
      let arr = this.data2.filter((item) => {
        return item.isSelect == true;
      });
      return arr.length;
    },
  },
};
</script>
<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
#box {
}
.line {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #999;
  //   margin: 50px auto;
}
.lineS {
  border: 1px solid #999;
  margin: 50px 0 0 69px;
  width: 780px;
}
.botm {
  display: flex;
  background-color: #f4f5f9;
  padding: 5px 30px;
  justify-content: space-between;
  align-items: center;
}
.nameZd {
  display: flex;
  width: 100%;
  .itemOne {
    width: 50%;
  }
}
.box {
  border: 1px solid rgb(235, 238, 245);
}
.rightBox {
  width: 450px;
  .title {
    width: 100% !important;
  }
  .right {
    width: 100% !important;
  }
}
.box .title {
  font-size: 14px;
  box-sizing: border-box;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  width: 245px;
  height: 40px;
  line-height: 40px;
  background: #f5f7fa;
  border-bottom: 1px solid #999;
}
.box .title span:first-child {
  display: inline-block;
  background: #f5f7fa;
  /* background-image: url(../../assets/images/erwe.jpg); */
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 20px 20px;
  padding-left: 35px;
  cursor: pointer;
}
.box .title span:first-child.active {
  /* background-image: url(../../assets/images/erwe.jpg); */
}
.left,
.right {
  width: 245px;
  height: 250px;
  padding: 5px 0;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
}
.left > div,
.right > div {
  cursor: pointer;
  text-align: left;
  /* background-image: url(../../assets/images/erwe.jpg); */
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 20px 20px;
  font-size: 14px;
  padding-left: 35px;
  line-height: 30px;
}
.left > div.active,
.right > div.active {
  /* background-image: url(../../assets/images/erwe.jpg); */
}
.left > div.hover-color:hover,
.right > div.hover-color:hover {
  color: rgb(64, 158, 255);
}
.middle {
  margin: 0 20px;
}
.middle > div {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #dcdfe6;
  font-size: 12px;
  background-color: #f5f7fa;
  color: #c0c4cc;
}
.middle > div.active {
  background-color: #409eff;
  border-color: #409eff;
  color: #ffffff;
}
.search_parent {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
/* .search_div {
    border: 1px solid #dddddd;
    border-radius: 20px;
    width: 150px;
    height: 30px;
    padding-left: 10px;
  } */
.search_input {
  width: 220px;
  height: 40px;
  border-radius: 50px;
  border: 1px solid #ccc;
  outline: none;
  padding: 10px 0px 10px 10px;
  font-size: 14px;
  text-align: center;
}
.search_input_focus {
  border: 1px solid #409eff;
}
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgb(192, 196, 204);
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgb(192, 196, 204);
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgb(192, 196, 204);
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgb(192, 196, 204);
}
</style>
