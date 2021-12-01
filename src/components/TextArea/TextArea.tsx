import React, { RefObject } from "react";
import "./TextArea.scss";
import classNames from "classnames";

interface TextAreaAction {
  name?: string;
  action?: any;
}

export enum TEXT_AREA_TYPE {
  MATERIAL,
  BORDERED,
  FLOAT_LABEL,
}


interface TextAreaProps {
  label?: string;
  type?: TEXT_AREA_TYPE;
  isRequired?: boolean;
  floatLabel?: boolean;
  isMaterial?: boolean;
  value?: string;
  disabled?: boolean;
  placeHolder?: string;
  className?: string;
  showCount?: boolean;
  maxLength?: number;
  action?: TextAreaAction;
  onChange?: (T: string | null) => void;
  onEnter?: (T: string | null) => void;
  onBlur?: (T: string | null) => void;
}

function TextArea(props: TextAreaProps) {
  const {
    action,
    label,
    isRequired,
    type,
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

  const inputRef: RefObject<HTMLTextAreaElement> = React.useRef<
    HTMLTextAreaElement
  >(null);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (event.target.value.length <= maxLength) {
        setInternalValue(event.target.value);
        if (typeof onChange === "function") {
          onChange(event.currentTarget.value);
        }
      }
    },
    [onChange, maxLength],
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
  const handleBlur = React.useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (typeof onBlur === "function") {
      onBlur(value);
    }
  }, [onBlur]);

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setInternalValue("");
      if (typeof onChange === "function") {
        onChange(null);
      }
      inputRef.current.focus();
    },
    [onChange],
  );

  React.useEffect(() => {
    if (value) {
      setInternalValue(value);
    } else {
      setInternalValue("");
    }
  }, [value]);

  return (
    <>
      <div className={classNames("text-area__wrapper", className)}>
        <div className="text-area__label m-b--xxxs">
          {type !== TEXT_AREA_TYPE.FLOAT_LABEL && label && (
            <label className="component__title">
              {label}
              {isRequired && <span className="text-danger">&nbsp;*</span>}
            </label>
          )}
          <span style={{ width: "100%" }}></span>
          {showCount && maxLength > 0 && (
            <span className="text-area__count p-l--xs body-text--xs">
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
            "component__input text-area__container p-x--xs p-x--xxs p-y--xxs p-y--xs bg-white",
            {
              "text-area--material": type === TEXT_AREA_TYPE.MATERIAL,
              "text-area--disabled ": disabled,
              "text-area--float": type === TEXT_AREA_TYPE.FLOAT_LABEL,
            }
          )}
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          <textarea
            value={internalValue}
            onChange={handleChange}
            onKeyDown={() => handleKeyPress}
            onBlur={handleBlur}
            placeholder={
              type === TEXT_AREA_TYPE.FLOAT_LABEL && label ? " " : placeHolder
            }
            ref={inputRef}
            disabled={disabled}
            className={classNames("component__input", {
              "disabled-field": disabled,
            })}
          ></textarea>
          {type === TEXT_AREA_TYPE.FLOAT_LABEL && label && (
            <label
              className="component__title"
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
        </div>
      </div>
    </>
  );
}

TextArea.defaultProps = {
  label: "",
  type: TEXT_AREA_TYPE.BORDERED,
  isRequired: false,
  prefix: "",
  disabled: false,
  className: "",
  countWord: false,
  maxLength: 2000,
};

export default TextArea;
