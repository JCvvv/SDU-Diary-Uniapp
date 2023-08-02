"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const util_requestUtil = require("./util/requestUtil.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/author/author.js";
  "./pages/my/my.js";
  "./pages/createWordVote/createWordVote.js";
  "./pages/createPicVote/createPicVote.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    common_vendor.wx$1.login({ timeout: 5e3, success: (res) => {
      this.wxlogin(res.code);
    } });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    async wxlogin(code) {
      console.log("code=" + code);
      const result = await util_requestUtil.requestUtil({ url: "/user/wxLogin", data: { code }, method: "post" });
      console.log("token=" + result.token);
      console.log("openid=" + result.openid);
      if (result.code == 0) {
        console.log("登录成功");
        common_vendor.index.setStorageSync("token", result.token);
        common_vendor.index.setStorageSync("openid", result.openid);
      } else {
        console.log("登录失败，报错信息：" + result.msg);
        common_vendor.index.showToast({
          icon: "error",
          title: result.msg,
          duration: 3e3
        });
      }
    }
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Jc/Desktop/sdu-diary/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
