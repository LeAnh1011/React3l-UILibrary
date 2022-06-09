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
import { Checkbox, Empty, Tooltip } from "antd";
import IconLoading from "components/IconLoading/IconLoading";

export interface MultipleSelectProps<
  T extends Model,
  TFilter extends ModelFilter
> {
  values?: Model[];

  valueFilter?: TFilter;

  searchProperty?: string;

  searchType?: string;

  placeHolder?: string;

  disabled?: boolean;

  isMaterial?: boolean;

  isRequired?: boolean;

  appendToBody?: boolean;

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

export function MultipleSelect(props: MultipleSelectProps<Model, ModelFilter>) {
  const {
    values,
    valueFilter,
    searchProperty,
    searchType,
    placeHolder,
    disabled,
    isMaterial,
    isRequired,
    appendToBody,
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

  const [appendToBodyStyle, setAppendToBodyStyle] = React.useState({});

  const [subscription] = CommonService.useSubscription();

  const handleGetList = React.useCallback(
    async (filterValue: ModelFilter) => {
      subscription.add(getList);
      setLoading(true);
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
      cloneValueFilter[searchProperty][searchType] = searchTerm;
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
      if (!disabled && !isExpand) {
        setExpand(true);
        await handleLoadList();
      }
    },
    [disabled, isExpand, handleLoadList]
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
    const cloneValueFilter = new ClassFilter();
    cloneValueFilter["id"]["notIn"] = [];
    handleGetList(cloneValueFilter);
    onChange([], []);
  }, [ClassFilter, handleGetList, onChange]);

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

  CommonService.useClickOutside(wrapperRef, handleCloseSelect);

  return (
    <>
      <div
        className="select__container multiple-select__container"
        ref={wrapperRef}
      >
        <div className="select__input" onClick={handleToggle}>
          {values && values?.length > 0 ? (
            <Tooltip
              placement="topLeft"
              title={
                <>
                  {values?.map((itemValue: any, index: number) => (
                    <span key={index}>
                      <>
                        <span>{itemValue?.name}</span>
                        {index < values?.length - 1 && (
                          <span className="m-r--xxxs">&#44;</span>
                        )}
                      </>
                    </span>
                  ))}
                </>
              }
            >
              <div>
                <InputTag
                  listValue={values}
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
                  isNotExpand={!isExpand}
                  isRequired={isRequired}
                />
              </div>
            </Tooltip>
          ) : (
            <InputTag
              listValue={values}
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
              isNotExpand={!isExpand}
              isRequired={isRequired}
            />
          )}
        </div>

        {isExpand && (
          <div className="select__list-container" style={appendToBodyStyle}>
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
                <IconLoading color="#0F62FE" size={24} />
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
                        <span className="select__text">{render(item)}</span>
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
  searchType: "contain",
  isEnumerable: false,
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
};

export default MultipleSelect;
