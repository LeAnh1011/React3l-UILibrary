import { ChevronDown, Search } from "@carbon/icons-react";
import IconLoading from "@Components/IconLoading/IconLoading";
import InputText from "@Components/Input/InputText";
import { DEBOUNCE_TIME_300 } from "@Configs/consts";
import { CommonService } from "@Services/common-service";
import { useDebounceFn } from "ahooks";
import { Checkbox, Empty, Tooltip } from "antd";
import classNames from "classnames";
import React, { RefObject } from "react";
import { Model, ModelFilter } from "react3l-common";
import { ErrorObserver, Observable } from "rxjs";
import "./AdvanceMultipleIdFilterMaster.scss";

export interface AdvanceMultipleIdFilterMasterProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  /**list value users select*/
  values?: any[];
  /**Label for current field*/
  label?: string;
  /**Value filter for api get data option*/
  valueFilter?: TModelFilter;
  /**The property name of the model filter you want to search in the list data*/
  searchProperty?: string;
  /**The type of searchProperty you want to search in the list data*/
  searchType?: string;
  /**Placeholder of the component*/
  placeHolder?: string;
  /**Not allow to handle change filter*/
  disabled?: boolean;
  /**True for data list of filter is Enum*/
  isEnumList?: boolean;
  /**Api to get list data filter*/
  getList?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  /**Handle the change value of the component*/
  onChange?: (selectedList?: T[], ids?: []) => void;
  /**Provide a function to render a specific property as name*/
  render?: (t: T) => string;
  /**Model filter class of API get list data*/
  classFilter: new () => TModelFilter;
  /**Use to custom style the component*/
  className?: string;
  /**Prefer option filter to select*/
  preferOptions?: T[];
  /**Set maximum length of text to search*/
  maxLength?: number;
  /**Show maximum length of item of each item in the dropdown*/
  maxLengthItem?: number;
}

function defaultRenderObject<T extends Model>(t: T) {
  return CommonService.limitWord(t?.name, 25);
}

