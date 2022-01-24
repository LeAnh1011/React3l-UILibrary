import { ChevronDown16, Search16 } from "@carbon/icons-react";
import { useDebounceFn } from "ahooks";
import { Checkbox, Empty } from "antd";
import classNames from "classnames";
import IconLoading from "components/IconLoading/IconLoading";
import InputText from "components/Input/InputText";
import { DEBOUNCE_TIME_300 } from "config/consts";
import React, { RefObject } from "react";
import { Model, ModelFilter } from "react3l-common";
import { ErrorObserver, Observable } from "rxjs";
import { CommonService } from "services/common-service";
import "./AdvanceMultipleIdFilterMaster.scss";

export interface AdvanceMultipleIdFilterMasterProps<
  T extends Model,
  TModelFilter extends ModelFilter
  > {
  values?: any[];

  title: string;

  modelFilter?: TModelFilter;

  searchProperty?: string;

  searchType?: string;

  placeHolder?: string;

  disabled?: boolean;

  isMaterial?: boolean;

  isEnumList?: boolean;

  getList?: (TModelFilter?: TModelFilter) => Observable<T[]>;

  onChange?: (selectedList?: T[], ids?: []) => void;

  render?: (t: T) => string;

  classFilter: new () => TModelFilter;

  className?: string;

  preferOptions?: T[];

  maxLength?: number;
}

function defaultRenderObject<T extends Model>(t: T) {
  return CommonService.limitWord(t?.name, 25);
}

interface changeAction {
  type: string;
  data: Model;
}

function multipleFilterReducer(
  currentState: Model[],
  action: changeAction
): Model[] {
  switch (action.type) {
    case "UPDATE":
      return [...currentState, action.data];
    case "REMOVE":
      const filteredArray = currentState.filter(
        (item) => item.id !== action.data.id
      );
      return [...filteredArray];
    case "REMOVE_ALL":
      return [];
  }
  return;
}


