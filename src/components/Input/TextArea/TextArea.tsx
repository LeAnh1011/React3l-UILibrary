import React, { RefObject } from "react";
import "./TextArea.scss";
import classNames from "classnames";
import { BORDER_TYPE } from "config/enum";

export interface TextAreaAction {
  name?: string;
  action?: any;
}

export interface TextAreaProps {
  label?: string;
  type?: BORDER_TYPE;
  isRequired?: boolean;
  value?: string;
  disabled?: boolean;
  placeHolder?: string;
  className?: string;
  showCount?: boolean;
  maxLength?: number;
  /**
   * export interface TextAreaAction {
      name?: string;
        action?: any;
      }
   * 
  */
  action?: TextAreaAction;
  onChange?: (T: string | null) => void;
  onEnter?: (T: string | null) => void;
  onBlur?: (T: string | null) => void;
}

export function TextArea(props: TextAreaProps) {
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

  const inputRef: RefObject<HTMLTextAreaElement> = React.useRef<HTMLTextAreaElement>(
    null
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (event.target.value.length <= maxLength) {
        setInternalValue(event.target.value);
        if (typeof onChange === "function") {
          onChange(event.currentTarget.value);
        }
      }
    },
    [onChange, maxLength]
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
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      const value = event.target.value;
      if (typeof onBlur === "function") {
        onBlur(value);
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
    <>
      <div className={classNames("text-area__wrapper", className)}>
        <div className="text-area__label m-b--xxxs">
          {type !== BORDER_TYPE.FLOAT_LABEL && label && (
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
            "component__input text-area__container p-l--xs p-r--xxs p-b--xxs p-t--xs",
            {
              "text-area--material": type === BORDER_TYPE.MATERIAL,
              "text-area--disabled ": disabled,
              "text-area--float": type === BORDER_TYPE.FLOAT_LABEL,
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
              type === BORDER_TYPE.FLOAT_LABEL && label ? " " : placeHolder
            }
            ref={inputRef}
            disabled={disabled}
            className={classNames("component__input", {
              "disabled-field": disabled,
            })}
          ></textarea>
          {type === BORDER_TYPE.FLOAT_LABEL && label && (
            <label className="component__title">
              {label}
              {isRequired && <span className="text-danger">&nbsp;*</span>}
            </label>
          )}
        </div>
      </div>
    </>
  );
}

TextArea.defaultProps = {
  type: BORDER_TYPE.BORDERED,
  isRequired: false,
  disabled: false,
  countWord: false,
  maxLength: 2000,
};

export default TextArea;
