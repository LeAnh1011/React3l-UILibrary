import classNames from "classnames";
import { BORDER_TYPE } from "@Configs/enum";
import React, { ReactNode, ReactSVGElement, RefObject } from "react";
import CloseFilled16 from "@carbon/icons-react/es/close--filled/16";
import { Tooltip } from "antd";
import "./InputText.scss";

export interface InputAction {
  name?: ReactNode;
  action?: any;
}

export interface InputTextProps {
  label?: string;
  type?: BORDER_TYPE;
  typeInput?: 'text' | 'password';
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
  action?: InputAction;
  bgColor?: "white" | "gray";
  onChange?: (T: string | null) => void;
  onEnter?: (T: string | null) => void;
  onBlur?: (T: string | null) => void;
  onKeyDown?: (event: any) => void;
}

const InputText = React.forwardRef(
  (props: InputTextProps, ref: React.Ref<any>) => {
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
      bgColor,
      typeInput,
      onChange,
      onEnter,
      onBlur,
      onKeyDown,
    } = props;

    const [internalValue, setInternalValue] = React.useState<string>("");

    const [isShowToolTip, setIsShowToolTip] = React.useState(false);

    const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
      null
    );

    const divRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
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

    React.useEffect(() => {
      if (internalValue) {
        const inputElm = inputRef.current;
        const divElm = divRef.current;
        if (divElm.clientWidth >= inputElm.clientWidth) {
          setIsShowToolTip(true);
        } else {
          setIsShowToolTip(false);
        }
      }
    }, [internalValue]);

    return (
      <div className={classNames("input-text__wrapper", className)}>
        <div className="input-text__label m-b--3xs">
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
          <div className="label__right">
            {showCount && maxLength > 0 && (
              <span className="input-text__count p-l--xs body-text--xs">
                {internalValue.length}/{maxLength}
              </span>
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
        </div>
        <div
          className={classNames("component__input input-text__container", {
            "input-text__container--sm": isSmall,
            "input-text__container--white": bgColor === "white",
            "p-y--2xs": isSmall,
            "p-x--xs": isSmall,
            "p--xs": !isSmall,
            "input-text--material": type === BORDER_TYPE.MATERIAL,
            "input-text--disabled ": disabled,
            "input-text--float": type === BORDER_TYPE.FLOAT_LABEL,
          })}
          ref={ref}
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          {prefix && (
            <>
              {typeof prefix === "string" ? (
                <span className="p-r--2xs input-text__string">{prefix}</span>
              ) : (
                <div className="m-r--xs input-text__icon">{prefix}</div>
              )}
            </>
          )}
          <Tooltip title={isShowToolTip ? internalValue : undefined}>
            <div style={{ flexGrow: 1 }}>
              <input
                type={typeInput}
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
            </div>
          </Tooltip>
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
            <div className={classNames("input-icon__clear", "m-l--2xs")}>
              <CloseFilled16 onClick={handleClearInput}></CloseFilled16>
            </div>
          )}
          {suffix && (
            <>
              {typeof suffix === "string" ? (
                <span className="m-l--2xs input-text__string">{suffix}</span>
              ) : (
                <div className="m-l--2xs input-text__icon">{suffix}</div>
              )}
            </>
          )}
        </div>
        <div className="input-text__hidden" ref={divRef}>
          {internalValue}
        </div>
      </div>
    );
  }
);

InputText.defaultProps = {
  label: "",
  isSmall: false,
  type: BORDER_TYPE.BORDERED,
  isRequired: false,
  prefix: "",
  disabled: false,
  className: "",
  maxLength: 0,
  typeInput: "text"
};

export default InputText;
