import moment from "moment";

export const PUBLIC_URL: string = process.env.PUBLIC_URL;
export const ASSETS_IMAGE: string = PUBLIC_URL
  ? PUBLIC_URL + "/assets/img"
  : "/assets/img";
export const ASSETS_SVG: string = PUBLIC_URL
  ? PUBLIC_URL + "/assets/svg"
  : "/assets/svg";
export const BASE_API_URL: string =
  process.env.REACT_APP_BASE_API_URL ?? window.location.origin;
export const SIGNALR_CHANNEL: string = "Receive";
/**
 * Date-time constants
 */
export const STANDARD_DATE_REGEX = /^[0-9]{4}-[0-9]{2}-[0-9]{2}?$/;
export const STANDARD_TIME_REGEX = /^[0-9]{2}:[0-9]{2}?$/;
export const STANDARD_DATE_TIME_REGEX_WITHOUT_TIMEZONE: RegExp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}[\sT][0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{1,3})?$/;
export const STANDARD_DATE_TIME_REGEX: RegExp = /^([0-9]{4}-[0-9]{2}-[0-9]{2})[\sT]([0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{1,3})?)(Z|[+-][0-9]{2}:[0-9]{2})?$/;
export const STANDARD_DATE_FORMAT: string = "YYYY-MM-DD";
export const STANDARD_DATE_FORMAT_INVERSE: string = "DD-MM-YYYY";
export const STANDARD_DATE_FORMAT_INVERSE_DEFAULT: string = "DD/MM/YYYY";
export const STANDARD_TIME_FORMAT: string = "HH:mm:ss";
export const DEFAULT_DATETIME_VALUE: string = "0001-01-01T00:00:00";
export const STANDARD_DATE_TIME_FORMAT: string = `${STANDARD_DATE_FORMAT}${
  "T" + STANDARD_TIME_FORMAT + "Z"
}`;
export const STANDARD_DATE_TIME_FORMAT_VIEW: string = `${STANDARD_DATE_FORMAT_INVERSE} ${STANDARD_TIME_FORMAT}`;
export const TIMEZONE_OFFSET: string = moment().format("Z");

/**
 * Debounce time constants
 */
export const DEBOUNCE_TIME_100: number = 100;

export const DEBOUNCE_TIME_150: number = 150;

export const DEBOUNCE_TIME_200: number = 200;

export const DEBOUNCE_TIME_250: number = 250;

export const DEBOUNCE_TIME_300: number = 300;

export const DEBOUNCE_TIME_350: number = 350;

export const DEBOUNCE_TIME_400: number = 400;

export const INPUT_DEBOUNCE_TIME: number = 400;

/**
 * limit constants
 */
export const DEFAULT_LIMIT_WORD: number = 50;
export const NOTIFICATION_LIMIT_WORD: number = 75;

/**
 * Filter constants
 */
export const DEFAULT_TAKE: number = 10;

// eslint-disable-next-line no-useless-escape
export const SPECIAL_CHARACTERS = /[ `!@#$%^&*()_+\-=[\]{};':"\|,.<>/?~ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]/;

/**
 * url constants
 */

export const MENU_URL_REGEX = /^(dms)/;
export const ACTION_URL_REGEX = /^(rpc)/;
