import React, { ReactSVGElement, RefObject } from "react";
import { CloseFilled, ChevronDown, Close } from "@carbon/icons-react";
import { Model } from "react3l-common";
import classNames from "classnames";
import { BORDER_TYPE } from "@Configs/enum";
import { Tooltip } from "antd";
import { InputAction } from "../InputText/InputText";
import "./InputTag.scss";

export interface InputTagProps<T extends Model> {
  /**List value users select*/
  listValue?: T[];
  /**Placeholder of the component*/
  placeHolder?: string;
  /**Not allow to handle change value*/
  disabled?: boolean;
  /**Provide a function to render a specific property as name*/
  render?: (t: T) => string;
  /**Handle the action when click clear value*/
  onClear?: (T: T) => void;
  /**Handle the action when click clear mutiValue*/
  onClearMulti?: () => void;
  /**Handle action on search*/
  onSearch?: (T: string) => void;
  /**Show symbol * as required field*/
  isRequired?: boolean;
  /**Label for current field*/
  label?: string;
  /**Control the style type of component: MATERIAL, BORDERED, FLOAT_LABEL */
  type?: BORDER_TYPE;
  /**Control the size of the component*/
  isSmall?: boolean;
  /**Component enable to search data list*/
  isUsingSearch?: boolean;
  /**Handle onKeyDown action*/
  onKeyDown?: (event: any) => void;
  /**Handle onEnter action*/
  onKeyEnter?: (event: any) => void;
  /**Boolean true if used for filter*/
  isFilter?: boolean;
  /**Not expand the title row to see more detail on each post (each row)*/
  isNotExpand?: boolean;
  /**Boolean to set show tooltip */
  isShowTooltip?: boolean;
  /** Provide a custom action (onClick) to the component */
  action?: InputAction;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
  /** Set expand value */
  handlePressExpandedIcon?: () => void;
  /**Clear search value when open */
  clearSearchTerm?: boolean;
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
    isShowTooltip = false,
    render,
    action,
    bgColor,
    clearSearchTerm,
    handlePressExpandedIcon,
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

  const handleClickChevron = React.useCallback(
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      event.stopPropagation();
      handlePressExpandedIcon();
    },
    [handlePressExpandedIcon]
  );

  React.useEffect(() => {
    if (!clearSearchTerm) {
      setSearchTerm("");
    }
  }, [clearSearchTerm]);

  return (
    <>
      <div className="input-tag__wrapper">
        <div
          className="input-tag__label m-b--3xs"
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
          className={classNames("component__input input-tag__container", {
            "input-tag__container--sm": isSmall,
            "input-tag__container--white": bgColor === "white",
            "p-y--2xs": isSmall,
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
          {isShowTooltip ? (
            <>
              {internalListValue && internalListValue.length > 0 && (
                <Tooltip
                  placement="topLeft"
                  title={
                    <>
                      {internalListValue?.map(
                        (itemValue: any, index: number) => (
                          <React.Fragment
                            key={itemValue?.id ? itemValue?.id : index}
                          >
                            <span>{"- " + render(itemValue)}</span>
                            <br />
                          </React.Fragment>
                        )
                      )}
                    </>
                  }
                >
                  <span
                    className={classNames(
                      "input-tag-item__label m-r--3xs m-b--3xs",
                      {
                        "input-tag-item__label--small":
                          type === BORDER_TYPE.FLOAT_LABEL && isSmall,
                        "p-l--3xs": type === BORDER_TYPE.FLOAT_LABEL && isSmall,
                        "p-l--2xs": !(
                          type === BORDER_TYPE.FLOAT_LABEL && isSmall
                        ),
                      }
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="input-tag-item__text">
                      {internalListValue?.length}
                    </span>
                    {
                      <Close
                        size={16}
                        className="input-tag-item__icon"
                        onClick={handleClearMultiItem}
                      />
                    }
                  </span>
                </Tooltip>
              )}
            </>
          ) : (
            <>
              {internalListValue && internalListValue.length > 0 && (
                <span
                  className={classNames(
                    "input-tag-item__label m-r--3xs m-b--3xs",
                    {
                      "input-tag-item__label--small":
                        type === BORDER_TYPE.FLOAT_LABEL && isSmall,
                      "p-l--3xs": type === BORDER_TYPE.FLOAT_LABEL && isSmall,
                      "p-l--2xs": !(
                        type === BORDER_TYPE.FLOAT_LABEL && isSmall
                      ),
                    }
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="input-tag-item__text">
                    {internalListValue?.length}
                  </span>
                  {
                    <Close
                      size={16}
                      className="input-tag-item__icon"
                      onClick={handleClearMultiItem}
                    />
                  }
                </span>
              )}
            </>
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
            <CloseFilled
              size={16}
              className="input-icon input-icon__clear m-x--2xs"
              onClick={handleClearInput}
            />
          )}

          <ChevronDown
            size={16}
            className={classNames("input-icon", "input-tag__icon", {
              "input-tag__icon--disabled": disabled,
            })}
            onClick={handleClickChevron}
          />
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
};

export default InputTag;
