import classNames from "classnames";
import { CloseFilled16 } from "@carbon/icons-react";
import { BORDER_TYPE } from "config/enum";
import React, { ReactSVGElement, RefObject } from "react";
import "./AdvanceStringFilter.scss";

interface AdvanceStringFilterAction {
  name?: string;
  action?: any;
}

export interface AdvanceStringFilterProps {
  label?: string;
  type?: BORDER_TYPE;
  isRequired?: boolean;
  floatLabel?: boolean;
  isMaterial?: boolean;
  prefix?: string | JSX.Element;
  suffix?: string | JSX.Element;
  value?: string;
  disabled?: boolean;
  placeHolder?: string;
  className?: string;
  showCount?: boolean;
  maxLength?: number;
  isSmall?: boolean;
  action?: AdvanceStringFilterAction;
  onChange?: (T: string | null) => void;
  onEnter?: (T: string | null) => void;
  onBlur?: (T: string | null) => void;
  onKeyDown?: (event: any) => void;
}

const AdvanceStringFilter = React.forwardRef(
  (props: AdvanceStringFilterProps, ref: React.Ref<any>) => {
    const {
      action,
      label,
      isRequired,
      type,
      prefix,
      suffix,
      showCount,
      maxLength,
      value,
      disabled,
      placeHolder,
      className,
      isSmall,
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
        <div className="advance-string-filter__label m-b--xxxs">
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
          {showCount && maxLength > 0 && (
            <span className="input-text__count p-l--xs body-text--xs">
              {internalValue.length}/{maxLength}
            </span>
          )}
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
        <div
          className={classNames(
            "component__input advance-string-filter__container",
            {
              "advance-string-filter__container--sm": isSmall,
              "p-y--xxs": isSmall,
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
                <span className="p-r--xxs">{prefix}</span>
              ) : (
                <>{prefix}</>
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
              {isRequired && <span className="text-danger">&nbsp;*</span>}
            </label>
          )}
          {internalValue && !disabled && (
            <div style={{ width: "16px", height: "20px" }} className="m-l--xxs">
              <CloseFilled16
                className={classNames("input-icon__clear")}
                onClick={handleClearInput}
              ></CloseFilled16>
            </div>
          )}
          {suffix && (
            <>
              {typeof suffix === "string" ? (
                <span className="body-text--md m-l--xxs">{suffix}</span>
              ) : (
                <div className="m-l--xxs">{suffix}</div>
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
  isRequired: false,
  prefix: "",
  disabled: false,
  className: "",
  maxLength: 0,
};

export default AdvanceStringFilter;
