import React, { RefObject } from "react";
import "./InputSearch.scss";
import { Model, ModelFilter } from "react3l-common";
import classNames from "classnames";
import { Empty } from "antd";
import { Search16 } from "@carbon/icons-react";
import { CommonService } from "services/common-service";
import { ErrorObserver, Observable } from "rxjs";
import { useDebounceFn } from "ahooks";
import { DEBOUNCE_TIME_300 } from "config/consts";
import InputSearchSelect from "./InputSearchSelect/InputSearchSelect";
import IconLoading from "components/IconLoading/IconLoading";

export interface InputSearchProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  model?: T;
  modelFilter?: TModelFilter;
  getList?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  classFilter: new () => TModelFilter;
  render?: (t: T) => string;
  searchType?: string;
  searchProperty?: string;
  className?: string;
  onChange?: (id: number, T?: T) => void;
  placeHolder?: string;
  animationInput?: boolean;
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

function InputSearch(props: InputSearchProps<Model, ModelFilter>) {
  const {
    model,
    placeHolder,
    getList,
    render,
    modelFilter,
    classFilter: ClassFilter,
    searchProperty,
    searchType,
    onChange,
    className,
    animationInput,
  } = props;
  const [showListItem, setShowListItem] = React.useState<boolean>();
  const [fullWidth, setFullWidth] = React.useState<boolean>(!animationInput);
  const [activeBackground, setActiveBackground] = React.useState<boolean>(
    false
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  const [list, setList] = React.useState<Model[]>([]);

  const [showInput, setShowInput] = React.useState<boolean>(!animationInput);

  const internalModel = React.useMemo((): Model => {
    return model || null;
  }, [model]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [appendToBodyStyle, setAppendToBodyStyle] = React.useState({});

  const handleCloseSelect = React.useCallback(() => {
    setExpand(false);
    setShowListItem(false);
    setActiveBackground(false);

    if (animationInput) {
      setTimeout(() => {
        setFullWidth(false);
      }, 300);
      setShowInput(false);
    }
    // chờ 0,3s cho transition của Input co hẹp đóng lại rồi làm nhỏ width
  }, [animationInput]);

  const [subscription] = CommonService.useSubscription();

  const { run } = useDebounceFn(
    (searchTerm: string) => {
      if (searchTerm !== "" && searchTerm) {
        const cloneModelFilter = modelFilter
          ? { ...modelFilter }
          : new ClassFilter();
        if (searchType) {
          cloneModelFilter[searchProperty][searchType] = searchTerm;
        } else cloneModelFilter[searchProperty] = searchTerm;
        setLoading(true);
        subscription.add(getList);
        getList(cloneModelFilter).subscribe(
          (res: Model[]) => {
            setList(res);
            setLoading(false);
            setShowListItem(true);
          },
          (err: ErrorObserver<Error>) => {
            setList([]);
            setLoading(false);
            setShowListItem(true);
          }
        );
      } else {
        setShowListItem(false);
      }
    },
    {
      wait: DEBOUNCE_TIME_300,
    }
  );

  CommonService.useClickOutside(wrapperRef, handleCloseSelect);

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

  const handleClickItem = React.useCallback(
    (item: Model) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onChange(item.id, item);
      setShowListItem(false);
      setActiveBackground(false);
    },
    [onChange]
  );

  const handleSearchChange = React.useCallback(
    (searchTerm: string) => {
      run(searchTerm);
    },
    [run]
  );

  const handleKeyPress = React.useCallback(
    (event: any) => {
      switch (event.keyCode) {
        case 40:
          if (showListItem) {
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
    [handleCloseSelect, showListItem]
  );

  const handleMove = React.useCallback(
    (item) => (event: any) => {
      switch (event.keyCode) {
        case 13:
          handleClickItem(item)(null);
          event.stopPropagation();
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
    if (isExpand && showListItem) {
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
  }, [isExpand, showListItem]);

  const handleClickSearchIcon = React.useCallback(() => {
    setShowInput(true);
    setFullWidth(true);
    if (animationInput) {
      if (fullWidth) {
        setActiveBackground(true);
      } else {
        setTimeout(() => {
          setActiveBackground(true);
        }, 300);
      }
    } else {
      setActiveBackground(true);
    }
  }, [animationInput, fullWidth]);

  const handleToggle = React.useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setExpand(true);
      handleClickSearchIcon();
      await handleLoadList();
    },
    [handleClickSearchIcon, handleLoadList]
  );

  const handleTabEnter = React.useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        handleClickSearchIcon();
        handleToggle(null);
      }
      return;
    },
    [handleClickSearchIcon, handleToggle]
  );

  return (
    <div
      className={classNames("component__input-search-container", className)}
      ref={wrapperRef}
    >
      <div
        className={classNames("component__input-search-select", {
          "full-width": fullWidth,
          "icon-only-width": !fullWidth,
          "active-background": activeBackground && showInput,
        })}
        onClick={handleToggle}
        tabIndex={0}
        onKeyDown={handleTabEnter}
      >
        <div
          className={classNames("component__input-search__icon-box")}
          onClick={handleClickSearchIcon}
        >
          <Search16 />
        </div>
        <div
          className={classNames({
            "visible__input-search": showInput,
            "hidden__input-search": !showInput,
          })}
        >
          <InputSearchSelect
            placeHolder={placeHolder}
            expanded={isExpand}
            onSearch={handleSearchChange}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
      {showListItem && (
        <div className="select__list-container" style={appendToBodyStyle}>
          {!loading ? (
            <>
              <div className="select__list" ref={selectListRef}>
                {list.length > 0 ? (
                  list.map((item, index) => (
                    <div
                      className={classNames("select__item p-l--xs p-y--xs", {
                        "select__item--selected": item.id === internalModel?.id,
                      })}
                      tabIndex={-1}
                      key={index}
                      onKeyDown={handleMove(item)}
                      onClick={handleClickItem(item)}
                    >
                      <span className="select__text">{render(item)}</span>
                    </div>
                  ))
                ) : (
                  <Empty />
                )}
              </div>
            </>
          ) : (
            <div className="select__loading">
              <IconLoading color="#0F62FE" size={24}/>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
InputSearch.defaultProps = {
  searchProperty: "name",
  searchType: "contain",
  render: defaultRenderObject,
  animationInput: true,
};
export default InputSearch;
