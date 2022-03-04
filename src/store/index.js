import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cid: window.sessionStorage.getItem("cid"),
    prodata: window.sessionStorage.getItem("prodata"),
    cname: window.sessionStorage.getItem("cname"),
    spaceId: window.sessionStorage.getItem("spaceId"),
    outTime: window.sessionStorage.getItem("outTime"),
    userInfo: {
      urid: window.sessionStorage.getItem("urid"),
      uid: window.sessionStorage.getItem("uid"),
      uname: window.sessionStorage.getItem("uname"),
      shifou: window.sessionStorage.getItem("shifou"),
      quanxian: window.sessionStorage.getItem("quanxian"),
      avatar: window.sessionStorage.getItem("avatar"),
      admin: window.sessionStorage.getItem("admin"),
      firstshow: window.sessionStorage.getItem("firstshow"),
      maincorpid: window.sessionStorage.getItem("maincorpid")
    },
    allPro: window.sessionStorage.getItem("allPro"),
    allZPro: window.sessionStorage.getItem("allZPro"),
    pType: window.sessionStorage.getItem("pType"),
    pStatus: window.sessionStorage.getItem("pStatus")
  },

  actions: {},
  getters: {
    // userInfo(state) {
    //   if (!state.userInfo) {
    //     state.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    //   }
    //   return state.userInfo;
    // }
  },
  mutations: {
    setmaincorpid(state, maincorpid) {
      state.userInfo.maincorpid = maincorpid;
      sessionStorage.setItem("maincorpid", maincorpid);
    },
    setfirstshow(state, firstshow) {
      state.userInfo.firstshow = firstshow;
      sessionStorage.setItem("firstshow", firstshow);
    },
    // vuex
    setSpaceId(state, spaceId) {
      state.spaceId = spaceId;
      sessionStorage.setItem("spaceId", spaceId);
    },
    setOutTime(state, outTime) {
      state.outTime = outTime;
      sessionStorage.setItem("outTime", outTime);
    },
    setAvatar(state, avatar) {
      state.userInfo.avatar = avatar;
      sessionStorage.setItem("avatar", avatar);
    },
    setPtype(state, pType) {
      state.pType = pType;
      sessionStorage.setItem("pType", pType);
    },
    setAllP(state, allp) {
      state.allPro = allp;
      sessionStorage.setItem("allPro", allp);
    },
    setAllZP(state, allzp) {
      state.allZPro = allzp;
      sessionStorage.setItem("allZPro", allzp);
    },
    setPstatus(state, pStatus) {
      state.pStatus = pStatus;
      sessionStorage.setItem("pStatus", pStatus);
    },
    setquanxian(state, quanxian) {
      state.userInfo.quanxian = quanxian;
      sessionStorage.setItem("quanxian", quanxian);
    },
    setAdmin(state, admin) {
      state.userInfo.admin = admin;
      sessionStorage.setItem("admin", admin);
    },
    setCname(state, cname) {
      //公司名字 cname
      state.cname = cname;
      sessionStorage.setItem("cname", cname);
      //
    },
    setUrid(state, urid) {
      state.userInfo.urid = urid;
      sessionStorage.setItem("urid", urid);
    },
    setShifou(state, shifou) {
      state.userInfo.shifou = shifou;
      sessionStorage.setItem("shifou", shifou);
    },
    setprodata(state, prodata) {
      state.prodata = prodata;
      sessionStorage.setItem("prodata", prodata);
    },
    setCid(state, cid) {
      state.cid = cid;
      sessionStorage.setItem("cid", cid);
    },
    setUid(state, userid) {
      state.userInfo.uid = userid;
      sessionStorage.setItem("uid", userid);
    },
    setUname(state, user_name) {
      state.userInfo.uname = user_name;
      sessionStorage.setItem("uname", user_name);
    }
  }
});
