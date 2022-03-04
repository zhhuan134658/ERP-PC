<template>
  <!-- 穿透 -->
  <div id="pierceTable">
    <div class="title">
      <div>{{ proName }}</div>
      <div>{{ totalMoney }}</div>
    </div>
    <a-tabs
      default-active-key="1"
      tab-position="top"
      @prevClick="callback"
      @nextClick="callback"
    >
      <a-tab-pane
        v-for="(item, index) in tableList"
        :key="index"
        :tab="item.title"
      >
        <a-table
          :locale="{ emptyText: '暂无数据' }"
          :customRow="handleClick"
          :columns="item.mould_data"
          :data-source="item.data"
          :pagination="{ pageSize: 5 }"
        />
      </a-tab-pane>
    </a-tabs>

    <!-- <el-card
            style="margin-top: 30px"
            class="box-card"
            v-for="(item, index) in tableList"
        >
            <div slot="header" class="clearfix">
                <span>{{ item.title }}</span>
            </div>
            <a-table
                :customRow="handleClick"
                :columns="item.mould_data"
                :data-source="item.data"
                :pagination="{ pageSize: 5 }"
            />
        </el-card> -->
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
export default {
  props: {
    tableList: Array,
    proName: String,
    totalMoney: String,
    taPLoading: Boolean //表格加载
  },
  data() {
    return {
      data,
      columns,
      pageSize: 10,
      totalSize: null,
      current_page: 1,
      tableData: [] //el-table  绑定的数据
    };
  },
  methods: {
    callback(val) {
      console.log(val);
    },
    handleClick(record, index) {
      return {
        on: {
          click: () => {
            console.log(record, index);
            this.checkList(record);
          }
        }
      };
    },
    //查看审批
    checkList(row) {
      let newUrl = "";
      if (row.filename) {
        newUrl = row.filename;
      } else {
        newUrl = row.url;
      }
      dd.ready(function() {
        dd.biz.util.openSlidePanel({
          url: newUrl, //打开侧边栏的url
          title: "详情", //侧边栏顶部标题
          onSuccess: function(result) {},
          onFail: function() {}
        });
      });
    }
  },
  beforeUpdate() {},
  created() {}
};
</script>

<style lang="less">
#pierceTable {
  .title {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    color: #000;
    font-size: 17px;
  }
}
</style>
