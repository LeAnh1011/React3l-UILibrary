import React, { ReactSVGElement, RefObject } from "react";
import CloseFilled16 from "@carbon/icons-react/es/close--filled/16";
import ChevronDown16 from "@carbon/icons-react/es/chevron--down/16";
import Close16 from "@carbon/icons-react/es/close/16";
import "./InputTag.scss";
import { Model } from "react3l-common";
import classNames from "classnames";
import { BORDER_TYPE } from "@Configs/enum";

export interface InputTagProps<T extends Model> {
  listValue?: T[];
  placeHolder?: string;
  disabled?: boolean;
  isMaterial?: boolean;
  error?: string;
  render?: (t: T) => string;
  onClear?: (T: T) => void;
  onClearMulti?: () => void;
  onSearch?: (T: string) => void;
  isRequired?: boolean;
  label?: string;
  type?: BORDER_TYPE;
  isSmall?: boolean;
  isUsingSearch?: boolean;
  onKeyDown?: (event: any) => void;
  onKeyEnter?: (event: any) => void;
  isFilter?: boolean;
  isNotExpand?: boolean;
}
function InputTag(props: InputTagProps<Model>) {
  const {
    listValue,
    placeHolder,
    disabled,
    onSearch,
    isRequired,
    label,
    type,
    isSmall,
    onClearMulti,
    isUsingSearch,
    onKeyDown,
    isFilter,
    onKeyEnter,
    isNotExpand,
  } = props;

  const internalListValue = React.useMemo<Model[]>(() => {
    return listValue;
  }, [listValue]);

  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const inputRef: RefObject<HTMLInputElement> = React.useRef();

  const inputContainerRef: RefObject<HTMLDivElement> = React.useRef();

  const handleChangeInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      if (typeof onSearch === "function") {
        onSearch(event.target.value);
      }
    },
    [onSearch]
  );

  const handleClearMultiItem = React.useCallback(() => {
    if (!disabled) {
      if (typeof onClearMulti === "function") {
        onClearMulti();
      }
    }
  }, [disabled, onClearMulti]);

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      setSearchTerm("");
      inputRef.current.focus();
      if (typeof onSearch === "function") {
        onSearch(null);
        return;
      }
    },
    [onSearch]
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

  return (
    <>
      <div className="input-tag__wrapper">
        <div className="input-tag__label m-b--xxxs">
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
        </div>
        <div
          className={classNames("component__input input-tag__container", {
            "input-tag__container--sm": isSmall,
            "p-y--xxs": isSmall,
            "p-x--xs": isSmall,
            "p--xs": !isSmall,
            "input-tag__container--material": type === BORDER_TYPE.MATERIAL,
            "input-tag__container--bordered": type === BORDER_TYPE.BORDERED,
            "input-tag--disabled ": disabled,
            "input-tag__container--float": type === BORDER_TYPE.FLOAT_LABEL,
            "input-tag--filter-have-item":
              isFilter && internalListValue && internalListValue.length > 0,
          })}
          onClick={() =>
            isUsingSearch
              ? inputRef.current.focus()
              : inputContainerRef.current.focus()
          }
          ref={inputContainerRef}
        >
          {internalListValue && internalListValue.length > 0 && (
            <span
              className={classNames(
                "input-tag-item__label m-r--xxxs m-b--xxxs",
                {
                  "input-tag-item__label--small":
                    type === BORDER_TYPE.FLOAT_LABEL && isSmall,
                  "p-l--xxxs": type === BORDER_TYPE.FLOAT_LABEL && isSmall,
                  "p-l--xxs": !(type === BORDER_TYPE.FLOAT_LABEL && isSmall),
                }
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="input-tag-item__text">
                {internalListValue?.length}
              </span>
              {
                <Close16
                  className="input-tag-item__icon"
                  onClick={handleClearMultiItem}
                ></Close16>
              }
            </span>
          )}
          {isUsingSearch ? (
            <input
              type="text"
              value={searchTerm}
              placeholder={
                type === BORDER_TYPE.FLOAT_LABEL && label ? " " : placeHolder
              }
              ref={inputRef}
              disabled={disabled}
              onChange={handleChangeInput}
              readOnly={!isUsingSearch}
              onKeyDown={isNotExpand ? handleEnter : handleKeyDown}
            />
          ) : (
            <input
              ref={inputRef}
              readOnly={true}
              placeholder={
                type === BORDER_TYPE.FLOAT_LABEL && label ? " " : placeHolder
              }
              disabled={disabled}
              onKeyDown={isNotExpand ? handleEnter : handleKeyDown}
            />
          )}

          {type === BORDER_TYPE.FLOAT_LABEL && label && (
            <label
              className={classNames(
                "component__title component__title--normal",
                {
                  "component__title--sm": isSmall,
                  "component__title--top": listValue && listValue.length > 0,
                }
              )}
            >
              {label}
              {isRequired && <span className="text-danger">&nbsp;*</span>}
            </label>
          )}

          {!disabled && searchTerm && (
            <CloseFilled16
              className="input-icon input-icon__clear m-x--xxs"
              onClick={handleClearInput}
            ></CloseFilled16>
          )}

          <ChevronDown16
            className={classNames("input-icon", "input-tag__icon", {
              "input-tag__icon--disabled": disabled,
            })}
          ></ChevronDown16>
        </div>
      </div>
    </>
  );
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

InputTag.defaultProps = {
  type: BORDER_TYPE.BORDERED,
  label: null,
  render: defaultRenderObject,
  isMaterial: false,
};

export default InputTag;
