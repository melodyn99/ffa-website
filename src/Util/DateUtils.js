import moment from 'moment';

moment.locale('zh-cn');

// Number should be unix timestamp in miliseconds.
export function dateToRemainingDays(start) {
  const startDate = moment(start);
  const currentDate = moment();
  const isOver = currentDate.diff(startDate) > 0;
  const duration = isOver ? 0 : startDate.diff(currentDate, 'days');
  return isOver ? '已结束' : `${duration} 天`;
}

export function dateToPaymentDueDate(dueDate) {
  const dayDiff = moment(dueDate).diff(moment(), 'days');
  let result;
  if (dayDiff === 0) {
    result = '今天到期';
  } else if (dayDiff > 0) {
    result = `${dayDiff}天后到期`;
  } else {
    result = `逾期${-dayDiff}天`;
  }
  return result;
}

export function dateToRemainingDaysEvent(deadline) {
  // console.log('deadline', moment(deadline).format('DD MM YYYY'))
  const deadLine = moment(deadline);
  const currentDate = moment();
  const isOver = currentDate.diff(deadLine) > 0;
  const duration = isOver ? currentDate.diff(deadLine, 'days') : deadLine.diff(currentDate, 'days');
  return isOver ? `已结束: ${duration}天` : `剩下: ${duration} 天`;
}

export function dateToDayAndMonth(date) {
  return moment(date).format('MM月 DD日');
}

export function dateToDayMonthYear(date) {
  return moment(date).format('YYYY年 MM月 DD日');
}

export function dateToDayMonthYearTimeMinutes(date) {
  return moment(date).format('YYYY年 MM月 DD日 HH:mm');
}

export function timeStampsToRange(start, end) {
  return `${moment(start).format('YYYY-MM-DD, HH:mm')} - ${moment(end).format('HH:mm')}`;
}

export function dateToReminderSend(date) {
  return moment(date).fromNow();
}

export function timeStampToDate(timestamp) {
  // Timestamp in miliseconds from server.
  return new Date(timestamp);
}

export function distanceDateToTimeStamps(distanceDate) {
  const date = moment().add(distanceDate, 'days');
  return moment(date).format("X");
}

//"2016-10-11 18:06"
export function dayMonthYearTimeToTimeStamps(yearMonthDayTime) {
  const date = moment(yearMonthDayTime, 'YYYY-MM-DD HH:mm');
  // const date = moment(yearMonthDayTime).format();
  // const date = moment(yearMonthDayTime.tz('Europe/Paris')).format();
  let result = moment(date).format("X")
  if (result.length <= 10) {
    result += "000";
  }
  return result;
}

export function getTheMonent(hourNum) {
  const currMoment = moment().add(hourNum, 'hours');
  let result = moment(currMoment).format("X")
  if (result.length <= 10) {
    result += "000";
  }
  return result;
}

export function convertDayToRange(input) {
  const date = moment(input, 'YYYY-MM-DD');
  let result = moment(date).format("X")
  if (result.length <= 10) {
    result += "000";
  }
  return result;
}

export function getTheMonentToRange() {
  const currMoment = moment();
  return moment(currMoment).format('YYYY-MM-DD HH:mm');
}

export function rangeToTimeStamps(yearMonthDayTime) {
  const array = [];
  const string = yearMonthDayTime;
  const indexOfYear_start = string.split("-", 1).join("-").length - 4;
  const indexOfYear_end = string.split("-", 2).join("-").length + 3;
  const year = string.substring(indexOfYear_start, indexOfYear_end);

  const indexOfBeginTime_start = string.split(":", 1).join("-").length - 2;
  const indexOfBeginTime_end = string.split(":", 1).join("-").length + 3;
  const beginTime = string.substring(indexOfBeginTime_start, indexOfBeginTime_end);

  const indexOfFinishTime_start = string.split(":", 2).join("-").length - 2;
  const indexOfFinishTime_end = string.split(":", 2).join("-").length + 3;
  const finishTime = string.substring(indexOfFinishTime_start, indexOfFinishTime_end);


  let beginDate = dayMonthYearTimeToTimeStamps(year + " " + beginTime, 'YYYY-MM-DD HH:mm');
  if (beginDate.length <= 10) beginDate += "000";

  array.push(beginDate);

  let finishDate = dayMonthYearTimeToTimeStamps(year + " " + finishTime, 'YYYY-MM-DD HH:mm');
  if (finishDate.length <= 10) finishDate += "000";
  array.push(finishDate);
  return array;
}

/**
 * Check whether the date objects representing the same time.
 * Number input parameters are treated as milliseconds since epoch.
 * @param {?Date | ?moment.Moment | ?number} date1 - The date to be compared.
 * @param {?Date | ?moment.Moment | ?number} date2 - The date to be compared.
 * @returns {boolean}
 * Return true if both objects are null or undefined,
 * or if they are representing the same time.
 * Otherwise return false.
 */
export function isDateEqual(date1, date2) {
  return (date1 === null || date2 === null) ? (date1 === date2) : (date1.valueOf() === date2.valueOf());
}

/**
 * Round the date to the nearest duration boundary.
 * @param {?Date | ?moment.Moment | ?number} date - The date to be rounded.
 * If the type is number then it is treat as milliseconds since epoch.
 * @param {number} duration - The duration in milliseconds
 * @param {string} roundingMethod - Rounding method used.
 * Can be 'ceil', 'floor', 'round'
 * @returns {?Date | ?moment.Moment | ?number}
 * A new native Date instance of the rounded time.
 * If input date is already rounded or if it is null or undefined
 * then the input date is returned as-is.
 */
export function roundDate(date, duration, roundingMethod) {
  if (date == null) {
    return date;
  }
  const dateTimestamp = date.valueOf();
  const roundedDateTimestamp = Math[roundingMethod](dateTimestamp / duration) * duration;
  return dateTimestamp === roundedDateTimestamp ? date : new Date(roundedDateTimestamp);
}
