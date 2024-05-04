import { CommonService } from "@Services/common-service";
import { Checkmark, ChevronDown } from "@carbon/icons-react";
import { Checkbox, Empty, Tooltip } from "antd";
import classNames from "classnames";
import React, { RefObject } from "react";
import { Model } from "react3l-common";
import { ErrorObserver, Observable, Subscription } from "rxjs";
import "./AdvanceEnumFilterMaster.scss";

export interface AdvanceEnumMasterProps<T extends Model> {
  /**Value users select*/
  value?: number | string;
  /**List value users select*/
  listValue?: number[];
  /**Placeholder of the component*/
  placeHolder?: string;
  /**Not allow to handle change the component*/
  disabled?: boolean;
  /**Append this component to body*/
  appendToBody?: boolean;
  /**Handle the change value of the component*/
  onChange?: (id: number, T?: T) => void;
  /**Handle the change list value of the component */
  onChangeMultiple?: (ids?: [], selectedList?: T[]) => void;
  /**Provide a function to render a specific property as name*/
  render?: (t: T) => string;
  /**Label for current field*/
  label?: string;
  /**Control the size of the component*/
  isSmall?: boolean;
  /**Prefer option filter to select*/
  preferOptions?: T[];
  /**Option to select multiple*/
  isMultiple?: boolean;
  /**Api to get list data filter*/
  getList?: () => Observable<T[]>;
  /**Use to custom style the component*/
  className?: string;
  /**Show maximum length of item of each item in the dropdown*/
  maxLengthItem?: number;
  /**Custom height of dropdown data list*/
  height?: number;
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

function AdvanceEnumFilterMaster(props: AdvanceEnumMasterProps<Model>) {
  const {
    value,
    disabled,
    appendToBody,
    onChange,
    render,
    isMultiple,
    listValue,
    onChangeMultiple,
    getList,
    label,
    className,
    maxLengthItem = 30,
    height,
  } = props;

  const internalValue = React.useMemo<Model>(() => {
    return value !== null && value !== undefined
      ? {
          id: value,
        }
      : null;
  }, [value]);

  const [list, setList] = React.useState<Model[]>([]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [firstLoad, setFirstLoad] = React.useState<boolean>(true);

  const [selectedList, dispatch] = React.useReducer(multipleSelectReducer, []);

  const [appendToBodyStyle, setAppendToBodyStyle] = React.useState({});

  React.useEffect(() => {
    const subscription = new Subscription();
    if (firstLoad) {
      subscription.add(getList);
      getList().subscribe({
        next: (res: Model[]) => {
          setList(res);
          setFirstLoad(false);
        },
        error: (err: ErrorObserver<Error>) => {
          setList([]);
        },
      });
    }
    return () => {
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
          listValue?.filter((id: number) => id === current.id)[0];
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
      let filteredItem = selectedList?.filter(
        (current) => current.id === item.id
      )[0];

      if (filteredItem) {
        const tmp = [...selectedList];
        const ids = selectedList?.map((item) => item?.id);
        const index = tmp.indexOf(filteredItem);
        // const indexIds = tmp.indexOf(filteredItem);
        tmp.splice(index, 1);
        ids.splice(index, 1);
        dispatch({
          type: "REMOVE",
          data: item,
        });
        onChangeMultiple(ids as any);
      } else {
        // perform
        const ids = selectedList?.map((item) => item?.id);
        onChangeMultiple([...ids, item?.id] as any, [...selectedList, item]);
        dispatch({
          type: "UPDATE",
          data: item,
        });
      }
    },
    [onChangeMultiple, selectedList]
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
        className={classNames("advance-enum-filter-master__wrapper", className)}
        ref={wrapperRef}
      >
        <div
          className={classNames(
            "advance-enum-filter-master__container p-l--sm p-t--xs p-r--xs p-b--xs",
            {
              "filter-bg": isExpand,
              "p-b---active": value,
            }
          )}
          onClick={handleToggle}
        >
          {isMultiple ? (
            <div
              className={classNames({ "filter-active": listValue?.length > 0 })}
            >
              <div className="advance-enum-filter-master__title">
                <span className="filter-title">
                  {label}
                  {listValue?.length > 0 && <>({listValue?.length})</>}
                </span>
                <ChevronDown size={16} />
              </div>
            </div>
          ) : (
            <div
              className={classNames({
                "filter-active":
                  typeof value === "number" || typeof value === "string",
              })}
            >
              <div className="advance-enum-filter-master__title">
                <span className="filter-title"> {label}</span>
                <ChevronDown size={16} />
              </div>
            </div>
          )}
        </div>
        {isExpand && (
          <div
            className={classNames("advance-enum-filter-master__container", {
              "multiple-select__container": isMultiple,
            })}
            ref={wrapperRef}
          >
            {isMultiple
              ? isExpand && (
                  <div className="advance-enum-filter-master__list-container m-t--3xs">
                    {
                      <>
                        <div
                          className="advance-enum-master__list multiple-select__list"
                          ref={selectListRef}
                          style={{ height: `${height}px` }}
                        >
                          {internalList.length > 0 ? (
                            internalList.map((item, index) => (
                              <div
                                className={classNames(
                                  "advance-enum-filter__item p-l--xs p-y--xs p-r--2xs",
                                  {
                                    "advance-enum-filter__item--selected":
                                      item.isSelected,
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
                                </Checkbox>
                              </div>
                            ))
                          ) : (
                            <Empty />
                          )}
                        </div>
                      </>
                    }
                  </div>
                )
              : isExpand && (
                  <div
                    className="advance-enum-filter-master__list-container m-t--3xs"
                    style={appendToBodyStyle}
                  >
                    {
                      <>
                        <div
                          className="advance-enum-master__list"
                          style={{ height: `${height}px` }}
                          ref={selectListRef}
                        >
                          {list.length > 0 ? (
                            list.map((item, index) => (
                              <div
                                className={classNames(
                                  "advance-enum-filter__item p-l--xs p-y--xs",
                                  {
                                    "advance-enum-filter__item--selected":
                                      item.id === internalValue?.id,
                                  }
                                )}
                                tabIndex={-1}
                                key={index}
                                onKeyDown={handleMove(item)}
                                onClick={handleClickItem(item)}
                              >
                                <span className="advance-enum-master__text">
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
                  </div>
                )}
          </div>
        )}
      </div>
    </>
  );
}

AdvanceEnumFilterMaster.defaultProps = {
  appendToBody: false,
  render: defaultRenderObject,
  disabled: false,
};

export default AdvanceEnumFilterMaster;