function AdvanceMultipleIdFilterMaster(
  props: AdvanceMultipleIdFilterMasterProps<Model, ModelFilter>
) {
  const {
    modelFilter,
    title,
    values,
    searchProperty,
    searchType,
    placeHolder,
    disabled,
    isMaterial,
    isEnumList,
    getList,
    onChange,
    render,
    classFilter: ClassFilter,
    className,
    preferOptions,
    maxLength,
  } = props;

  const [loading, setLoading] = React.useState<boolean>(false);

  const [firstLoad, setFirstLoad] = React.useState<boolean>(true);

  const [list, setList] = React.useState<Model[]>([]);

  const [selectedList, dispatch] = React.useReducer(multipleFilterReducer, []);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );
  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const inputRef: any = React.useRef<any>(null);

  const [subscription] = CommonService.useSubscription();

  const internalList = React.useMemo(() => {
    if (list && list.length > 0) {
      list.forEach((current) => {
        let filteredItem =
          values &&
          values?.length > 0 &&
          values.filter((item) => item === current.id)[0];
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
          values.filter((item) => item === current.id)[0];
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

  React.useEffect(() => {
    if (firstLoad) {
      if (internalList && internalList?.length > 0) {
        const tempList = [...internalList, ...internalPreferOptions];
        if (tempList && tempList?.length > 0) {
          tempList.forEach((item) => {
            if (item?.isSelected === true) {
              dispatch({
                type: "UPDATE",
                data: item,
              });
            }
          });
          setFirstLoad(false);
        }
      }
    }
  }, [firstLoad, internalList, internalPreferOptions]);
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
        setTimeout(() => {
          inputRef.current.children[0].focus();
        }, 400);
        await handleLoadList();
      }
    },
    [handleLoadList, disabled]
  );

  const handleCloseAdvanceMultipleIdFilterMaster = React.useCallback(() => {
    setExpand(false);
  }, []);

  const handleClickItem = React.useCallback(
    (item: Model) => (event: any) => {
      let filteredItem = selectedList?.filter(
        (current) => current.id === item.id
      )[0];
      const cloneModelFilter = modelFilter
        ? { ...modelFilter }
        : new ClassFilter();

      if (!cloneModelFilter["id"]["notIn"]) {
        cloneModelFilter["id"]["notIn"] = [item?.id];
      } else {
        cloneModelFilter["id"]["notIn"].push(item?.id);
      }
      getList(cloneModelFilter).subscribe(
        (res: Model[]) => {
          if (res) {
            setList(res);
          }
          setLoading(false);
        },
        (err: ErrorObserver<Error>) => {
          setList([]);
          setLoading(false);
        }
      );

      if (filteredItem) {
        const tmp = [...selectedList];
        const ids = selectedList?.map((item) => item?.id);
        const index = tmp.indexOf(filteredItem);
        tmp.splice(index, 1);
        ids.splice(index, 1);
        dispatch({
          type: "REMOVE",
          data: item,
        });
        onChange([...tmp], ids as any);
      } else {
        const ids = selectedList?.map((item) => item?.id);
        onChange([...selectedList, item], [...ids, item?.id] as any);
        dispatch({
          type: "UPDATE",
          data: item,
        });
      }
    },
    [selectedList, modelFilter, ClassFilter, getList, onChange]
  );

  const handleSearchChange = React.useCallback(
    (searchTerm: string) => {
      run(searchTerm);
    },
    [run]
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
  const handleKeyDown = React.useCallback(
    (event) => {
      switch (event.keyCode) {
        case 40:
          const firstItem = selectListRef.current
            .firstElementChild as HTMLElement;
          firstItem.focus();
          break;
        case 9:
          handleCloseAdvanceMultipleIdFilterMaster();
          break;
        default:
          return;
      }
    },
    [handleCloseAdvanceMultipleIdFilterMaster]
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

  CommonService.useClickOutside(
    wrapperRef,
    handleCloseAdvanceMultipleIdFilterMaster
  );

  return (
    <>
      <div
        className={classNames(
          "advance-multi-id-filter-master__wrapper",
          className
        )}
        ref={wrapperRef}
      >
        <div
          className={classNames(
            "advance-id-filter-master__container p-l--sm p-t--xs p-r--xs p-b--xs d-flex",
            {
              "filter-bg": isExpand,
              "p-b---active": values?.length > 0,
            }
          )}
          onClick={handleToggle}
        >
          <label className={classNames("d-flex", { "filter-active": values?.length > 0, })}>
            <span className="advance-count-item__text p-r--xxxs">
              {values?.length > 0 && <>({values?.length})</>}
            </span>
            <div className="advance-id-filter-master__title">
              <span className="filter-title"> {title}</span>
              <ChevronDown16 />
            </div>
          </label>

        </div>
        {isExpand && (
          <div className="advance-id-filter-master__list-container m-t--xxxs">
            <div className="advance-id-filter__input p--xs">
              <InputText
                isSmall={false}
                maxLength={maxLength}
                onChange={handleSearchChange}
                placeHolder={placeHolder}
                suffix={
                  <Search16 />
                }
                isMaterial={isMaterial}
                ref={inputRef}
                onKeyDown={handleKeyDown}
              />
            </div>
            {!loading ? (
              <div className="advance-id-master__list" ref={selectListRef}>
                {internalList.length > 0 ? (
                  internalList.map((item, index) => (
                    <div
                      className={classNames("advance-id-filter__item", {
                        "advance-id-filter__item--selected": item.isSelected,
                      })}
                      key={index}
                      onKeyDown={handleMove(item)}
                      tabIndex={-1}
                      onClick={handleClickParentItem}
                    >
                      <Checkbox
                        checked={item.isSelected}
                        className=" m-l--xs m-y--xs m-r--xxs"
                        onChange={handleClickItem(item)}
                      >
                        <span className="advance-id-master__text">
                          {render(item)}
                        </span>
                      </Checkbox>
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
                        <span className="advance-id-master__text">
                          {render(item)}
                        </span>
                      </Checkbox>
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

AdvanceMultipleIdFilterMaster.defaultProps = {
  searchProperty: "name",
  searchType: "contain",
  isEnumList: false,
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
  typeRender: "name",
  isIdValue: true,
  maxLength: 200,
};

export default AdvanceMultipleIdFilterMaster;
