import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("../pages/home.vue")
  }, //-----------首页
  {
    path: "/error",
    name: "error",
    component: () => import("../pages/error.vue")
  },
  {
    path: "/errorOut",
    name: "errorOut",
    component: () => import("../pages/errorOut.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../pages/home.vue"),
    redirect: "/home/index",
    children: [
      {
        path: "/system",
        name: "system",
        component: () => import("../pages/system/system.vue"),
        children: [
          {
            path: "/system/systemRole", //用户权限管理
            name: "systemRole",
            component: () => import("../pages/system/systemRole.vue")
          },
          // 初始化
          {
            path: "/system/initializeApp",
            name: "initializeApp",
            component: () => import("@/pages/system/initializeApp")
          }
        ]
      },
      {
        path: "/spreadsheet",
        name: "spreadSheet",
        component: () => import("../pages/spreadsheet/index.vue"),
        redirect: "/spreadsheet/projectOverview",
        children: [
          {
            path: "/spreadsheet/projectOverview", //项目一览
            name: "projectOverview",
            component: () => import("../pages/spreadsheet/projectOverview.vue")
          },
          {
            path: "/spreadsheet/storageOverview", //库存一览
            name: "storageOverview",
            component: () => import("../pages/spreadsheet/storageOverview.vue")
          },
          {
            path: "/spreadsheet/orderView/:type", //订单中心
            name: "orderView",
            component: () => import("../pages/spreadsheet/orderView.vue"),
            props: true
          },
          {
            path: "/spreadsheet/goodsObvious", //库存商品sn明细表
            name: "goodsObvious",
            component: () => import("../pages/spreadsheet/goodsObvious.vue"),
            props: true
          }
        ]
      },

      {
        path: "/finance",
        name: "finance",
        component: () => import("../pages/finance/finance.vue"),
        redirect: "/finance/hardwarePurchase",
        children: [
          {
            path: "/finance/hardwarePurchase", //硬件采购列表页面
            name: "hardwarePurchase",
            component: () =>
              import("../pages/finance/hardwarePurchase/index.vue")
          },
          {
            path: "/finance/hardwareRent", //硬件出借列表页面
            name: "hardwareRent",
            component: () => import("../pages/finance/hardwareRent/index.vue")
          },
          {
            path: "/finance/materialIn", //材料入库列表页面
            name: "materialIn",
            component: () => import("../pages/finance/materialIn/index.vue")
          },
          {
            path: "/finance/income", //收入列表页面
            name: "income",
            component: () => import("../pages/finance/income/index.vue")
          },
          {
            path: "/finance/installReimburse", //安装报销列表页面
            name: "installReimburse",
            component: () =>
              import("../pages/finance/installReimburse/index.vue")
          },
          {
            path: "/finance/invoiceApplication", //开票申请列表页面
            name: "invoiceApplication",
            component: () =>
              import("../pages/finance/invoiceApplication/index.vue")
          },
          {
            path: "/finance/materialOut", //材料出库列表页面
            name: "materialOut",
            component: () => import("../pages/finance/materialOut/index.vue")
          },
          {
            path: "/finance/reimbursement", //报销列表页面
            name: "reimbursement",
            component: () => import("../pages/finance/reimbursement/index.vue")
          },
          {
            path: "/finance/returnFavor", //返佣列表页面
            name: "returnFavor",
            component: () => import("../pages/finance/returnFavor/index.vue")
          },
          {
            path: "/finance/softwarePurchase", //软件采购列表页面
            name: "softwarePurchase",
            component: () =>
              import("../pages/finance/softwarePurchase/index.vue")
          },
          {
            path: "/finance/bizAssociate", //软件采购列表页面
            name: "bizAssociate",
            component: () => import("../pages/finance/bizAssociate/index.vue")
          },
          {
            path: "/finance/accountInformation", //账户信息页面
            name: "accountInformation",
            component: () =>
              import("../pages/finance/accountInformation/index.vue")
          },
          {
            path: "/finance/productionKey", //河南生产秘钥页面
            name: "productionKey",
            component: () => import("../pages/finance/productionKey/index.vue")
          },
          {
            path: "/finance/brushMachine", //代刷机页面
            name: "brushMachine",
            component: () => import("../pages/finance/brushMachine/index.vue")
          }
        ]
      },
      {
        path: "/project",
        name: "project",
        component: () => import("../pages/project/index.vue"),
        redirect: "/project/projects",
        children: [
          {
            path: "/project/projects", //立项信息列表页面
            name: "projects",
            component: () => import("../pages/project/projects/index.vue")
          },
          {
            path: "/project/material", //材料基础库列表页面
            name: "material",
            component: () => import("../pages/project/material/index.vue")
          },
          {
            path: "/project/supplier", //供应商信息库列表页面
            name: "supplier",
            component: () => import("../pages/project/supplier/index.vue")
          }
        ]
      },
      {
        path: "/home/index",
        name: "index",
        component: () => import("../pages/index.vue"),
        redirect: "/home/index/AppIndex",
        children: [
          {
            path: "/home/index/AppIndex", //首页-我的工作
            name: "appIndex",
            component: () => import("../pages/appIndex.vue")
          },
          {
            path: "/home/index/orderDelay", //订单延期
            name: "orderDelayApply",
            component: () =>
              import("../pages/finance/orderDelayApply/index.vue")
          },
          {
            path: "/home/index/orderAlert", //订单预警
            name: "orderAlert",
            component: () => import("../pages/project/orderAlert/index.vue")
          }
        ]
      }
    ]
  }
];
const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path === "/error" || to.path === "/errorOut") {
    next();
  } else {
    let token = sessionStorage.getItem("errcode");
    if (token == 2 || token == 0) {
      next("/error");
    } else if (token == 3) {
      next("/errorOut");
    } else {
      next();
    }
  }
});
export default router;
