import React, { RefObject } from "react";
import { Model, ModelFilter } from "react3l-common";
import classNames from "classnames";
import { Empty } from "antd";
import { Search } from "@carbon/icons-react";
import { CommonService } from "@Services/common-service";
import {
  debounceTime,
  distinctUntilChanged,
  ErrorObserver,
  Observable,
  Subject,
  switchMap,
} from "rxjs";
import InputSearchSelect from "./InputSearchSelect/InputSearchSelect";
import IconLoading from "@Components/IconLoading/IconLoading";
import "./InputSearch.scss";

export interface InputSearchProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  /**User-filled value to filter*/
  value?: string | null;
  /**Property of inputSearchSelect*/
  valueFilter?: TModelFilter;
  /**Property of inputSearchSelect*/
  getList?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  /**Property of inputSearchSelect*/
  classFilter: new () => TModelFilter;
  /**Property of inputSearchSelect*/
  render?: (t: T) => string;
  /**Property of inputSearchSelect*/
  searchType?: string;
  /**Property of inputSearchSelect*/
  searchProperty?: string;
  /**Use to custom style the component*/
  className?: string;
  /**Property of inputSearchSelect*/
  onChangeSearchField?: (id: number, T?: T) => void;
  /**Handle the change value of the component*/
  onChange?: (value: string) => void;
  /**Placeholder of the component*/
  placeHolder?: string;
  /**Boolean to set input show with animation*/
  animationInput?: boolean;
  /**Option to set position for InputSearch */
  position?: "left" | "right";
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

function InputSearch(props: InputSearchProps<Model, ModelFilter>) {
  const {
    value,
    placeHolder,
    getList,
    render,
    valueFilter,
    classFilter: ClassFilter,
    searchProperty,
    searchType,
    onChangeSearchField,
    className,
    animationInput,
    onChange,
    position,
    bgColor
  } = props;
  const [showListItem, setShowListItem] = React.useState<boolean>();
  const [fullWidth, setFullWidth] = React.useState<boolean>(!animationInput);
  const [activeBackground, setActiveBackground] = React.useState<boolean>(
    false
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  const [list, setList] = React.useState<Model[]>([]);

  const [showInput, setShowInput] = React.useState<boolean>(!animationInput);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [appendToBodyStyle, setAppendToBodyStyle] = React.useState({});

  const searchTermRef = React.useRef(new Subject<string>());

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
  }, [animationInput]);

  const searchObservable = React.useCallback(
    (searchTerm) => {
      const cloneValueFilter = valueFilter
        ? { ...valueFilter }
        : new ClassFilter();
      if (searchType) {
        cloneValueFilter[searchProperty][searchType] = searchTerm;
      } else cloneValueFilter[searchProperty] = searchTerm;
      setLoading(true);
      return getList(cloneValueFilter);
    },
    [ClassFilter, getList, searchProperty, searchType, valueFilter]
  );

  CommonService.useClickOutside(wrapperRef, handleCloseSelect);

  const handleClickItem = React.useCallback(
    (item: Model) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onChangeSearchField(item.id, item);
      setShowListItem(false);
      setActiveBackground(false);
    },
    [onChangeSearchField]
  );

  const handleSearchChange = React.useCallback((searchTerm: string) => {
    searchTermRef.current.next(searchTerm);
  }, []);

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
    },
    [handleClickSearchIcon]
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

  React.useEffect(() => {
    const subscription = searchTermRef.current
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((searchValue) => searchObservable(searchValue))
      )
      .subscribe({
        next: (res: Model[]) => {
          setList(res);
          setLoading(false);
          setShowListItem(true);
        },
        error: (err: ErrorObserver<Error>) => {
          setList([]);
          setLoading(false);
        },
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [searchObservable]);

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
          "visible__input-search": showInput,
          "hidden__input-search": !showInput,
          "position-right": position === "right",
          "component__input-search-select--white": bgColor === "white",
        })}
        onClick={handleToggle}
        tabIndex={0}
        onKeyDown={handleTabEnter}
      >
        <div
          className={classNames("component__input-search__icon-box")}
          onClick={handleClickSearchIcon}
        >
          <Search size={16} className="icon-input-search" />
        </div>
        <div className={classNames("box-input-search")}>
          {getList && typeof getList === "function" ? (
            <InputSearchSelect
              placeHolder={placeHolder}
              expanded={isExpand}
              onSearch={handleSearchChange}
              onKeyDown={handleKeyPress}
              value={value}
            />
          ) : (
            <InputSearchSelect
              placeHolder={placeHolder}
              expanded={isExpand}
              onSearch={onChange}
              value={value}
            />
          )}
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
                      className={classNames("select__item p-l--xs p-y--xs")}
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
              <IconLoading color="#0F62FE" size={24} />
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
