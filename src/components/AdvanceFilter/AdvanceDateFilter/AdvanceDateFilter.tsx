import React, { ReactSVGElement, RefObject } from "react";
import {
  DatePicker as DatePickerAntd,
  DatePickerProps as AntdDatePickerProps,
} from "antd";
import classNames from "classnames";
import { DEFAULT_DATETIME_VALUE } from "@Configs/consts";
import { BORDER_TYPE } from "@Configs/enum";
import { Moment } from "moment";
import { CommonService } from "@Services/common-service";
import { CloseFilled } from "@carbon/icons-react";
import "./AdvanceDateFilter.scss";

interface AdvanceDateFilterProps {
  /** Value users select */
  value?: Moment;
  /** Label for current field */
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
  /** Use to custom style the component */
  className?: string;
  /** Placeholder of the component */
  placeholder?: string;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
  /** Set unique class for popup calendar */
  uniquePopupClassName?: string;
}

function AdvanceDateFilter(
  props: AdvanceDateFilterProps & AntdDatePickerProps
) {
  const {
    value,
    dateFormat,
    onChange,
    className,
    type,
    label,
    isSmall,
    disabled,
    placeholder,
    bgColor,
    uniquePopupClassName,
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
      className={classNames("advance-date-filter__wrapper", className)}
      ref={wrapperRef}
    >
      <div className="advance-date-filter__label m-b--3xs">
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
      <div className="advance-date-filter__container">
        <DatePickerAntd
          {...props}
          popupClassName={uniquePopupClassName}
          value={internalValue}
          style={{ width: "100%" }}
          ref={dateRef}
          allowClear={false}
          format={dateFormat}
          className={classNames({
            "p-y--2xs": isSmall,
            "p-x--xs": isSmall,
            "p--xs": !isSmall,
            "advance-date-filter--sm": isSmall,
            "advance-date-filter--white": bgColor === "white",
            "advance-date-filter--material": type === BORDER_TYPE.MATERIAL,
            "advance-date-filter--disabled ": disabled,
            "advance-date-filter--float": type === BORDER_TYPE.FLOAT_LABEL,
          })}
          placeholder={placeholder}
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
          </label>
        )}
        {internalValue &&
          String(internalValue) !== DEFAULT_DATETIME_VALUE &&
          !disabled && (
            <span
              className={classNames(
                "advance-date-filter__icon-wrapper",
                {
                  "advance-date-filter__icon-wrapper--material":
                    type === BORDER_TYPE.MATERIAL,
                },
                {
                  "advance-date-filter__icon-wrapper--sm": isSmall,
                }
              )}
            >
              <CloseFilled
                size={16}
                className={classNames(
                  "advance-date-filter__icon-clear",
                  "m-l--2xs"
                )}
                onClick={handleClearDate}
              />
            </span>
          )}
      </div>
    </div>
  );
}

AdvanceDateFilter.defaultProps = {
  dateFormat: ["DD/MM/YYYY", "YYYY/MM/DD"],
  label: "",
  isSmall: false,
  type: BORDER_TYPE.BORDERED,
  isRequired: false,
  disabled: false,
  className: "",
  bgColor: "white",
};

export default AdvanceDateFilter;
