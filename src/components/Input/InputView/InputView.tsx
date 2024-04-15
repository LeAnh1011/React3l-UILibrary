import { Tooltip } from "antd";
import classNames from "classnames";
import React, { ReactNode, RefObject } from "react";
import "./InputView.scss";
import { BORDER_TYPE } from "@Configs/enum";

export interface InputAction {
  name?: ReactNode;
  action?: any;
}

export interface InputViewProps {
  /**Label for current field*/
  label?: string;
  /**Control the style type of component: MATERIAL, BORDERED, FLOAT_LABEL, NOT_BORDERED */
  type?: BORDER_TYPE;
  /**Prefix for filter value*/
  prefix?: string | JSX.Element;
  /**Show * as require field */
  isRequired?: boolean;
  //**Disable field */
  disabled?: boolean;
  /**Suffix for filter value*/
  suffix?: string | JSX.Element;
  /**User-filled value*/
  value?: string;
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
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
}

const InputView = React.forwardRef(
  (props: InputViewProps, ref: React.Ref<any>) => {
    const {
      label,
      type,
      prefix,
      suffix,
      showCount,
      maxLength,
      value,
      placeHolder,
      className,
      isSmall,
      bgColor,
      isRequired,
      disabled,
    } = props;

    const [internalValue, setInternalValue] = React.useState<string>("");

    const [isShowToolTip, setIsShowToolTip] = React.useState(false);

    const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
      null
    );

    const divRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
      null
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
      <div className={classNames("input-view__wrapper", className)}>
        <div className="input-view__label m-b--3xs">
          {type !== BORDER_TYPE.FLOAT_LABEL && label && (
            <label
              className={classNames("component__title", {
                "component__title--disabled": disabled,
              })}
            >
              {label}
              {isRequired && <span className="view-danger">&nbsp;*</span>}
            </label>
          )}
          {showCount && maxLength > 0 && (
            <span className="input-view__count p-l--xs body-text--xs">
              {internalValue.length}/{maxLength}
            </span>
          )}
        </div>
        <div
          className={classNames("component__input input-view__container", {
            "input-view__container--sm": isSmall,
            "input-view__container--white": bgColor === "white",
            "p-y--2xs": isSmall,
            "p-x--xs": isSmall,
            "p--xs": !isSmall,
            "input-view--material": type === BORDER_TYPE.MATERIAL,
            "input-view--not__bordered": type === BORDER_TYPE.NOT_BORDERED,
            "input-view--disabled ": disabled,
            "input-view--float": type === BORDER_TYPE.FLOAT_LABEL,
          })}
          ref={ref}
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          {prefix && (
            <>
              {typeof prefix === "string" ? (
                <span className="p-r--2xs input-view__string">{prefix}</span>
              ) : (
                <div className="m-r--xs input-view__icon">{prefix}</div>
              )}
            </>
          )}
          <Tooltip title={isShowToolTip ? internalValue : undefined}>
            <div style={{ flexGrow: 1 }}>
              <input
                type="view"
                value={internalValue}
                placeholder={
                  type === BORDER_TYPE.FLOAT_LABEL && label ? " " : placeHolder
                }
                ref={inputRef}
                readOnly
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
              {isRequired && <span className="view-danger">&nbsp;*</span>}
            </label>
          )}
          {suffix && (
            <>
              {typeof suffix === "string" ? (
                <span className="m-l--2xs input-view__string">{suffix}</span>
              ) : (
                <div className="m-l--2xs input-view__icon">{suffix}</div>
              )}
            </>
          )}
        </div>
        <div className="input-view__hidden" ref={divRef}>
          {internalValue}
        </div>
      </div>
    );
  }
);

InputView.defaultProps = {
  label: "",
  isSmall: false,
  type: BORDER_TYPE.MATERIAL,
  prefix: "",
  className: "",
  isRequired: false,
  maxLength: 0,
  bgColor: "white",
};

export default InputView;
