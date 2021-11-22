import classNames from "classnames";
import React, { RefObject } from "react";
import "./InputText.scss";

interface InputTextAction {
  name?: string;
  action?: any;
}

export enum INPUT_TEXT_TYPE {
  MATERIAL,
  BORDERED,
  FLOAT_LABEL,
}

interface InputTextProps {
  label?: string;
  type?: INPUT_TEXT_TYPE;
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
  action?: InputTextAction;
  onChange?: (T: string | null) => void;
  onEnter?: (T: string | null) => void;
  onBlur?: (T: string | null) => void;
}

function InputText(props: InputTextProps) {
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
  } = props;

  const [internalValue, setInternalValue] = React.useState<string>("");

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    null
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!maxLength || (maxLength && event.target.value.length <= maxLength)) {
        setInternalValue(event.target.value);
        if (typeof onChange === "function") {
          onChange(event.target.value);
        }
      }
    },
    [onChange, maxLength]
  );

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
    <div className={classNames("input-text__wrapper", className)}>
      <div className="input-text__label m-b--xxxs">
        {type !== INPUT_TEXT_TYPE.FLOAT_LABEL && label && (
          <label className="component__title">
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
          "component__input input-text__container p--xs bg-white",
          {
            "input-text__container--sm": isSmall,
            "py--xxs": isSmall,
            "px--xs": isSmall,
            "p--xs": !isSmall,
            "input-text--material": type === INPUT_TEXT_TYPE.MATERIAL,
            "input-text--disabled ": disabled,
            "input-text--float": type === INPUT_TEXT_TYPE.FLOAT_LABEL,
          }
        )}
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
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
          placeholder={
            type === INPUT_TEXT_TYPE.FLOAT_LABEL && label ? " " : placeHolder
          }
          ref={inputRef}
          disabled={disabled}
          className={classNames("component__input", {
            "disabled-field": disabled,
          })}
        />
        {type === INPUT_TEXT_TYPE.FLOAT_LABEL && label && (
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
          <i
            className={classNames(
              "input-icon__clear",
              "m-l--xs",
              "tio-clear_circle"
            )}
            onClick={handleClearInput}
          ></i>
        )}
        {suffix && (
          <>
            {typeof suffix === "string" ? (
              <span className="body-text--md m-l--xs">{suffix}</span>
            ) : (
              <div className="m-l--xs">{suffix}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

InputText.defaultProps = {
  label: "",
  isSmall: false,
  type: INPUT_TEXT_TYPE.BORDERED,
  isRequired: false,
  prefix: "",
  disabled: false,
  className: "",
  countWord: false,
  maxLength: 0,
};

export default InputText;
