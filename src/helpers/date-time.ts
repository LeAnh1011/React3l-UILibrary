import {
  DEFAULT_DATETIME_VALUE,
  STANDARD_DATE_FORMAT_INVERSE,
  STANDARD_DATE_FORMAT_INVERSE_DEFAULT,
  STANDARD_DATE_REGEX,
  STANDARD_DATE_TIME_FORMAT_VIEW,
  STANDARD_DATE_TIME_REGEX,
  STANDARD_DATE_TIME_REGEX_WITHOUT_TIMEZONE,
  STANDARD_TIME_FORMAT,
  STANDARD_TIME_REGEX,
} from "@Configs/consts";
import moment, { Moment } from "moment";

export function formatDate(
  date: Moment,
  dateFormat: string = STANDARD_DATE_FORMAT_INVERSE_DEFAULT
) {
  if (date) {
    if (typeof date === "object" && "format" in date) {
      return date.format(dateFormat);
    }
  }
  return moment(date).format(dateFormat);
}

export function formatTime(
  time: Moment,
  timeFormat: string = STANDARD_TIME_FORMAT
) {
  if (!time) return null;
  if (typeof time === "object" && "format" in time) {
    return time.format(timeFormat);
  }
  return moment(time).format(timeFormat);
}

export function formatDateTime(
  time: Moment,
  dateTimeFormat: string = STANDARD_DATE_TIME_FORMAT_VIEW
) {
  if (!time) return null;
  if (typeof time === "object" && "format" in time) {
    return time.format(dateTimeFormat);
  }
  return moment(time).format(dateTimeFormat);
}

export function isDateValue(date?: string) {
  return date?.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
}

export function isTimeValue(time?: string) {
  return time?.match(/[0-9]{2}:[0-9]{2}/);
}

export function isDateTimeValue(time?: string) {
  return (
    time?.match(STANDARD_DATE_TIME_REGEX_WITHOUT_TIMEZONE) ||
    time?.match(STANDARD_DATE_TIME_REGEX) ||
    time?.match(STANDARD_DATE_REGEX) ||
    time?.match(STANDARD_TIME_REGEX)
  );
}
export function formatInputDate(value: Moment | string | undefined) {
  if (typeof value === "object") {
    return value;
  }
  if (typeof value === "string" && value !== DEFAULT_DATETIME_VALUE) {
    /* check whether value is dateTime value, if true return moment instance */
    if (isDateTimeValue(value)) {
      return moment(value);
    }
    return moment(value, STANDARD_DATE_FORMAT_INVERSE);
  }
  return undefined;
}
