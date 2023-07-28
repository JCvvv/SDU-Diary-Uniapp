"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    goWordVote: function() {
      common_vendor.index.navigateTo({
        url: "/pages/createWordVote/createWordVote"
      });
    },
    goPicVote: function() {
      common_vendor.index.navigateTo({
        url: "/pages/createPicVote/createPicVote"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.goWordVote()),
    b: common_vendor.o(($event) => $options.goPicVote())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Jc/Desktop/sdu-diary/pages/create/create.vue"]]);
wx.createPage(MiniProgramPage);
