import React, { RefObject, Reducer, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { Model, ModelFilter } from "react3l-common";
import Tree from "../../Tree";
import { useDebounceFn } from "ahooks";
import { DEBOUNCE_TIME_300 } from "@Configs/consts";
import type { Observable } from "rxjs";
import { CommonService } from "@Services/common-service";
import InputText from "@Components/Input/InputText";
import classNames from "classnames";
import { ChevronDown, Search } from "@carbon/icons-react";
import { IdFilter } from "react3l-advanced-filters";
import { TreeNode } from "@Components/Tree/TreeNode";
import "./AdvanceTreeFilterMaster.scss";

export interface AdvanceTreeFilterMasterProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  /**Label for current field*/
  label?: string;
  /**User-selected values*/
  listItem?: Model[];
  /**User-selected value*/
  item?: Model;
  /**The property name of the model filter you want to search in the list data*/
  searchProperty?: string;
  /**The type of searchProperty you want to search in the list data*/
  searchType?: string;
  /**An optional to multiple check filter values*/
  checkable?: boolean;
  /**Prop of AntdTreeProps*/
  selectable?: boolean;
  /**Check treeNode precisely; parent treeNode and children treeNodes are not associated*/
  checkStrictly?: boolean;
  /**Not allow to handle change filter*/
  disabled?: boolean;
  /**Value filter for api get data option*/
  valueFilter?: TModelFilter;
  /**Placeholder of the component*/
  placeHolder?: string;
  /**Key of selected node */
  selectedKey?: number;
  /**Not allow to select the father item that contain a lot of items inside*/
  onlySelectLeaf?: boolean;
  /**API to get data*/
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  /**Function to change selected items*/
  onChange?: (T: Model[], TT: boolean) => void;
  /**Model filter class of API get list data*/
  classFilter?: new () => TModelFilter;
  /**Provide a function to render a specific property as name*/
  render?: (T: T) => string;
  /**Prefer node item of tree*/
  preferOptions?: T[];
  /**Set maximum length of text to search*/
  maxLength?: number;
  /**Set maximum length of data name display in each row of tree*/
  maxLengthItem?: number;
  /**Use to custom style the component*/
  className?: string;
  /** Prop of AntdTreeProps*/
  treeTitleRender?: (T: T) => ReactNode;
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

function AdvanceTreeFilterMaster(
  props: AdvanceTreeFilterMasterProps<Model, ModelFilter>
) {
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
    getTreeData,
    onChange,
    render,
    treeTitleRender,
    preferOptions,
    label,
    maxLength,
    maxLengthItem,
    className,
    buildTree,
    keyField,
  } = props;
  const inputRef: any = React.useRef<any>(null);
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

  const handleSearchChange = React.useCallback(
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
          setTimeout(() => {
            inputRef.current.children[0].children[0].focus();
          }, 400);
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

  CommonService.useClickOutside(wrapperRef, handleCloseList);

  return (
    <>
      <div
        className={classNames(
          "advance-tree-filter-master__container",
          className
        )}
        ref={wrapperRef}
      >
        <div
          onClick={handleExpand}
          className={classNames(
            "button-toggle p-l--sm p-t--xs p-r--xs p-b--xs",
            {
              "filter-active": !checkable ? item : listItem?.length > 0,
              "active-bg": expanded,
            }
          )}
        >
          <div className="advance-tree-filter-master__title">
            <span className="filter-title">
              {checkable &&
                listItem?.length > 0 &&
                "(" + listItem?.length + ") "}
              {label}
            </span>
            <ChevronDown size={16} />
          </div>
        </div>
        {expanded && (
          <div className="advance-tree-filter-master__box-search">
            <div className="advance-tree-filter-master__input p--xs">
              <InputText
                isSmall={false}
                maxLength={maxLength}
                onChange={handleSearchChange}
                placeHolder={placeHolder}
                suffix={<Search size={16} />}
                ref={inputRef}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="advance-tree-filter-master__list" id={componentId}>
              <Tree
                items={listItem}
                getTreeData={getTreeData}
                selectedKey={selectedKey}
                onlySelectLeaf={onlySelectLeaf}
                checkedKeys={listIds}
                valueFilter={filter}
                checkStrictly={checkStrictly}
                height={300}
                onChange={handleOnchange}
                selectable={selectable}
                checkable={checkable}
                render={render}
                titleRender={treeTitleRender}
                selectWithAdd={undefined}
                preferOptions={preferOptions}
                isExpand={expanded}
                maxLengthItem={maxLengthItem}
                buildTree={buildTree}
                keyField={keyField}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

AdvanceTreeFilterMaster.defaultProps = {
  placeHolder: `Select TreeSelect...`,
  searchProperty: "name",
  searchType: "contain",
  classFilter: ModelFilter,
  onlySelectLeaf: false,
  checkable: false,
  disabled: false,
  selectable: true,
  treeTitleRender: (t: any) => t?.title,
  keyField: "id",
};

export default AdvanceTreeFilterMaster;
