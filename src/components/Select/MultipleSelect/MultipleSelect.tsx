import { Model, ModelFilter } from "react3l-common";
import { Add16 } from "@carbon/icons-react";
import { useDebounceFn } from "ahooks";
import { CommonService } from "services/common-service";
import classNames from "classnames";
import InputTag from "components/Input/InputTag/InputTag";
import { DEBOUNCE_TIME_300 } from "config/consts";
import React, { RefObject } from "react";
import { ErrorObserver, Observable } from "rxjs";
import { BORDER_TYPE } from "config/enum";
import "./MultipleSelect.scss";
import { Checkbox, Empty, Spin } from "antd";

export interface MultipleSelectProps<
  T extends Model,
  TFilter extends ModelFilter
  > {
  models?: Model[];

  modelFilter?: TFilter;

  searchProperty?: string;

  searchType?: string;

  placeHolder?: string;

  disabled?: boolean;

  isMaterial?: boolean;

  getList?: (TModelFilter?: TFilter) => Observable<T[]>;

  onChange?: (selectedList?: T[], ids?: []) => void;

  render?: (t: T) => string;

  classFilter: new () => TFilter;

  label?: string;

  type?: BORDER_TYPE;

  isSmall?: boolean;

  selectWithAdd?: boolean;

  selectWithPreferOption?: boolean;

  isUsingSearch?: boolean;

  preferOptions?: T[];
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

export function MultipleSelect(props: MultipleSelectProps<Model, ModelFilter>) {
  const {
    models,
    modelFilter,
    searchProperty,
    searchType,
    placeHolder,
    disabled,
    isMaterial,
    getList,
    onChange,
    render,
    classFilter: ClassFilter,
    label,
    type,
    isSmall,
    selectWithAdd,
    isUsingSearch,
    preferOptions,
  } = props;

  const [loading, setLoading] = React.useState<boolean>(false);

  const [firstLoad, setFirstLoad] = React.useState<boolean>(true);

  const [list, setList] = React.useState<Model[]>([]);

  const [selectedList, dispatch] = React.useReducer(multipleSelectReducer, []);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [subscription] = CommonService.useSubscription();

  const { run } = useDebounceFn(
    (searchTerm: string) => {
      const cloneModelFilter = modelFilter
        ? { ...modelFilter }
        : new ClassFilter();
      cloneModelFilter[searchProperty][searchType] = searchTerm;
      setLoading(true);
      subscription.add(getList);
      getList(cloneModelFilter).subscribe(
        (res: Model[]) => {
          setList(res);
          setLoading(false);
        },
        (err: ErrorObserver<Error>) => {
          setList([]);
          setLoading(false);
        }
      );
    },
    {
      wait: DEBOUNCE_TIME_300,
    }
  );

  const internalList = React.useMemo(() => {
    if (list && list.length > 0) {
      list.forEach((current) => {
        let filteredItem =
          models &&
          models.length > 0 &&
          models?.filter((item) => item.id === current.id)[0];
        if (filteredItem) {
          current.isSelected = true;
        } else {
          current.isSelected = false;
        }
      });
      return [...list];
    }
    return [];
  }, [list, models]);

  const internalPreferOptions = React.useMemo(() => {
    if (preferOptions && preferOptions.length > 0) {
      preferOptions.forEach((current) => {
        let filteredItem =
          models &&
          models?.length > 0 &&
          models.filter((item) => item.id === current.id)[0];
        if (filteredItem) {
          current.isSelected = true;
        } else {
          current.isSelected = false;
        }
      });
      return [...preferOptions];
    }
    return [];
  }, [preferOptions, models]);

  React.useEffect(() => {
    if (firstLoad) {
      if (internalList && internalList?.length > 0) {
        const tempList = [...internalList, ...internalPreferOptions];
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
  }, [firstLoad, internalList, internalPreferOptions]);

  const handleLoadList = React.useCallback(() => {
    try {
      setLoading(true);
      subscription.add(getList);
      const filter = modelFilter ? modelFilter : new ClassFilter();
      getList(filter).subscribe(
        (res: Model[]) => {
          if (res) {
            setList(res);
          }
          setLoading(false);
        },
        (err: ErrorObserver<Error>) => {
          setList([]);
          setLoading(false);
        }
      );
    } catch (error) { }
  }, [getList, modelFilter, ClassFilter, subscription]);

  const handleToggle = React.useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!disabled) {
        setExpand(true);
        await handleLoadList();
      }
    },
    [disabled, handleLoadList]
  );

  const handleCloseSelect = React.useCallback(() => {
    setExpand(false);
  }, []);

  const handleClickItem = React.useCallback(
    (item: Model) => (event: any) => {
      let filteredItem = selectedList?.filter(
        (current) => current.id === item.id
      )[0];
      const cloneModelFilter = modelFilter
        ? { ...modelFilter }
        : new ClassFilter();

      if (!cloneModelFilter["id"]["notIn"]) {
        cloneModelFilter["id"]["notIn"] = [item?.id];
      } else {
        cloneModelFilter["id"]["notIn"].push(item?.id);
      }

      getList(cloneModelFilter).subscribe(
        (res: Model[]) => {
          if (res) {
            setList(res);
          }
          setLoading(false);
        },
        (err: ErrorObserver<Error>) => {
          setList([]);
          setLoading(false);
        }
      );

      if (filteredItem) {
        const tmp = [...selectedList];
        const ids = selectedList?.map((item) => item?.id);
        const index = tmp.indexOf(filteredItem);
        tmp.splice(index, 1);
        ids.splice(index, 1);
        dispatch({
          type: "REMOVE",
          data: item,
        });
        onChange([...tmp], ids as any);
      } else {
        const ids = selectedList?.map((item) => item?.id);
        onChange([...selectedList, item], [...ids, item?.id] as any);
        dispatch({
          type: "UPDATE",
          data: item,
        });
      }
    },
    [modelFilter, ClassFilter, getList, selectedList, onChange]
  );

  const handleClickParentItem = React.useCallback(
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

  const handleSearchChange = React.useCallback(
    (searchTerm: string) => {
      run(searchTerm);
    },
    [run]
  );


  const handleClearAll = React.useCallback(() => {
    const cloneModelFilter = new ClassFilter();

    cloneModelFilter["id"]["notIn"] = [];
    getList(cloneModelFilter).subscribe(
      (res: Model[]) => {
        if (res) {
          setList(res);
        }
        setLoading(false);
      },
      (err: ErrorObserver<Error>) => {
        setList([]);
        setLoading(false);
      }
    );
    onChange([], []);
    dispatch({
      type: "REMOVE_ALL",
      data: [],
    });
  }, [ClassFilter, getList, onChange]);

  const handleKeyPress = React.useCallback(
    (event: any) => {
      switch (event.keyCode) {
        case 40:
          if (selectListRef.current) {
            const firstItem = selectListRef.current
              .firstElementChild as HTMLElement;
            firstItem.focus();
          }
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
          handleClickItem(item)(null);
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
    [handleClickItem]
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

  return (
    <>
      <div
        className="select__container multiple-select__container"
        ref={wrapperRef}
      >
        <div className="select__input" onClick={handleToggle}>
          <InputTag
            listItem={models}
            isMaterial={isMaterial}
            render={render}
            placeHolder={placeHolder}
            disabled={disabled}
            onSearch={handleSearchChange}
            label={label}
            onClearMulti={handleClearAll}
            type={type}
            isSmall={isSmall}
            isUsingSearch={isUsingSearch}
            onKeyDown={handleKeyPress}
            onKeyEnter={handleKeyEnter}
          />
        </div>
        {isExpand && (
          <div className="select__list-container">
            {!loading ? (
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
                        onClick={handleClickParentItem}
                      >
                        <Checkbox
                          checked={item.isSelected}
                          onChange={handleClickItem(item)}
                        >
                          <span className="select__text">{render(item)}</span>
                        </Checkbox>
                      </div>
                    ))
                  ) : (
                    <Empty />
                  )}
                </div>
              </>
            ) : (
              <div className="select__loading">
                <Spin tip="Loading..."></Spin>
              </div>
            )}
            {!loading && list.length > 0 && (
              <div className="select__list-prefer">
                {internalPreferOptions &&
                  internalPreferOptions?.length > 0 &&
                  internalPreferOptions.map((item, index) => (
                    <div
                      className={classNames(
                        "select__prefer-option select__item p-l--xs p-y--xs p-r--xxs"
                      )}
                      key={index}
                      onKeyDown={handleMove(item)}
                      onClick={handleClickParentItem}
                    >
                      <Checkbox
                        onChange={handleClickItem(item)}
                        checked={item.isSelected}
                      >
                        <span className="select__text ">{render(item)}</span>
                      </Checkbox>
                    </div>
                  ))}
              </div>
            )}
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
        )}
      </div>
    </>
  );
}

MultipleSelect.defaultProps = {
  searchProperty: "name",
  searchType: "startWith",
  isEnumerable: false,
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
};

export default MultipleSelect;
