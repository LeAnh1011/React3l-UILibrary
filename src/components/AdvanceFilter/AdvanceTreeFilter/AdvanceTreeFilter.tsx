import React, { RefObject, Reducer } from "react";
import { v4 as uuidv4 } from "uuid";
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
import { TreeNode } from "@Components/Tree/TreeNode";
import "./AdvanceTreeFilter.scss";

export interface AdvanceTreeFilterProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  /** User-selected values*/
  listItem?: Model[];
  /** User-selected value*/
  item?: Model;
  /**The property name of the model filter you want to search in the list data*/
  searchProperty?: string;
  /**The type of searchProperty you want to search in the list data*/
  searchType?: string;
  /** An optional to multiple check filter values*/
  checkable?: boolean;
  /** Prop of AntdTreeProps*/
  selectable?: boolean;
  /**Check treeNode precisely; parent treeNode and children treeNodes are not associated*/
  checkStrictly?: boolean;
  /** Not allow to handle change filter*/
  disabled?: boolean;
  /** Value filter for api get data option*/
  valueFilter?: TModelFilter;
  /** Placeholder of the component*/
  placeHolder?: string;
  /** Key of selected node */
  selectedKey?: number;
  /**Not allow to select the father item that contain a lot of items inside*/
  onlySelectLeaf?: boolean;
  /** Provide a function to render a specific property as name*/
  render?: (T: T) => string;
  /** API to get data*/
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  /** Function to change selected items*/
  onChange?: (T: Model[], TT: boolean) => void;
  /** Model filter class of API get list data*/
  classFilter?: new () => TModelFilter;
  /** Control the style type of component: MATERIAL, BORDERED, FLOAT_LABEL */
  type?: BORDER_TYPE;
  /** Label for current field*/
  label?: string;
  /** Control the size of the component*/
  isSmall?: boolean;
  /** Prop of AntdTreeProps*/
  treeTitleRender?: (T: T) => string;
  /** Prefer node item of tree*/
  preferOptions?: T[];
  /** Set maximum length of each data row to render*/
  maxLengthItem?: number;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
  /**Append this component to body*/
  appendToBody?: boolean;
  /** Option to let developer can modify tree data */
  buildTree?: (flatData: Model[]) => [TreeNode<Model>[], number[]];
  /** Key property when you want to customize build tree object */
  keyField?: string;
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
    preferOptions,
    maxLengthItem,
    bgColor,
    appendToBody,
    buildTree,
    keyField,
  } = props;

  const componentId = React.useMemo(() => uuidv4(), []);

  const [expanded, setExpanded] = React.useState<boolean>(false);

  const listIds = React.useMemo(() => {
    if (item) return [item?.[keyField]];
    if (listItem) return listItem.map((currentItem) => currentItem?.[keyField]);
    return [];
  }, [item, keyField, listItem]);

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
          (currentItem) => currentItem?.[keyField] !== item?.[keyField]
        );
        onChange(newListItem, checkable);
      } else {
        onChange([null], checkable);
      }
    },
    [checkable, listItem, onChange, keyField]
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
              clearSearchTerm={expanded}
              handlePressExpandedIcon={handleCloseList}
            />
          ) : (
            <InputSelect
              value={item}
              render={render}
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
              handlePressExpandedIcon={handleCloseList}
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
              items={listItem}
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
              preferOptions={preferOptions}
              isExpand={expanded}
              maxLengthItem={maxLengthItem}
              buildTree={buildTree}
              keyField={keyField}
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
  checkable: false,
  disabled: false,
  selectable: true,
  bgColor: "white",
  treeTitleRender: (t: any) => t?.title,
  keyField: "id",
};

export default AdvanceTreeFilter;