function AdvanceMultipleIdFilterMaster(
  props: AdvanceMultipleIdFilterMasterProps<Model, ModelFilter>
) {
  const {
    valueFilter,
    label,
    values,
    searchProperty,
    searchType,
    placeHolder,
    disabled,
    isEnumList,
    getList,
    onChange,
    render,
    classFilter: ClassFilter,
    className,
    preferOptions,
    maxLength,
    maxLengthItem = 30,
  } = props;

  const [loading, setLoading] = React.useState<boolean>(false);

  const [list, setList] = React.useState<Model[]>([]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );
  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const inputRef: any = React.useRef<any>(null);

  const [subscription] = CommonService.useSubscription();

  const handleGetList = React.useCallback(
    (filterValue: ModelFilter) => {
      setLoading(true);
      subscription.add(getList);
      getList(filterValue).subscribe({
        next: (res: Model[]) => {
          setList(res);
          setLoading(false);
        },
        error: (err: ErrorObserver<Error>) => {
          setList([]);
          setLoading(false);
        },
      });
    },
    [getList, subscription]
  );

  const internalList = React.useMemo(() => {
    if (list && list.length > 0) {
      list.forEach((current) => {
        let filteredItem =
          values &&
          values?.length > 0 &&
          values?.filter((item) => item === current.id)[0];
        if (filteredItem) {
          current.isSelected = true;
        } else {
          current.isSelected = false;
        }
      });
      return [...list];
    }
    return [];
  }, [list, values]);

  const selectedList = React.useMemo(() => {
    if (list && list.length > 0) {
      const select = list.filter((current) => {
        let filteredItem =
          values &&
          values?.length > 0 &&
          values.filter((item) => Number(item) === Number(current.id))[0];
        return filteredItem;
      });
      return [...select];
    }
    return [];
  }, [list, values]);

  const internalPreferOptions = React.useMemo(() => {
    if (preferOptions && preferOptions.length > 0) {
      preferOptions.forEach((current) => {
        let filteredItem =
          values &&
          values?.length > 0 &&
          values.filter((item) => item === current.id)[0];
        if (filteredItem) {
          current.isSelected = true;
        } else {
          current.isSelected = false;
        }
      });
      return [...preferOptions];
    }
    return [];
  }, [preferOptions, values]);

  const { run } = useDebounceFn(
    (searchTerm: string) => {
      const cloneValueFilter = valueFilter
        ? { ...valueFilter }
        : new ClassFilter();
      if (!isEnumList) {
        if (searchType) {
          cloneValueFilter[searchProperty][searchType] = searchTerm;
        } else cloneValueFilter[searchProperty] = searchTerm;
      }
      handleGetList(cloneValueFilter);
    },
    {
      wait: DEBOUNCE_TIME_300,
    }
  );

  const handleLoadList = React.useCallback(() => {
    try {
      const filter = valueFilter ? { ...valueFilter } : new ClassFilter();
      handleGetList(filter);
    } catch (error) {}
  }, [valueFilter, ClassFilter, handleGetList]);

  const handleToggle = React.useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!disabled) {
        setExpand(true);
        setTimeout(() => {
          inputRef.current.children[0].children[0].focus();
        }, 400);
        await handleLoadList();
      }
    },
    [handleLoadList, disabled]
  );

  const handleCloseAdvanceMultipleIdFilterMaster = React.useCallback(() => {
    setExpand(false);
  }, []);

  const handleClickItem = React.useCallback(
    (item: Model) => (event: any) => {
      let filteredItem = values?.filter((id) => id === item.id)[0];
      const cloneValueFilter = valueFilter
        ? { ...valueFilter }
        : new ClassFilter();

      if (!cloneValueFilter["id"]["notIn"]) {
        cloneValueFilter["id"]["notIn"] = [item?.id];
      } else {
        cloneValueFilter["id"]["notIn"].push(item?.id);
      }
      if (filteredItem) {
        const tmpSelect = [...selectedList];
        const ids = values?.map((item) => item?.id);
        const index = tmpSelect.findIndex(
          (item) => item.id === filteredItem.id
        );
        ids.splice(index, 1);
        tmpSelect.splice(index, 1);
        onChange([...tmpSelect], ids as any);
      } else {
        const ids = selectedList?.map((item) => item?.id);
        onChange([...selectedList, item], [...ids, item?.id] as any);
      }
    },
    [values, valueFilter, ClassFilter, onChange, selectedList]
  );

  const handleSearchChange = React.useCallback(
    (searchTerm: string) => {
      run(searchTerm);
    },
    [run]
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
  const handleKeyDown = React.useCallback(
    (event) => {
      switch (event.keyCode) {
        case 40:
          const firstItem = selectListRef.current
            .firstElementChild as HTMLElement;
          firstItem.focus();
          break;
        case 9:
          handleCloseAdvanceMultipleIdFilterMaster();
          break;
        default:
          return;
      }
    },
    [handleCloseAdvanceMultipleIdFilterMaster]
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

  CommonService.useClickOutside(
    wrapperRef,
    handleCloseAdvanceMultipleIdFilterMaster
  );

  return (
    <>
      <div
        className={classNames(
          "advance-multi-id-filter-master__wrapper",
          className
        )}
        ref={wrapperRef}
      >
        <div
          className={classNames(
            "advance-id-filter-master__container p-l--sm p-t--xs p-r--xs p-b--xs d-flex",
            {
              "filter-bg": isExpand,
              "p-b---active": values?.length > 0,
            }
          )}
          onClick={handleToggle}
        >
          <label
            className={classNames("d-flex", {
              "filter-active": values?.length > 0,
            })}
          >
            <span className="advance-count-item__text p-r--3xs">
              {values?.length > 0 && <>({values?.length})</>}
            </span>
            <div className="advance-id-filter-master__title">
              <span className="filter-title"> {label}</span>
              <ChevronDown size={16} />
            </div>
          </label>
        </div>
        {isExpand && (
          <div className="advance-id-filter-master__list-container m-t--3xs">
            <div className="advance-id-filter__input p--xs">
              <InputText
                isSmall={false}
                maxLength={maxLength}
                onChange={handleSearchChange}
                placeHolder={placeHolder}
                suffix={<Search size={16} />}
                ref={inputRef}
                onKeyDown={handleKeyDown}
              />
            </div>
            {!loading ? (
              <div className="advance-id-master__list" ref={selectListRef}>
                {internalList.length > 0 ? (
                  internalList.map((item, index) => (
                    <div
                      className={classNames(
                        "advance-id-filter__item p-l--xs p-y--xs p-r--2xs",
                        {
                          "advance-id-filter__item--selected": item.isSelected,
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
            ) : (
              <div className="advance-id-filter__loading">
                <IconLoading color="#0F62FE" size={24} />
              </div>
            )}
            {!loading && list.length > 0 && (
              <div className="advance-id-master__list-prefer">
                {internalPreferOptions &&
                  internalPreferOptions?.length > 0 &&
                  internalPreferOptions.map((item, index) => (
                    <div
                      className={classNames(
                        "advance-id-filter__prefer-option advance-id-filter__item p-l--xs p-y--xs p-r--2xs"
                      )}
                      key={index}
                      onKeyDown={handleMove(item)}
                      onClick={handleClickParentItem}
                    >
                      <Checkbox
                        onChange={handleClickItem(item)}
                        checked={item.isSelected}
                      >
                        <span className="advance-id-master__text">
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
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

AdvanceMultipleIdFilterMaster.defaultProps = {
  searchProperty: "name",
  searchType: "contain",
  isEnumList: false,
  render: defaultRenderObject,
  disabled: false,
  typeRender: "name",
  isIdValue: true,
  maxLength: 200,
};

export default AdvanceMultipleIdFilterMaster;
