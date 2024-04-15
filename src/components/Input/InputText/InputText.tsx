import classNames from "classnames";
import { BORDER_TYPE } from "@Configs/enum";
import React, { ReactNode, ReactSVGElement, RefObject } from "react";
import { CloseFilled } from "@carbon/icons-react";
import { Tooltip } from "antd";
import "./InputText.scss";

export interface InputAction {
  name?: ReactNode;
  action?: any;
}

export interface InputTextProps {
  /**Label for current field*/
  label?: string;
  /**Control the style type of component: MATERIAL, BORDERED, FLOAT_LABEL */
  type?: BORDER_TYPE;
  /**Option to set password field */
  typeInput?: "text" | "password";
  /**Show symbol * as required field*/
  isRequired?: boolean;
  /**Prefix for filter value*/
  prefix?: string | JSX.Element;
  /**Suffix for filter value*/
  suffix?: string | JSX.Element;
  /**User-filled value*/
  value?: string;
  /**Not allow to handle change value*/
  disabled?: boolean;
  /**Read only field*/
  readOnly?: boolean;
  /**Placeholder of the component*/
  placeHolder?: string;
  /**Use to custom style the component*/
  className?: string;
  /**Boolean to show the lenght of value user-filled*/
  showCount?: boolean;
  /**Set maximum length of value*/
  maxLength?: number;
  /**Control the size of the component*/
  isSmall?: boolean;
  /**Provide a custom action (onClick) to the component*/
  action?: InputAction;
  /**Handle the change value of the field*/
  onChange?: (T: string | null) => void;
  /**Handle onEnter action*/
  onEnter?: (T: string | null) => void;
  /**Handle onBlur action*/
  onBlur?: (T: string | null) => void;
  /**Handle onKeyDown action*/
  onKeyDown?: (event: any) => void;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
  autoComplete?: boolean;
  nameAttr?: string;
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
      readOnly,
      placeHolder,
      className,
      isSmall,
      bgColor,
      typeInput,
      onChange,
      onEnter,
      onBlur,
      onKeyDown,
      nameAttr,
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
                autoComplete="new-password"
                name={nameAttr}
                readOnly={readOnly}
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
          {internalValue && !disabled && !readOnly && (
            <div className={classNames("input-icon__clear", "m-l--2xs")}>
              <CloseFilled size={16} onClick={handleClearInput} />
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
  readOnly: false,
  className: "",
  maxLength: 0,
  typeInput: "text",
};

export default InputText;
