import { DEBOUNCE_TIME_300 } from "config/consts";
import { Model, ModelFilter } from "react3l-common";
import { useDebounceFn } from "ahooks";
import { Checkbox, Empty } from "antd";
import Spin from "antd/lib/spin";
import classNames from "classnames";
import React, { RefObject } from "react";
import { ErrorObserver, Observable } from "rxjs";
import { CommonService } from "services/common-service";
import InputSelect from "components/Input/InputSelect/InputSelect";
import { BORDER_TYPE } from "config/enum";
import "./EnumSelect.scss";
import InputTag from "components/Input/InputTag";

export interface SelectProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  model?: Model;

  listModel?: Model[];

  modelFilter?: TModelFilter;

  searchProperty?: string;

  searchType?: string;

  placeHolder?: string;

  disabled?: boolean;

  isMaterial?: boolean;

  isEnumerable?: boolean;

  appendToBody?: boolean;

  getList?: (TModelFilter?: TModelFilter) => Observable<T[]>;

  onChange?: (id: number, T?: T) => void;

  onChangeMultiple?: (T?: T, type?: string) => void;

  render?: (t: T) => string;

  classFilter: new () => TModelFilter;

  type?: BORDER_TYPE;

  label?: string;

  selectWithAdd?: boolean;

  selectWithPreferOption?: boolean;

  isSmall?: boolean;

  preferOptions?: T[];

  isMultiple?: boolean;
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

function EnumSelect(props: SelectProps<Model, ModelFilter>) {
  const {
    model,
    modelFilter,
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
    isMultiple,
    listModel,
    onChangeMultiple
  } = props;

  const internalModel = React.useMemo((): Model => {
    return model || null;
  }, [model]);

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
      const cloneModelFilter = modelFilter
        ? { ...modelFilter }
        : new ClassFilter();
      if (!isEnumerable) {
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

  const internalList = React.useMemo(() => {
    if (list && list.length > 0) {
      list.forEach((current) => {
        let filteredItem =
          listModel &&
          listModel.length > 0 &&
          listModel?.filter((item) => item.id === current.id)[0];
        if (filteredItem) {
          current.isSelected = true;
        } else {
          current.isSelected = false;
        }
      });
      return [...list];
    }
    return [];
  }, [list, listModel]);

  const handleLoadList = React.useCallback(() => {
    try {
      setLoading(true);
      subscription.add(getList);
      const filter = modelFilter ? modelFilter : new ClassFilter();
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
    } catch (error) {}
  }, [getList, modelFilter, ClassFilter, subscription]);

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
    (item: Model) => (event: any) => {
      onChange(item.id, item);
      handleCloseSelect();
    },
    [handleCloseSelect, onChange]
  );

  const handleClickMultiItem = React.useCallback(
    (item: Model) => (event: any) => {
      let filteredItem = internalList?.filter(
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

        onChangeMultiple(item, "REMOVE");
      } else {
        onChangeMultiple(item, "UPDATE");

      }
    },
    [internalList, modelFilter, ClassFilter, getList, onChangeMultiple]
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
      <div
        className={classNames("select__container", {
          "multiple-select__container": isMultiple,
        })}
        ref={wrapperRef}
      >
        <div className="select__input" onClick={handleToggle}>
          {isMultiple ? (
            <InputTag
              listItem={listModel} // value of input, event should change these on update
              render={render}
              placeHolder={placeHolder}
              disabled={disabled}
              onSearch={handleSearchChange}
              onClear={handleClearItem}
              onKeyDown={handleKeyPress}
              onKeyEnter={handleKeyEnter}
              type={type}
              label={label}
              isSmall={isSmall}
              isUsingSearch={false}
            />
          ) : (
            <InputSelect
              model={internalModel} // value of input, event should change these on update
              render={render}
              placeHolder={placeHolder}
              expanded={isExpand}
              disabled={disabled}
              onSearch={handleSearchChange}
              onClear={handleClearItem}
              onKeyDown={handleKeyPress}
              onKeyEnter={handleKeyEnter}
              type={type}
              label={label}
              isSmall={isSmall}
            />
          )}
        </div>
        {isMultiple
          ? isExpand && (
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
                            <Checkbox
                              checked={item.isSelected}
                              onChange={handleClickMultiItem(item)}
                            >
                              <span className="select__text">
                                {render(item)}
                              </span>
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
                    <Spin tip="Loading..."></Spin>
                  </div>
                )}

                {selectWithAdd && (
                  <div
                    className={classNames(
                      "select__bottom-button select__add-button p-y--xs"
                    )}
                  >
                    <i className="tio-add m-l--xs" />
                    <span className="m-l--xs">Add new</span>
                  </div>
                )}
              </div>
            )
          : isExpand && (
              <div className="select__list-container" style={appendToBodyStyle}>
                {!loading ? (
                  <>
                    <div className="select__list" ref={selectListRef}>
                      {list.length > 0 ? (
                        list.map((item, index) => (
                          <div
                            className={classNames(
                              "select__item p-l--xs p-y--xs",
                              {
                                "select__item--selected":
                                  item.id === internalModel?.id,
                              }
                            )}
                            tabIndex={-1}
                            key={index}
                            onKeyDown={handleMove(item)}
                            onClick={handleClickItem(item)}
                          >
                            <span className="select__text">{render(item)}</span>
                            {item.id === internalModel?.id && (
                              <i className="tio-done" />
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
                    <Spin tip="Loading..."></Spin>
                  </div>
                )}
                {selectWithAdd && (
                  <div
                    className={classNames(
                      "select__bottom-button select__add-button p-y--xs"
                    )}
                  >
                    <i className="tio-add m-l--xxs" />
                    <span>Add new</span>
                  </div>
                )}
              </div>
            )}
      </div>
    </>
  );
}

EnumSelect.defaultProps = {
  searchProperty: "name",
  searchType: "contain",
  isEnumerable: false,
  appendToBody: false,
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
};

export default EnumSelect;
