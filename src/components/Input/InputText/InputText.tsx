import classNames from "classnames";
import React, { ReactNode, RefObject } from "react";
import "./InputText.scss";

interface InputTextAction {
  name?: string;
  action?: any;
}

interface InputTextProps {
  label?: string;
  floatLabel?: boolean;
  isRequired?: boolean;
  isMaterial?: boolean;
  prefix?: string | ReactNode;
  value?: string;
  disabled?: boolean;
  placeHolder?: string;
  className?: string;
  showCount?: boolean;
  maxLength?: number;
  onChange?: (T: string | null) => void;
  onEnter?: (T: string | null) => void;
  onBlur?: (T: string | null) => void;
  action?: InputTextAction;
}

function InputText(props: InputTextProps) {
  const {
    action,
    label,
    floatLabel,
    isMaterial,
    isRequired,
    prefix,
    showCount,
    maxLength,
    value,
    disabled,
    placeHolder,
    className,
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
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className="input-text__label m-b--xxxs">
        {!floatLabel && label &&
          <label className='component__title'>
            {label}
            {isRequired && <span className="text-danger">&nbsp;*</span>}
          </label>
        }
        <span style={{ width: "100%" }}></span>
        {showCount && maxLength > 0 && (
          <span className="input-text__count p-l--xs body-text--xs">{internalValue.length}/{maxLength}</span>
        )}
        {action &&
          <span className="m-l--xxxs body-text--md color-link" onClick={action.action}>{action.name}</span>
        }
      </div>
      <div className={classNames("component__input input-text__container p--xs bg-white", {
        "input-text--material": isMaterial,
        "input-text--disabled ": disabled,
        "input-text--float": floatLabel,
      })}>
        {prefix && (
          <>
            {typeof prefix === "string" ? (
              <span className="p-r--xxs">{prefix}</span>
            ) : (<>{prefix}</>)}
          </>
        )}
        <input
          type="text"
          value={internalValue}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
          placeholder={floatLabel && label ? label : placeHolder}
          ref={inputRef}
          disabled={disabled}
          className={classNames("component__input", {
            "disabled-field": disabled,
          })}
        />
        {floatLabel && label &&
          <label className='component__title component__title--float'>
            {label}
            {isRequired && <span className="text-danger">&nbsp;*</span>}
          </label>
        }
        {internalValue && !disabled ? (
          <i
            className="input-icon tio-clear p-l--xxs"
            onClick={handleClearInput}
          ></i>
        ) : (
          className && (
            <i
              className={classNames(
                "input-icon",
                "input-text__icon",
                className
              )}
            ></i>
          )
        )}
      </div>
    </div>
  );
}

InputText.defaultProps = {
  label: "",
  floatLabel: false,
  isRequired: false,
  isMaterial: false,
  prefix: "",
  disabled: false,
  className: "",
  countWord: false,
  maxLength: 0,
};

export default InputText;
