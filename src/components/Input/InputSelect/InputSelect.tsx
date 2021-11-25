import React, { RefObject } from "react";
import "./InputSelect.scss";
import { Model } from "react3l-common";
import classNames from "classnames";

export enum INPUT_SELECT_TYPE {
  MATERIAL,
  BORDERED,
  FLOAT_LABEL,
}

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
  type?: INPUT_SELECT_TYPE;
  label?: string;
  isRequired?: boolean;
  isSmall?: boolean;
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
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setInternalModel("");
      inputRef.current.focus();
      event.stopPropagation();
    },
    []
  );

  const handleClearItem = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClear(null);
      event.stopPropagation();
    },
    [onClear]
  );

  const handleKeyDown = React.useCallback(
    (event) => {
      onKeyDown(event);
    },
    [onKeyDown]
  );

  const handleEnter = React.useCallback(
    (event) => {
      onKeyEnter(event);
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
          {type !== INPUT_SELECT_TYPE.FLOAT_LABEL && label && (
            <label className="component__title">
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
              "input-select--material": type === INPUT_SELECT_TYPE.MATERIAL,
              "input-select--disabled ": disabled,
              "input-select--float": type === INPUT_SELECT_TYPE.FLOAT_LABEL,
            }
          )}
        >
          {expanded ? (
            <>
              <input
                type="text"
                value={internalModel}
                onChange={handleChange}
                placeholder={model ? render(model) : placeHolder}
                ref={inputRef}
                disabled={disabled}
                onKeyDown={handleKeyDown}
                className={classNames("component__input", {
                  "disabled-field": disabled,
                })}
              />
              {type === INPUT_SELECT_TYPE.FLOAT_LABEL && label && (
                <label
                  className={classNames("component__title", {
                    "component__title--sm": isSmall,
                  })}
                >
                  {label}
                  {isRequired && <span className="text-danger">&nbsp;*</span>}
                </label>
              )}
              {internalModel && !disabled ? (
                <i
                  className="input-icon tio-clear_circle input-icon__clear"
                  onClick={handleClearInput}
                ></i>
              ) : model ? (
                <div>
                  {!disabled && (
                    <i
                      className="input-icon tio-clear_circle input-icon__clear"
                      onClick={handleClearItem}
                    ></i>
                  )}
                </div>
              ) : null}
              <i
                className={classNames(
                  "input-icon",
                  "input-select__icon",
                  "tio-chevron_down",
                  {
                    "input-select__icon--disabled": disabled,
                  }
                )}
              ></i>
            </>
          ) : (
            <>
              <input
                type="text"
                value={render(model) || ""}
                readOnly
                placeholder={
                  type === INPUT_SELECT_TYPE.FLOAT_LABEL && label
                    ? " "
                    : placeHolder
                }
                onKeyDown={handleEnter}
                className={classNames("component__input", {
                  "component__input--material":
                    type === INPUT_SELECT_TYPE.MATERIAL,
                  "component__input--bordered":
                    type === INPUT_SELECT_TYPE.BORDERED,
                  "disabled-field": disabled,
                })}
                disabled={disabled}
                ref={inputRef}
              />
              {type === INPUT_SELECT_TYPE.FLOAT_LABEL && label && (
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
              {model ? (
                <div>
                  {!disabled && (
                    <i
                      className="input-icon tio-clear_circle input-icon__clear"
                      onClick={handleClearItem}
                    ></i>
                  )}
                </div>
              ) : null}
              <i
                className={classNames(
                  "input-icon",
                  "input-select__icon",
                  "tio-chevron_down",
                  {
                    "input-select__icon--disabled": disabled,
                  }
                )}
              ></i>
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
