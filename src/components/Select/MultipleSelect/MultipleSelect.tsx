import { Model, ModelFilter } from "react3l-common";
import { useDebounceFn } from "ahooks";
import { CommonService } from "services/common-service";
import classNames from "classnames";
import InputTag from "components/Input/InputTag/InputTag";
import { ASSETS_IMAGE, ASSETS_SVG, DEBOUNCE_TIME_300 } from "config/consts";
import React, { RefObject } from "react";
import { ErrorObserver, Observable } from "rxjs";
import { INPUT_TAG_TYPE } from "components/Input/InputTag";
import "./MultipleSelect.scss";

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

  label?: string;

  type?: INPUT_TAG_TYPE;

  isSmall?: boolean;

  selectWithAdd?: boolean;

  selectWithPreferOption?: boolean;
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
    label,
    type,
    isSmall,
    selectWithAdd,
    selectWithPreferOption,
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
      if (!disabled) {
        setExpand(true);
        await handleLoadList();
      }
    },
    [disabled, handleLoadList]
  );

  const handleCloseSelect = React.useCallback(() => {
    setExpand(false);
  }, []);

  const handleClickItem = React.useCallback(
    (item: Model) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (event && event.target === event.currentTarget) {
        let filteredItem = models?.filter(
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
          onChange(item, "REMOVE");
          if (event) {
            const currentItem = event.target as HTMLSpanElement;
            currentItem.parentElement.parentElement.parentElement.blur();
          }
        } else {
          onChange(item, "UPDATE");
        }
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

  const handleClearAll = React.useCallback(() => {
    const cloneModelFilter = new ClassFilter();

    cloneModelFilter["id"]["notIn"] = [];
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
    onChange(null, "REMOVE_ALL");
  }, [ClassFilter, getList, onChange]);

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

  CommonService.useClickOutside(wrapperRef, handleCloseSelect);

  return (
    <>
      <div
        className="select__container multiple-select__container"
        ref={wrapperRef}
      >
        <div className="select__input" onClick={handleToggle}>
          <InputTag
            listItem={models}
            isMaterial={isMaterial}
            render={render}
            placeHolder={placeHolder}
            disabled={disabled}
            onSearch={handleSearchChange}
            onClear={handleClearItem}
            label={label}
            onClearMulti={handleClearAll}
            type={type}
            isSmall={isSmall}
            isUsingSearch={true}
            onKeyDown={handleKeyPress}
            onKeyEnter={handleKeyEnter}
          />
        </div>
        {isExpand && (
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
        )}
      </div>
    </>
  );
}

MultipleSelect.defaultProps = {
  searchProperty: "name",
  searchType: "startWith",
  isEnumerable: false,
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
};

export default MultipleSelect;
