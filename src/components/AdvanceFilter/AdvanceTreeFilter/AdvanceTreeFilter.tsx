import React, { RefObject, Reducer } from "react";
import { v4 as uuidv4 } from "uuid";
import "./AdvanceTreeFilter.scss";
import { Model, ModelFilter } from "react3l-common";
import Tree from "../../Tree";
import { useDebounceFn } from "ahooks";
import { DEBOUNCE_TIME_300 } from "@Configs/consts";
import type { Observable } from "rxjs";
import { CommonService } from "@Services/common-service";
import InputTag from "@Components/Input/InputTag";
import InputSelect from "../../Input/InputSelect";
import { BORDER_TYPE } from "@Configs/enum";
import { IdFilter } from "react3l-advanced-filters";

export interface AdvanceTreeFilterProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  listItem?: Model[];
  item?: Model;
  isMaterial?: boolean;
  searchProperty?: string;
  searchType?: string;
  checkable?: boolean;
  selectable?: boolean;
  checkStrictly?: boolean;
  disabled?: boolean;
  valueFilter?: TModelFilter;
  placeHolder?: string;
  error?: string;
  selectedKey?: number;
  onlySelectLeaf?: boolean;
  render?: (T: T) => string;
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  onChange?: (T: Model[], TT: boolean) => void;
  classFilter?: new () => TModelFilter;
  type?: BORDER_TYPE;
  label?: string;
  isSmall?: boolean;
  treeTitleRender?: (T: T) => string;
  selectWithPreferOption?: boolean;
  preferOptions?: T[];
  maxLengthItem?: number;
  bgColor?: "white" | "gray";
  appendToBody?: boolean;
}
export interface filterAction {
  type: string;
  data?: ModelFilter;
}

function filterReducer(state: ModelFilter, action: filterAction): ModelFilter {
  switch (action.type) {
    case "UPDATE":
      return action.data;
  }
  return;
}

