<template>
  <div id="commonMateRial">
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
              :label="element.name"
              border
            >
              <span> {{ element.name }}</span>
            </el-checkbox>
          </transition-group>
        </draggable>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="wCancel">取 消</el-button>
        <el-button size="medium" type="primary" @click="wInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: { draggable },
  props: {
    wFormVisible: Boolean,
    showName: String,
    getList: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      titleList: [],
      myArray: [],
      checkedLists: [],
    };
  },
  methods: {
    getTitleList() {
        
      this.$axios
        .post("/erp_check/listcontents", {
          name: this.showName,
          corp_id: this.$store.state.cid,
          userid: this.$store.state.userInfo.uid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.myArray = res.data.content;
            this.titleList = [];
            this.checkedLists = [];
            this.myArray.forEach((element) => {
              if (element.status) {
                this.titleList.push(element);
                this.checkedLists.push(element.name);
              }
            });
            this.$emit("changeName", this.titleList);
            // this.$parent.getList();
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
        .post("/erp_check/updatelistcontents", {
          name: this.showName,
          corp_id: this.$store.state.cid,
          userid: this.$store.state.userInfo.uid,
          content: this.myArray,
        })
        .then((res) => {
          if (res.data.code !== 1) {
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
    getMult(val) {
      this.multSelectData = val;
    },
    handleCheckedListChange(value) {
      this.myArray.forEach((element) => {
        if (value.includes(element.name)) {
          element.status = true;
        } else {
          element.status = false;
        }
      });
    },
    wCancel() {
      //   this.wFormVisible = false;
      this.$emit("changeShow", false);
      let Ids = this.titleList.map((item) => item.value);
      this.myArray.forEach((item) => {
        if (!Ids.includes(item.value)) {
          item.status = false;
        } else {
          item.status = true;
        }
      });
    },
    wInfo() {
      let newT = [];
      this.myArray.forEach((element) => {
        if (element.status) {
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
          this.$emit("changeName", this.titleList);
          //   this.wFormVisible = false;
          this.$emit("changeShow", false);
        });
      } else {
        this.$message({
          type: "warning",
          message: "不能为空！",
          duration: 1500,
        });
      }
    },
  },
  created() {
    this.getTitleList();
  },
  mounted() {},
  watch: {},
};
</script>
