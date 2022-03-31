import { DEBOUNCE_TIME_300 } from "config/consts";
import { Add16, Checkmark16 } from "@carbon/icons-react";
import { Model, ModelFilter } from "react3l-common";
import { useDebounceFn } from "ahooks";
import { Empty } from "antd";
import classNames from "classnames";
import React, { RefObject } from "react";
import { ErrorObserver, Observable } from "rxjs";
import { CommonService } from "services/common-service";
import InputSelect from "components/Input/InputSelect/InputSelect";
import { BORDER_TYPE } from "config/enum";
import "./AdvanceIdFilter.scss";
import IconLoading from "components/IconLoading/IconLoading";

export interface AdvanceIdFilterProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  value?: Model;

  valueFilter?: TModelFilter;

  searchProperty?: string;

  searchType?: string;

  placeHolder?: string;

  disabled?: boolean;

  isMaterial?: boolean;

  isEnumerable?: boolean;

  appendToBody?: boolean;

  getList?: (TModelFilter?: TModelFilter) => Observable<T[]>;

  onChange?: (id: number, T?: T) => void;

  render?: (t: T) => string;

  classFilter: new () => TModelFilter;

  type?: BORDER_TYPE;

  label?: string;

  selectWithAdd?: boolean;

  selectWithPreferOption?: boolean;

  isSmall?: boolean;

  preferOptions?: T[];
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
    isEnumerable,
    appendToBody,
    getList,
    onChange,
    render,
    classFilter: ClassFilter,
    type,
    label,
    selectWithAdd,
    isSmall,
    preferOptions,
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

  const { run } = useDebounceFn(
    (searchTerm: string) => {
      const cloneValueFilter = valueFilter
        ? { ...valueFilter }
        : new ClassFilter();
      if (!isEnumerable) {
        if (searchType) {
          cloneValueFilter[searchProperty][searchType] = searchTerm;
        } else cloneValueFilter[searchProperty] = searchTerm;
      }
      setLoading(true);
      subscription.add(getList);
      getList(cloneValueFilter).subscribe({
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
    {
      wait: DEBOUNCE_TIME_300,
    }
  );

  const handleLoadList = React.useCallback(() => {
    try {
      setLoading(true);
      subscription.add(getList);
      const filter = valueFilter
        ? JSON.parse(JSON.stringify(valueFilter))
        : new ClassFilter();
      getList(filter).subscribe({
        next: (res: Model[]) => {
          setList(res);
          setLoading(false);
        },
        error: (err: ErrorObserver<Error>) => {
          setList([]);
          setLoading(false);
        },
      });
    } catch (error) {}
  }, [getList, valueFilter, ClassFilter, subscription]);

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
    onChange(null);
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
      <div className="advance-id-filter__container" ref={wrapperRef}>
        <div className="select__input" onClick={handleToggle}>
          <InputSelect
            value={internalValue} // value of input, event should change these on update
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
                        <span className="advance-id-filter__text">
                          {render(item)}
                        </span>
                        {item.id === internalValue?.id && (
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
                        {render(item)}
                      </span>
                      {item.id === internalValue?.id && (
                        <div style={{ height: "16px" }}>
                          <Checkmark16 />
                        </div>
                      )}
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

AdvanceIdFilter.defaultProps = {
  searchProperty: "name",
  searchType: "contain",
  isEnumerable: false,
  appendToBody: false,
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
};

export default AdvanceIdFilter;
