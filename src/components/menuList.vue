<template>
  <div>
    <el-menu
      :unique-opened="true"
      :router="true"
      background-color="#3296fa"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="routhPath"
      :collapse-transition="true"
      :default-openeds="openPath"
      v-if="menuList.length > 0"
    >
      <div v-for="(item, lindex) in menuList" :key="lindex">
        <el-submenu
          v-if="item.children && item.children.length > 0"
          :index="item.url"
        >
          <template slot="title"
            ><i :class="item.icon"></i
            ><span class="menuFirstName">{{ item.name }}</span></template
          >
          <div v-for="(list, cindex) in item.children" :key="cindex">
            <el-submenu v-if="list.children.length > 0" :index="list.url">
              <template slot="title">{{ list.name }}</template>
              <div v-for="(blist, cbindex) in list.children" :key="cbindex">
                <div v-if="blist.children.length > 0">
                  <el-submenu :index="blist.url">
                    <template slot="title">{{ blist.name }}</template>
                    <el-menu-item
                      v-for="(bclist, chindex) in blist.children"
                      :index="bclist.url"
                      :key="chindex"
                    >
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="bclist.name"
                        placement="right"
                      >
                        <span>{{ bclist.name }}</span>
                      </el-tooltip>
                    </el-menu-item>
                  </el-submenu>
                </div>
                <div v-if="blist.children.length <= 0">
                  <el-menu-item :index="blist.url">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="blist.name"
                      placement="right"
                    >
                      <span>{{ blist.name }}</span>
                    </el-tooltip>
                  </el-menu-item>
                </div>
              </div>
            </el-submenu>
            <el-menu-item-group v-if="list.children.length <= 0">
              <el-menu-item :index="list.url">{{ list.name }}</el-menu-item>
            </el-menu-item-group>
          </div>
        </el-submenu>
        <el-menu-item
          v-if="!item.children || item.children.length <= 0"
          :index="item.url"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "menuList",
  props: {
    viewMenu: Number,
  },
  data() {
    return {
      openPath: ["/project/shangwu", "/project/shengchan", "/project/xiancgl"],
      menuList: [],
      menuType: 9,
    };
  },
  methods: {
    getList() {
      this.$axios
        .post("/erp_check/roles", {
          type: this.menuType,
          corp_id: this.$store.state.cid,
          userid: this.$store.state.userInfo.uid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.menuList = res.data.data;
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
  },
  mounted() {
    this.menuType = this.viewMenu;
    this.getList();
  },
  created() {},
  computed: {
    routhPath() {
      if (
        this.$route.path == "/appIndex8/appIndex" ||
        this.$route.path == "/appIndex8/appIndex2" ||
        this.$route.path == "/appIndex8/appIndexWarn" ||
        this.$route.path == "/appIndex8/appIndexMsg"
      ) {
        return "/appIndex8/appIndex";
      } else if (
        this.$route.path == "/appIndex8/appIndexProject" ||
        this.$route.path == "/appIndex8/appPanel"
      ) {
        return "/appIndex8/appIndexProject";
      } else if (
        this.$route.path == "/appIndex8/appIndexProjectnew" ||
        this.$route.path == "/appIndex8/appPanelnew"
      ) {
        return "/appIndex8/appIndexProjectnew";
      } else if (
        this.$route.path == "/projetcout/workRecordInfo" ||
        this.$route.path == "/projetcout/workRecordTotal"
      ) {
        return "/production/workRecord";
      } else {
        return this.$route.path;
      }
    },
  },
};
</script>

<style></style>
