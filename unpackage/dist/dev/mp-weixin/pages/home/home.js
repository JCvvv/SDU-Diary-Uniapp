"use strict";
const util_requestUtil = require("../../util/requestUtil.js");
const util_dateUtil = require("../../util/dateUtil.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      voteList: []
    };
  },
  onLoad() {
    this.getVoteList();
  },
  methods: {
    getVoteList: async function() {
      const result = await util_requestUtil.requestUtil({ url: "/vote/listOfUser", method: "get" });
      console.log(result);
      this.voteList = result.voteList;
    },
    judgeDate: function(toDate) {
      return util_dateUtil.judgeDate(toDate);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.voteList, (value, index, i0) => {
      return common_vendor.e({
        a: value.type == 2
      }, value.type == 2 ? {} : {}, {
        b: value.type == 1
      }, value.type == 1 ? {} : {}, {
        c: common_vendor.t(value.title),
        d: $options.judgeDate(value.voteEndTime) >= 0
      }, $options.judgeDate(value.voteEndTime) >= 0 ? {
        e: common_vendor.t(value.voteEndTime)
      } : {}, {
        f: $options.judgeDate(value.voteEndTime) < 0
      }, $options.judgeDate(value.voteEndTime) < 0 ? {
        g: common_vendor.t(value.voteEndTime)
      } : {}, {
        h: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Jc/Desktop/sdu-diary/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
