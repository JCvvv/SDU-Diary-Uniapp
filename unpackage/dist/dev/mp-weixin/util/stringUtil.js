"use strict";
const isEmpty = (str) => {
  if (str === "" || str.trim().length === 0) {
    return true;
  } else {
    return false;
  }
};
exports.isEmpty = isEmpty;
