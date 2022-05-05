<template>
  <div class="header">
    <div class="headerContent">
      <el-form
        @submit.native.prevent
        :inline="true"
        :model="formInline"
        ref="formInline"
        label-width="120px"
        class="demo-form-inline"
      >
        <div class="hlBottom">
          <el-form-item
            v-for="(item, index) in formcommonList"
            :label="item.labelName"
            :prop="item.labelData"
            :key="index"
          >
            <el-select
              v-if="item.labelName === '项目名称'"
              v-model="formInline[item.labelData]"
              clearable
              filterable
              placeholder="请选择项目"
              @keyup.enter.native="zsearchClick"
            >
              <el-option
                v-for="(item, index) in allProjectList"
                :key="index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
            <el-select
              v-else-if="item.labelName === '投标项目名称'"
              v-model="formInline[item.labelData]"
              clearable
              filterable
              placeholder="请选择项目"
              @keyup.enter.native="zsearchClick"
            >
              <el-option
                v-for="(item, index) in touProject1"
                :key="index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
            <el-select
              v-else-if="item.labelName === '付款状态'"
              v-model="formInline[item.labelData]"
              clearable
              filterable
              placeholder="请选择付款状态"
              @keyup.enter.native="zsearchClick"
            >
              <el-option label="待付款" value="1"></el-option>
              <el-option label="已付款" value="2"></el-option>
            </el-select>
            <el-date-picker
              v-else-if="item.labelName === '开始时间'"
              :picker-options="pickerStart"
              v-model="formInline[item.labelData]"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>

            <el-date-picker
              v-else-if="item.labelName === '结束时间'"
              v-model="formInline[item.labelData]"
              :picker-options="pickerEnd"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>

            <el-select
              v-else-if="item.labelName === '审批状态'"
              v-model="formInline[item.labelData]"
              clearable
              filterable
              placeholder="请选择审批状态"
              @keyup.enter.native="zsearchClick"
            >
              <el-option
                v-for="(item, index) in approvalStatus"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>

            <el-select
              v-else-if="item.labelName === '账户名称'"
              v-model="formInline[item.labelData]"
              clearable
              filterable
              placeholder="请选择"
              @keyup.enter.native="zsearchClick"
            >
              <el-option
                v-for="(item, index) in accountList"
                :key="index"
                :label="item.accountname"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-else-if="item.labelName === '物资类型'"
              v-model="formInline[item.labelData]"
              clearable
              filterable
              placeholder="请选择物资"
              @keyup.enter.native="zsearchClick"
            >
              <el-option
                v-for="(item, index) in allmaterial_name"
                :key="index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
            <!-- //空格为识别特殊项 不删除 -->
            <el-select
              v-else-if="item.labelName === ' 项目类型'"
              v-model="formInline[item.labelData]"
              clearable
              filterable
              placeholder="请选择"
              @keyup.enter.native="zsearchClick"
            >
              <el-option
                v-for="(item, index) in touProjectType"
                :key="index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
            <el-input
              v-else
              v-model="formInline[item.labelData]"
              clearable
              placeholder="请输入"
              @keyup.enter.native="zsearchClick"
            ></el-input>
          </el-form-item>
          <div style="text-align: center">
            <el-button
              type="primary"
              size="medium"
              @click="zsearchClick('formInline')"
              style="margin-right: 10px"
              >搜索</el-button
            >
            <el-button plain size="medium" @click="resetClick('formInline')"
              >重置</el-button
            >
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "commonSearch",
  props: {
    formcommonList: Array,
    formInline: Object,
    searchClick: {
      type: Function,
      default: null,
    },
    getList: {
      type: Function,
      default: null,
    },
  },

  data: (props) => {
    return {
      touProject1: [],
      touProjectType: [],
      allProjectList: [],
      approvalStatus: [],
      allmaterial_name: [],
      accountList: [],
      printable: props.hasPrint,
    };
  },
  methods: {
    //   搜索
    zsearchClick() {
      console.log("search click");
      this.$emit("searchClick");
    },
    // 重置
    resetClick(formName) {
      console.log(formName);
      this.$refs[formName].resetFields();
      this.$nextTick(() => {
        this.$emit("getList");
      });
    },
  },
  mounted() {
    this.$utils.commonAllPro().then((res) => {
      this.allProjectList = res;
      console.log("9999", res); //res为公共接口返回的数据;返回的数据为utils.js中return的数据
    });
    this.$utils.commonAllaccount().then((res) => {
      this.accountList = res;
      console.log("9999", res); //res为公共接口返回的数据;返回的数据为utils.js中return的数据
    });
    this.$utils.getmaterialList().then((res) => {
      console.log(res);
      this.allmaterial_name = res;
    });
    this.$utils.commonAlltouProjectType().then((res) => {
      console.log(res);
      this.touProjectType = res;
    });
    this.$utils.commontouProjectType().then((res) => {
      console.log(res);
      this.touProject1 = res;
    });

    this.approvalStatus = this.$utils.utilApprovalStatus();
  },
  computed: {
    pickerStart() {
      return {
        disabledDate: (time) => {
          let endDateVal = this.formInline.endTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      };
    },
    pickerEnd() {
      return {
        disabledDate: (time) => {
          let beginDateVal = this.formInline.startTime;
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal).getTime() - 8.64e7;
          }
        },
      };
    },
  },
};
</script>

<style lang="less"></style>
