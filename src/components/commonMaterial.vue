<template>
  <div id="commonMateRial">
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
      <!-- <el-button size="medium" type="primary" @click="moveData"
        >移除物料</el-button
      > -->
    </div>
    <el-table
      :border="true"
      :data="chemList"
      :header-cell-style="tableHeaderClass"
      :cell-style="tableRowClass"
      border
      style="width: 100%"
    >
      <el-table-column prop="number" label="物品编码" align="left">
      </el-table-column>
      <el-table-column prop="name" label="物资名称" align="left">
      </el-table-column>
      <el-table-column prop="type_name" label="物品类型" align="left">
      </el-table-column>
      <el-table-column
        prop="unit"
        label="单位"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="tax_price" label="含税售价（元）" align="left">
      </el-table-column>
      <el-table-column prop="size" label="规格型号" align="left">
      </el-table-column>
      <el-table-column prop="color" label="颜色" align="left">
      </el-table-column>
      <el-table-column
        prop="brand"
        label="品牌"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="showSub(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="选择"
      :modal="false"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="1020px"
      class="phDialog"
    >
      <div class="phdMain" style="padding: 0 15px">
        <div style="margin-bottom: 30px">
          <div style="display: flex">
            <el-input
              placeholder="请输入名称"
              v-model="conSearch"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchCon"
              ></el-button>
            </el-input>
          </div>
        </div>
        <div class="basicCreate">
          <div class="bcLeft">
            <el-tree
              :data="AbasicList"
              :props="defaultProps"
              :default-expand-all="true"
              :highlight-current="true"
              :expand-on-click-node="false"
              @node-click="handleClickList"
            ></el-tree>
          </div>
          <div class="bcRight">
            <el-table
              :border="true"
              :data="houseList"
              :header-cell-style="tableHeaderClass"
              :cell-style="tableRowClass"
              border
              height="547"
              style="width: 100%"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="number" label="物品编码" align="left">
              </el-table-column>
              <el-table-column prop="name" label="物资名称" align="left">
              </el-table-column>
              <el-table-column prop="type_name" label="物品类型" align="left">
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="tax_price"
                label="含税售价（元）"
                align="left"
              >
              </el-table-column>
              <el-table-column prop="size" label="规格型号" align="left">
              </el-table-column>
              <el-table-column prop="color" label="颜色" align="left">
              </el-table-column>
              <el-table-column
                prop="brand"
                label="品牌"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pagesize"
              :page-sizes="[10, 50, 100]"
              layout="sizes,prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
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
  props: {
    isClose: Number,
  },
  data() {
    return {
      chemList: [],
      dialogFormVisible: false,
      ckName: "",
      allCKlist: [],
      AbasicList: [],
      currentPage: 1,
      total: 0,
      pagesize: 10,
      defaultProps: {
        children: "children",
        label: "name",
      },
      houseList: [],
      conSearch: "",
      listNodeID: "0",

      multipleSelection: [],
    };
  },
  methods: {
    showSub(val) {
      this.chemList.forEach((item, index) => {
        if (val.id === item.id) {
          console.log("888");
          this.chemList.splice(index, 1);
        }
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },

    sureCheck() {
      this.dialogFormVisible = false;
    },
    openDialog() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection();
      });
    },
    moveData() {
      let IDS = this.multipleSelection.map((item) => {
        if (!item.id) return "";
        return item.id;
      });
      let newarr = this.chemList;

      newarr.forEach((item, index) => {
        if (!IDS.includes(item.id)) {
          console.log("888");
          this.chemList.splice(index, 1);
        }
      });
    },
    handleSelectionChange(val) {
      console.log(val);

      this.chemList = this.$utils.idunique(this.chemList.concat(val));
    },
    getBasicList() {
      this.$axios
        .post("/project/materialTypeList", {
          name: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.AbasicList = [
              {
                id: "0",
                pid: "0",
                name: "物资类型",
                children: res.data.data,
              },
            ];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleClickList(data) {
      this.listNodeID = data.id;
      this.currentPage = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    searchCon() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.$axios
        .post("/project/materialGoodsList", {
          name: this.conSearch,
          page: this.currentPage,
          type: this.listNodeID,
          number: this.pagesize,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.houseList = res.data.data;
            if (this.total > 0 && this.houseList.length < 1) {
              this.currentPage = res.data.page_number;
              this.getList();
            }
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
  },
  created() {
    this.getList();
    this.getBasicList();

    this.$utils.commontouallCk().then((res) => {
      this.allCKlist = res;
      console.log("9999", res); //res为公共接口返回的数据;返回的数据为utils.js中return的数据
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.multipleTable.clearSelection();
    });
  },
  watch: {
    isClose: {
      handler(newVal) {
        this.$nextTick(() => {
          this.$refs.multipleTable.clearSelection();
        });
      },
      immediate: true,
    },
  },
};
</script>
