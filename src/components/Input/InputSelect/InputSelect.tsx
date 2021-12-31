import React, { ReactSVGElement, RefObject } from "react";
import { CloseFilled16, ChevronDown16 } from "@carbon/icons-react";
import "./InputSelect.scss";
import { Model } from "react3l-common";
import classNames from "classnames";
import { BORDER_TYPE } from "config/enum";

export interface InputSelectProps<T extends Model> {
  model?: T;
  disabled?: boolean;
  expanded?: boolean;
  isMaterial?: boolean;
  placeHolder?: string;
  render?: (t: T) => string;
  onClear?: (T: T) => void;
  onSearch?: (T: string) => void;
  onKeyDown?: (event: any) => void;
  onKeyEnter?: (event: any) => void;
  className?: string;
  type?: BORDER_TYPE;
  label?: string;
  isRequired?: boolean;
  isSmall?: boolean;
  isEnumerable?: boolean;
}

function InputSelect(props: InputSelectProps<Model>) {
  const {
    model,
    disabled,
    expanded,
    placeHolder,
    render,
    onClear,
    onSearch,
    onKeyDown,
    onKeyEnter,
    className,
    type,
    label,
    isRequired,
    isSmall,
    isEnumerable,
  } = props;

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    null
  );

  const [internalModel, setInternalModel] = React.useState("");

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInternalModel(event.target.value);
      if (typeof onSearch === "function") {
        onSearch(event.target.value);
      }
    },
    [onSearch]
  );

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      setInternalModel("");
      inputRef.current.focus();
      event.stopPropagation();
    },
    []
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
      setInternalModel("");
      inputRef.current.focus();
    }
  }, [expanded]);

  return (
    <>
      <div className={classNames("input-select__wrapper", className)}>
        <div className="input-select__label m-b--xxxs">
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
          <span style={{ width: "100%" }}></span>
        </div>
        <div
          className={classNames(
            "component__input input-select__container p--xs bg-white",
            {
              "input-select__container--sm": isSmall,
              "py--xxs": isSmall,
              "px--xs": isSmall,
              "p--xs": !isSmall,
              "input-select--material": type === BORDER_TYPE.MATERIAL,
              "input-select--disabled ": disabled,
              "input-select--float": type === BORDER_TYPE.FLOAT_LABEL,
            }
          )}
        >
          {expanded ? (
            <>
              <input
                type="text"
                value={internalModel}
                onChange={handleChange}
                placeholder={
                  model
                    ? (render(model) as string)
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
              {internalModel && !disabled ? (
                <div
                  style={{ width: "16px", height: "20px" }}
                  className="m-r--xxs"
                >
                  <CloseFilled16
                    className="input-icon input-icon__clear m-r--xxs"
                    onClick={handleClearInput}
                  ></CloseFilled16>
                </div>
              ) : model ? (
                <div
                  style={{ width: "16px", height: "20px" }}
                  className="m-r--xxs"
                >
                  {!disabled && (
                    <CloseFilled16
                      className="input-icon input-icon__clear"
                      onClick={handleClearItem}
                    ></CloseFilled16>
                  )}
                </div>
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
                value={(render(model) as string) || ""}
                readOnly
                placeholder={
                  type === BORDER_TYPE.FLOAT_LABEL && label ? " " : placeHolder
                }
                onKeyDown={handleEnter}
                className={classNames("component__input", {
                  "component__input--material": type === BORDER_TYPE.MATERIAL,
                  "component__input--bordered": type === BORDER_TYPE.BORDERED,
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
              {model && (
                <div
                  style={{ width: "16px", height: "20px" }}
                  className="m-r--xxs"
                >
                  {!disabled && (
                    <CloseFilled16
                      className="input-icon input-icon__clear"
                      onClick={handleClearItem}
                    ></CloseFilled16>
                  )}
                </div>
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
  isMaterial: false,
  expanded: false,
  disabled: false,
};

export default InputSelect;
