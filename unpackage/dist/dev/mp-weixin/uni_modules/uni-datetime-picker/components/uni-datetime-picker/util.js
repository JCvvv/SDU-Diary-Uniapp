"use strict";
class Calendar {
  constructor({
    selected,
    startDate,
    endDate,
    range
  } = {}) {
    this.date = this.getDateObj(/* @__PURE__ */ new Date());
    this.selected = selected || [];
    this.startDate = startDate;
    this.endDate = endDate;
    this.range = range;
    this.cleanMultipleStatus();
    this.weeks = {};
    this.lastHover = false;
  }
  /**
   * 设置日期
   * @param {Object} date
   */
  setDate(date) {
    const selectDate = this.getDateObj(date);
    this.getWeeks(selectDate.fullDate);
  }
  /**
   * 清理多选状态
   */
  cleanMultipleStatus() {
    this.multipleStatus = {
      before: "",
      after: "",
      data: []
    };
  }
  setStartDate(startDate) {
    this.startDate = startDate;
  }
  setEndDate(endDate) {
    this.endDate = endDate;
  }
  getPreMonthObj(date) {
    date = fixIosDateFormat(date);
    date = new Date(date);
    const oldMonth = date.getMonth();
    date.setMonth(oldMonth - 1);
    const newMonth = date.getMonth();
    if (oldMonth !== 0 && newMonth - oldMonth === 0) {
      date.setMonth(newMonth - 1);
    }
    return this.getDateObj(date);
  }
  getNextMonthObj(date) {
    date = fixIosDateFormat(date);
    date = new Date(date);
    const oldMonth = date.getMonth();
    date.setMonth(oldMonth + 1);
    const newMonth = date.getMonth();
    if (newMonth - oldMonth > 1) {
      date.setMonth(newMonth - 1);
    }
    return this.getDateObj(date);
  }
  /**
   * 获取指定格式Date对象
   */
  getDateObj(date) {
    date = fixIosDateFormat(date);
    date = new Date(date);
    return {
      fullDate: getDate(date),
      year: date.getFullYear(),
      month: addZero(date.getMonth() + 1),
      date: addZero(date.getDate()),
      day: date.getDay()
    };
  }
  /**
   * 获取上一个月日期集合
   */
  getPreMonthDays(amount, dateObj) {
    const result = [];
    for (let i = amount - 1; i >= 0; i--) {
      const month = dateObj.month > 1 ? dateObj.month - 1 : 12;
      const year = month === 12 ? dateObj.year - 1 : dateObj.year;
      const date = new Date(year, month, -i).getDate();
      const fullDate = `${year}-${addZero(month)}-${addZero(date)}`;
      let multiples = this.multipleStatus.data;
      let multiplesStatus = -1;
      if (this.range && multiples) {
        multiplesStatus = multiples.findIndex((item) => {
          return this.dateEqual(item, fullDate);
        });
      }
      const checked = multiplesStatus !== -1;
      const extraInfo = this.selected && this.selected.find((item) => {
        if (this.dateEqual(fullDate, item.date)) {
          return item;
        }
      });
      result.push({
        fullDate,
        year,
        month,
        date,
        multiple: this.range ? checked : false,
        beforeMultiple: this.isLogicBefore(fullDate, this.multipleStatus.before, this.multipleStatus.after),
        afterMultiple: this.isLogicAfter(fullDate, this.multipleStatus.before, this.multipleStatus.after),
        disable: this.startDate && !dateCompare(this.startDate, fullDate) || this.endDate && !dateCompare(fullDate, this.endDate),
        isToday: fullDate === this.date.fullDate,
        userChecked: false,
        extraInfo
      });
    }
    return result;
  }
  /**
   * 获取本月日期集合
   */
  getCurrentMonthDays(amount, dateObj) {
    const result = [];
    const fullDate = this.date.fullDate;
    for (let i = 1; i <= amount; i++) {
      const currentDate = `${dateObj.year}-${dateObj.month}-${addZero(i)}`;
      const isToday = fullDate === currentDate;
      const extraInfo = this.selected && this.selected.find((item) => {
        if (this.dateEqual(currentDate, item.date)) {
          return item;
        }
      });
      if (this.startDate) {
        dateCompare(this.startDate, currentDate);
      }
      if (this.endDate) {
        dateCompare(currentDate, this.endDate);
      }
      let multiples = this.multipleStatus.data;
      let multiplesStatus = -1;
      if (this.range && multiples) {
        multiplesStatus = multiples.findIndex((item) => {
          return this.dateEqual(item, currentDate);
        });
      }
      const checked = multiplesStatus !== -1;
      result.push({
        fullDate: currentDate,
        year: dateObj.year,
        month: dateObj.month,
        date: i,
        multiple: this.range ? checked : false,
        beforeMultiple: this.isLogicBefore(currentDate, this.multipleStatus.before, this.multipleStatus.after),
        afterMultiple: this.isLogicAfter(currentDate, this.multipleStatus.before, this.multipleStatus.after),
        disable: this.startDate && !dateCompare(this.startDate, currentDate) || this.endDate && !dateCompare(currentDate, this.endDate),
        isToday,
        userChecked: false,
        extraInfo
      });
    }
    return result;
  }
  /**
   * 获取下一个月日期集合
   */
  _getNextMonthDays(amount, dateObj) {
    const result = [];
    dateObj.month + 1;
    for (let i = 1; i <= amount; i++) {
      const month = dateObj.month === 12 ? 1 : dateObj.month * 1 + 1;
      const year = month === 1 ? dateObj.year + 1 : dateObj.year;
      const fullDate = `${year}-${addZero(month)}-${addZero(i)}`;
      let multiples = this.multipleStatus.data;
      let multiplesStatus = -1;
      if (this.range && multiples) {
        multiplesStatus = multiples.findIndex((item) => {
          return this.dateEqual(item, fullDate);
        });
      }
      const checked = multiplesStatus !== -1;
      const extraInfo = this.selected && this.selected.find((item) => {
        if (this.dateEqual(fullDate, item.date)) {
          return item;
        }
      });
      result.push({
        fullDate,
        year,
        date: i,
        month,
        multiple: this.range ? checked : false,
        beforeMultiple: this.isLogicBefore(fullDate, this.multipleStatus.before, this.multipleStatus.after),
        afterMultiple: this.isLogicAfter(fullDate, this.multipleStatus.before, this.multipleStatus.after),
        disable: this.startDate && !dateCompare(this.startDate, fullDate) || this.endDate && !dateCompare(fullDate, this.endDate),
        isToday: fullDate === this.date.fullDate,
        userChecked: false,
        extraInfo
      });
    }
    return result;
  }
  /**
   * 获取当前日期详情
   * @param {Object} date
   */
  getInfo(date) {
    if (!date) {
      date = /* @__PURE__ */ new Date();
    }
    return this.calendar.find((item) => item.fullDate === this.getDateObj(date).fullDate);
  }
  /**
   * 比较时间是否相等
   */
  dateEqual(before, after) {
    before = new Date(fixIosDateFormat(before));
    after = new Date(fixIosDateFormat(after));
    return before.valueOf() === after.valueOf();
  }
  /**
   *  比较真实起始日期
   */
  isLogicBefore(currentDate, before, after) {
    let logicBefore = before;
    if (before && after) {
      logicBefore = dateCompare(before, after) ? before : after;
    }
    return this.dateEqual(logicBefore, currentDate);
  }
  isLogicAfter(currentDate, before, after) {
    let logicAfter = after;
    if (before && after) {
      logicAfter = dateCompare(before, after) ? after : before;
    }
    return this.dateEqual(logicAfter, currentDate);
  }
  /**
   * 获取日期范围内所有日期
   * @param {Object} begin
   * @param {Object} end
   */
  geDateAll(begin, end) {
    var arr = [];
    var ab = begin.split("-");
    var ae = end.split("-");
    var db = /* @__PURE__ */ new Date();
    db.setFullYear(ab[0], ab[1] - 1, ab[2]);
    var de = /* @__PURE__ */ new Date();
    de.setFullYear(ae[0], ae[1] - 1, ae[2]);
    var unixDb = db.getTime() - 24 * 60 * 60 * 1e3;
    var unixDe = de.getTime() - 24 * 60 * 60 * 1e3;
    for (var k = unixDb; k <= unixDe; ) {
      k = k + 24 * 60 * 60 * 1e3;
      arr.push(this.getDateObj(new Date(parseInt(k))).fullDate);
    }
    return arr;
  }
  /**
   *  获取多选状态
   */
  setMultiple(fullDate) {
    if (!this.range)
      return;
    let {
      before,
      after
    } = this.multipleStatus;
    if (before && after) {
      if (!this.lastHover) {
        this.lastHover = true;
        return;
      }
      this.multipleStatus.before = fullDate;
      this.multipleStatus.after = "";
      this.multipleStatus.data = [];
      this.multipleStatus.fulldate = "";
      this.lastHover = false;
    } else {
      if (!before) {
        this.multipleStatus.before = fullDate;
        this.lastHover = false;
      } else {
        this.multipleStatus.after = fullDate;
        if (dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
        } else {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
        }
        this.lastHover = true;
      }
    }
    this.getWeeks(fullDate);
  }
  /**
   *  鼠标 hover 更新多选状态
   */
  setHoverMultiple(fullDate) {
    if (!this.range || this.lastHover)
      return;
    const { before } = this.multipleStatus;
    if (!before) {
      this.multipleStatus.before = fullDate;
    } else {
      this.multipleStatus.after = fullDate;
      if (dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
        this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
      } else {
        this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
      }
    }
    this.getWeeks(fullDate);
  }
  /**
   * 更新默认值多选状态
   */
  setDefaultMultiple(before, after) {
    this.multipleStatus.before = before;
    this.multipleStatus.after = after;
    if (before && after) {
      if (dateCompare(before, after)) {
        this.multipleStatus.data = this.geDateAll(before, after);
        this.getWeeks(after);
      } else {
        this.multipleStatus.data = this.geDateAll(after, before);
        this.getWeeks(before);
      }
    }
  }
  /**
   * 获取每周数据
   * @param {Object} dateData
   */
  getWeeks(dateData) {
    const {
      year,
      month
    } = this.getDateObj(dateData);
    const preMonthDayAmount = new Date(year, month - 1, 1).getDay();
    const preMonthDays = this.getPreMonthDays(preMonthDayAmount, this.getDateObj(dateData));
    const currentMonthDayAmount = new Date(year, month, 0).getDate();
    const currentMonthDays = this.getCurrentMonthDays(currentMonthDayAmount, this.getDateObj(dateData));
    const nextMonthDayAmount = 42 - preMonthDayAmount - currentMonthDayAmount;
    const nextMonthDays = this._getNextMonthDays(nextMonthDayAmount, this.getDateObj(dateData));
    const calendarDays = [...preMonthDays, ...currentMonthDays, ...nextMonthDays];
    const weeks = new Array(6);
    for (let i = 0; i < calendarDays.length; i++) {
      const index = Math.floor(i / 7);
      if (!weeks[index]) {
        weeks[index] = new Array(7);
      }
      weeks[index][i % 7] = calendarDays[i];
    }
    this.calendar = calendarDays;
    this.weeks = weeks;
  }
}
function getDateTime(date, hideSecond) {
  return `${getDate(date)} ${getTime(date, hideSecond)}`;
}
function getDate(date) {
  date = fixIosDateFormat(date);
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${addZero(month)}-${addZero(day)}`;
}
function getTime(date, hideSecond) {
  date = fixIosDateFormat(date);
  date = new Date(date);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return hideSecond ? `${addZero(hour)}:${addZero(minute)}` : `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
}
function addZero(num) {
  if (num < 10) {
    num = `0${num}`;
  }
  return num;
}
function getDefaultSecond(hideSecond) {
  return hideSecond ? "00:00" : "00:00:00";
}
function dateCompare(startDate, endDate) {
  startDate = new Date(fixIosDateFormat(startDate));
  endDate = new Date(fixIosDateFormat(endDate));
  return startDate <= endDate;
}
function checkDate(date) {
  const dateReg = /((19|20)\d{2})(-|\/)\d{1,2}(-|\/)\d{1,2}/g;
  return date.match(dateReg);
}
const dateTimeReg = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])( [0-5]?[0-9]:[0-5]?[0-9]:[0-5]?[0-9])?$/;
function fixIosDateFormat(value) {
  if (typeof value === "string" && dateTimeReg.test(value)) {
    value = value.replace(/-/g, "/");
  }
  return value;
}
exports.Calendar = Calendar;
exports.checkDate = checkDate;
exports.dateCompare = dateCompare;
exports.fixIosDateFormat = fixIosDateFormat;
exports.getDate = getDate;
exports.getDateTime = getDateTime;
exports.getDefaultSecond = getDefaultSecond;
exports.getTime = getTime;
