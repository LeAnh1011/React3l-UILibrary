import classNames from "classnames";
import React, { RefObject } from "react";
import "./InputNumber.scss";

export const DECIMAL: string = "DECIMAL";
export const LONG: string = "LONG";

interface InputNumberAction {
  name?: string;
  action?: any;
}

export interface InputNumberProps {
  label?: string;
  floatLabel?: boolean;
  isRequired?: boolean;
  isMaterial?: boolean;
  value?: number;
  prefix?: string;
  allowPositive?: boolean;
  error?: string;
  numberType?: string;
  isReverseSymb?: boolean;
  decimalDigit?: number;
  placeHolder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (T: number) => void;
  onEnter?: (T: number) => void;
  onBlur?: (T: number) => void;
  min?: number;
  max?: number;
  action?: InputNumberAction;
}

function InputNumber(props: InputNumberProps) {
  const {
    action,
    label,
    floatLabel,
    isRequired,
    isMaterial,
    prefix,
    value,
    allowPositive,
    numberType,
    decimalDigit,
    isReverseSymb,
    placeHolder,
    className,
    disabled,
    onChange,
    onEnter,
    onBlur,
    min,
    max
  } = props;

  const [internalValue, setInternalValue] = React.useState<string>("");

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    null
  );

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
          case DECIMAL:
            if (allowPositive) {
              inputValue = inputValue
                .replace(/[^0-9,-]/g, "")
                .replace(",", "x")
                .replace(/,/g, "")
                .replace("x", ",")
                .replace(/(?!^)-/g, "");
            } else {
              inputValue = inputValue
                .replace(/[^0-9,]/g, "")
                .replace(",", "x")
                .replace(/,/g, "")
                .replace("x", ",");
            }
            return inputValue.replace(newRegEx, (m, s1, s2) => {
              return s2 || s1 + ".";
            });
          default:
            if (allowPositive) {
              inputValue = inputValue
                .replace(/[^0-9-]/g, "")
                .replace(/(?!^)-/g, "");
            } else {
              inputValue = inputValue.replace(/[^0-9]/g, "");
            }
            return inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
      } else {
        switch (numberType) {
          case DECIMAL:
            if (allowPositive) {
              inputValue = inputValue
                .replace(/[^0-9.-]/g, "")
                .replace(".", "x")
                .replace(/\./g, "")
                .replace("x", ".")
                .replace(/(?!^)-/g, "");
            } else {
              inputValue = inputValue
                .replace(/[^0-9.]/g, "")
                .replace(".", "x")
                .replace(/\./g, "")
                .replace("x", ".");
            }
            return inputValue.replace(newRegEx, (m, s1, s2) => {
              return s2 || s1 + ",";
            });
          default:
            if (allowPositive) {
              inputValue = inputValue
                .replace(/[^0-9-]/g, "")
                .replace(/(?!^)-/g, "");
            } else {
              inputValue = inputValue.replace(/[^0-9]/g, "");
            }
            return inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }
    },
    [isReverseSymb, numberType, buildRegex, allowPositive]
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
          case DECIMAL:
            isOutOfRange = stringValue.length > 21 ? true : false;
            number = parseFloat(stringValue);
            return [number, isOutOfRange];
          default:
            isOutOfRange = stringValue.length > 17 ? true : false;
            number = parseInt(stringValue);
            return [number, isOutOfRange];
        }
      } else {
        return [null, false];
      }
    },
    [numberType, isReverseSymb]
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const stringValue = formatString(event.target.value);
      const [numberValue, isOutOfRange] = parseNumber(stringValue);
      if (!isOutOfRange) {
        setInternalValue(stringValue);
        if (typeof onChange === "function") {
          onChange(numberValue);
        }
      }
    },
    [formatString, parseNumber, onChange]
  );

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setInternalValue("");
      inputRef.current.focus();
      if (typeof onChange === "function") {
        onChange(null);
        return;
      }
      if (typeof onBlur === "function") {
        onBlur(null);
        return;
      }
      if (typeof onEnter === "function") {
        onEnter(null);
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
    if (value) {
      var stringValue = "" + value;
      if (isReverseSymb) {
        stringValue = stringValue.replace(/\./g, ",");
      }
      setInternalValue(formatString(stringValue));
    } else {
      setInternalValue("");
    }
  }, [value, formatString, isReverseSymb]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className="input-number__label m-b--xxxs">
        {!floatLabel && label &&
          <label className='component__title'>
            {label}
            {isRequired && <span className="text-danger">&nbsp;*</span>}
          </label>
        }
        <span style={{ width: "100%" }}></span>
        {action &&
          <span className="m-l--xxxs body-text--md color-link" onClick={action.action}>{action.name}</span>
        }
      </div>
      <div className={classNames("component__input input-number__container p--xs", {
        "input-number--material": isMaterial,
        "input-number--disabled ": disabled,
        "input-number--float": floatLabel,
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
          min={min}
          max={max}
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
                "input-number__icon",
                className
              )}
            ></i>
          )
        )}
      </div>
    </div>
  );
}

InputNumber.defaultProps = {
  label: "",
  floatLabel: false,
  isRequired: false,
  isMaterial: false,
  allowPositive: false,
  isReverseSymb: false,
  numberType: LONG,
  decimalDigit: 4,
  disabled: false,
  prefix: "",
};

export default InputNumber;
