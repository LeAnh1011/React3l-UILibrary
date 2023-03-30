import { Tooltip } from "antd";
import classNames from "classnames";
import React, { ReactNode, RefObject } from "react";
import "./InputView.scss";

export interface InputAction {
  name?: ReactNode;
  action?: any;
}
export enum BORDER_TYPE {
  MATERIAL,
  BORDERED,
  FLOAT_LABEL,
  NOT_BORDERED,
}

export interface InputViewProps {
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
  action?: InputAction;
  bgColor?: "white" | "gray";
}

const InputView = React.forwardRef(
  (props: InputViewProps, ref: React.Ref<any>) => {
    const {
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
          <span style={{ width: "100%" }}></span>
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
                disabled
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
  isRequired: false,
  prefix: "",
  className: "",
  maxLength: 0,
  bgColor: "white"
};

export default InputView;
