import React from "react";
import "./DatePicker.scss";
import { DatePicker as DatePickerAntd } from "antd";
import { Moment } from "moment";

import classNames from "classnames";
import { DatePickerProps as AntdDatePickerProps } from "antd/lib/date-picker";
import { DEFAULT_DATETIME_VALUE } from "config/consts";
import { CommonService } from "services/common-service";


interface DatePickerAction {
  name?: string;
  action?: any;
}
export enum DATE_PICKER_TYPE {
  MATERIAL,
  BORDERED,
  FLOAT_LABEL,
}

interface DatePickerProps {
  value?: Moment;
  label?: string;
  isMaterial?: boolean;
  dateFormat?: string[];
  error?: string;
  onChange?: (value: Moment | null, dateString?: string) => void;
  type?: DATE_PICKER_TYPE;
  isSmall?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  className?: string;
  action?: DatePickerAction;
  placeHolder?: string;
}

function DatePicker(props: DatePickerProps & AntdDatePickerProps) {
  const {
    value,
    isMaterial,
    dateFormat,
    onChange,
    className,
    type,
    label,
    isRequired,
    action,
    isSmall,
    disabled,
    placeHolder
  } = props;


  const dateRef = React.useRef<any>();

  const internalValue = React.useMemo(() => {
    return typeof value === "string"
      ? CommonService.toMomentDate(value)
      : value;
  }, [value]);

  const handleClearDate = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      onChange(null);
    },
    [onChange]
  );

  return (
    <div className={classNames("date-picker__wrapper", className)}>
      <div className="date-picker__label m-b--xxxs">
        {type !== DATE_PICKER_TYPE.FLOAT_LABEL && label && (
          <label className="component__title">
            {label}
            {isRequired && <span className="text-danger">&nbsp;*</span>}
          </label>
        )}
        <span style={{ width: "100%" }}></span>
        {action && (
          <span
            className="m-l--xxxs body-text--md color-link"
            style={{ cursor: "pointer" }}
            onClick={action.action}
          >
            {action.name}
          </span>
        )}
      </div>
      <div className={classNames(
        "date-picker__container bg-white",
      )} onClick={() => {
        dateRef.current.focus();
      }}>
        <DatePickerAntd
          {...props}
          value={internalValue}
          style={{ width: "100%" }}
          ref={dateRef}
          allowClear={false}
          format={dateFormat}
          className={classNames(
            "bg-white",
            {
              "date-picker__wrapper--sm": isSmall,
              "p-y--xxs": isSmall,
              "p-x--xs": isSmall,
              "p--xs": !isSmall,
              "date-picker--material": type === DATE_PICKER_TYPE.MATERIAL,
              "date-picker--disabled ": disabled,
              "date-picker--float": type === DATE_PICKER_TYPE.FLOAT_LABEL,
            }
          )}
          placeholder={
            type === DATE_PICKER_TYPE.FLOAT_LABEL && label ? " " : placeHolder
          }
        />
        {type === DATE_PICKER_TYPE.FLOAT_LABEL && label && (
          <label
            className={classNames("component__title component__title--normal", {
              "component__title--sm": isSmall,
            })}
          >
            {label}
            {isRequired && <span className="text-danger">&nbsp;*</span>}
          </label>
        )}
        {value && String(value) !== DEFAULT_DATETIME_VALUE && (
          <span
            className={classNames("date-picker__icon-wrapper", {
              "date-picker__icon-wrapper--material": type === DATE_PICKER_TYPE.MATERIAL,
            })}
          >
            <i
              className="date-picker__icon-clear tio-clear"
              onClick={handleClearDate}
            ></i>
          </span>
        )}
      </div>


    </div>
  );
}
DatePicker.defaultProps = {
  isMaterial: false,
  dateFormat: ["DD/MM/YYYY", "YYYY/MM/DD"],
  label: "",
  isSmall: false,
  type: DATE_PICKER_TYPE.BORDERED,
  isRequired: false,
  disabled: false,
  className: "",
};

export default DatePicker;
