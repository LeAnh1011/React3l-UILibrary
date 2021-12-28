import React, { RefObject, Reducer } from "react";
import "./TreeSelect.scss";
import { Model, ModelFilter } from "react3l-common";
import Tree from "../Tree/Tree";
import { useDebounceFn } from "ahooks";
import { DEBOUNCE_TIME_300 } from "config/consts";
import { Observable } from "rxjs";
import { CommonService } from "services/common-service";
import InputTag from "../Input/InputTag/InputTag";
import InputSelect from "../Input/InputSelect/InputSelect";
import { BORDER_TYPE } from "config/enum";

export interface TreeSelectProps<
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
  modelFilter?: TModelFilter;
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
  isUsingSearch?: boolean;
  treeTitleRender?: (T: T) => string;
  selectWithAdd?: boolean;
  selectWithPreferOption?: boolean;
  preferOptions?: T[];
  componentId?: string;
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
    isMaterial,
    checkStrictly,
    searchProperty,
    searchType,
    checkable,
    selectable,
    disabled,
    classFilter: ClassFilter,
    modelFilter,
    placeHolder,
    selectedKey,
    onlySelectLeaf,
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
    componentId,
  } = props;

  const { run } = useDebounceFn(
    (searchTerm: string) => {
      const cloneFilter = modelFilter ? { ...modelFilter } : { ...filter };
      cloneFilter[searchProperty][searchType] = searchTerm;
      dispatch({ type: "UPDATE", data: cloneFilter });
    },
    {
      wait: DEBOUNCE_TIME_300,
    }
  );

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
  >(filterReducer, new ClassFilter());

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
          const filterData = modelFilter
            ? { ...modelFilter }
            : new ClassFilter();
          dispatch({ type: "UPDATE", data: filterData });
        }
        setExpanded(true);
      }
    },
    [ClassFilter, disabled, expanded, modelFilter]
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
            .getElementById(`tree-select__wrapper-list-${componentId}`)
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
      <div className="tree-select__container" ref={wrapperRef}>
        <div className="tree-select__input" onClick={handleExpand}>
          {checkable ? (
            <InputTag
              listItem={listItem}
              isMaterial={isMaterial}
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
            />
          ) : (
            <InputSelect
              model={item}
              render={render}
              isMaterial={isMaterial}
              placeHolder={placeHolder}
              expanded={expanded}
              disabled={disabled}
              onSearch={handleSearchItem}
              onClear={handleClearItem}
              type={type}
              label={label}
              isSmall={isSmall}
              onKeyDown={handleKeyPress}
            />
          )}
        </div>
        {expanded && (
          <div
            className="tree-select__list"
            id={`tree-select__wrapper-list-${componentId}`}
          >
            <Tree
              getTreeData={getTreeData}
              selectedKey={selectedKey}
              onlySelectLeaf={onlySelectLeaf}
              checkedKeys={listIds}
              modelFilter={filter}
              checkStrictly={checkStrictly}
              height={300}
              onChange={handleOnchange}
              selectable={selectable}
              checkable={checkable}
              titleRender={treeTitleRender}
              selectWithAdd={selectWithAdd}
              selectWithPreferOption={selectWithPreferOption}
              preferOptions={preferOptions}
              isExpand={expanded}
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
};

export default TreeSelect;
