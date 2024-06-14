import React, { ReactSVGElement, RefObject } from "react";
import { CloseFilled, ChevronDown } from "@carbon/icons-react";
import { Model } from "react3l-common";
import classNames from "classnames";
import { BORDER_TYPE } from "@Configs/enum";
import { InputAction } from "../InputText/InputText";
import "./InputSelect.scss";

export interface InputSelectProps<T extends Model> {
  /**User-selected value*/
  value?: T;
  /**Not allow to handle change value*/
  disabled?: boolean;
  /** Focus to input of inputSelect */
  expanded?: boolean;
  /** Placeholder of the Component */
  placeHolder?: string;
  /**Provide a function to render a specific property as name*/
  render?: (t: T) => string;
  /**Handle the action when click clear value*/
  onClear?: (T: T) => void;
  /**Handle action on search*/
  onSearch?: (T: string) => void;
  /**Handle onKeyDown action*/
  onKeyDown?: (event: any) => void;
  /**Handle onEnter action*/
  onKeyEnter?: (event: any) => void;
  /**Handle the action when clear input search*/
  handleClearInput?: () => void;
  /**Use to custom style the component*/
  className?: string;
  /**Control the style type of component: MATERIAL, BORDERED, FLOAT_LABEL */
  type?: BORDER_TYPE;
  /**Label for current field*/
  label?: string;
  /** Show symbol * as required field */
  isRequired?: boolean;
  /**Control the size of the component*/
  isSmall?: boolean;
  /**True for data list of filter is Enum (not use in code)*/
  isEnumerable?: boolean;
  /**Boolean true if used for filter*/
  isFilter?: boolean;
  /** Provide a custom action (onClick) to the component */
  action?: InputAction;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
  /*Name attribute of input*/
  nameAttr?: string;
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
    nameAttr,
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
                <CloseFilled
                  size={16}
                  className="input-icon input-icon__clear m-r--2xs"
                  onClick={handleClearInput}
                />
              ) : null}
              <ChevronDown
                size={16}
                className={classNames("input-icon", "input-select__icon", {
                  "input-select__icon--disabled": disabled,
                })}
              />
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
                name={nameAttr}
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
                <CloseFilled
                  size={16}
                  className="input-icon input-icon__clear"
                  onClick={handleClearItem}
                />
              )}
              <ChevronDown
                size={16}
                className={classNames("input-icon", "input-select__icon", {
                  "input-select__icon--disabled": disabled,
                })}
              />
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
