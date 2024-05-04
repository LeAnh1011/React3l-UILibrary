import React, { RefObject } from "react";
import { DEBOUNCE_TIME_300 } from "@Configs/consts";
import { Checkmark } from "@carbon/icons-react";
import { Model, ModelFilter } from "react3l-common";
import { useDebounceFn } from "ahooks";
import { Empty, Tooltip } from "antd";
import classNames from "classnames";
import type { ErrorObserver, Observable } from "rxjs";
import { CommonService } from "@Services/common-service";
import InputSelect from "@Components/Input/InputSelect/InputSelect";
import { BORDER_TYPE } from "@Configs/enum";
import IconLoading from "@Components/IconLoading/IconLoading";
import "./AdvanceIdFilter.scss";

export interface AdvanceIdFilterProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  /**Value users select*/
  value?: Model;
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
  /**Append this component to body*/
  appendToBody?: boolean;
  /**Api to get list data filter*/
  getList?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  /**Handle the change value of the component*/
  onChange?: (id: number, T?: T) => void;
  /**Provide a function to render a specific property as name*/
  render?: (t: T) => string;
  /**Model filter class of API get list data*/
  classFilter: new () => TModelFilter;
  /**Control the style type of component: MATERIAL, BORDERED, FLOAT_LABEL */
  type?: BORDER_TYPE;
  /**Label for current field*/
  label?: string;
  /**Control the size of the component*/
  isSmall?: boolean;
  /**Prefer option filter to select*/
  preferOptions?: T[];
  /**Set maximum length of each data row to render*/
  maxLengthItem?: number;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

function AdvanceIdFilter(props: AdvanceIdFilterProps<Model, ModelFilter>) {
  const {
    value,
    valueFilter,
    searchProperty,
    searchType,
    placeHolder,
    disabled,
    appendToBody,
    getList,
    onChange,
    render,
    classFilter: ClassFilter,
    type,
    label,
    isSmall,
    preferOptions,
    maxLengthItem,
    bgColor,
  } = props;

  const internalValue = React.useMemo((): Model => {
    return value || null;
  }, [value]);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [list, setList] = React.useState<Model[]>([]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [appendToBodyStyle, setAppendToBodyStyle] = React.useState({});

  const [subscription] = CommonService.useSubscription();

  const handleGetList = React.useCallback(
    (valueFilter: ModelFilter) => {
      setLoading(true);
      subscription.add(getList);
      getList(valueFilter).subscribe({
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
        ? { ...valueFilter }
        : new ClassFilter();
      if (searchType) {
        cloneValueFilter[searchProperty][searchType] = searchTerm;
      } else cloneValueFilter[searchProperty] = searchTerm;
      handleGetList(cloneValueFilter);
    },
    {
      wait: DEBOUNCE_TIME_300,
    }
  );

  const handleLoadList = React.useCallback(() => {
    try {
      const filter = valueFilter
        ? JSON.parse(JSON.stringify(valueFilter))
        : new ClassFilter();
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
    [handleLoadList, disabled]
  );

  const handleCloseSelect = React.useCallback(() => {
    setExpand(false);
  }, []);

  const handleClickItem = React.useCallback(
    (item: Model) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onChange(item.id, item);
      handleCloseSelect();
    },
    [handleCloseSelect, onChange]
  );

  const handleSearchChange = React.useCallback(
    (searchTerm: string) => {
      run(searchTerm);
    },
    [run]
  );

  const handleClearItem = React.useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  const handleClearInput = React.useCallback(() => {
    handleLoadList();
  }, [handleLoadList]);

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
      <div className="advance-id-filter__container" ref={wrapperRef}>
        <div className="select__input" onClick={handleToggle}>
          <InputSelect
            value={internalValue}
            render={render}
            placeHolder={placeHolder}
            expanded={isExpand}
            disabled={disabled}
            handleClearInput={handleClearInput}
            onSearch={handleSearchChange}
            onClear={handleClearItem}
            onKeyDown={handleKeyPress}
            onKeyEnter={handleKeyEnter}
            type={type}
            label={label}
            isSmall={isSmall}
            isFilter={true}
            bgColor={bgColor}
          />
        </div>
        {isExpand && (
          <div
            className="advance-id-filter__list-container"
            style={appendToBodyStyle}
          >
            {!loading ? (
              <>
                <div className="advance-id-filter__list" ref={selectListRef}>
                  {list.length > 0 ? (
                    list.map((item, index) => (
                      <div
                        className={classNames(
                          "advance-id-filter__item p-l--xs p-y--xs",
                          {
                            "advance-id-filter__item--selected":
                              item.id === internalValue?.id,
                          }
                        )}
                        tabIndex={-1}
                        key={index}
                        onKeyDown={handleMove(item)}
                        onClick={handleClickItem(item)}
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
            ) : (
              <div className="advance-id-filter__loading">
                <IconLoading color="#0F62FE" size={24} />
              </div>
            )}
            {!loading && list.length > 0 && (
              <div className="advance-id-filter__list-prefer">
                {preferOptions &&
                  preferOptions?.length > 0 &&
                  preferOptions.map((item, index) => (
                    <div
                      className={classNames(
                        "advance-id-filter__prefer-option advance-id-filter__item p--xs",
                        {
                          "advance-id-filter__item--selected":
                            item.id === internalValue?.id,
                        }
                      )}
                      key={index}
                      onKeyDown={handleMove(item)}
                      onClick={handleClickItem(item)}
                    >
                      <span className="advance-id-filter__text">
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
                      {item.id === internalValue?.id && <Checkmark size={16} />}
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

AdvanceIdFilter.defaultProps = {
  searchProperty: "name",
  searchType: "contain",
  appendToBody: false,
  render: defaultRenderObject,
  disabled: false,
  maxLengthItem: 30,
  bgColor: "white",
};

export default AdvanceIdFilter;
