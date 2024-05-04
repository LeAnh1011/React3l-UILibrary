import { DatePicker } from "antd";
import type { RangePickerProps } from "antd/lib/date-picker";
import classNames from "classnames";
import { BORDER_TYPE } from "@Configs/enum";
import { Moment } from "moment";
import React, { ReactSVGElement, RefObject } from "react";
import { CommonService } from "@Services/common-service";
import { CloseFilled, Calendar } from "@carbon/icons-react";
import "./DateRange.scss";

const { RangePicker } = DatePicker;

function SuffixDateIcon() {
  return (
    <span className={classNames("date-range__icon")}>
      <Calendar size={16} />
    </span>
  );
}

interface DateRangeAction {
  name?: string;
  action?: any;
}

interface DateRangeProps {
  /**Label for current field*/
  label?: string;
  /**User-selected values*/
  value: [Moment, Moment];
  /** Use to format the date selected */
  dateFormat?: string[];
  /** Handle the change value of the component */
  onChange?: (value: [Moment, Moment], dateString?: [string, string]) => void;
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
  action?: DateRangeAction;
  /** Placeholder of the component */
  placeholder?: [string, string];
  /**Return element Popup container */
  getPopupContainer?: () => HTMLElement;
  /**Pass className to style for dropdown */
  dropdownClassName?: any;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
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
    placeholder,
    className,
    getPopupContainer,
    dropdownClassName,
    bgColor,
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
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      event.stopPropagation();
      onChange([undefined, undefined]);
    },
    [onChange]
  );

  return (
    <div
      className={classNames("date-range__wrapper", className)}
      ref={wrapperRef}
    >
      <div className="date-range__label m-b--3xs">
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
            className="m-l--3xs body-text--md color-link"
            style={{ cursor: "pointer" }}
            onClick={action.action}
          >
            {action.name}
          </span>
        )}
      </div>
      <div className="date-range__container">
        <RangePicker
          {...props}
          value={internalValue}
          style={{ width: "100%" }}
          allowClear={false}
          format={dateFormat}
          placeholder={placeholder}
          suffixIcon={<SuffixDateIcon />}
          className={classNames({
            "p-y--2xs": isSmall,
            "p-x--xs": isSmall,
            "p--xs": !isSmall,
            "date-range--sm": isSmall,
            "date-range--white": bgColor === "white",
            "date-range--material": type === BORDER_TYPE.MATERIAL,
            "date-range--disabled ": disabled,
            "date-range--float": type === BORDER_TYPE.FLOAT_LABEL,
          })}
          getPopupContainer={getPopupContainer}
          ref={dateRef}
          dropdownClassName={dropdownClassName}
        />
        {type === BORDER_TYPE.FLOAT_LABEL && label && (
          <label
            id="component__title-id"
            className={classNames("component__title component__title--normal", {
              "component__title--sm": isSmall,
              "component__title-up":
                internalValue && internalValue?.length > 0 && internalValue[0],
            })}
          >
            {label}
            {isRequired && <span className="text-danger">&nbsp;*</span>}
          </label>
        )}
        {internalValue[0] && !disabled && (
          <>
            <span
              className={classNames(
                "date-range__icon-wrapper",
                {
                  "date-range__icon-wrapper--material":
                    type === BORDER_TYPE.MATERIAL,
                },
                { "date-range__icon-wrapper--disabled": disabled },
                {
                  "date-range__icon-wrapper--sm": isSmall,
                }
              )}
            >
              <CloseFilled
                size={16}
                className={classNames("date-range__icon-clear", "m-l--2xs")}
                onClick={handleClearDate}
              />
            </span>
          </>
        )}
      </div>
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
