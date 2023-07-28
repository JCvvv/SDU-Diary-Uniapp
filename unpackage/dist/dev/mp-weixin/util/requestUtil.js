"use strict";
const common_vendor = require("../common/vendor.js");
let ajaxTimes = 0;
const baseUrl = "http://localhost:8866";
const getBaseUrl = () => {
  return baseUrl;
};
const requestUtil = (params) => {
  let header = { ...params.header };
  header["token"] = common_vendor.index.getStorageSync("token");
  ajaxTimes++;
  common_vendor.wx$1.showLoading({
    title: "加载中",
    mask: true
  });
  var start = (/* @__PURE__ */ new Date()).getTime();
  while (true)
    if ((/* @__PURE__ */ new Date()).getTime() - start > 1e3 * 1)
      break;
  return new Promise((resolve, reject) => {
    common_vendor.wx$1.request({
      ...params,
      header,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data);
      },
      fail: (err) => {
        common_vendor.index.showToast({
          icon: "error",
          title: "连接服务器失败",
          duration: 3e3
        });
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          common_vendor.wx$1.hideLoading();
        }
      }
    });
  });
};
exports.getBaseUrl = getBaseUrl;
exports.requestUtil = requestUtil;
