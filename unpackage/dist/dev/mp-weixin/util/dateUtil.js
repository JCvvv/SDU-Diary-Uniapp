"use strict";
const judgeDate = (toDate) => {
  return (/* @__PURE__ */ new Date()).getTime() - new Date(toDate).getTime();
};
var timeFormat = function(msTime) {
  let time = new Date(msTime);
  let yy = time.getFullYear();
  let MM = time.getMonth() + 1;
  let dd = time.getDate();
  let hh = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  let min = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  let sec = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  return yy + "-" + MM + "-" + dd + " " + hh + ":" + min + ":" + sec;
};
exports.judgeDate = judgeDate;
exports.timeFormat = timeFormat;
