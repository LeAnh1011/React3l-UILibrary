import { DEBOUNCE_TIME_300 } from "@Configs/consts";
import { Add, Checkmark } from "@carbon/icons-react";
import { Model, ModelFilter } from "react3l-common";
import { useDebounceFn } from "ahooks";
import { Empty, Tooltip } from "antd";
import classNames from "classnames";
import React, { RefObject } from "react";
import type { ErrorObserver, Observable } from "rxjs";
import { CommonService } from "@Services/common-service";
import InputSelect from "@Components/Input/InputSelect/InputSelect";
import { BORDER_TYPE } from "@Configs/enum";
import IconLoading from "@Components/IconLoading/IconLoading";
import { InputAction } from "@Components/Input/InputText/InputText";
import "./Select.scss";

export interface SelectProps<
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
  /**Not allow to handle change value*/
  disabled?: boolean;
  /**True for data list  is Enum*/
  isEnumerable?: boolean;
  /**Append this component to body*/
  appendToBody?: boolean;
  /**Show symbol * as required field*/
  isRequired?: boolean;
  /**Api to get list data*/
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
  /**Option show button add new*/
  selectWithAdd?: () => void;
  /**Title of button add new */
  selectWithAddTitle?: string;
  /** Control the size of the component */
  isSmall?: boolean;
  /**Prefer option to select*/
  preferOptions?: T[];
  /**Show maximum length of item in each data row*/
  maxLengthItem?: number;
  /** Provide a custom action (onClick) to the component */
  action?: InputAction;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
  /**Use to custom style the component*/
  className?: string;
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

function Select(props: SelectProps<Model, ModelFilter>) {
  const {
    value,
    valueFilter,
    searchProperty,
    searchType,
    placeHolder,
    disabled,
    isEnumerable,
    appendToBody,
    isRequired,
    getList,
    onChange,
    render,
    classFilter: ClassFilter,
    type,
    label,
    selectWithAdd,
    selectWithAddTitle,
    isSmall,
    preferOptions,
    maxLengthItem,
    action,
    bgColor,
    className,
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

  const handleLoadList = React.useCallback(() => {
    try {
      setLoading(true);
      subscription.add(getList);
      const filter = valueFilter ? valueFilter : new ClassFilter();
      handleGetList(filter);
    } catch (error) {}
  }, [subscription, getList, valueFilter, ClassFilter, handleGetList]);

  const { run } = useDebounceFn(
    (searchTerm: string) => {
      const cloneValueFilter = valueFilter
        ? JSON.parse(JSON.stringify(valueFilter))
        : new ClassFilter();
      if (!isEnumerable) {
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

  const handleClearInput = React.useCallback(() => {
    handleLoadList();
  }, [handleLoadList]);

  const handleToggle = React.useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!disabled) {
        setExpand(true);
        if (isEnumerable) {
          if (list.length === 0) {
            await handleLoadList();
          }
        } else {
          await handleLoadList();
        }
      }
    },
    [handleLoadList, isEnumerable, list, disabled]
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
      const handleScroll = () => {
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
      };
      handleScroll();
      document.addEventListener("scroll", handleScroll, true);

      return () => {
        document.removeEventListener("scroll", handleScroll);
      };
    }
  }, [appendToBody, isExpand]);

  return (
    <>
      <div
        className={classNames("select__container", className)}
        ref={wrapperRef}
      >
        <div className="select__input" onClick={handleToggle}>
          <InputSelect
            value={internalValue}
            render={render}
            placeHolder={placeHolder}
            expanded={isExpand}
            disabled={disabled}
            onSearch={handleSearchChange}
            onClear={handleClearItem}
            onKeyDown={handleKeyPress}
            onKeyEnter={handleKeyEnter}
            handleClearInput={handleClearInput}
            isRequired={isRequired}
            type={type}
            label={label}
            isSmall={isSmall}
            action={action}
            bgColor={bgColor}
            handlePressExpandedIcon={handleCloseSelect}
          />
        </div>
        {isExpand && (
          <div className="select__list-container" style={appendToBodyStyle}>
            {!loading ? (
              <>
                <div className="select__list" ref={selectListRef}>
                  {list.length > 0 ? (
                    list.map((item, index) => (
                      <div
                        className={classNames("select__item p-l--xs p-y--xs", {
                          "select__item--selected":
                            item.id === internalValue?.id,
                        })}
                        tabIndex={-1}
                        key={index}
                        onKeyDown={handleMove(item)}
                        onClick={handleClickItem(item)}
                      >
                        {maxLengthItem &&
                        render(item)?.length > maxLengthItem ? (
                          <Tooltip title={render(item)}>
                            <span className="select__text">
                              {CommonService.limitWord(
                                render(item),
                                maxLengthItem
                              )}
                            </span>
                          </Tooltip>
                        ) : (
                          <span className="select__text">{render(item)}</span>
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
              <div className="select__loading">
                <IconLoading color="#0F62FE" size={24} />
              </div>
            )}
            {!loading && list.length > 0 && (
              <div className="select__list-prefer">
                {preferOptions &&
                  preferOptions?.length > 0 &&
                  preferOptions.map((item, index) => (
                    <div
                      className={classNames(
                        "select__prefer-option select__item p--xs",
                        {
                          "select__item--selected":
                            item.id === internalValue?.id,
                        }
                      )}
                      key={index}
                      onKeyDown={handleMove(item)}
                      onClick={handleClickItem(item)}
                    >
                      {maxLengthItem && render(item)?.length > maxLengthItem ? (
                        <Tooltip title={render(item)}>
                          <span className="select__text">
                            {CommonService.limitWord(
                              render(item),
                              maxLengthItem
                            )}
                          </span>
                        </Tooltip>
                      ) : (
                        <span className="select__text">{render(item)}</span>
                      )}
                      {item.id === internalValue?.id && <Checkmark size={16} />}
                    </div>
                  ))}
              </div>
            )}
            {typeof selectWithAdd !== "undefined" && (
              <div
                className={classNames(
                  "select__bottom-button select__add-button p-y--xs"
                )}
                onClick={selectWithAdd}
              >
                <Add size={16} className="m-l--2xs" />
                <span>
                  {selectWithAddTitle ? selectWithAddTitle : "Add new"}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

Select.defaultProps = {
  searchProperty: "name",
  searchType: "contain",
  isEnumerable: false,
  appendToBody: false,
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
  maxLengthItem: 30,
};

export default Select;
