import React, { RefObject, Reducer } from "react";
import { v4 as uuidv4 } from "uuid";
import "./AdvanceTreeFilterMaster.scss";
import { Model, ModelFilter } from "react3l-common";
import Tree from "../../Tree";
import { useDebounceFn } from "ahooks";
import { DEBOUNCE_TIME_300 } from "config/consts";
import { Observable } from "rxjs";
import { CommonService } from "services/common-service";
import InputText from "components/Input/InputText";
import classNames from "classnames";
import { ChevronDown16, Search16 } from "@carbon/icons-react";
import { IdFilter } from "react3l-advanced-filters";

export interface AdvanceTreeFilterMasterProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  title?: string;
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
  selectedKey?: number;
  onlySelectLeaf?: boolean;
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  onChange?: (T: Model[], TT: boolean) => void;
  classFilter?: new () => TModelFilter;
  treeTitleRender?: (T: T) => string;
  selectWithPreferOption?: boolean;
  preferOptions?: T[];
  maxLength?: number;
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
    getTreeData,
    onChange,
    treeTitleRender,
    selectWithPreferOption,
    preferOptions,
    title,
    maxLength,
  } = props;
  const inputRef: any = React.useRef<any>(null);
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

  const [filter, dispatch] = React.useReducer<
    Reducer<ModelFilter, filterAction>
  >(filterReducer, {...new ClassFilter(), valueFilter});

  const { run } = useDebounceFn(
    (searchTerm: string) => {
      const cloneFilter =  { ...filter };
      cloneFilter[searchProperty][searchType] = searchTerm;
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
            inputRef.current.children[0].focus();
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
      <div className="advance-tree-filter-master__container" ref={wrapperRef}>
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
              {title}
            </span>
            <ChevronDown16 />
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
                suffix={<Search16 />}
                isMaterial={isMaterial}
                ref={inputRef}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="advance-tree-filter-master__list" id={componentId}>
              <Tree
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
                titleRender={treeTitleRender}
                selectWithAdd={false}
                selectWithPreferOption={selectWithPreferOption}
                preferOptions={preferOptions}
                isExpand={expanded}
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
  isMaterial: false,
  checkable: false,
  disabled: false,
  selectable: true,
  treeTitleRender: (t: any) => t?.title,
};

export default AdvanceTreeFilterMaster;
