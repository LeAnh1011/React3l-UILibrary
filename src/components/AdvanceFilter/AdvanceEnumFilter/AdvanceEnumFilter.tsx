import { Add16, Checkmark16 } from "@carbon/icons-react";
import { Checkbox, Empty } from "antd";
import classNames from "classnames";
import InputSelect from "components/Input/InputSelect/InputSelect";
import InputTag from "components/Input/InputTag";
import { BORDER_TYPE } from "config/enum";
import React, { RefObject } from "react";
import { Model } from "react3l-common";
import { CommonService } from "services/common-service";

export interface AdvanceEnumProps<T extends Model> {
  model?: Model;

  listModel?: Model[];

  placeHolder?: string;

  disabled?: boolean;

  appendToBody?: boolean;

  onChange?: (id: number, T?: T) => void;

  onChangeMultiple?: (selectedList?: T[], ids?: []) => void;

  render?: (t: T) => string;

  type?: BORDER_TYPE;

  label?: string;

  selectWithAdd?: boolean;

  isSmall?: boolean;

  preferOptions?: T[];

  isMultiple?: boolean;

  listItem?: Model[];
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

function AdvanceEnumFilter(props: AdvanceEnumProps<Model>) {
  const {
    model,
    placeHolder,
    disabled,
    appendToBody,
    onChange,
    render,
    type,
    label,
    selectWithAdd,
    isSmall,
    isMultiple,
    listModel,
    onChangeMultiple,
    listItem,
  } = props;

  const internalModel = React.useMemo((): Model => {
    return model || null;
  }, [model]);

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


  // use this for multiple type
  const internalList = React.useMemo(() => {
    if (list && list.length > 0) {
      list.forEach((current) => {
        let filteredItem =
          listModel &&
          listModel.length > 0 &&
          listModel?.filter((item) => item.id === current.id)[0];
        if (filteredItem) {
          current.isSelected = true;
        } else {
          current.isSelected = false;
        }
      });
      return [...list];
    }
    return [];
  }, [list, listModel]);

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
        setList(listItem);
      }
    },
    [disabled, listItem]
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
      let filteredItem = listModel?.filter(
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
    [list, listModel, onChangeMultiple, selectedList]
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
    onChange(null);
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
          const listHeight = selectListRef.current
            ? selectListRef.current.clientHeight
            : 180;
          setAppendToBodyStyle({
            position: "fixed",
            top: currentPosition.top - (listHeight + 30),
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
        className={classNames("select__container", {
          "multiple-select__container": isMultiple,
        })}
        ref={wrapperRef}
      >
        <div className="select__input" onClick={handleToggle}>
          {isMultiple ? (
            <InputTag
              listItem={listModel} // value of input, event should change these on update
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
              isFilter={true}
            />
          ) : (
            <InputSelect
              model={internalModel} // value of input, event should change these on update
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
              isFilter={true}
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
                  >
                    {internalList.length > 0 ? (
                      internalList.map((item, index) => (
                        <div
                          className={classNames(
                            "select__item p-l--xs p-y--xs p-r--xxs",
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
                              {render(item)}
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

              {selectWithAdd && (
                <div
                  className={classNames(
                    "select__bottom-button select__add-button p-y--xs"
                  )}
                >
                  <Add16 className="m-l--xs" />
                  <span className="m-l--xs">Add new</span>
                </div>
              )}
            </div>
          )
          : isExpand && (
            <div className="select__list-container" style={appendToBodyStyle}>
              {
                <>
                  <div className="select__list" ref={selectListRef}>
                    {list.length > 0 ? (
                      list.map((item, index) => (
                        <div
                          className={classNames(
                            "select__item p-l--xs p-y--xs",
                            {
                              "select__item--selected":
                                item.id === internalModel?.id,
                            }
                          )}
                          tabIndex={-1}
                          key={index}
                          onKeyDown={handleMove(item)}
                          onClick={handleClickItem(item)}
                        >
                          <span className="select__text">{render(item)}</span>
                          {item.id === internalModel?.id && (
                            <div style={{ height: "16px" }}>
                              <Checkmark16 />
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <Empty />
                    )}
                  </div>
                </>
              }
              {selectWithAdd && (
                <div
                  className={classNames(
                    "select__bottom-button select__add-button p-y--xs"
                  )}
                >
                  <Add16 className="m-l--xxs" />
                  <span>Add new</span>
                </div>
              )}
            </div>
          )}
      </div>
    </>
  );
}

AdvanceEnumFilter.defaultProps = {
  appendToBody: false,
  render: defaultRenderObject,
  disabled: false,
};

export default AdvanceEnumFilter;
