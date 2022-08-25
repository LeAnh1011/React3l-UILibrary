import Add16 from "@carbon/icons-react/es/add/16";
import { useDebounceFn } from "ahooks";
import { Checkbox, Empty } from "antd";
import classNames from "classnames";
import IconLoading from "components/IconLoading/IconLoading";
import InputTag from "components/Input/InputTag/InputTag";
import { DEBOUNCE_TIME_300 } from "config/consts";
import { BORDER_TYPE } from "config/enum";
import React, { RefObject } from "react";
import { Model, ModelFilter } from "react3l-common";
import type { ErrorObserver, Observable } from "rxjs";
import { CommonService } from "services/common-service";
import "./AdvanceIdMultipleFilter.scss";

export interface AdvanceIdMultipleFilterProps<
  T extends Model,
  TFilter extends ModelFilter
> {
  values?: Model[];

  valueFilter?: TFilter;

  searchProperty?: string;

  searchType?: string;

  placeHolder?: string;

  disabled?: boolean;

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

export function AdvanceIdMultipleFilter(
  props: AdvanceIdMultipleFilterProps<Model, ModelFilter>
) {
  const {
    values,
    valueFilter,
    searchProperty,
    searchType,
    placeHolder,
    disabled,
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

  const [list, setList] = React.useState<Model[]>([]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [subscription] = CommonService.useSubscription();

  const handleGetList = React.useCallback(
    async (filterValue: ModelFilter) => {
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

  const { run } = useDebounceFn(
    (searchTerm: string) => {
      const cloneValueFilter = valueFilter
        ? JSON.parse(JSON.stringify(valueFilter))
        : new ClassFilter();
      if (searchType) {
        cloneValueFilter[searchProperty][searchType] = searchTerm;
      } else {
        cloneValueFilter[searchProperty] = searchTerm;
      }
      handleGetList(cloneValueFilter);
    },
    {
      wait: DEBOUNCE_TIME_300,
    }
  );

  const internalList = React.useMemo(() => {
    if (list && list.length > 0) {
      list.forEach((current) => {
        let filteredItem =
          values &&
          values.length > 0 &&
          values?.filter((item) => item.id === current.id)[0];
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

  const internalPreferOptions = React.useMemo(() => {
    if (preferOptions && preferOptions.length > 0) {
      preferOptions.forEach((current) => {
        let filteredItem =
          values &&
          values?.length > 0 &&
          values.filter((item) => item.id === current.id)[0];
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

  const handleLoadList = React.useCallback(() => {
    try {
      const filter = valueFilter ? valueFilter : new ClassFilter();
      handleGetList(filter);
    } catch (error) {}
  }, [valueFilter, ClassFilter, handleGetList]);

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
      let filteredItem = values?.filter((current) => current.id === item.id)[0];
      if (filteredItem) {
        const tmp = [...values];
        const ids = values?.map((item) => item?.id);
        const index = tmp.indexOf(filteredItem);
        tmp.splice(index, 1);
        ids.splice(index, 1);
        onChange([...tmp], ids as any);
      } else {
        const ids = values?.map((item) => item?.id);
        onChange([...values, item], [...ids, item?.id] as any);
      }
    },
    [values, onChange]
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
    onChange([], []);
  }, [onChange]);

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
        className="advance-id-filter__container advance-id-multiple-filter__container"
        ref={wrapperRef}
      >
        <div className="advance-id-filter__input" onClick={handleToggle}>
          <InputTag
            listValue={values}
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
            isFilter={true}
            isNotExpand={!isExpand}
          />
        </div>
        {isExpand && (
          <div className="advance-id-filter__list-container">
            {!loading ? (
              <>
                <div
                  className="advance-id-filter__list advance-id-multiple-filter__list"
                  ref={selectListRef}
                >
                  {internalList.length > 0 ? (
                    internalList.map((item, index) => (
                      <div
                        className={classNames(
                          "advance-id-filter__item p-l--xs p-y--xs p-r--xxs",
                          {
                            "advance-id-filter__item--selected":
                              item.isSelected,
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
                          <span className="advance-id-filter__text">
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
            ) : (
              <div className="advance-id-filter__loading">
                <IconLoading color="#0F62FE" size={24} />
              </div>
            )}
            {!loading && list.length > 0 && (
              <div className="advance-id-filter__list-prefer">
                {internalPreferOptions &&
                  internalPreferOptions?.length > 0 &&
                  internalPreferOptions.map((item, index) => (
                    <div
                      className={classNames(
                        "advance-id-filter__prefer-option advance-id-filter__item p-l--xs p-y--xs p-r--xxs"
                      )}
                      key={index}
                      onKeyDown={handleMove(item)}
                      onClick={handleClickParentItem}
                    >
                      <Checkbox
                        onChange={handleClickItem(item)}
                        checked={item.isSelected}
                      >
                        <span className="advance-id-filter__text ">
                          {render(item)}
                        </span>
                      </Checkbox>
                    </div>
                  ))}
              </div>
            )}
            {selectWithAdd && (
              <div
                className={classNames(
                  "advance-id-filter__bottom-button advance-id-filter__add-button p-y--xs"
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

AdvanceIdMultipleFilter.defaultProps = {
  searchProperty: "name",
  searchType: "startWith",
  isEnumerable: false,
  render: defaultRenderObject,
  disabled: false,
};

export default AdvanceIdMultipleFilter;
