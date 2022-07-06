import { DatePicker as DatePickerAntd } from "antd";
import { DatePickerProps as AntdDatePickerProps } from "antd/lib/date-picker";
import classNames from "classnames";
import { DEFAULT_DATETIME_VALUE } from "config/consts";
import { BORDER_TYPE } from "config/enum";
import { Moment } from "moment";
import React, { ReactSVGElement, RefObject } from "react";
import { CommonService } from "services/common-service";
import { CloseFilled16 } from "@carbon/icons-react";
import "./DatePicker.scss";

interface DatePickerAction {
  name?: string;
  action?: any;
}
interface DatePickerProps {
  value?: Moment;
  label?: string;
  isMaterial?: boolean;
  dateFormat?: string[];
  error?: string;
  onChange?: (value: Moment | null, dateString?: string) => void;
  type?: BORDER_TYPE;
  isSmall?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  className?: string;
  action?: DatePickerAction;
  placeHolder?: string;
}

function DatePicker(props: DatePickerProps) {
  const {
    value,
    dateFormat,
    onChange,
    className,
    type,
    label,
    isRequired,
    action,
    isSmall,
    disabled,
    placeHolder,
  } = props;

  const dateRef = React.useRef<any>();
  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );
  const internalValue = React.useMemo(() => {
    return typeof value === "string"
      ? CommonService.toMomentDate(value)
      : value;
  }, [value]);

  const handleClearDate = React.useCallback(
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      event.stopPropagation();
      onChange(null);
    },
    [onChange]
  );

  return (
    <div
      className={classNames("date-picker__wrapper", className)}
      ref={wrapperRef}
    >
      <div className="date-picker__label m-b--xxxs">
        {type !== BORDER_TYPE.FLOAT_LABEL && label && (
          <label
            className={classNames("component__title", {
              "component__title--disabled": disabled,
            })}
          >
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
      <div className="date-picker__container">
        <DatePickerAntd
          {...props}
          value={internalValue}
          style={{ width: "100%" }}
          ref={dateRef}
          allowClear={false}
          format={dateFormat}
          className={classNames({
            "date-picker__wrapper--sm": isSmall,
            "p-y--xxs": isSmall,
            "p-x--xs": isSmall,
            "p--xs": !isSmall,
            "date-picker--material": type === BORDER_TYPE.MATERIAL,
            "date-picker--disabled ": disabled,
            "date-picker--float": type === BORDER_TYPE.FLOAT_LABEL,
          })}
          placeholder={placeHolder}
        />
        {type === BORDER_TYPE.FLOAT_LABEL && label && (
          <label
            id="component__title-id"
            className={classNames("component__title component__title--normal", {
              "component__title--sm": isSmall,
              "component__title-up": internalValue,
            })}
          >
            {label}
            {isRequired && <span className="text-danger">&nbsp;*</span>}
          </label>
        )}
        {value && String(value) !== DEFAULT_DATETIME_VALUE && !disabled && (
          <span
            className={classNames(
              "date-picker__icon-wrapper",
              {
                "date-picker__icon-wrapper--material":
                  type === BORDER_TYPE.MATERIAL,
              },

              { "date-picker__icon-wrapper--disabled": disabled },
              { "date-picker__icon-wrapper--sm": isSmall }
            )}
          >
            <CloseFilled16
              className={classNames("date-picker__icon-clear", "m-l--xxs")}
              onClick={handleClearDate}
            ></CloseFilled16>
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
  type: BORDER_TYPE.BORDERED,
  isRequired: false,
  disabled: false,
  className: "",
};

export default DatePicker;
