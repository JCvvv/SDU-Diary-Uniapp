"use strict";
const common_vendor = require("../../common/vendor.js");
const util_requestUtil = require("../../util/requestUtil.js");
const util_dateUtil = require("../../util/dateUtil.js");
const _sfc_main = {
  data() {
    const curDate = /* @__PURE__ */ new Date();
    const vv = new Date(curDate.getTime() + 24 * 60 * 60 * 1e3);
    return {
      title: "",
      explanation: "",
      coverImageFileName: "",
      coverImageStyles: {
        width: "700rpx",
        height: "400rpx",
        border: false
      },
      voteEndTime: util_dateUtil.timeFormat(vv),
      options: [
        {
          id: 1,
          name: ""
        },
        {
          id: 2,
          name: ""
        }
      ]
    };
  },
  computed: {
    startDate() {
      return /* @__PURE__ */ new Date();
    },
    endDate() {
      const curDate = /* @__PURE__ */ new Date();
      const vv = new Date(curDate.getTime() + 24 * 60 * 60 * 1e3 * 365);
      return vv;
    }
  },
  methods: {
    addOption: function() {
      var option = {
        id: this.options[this.options.length - 1].id + 1,
        name: ""
      };
      this.options.push(option);
    },
    removeOption: function(id) {
      const index = this.options.findIndex((v) => v.id === id);
      if (index != 0)
        this.options.splice(index, 1);
    },
    selectCoverFileFunc: function(e) {
      console.log(e.tempFilePaths[0]);
      common_vendor.index.uploadFile({
        header: { token: common_vendor.index.getStorageSync("token") },
        url: util_requestUtil.getBaseUrl() + "/vote/uploadCoverImage",
        filePath: e.tempFilePaths[0],
        name: "coverImage",
        success: (res) => {
          let result = JSON.parse(res.data);
          if (result.code == 0) {
            this.coverImageFileName = result.coverImageFileName;
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  _easycom_uni_file_picker2();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  _easycom_uni_file_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.selectCoverFileFunc($event)),
    b: common_vendor.p({
      ["auto-upload"]: false,
      limit: "1",
      ["del-icon"]: true,
      ["disable-preview"]: true,
      ["file-mediatype"]: "image",
      imageStyles: $data.coverImageStyles
    }),
    c: $data.title,
    d: common_vendor.o(($event) => $data.title = $event.detail.value),
    e: $data.explanation,
    f: common_vendor.o(($event) => $data.explanation = $event.detail.value),
    g: common_vendor.f($data.options, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.removeOption(item.id), item.id),
        b: item.name,
        c: common_vendor.o(($event) => item.name = $event.detail.value, item.id),
        d: item.id
      };
    }),
    h: common_vendor.o(($event) => $options.addOption()),
    i: common_vendor.o((...args) => _ctx.submitVote && _ctx.submitVote(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Jc/Desktop/sdu-diary/pages/createPicVote/createPicVote.vue"]]);
wx.createPage(MiniProgramPage);
