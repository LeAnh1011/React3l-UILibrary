import { useDebounceFn } from "ahooks";
import { Empty, Spin } from "antd";
import classNames from "classnames";
import InputText from "components/Input/InputText";
import { DEBOUNCE_TIME_300 } from "config/consts";
import React, { RefObject } from "react";
import { StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { ErrorObserver, Observable, Subscription } from "rxjs";

import { CommonService } from "services/common-service";
import nameof from "ts-nameof.macro";
import search from "assets/images/svg/search-normal.svg";
import "./AdvanceMultipleIdFilterMaster.scss";
import MultipleSelect from "components/Select/MultipleSelect";

export interface AdvanceMultipleIdFilterMasterProps<
  T extends Model,
  TModelFilter extends ModelFilter
  > {
  value?: number[] | string[];

  title: string;

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

  preferOptions?: T[];
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

function AdvanceMultipleIdFilterMaster(
  props: AdvanceMultipleIdFilterMasterProps<Model, ModelFilter>
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
    preferOptions,
  } = props;

  const [internalModel, setInternalModel] = React.useState<Model>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [list, setList] = React.useState<Model[]>([]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null);
  ;

  const [subscription] = CommonService.useSubscription();


  const { run } = useDebounceFn(
    (searchTerm: string) => {
      const cloneModelFilter = modelFilter
        ? { ...modelFilter }
        : new ClassFilter();
      if (!isEnumList) {
        if (searchType) {
          cloneModelFilter[searchProperty][searchType] = searchTerm;
        } else cloneModelFilter[searchProperty] = searchTerm;
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
    },
    {
      wait: DEBOUNCE_TIME_300,
    }
  );

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

  const handleCloseAdvanceMultipleIdFilterMaster = React.useCallback(() => {
    setExpand(false);
  }, []);

  const handleClickItem = React.useCallback(
    (item: Model) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

      setInternalModel(item);
      onChange(item.id, item);
      handleCloseAdvanceMultipleIdFilterMaster();
    },
    [handleCloseAdvanceMultipleIdFilterMaster, setInternalModel, onChange]
  );

  const handleSearchChange = React.useCallback(
    (searchTerm: string) => {
      run(searchTerm)
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


  React.useEffect(() => {
    const subscription = new Subscription();
    if (value !== null && value !== undefined) {
      const filterValue = new ClassFilter();
      if (isIdValue) {
        const listFilterPreferOptions = preferOptions.filter((current) => current.id === Number(value));
        if (listFilterPreferOptions && listFilterPreferOptions?.length > 0) {
          setInternalModel(listFilterPreferOptions[0]);
        }
        filterValue["id"]["equal"] = Number(value);
        subscription.add(getList);
        getList(filterValue).subscribe((res: Model[]) => {
          if (res) {
            const filterList = res.filter((current) => current.id === Number(value));
            if (filterList && filterList?.length > 0) {
              setInternalModel(filterList[0]);
            }
          }
        });

      } else {
        setInternalModel({
          [typeRender]: value,
        });
      }
    } else {
      setInternalModel(null);
    }
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, [value, getList, ClassFilter, isIdValue, typeRender, preferOptions]);


  CommonService.useClickOutside(wrapperRef, handleCloseAdvanceMultipleIdFilterMaster);

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
        <MultipleSelect {...props} onChange={() => handleSearchChange} />
        {isExpand && (
          <div className="advance-id-filter-master__list-container m-t--xxxs">
            <div className="advance-id-filter__input p--xs" >
              <InputText
                isSmall={false}
                maxLength={100}
                onChange={handleSearchChange}
                placeHolder={placeHolder}
                suffix={<img className='tio tio-search' src={search} alt="noImage" />}
                isMaterial={isMaterial}
              />
            </div>
            {/* {isExpand && (
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
                            <div>
                              <label className={classNames("checkbox__container")}>
                                <input type="checkbox" checked={item.isSelected} />
                                <span
                                  className="checkmark"
                                  onClick={handleClickItem(item)}
                                ></span>
                                <span
                                  className="select__text"
                                  onClick={handleClickItem(item)}
                                >
                                  {render(item)}
                                </span>
                              </label>
                            </div>
                          </div>
                        ))
                      ) : (
                        <img
                          className="img-emty"
                          src={ASSETS_IMAGE + "/no-data.png"}
                          alt=""
                        />
                      )}
                    </div>
                    {selectWithAdd ? (
                      <div
                        className={classNames(
                          "select__bottom-button select__add-button p-y--xs"
                        )}
                      >
                        <i className="tio-add m-l--xxs" />
                        <span>Add new</span>
                      </div>
                    ) : selectWithPreferOption ? (
                      <div
                        className={classNames(
                          "select__bottom-button select__prefer-option-button"
                        )}
                      >
                        <div className={classNames("p-l--xs")}>
                          <label className={classNames("checkbox__container")}>
                            <input type="checkbox" checked={true} />
                            <span className="checkmark"></span>
                            <span className="multiple-select__text">
                              Prefer Options
                            </span>
                          </label>
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <div className="select__loading">
                    <img
                      className="img-loading"
                      src={ASSETS_SVG + "/spinner.svg"}
                      alt=""
                    />
                  </div>
                )}
              </div>
            )} */}
            {
              !loading && list.length > 0 &&
              <div className="advance-id-master__list-prefer">
                {
                  preferOptions && preferOptions?.length > 0 &&
                  preferOptions.map((item, index) => (
                    <div
                      className={classNames("advance-id-filter__prefer-option advance-id-filter__item p--xs")}
                      key={index}
                      onKeyDown={handleMove(item)}
                      onClick={handleClickItem(item)}
                    >
                      <span className="advance-id-filter__text">
                        {render(item)}
                      </span>
                      {
                        item.id === internalModel?.id && <i className="tio tio-done" />
                      }

                    </div>
                  ))
                }
              </div>
            }
          </div>
        )}
      </div>
    </>
  );
}

AdvanceMultipleIdFilterMaster.defaultProps = {
  searchProperty: nameof(Model.prototype.name),
  searchType: nameof(StringFilter.prototype.contain),
  isEnumList: false,
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
  typeRender: nameof(Model.prototype.name),
  isIdValue: true,
};

export default AdvanceMultipleIdFilterMaster;
