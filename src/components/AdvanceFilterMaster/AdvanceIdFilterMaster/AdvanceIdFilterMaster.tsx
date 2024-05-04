import { Checkmark, ChevronDown, Search } from "@carbon/icons-react";
import IconLoading from "@Components/IconLoading/IconLoading";
import InputText from "@Components/Input/InputText";
import { DEBOUNCE_TIME_300 } from "@Configs/consts";
import { CommonService } from "@Services/common-service";
import { useDebounceFn } from "ahooks";
import { Empty, Tooltip } from "antd";
import classNames from "classnames";
import React, { RefObject } from "react";
import { Model, ModelFilter } from "react3l-common";
import { ErrorObserver, Observable } from "rxjs";
import "./AdvanceIdFilterMaster.scss";

export interface AdvanceIdFilterMasterProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  /**Value users select*/
  value?: number | string;
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
  /**Boolean set false if value is not an IdValue*/
  isIdValue?: boolean;
  /**Name of property to set value to if value is not an IdValue */
  typeRender?: string;
  /**Api to get list data filter*/
  getList?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  /**Handle the change value of the component*/
  onChange?: (T: number, value?: T) => void;
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
  return t?.name;
}

function AdvanceIdFilterMaster(
  props: AdvanceIdFilterMasterProps<Model, ModelFilter>
) {
  const {
    valueFilter,
    label,
    value,
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
    maxLengthItem,
  } = props;

  const [loading, setLoading] = React.useState<boolean>(false);

  const [list, setList] = React.useState<Model[]>([]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const inputRef: any = React.useRef<any>(null);

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
        }, 300);
        await handleLoadList();
      }
    },
    [handleLoadList, disabled]
  );

  const handleCloseAdvanceIdFilterMaster = React.useCallback(() => {
    setExpand(false);
  }, []);

  const handleClickItem = React.useCallback(
    (item: Model) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onChange(item.id, item);
      handleCloseAdvanceIdFilterMaster();
    },
    [handleCloseAdvanceIdFilterMaster, onChange]
  );

  const handleSearchChange = React.useCallback(
    (searchTerm: string) => {
      run(searchTerm);
    },
    [run]
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

  const handleKeyDown = React.useCallback(
    (event) => {
      switch (event.keyCode) {
        case 40:
          const firstItem = selectListRef.current
            .firstElementChild as HTMLElement;
          firstItem.focus();
          break;
        case 9:
          handleCloseAdvanceIdFilterMaster();
          break;
        default:
          return;
      }
    },
    [handleCloseAdvanceIdFilterMaster]
  );

  CommonService.useClickOutside(wrapperRef, handleCloseAdvanceIdFilterMaster);

  return (
    <>
      <div
        className={classNames("advance-id-filter-master__wrapper", className)}
        ref={wrapperRef}
      >
        <div
          className={classNames(
            "advance-id-filter-master__container p-l--sm p-t--xs p-r--xs p-b--xs",
            {
              "filter-bg": isExpand,
              "p-b---active": value,
            }
          )}
          onClick={handleToggle}
        >
          <div
            className={classNames({
              "filter-active":
                typeof value === "number" || typeof value === "string",
            })}
          >
            <div className="advance-id-filter-master__title">
              <span className="filter-title"> {label}</span>
              <ChevronDown size={16} />
            </div>
          </div>
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
                {list.length > 0 ? (
                  list.map((item, index) => (
                    <div
                      className={classNames("advance-id-filter__item p--xs")}
                      tabIndex={-1}
                      key={index}
                      onKeyDown={handleMove(item)}
                      onClick={handleClickItem(item)}
                    >
                      {maxLengthItem && render(item)?.length > maxLengthItem ? (
                        <Tooltip title={render(item)}>
                          {CommonService.limitWord(render(item), maxLengthItem)}
                        </Tooltip>
                      ) : (
                        render(item)
                      )}
                      {item.id === Number(value) && <Checkmark size={16} />}
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
                {preferOptions &&
                  preferOptions?.length > 0 &&
                  preferOptions.map((item, index) => (
                    <div
                      className={classNames(
                        "advance-id-filter__prefer-option advance-id-filter__item p--xs"
                      )}
                      key={index}
                      onKeyDown={handleMove(item)}
                      onClick={handleClickItem(item)}
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
                      {item.id === Number(value) && <Checkmark size={16} />}
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

AdvanceIdFilterMaster.defaultProps = {
  searchProperty: "name",
  searchType: "contain",
  isEnumList: false,
  render: defaultRenderObject,
  disabled: false,
  maxLength: 200,
  maxLengthItem: 30,
};

export default AdvanceIdFilterMaster;
