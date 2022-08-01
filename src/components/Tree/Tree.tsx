import Add16 from "@carbon/icons-react/es/add/16";
import Checkmark16 from "@carbon/icons-react/es/checkmark/16";
import ChevronDown16 from "@carbon/icons-react/es/chevron--down/16";
import { Empty, Tooltip, Tree as TreeAntd } from "antd";
import { Key } from "antd/lib/table/interface";
import type {
  DataNode,
  EventDataNode,
  TreeProps as AntdTreeProps,
} from "antd/lib/tree";
import classNames from "classnames";
import IconLoading from "components/IconLoading/IconLoading";
import React, { ReactNode, RefObject } from "react";
import { Model, ModelFilter } from "react3l-common";
import type { Observable } from "rxjs";
import { CommonService } from "services/common-service";
import "./Tree.scss";
import { TreeNode as CustomTreeNode } from "./TreeNode";

function SwitcherIcon() {
  return (
    <span className="tree__icon">
      <ChevronDown16></ChevronDown16>
    </span>
  );
}
export interface TreeProps<T extends Model, TModelFilter extends ModelFilter> {
  treeData?: CustomTreeNode<T>[];
  valueFilter?: TModelFilter;
  expandedKeys?: number[];
  checkedKeys?: number[];
  checkable?: boolean;
  selectedKey?: number;
  onlySelectLeaf?: boolean;
  searchProperty?: string;
  searchType?: string;
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  onChange?: (treeNode: CustomTreeNode<T>[]) => void;
  render?: (treeNode: T) => string;
  classFilter?: new () => TModelFilter;
  isMultiple?: boolean;
  selectWithAdd?: boolean;
  selectWithPreferOption?: boolean;
  preferOptions?: T[];
  selectListRef?: RefObject<any>;
  isExpand?: boolean;
  maxLengthItem?: number;
}
function Tree(props: TreeProps<Model, ModelFilter> & AntdTreeProps) {
  const {
    treeData = [],
    valueFilter,
    expandedKeys,
    checkedKeys,
    checkable,
    selectedKey,
    onlySelectLeaf,
    // searchProperty,
    // searchType,
    classFilter: ClassFilter,
    getTreeData,
    onChange,
    selectWithAdd,
    preferOptions,
    maxLengthItem = 30,
    render,
  } = props;

  const [internalTreeData, setInternalTreeData] = React.useState<
    CustomTreeNode<Model>[]
  >(treeData);

  // const [staticTreeData, setStaticTreeData] = React.useState<
  //   CustomTreeNode<Model>[]
  // >();

  const [autoExpandParent, setAutoExpandParent] = React.useState<boolean>(true);

  const [internalExpandedKeys, setInternalExpandedKeys] = React.useState<Key[]>(
    expandedKeys
  );

  const [internalCheckedKeys, setInternalCheckedKeys] = React.useState<Key[]>(
    checkedKeys
  );

  const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<Key[]>(
    checkedKeys
  );

  const [loading, setLoading] = React.useState<boolean>(false);

  const [subscription] = CommonService.useSubscription();

  // prefer options tree list
  const internalPreferOptionsTreeData = React.useMemo(() => {
    if (preferOptions && preferOptions.length > 0) {
      const [treeData] = CommonService.buildTree(preferOptions);
      if (selectedKey) {
        CommonService.setDisabledNode(selectedKey, treeData);
      }
      if (onlySelectLeaf) {
        CommonService.setOnlySelectLeaf(treeData);
      }
      return treeData;
    }
    return [];
  }, [onlySelectLeaf, preferOptions, selectedKey]);

  const searchTreeNodeById: any = React.useCallback(
    (element: CustomTreeNode<Model>, key: number) => {
      if (element.key === +key) {
        return element;
      } else if (element.children != null) {
        var i;
        var result = null;
        for (i = 0; result == null && i < element.children.length; i++) {
          result = searchTreeNodeById(element.children[i], +key);
        }
        return result;
      }
      return null;
    },
    []
  );

  const searchTreeNodeByString: any = React.useCallback(
    (
      element: CustomTreeNode<Model>,
      searchString: string,
      fieldName: string
    ) => {
      const fieldSearch = element.item[fieldName] as string;
      if (fieldSearch.toLowerCase().includes(searchString.toLowerCase())) {
        return element;
      } else if (element.children != null) {
        var i;
        var result = null;
        for (i = 0; result == null && i < element.children.length; i++) {
          result = searchTreeNodeByString(
            element.children[i],
            searchString,
            fieldName
          );
        }
        return result;
      }
      return null;
    },
    []
  );

  const searchTree = React.useCallback(
    (treeNodes: CustomTreeNode<Model>[], listKeys: Key[]) => {
      const nodes: any[] = [];

      treeNodes.forEach((currentTree) => {
        listKeys.forEach((currentKey) => {
          const node = searchTreeNodeById(currentTree, currentKey);
          if (node) nodes.push(node);
        });
      });
      return nodes;
    },
    [searchTreeNodeById]
  );

  const handleExpandKey = React.useCallback((expandedKeys: Key[]) => {
    setInternalExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  }, []);

  const handleCheck: any = React.useCallback(
    (checkedKeys: { checked: Key[]; halfChecked: Key[] }) => {
      setInternalCheckedKeys(checkedKeys.checked);
      if (typeof onChange === "function") {
        const checkedNodes = searchTree(
          [...internalTreeData, ...internalPreferOptionsTreeData],
          checkedKeys.checked
        );
        const checkedItems = checkedNodes.map(
          (currentNode) => currentNode.item
        );
        onChange([...checkedItems]);
      }
    },
    [internalPreferOptionsTreeData, internalTreeData, onChange, searchTree]
  );

  const handleSelect: AntdTreeProps["onSelect"] = React.useCallback(
    (
      selectedKeys: Key[],
      info?: {
        event: "select";
        selected: boolean;
        node: EventDataNode<any> | any;
        selectedNodes: DataNode[] | any;
        nativeEvent: MouseEvent;
      }
    ) => {
      const { node, selectedNodes } = info;
      const filterList = internalSelectedKeys.filter(
        (id) => id === node?.item?.id
      );
      const isChangedNode = !(filterList.length > 0);
      if (
        typeof onChange === "function" &&
        filterList?.length === 0 &&
        isChangedNode
      ) {
        onChange([selectedNodes[0].item]);
      }
    },
    [internalSelectedKeys, onChange]
  );

  React.useEffect(() => {
    if (checkable) {
      setInternalCheckedKeys(checkedKeys);
    } else {
      setInternalSelectedKeys(checkedKeys);
    }
  }, [checkable, checkedKeys]);

  // using of build tree function
  React.useEffect(() => {
    if (typeof getTreeData === "function") {
      subscription.add(getTreeData);
      setLoading(true);
      getTreeData(valueFilter).subscribe({
        next: (res: Model[]) => {
          if (res) {
            const [treeData, internalExpandedKeys] = CommonService.buildTree(
              res
            );
            if (selectedKey) {
              CommonService.setDisabledNode(selectedKey, treeData);
            }
            if (onlySelectLeaf) {
              CommonService.setOnlySelectLeaf(treeData);
            }
            setInternalTreeData(treeData);
            // setStaticTreeData(treeData);
            setInternalExpandedKeys(internalExpandedKeys);
          } else setInternalTreeData([]);
          setLoading(false);
        },
        error: () => {
          setLoading(false);
        },
      });
    }
    return () => {};
  }, [
    getTreeData,
    selectedKey,
    ClassFilter,
    subscription,
    onlySelectLeaf,
    valueFilter,
  ]);

  // local filter tree base on model filter commented because now using servcer filter data
  // React.useEffect(() => {
  //   if (valueFilter && valueFilter[searchProperty][searchType]) {
  //     const searchValue = valueFilter[searchProperty][searchType];
  //     if (searchValue && searchValue.length > 0) {
  //       var currentTreeData: CustomTreeNode<Model>[] = JSON.parse(
  //         JSON.stringify(staticTreeData)
  //       );
  //       if (currentTreeData && currentTreeData.length > 0) {
  //         const foundNodes: CustomTreeNode<Model>[] = [];
  //         currentTreeData.forEach((element: CustomTreeNode<Model>) => {
  //           const node = searchTreeNodeByString(
  //             element,
  //             searchValue,
  //             searchProperty
  //           );
  //           if (node as CustomTreeNode<Model>) {
  //             foundNodes.push(node);
  //           }
  //         });
  //         setInternalTreeData(foundNodes);
  //         return;
  //       }
  //     }
  //   }
  //   setInternalTreeData(staticTreeData);
  // }, [
  //   valueFilter,
  //   searchProperty,
  //   searchType,
  //   staticTreeData,
  //   searchTreeNodeByString,
  // ]);

  const handleMove = React.useCallback(
    (item) => (event: any) => {
      const wrapperElement =
        event.target.parentElement.parentElement.parentElement;
      switch (event.keyCode) {
        case 13:
          if (!checkable) {
            handleSelect([item.key], {
              event: "select",
              selected: true,
              node: null,
              selectedNodes: [item],
              nativeEvent: null,
            });
          } else {
            let checkedKeys: any[] = [];
            if (
              internalCheckedKeys &&
              internalCheckedKeys.length > 0 &&
              internalCheckedKeys.includes(item.key)
            ) {
              checkedKeys = internalCheckedKeys.filter(
                (checkedItem) => checkedItem !== item.key
              );
            } else {
              checkedKeys = [...internalCheckedKeys, item.key];
            }
            handleCheck({ checked: checkedKeys, halfChecked: [] });
          }

          break;
        case 40:
          if (wrapperElement.nextElementSibling !== null) {
            wrapperElement.nextElementSibling
              .querySelector(
                ".ant-tree-node-content-wrapper .ant-tree-title div"
              )
              .focus();
          }
          event.preventDefault();
          break;
        case 38:
          if (wrapperElement.previousElementSibling !== null) {
            wrapperElement.previousElementSibling
              .querySelector(
                ".ant-tree-node-content-wrapper .ant-tree-title div"
              )
              .focus();
          }
          event.preventDefault();
          break;
      }
      return;
    },
    [checkable, handleCheck, handleSelect, internalCheckedKeys]
  );

  return (
    <>
      <div className="tree-container">
        {loading ? (
          <div className="tree__loading">
            <IconLoading color="#0F62FE" size={24} />
          </div>
        ) : (
          <>
            {internalTreeData.length > 0 ? (
              <>
                <TreeAntd
                  {...props}
                  virtual
                  autoExpandParent={autoExpandParent}
                  expandedKeys={internalExpandedKeys}
                  checkedKeys={internalCheckedKeys}
                  selectedKeys={internalSelectedKeys}
                  showLine={false && { showLeafIcon: false }}
                  switcherIcon={<SwitcherIcon />}
                  onExpand={handleExpandKey}
                  onCheck={handleCheck}
                  onSelect={handleSelect}
                  treeData={internalTreeData}
                  titleRender={(node: any) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      tabIndex={-1}
                      onKeyDown={handleMove(node)}
                      className={`tree-node-${node.key}`}
                    >
                      <div>
                        {render && typeof render === "function" ? (
                          <>
                            {maxLengthItem &&
                            render(node?.item)?.length > maxLengthItem ? (
                              <Tooltip title={render(node?.item)}>
                                {CommonService.limitWord(
                                  render(node?.item),
                                  maxLengthItem
                                )}
                              </Tooltip>
                            ) : (
                              render(node?.item)
                            )}
                          </>
                        ) : (
                          <>
                            {maxLengthItem &&
                            node?.title?.length > maxLengthItem ? (
                              <Tooltip title={node?.title}>
                                {CommonService.limitWord(
                                  node?.title,
                                  maxLengthItem
                                )}
                              </Tooltip>
                            ) : (
                              node?.title
                            )}
                          </>
                        )}
                      </div>
                      {!checkable &&
                        internalSelectedKeys &&
                        internalSelectedKeys.includes(node.key) && (
                          <div style={{ display: "flex" }}>
                            <Checkmark16 />
                          </div>
                        )}
                    </div>
                  )}
                ></TreeAntd>

                {!loading && internalTreeData.length > 0 && (
                  <div className="select__list-prefer">
                    {internalPreferOptionsTreeData &&
                      internalPreferOptionsTreeData.length > 0 && (
                        <TreeAntd
                          {...props}
                          virtual
                          showLine={false && { showLeafIcon: false }}
                          treeData={internalPreferOptionsTreeData} // pass internalTreeData here  showLine={false && { showLeafIcon: false }}
                          switcherIcon={<SwitcherIcon />}
                          onCheck={handleCheck}
                          onSelect={handleSelect}
                          checkedKeys={internalCheckedKeys}
                          selectedKeys={internalSelectedKeys}
                          titleRender={(node: any) => (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                {maxLengthItem &&
                                node?.title?.length > maxLengthItem ? (
                                  <Tooltip title={node?.title}>
                                    {CommonService.limitWord(
                                      node?.title,
                                      maxLengthItem
                                    )}
                                  </Tooltip>
                                ) : (
                                  node?.title
                                )}
                              </div>
                              {!checkable &&
                                internalSelectedKeys &&
                                internalSelectedKeys.includes(node.key) && (
                                  <div style={{ display: "flex" }}>
                                    <Checkmark16 />
                                  </div>
                                )}
                            </div>
                          )}
                        />
                      )}
                  </div>
                )}
                {selectWithAdd && (
                  <div
                    className={classNames(
                      "select__bottom-button select__add-button p-y--xs"
                    )}
                  >
                    <Add16 className="m-l--xs" />
                    <span>Add new</span>
                  </div>
                )}
              </>
            ) : (
              <Empty />
            )}
          </>
        )}
      </div>
    </>
  );
}

Tree.defaultProps = {
  classFilter: ModelFilter,
  searchProperty: "name",
  searchType: "contain",
};

export default Tree;
