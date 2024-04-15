import React, { RefObject } from "react";
import classNames from "classnames";
import { BORDER_TYPE } from "@Configs/enum";
import "./TextArea.scss";

export interface TextAreaAction {
  name?: string;
  action?: any;
}

export interface TextAreaProps {
  /**Label for current field*/
  label?: string;
  /**Control the style type of component: MATERIAL, BORDERED, FLOAT_LABEL */
  type?: BORDER_TYPE;
  /**Show symbol * as required field*/
  isRequired?: boolean;
  /**User-filled value*/
  value?: string;
  /**Not allow to handle change value*/
  disabled?: boolean;
  /**Placeholder of the component*/
  placeHolder?: string;
  /**Use to custom style the component*/
  className?: string;
  /**Boolean to show the lenght of value user-filled*/
  showCount?: boolean;
  /**Set maximum length of value*/
  maxLength?: number;
  /**Provide a custom action (onClick) to the component*/
  action?: TextAreaAction;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
  /**Handle the change value of the field*/
  onChange?: (T: string | null) => void;
  /**Handle onEnter action*/
  onEnter?: (T: string | null) => void;
  /**Handle onBlur action*/
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
    bgColor,
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
      if (event.target.value.replaceAll("\n","")?.length <= maxLength) {
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
        <div className="text-area__label m-b--3xs">
          {type !== BORDER_TYPE.FLOAT_LABEL && label && (
            <label className="component__title">
              {label}
              {isRequired && <span className="text-danger">&nbsp;*</span>}
            </label>
          )}
          <div className="label__right">
            {showCount && maxLength > 0 && (
              <span className="text-area__count p-l--xs body-text--xs">
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
          className={classNames(
            "component__input text-area__container p-l--xs p-r--2xs p-b--2xs p-t--xs",
            {
              "text-area--white": bgColor === "white",
              "text-area--disabled ": disabled,
              "text-area--material": type === BORDER_TYPE.MATERIAL,
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
  label: "",
  type: BORDER_TYPE.BORDERED,
  isRequired: false,
  prefix: "",
  disabled: false,
  className: "",
  countWord: false,
  maxLength: 2000,
};

export default TextArea;
