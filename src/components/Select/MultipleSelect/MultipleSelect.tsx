import { StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { useDebounceFn } from "ahooks";
import { CommonService } from "services/common-service";
import classNames from "classnames";
import InputTag from "components/Input/InputTag/InputTag";
import { ASSETS_IMAGE, ASSETS_SVG, DEBOUNCE_TIME_300 } from "config/consts";
import React, { RefObject } from "react";
import { ErrorObserver, Observable } from "rxjs";
import nameof from "ts-nameof.macro";

export interface MultipleSelectProps<
  T extends Model,
  TFilter extends ModelFilter
> {
  models?: Model[];

  modelFilter?: TFilter;

  searchProperty?: string;

  searchType?: string;

  placeHolder?: string;

  disabled?: boolean;

  isMaterial?: boolean;

  getList?: (TModelFilter?: TFilter) => Observable<T[]>;

  onChange?: (T?: T, type?: string) => void;

  render?: (t: T) => string;

  classFilter: new () => TFilter;
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

export function MultipleSelect(props: MultipleSelectProps<Model, ModelFilter>) {
  const {
    models,
    modelFilter,
    searchProperty,
    searchType,
    placeHolder,
    disabled,
    isMaterial,
    getList,
    onChange,
    render,
    classFilter: ClassFilter,
  } = props;

  const [loading, setLoading] = React.useState<boolean>(false);

  const [list, setList] = React.useState<Model[]>([]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [subscription] = CommonService.useSubscription();

  const { run } = useDebounceFn(
    (searchTerm: string) => {
      const cloneModelFilter = modelFilter
        ? { ...modelFilter }
        : new ClassFilter();
      cloneModelFilter[searchProperty][searchType] = searchTerm;
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

  const internalList = React.useMemo(() => {
    if (list && list.length > 0) {
      list.forEach((current) => {
        let filteredItem = models?.filter((item) => item.id === current.id)[0];
        if (filteredItem) {
          current.isSelected = true;
        } else {
          current.isSelected = false;
        }
      });
      return [...list];
    }
    return [];
  }, [list, models]);

  const handleLoadList = React.useCallback(() => {
    try {
      setLoading(true);
      subscription.add(getList);
      const filter = modelFilter ? modelFilter : new ClassFilter();
      getList(filter).subscribe(
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
    } catch (error) {}
  }, [getList, modelFilter, ClassFilter, subscription]);

  const handleToggle = React.useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setExpand(true);
      await handleLoadList();
    },
    [handleLoadList]
  );

  const handleCloseSelect = React.useCallback(() => {
    setExpand(false);
  }, []);

  const handleClickItem = React.useCallback(
    (item: Model) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      let filteredItem = models?.filter((current) => current.id === item.id)[0];
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
        onChange(item, "REMOVE");
      } else {
        onChange(item, "UPDATE");
      }
    },
    [models, modelFilter, ClassFilter, getList, onChange]
  );

  const handleSearchChange = React.useCallback(
    (searchTerm: string) => {
      run(searchTerm);
    },
    [run]
  );

  const handleClearItem = React.useCallback(
    (item: Model) => {
      const cloneModelFilter = modelFilter
        ? { ...modelFilter }
        : new ClassFilter();

      const index = cloneModelFilter["id"]["notIn"].findIndex(
        (currentItem: { id: any }) => currentItem.id === item.id
      );

      cloneModelFilter["id"]["notIn"].splice(index, 1);
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
      onChange(item, "REMOVE");
    },
    [ClassFilter, getList, modelFilter, onChange]
  );

  CommonService.useClickOutside(wrapperRef, handleCloseSelect);

  return (
    <>
      <div className="select__container" ref={wrapperRef}>
        <div className="select__input" onClick={handleToggle}>
          <InputTag
            listItem={models}
            isMaterial={isMaterial}
            render={render}
            placeHolder={placeHolder}
            disabled={disabled}
            onSearch={handleSearchChange}
            onClear={handleClearItem}
          />
        </div>
        {isExpand && (
          <div className="select__list-container">
            {!loading ? (
              <div className="select__list">
                {internalList.length > 0 ? (
                  internalList.map((item, index) => (
                    <div
                      className={classNames("select__item", {
                        "select__item--selected": item.isSelected,
                      })}
                      key={index}
                      onClick={handleClickItem(item)}
                    >
                      <span className="select__text">{render(item)}</span>
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
        )}
      </div>
    </>
  );
}

MultipleSelect.defaultProps = {
  searchProperty: nameof(Model.prototype.name),
  searchType: nameof(StringFilter.prototype.startWith),
  isEnumerable: false,
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
};

export default MultipleSelect;
