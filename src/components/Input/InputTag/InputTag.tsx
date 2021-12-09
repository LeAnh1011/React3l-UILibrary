import React, { RefObject } from "react";
import "./InputTag.scss";
import { Model } from "react3l-common";
import classNames from "classnames";

export enum INPUT_TAG_TYPE {
  MATERIAL,
  BORDERED,
  FLOAT_LABEL,
}

export interface InputTagProps<T extends Model> {
  listItem?: T[];
  title?: string;
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
  type?: INPUT_TAG_TYPE;
  isSmall?: boolean;
  isUsingSearch?: boolean;
  onKeyDown?: (event: any) => void;
  onKeyEnter?: (event: any) => void;
}
function InputTag(props: InputTagProps<Model>) {
  const {
    listItem,
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
  } = props;

  const internalListItem = React.useMemo<Model[]>(() => {
    return listItem;
  }, [listItem]);

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
    if (typeof onClearMulti === "function") {
      onClearMulti();
    }
  }, [onClearMulti]);

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
      onKeyDown(event);
    },
    [onKeyDown]
  );

  return (
    <>
      <div className="input-tag__wrapper">
        <div className="input-tag__label m-b--xxxs">
          {type !== INPUT_TAG_TYPE.FLOAT_LABEL && label && (
            <label className="component__title">
              {label}
              {isRequired && <span className="text-danger">&nbsp;*</span>}
            </label>
          )}
        </div>
        <div
          className={classNames(
            "component__input input-tag__container bg-white",
            {
              "input-tag__container--sm": isSmall,
              "p-y--xxs": isSmall,
              "p-x--xs": isSmall,
              "p--xs": !isSmall,
              "input-tag__container--material":
                type === INPUT_TAG_TYPE.MATERIAL,
              "input-tag__container--bordered":
                type === INPUT_TAG_TYPE.BORDERED,
              "input-tag--disabled ": disabled,
              "input-tag--float": type === INPUT_TAG_TYPE.FLOAT_LABEL,
            }
          )}
          onClick={() =>
            isUsingSearch
              ? inputRef.current.focus()
              : inputContainerRef.current.focus()
          }
          ref={inputContainerRef}
        >
          {internalListItem && internalListItem.length > 0 && (
            <span
              className="input-tag-item__label p-l--xxs m-r--xxxs m-b--xxxs"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="input-tag-item__text">
                {internalListItem?.length}
              </span>
              <i
                className="input-tag-item__icon tio-clear"
                onClick={handleClearMultiItem}
              ></i>
            </span>
          )}
          {isUsingSearch ? (
            <input
              type="text"
              value={searchTerm}
              placeholder={
                type === INPUT_TAG_TYPE.FLOAT_LABEL && label ? " " : placeHolder
              }
              ref={inputRef}
              disabled={disabled}
              onChange={handleChangeInput}
              readOnly={!isUsingSearch}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <input
              ref={inputRef}
              readOnly={true}
              placeholder={
                type === INPUT_TAG_TYPE.FLOAT_LABEL && label ? " " : ""
              }
              disabled={disabled}
              onKeyDown={handleKeyDown}
            />
          )}

          {type === INPUT_TAG_TYPE.FLOAT_LABEL && label && (
            <label
              className={classNames(
                "component__title component__title--normal",
                {
                  "component__title--sm": isSmall,
                  "component__title--top": listItem && listItem.length > 0,
                }
              )}
            >
              {label}
              {isRequired && <span className="text-danger">&nbsp;*</span>}
            </label>
          )}

          {!disabled && searchTerm && (
            <i
              className="input-icon tio-clear_circle input-icon__clear m-x--xxs"
              onClick={handleClearInput}
            ></i>
          )}

          <i
            className={classNames(
              "input-icon",
              "input-tag__icon",
              "tio-chevron_down",
              {
                "input-tag__icon--disabled": disabled,
              }
            )}
          ></i>
        </div>
      </div>
    </>
  );
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

InputTag.defaultProps = {
  title: null,
  render: defaultRenderObject,
  isMaterial: false,
};

export default InputTag;