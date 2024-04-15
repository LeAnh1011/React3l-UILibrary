import classNames from "classnames";
import React, { ReactSVGElement, RefObject } from "react";
import { CloseFilled } from "@carbon/icons-react";
import { ReactNode } from "react";
import { BORDER_TYPE, NUMBER_TYPE } from "@Configs/enum";
import "./InputNumber.scss";

interface InputNumberAction {
  name?: string;
  action?: any;
}

export interface InputNumberProps {
  /**Label for current field*/
  label?: string;
  /**Show symbol * as required field*/
  isRequired?: boolean;
  /**Control the style type of component: MATERIAL, BORDERED, FLOAT_LABEL */
  type?: BORDER_TYPE;
  /**User-filled value*/
  value?: number;
  /**Prefix for filter value*/
  prefix?: string | ReactNode;
  /**Suffix for filter value*/
  suffix?: string | ReactNode;
  /**Allow value to be negative or not*/
  allowNegative?: boolean;
  /**Provide an option set decimal number type for value*/
  numberType?: NUMBER_TYPE;
  /**Reverse symbol “.” and “,”*/
  isReverseSymb?: boolean;
  /**Provide a length of number behind the point (character)*/
  decimalDigit?: number;
  /**Placeholder of the component*/
  placeHolder?: string;
  /**Not allow to handle change value*/
  disabled?: boolean /**Not allow to handle change value*/;
  /**Read only field*/
  readOnly?: boolean;
  /**Use to custom style the component*/
  className?: string;
  /**Min of the value number*/
  min?: number;
  /**Max of the value number*/
  max?: number;
  /** Provide a custom action (onClick) to the component */
  action?: InputNumberAction;
  /**Control the size of the component*/
  isSmall?: boolean;
  /**Handle the change value of the component*/
  onChange?: (T: number) => void;
  /**Handle onEnter action*/
  onEnter?: (T: number) => void;
  /**Handle onBlur action*/
  onBlur?: (T: number) => void;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
}

