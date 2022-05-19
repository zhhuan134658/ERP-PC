<template>
  <div id="commonMateRial" style="background-color: #fff; padding: 20px 0">
    <div style="margin: 10px 0">
      <el-button size="medium" type="primary" @click="openDialog"
        >选择资产</el-button
      >
      <el-button size="medium" type="primary" @click="moveData"
        >移除资产</el-button
      >
    </div>
    <el-table
      :border="true"
      v-loading="tableloading"
      :data="checkedList"
      :header-cell-style="tableHeaderClass"
      :cell-style="tableRowClass"
      ref="table"
      max-height="650"
      min-height="200"
      style="width: 100%; border: 1px solid #ebeef5"
      @selection-change="handleSelectionChange"
      size="mini"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55" fixed> </el-table-column>
      <el-table-column prop="sitenumber" label="序号" align="left">
      </el-table-column>
      <el-table-column prop="name" label="照片" align="left"> </el-table-column>
      <el-table-column prop="zznumber" label="资产编码" align="left">
      </el-table-column>
      <el-table-column prop="name" label="资产名称" align="left">
      </el-table-column>
      <el-table-column prop="name" label="残值" align="left"> </el-table-column>
      <el-table-column prop="usestatus" label="使用状况" align="left">
      </el-table-column>
      <el-table-column prop="type" label="资产分类" align="left">
      </el-table-column>
      <el-table-column prop="brand" label="品牌" align="left">
      </el-table-column>
      <el-table-column prop="model" label="型号" align="left">
      </el-table-column>
      <el-table-column prop="shsn" label="设备序列号" width="120" align="left">
      </el-table-column>
      <el-table-column
        prop="chengzuorg"
        label="当前所属/承租公司"
        width="150"
        align="left"
      >
      </el-table-column>
      <el-table-column
        prop="address"
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

      <el-table-column
        type="index"
        width="55"
        prop="zznumber"
        label="资产编码"
      />
    </el-table>

    <el-dialog
      title="选择资产"
      :modal="false"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="1020px"
      class="phDialog"
    >
      <div class="phdMain" style="padding: 0 15px">
        <el-table
          :border="true"
          :data="dialogList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          max-height="547"
          style="width: 100%; border: 1px solid #ebeef5; margin-top: 10px"
          ref="multipleTable"
          size="mini"
          :row-class-name="tableRowClassName"
          @selection-change="dialogSelectionChange"
        >
          <el-table-column type="selection" width="55" fixed> </el-table-column>
          <el-table-column prop="sitenumber" label="序号" align="left">
          </el-table-column>
          <el-table-column prop="name" label="照片" align="left">
          </el-table-column>
          <el-table-column prop="zznumber" label="资产编码" align="left">
          </el-table-column>
          <el-table-column prop="name" label="资产名称" align="left">
          </el-table-column>
          <el-table-column prop="name" label="残值" align="left">
          </el-table-column>
          <el-table-column prop="usestatus" label="使用状况" align="left">
          </el-table-column>
          <el-table-column prop="type" label="资产分类" align="left">
          </el-table-column>
          <el-table-column prop="brand" label="品牌" align="left">
          </el-table-column>
          <el-table-column prop="model" label="型号" align="left">
          </el-table-column>
          <el-table-column
            prop="shsn"
            label="设备序列号"
            width="120"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="chengzuorg"
            label="当前所属/承租公司"
            width="150"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="address"
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
      checkSelect: [],
      tableloading: false,
      multSelectData: [],
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
      dialogFormVisible: false,
      checkedList: [],
      dialogList: [],
      allList: [],
      currentPage: 1,
      total: 0,
      pagesize: 10,
    };
  },
  methods: {
    openDialog() {
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
  },
  mounted() {},
  watch: {},
};
</script>
