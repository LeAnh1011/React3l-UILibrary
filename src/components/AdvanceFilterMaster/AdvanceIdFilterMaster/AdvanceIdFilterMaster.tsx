import { useDebounceFn } from "ahooks";
import { Empty, Spin } from "antd";
import search from "assets/images/svg/search-normal.svg";
import classNames from "classnames";
import InputText from "components/Input/InputText";
import { DEBOUNCE_TIME_300 } from "config/consts";
import React, { RefObject } from "react";
import { Model, ModelFilter } from "react3l-common";
import { ErrorObserver, Observable, Subscription } from "rxjs";
import { CommonService } from "services/common-service";
import "./AdvanceIdFilterMaster.scss";


export interface AdvanceIdFilterMasterProps<
  T extends Model,
  TModelFilter extends ModelFilter
  > {
  value?: number | string;

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
    preferOptions,
  } = props;

  const [internalModel, setInternalModel] = React.useState<Model>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [list, setList] = React.useState<Model[]>([]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null);

  const inputRef: any = React.useRef<any>(
    null
  );

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
        console.log(inputRef)
        await handleLoadList();
      }
    },
    [handleLoadList, disabled, inputRef]
  );

  const handleCloseAdvanceIdFilterMaster = React.useCallback(() => {
    setExpand(false);
  }, []);

  const handleClickItem = React.useCallback(
    (item: Model) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

      setInternalModel(item);
      onChange(item.id, item);
      handleCloseAdvanceIdFilterMaster();
    },
    [handleCloseAdvanceIdFilterMaster, setInternalModel, onChange]
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
        } else {
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
        }
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


  React.useEffect(() => {
    console.log(inputRef)
  }, [inputRef])

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
            <div className="advance-id-filter__input p--xs"  >
              <InputText
                isSmall={false}
                maxLength={100}
                onChange={handleSearchChange}
                placeHolder={placeHolder}
                suffix={<img className='tio tio-search' src={search} alt="noImage" />}
                isMaterial={isMaterial}
              // ref={inputRef}
              />
            </div>
            {!loading ? (
              <div className="advance-id-master__list" >

                {list.length > 0 ? (
                  list.map((item, index) => (
                    <div
                      className={classNames("advance-id-filter__item p--xs")}
                      tabIndex={-1}
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
                ) : (
                  <Empty />
                )}
              </div>
            ) : (
              <div className="advance-id-filter__loading">
                <Spin tip="Loading..."></Spin>
              </div>
            )}
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

AdvanceIdFilterMaster.defaultProps = {
  searchProperty: "name",
  searchType: "contain",
  isEnumList: false,
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
  typeRender: "name",
  isIdValue: true,
};

export default AdvanceIdFilterMaster;
