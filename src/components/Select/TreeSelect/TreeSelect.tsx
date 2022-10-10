import { DEBOUNCE_TIME_300 } from "@Configs/consts";
import { useDebounceFn } from "ahooks";
import InputSelect from "components/Input/InputSelect";
import InputTag from "components/Input/InputTag";
import Tree from "components/Tree";
import { BORDER_TYPE } from "config/enum";
import React, { Reducer, RefObject } from "react";
import { IdFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import type { Observable } from "rxjs";
import { CommonService } from "services/common-service";
import { v4 as uuidv4 } from "uuid";
import "./TreeSelect.scss";

export interface TreeSelectProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  title?: string;
  listItem?: Model[];
  item?: Model;
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
  isRequired?: boolean;
  appendToBody?: boolean;
  render?: (T: T) => string;
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  onChange?: (T: Model[], TT: boolean) => void;
  classFilter?: new () => TModelFilter;
  type?: BORDER_TYPE;
  label?: string;
  isSmall?: boolean;
  isUsingSearch?: boolean;
  treeTitleRender?: (T: T) => string;
  selectWithAdd?: boolean;
  selectWithPreferOption?: boolean;
  preferOptions?: T[];
  maxLengthItem?: number;
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

function TreeSelect(props: TreeSelectProps<Model, ModelFilter>) {
  const {
    listItem,
    item,
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
    isRequired,
    appendToBody,
    render,
    getTreeData,
    onChange,
    type,
    label,
    isSmall,
    isUsingSearch,
    treeTitleRender,
    selectWithAdd,
    selectWithPreferOption,
    preferOptions,
    maxLengthItem,
  } = props;

  const componentId = React.useMemo(() => uuidv4(), []);

  const [expanded, setExpanded] = React.useState<boolean>(false);

  const [appendToBodyStyle, setAppendToBodyStyle] = React.useState({});

  const listIds = React.useMemo(() => {
    if (item) return [item.id];
    if (listItem) return listItem.map((currentItem) => currentItem?.id);
    return [];
  }, [listItem, item]);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [filter, dispatch] = React.useReducer<
    Reducer<ModelFilter, filterAction>
  >(filterReducer, { ...new ClassFilter(), valueFilter });

  const { run } = useDebounceFn(
    (searchTerm: string) => {
      const cloneFilter = { ...filter };

      cloneFilter[searchProperty][searchType] = searchTerm;
      if (listIds?.length > 1) {
        cloneFilter["activeNodeIds"] = { ...new IdFilter(), in: [...listIds] };
      } else {
        cloneFilter["activeNodeId"] = {
          ...new IdFilter(),
          equal: listIds?.length > 0 ? listIds[0] : undefined,
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

  const handleKeyEnter = React.useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        handleExpand(null);
      }
      return;
    },
    [handleExpand]
  );

  const handleClearInput = React.useCallback(() => {
    const cloneFilter = { ...filter };
    cloneFilter[searchProperty][searchType] = null;
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
      <div className="tree-select__container" ref={wrapperRef}>
        <div className="tree-select__input" onClick={handleExpand}>
          {checkable ? (
            <InputTag
              listValue={listItem}
              render={render}
              placeHolder={placeHolder}
              disabled={disabled}
              onSearch={handleSearchItem}
              onClear={handleClearItem}
              type={type}
              label={label}
              isSmall={isSmall}
              isUsingSearch={isUsingSearch}
              onClearMulti={handleClearMultiItem}
              onKeyDown={handleKeyPress}
              isNotExpand={!expanded}
              onKeyEnter={handleKeyEnter}
              isRequired={isRequired}
            />
          ) : (
            <InputSelect
              value={item}
              render={render}
              placeHolder={placeHolder}
              expanded={expanded}
              disabled={disabled}
              onSearch={handleSearchItem}
              onClear={handleClearItem}
              handleClearInput={handleClearInput}
              type={type}
              label={label}
              isSmall={isSmall}
              onKeyDown={handleKeyPress}
              onKeyEnter={handleKeyEnter}
              isRequired={isRequired}
            />
          )}
        </div>
        {expanded && (
          <div
            className="tree-select__list"
            id={componentId}
            style={appendToBodyStyle}
          >
            <Tree
              getTreeData={getTreeData}
              selectedKey={selectedKey}
              onlySelectLeaf={onlySelectLeaf}
              checkedKeys={listIds}
              valueFilter={filter}
              classFilter={ClassFilter}
              checkStrictly={checkStrictly}
              searchProperty={searchProperty}
              searchType={searchType}
              height={300}
              onChange={handleOnchange}
              selectable={selectable}
              checkable={checkable}
              titleRender={treeTitleRender}
              selectWithAdd={selectWithAdd}
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

TreeSelect.defaultProps = {
  placeHolder: `Select TreeSelect...`,
  searchProperty: "name",
  searchType: "contain",
  classFilter: ModelFilter,
  onlySelectLeaf: false,
  checkable: false,
  disabled: false,
  selectable: true,
  treeTitleRender: (t: any) => t?.title,
};

export default TreeSelect;
