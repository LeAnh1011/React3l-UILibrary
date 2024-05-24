import React, { RefObject, Reducer, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { Model, ModelFilter } from "react3l-common";
import Tree from "../../Tree/Tree";
import { useDebounceFn } from "ahooks";
import { DEBOUNCE_TIME_300 } from "@Configs/consts";
import type { Observable } from "rxjs";
import { CommonService } from "@Services/common-service";
import InputTag from "../../Input/InputTag/InputTag";
import InputSelect from "../../Input/InputSelect/InputSelect";
import { BORDER_TYPE } from "@Configs/enum";
import { IdFilter } from "react3l-advanced-filters";
import classNames from "classnames";
import { TreeNode } from "@Components/Tree/TreeNode";
import "./TreeSelect.scss";

export interface TreeSelectProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  /**Title for filter field*/
  title?: string;
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
  /**Show symbol * as required field*/
  isRequired?: boolean;
  /**Append this component to body*/
  appendToBody?: boolean;
  /**Provide a function to render a specific property as name*/
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
  treeTitleRender?: (T: T) => ReactNode;
  /**Option show button add new*/
  selectWithAdd?: () => void;
  /**Component enable to search data list*/
  isUsingSearch?: boolean;
  /** Prefer node item of tree*/
  preferOptions?: T[];
  /** Show maximum length of item in each data row in tree*/
  maxLengthItem?: number;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "gray" | "white";
  /**Use to custom style the component*/
  className?: string;
  /** Option to let user cant select the selected item in tree list */
  isDisableSelected?: boolean;
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
    preferOptions,
    maxLengthItem,
    bgColor,
    className,
    isDisableSelected,
    buildTree,
    keyField,
  } = props;

  const componentId = React.useMemo(() => uuidv4(), []);

  const [expanded, setExpanded] = React.useState<boolean>(false);

  const [appendToBodyStyle, setAppendToBodyStyle] = React.useState({});

  const listIds = React.useMemo(() => {
    if (item) return [item?.[keyField]];
    if (listItem)
      return listItem.map(
        (currentItem) => currentItem && currentItem?.[keyField]
      );
    return [];
  }, [item, keyField, listItem]);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

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
    (selectedNodes: Model[], disableChange?: boolean) => {
      if (!disableChange) {
        onChange([...selectedNodes], checkable);
      }
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
      <div
        className={classNames("tree-select__container", className)}
        ref={wrapperRef}
      >
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
              isShowTooltip
              bgColor={bgColor}
              handlePressExpandedIcon={handleCloseList}
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
              bgColor={bgColor}
              handlePressExpandedIcon={handleCloseList}
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
              items={listItem}
              getTreeData={getTreeData}
              selectedKey={selectedKey}
              onlySelectLeaf={onlySelectLeaf}
              checkedKeys={listIds}
              valueFilter={filter}
              checkStrictly={checkStrictly}
              height={300}
              render={render}
              onChange={handleOnchange}
              selectable={selectable}
              checkable={checkable}
              titleRender={treeTitleRender}
              selectWithAdd={selectWithAdd}
              preferOptions={preferOptions}
              isExpand={expanded}
              maxLengthItem={maxLengthItem}
              isDisableSelected={isDisableSelected}
              buildTree={buildTree}
              keyField={keyField}
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
  isMaterial: false,
  checkable: false,
  disabled: false,
  selectable: true,
  treeTitleRender: (t: any) => t?.title,
  keyField: "id",
};

export default TreeSelect;
