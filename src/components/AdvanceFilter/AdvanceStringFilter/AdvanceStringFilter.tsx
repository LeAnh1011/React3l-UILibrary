import classNames from "classnames";
import { CloseFilled } from "@carbon/icons-react";
import { BORDER_TYPE } from "@Configs/enum";
import React, { ReactSVGElement, RefObject } from "react";
import "./AdvanceStringFilter.scss";

export interface AdvanceStringFilterProps {
  /** Label for current field */
  label?: string;
  /** Control the style type of component: MATERIAL, BORDERED, FLOAT_LABEL  */
  type?: BORDER_TYPE;
  /** Prefix for filter value */
  prefix?: string | JSX.Element;
  /** Suffix for filter value */
  suffix?: string | JSX.Element;
  /** User-filled value */
  value?: string;
  /** Not allow to handle change filter */
  disabled?: boolean;
  /** Placeholder of the component */
  placeHolder?: string;
  /** Use to custom style the component */
  className?: string;
  /** Set maximum length of value filter */
  maxLength?: number;
  /** Control the size of the component */
  isSmall?: boolean;
  /** Handle the change value filter of the component */
  onChange?: (T: string | null) => void;
  /** Handle onEnter action */
  onEnter?: (T: string | null) => void;
  /** Handle onBlur action */
  onBlur?: (T: string | null) => void;
  /** Handle onKeyDown action */
  onKeyDown?: (event: any) => void;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
}

const AdvanceStringFilter = React.forwardRef(
  (props: AdvanceStringFilterProps, ref: React.Ref<any>) => {
    const {
      label,
      type,
      prefix,
      suffix,
      maxLength,
      value,
      disabled,
      placeHolder,
      className,
      isSmall,
      bgColor,
      onChange,
      onEnter,
      onBlur,
      onKeyDown,
    } = props;

    const [internalValue, setInternalValue] = React.useState<string>("");

    const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
      null
    );

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (
          !maxLength ||
          (maxLength && event.target.value.length <= maxLength)
        ) {
          setInternalValue(event.target.value);
          if (typeof onChange === "function") {
            onChange(event.target.value);
          }
        }
      },
      [onChange, maxLength]
    );

    const handleClearInput = React.useCallback(
      (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
        setInternalValue("");
        if (inputRef && inputRef.current) {
          inputRef.current.focus();
        }
        if (typeof onChange === "function") {
          onChange(null);
          return;
        }
      },
      [onChange]
    );

    const handleKeyPress = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          if (typeof onEnter === "function") {
            onEnter(event.currentTarget.value);
          }
        }
      },
      [onEnter]
    );

    const handleKeyDown = React.useCallback(
      (event) => {
        if (typeof onKeyDown === "function") {
          onKeyDown(event);
        }
      },
      [onKeyDown]
    );

    const handleBlur = React.useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (typeof onBlur === "function") {
          onBlur(event.currentTarget.value);
        }
      },
      [onBlur]
    );

    React.useEffect(() => {
      if (value) {
        setInternalValue(value);
      } else {
        setInternalValue("");
      }
    }, [value]);

    return (
      <div className={classNames("advance-string-filter__wrapper", className)}>
        <div className="advance-string-filter__label m-b--3xs">
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
        <div
          className={classNames(
            "component__input advance-string-filter__container",
            {
              "advance-string-filter__container--sm": isSmall,
              "advance-string-filter__container--white": bgColor === "white",
              "p-y--2xs": isSmall,
              "p-x--xs": isSmall,
              "p--xs": !isSmall,
              "advance-string-filter--material": type === BORDER_TYPE.MATERIAL,
              "advance-string-filter--disabled ": disabled,
              "advance-string-filter--float": type === BORDER_TYPE.FLOAT_LABEL,
            }
          )}
          ref={ref}
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          {prefix && (
            <>
              {typeof prefix === "string" ? (
                <span className="p-r--2xs advance-string-filter__string">
                  {prefix}
                </span>
              ) : (
                <div className="m-r--xs advance-string-filter__icon">
                  {prefix}
                </div>
              )}
            </>
          )}
          <input
            type="text"
            value={internalValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={
              type === BORDER_TYPE.FLOAT_LABEL && label ? " " : placeHolder
            }
            ref={inputRef}
            disabled={disabled}
            className={classNames("component__input", {
              "disabled-field": disabled,
            })}
          />
          {type === BORDER_TYPE.FLOAT_LABEL && label && (
            <label
              className={classNames("component__title", {
                "component__title--normal": !prefix,
                "component__title--prefix": prefix,
                "component__title--sm": isSmall,
              })}
            >
              {label}
            </label>
          )}
          {internalValue && !disabled && (
            <div className={classNames("input-icon__clear", "m-l--2xs")}>
              <CloseFilled size={16} onClick={handleClearInput} />
            </div>
          )}
          {suffix && (
            <>
              {typeof suffix === "string" ? (
                <span className="body-text--md m-l--2xs">{suffix}</span>
              ) : (
                <div className="m-l--2xs">{suffix}</div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

AdvanceStringFilter.defaultProps = {
  label: "",
  isSmall: false,
  type: BORDER_TYPE.BORDERED,
  prefix: "",
  disabled: false,
  className: "",
  maxLength: 0,
  bgColor: "white",
};

export default AdvanceStringFilter;