function AdvanceTreeFilter(props: AdvanceTreeFilterProps<Model, ModelFilter>) {
  const {
    listItem,
    item,
    isMaterial,
    checkStrictly,
    searchProperty,
    searchType,
    checkable,
    selectable,
    disabled,
    classFilter: ClassFilter,
    valueFilter,
    placeHolder,
    selectedKey,
    onlySelectLeaf,
    render,
    getTreeData,
    onChange,
    type,
    label,
    isSmall,
    treeTitleRender,
    selectWithPreferOption,
    preferOptions,
    maxLengthItem,
    bgColor,
    appendToBody,
  } = props;

  const componentId = React.useMemo(() => uuidv4(), []);

  const [expanded, setExpanded] = React.useState<boolean>(false);

  const listIds = React.useMemo(() => {
    if (item) return [item.id];
    if (listItem) return listItem.map((currentItem) => currentItem?.id);
    return [];
  }, [listItem, item]);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );
  const [appendToBodyStyle, setAppendToBodyStyle] = React.useState({});

  const [filter, dispatch] = React.useReducer<
    Reducer<ModelFilter, filterAction>
  >(filterReducer, { ...new ClassFilter(), valueFilter });

  const { run } = useDebounceFn(
    (searchTerm: string) => {
      const cloneFilter = { ...filter };
      if (searchType) {
        cloneFilter[searchProperty][searchType] = searchTerm;
      } else {
        cloneFilter[searchProperty] = searchTerm;
      }
      cloneFilter["isFilterTree"] = true;
      if (listIds.length > 1) {
        cloneFilter["activeNodeIds"] = { ...new IdFilter(), in: [...listIds] };
      } else {
        cloneFilter["activeNodeId"] = {
          ...new IdFilter(),
          equal: listIds.length > 0 ? listIds[0] : undefined,
        };
      }
      dispatch({ type: "UPDATE", data: cloneFilter });
    },
    {
      wait: DEBOUNCE_TIME_300,
    }
  );

  const handleClearItem = React.useCallback(
    (item: Model) => {
      if (checkable) {
        const newListItem = listItem.filter(
          (currentItem) => currentItem.id !== item?.id
        );
        onChange(newListItem, checkable);
      } else {
        onChange([null], checkable);
      }
    },
    [listItem, onChange, checkable]
  );

  const handleClearMultiItem = React.useCallback(() => {
    if (typeof onChange === "function") {
      onChange([], checkable);
    }
  }, [checkable, onChange]);

  const handleSearchItem = React.useCallback(
    (searchTerm: string) => {
      run(searchTerm);
    },
    [run]
  );

  const handleCloseList = React.useCallback(() => {
    setExpanded(false);
  }, []);

  const handleExpand = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!disabled) {
        if (!expanded) {
          const filterData = valueFilter
            ? { ...valueFilter }
            : new ClassFilter();
          dispatch({ type: "UPDATE", data: filterData });
        }
        setExpanded(true);
      }
    },
    [ClassFilter, disabled, expanded, valueFilter]
  );

  const handleOnchange = React.useCallback(
    (selectedNodes: Model[]) => {
      onChange([...selectedNodes], checkable);
      if (!checkable) setExpanded(false);
    },
    [onChange, checkable]
  );

  const handleKeyPress = React.useCallback(
    (event: any) => {
      switch (event.keyCode) {
        case 40:
          const treeHolder = document
            .getElementById(componentId)
            .querySelector(".ant-tree-list-holder-inner") as HTMLDivElement;
          const firstItem = treeHolder.firstElementChild.querySelector(
            ".ant-tree-node-content-wrapper .ant-tree-title div"
          ) as HTMLElement;
          firstItem.focus();
          break;
        case 9:
          handleCloseList();
          break;
        default:
          return;
      }
    },
    [componentId, handleCloseList]
  );

  const handleClearInput = React.useCallback(() => {
    const cloneFilter = { ...filter };
    if (searchType) {
      cloneFilter[searchProperty][searchType] = null;
    } else {
      cloneFilter[searchProperty] = null;
    }
    dispatch({ type: "UPDATE", data: cloneFilter });
  }, [filter, searchProperty, searchType]);

  CommonService.useClickOutside(wrapperRef, handleCloseList);

  React.useEffect(() => {
    if (expanded && appendToBody) {
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
  }, [appendToBody, componentId, expanded]);

  return (
    <>
      <div className="advance-tree-filter__container" ref={wrapperRef}>
        <div className="advance-tree-filter__input" onClick={handleExpand}>
          {checkable ? (
            <InputTag
              listValue={listItem}
              isMaterial={isMaterial}
              render={render}
              placeHolder={placeHolder}
              disabled={disabled}
              onSearch={handleSearchItem}
              onClear={handleClearItem}
              type={type}
              label={label}
              isSmall={isSmall}
              isUsingSearch={true}
              onClearMulti={handleClearMultiItem}
              onKeyDown={handleKeyPress}
              isFilter={true}
              isNotExpand={!expanded}
              isShowTooltip
              bgColor={bgColor}
            />
          ) : (
            <InputSelect
              value={item}
              render={render}
              isMaterial={isMaterial}
              placeHolder={placeHolder}
              expanded={expanded}
              disabled={disabled}
              handleClearInput={handleClearInput}
              onSearch={handleSearchItem}
              onClear={handleClearItem}
              type={type}
              label={label}
              isSmall={isSmall}
              onKeyDown={handleKeyPress}
              isFilter={true}
              bgColor={bgColor}
            />
          )}
        </div>
        {expanded && (
          <div
            className="advance-tree-filter__list"
            style={appendToBodyStyle}
            id={componentId}
          >
            <Tree
              getTreeData={getTreeData}
              selectedKey={selectedKey}
              onlySelectLeaf={onlySelectLeaf}
              checkedKeys={listIds}
              valueFilter={filter}
              searchProperty={searchProperty}
              searchType={searchType}
              checkStrictly={checkStrictly}
              height={300}
              onChange={handleOnchange}
              selectable={selectable}
              checkable={checkable}
              titleRender={treeTitleRender}
              selectWithPreferOption={selectWithPreferOption}
              preferOptions={preferOptions}
              isExpand={expanded}
              maxLengthItem={maxLengthItem}
            />
          </div>
        )}
      </div>
    </>
  );
}

AdvanceTreeFilter.defaultProps = {
  placeHolder: `Select TreeSelect...`,
  searchProperty: "name",
  searchType: "contain",
  classFilter: ModelFilter,
  onlySelectLeaf: false,
  isMaterial: false,
  checkable: false,
  disabled: false,
  selectable: true,
  bgColor: "white",
  treeTitleRender: (t: any) => t?.title,
};

export default AdvanceTreeFilter;
