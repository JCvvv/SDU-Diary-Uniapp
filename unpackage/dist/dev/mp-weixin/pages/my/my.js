"use strict";
const common_vendor = require("../../common/vendor.js");
const util_requestUtil = require("../../util/requestUtil.js");
const util_stringUtil = require("../../util/stringUtil.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        nickName: "",
        avatarUrl: ""
      },
      baseUrl: "",
      if_show: false
    };
  },
  onLoad() {
    this.getUserInfo();
    this.baseUrl = util_requestUtil.getBaseUrl();
  },
  methods: {
    getUserInfo: async function() {
      const result = await util_requestUtil.requestUtil({ url: "/user/getUserInfo", method: "get" });
      this.userInfo = result.currentUser;
      this.if_show = true;
    },
    onChangeNickName: async function(e) {
      console.log(e.detail.value);
      let nickName = e.detail.value;
      if (!util_stringUtil.isEmpty(nickName)) {
        await util_requestUtil.requestUtil({ url: "/user/updateNickName", data: { nickName }, method: "post" });
      }
    },
    onChooseAvatar: function(e) {
      console.log(e.detail.avatarUrl);
      common_vendor.index.uploadFile({
        header: { token: common_vendor.index.getStorageSync("token") },
        url: util_requestUtil.getBaseUrl() + "/user/updateUserImage",
        filePath: e.detail.avatarUrl,
        name: "userImage",
        success: (res) => {
          let result = JSON.parse(res.data);
          if (result.code == 0) {
            this.userInfo.avatarUrl = result.userImageFileName;
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.if_show
  }, $data.if_show ? {
    b: this.baseUrl + "/image/userAvatar/" + $data.userInfo.avatarUrl
  } : {}, {
    c: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    d: common_vendor.o((...args) => $options.onChangeNickName && $options.onChangeNickName(...args)),
    e: $data.userInfo.nickName,
    f: common_vendor.o(($event) => $data.userInfo.nickName = $event.detail.value)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Jc/Desktop/sdu-diary/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
