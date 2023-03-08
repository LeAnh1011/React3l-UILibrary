import { DEBOUNCE_TIME_300 } from "@Configs/consts";
import Add16 from "@carbon/icons-react/es/add/16";
import Search16 from "@carbon/icons-react/es/search/16";
import View16 from "@carbon/icons-react/es/view/16";
import ChevronDown16 from "@carbon/icons-react/es/chevron--down/16";
import Checkmark16 from "@carbon/icons-react/es/checkmark/16";
import { Model, ModelFilter } from "react3l-common";
import { useDebounceFn } from "ahooks";
import { Empty, Tooltip } from "antd";
import classNames from "classnames";
import React, { RefObject } from "react";
import type { ErrorObserver, Observable } from "rxjs";
import { CommonService } from "@Services/common-service";
import { BORDER_TYPE } from "@Configs/enum";
import "./ManageView.scss";
import IconLoading from "@Components/IconLoading/IconLoading";
import InputText, { InputAction } from "@Components/Input/InputText/InputText";
import settingsView from "./images/settings--view.svg";

export interface ManageViewProps<
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

  isRequired?: boolean;

  getList?: (TModelFilter?: TModelFilter) => Observable<T[]>;

  onChange?: (id: number, T?: T) => void;

  render?: (t: T) => string;

  classFilter: new () => TModelFilter;

  type?: BORDER_TYPE;

  selectWithAdd?: () => void;

  selectWithAddTitle?: string;

  selectWithPreferOption?: boolean;

  isSmall?: boolean;

  preferOptions?: T[];

  maxLength?: number;

  maxLengthItem?: number;

  action?: InputAction;
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

function ManageView(props: ManageViewProps<Model, ModelFilter>) {
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
    selectWithAdd,
    selectWithAddTitle,
    preferOptions,
    maxLength,
    maxLengthItem,
    isMaterial,
  } = props;

  const internalValue = React.useMemo((): Model => {
    return value || null;
  }, [value]);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [list, setList] = React.useState<Model[]>([]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const inputRef: any = React.useRef<any>(null);

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

  const handleToggle = React.useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!disabled) {
        setExpand(!isExpand);
        if (isEnumerable) {
          if (list.length === 0) {
            await handleLoadList();
          }
        } else {
          await handleLoadList();
        }
      }
    },
    [handleLoadList, isEnumerable, list, disabled, isExpand]
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
          handleCloseSelect();
          break;
        default:
          return;
      }
    },
    [handleCloseSelect]
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
      <div className="select__container" ref={wrapperRef}>
        <div
          className={classNames("select__input", {
            "select__input--active": internalValue?.id,
          })}
          onClick={handleToggle}
        >
          <div className="select-wrapper__btn">
            <span className="select-wrapper__btn-title">
              <View16 className="select-wrapper__btn-icon" />
              View: View all
            </span>
            <span
              className={classNames("icon", {
                active: isExpand,
              })}
            >
              <ChevronDown16 />
            </span>
          </div>
        </div>
        {isExpand && (
          <div className="select__list-container" style={appendToBodyStyle}>
            <div className="select__list-action-wrapper">
              <div className="action">Save as new view</div>
              <div className="action">Save change</div>
              <div className="action action-icon">
                Manage view <img src={settingsView} alt="" width={16} />
              </div>
            </div>
            <div className="select__list--input p--xs">
              <InputText
                isSmall={false}
                maxLength={maxLength}
                onChange={handleSearchChange}
                placeHolder={placeHolder}
                suffix={<Search16 />}
                isMaterial={isMaterial}
                ref={inputRef}
                onKeyDown={handleKeyDown}
              />
            </div>
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
                        {item.id === internalValue?.id && <Checkmark16 />}
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
                      {item.id === internalValue?.id && <Checkmark16 />}
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
                <Add16 className="m-l--xxs" />
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

ManageView.defaultProps = {
  searchProperty: "name",
  searchType: "contain",
  isEnumerable: false,
  appendToBody: false,
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
  maxLengthItem: 30,
};

export default ManageView;
