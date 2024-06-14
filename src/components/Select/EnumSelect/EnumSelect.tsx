import { Model } from "react3l-common";
import { Checkbox, Empty, Tooltip } from "antd";
import classNames from "classnames";
import React, { RefObject } from "react";
import { CommonService } from "@Services/common-service";
import InputSelect from "@Components/Input/InputSelect/InputSelect";
import { BORDER_TYPE } from "@Configs/enum";
import InputTag from "@Components/Input/InputTag";
import { Add, Checkmark } from "@carbon/icons-react";
import { ErrorObserver, Observable, Subscription } from "rxjs";
import { InputAction } from "@Components/Input/InputText/InputText";

export interface SelectProps<T extends Model> {
  /**Value users select*/
  value?: Model;
  /**List value users select*/
  listValue?: Model[];
  /**Placeholder of the component*/
  placeHolder?: string;
  /**Not allow to handle change value*/
  disabled?: boolean;
  /**Append this component to body*/
  appendToBody?: boolean;
  /**Show symbol * as required field*/
  isRequired?: boolean;
  /**Handle the change value of the field*/
  onChange?: (id: number, T?: T) => void;
  /**Handle the change list value of the component */
  onChangeMultiple?: (selectedList?: T[], ids?: []) => void;
  /**Provide a function to render a specific property as name*/
  render?: (t: T) => string;
  /**Control the style type of component: MATERIAL, BORDERED, FLOAT_LABEL */
  type?: BORDER_TYPE;
  /**Label for current field*/
  label?: string;
  /**Option show button add new*/
  selectWithAdd?: () => void;
  /**Control the size of the component*/
  isSmall?: boolean;
  /**Prefer option to select*/
  preferOptions?: T[];
  /**Option to select multiple*/
  isMultiple?: boolean;
  /**Api to get list data*/
  getList?: () => Observable<T[]>;
  /**Custom height of dropdown data list*/
  height?: number;
  /** Provide a custom action (onClick) to the component */
  action?: InputAction;
  /**Show maximum length of item in each data row*/
  maxLengthItem?: number;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
  /**Use to custom style the component*/
  className?: string;
  /*Name attribute of input*/
  nameAttr?: string;
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

interface changeAction {
  type: string;
  data: Model;
}

function multipleSelectReducer(
  currentState: Model[],
  action: changeAction
): Model[] {
  switch (action.type) {
    case "UPDATE":
      return [...currentState, action.data];
    case "REMOVE":
      const filteredArray = currentState.filter(
        (item) => item.id !== action.data.id
      );
      return [...filteredArray];
    case "REMOVE_ALL":
      return [];
  }
  return;
}

function EnumSelect(props: SelectProps<Model>) {
  const {
    value,
    placeHolder,
    disabled,
    appendToBody,
    isRequired,
    onChange,
    render,
    type,
    label,
    selectWithAdd,
    isSmall,
    isMultiple,
    listValue,
    onChangeMultiple,
    getList,
    height,
    maxLengthItem,
    action,
    bgColor,
    className,
    nameAttr,
  } = props;

  const internalValue = React.useMemo((): Model => {
    return value || null;
  }, [value]);

  const [list, setList] = React.useState<Model[]>([]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const [firstLoad, setFirstLoad] = React.useState<boolean>(true);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [selectedList, dispatch] = React.useReducer(multipleSelectReducer, []);

  const [appendToBodyStyle, setAppendToBodyStyle] = React.useState({});

  React.useEffect(() => {
    const subscription = new Subscription();
    if (firstLoad) {
      subscription.add(getList);
      getList().subscribe({
        next: (res: Model[]) => {
          setList(res);
        },
        error: (err: ErrorObserver<Error>) => {
          setList([]);
        },
      });
    }

    return function cleanup() {
      subscription.unsubscribe();
    };
  }, [firstLoad, getList]);

  // use this for multiple type
  const internalList = React.useMemo(() => {
    if (list && list.length > 0) {
      list.forEach((current) => {
        let filteredItem =
          listValue &&
          listValue.length > 0 &&
          listValue?.filter((item) => item.id === current.id)[0];
        if (filteredItem) {
          current.isSelected = true;
        } else {
          current.isSelected = false;
        }
      });
      return [...list];
    }
    return [];
  }, [list, listValue]);

  React.useEffect(() => {
    if (firstLoad) {
      if (internalList && internalList?.length > 0) {
        const tempList = [...internalList];
        if (tempList && tempList?.length > 0) {
          tempList.forEach((item) => {
            if (item?.isSelected === true) {
              dispatch({
                type: "UPDATE",
                data: item,
              });
            }
          });
          setFirstLoad(false);
        }
      }
    }
  }, [firstLoad, internalList]);

  const handleToggle = React.useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!disabled) {
        setExpand(true);
      }
    },
    [disabled]
  );

  const handleCloseSelect = React.useCallback(() => {
    setExpand(false);
  }, []);

  // use this function for single type
  const handleClickItem = React.useCallback(
    (item: Model) => (event: any) => {
      // perform sort
      const currentIndex = list.findIndex((current) => current.id === item.id);
      list.splice(currentIndex, 1);
      list.unshift(item);
      setList(list);
      onChange(item.id, item);
      handleCloseSelect();
    },
    [handleCloseSelect, list, onChange]
  );

  // use this function for multiple type
  // UX: after choose an item, this item need to be on top of the list
  const handleClickMultiItem = React.useCallback(
    (item: Model) => (event: any) => {
      let filteredItem = listValue?.filter(
        (current) => current.id === item.id
      )[0];

      if (filteredItem) {
        const tmp = [...selectedList];
        const ids = selectedList?.map((item) => item?.id);
        const index = tmp.indexOf(filteredItem);
        const indexIds = tmp.indexOf(filteredItem?.id);
        tmp.splice(index, 1);
        ids.splice(indexIds, 1);
        dispatch({
          type: "REMOVE",
          data: item,
        });
        onChangeMultiple([...tmp], ids as any);
      } else {
        // perform sort
        const currentIndex = list.findIndex(
          (current) => current.id === item.id
        );
        list.splice(currentIndex, 1);
        list.unshift(item);
        setList(list);
        const ids = selectedList?.map((item) => item?.id);
        onChangeMultiple([...selectedList, item], [...ids, item?.id] as any);
        dispatch({
          type: "UPDATE",
          data: item,
        });
      }
    },
    [list, listValue, onChangeMultiple, selectedList]
  );

  const handleClickMultiParentItem = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (event && event.target === event.currentTarget) {
        const currentItem = event.target as HTMLDivElement;
        currentItem.firstElementChild.firstElementChild
          .querySelector("span")
          .click();
      }
    },
    []
  );

  const handleClearItem = React.useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  // use this for type multiple
  const handleClearAll = React.useCallback(() => {
    onChangeMultiple([], []);
    dispatch({
      type: "REMOVE_ALL",
      data: [],
    });
  }, [onChangeMultiple]);

  const handleKeyPress = React.useCallback(
    (event: any) => {
      switch (event.keyCode) {
        case 40:
          const firstItem = selectListRef.current
            .firstElementChild as HTMLElement;
          firstItem.focus();
          break;
        case 9:
          handleCloseSelect();
          break;
        default:
          return;
      }
    },
    [handleCloseSelect]
  );

  const handleMove = React.useCallback(
    (item) => (event: any) => {
      switch (event.keyCode) {
        case 13:
          if (!isMultiple) {
            handleClickItem(item)(null);
          } else {
            handleClickMultiItem(item)(null);
          }

          break;
        case 40:
          if (event.target.nextElementSibling !== null) {
            event.target.nextElementSibling.focus();
          }
          event.preventDefault();
          break;
        case 38:
          if (event.target.previousElementSibling !== null) {
            event.target.previousElementSibling.focus();
          }
          event.preventDefault();
          break;
      }
      return;
    },
    [handleClickItem, handleClickMultiItem, isMultiple]
  );

  const handleKeyEnter = React.useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        handleToggle(null);
      }
      return;
    },
    [handleToggle]
  );

  CommonService.useClickOutside(wrapperRef, handleCloseSelect);

  React.useEffect(() => {
    if (isExpand && appendToBody) {
      const currentPosition = wrapperRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - currentPosition.bottom;
      if (spaceBelow <= 200) {
        setTimeout(() => {
          setAppendToBodyStyle({
            position: "fixed",
            bottom: spaceBelow + wrapperRef.current.clientHeight,
            left: currentPosition.left,
            maxWidth: wrapperRef.current.clientWidth,
          });
        }, 100);
      } else {
        setAppendToBodyStyle({
          position: "fixed",
          top: currentPosition.top + wrapperRef.current.clientHeight,
          left: currentPosition.left,
          maxWidth: wrapperRef.current.clientWidth,
        });
      }
    }
  }, [appendToBody, isExpand]);

  return (
    <>
      <div
        className={classNames("select__container", className, {
          "multiple-select__container": isMultiple,
        })}
        ref={wrapperRef}
      >
        <div className="select__input" onClick={handleToggle}>
          {isMultiple ? (
            <InputTag
              listValue={listValue}
              render={render}
              placeHolder={placeHolder}
              disabled={disabled}
              onClear={handleClearItem}
              onKeyDown={handleKeyPress}
              onKeyEnter={handleKeyEnter}
              type={type}
              label={label}
              isSmall={isSmall}
              isUsingSearch={false}
              onClearMulti={handleClearAll}
              isNotExpand={!isExpand}
              isRequired={isRequired}
              isShowTooltip
              bgColor={bgColor}
              nameAttr={nameAttr}
            />
          ) : (
            <InputSelect
              value={internalValue}
              render={render}
              placeHolder={placeHolder}
              expanded={isExpand}
              disabled={disabled}
              onClear={handleClearItem}
              onKeyDown={handleKeyPress}
              onKeyEnter={handleKeyEnter}
              type={type}
              label={label}
              isSmall={isSmall}
              isEnumerable={true}
              isRequired={isRequired}
              action={action}
              bgColor={bgColor}
              nameAttr={nameAttr}
            />
          )}
        </div>
        {isMultiple
          ? isExpand && (
              <div className="select__list-container">
                {
                  <>
                    <div
                      className="select__list multiple-select__list"
                      ref={selectListRef}
                      style={{ maxHeight: `${height}px` }}
                    >
                      {internalList.length > 0 ? (
                        internalList.map((item, index) => (
                          <div
                            className={classNames(
                              "select__item p-l--xs p-y--xs p-r--2xs",
                              {
                                "select__item--selected": item.isSelected,
                              }
                            )}
                            key={index}
                            onKeyDown={handleMove(item)}
                            tabIndex={-1}
                            onClick={handleClickMultiParentItem}
                          >
                            <Checkbox
                              checked={item.isSelected}
                              onChange={handleClickMultiItem(item)}
                            >
                              <span className="select__text">
                                {maxLengthItem &&
                                render(item)?.length > maxLengthItem ? (
                                  <Tooltip title={render(item)}>
                                    {CommonService.limitWord(
                                      render(item),
                                      maxLengthItem
                                    )}
                                  </Tooltip>
                                ) : (
                                  render(item)
                                )}
                              </span>
                            </Checkbox>
                          </div>
                        ))
                      ) : (
                        <Empty />
                      )}
                    </div>
                  </>
                }

                {typeof selectWithAdd !== "undefined" && (
                  <div
                    className={classNames(
                      "select__bottom-button select__add-button p-y--xs"
                    )}
                    onClick={selectWithAdd}
                  >
                    <Add size={16} className="m-l--xs" />
                    <span className="m-l--xs">Add new</span>
                  </div>
                )}
              </div>
            )
          : isExpand && (
              <div className="select__list-container" style={appendToBodyStyle}>
                {
                  <>
                    <div
                      className="select__list"
                      ref={selectListRef}
                      style={{ maxHeight: `${height}px` }}
                    >
                      {list.length > 0 ? (
                        list.map((item, index) => (
                          <div
                            className={classNames(
                              "select__item p-l--xs p-y--xs",
                              {
                                "select__item--selected":
                                  item.id === internalValue?.id,
                              }
                            )}
                            tabIndex={-1}
                            key={index}
                            onKeyDown={handleMove(item)}
                            onClick={handleClickItem(item)}
                          >
                            <span className="select__text">
                              {maxLengthItem &&
                              render(item)?.length > maxLengthItem ? (
                                <Tooltip title={render(item)}>
                                  {CommonService.limitWord(
                                    render(item),
                                    maxLengthItem
                                  )}
                                </Tooltip>
                              ) : (
                                render(item)
                              )}
                            </span>
                            {item.id === internalValue?.id && (
                              <Checkmark size={16} />
                            )}
                          </div>
                        ))
                      ) : (
                        <Empty />
                      )}
                    </div>
                  </>
                }
                {typeof selectWithAdd !== "undefined" && (
                  <div
                    className={classNames(
                      "select__bottom-button select__add-button p-y--xs"
                    )}
                    onClick={selectWithAdd}
                  >
                    <Add size={16} className="m-l--2xs" />
                    <span>Add new</span>
                  </div>
                )}
              </div>
            )}
      </div>
    </>
  );
}

EnumSelect.defaultProps = {
  appendToBody: false,
  render: defaultRenderObject,
  disabled: false,
  maxLengthItem: 30,
};

export default EnumSelect;
