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
    redirect: "/appIndex8/appIndex",
    children: [
      //   {
      //     path: "/system",
      //     name: "system",
      //     component: () => import("../pages/system/system.vue"),
      //     children: [
      //       {
      //         path: "/system/systemRole", //用户权限管理
      //         name: "systemRole",
      //         component: () => import("../pages/system/systemRole.vue")
      //       },
      //       // 初始化
      //       {
      //         path: "/system/initializeApp",
      //         name: "initializeApp",
      //         component: () => import("@/pages/system/initializeApp")
      //       }
      //     ]
      //   },

      {
        path: "/appIndex8",
        name: "appIndex8",
        component: () => import("../pages/homepage/index.vue"),
        redirect: "/appIndex8/appIndex",
        children: [
          {
            path: "/appIndex8/appIndex", //首页-我的工作
            name: "appIndex",
            component: () => import("../pages/homepage/mywork/index.vue")
          },
          {
            path: "/appIndex8/appIndexProject", //资产看板
            name: "appIndexProject",
            component: () => import("../pages/homepage/assetinfo/index.vue")
          },
          {
            path: "/appIndex8/projectApprovalList", //项目立项
            name: "projectApprovalList",
            component: () => import("../pages/homepage/initiation/index.vue")
          }
        ]
      },
      //   库管
      {
        path: "/librarytube",
        name: "librarytube",
        component: () => import("../pages/librarytube/index.vue"),
        redirect: "/librarytube/OfficeListshenpi",
        children: [
          // 办公耗材
          {
            path: "/librarytube/OfficeListshenpi", //办公耗材清单审批
            name: "shenpi",
            component: () =>
              import("../pages/librarytube/OfficeList1/shenpi.vue")
          },
          {
            path: "/librarytube/OfficeListbaobiao", //办公耗材清单审批
            name: "baobiao",
            component: () =>
              import("../pages/librarytube/OfficeList1/baobiao.vue")
          },

          {
            path: "/librarytube/storageshenpi", //办公耗材入库审批
            name: "shenpi",
            component: () => import("../pages/librarytube/storage/shenpi.vue")
          },
          {
            path: "/librarytube/storagebaobiao", //办公耗材入库报表
            name: "shenpi",
            component: () => import("../pages/librarytube/storage/baobiao.vue")
          },

          {
            path: "/librarytube/outLibraryshenpi", //办公耗材领用审批
            name: "shenpi",
            component: () =>
              import("../pages/librarytube/outLibrary/shenpi.vue")
          },
          {
            path: "/librarytube/outLibrarybaobiao", //办公耗材领用报表
            name: "baobiao",
            component: () =>
              import("../pages/librarytube/outLibrary/baobiao.vue")
          },

          {
            path: "/librarytube/returnLibraryshenpi", //办公耗材退库审批
            name: "shenpi",
            component: () =>
              import("../pages/librarytube/returnLibrary/shenpi.vue")
          },
          {
            path: "/librarytube/returnLibrarybaobiao", //办公耗材退库报表
            name: "baobiao",
            component: () =>
              import("../pages/librarytube/returnLibrary/baobiao.vue")
          },

          {
            path: "/librarytube/Allocateshenpi", //办公耗材调拨审批
            name: "shenpi",
            component: () => import("../pages/librarytube/Allocate/shenpi.vue")
          },
          {
            path: "/librarytube/Allocatebaobiao", //办公耗材调拨报表
            name: "baobiao",
            component: () => import("../pages/librarytube/Allocate/baobiao.vue")
          },

          {
            path: "/librarytube/peopleOut", //数据报表
            name: "appIndex",
            component: () => import("../pages/librarytube/OfficeList/index.vue")
          },

          //   固定资产
          {
            path: "/librarytube/assetList", //资产清单
            name: "assetList",
            component: () => import("../pages/librarytube/assetList/index.vue")
          },
          {
            path: "/librarytube/peopleIns", //资产入库导入任务查询
            name: "appIndex",
            component: () => import("../pages/librarytube/peopleIns/index.vue")
          },
          {
            path: "/librarytube/peopleInsyun", //资产入库-云入库
            name: "appIndex",
            component: () =>
              import("../pages/librarytube/peopleIns/peopleInsyun.vue")
          },
          {
            path: "/librarytube/peopleInsru", //资产入库-采购入库管理
            name: "appIndex",
            component: () =>
              import("../pages/librarytube/peopleIns/peopleInsru.vue")
          },
          {
            path: "/librarytube/lendList", //资产借出归还
            name: "DistributedList",
            component: () => import("../pages/librarytube/lendList/index.vue")
          },
          {
            path: "/librarytube/DistributedList", //资产派发退库
            name: "DistributedList",
            component: () =>
              import("../pages/librarytube/DistributedList/index.vue")
          },
          {
            path: "/librarytube/Inventory", //资产盘点
            name: "Inventory",
            component: () => import("../pages/librarytube/Inventory/index.vue")
          },
          {
            path: "/librarytube/AllocateList", //资产调拨
            name: "AllocateList",
            component: () =>
              import("../pages/librarytube/AllocateList/index.vue")
          },
          {
            path: "/librarytube/Dataview", //数据报表
            name: "appIndex",
            component: () => import("../pages/librarytube/OfficeList/index.vue")
          }
        ]
      },
      //   采购
      {
        path: "/purchase",
        name: "purchase",
        component: () => import("../pages/purchase/index.vue"),
        redirect: "/purchase/materialNeedPlan",
        children: [
          // 采购申请
          {
            path: "/purchase/materialNeedPlan", //采购申请
            name: "materialNeedPlan",
            component: () =>
              import("../pages/purchase/materialNeedPlan/index.vue")
          },
          {
            path: "/purchase/materialContract", //采购合同
            name: "materialContract",
            component: () =>
              import("../pages/purchase/materialContract/index.vue")
          },
          {
            path: "/purchase/materialPurchaseOrder", //采购订单
            name: "materialPurchaseOrder",
            component: () =>
              import("../pages/purchase/materialPurchaseOrder/index.vue")
          },
          {
            path: "/purchase/materialReturn", //采购退货
            name: "materialReturn",
            component: () =>
              import("../pages/purchase/materialReturn/index.vue")
          },
          {
            path: "/purchase/materialApply", //付款申请
            name: "materialApply",
            component: () => import("../pages/purchase/materialApply/index.vue")
          },
          {
            path: "/purchase/collectionReport", //统计报表
            name: "collectionReport",
            component: () =>
              import("../pages/purchase/collectionReport/index.vue")
          }
        ]
      },
      //   维护
      {
        path: "/maintain",
        name: "maintain",
        component: () => import("../pages/maintain/index.vue"),
        redirect: "/maintain/InventoryList",
        children: [
          {
            path: "/maintain/InventoryList", //资产维修
            name: "InventoryList",
            component: () => import("../pages/maintain/InventoryList/index.vue")
          },
          {
            path: "/maintain/disposalList", //资产处置
            name: "disposalList",
            component: () => import("../pages/maintain/disposalList/index.vue")
          },
          //   资产信息管理
          {
            path: "/maintain/biaoqianSet", //资产标签设置
            name: "biaoqianSet",
            component: () => import("../pages/maintain/biaoqianSet/index.vue")
          },
          {
            path: "/maintain/depreciation", //资质折旧设置
            name: "appIndex",
            component: () => import("../pages/maintain/depreciation/index.vue")
          },
          {
            path: "/maintain/materialBasic", //资产分类设置
            name: "materialBasic",
            component: () => import("../pages/maintain/materialBasic/index.vue")
          },
          {
            path: "/maintain/management", //资产位置设置
            name: "management",
            component: () => import("../pages/maintain/management/index.vue")
          },
          {
            path: "/maintain/Print", //资产打印设置
            name: "appIndex",
            component: () => import("../pages/librarytube/OfficeList/index.vue")
          },
          {
            path: "/maintain/information", //资产扩展信息
            name: "information",
            component: () => import("../pages/maintain/information/index.vue")
          },
          {
            path: "/maintain/biaomaSet", //资产编码设置
            name: "biaomaSet",
            component: () => import("../pages/maintain/biaomaSet/index.vue")
          }
        ]
      },
      //系统管理
      {
        path: "/system",
        name: "system",
        component: () => import("../pages/system/index.vue"),
        redirect: "/system/systemRole",
        children: [
          {
            path: "/system/systemRole", //角色管理
            name: "systemRole",
            component: () => import("../pages/system/systemRole/index.vue")
          },
          {
            path: "/system/basicHouseManage", //仓库管理
            name: "basicHouseManage",
            component: () =>
              import("../pages/system/basicHouseManage/index.vue")
          },

          {
            path: "/system/contactCorp", //往来单位
            name: "contactCorp",
            component: () => import("../pages/system/contactCorp/index.vue")
          },
          {
            path: "/system/materBasic", //物资基础库
            name: "materBasic",
            component: () => import("../pages/system/materBasic/index.vue")
          },
          {
            path: "/system/warningindex", //预警设置
            name: "warningindex",
            component: () => import("../pages/system/warningindex/index.vue")
          },
          {
            path: "/system/formSet", //表单设置
            name: "formSet",
            component: () => import("../pages/system/formSet/index.vue")
          }
        ]
      },
      //财务
      {
        path: "/finance",
        name: "finance",
        component: () => import("../pages/finance/index.vue"),
        redirect: "/finance/financeAccountInfo",
        children: [
          {
            path: "/finance/financeAccountInfo", //账户管理
            name: "financeAccountInfo",
            component: () =>
              import("../pages/finance/financeAccountInfo/index.vue")
          },
          {
            path: "/finance/payApply", //付款申请
            name: "payApply",
            component: () => import("../pages/finance/payApply/index.vue")
          },

          {
            path: "/finance/materialPayment", //付款登记
            name: "materialPayment",
            component: () =>
              import("../pages/finance/materialPayment/index.vue")
          },
          {
            path: "/finance/otherCollection", //收款登记
            name: "otherCollection",
            component: () =>
              import("../pages/finance/otherCollection/index.vue")
          },
          {
            path: "/finance/invoiceOpen", //发票开具申请
            name: "invoiceOpen",
            component: () => import("../pages/finance/invoiceOpen/index.vue")
          },
          {
            path: "/finance/invoiceOut", //开票登记
            name: "invoiceOut",
            component: () => import("../pages/finance/invoiceOut/index.vue")
          },
          {
            path: "/finance/invoiceIn", //收票登记
            name: "invoiceIn",
            component: () => import("../pages/finance/invoiceIn/index.vue")
          },
          {
            path: "/finance/financeReport", //统计报表
            name: "appIndex",
            component: () => import("../pages/librarytube/OfficeList/index.vue")
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
