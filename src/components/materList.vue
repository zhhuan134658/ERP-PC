<template>
  <div
    id="commonMateRial"
    style="background-color: #fff; padding: 20px 0; width: 100%"
  >
    <div style="margin: 10px 0">
      仓库:
      <el-select v-model="ckName" placeholder="请选择使用项目">
        <el-option
          v-for="(item, index) in allCKlist"
          :key="index"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
    </div>
    <div style="margin: 10px 0">
      <el-button size="medium" type="primary" @click="openDialog"
        >选择物料</el-button
      >
      <el-button size="medium" type="primary" @click="moveData"
        >移除物料</el-button
      >
    </div>

    <el-dialog
      title="选择资产"
      :modal="false"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="1020px"
      class="phDialog"
    >
      <div class="phdMain" style="padding: 0 15px"></div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="sureCheck">确定</el-button>
        <el-button size="medium" @click="dialogFormVisible = false"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
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
      ckName: "",
      currentPage: 1,
      total: "",
      pagesize: "10",
      allCKlist: "",
      dialogFormVisible: false,
    };
  },
  methods: {
    openDialog() {
      console.log("456");
      this.dialogFormVisible = true;
    },
    //获取列表
    getList() {
      this.dialogList = [];
      this.$axios
        .post("/erp_check/assetlists", this.searchFormData)
        .then((res) => {
          if (res.data.code == 1) {
            this.total = res.data.content.total;
            this.allList = res.data.content.list;
            if (this.checkedList.length == 0) {
              this.allList.map((item) => {
                item.checked_z = 0;
              });
              this.changeChecked([], 0);
            }

            console.log("allList", this.allList);
            if (this.total > 0 && this.allList.length < 1) {
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
    tableRowClassName({ row, rowIndex }) {
      if (row && rowIndex % 2 == 1) {
        return "statistics-warning-row";
      } else {
        return "";
      }
    },
    tableHeaderClass() {
      return "font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px";
    },
    tableRowClass() {
      return "color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;";
    },
    handleSelectionChange(val) {
      this.checkSelect = val;
    },
    moveData() {
      this.changeChecked(this.checkSelect, 0);
    },

    //多选数据
    dialogSelectionChange(val) {
      //   this.multSelectData = val.map((item) => {
      //     if (!item.id) return "";
      //     return item.id;
      //   });
      this.multSelectData = val;
    },
    sureCheck() {
      this.changeChecked(this.multSelectData, 1);

      this.dialogFormVisible = false;
    },
    // 选中后checked_z变为1
    changeChecked(checkedList, val) {
      this.dialogList = [];
      this.checkedList = [];
      //选择后的id
      let IDS = checkedList.map((item) => {
        if (!item.id) return "";
        return item.id;
      });

      this.allList.forEach((item) => {
        if (IDS.includes(item.id)) {
          item.checked_z = val;
        }
      });

      this.allList.forEach((item) => {
        if (item.checked_z == 0) {
          //   this.$utils.idunique(this.dialogList.push(item));
          this.dialogList.push(item);
        } else {
          this.checkedList.push(item);
          //   this.$utils.idunique(this.checkedList.push(item));
        }
      });
    },
  },
  created() {
    this.getList();

    this.$utils.commontouallCk().then((res) => {
      this.allCKlist = res;
      console.log("9999", res); //res为公共接口返回的数据;返回的数据为utils.js中return的数据
    });
  },
  mounted() {},
  watch: {},
};
</script>
