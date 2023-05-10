import {
  DatePicker as DatePickerAntd,
  DatePickerProps as AntdDatePickerProps,
} from "antd";
import classNames from "classnames";
import { DEFAULT_DATETIME_VALUE } from "@Configs/consts";
import { BORDER_TYPE } from "@Configs/enum";
import { Moment } from "moment";
import React, { ReactSVGElement, RefObject } from "react";
import { CommonService } from "@Services/common-service";
import { CloseFilled } from "@carbon/icons-react";
import "./DatePicker.scss";

interface DatePickerAction {
  name?: string;
  action?: any;
}
interface DatePickerProps {
  /**User-selected value*/
  value?: Moment | any;
  /**Label for current field*/
  label?: string;
  /** Use to format the date selected */
  dateFormat?: string[];
  /** Handle the change value of the component */
  onChange?: (value: Moment | null, dateString?: string) => void;
  /** Control the style type of component: MATERIAL, BORDERED, FLOAT_LABEL */
  type?: BORDER_TYPE;
  /** Control the size of the component */
  isSmall?: boolean;
  /** Not allow to handle change the component */
  disabled?: boolean;
  /** Show * as required field */
  isRequired?: boolean;
  /** Use to custom style the component */
  className?: string;
  /** Provide a custom action (onClick) to the component */
  action?: DatePickerAction;
  /** Placeholder of the component */
  placeholder?: string;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
}

function DatePicker(props: DatePickerProps & AntdDatePickerProps) {
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
    bgColor,
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
      onChange(undefined);
    },
    [onChange]
  );

  return (
    <div
      className={classNames("date-picker__wrapper", className)}
      ref={wrapperRef}
    >
      <div className="date-picker__label m-b--3xs">
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
        {action && (
          <span
            className="m-l--3xs body-text--md color-link"
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
            "p-y--2xs": isSmall,
            "p-x--xs": isSmall,
            "p--xs": !isSmall,
            "date-picker--sm": isSmall,
            "date-picker--white": bgColor === "white",
            "date-picker--material": type === BORDER_TYPE.MATERIAL,
            "date-picker--disabled ": disabled,
            "date-picker--float": type === BORDER_TYPE.FLOAT_LABEL,
          })}
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
            <CloseFilled
              size={16}
              className={classNames("date-picker__icon-clear", "m-l--2xs")}
              onClick={handleClearDate}
            />
          </span>
        )}
      </div>
    </div>
  );
}
DatePicker.defaultProps = {
  dateFormat: ["DD/MM/YYYY", "YYYY/MM/DD"],
  label: "",
  isSmall: false,
  type: BORDER_TYPE.BORDERED,
  isRequired: false,
  disabled: false,
  className: "",
};

export default DatePicker;