function InputNumber(props: InputNumberProps) {
  const {
    action,
    label,
    isRequired,
    type,
    prefix,
    suffix,
    value,
    allowNegative,
    numberType,
    decimalDigit,
    isReverseSymb,
    placeHolder,
    className,
    disabled,
    readOnly,
    min,
    max,
    isSmall,
    bgColor,
    onChange,
    onEnter,
    onBlur,
  } = props;

  const [internalValue, setInternalValue] = React.useState<string>("");

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    null
  );

  const cursorPosition = React.useRef({ selectionStart: 0, selectionEnd: 0 });

  const buildRegex = React.useCallback(() => {
    var regExDecimal = "";
    var regExString = "";
    for (let i = 1; i <= decimalDigit; i++) {
      regExDecimal += "\\d";
    }
    if (isReverseSymb) {
      regExString = "(\\d)(?=(?:\\d{3})+(?:,|$))|(," + regExDecimal + "?)\\d*$";
    } else {
      regExString =
        "(\\d)(?=(?:\\d{3})+(?:\\.|$))|(\\." + regExDecimal + "?)\\d*$";
    }
    return new RegExp(regExString, "g");
  }, [decimalDigit, isReverseSymb]);

  const formatString = React.useCallback(
    (inputValue: string): string => {
      const newRegEx = buildRegex();
      if (isReverseSymb) {
        switch (numberType) {
          case NUMBER_TYPE.DECIMAL:
            if (allowNegative) {
              inputValue = inputValue
                .replace(/^(-00)/gm, "-0")
                .replace(/^(00)/gm, "0")
                .replace(/[^0-9,-]/g, "")
                .replace(",", "x")
                .replace(/,/g, "")
                .replace("x", ",")
                .replace(/(?!^)-/g, "");
            } else {
              inputValue = inputValue
                .replace(/^(00)/gm, "0")
                .replace(/[^0-9,]/g, "")
                .replace(",", "x")
                .replace(/,/g, "")
                .replace("x", ",");
            }
            return inputValue.replace(newRegEx, (m, s1, s2) => {
              return s2 || s1 + ".";
            });
          default:
            if (allowNegative) {
              inputValue = inputValue
                .replace(/^(-00)/gm, "-0")
                .replace(/^(00)/gm, "0")
                .replace(/[^0-9-]/g, "")
                .replace(/(?!^)-/g, "");
            } else {
              inputValue = inputValue
                .replace(/^(00)/gm, "0")
                .replace(/[^0-9]/g, "");
            }
            return inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
      } else {
        switch (numberType) {
          case NUMBER_TYPE.DECIMAL:
            if (allowNegative) {
              inputValue = inputValue
                .replace(/^(-00)/gm, "-0")
                .replace(/^(00)/gm, "0")
                .replace(/[^0-9.-]/g, "")
                .replace(".", "x")
                .replace(/\./g, "")
                .replace("x", ".")
                .replace(/(?!^)-/g, "");
            } else {
              inputValue = inputValue
                .replace(/^(00)/gm, "0")
                .replace(/[^0-9.]/g, "")
                .replace(".", "x")
                .replace(/\./g, "")
                .replace("x", ".");
            }
            return inputValue.replace(newRegEx, (m, s1, s2) => {
              return s2 || s1 + ",";
            });
          default:
            if (allowNegative) {
              inputValue = inputValue
                .replace(/^(-00)/gm, "-0")
                .replace(/^(00)/gm, "0")
                .replace(/[^0-9-]/g, "")
                .replace(/(?!^)-/g, "");
            } else {
              inputValue = inputValue
                .replace(/^(00)/gm, "0")
                .replace(/[^0-9]/g, "");
            }
            return inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }
    },
    [isReverseSymb, numberType, buildRegex, allowNegative]
  );

  const parseNumber = React.useCallback(
    (value: string): [number, boolean] => {
      var isOutOfRange, number, stringValue;
      if (value) {
        if (isReverseSymb) {
          stringValue = value.replace(/[,.]/g, (m) => (m === "." ? "," : "."));
          stringValue = stringValue.replace(/,/g, "");
        } else {
          stringValue = value.replace(/,/g, "");
        }
        switch (numberType) {
          case NUMBER_TYPE.DECIMAL:
            number = parseFloat(stringValue);
            isOutOfRange =
              (typeof max === "number" && number > max) ||
              (typeof min === "number" && number < min)
                ? true
                : false;
            return [number, isOutOfRange];
          default:
            number = parseInt(stringValue);
            isOutOfRange =
              (typeof max === "number" && number > max) ||
              (typeof min === "number" && number < min)
                ? true
                : false;
            return [number, isOutOfRange];
        }
      } else {
        return [undefined, false];
      }
    },
    [numberType, isReverseSymb, min, max]
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { selectionEnd, selectionStart } = event.target;
      const stringValue = formatString(event.target.value);
      const [numberValue, isOutOfRange] = parseNumber(stringValue);
      if (!isOutOfRange) {
        if (typeof onChange === "function") {
          const isSpecialLetter =
            (/[-,.]/g.test(Array.from(stringValue)[0]) &&
              stringValue.length === 1) ||
            (/^(-0.?)/g.test(stringValue) && stringValue.length <= 3);
          if (!isSpecialLetter) {
            onChange(numberValue);
          }
        }
        setInternalValue(stringValue);
      }
      if (event.target.value.length < stringValue.length) {
        cursorPosition.current.selectionStart = selectionStart + 1;
        cursorPosition.current.selectionEnd = selectionEnd + 1;
      } else {
        cursorPosition.current.selectionStart = selectionStart;
        cursorPosition.current.selectionEnd = selectionEnd;
      }
    },
    [formatString, parseNumber, onChange]
  );

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      setInternalValue("");
      inputRef.current.focus();
      if (typeof onChange === "function") {
        onChange(undefined);
        return;
      }
      if (typeof onBlur === "function") {
        onBlur(undefined);
        return;
      }
      if (typeof onEnter === "function") {
        onEnter(undefined);
        return;
      }
    },
    [onBlur, onChange, onEnter]
  );

  const handleKeyPress = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        if (typeof onEnter === "function") {
          onEnter(parseNumber(event.currentTarget.value)[0]);
        }
      }
    },
    [onEnter, parseNumber]
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (typeof onBlur === "function") {
        onBlur(parseNumber(event.currentTarget.value)[0]);
      }
    },
    [onBlur, parseNumber]
  );

  React.useEffect(() => {
    if (value != null) {
      var stringValue = "" + value;
      if (isReverseSymb) {
        stringValue = stringValue.replace(/\./g, ",");
      }
      setInternalValue(formatString(stringValue));
    } else {
      setInternalValue("");
    }
    inputRef.current.selectionStart = cursorPosition.current.selectionStart;
    inputRef.current.selectionEnd = cursorPosition.current.selectionEnd;
  }, [value, formatString, isReverseSymb]);

  return (
    <div className={classNames("input-number__wrapper", className)}>
      <div className="input-number__label m-b--3xs">
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
      <div
        className={classNames(
          "component__input input-number__container p--xs",
          {
            "input-number__container--sm": isSmall,
            "input-number__container--white": bgColor === "white",
            "py--2xs": isSmall,
            "px--xs": isSmall,
            "p--xs": !isSmall,
            "input-number--material": type === BORDER_TYPE.MATERIAL,
            "input-number--disabled ": disabled,
            "input-number--float": type === BORDER_TYPE.FLOAT_LABEL,
          }
        )}
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        {prefix && (
          <>
            {typeof prefix === "string" ? (
              <span className="p-r--2xs">{prefix}</span>
            ) : (
              <div className="m-r--xs input-number__icon">{prefix}</div>
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
            type === BORDER_TYPE.FLOAT_LABEL && label ? " " : placeHolder
          }
          ref={inputRef}
          disabled={disabled}
          className={classNames("component__input", {
            "disabled-field": disabled,
          })}
          readOnly={readOnly}
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
        {internalValue && !disabled && !readOnly && (
          <div className={classNames("input-icon__clear", "m-l--2xs")}>
            <CloseFilled size={16} onClick={handleClearInput} />
          </div>
        )}
        {suffix && (
          <>
            {typeof suffix === "string" ? (
              <span className="body-text--md m-l--2xs">{suffix}</span>
            ) : (
              <div className="m-l--2xs input-text__icon">{suffix}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

InputNumber.defaultProps = {
  label: "",
  type: BORDER_TYPE.BORDERED,
  isSmall: false,
  isRequired: false,
  allowNegative: false,
  isReverseSymb: false,
  numberType: NUMBER_TYPE.LONG,
  decimalDigit: 4,
  disabled: false,
  readOnly: false,
  prefix: "",
};

export default InputNumber;
