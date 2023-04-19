import {
  TimePicker as TimePickerAntd,
  TimePickerProps as AntdTimePickerProps,
} from "antd";
import classNames from "classnames";
import { DEFAULT_DATETIME_VALUE } from "@Configs/consts";
import { BORDER_TYPE } from "@Configs/enum";
import { Moment } from "moment";
import React, { ReactSVGElement, RefObject } from "react";
import { CommonService } from "@Services/common-service";
import CloseFilled16 from "@carbon/icons-react/es/close--filled/16";
import "./TimePicker.scss";

interface TimePickerAction {
  name?: string;
  action?: any;
}
interface TimePickerProps {
  value?: Moment | any;
  label?: string;
  timeFormat?: string | any[];
  onChange?: (value: Moment | null, timeString?: string) => void;
  type?: BORDER_TYPE;
  isSmall?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  className?: string;
  action?: TimePickerAction;
  placeholder?: string;
  bgColor?: "white" | "gray";
}

function TimePicker(props: TimePickerProps & AntdTimePickerProps) {
  const {
    value,
    timeFormat,
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

  const timeRef = React.useRef<any>();
  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );
  const internalValue = React.useMemo(() => {
    return typeof value === "string"
      ? CommonService.toMomentDate(value)
      : value;
  }, [value]);

  const handleClearTime = React.useCallback(
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      event.stopPropagation();
      onChange(undefined);
    },
    [onChange]
  );

  return (
    <div
      className={classNames("time-picker__wrapper", className)}
      ref={wrapperRef}
    >
      <div className="time-picker__label m-b--3xs">
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
      <div className="time-picker__container">
        <TimePickerAntd
          {...props}
          value={internalValue}
          style={{ width: "100%" }}
          ref={timeRef}
          allowClear={false}
          format={timeFormat}
          className={classNames({
            "p-y--2xs": isSmall,
            "p-x--xs": isSmall,
            "p--xs": !isSmall,
            "time-picker--sm": isSmall,
            "time-picker--white": bgColor === "white",
            "time-picker--material": type === BORDER_TYPE.MATERIAL,
            "time-picker--disabled ": disabled,
            "time-picker--float": type === BORDER_TYPE.FLOAT_LABEL,
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
              "time-picker__icon-wrapper",
              {
                "time-picker__icon-wrapper--material":
                  type === BORDER_TYPE.MATERIAL,
              },

              { "time-picker__icon-wrapper--disabled": disabled },
              { "time-picker__icon-wrapper--sm": isSmall }
            )}
          >
            <CloseFilled16
              className={classNames("time-picker__icon-clear", "m-l--2xs")}
              onClick={handleClearTime}
            ></CloseFilled16>
          </span>
        )}
      </div>
    </div>
  );
}
TimePicker.defaultProps = {
  isMaterial: false,
  timeFormat: "HH:mm:ss",
  label: "",
  isSmall: false,
  type: BORDER_TYPE.BORDERED,
  isRequired: false,
  disabled: false,
  className: "",
};

export default TimePicker;
