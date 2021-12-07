import { Empty, Spin } from "antd";
import classNames from "classnames";
import { DEBOUNCE_TIME_300 } from "config/consts";
import React, { RefObject } from "react";
import { StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { debounce, ErrorObserver, Observable, Subscription } from "rxjs";
import { CommonService } from "services/common-service";
import nameof from "ts-nameof.macro";
import InputSelect from "./../../Input/InputSelect/InputSelect";
import "./AdvanceIdFilterMaster.scss";

export interface AdvanceIdFilterMasterProps<
  T extends Model,
  TModelFilter extends ModelFilter
  > {
  value?: number;

  title?: string;

  modelFilter?: TModelFilter;

  searchProperty?: string;

  searchType?: string;

  placeHolder?: string;

  disabled?: boolean;

  isMaterial?: boolean;

  isEnumList?: boolean;

  isIdValue?: boolean;

  typeRender?: string;

  getList?: (TModelFilter?: TModelFilter) => Observable<T[]>;

  onChange?: (T: number, model?: T) => void;

  render?: (t: T) => string;

  classFilter: new () => TModelFilter;

  className?: string;
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.ten;
}

function AdvanceIdFilterMaster(
  props: AdvanceIdFilterMasterProps<Model, ModelFilter>
) {
  const {
    modelFilter,
    title,
    value,
    searchProperty,
    searchType,
    placeHolder,
    disabled,
    isMaterial,
    isEnumList,
    isIdValue,
    typeRender,
    getList,
    onChange,
    render,
    classFilter: ClassFilter,
    className,
  } = props;

  const [internalModel, setInternalModel] = React.useState<Model>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [list, setList] = React.useState<Model[]>([]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null);

  const selectListRef: RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null);

  const [subscription] = CommonService.useSubscription();

  const handleLoadList = React.useCallback(() => {
    try {
      setLoading(true);
      subscription.add(getList);
      const filter = modelFilter ? { ...modelFilter } : new ClassFilter();
      getList(filter).subscribe(
        (res: Model[]) => {
          setList(res);
          setLoading(false);
        },
        (err: ErrorObserver<Error>) => {
          setList([]);
          setLoading(false);
        }
      );
    } catch (error) { }
  }, [getList, modelFilter, subscription, ClassFilter]);

  const handleToggle = React.useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!disabled) {
        setExpand(true);
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
      // setInternalModel(item);
      onChange(item.id, item);
      handleCloseAdvanceIdFilterMaster();
    },
    [handleCloseAdvanceIdFilterMaster, setInternalModel, onChange]
  );

  const handleSearchChange = React.useCallback(
    debounce((searchTerm: string) => {
      const cloneModelFilter = modelFilter
        ? { ...modelFilter }
        : new ClassFilter();
      if (!isEnumList) {
        if (searchType === null) {
          cloneModelFilter[searchProperty] = searchTerm;
        } else cloneModelFilter[searchProperty][searchType] = searchTerm;
      }
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
    }, DEBOUNCE_TIME_300),
    [modelFilter, searchProperty, searchType, isEnumList, getList]
  );

  const handleClearItem = React.useCallback(() => {
    onChange(null);
    if (!value) {
      setInternalModel(null);
    }
  }, [onChange, value]);

  const handleKeyPress = React.useCallback(
    (event: any) => {
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

  // React.useEffect(() => {
  //   const subscription = new Subscription();
  //   if (value !== null && value !== undefined) {
  //     const filterValue = new ClassFilter();
  //     if (isIdValue) {
  //       filterValue["id"]["equal"] = Number(value);
  //       subscription.add(getList);
  //       getList(filterValue).subscribe((res: Model[]) => {
  //         if (res) {
  //           res = res.filter((current) => current.id === Number(value));
  //           setInternalModel(res[0]);
  //         }
  //       });
  //     } else {
  //       setInternalModel({
  //         [typeRender]: value,
  //       });
  //     }
  //   } else {
  //     setInternalModel(null);
  //   }

  //   return function cleanup() {
  //     subscription.unsubscribe();
  //   };
  // }, [value, getList, ClassFilter, isIdValue, typeRender]);

  CommonService.useClickOutside(wrapperRef, handleCloseAdvanceIdFilterMaster);

  return (
    <>
      <div className={classNames("advance-id-filter-master__wrapper", className)} ref={wrapperRef}>
        <div className={classNames("advance-id-filter-master__container p--xs",
          { "filter-bg": isExpand })} onClick={handleToggle}>
          <div className="advance-id-filter-master__title">
            {title}
            <i className="filter__icon tio-chevron_down"></i>
          </div>
        </div>
        {isExpand && (
          <div className="advance-id-filter-master__list-container m-t--xxxs">
            <div className="advance-id-filter__input p--xs" >
              <input
                type="text"
                value={render(internalModel)}
                onChange={() => handleSearchChange}
                placeholder={
                  placeHolder
                }
                // ref={inputRef}
                disabled={disabled}
                onKeyDown={handleKeyPress}
                className={classNames("component__input", {
                  "disabled-field": disabled,
                })} />
            </div>
            {!loading ? (
              <div className="advance-id-master__list" ref={selectListRef}>

                {list.length > 0 ? (
                  list.map((item, index) => (
                    <div
                      className={classNames("advance-id-filter__item p--xs", {
                        "advance-id-filter__item--advance-id-filtered":
                          item.id === internalModel?.id,
                      })}
                      tabIndex={-1}
                      key={index}
                      onKeyDown={handleMove(item)}
                      onClick={handleClickItem(item)}
                    >
                      <span className="advance-id-filter__text">
                        {render(item)}
                      </span>
                    </div>
                  ))
                ) : (
                  <Empty />
                )}
              </div>
            ) : (
              <div className="advance-id-filter__loading">
                <Spin tip="Loading..."></Spin>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

AdvanceIdFilterMaster.defaultProps = {
  searchProperty: nameof(Model.prototype.name),
  searchType: nameof(StringFilter.prototype.contain),
  isEnumList: false,
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
  typeRender: nameof(Model.prototype.name),
  isIdValue: true,
};

export default AdvanceIdFilterMaster;
