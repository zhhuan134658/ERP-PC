import axios from "./https.js";
import * as dd from "dingtalk-jsapi";
import store from "@/store";
export default {
  // 时间戳转日期
  formateTime: function(time) {
    let date;
    if (time.length < 11) {
      // 秒
      date = new Date(time * 1000);
    } else {
      // 豪秒
      date = new Date(time);
    }

    let Y = date.getFullYear();
    let M =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return Y + "-" + M + "-" + D;
  },
  //时间转换
  timeChange: function(val, type) {
    let chinaStandard = val;
    let newTime;
    let date = new Date(chinaStandard);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let minute = date.getMinutes();
    let s = date.getSeconds();
    minute = minute < 10 ? "0" + minute : minute;
    s = s < 10 ? "0" + s : s;
    if (type == 1) {
      newTime = y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + s;
    } else if (type == 2) {
      newTime = y + "-" + m + "-" + d;
    }
    return newTime;
  },
  //时间日期格式化
  dateFormat(dateObj, format) {
    let date = {
      "M+": dateObj.getMonth() + 1,
      "d+": dateObj.getDate(),
      "h+": dateObj.getHours(),
      "m+": dateObj.getMinutes(),
      "s+": dateObj.getSeconds(),
      "q+": Math.floor((dateObj.getMonth() + 3) / 3),
      "S+": dateObj.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(
        RegExp.$1,
        (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (let k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? date[k]
            : ("00" + date[k]).substr(("" + date[k]).length)
        );
      }
    }
    return format;
  },
  //获取地址栏参数
  GetQueryString: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  },
  checkding: function() {
    axios
      .post("/dingding/jsapiAuth", {
        url: window.location.href
      })
      .then(res => {
        if (res.data.code == 1) {
          let tokenData = res.data.data;
          dd.config({
            agentId: tokenData.agentId, // 必填，微应用ID
            corpId: tokenData.corpId, //必填，企业ID
            timeStamp: tokenData.timeStamp, // 必填，生成签名的时间戳
            nonceStr: tokenData.nonceStr, // 必填，生成签名的随机串
            signature: tokenData.signature, // 必填，签名
            type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
            jsApiList: [
              "biz.contact.complexPicker",
              "biz.contact.choose",
              "runtime.info",
              "device.notification.confirm",
              "device.notification.alert",
              "device.notification.prompt",
              "biz.ding.post",
              "biz.util.openLink",
              "biz.util.uploadAttachment",
              "biz.cspace.preview",
              "biz.util.downloadFile",
              "biz.util.openSlidePanel",
              "biz.contact.departmentsPicker",
              "biz.ding.create"
            ] // 必填，需要使用的jsapi列表，注意：不要带dd。
          });
          dd.error(function(err) {
            console.log(JSON.stringify(err));
          });
        }
      });
  },
  getSpaceId: function() {
    axios
      .post("/dingyun/DingPanSaveFile", {
        corp_id: store.state.cid,
        type: "add",
        userid: store.state.userInfo.uid
      })
      .then(res => {
        if (res.data.status == 1) {
          store.commit("setSpaceId", res.data.spaceid);
        }
      });
  },
  //获取全部物资
  async getmaterialList() {
    try {
      const res = await axios.post("/newtao/materialGoodsList");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  //数组对象去重
  unique: function(arr) {
    const res = new Map();
    return arr.filter(arr => !res.has(arr.emplId) && res.set(arr.emplId, 1));
  },
  idunique: function(arr) {
    const res = new Map();
    return arr.filter(arr => !res.has(arr.id) && res.set(arr.id, 1));
  },
  //计算大小
  renderSize: function(value) {
    if (null == value || value == "") {
      return "0 Bytes";
    }
    var unitArr = new Array(
      "Bytes",
      "KB",
      "MB",
      "GB",
      "TB",
      "PB",
      "EB",
      "ZB",
      "YB"
    );
    var index = 0;
    var srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2); //保留的小数位数
    return size + unitArr[index];
  },
  utilProjectType: function() {
    axios.post("/spread/projectType").then(res => {
      if (res.data.code == 1) {
        store.commit("setPtype", JSON.stringify(res.data.data));
      }
    });
  },
  utilAllProject: function() {
    // axios.post("/project/projectInfoRegisterZbList").then(res => {
    //   if (res.data.code == 1) {
    //     store.commit("setAllP", JSON.stringify(res.data.data));
    //   }
    // });
  },
  utilAllZProject: function() {
    axios.post("/projecttwo/zkProjectAllList").then(res => {
      if (res.data.code == 1) {
        store.commit("setAllZP", JSON.stringify(res.data.data));
      }
    });
  },
  utilWorkerType: function() {
    let val = [
      { name: "电工", value: "电工" },
      { name: "测量工", value: "测量工" },
      { name: "钣金工", value: "钣金工" },
      { name: "电气设备安装工", value: "电气设备安装工" },
      { name: "吊篮操作工", value: "吊篮操作工" },
      { name: "焊工", value: "焊工" },
      { name: "管道工", value: "管道工" },
      { name: "钢筋工", value: "钢筋工" },
      { name: "防水工", value: "防水工" },
      { name: "混凝土工", value: "混凝土工" },
      { name: "机械设备安装工", value: "机械设备安装工" },
      { name: "架子工", value: "架子工" },
      { name: "建筑门窗安装工", value: "建筑门窗安装工" },
      { name: "建筑门窗幕墙安装工", value: "建筑门窗幕墙安装工" },
      { name: "脚手架拆卸工", value: "脚手架拆卸工" },
      { name: "绿化工", value: "绿化工" },
      { name: "模板工", value: "模板工" },
      { name: "花卉工", value: "花卉工" },
      { name: "木工", value: "木工" },
      { name: "抹灰工", value: "抹灰工" },
      { name: "幕墙安装工", value: "幕墙安装工" },
      { name: "幕墙制作工", value: "幕墙制作工" },
      { name: "起重工", value: "起重工" },
      { name: "起重信号工", value: "起重信号工" },
      { name: "砌筑工", value: "砌筑工" },
      { name: "弱电工", value: "弱电工" },

      { name: "石工", value: "石工" },
      { name: "室内成套设施安装工", value: "室内成套设施安装工" },
      { name: "水暖工", value: "水暖工" },
      { name: "通风工", value: "通风工" },
      { name: "线路架设工", value: "线路架设工" },
      { name: "镶贴工", value: "镶贴工" },
      { name: "窑炉修筑工", value: "窑炉修筑工" },
      { name: "油漆工", value: "油漆工" },
      { name: "桩机操作工", value: "桩机操作工" },
      { name: "装饰装修工", value: "装饰装修工" },
      { name: "测量放线工", value: "测量放线工" },
      { name: "安装起重工", value: "安装起重工" },
      { name: "石雕工", value: "石雕工" },
      { name: "石作业工", value: "石作业工" },
      { name: "瓦工", value: "瓦工" },
      { name: "司泵工", value: "司泵工" },
      { name: "推光漆工", value: "推光漆工" },
      { name: "匾额工", value: "匾额工" },
      { name: "变电安装工", value: "变电安装工" },
      { name: "彩绘工", value: "彩绘工" },
      { name: "电焊工", value: "电焊工" },
      { name: "管工", value: "管工" },
      { name: "建筑电工", value: "建筑电工" },
      {
        name: "附着升降脚手架安装拆卸工",
        value: "附着升降脚手架安装拆卸工"
      },
      { name: "建筑起重机械安装拆卸工", value: "建筑起重机械安装拆卸工" },
      { name: "木雕工", value: "木雕工" },
      { name: "泥塑工", value: "泥塑工" },
      { name: "起重信号司索工", value: "起重信号司索工" },
      { name: "砌花接工", value: "砌花接工" },
      { name: "钻刻工", value: "钻刻工" },
      { name: "钻细工", value: "钻细工" },
      { name: "装饰金属工", value: "装饰金属工" },
      { name: "装饰涂表工", value: "装饰涂表工" },
      { name: "装饰装修木工", value: "装饰装修木工" },
      { name: "打桩工", value: "打桩工" },
      { name: "其他", value: "其他" }
    ];
    return val;
  },
  utilApprovalStatus: function() {
    // let val = []
    // if (store.state.userInfo.admin != 1) {
    //     val = [
    //         { name: '待我审批', value: 1 },
    //         { name: '我已审批', value: 2 },
    //         { name: '我发起的审批', value: 3 },
    //         { name: '抄送我的', value: 4 }
    //     ]
    // } else {
    //     val = [
    //         { name: '待我审批', value: 1 },
    //         { name: '我已审批', value: 2 },
    //         { name: '我发起的审批', value: 3 },
    //         { name: '抄送我的', value: 4 },
    //         { name: '审批中', value: 5 },
    //         { name: '审批拒绝', value: 6 },
    //         { name: '审批通过', value: 7 }
    //     ]
    // }
    let val = [
      { name: "待我审批", value: 1 },
      { name: "我已审批", value: 2 },
      { name: "我发起的审批", value: 3 },
      { name: "抄送我的", value: 4 },
      { name: "审批中", value: 5 },
      { name: "审批拒绝", value: 6 },
      { name: "审批通过", value: 7 }
    ];
    return val;
  },
  utilProvinceList: function() {
    let val = [
      "北京",
      "天津",
      "河北",
      "山西",
      "内蒙古",
      "辽宁",
      "吉林",
      "黑龙江",
      "上海",
      "江苏",
      "浙江",
      "安徽",
      "福建",
      "江西",
      "山东",
      "河南",
      "湖北",
      "湖南",
      "广东",
      "广西",
      "海南",
      "重庆",
      "四川",
      "贵州",
      "云南",
      "西藏",
      "陕西",
      "甘肃",
      "青海",
      "宁夏",
      "新疆",
      "台湾",
      "香港",
      "澳门",
      "南海诸岛",
      "海外"
    ];
    return val;
  },
  utilProjectStatus: function() {
    axios.post("/spread/projectStatus").then(res => {
      if (res.data.code == 1) {
        store.commit("setPstatus", JSON.stringify(res.data.data));
      }
    });
  },
  utilAdjustWidth: function(stable, appendDiv, sx, sh) {
    // stable是ref选中的table表格
    //appendDiv append的小计合计外层div
    //sx是小计的ref
    //sh是合计的ref
    // let width = getComputedStyle(
    //     stable.$refs.headerWrapper.querySelector('table')
    // ).width;
    if (stable && stable.$refs.headerWrapper && appendDiv && sx && sh) {
      let width = getComputedStyle(
        stable.$refs.bodyWrapper.querySelector("table")
      ).width;
      //修改append后的宽度和表格宽度一致
      appendDiv.style.width = width;
      sx.style = "width:" + width;
      sh.style = "width:" + width;
      Array.from(stable.$refs.headerWrapper.querySelectorAll("col")).forEach(
        (item, i) => {
          if (i == 0) {
            sx.children[0].style = "width:" + "54px";
            sh.children[0].style = "width:" + "54px";
          } else {
            //sx.children[i],sh.children[i]会多出一个undefined，做判断规避
            if (sx.children[i]) {
              sx.children[i].style =
                "width:" + item.getAttribute("width") + "px";
            }
            if (sh.children[i]) {
              sh.children[i].style =
                "width:" + item.getAttribute("width") + "px";
            }
          }
        }
      );
    }
  },
  utilAdjustxiao: function(stable, appendDiv, sx) {
    // stable是ref选中的table表格
    //appendDiv append的小计合计外层div
    //sx是小计的ref
    //sh是合计的ref
    // let width = getComputedStyle(
    //     stable.$refs.headerWrapper.querySelector('table')
    // ).width;
    if (stable && stable.$refs.headerWrapper && appendDiv && sx) {
      let width = getComputedStyle(
        stable.$refs.bodyWrapper.querySelector("table")
      ).width;
      //修改append后的宽度和表格宽度一致
      appendDiv.style.width = width;
      sx.style = "width:" + width;

      Array.from(stable.$refs.headerWrapper.querySelectorAll("col")).forEach(
        (item, i) => {
          if (i == 0) {
            sx.children[0].style = "width:" + "54px";
          } else {
            //sx.children[i],sh.children[i]会多出一个undefined，做判断规避
            if (sx.children[i]) {
              sx.children[i].style =
                "width:" + item.getAttribute("width") + "px";
            }
          }
        }
      );
    }
  },
  canDelete(arrList) {
    console.log(arrList);
    let iconindex;
    if (arrList.length > 0) {
      iconindex = arrList.some(item => item.status == "2");
    } else {
      iconindex = false;
    }

    return iconindex;
  }
};
