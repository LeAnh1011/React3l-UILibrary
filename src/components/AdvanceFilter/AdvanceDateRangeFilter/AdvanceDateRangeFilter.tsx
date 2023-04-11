import React, { ReactSVGElement, RefObject } from "react";
import { DatePicker } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import classNames from "classnames";
import { BORDER_TYPE } from "@Configs/enum";
import { Moment } from "moment";
import { CommonService } from "@Services/common-service";
import CloseFilled16 from "@carbon/icons-react/es/close--filled/16";
import Calendar16 from "@carbon/icons-react/es/calendar/16";
import "./AdvanceDateRangeFilter.scss";

const { RangePicker } = DatePicker;

function SuffixDateIcon() {
  return (
    <span className={classNames("date-range__icon")}>
      <Calendar16 />
    </span>
  );
}

interface AdvanceDateRangeFilterProps {
  label?: string;
  values: [Moment, Moment];
  open?: boolean;
  dateFormat?: string[];
  onChange?: (value: [Moment, Moment], dateString?: [string, string]) => void;
  type?: BORDER_TYPE;
  isSmall?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: [string, string];
  bgColor?: "white" | "gray";
}

function AdvanceDateRangeFilter(
  props: AdvanceDateRangeFilterProps & RangePickerProps
) {
  const {
    values,
    dateFormat,
    onChange,
    type,
    label,
    isSmall,
    disabled,
    placeholder,
    className,
    bgColor,
  } = props;

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );
  const dateRef = React.useRef<any>();

  const internalValue: [Moment, Moment] = React.useMemo(() => {
    return [
      typeof values[0] === "string"
        ? CommonService.toMomentDate(values[0])
        : values[0],
      typeof values[1] === "string"
        ? CommonService.toMomentDate(values[1])
        : values[1],
    ];
  }, [values]);

  const handleClearDate = React.useCallback(
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      event.stopPropagation();
      onChange([undefined, undefined]);
    },
    [onChange]
  );

  return (
    <div
      className={classNames("advance-date-range-filter__wrapper", className)}
      ref={wrapperRef}
    >
      <div className="advance-date-range-filter__label m-b--3xs">
        {type !== BORDER_TYPE.FLOAT_LABEL && label && (
          <label
            className={classNames("component__title", {
              "component__title--disabled": disabled,
            })}
          >
            {label}
          </label>
        )}
      </div>
      <div className="advance-date-range-filter__container">
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
            "advance-date-range-filter--sm": isSmall,
            "advance-date-range-filter--white": bgColor === "white",
            "advance-date-range-filter--material":
              type === BORDER_TYPE.MATERIAL,
            "advance-date-range-filter--disabled ": disabled,
            "advance-date-range-filter--float":
              type === BORDER_TYPE.FLOAT_LABEL,
          })}
          ref={dateRef}
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
          </label>
        )}
        {internalValue[0] && !disabled && (
          <>
            <span
              className={classNames(
                "advance-date-range-filter__icon-wrapper",
                {
                  "advance-date-range-filter__icon-wrapper--material":
                    type === BORDER_TYPE.MATERIAL,
                },
                {
                  "advance-date-range-filter__icon-wrapper--sm": isSmall,
                },
                {
                  "advance-date-range-filter__icon-wrapper--disabled": disabled,
                }
              )}
            >
              <CloseFilled16
                className={classNames(
                  "advance-date-range-filter__icon-clear",
                  "m-l--2xs"
                )}
                onClick={handleClearDate}
              ></CloseFilled16>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

AdvanceDateRangeFilter.defaultProps = {
  dateFormat: ["DD/MM/YYYY", "YYYY/MM/DD"],
  label: "",
  isSmall: false,
  type: BORDER_TYPE.BORDERED,
  isRequired: false,
  disabled: false,
  className: "",
  bgColor: "white",
};

export default AdvanceDateRangeFilter;
