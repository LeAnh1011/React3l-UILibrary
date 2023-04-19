import React, { ReactSVGElement, RefObject } from "react";
import CloseFilled16 from "@carbon/icons-react/es/close--filled/16";
import ChevronDown16 from "@carbon/icons-react/es/chevron--down/16";
import { Model } from "react3l-common";
import classNames from "classnames";
import { BORDER_TYPE } from "@Configs/enum";
import { InputAction } from "../InputText/InputText";
import "./InputSelect.scss";

export interface InputSelectProps<T extends Model> {
  value?: T;
  disabled?: boolean;
  expanded?: boolean;
  placeHolder?: string;
  render?: (t: T) => string;
  onClear?: (T: T) => void;
  onSearch?: (T: string) => void;
  onKeyDown?: (event: any) => void;
  onKeyEnter?: (event: any) => void;
  handleClearInput?: () => void;
  className?: string;
  type?: BORDER_TYPE;
  label?: string;
  action?: InputAction;
  isRequired?: boolean;
  isSmall?: boolean;
  isEnumerable?: boolean;
  isFilter?: boolean;
  bgColor?: "white" | "gray";
}

function InputSelect(props: InputSelectProps<Model>) {
  const {
    value,
    disabled,
    expanded,
    placeHolder,
    handleClearInput: onClearInput,
    render,
    onClear,
    onSearch,
    onKeyDown,
    onKeyEnter,
    className,
    type,
    label,
    action,
    isRequired,
    isSmall,
    isEnumerable,
    isFilter,
    bgColor,
  } = props;

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    null
  );

  const [internalValue, setInternalValue] = React.useState("");

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.value);
      if (typeof onSearch === "function") {
        onSearch(event.target.value);
      }
    },
    [onSearch]
  );

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      setInternalValue("");
      inputRef.current.focus();
      event.stopPropagation();
      if (typeof handleClearInput !== undefined) {
        onClearInput();
      }
    },
    [onClearInput]
  );

  const handleClearItem = React.useCallback(
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      if (typeof onClear === "function") {
        onClear(null);
      }
      event.stopPropagation();
    },
    [onClear]
  );

  const handleKeyDown = React.useCallback(
    (event) => {
      if (typeof onKeyDown === "function") {
        onKeyDown(event);
      }
    },
    [onKeyDown]
  );

  const handleEnter = React.useCallback(
    (event) => {
      if (typeof onKeyEnter === "function") {
        onKeyEnter(event);
      }
    },
    [onKeyEnter]
  );

  React.useEffect(() => {
    if (expanded) {
      setInternalValue("");
      inputRef.current.focus();
    }
  }, [expanded]);

  return (
    <>
      <div className={classNames("input-select__wrapper", className)}>
        <div
          className="input-select__label m-b--3xs"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
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
            "component__input input-select__container p--xs",
            {
              "input-select__container--sm": isSmall,
              "input-select__container--white": bgColor === "white",
              "py--2xs": isSmall,
              "px--xs": isSmall,
              "p--xs": !isSmall,
              "input-select--material": type === BORDER_TYPE.MATERIAL,
              "input-select--disabled ": disabled,
              "input-select--float": type === BORDER_TYPE.FLOAT_LABEL,
              "input-select--filter-have-item": isFilter && value,
            }
          )}
        >
          {expanded ? (
            <>
              <input
                type="text"
                value={internalValue}
                onChange={handleChange}
                placeholder={
                  value
                    ? (render(value) as string)
                    : type === BORDER_TYPE.FLOAT_LABEL && label
                    ? " "
                    : placeHolder
                }
                ref={inputRef}
                disabled={disabled}
                onKeyDown={handleKeyDown}
                className={classNames("component__input", {
                  "disabled-field": disabled,
                })}
                readOnly={isEnumerable}
              />
              {type === BORDER_TYPE.FLOAT_LABEL && label && (
                <label
                  className={classNames(
                    "component__title component__title--normal component__title--expanded",
                    {
                      "component__title--sm": isSmall,
                    }
                  )}
                >
                  {label}
                  {isRequired && <span className="text-danger">&nbsp;*</span>}
                </label>
              )}
              {internalValue && !disabled ? (
                <CloseFilled16
                  className="input-icon input-icon__clear m-r--2xs"
                  onClick={handleClearInput}
                ></CloseFilled16>
              ) : null}
              <ChevronDown16
                className={classNames("input-icon", "input-select__icon", {
                  "input-select__icon--disabled": disabled,
                })}
              ></ChevronDown16>
            </>
          ) : (
            <>
              <input
                type="text"
                value={(render(value) as string) || ""}
                readOnly
                placeholder={
                  type === BORDER_TYPE.FLOAT_LABEL && label ? " " : placeHolder
                }
                onKeyDown={handleEnter}
                className={classNames("component__input", {
                  "disabled-field": disabled,
                })}
                disabled={disabled}
                ref={inputRef}
              />
              {type === BORDER_TYPE.FLOAT_LABEL && label && (
                <label
                  className={classNames(
                    "component__title component__title--normal",
                    {
                      "component__title--sm": isSmall,
                    }
                  )}
                >
                  {label}
                  {isRequired && <span className="text-danger">&nbsp;*</span>}
                </label>
              )}
              {value && !disabled && (
                <CloseFilled16
                  className="input-icon input-icon__clear"
                  onClick={handleClearItem}
                ></CloseFilled16>
              )}
              <ChevronDown16
                className={classNames("input-icon", "input-select__icon", {
                  "input-select__icon--disabled": disabled,
                })}
              ></ChevronDown16>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name || "";
}

InputSelect.defaultProps = {
  render: defaultRenderObject,
  expanded: false,
  disabled: false,
};

export default InputSelect;
