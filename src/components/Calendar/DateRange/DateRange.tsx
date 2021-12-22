import { DatePicker } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import classNames from "classnames";
import { BORDER_TYPE } from "config/enum";
import { Moment } from "moment";
import React, { RefObject } from "react";
import { Subscription } from "rxjs";
import { CommonService } from "services/common-service";
import "./DateRange.scss";

const { RangePicker } = DatePicker;

function SuffixDateIcon() {
  return (
    <span className={classNames("date-range__icon")}>
      <i className="tio-calendar"></i>
    </span>
  );
}

interface DateRangeAction {
  name?: string;
  action?: any;
}

interface DateRangeProps {
  label?: string;
  value: [Moment, Moment];
  open?: boolean;
  dateFormat?: string[];
  onChange?: (value: [Moment, Moment], dateString?: [string, string]) => void;
  type?: BORDER_TYPE;
  isSmall?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  className?: string;
  action?: DateRangeAction;
  placeHolder?: [string, string];
}

function DateRange(props: DateRangeProps & RangePickerProps) {
  const {
    value,
    dateFormat,
    onChange,
    type,
    label,
    isRequired,
    action,
    isSmall,
    disabled,
    placeHolder,
    className,
  } = props;

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );
  const dateRef = React.useRef<any>();


  const internalValue: [Moment, Moment] = React.useMemo(() => {
    return [
      typeof value[0] === "string"
        ? CommonService.toMomentDate(value[0])
        : value[0],
      typeof value[1] === "string"
        ? CommonService.toMomentDate(value[1])
        : value[1],
    ];
  }, [value]);

  const handleClearDate = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      onChange([null, null]);
    },
    [onChange]
  );

  return (
    <div className={classNames("date-range__wrapper", className)} ref={wrapperRef} >
      <div className="date-picker__label m-b--xxxs">
        {type !== BORDER_TYPE.FLOAT_LABEL && label && (
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
      <RangePicker
        {...props}
        value={internalValue}
        style={{ width: "100%" }}
        allowClear={false}
        format={dateFormat}
        placeholder={placeHolder}
        suffixIcon={<SuffixDateIcon />}
        className={classNames("bg-white", {
          "date-picker__wrapper--sm": isSmall,
          "p-y--xxs": isSmall,
          "p-x--xs": isSmall,
          "p--xs": !isSmall,
          "date-picker--material": type === BORDER_TYPE.MATERIAL,
          "date-picker--disabled ": disabled,
          "date-picker--float": type === BORDER_TYPE.FLOAT_LABEL,
        })}
        ref={dateRef}
      />
      {type === BORDER_TYPE.FLOAT_LABEL && label && (
        <label
          id="component__title-id"
          className={classNames("component__title component__title--normal", {
            "component__title--sm": isSmall,
            "component__title-up": internalValue && internalValue?.length > 0 && internalValue[0],
          })}
        >
          {label}
          {isRequired && <span className="text-danger">&nbsp;*</span>}
        </label>
      )}
      {internalValue[0] && (
        <>
          <span
            className={classNames("date-range__icon-wrapper", {
              "date-range__icon-wrapper--material": type === BORDER_TYPE.MATERIAL,
            })}
          >
            <i
              className={classNames(
                "input-icon__clear",
                "m-l--xxs",
                "tio-clear_circle"
              )}
              onClick={handleClearDate}
            ></i>
          </span>
        </>
      )}
    </div>
  );
}
DateRange.defaultProps = {
  dateFormat: ["DD/MM/YYYY", "YYYY/MM/DD"],
  label: "",
  isSmall: false,
  type: BORDER_TYPE.BORDERED,
  isRequired: false,
  disabled: false,
  className: "",
};

export default DateRange;
