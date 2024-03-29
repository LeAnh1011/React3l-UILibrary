import { Add, Checkmark, ChevronDown } from "@carbon/icons-react";
import { Empty, Tooltip, Tree as TreeAntd } from "antd";
import { Key } from "antd/lib/table/interface";
import type {
  DataNode,
  EventDataNode,
  TreeProps as AntdTreeProps,
} from "antd/lib/tree";
import classNames from "classnames";
import IconLoading from "@Components/IconLoading/IconLoading";
import React, { ReactNode, RefObject } from "react";
import { Model, ModelFilter } from "react3l-common";
import type { Observable } from "rxjs";
import { CommonService } from "@Services/common-service";
import { TreeNode as CustomTreeNode } from "./TreeNode";
import "./Tree.scss";

function SwitcherIcon() {
  return (
    <span className="tree__icon">
      <ChevronDown size={16} />
    </span>
  );
}
export interface TreeProps<T extends Model, TModelFilter extends ModelFilter> {
  /**List TreeNode data*/
  treeData?: CustomTreeNode<T>[];
  /**Value filter for api getTreeData*/
  valueFilter?: TModelFilter;
  /**List key of node is expanding*/
  expandedKeys?: number[];
  /**List key of node checked*/
  checkedKeys?: number[];
  /**Switch to multiple check option*/
  checkable?: boolean;
  /**Key of selected node */
  selectedKey?: number;
  /**Not allow to select the father item that contain a lot of items inside*/
  onlySelectLeaf?: boolean;
  /**API to get data*/
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  /**Function to change selected items*/
  onChange?: (treeNode: CustomTreeNode<T>[]) => void;
  /**Provide a function to render a specific property as name*/
  render?: (treeNode: T) => string;
  /**Option to show add new button*/
  selectWithAdd?: () => void;
  /**Prefer node item of tree*/
  preferOptions?: T[];
  /**Show maximum length of each row item in tree (must pass value when render option return string)*/
  maxLengthItem?: number;
  /**Pass ref of list data select */
  selectListRef?: RefObject<any>;
  /** Prop of AntdTreeProps*/
  titleRender?: (T: T) => ReactNode;
  isExpand?: boolean;
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
    getTreeData,
    onChange,
    selectWithAdd,
    preferOptions,
    maxLengthItem = 30,
    render,
    checkStrictly,
    titleRender,
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
    (checkedKeys: Key[]) => {
      setInternalCheckedKeys(checkedKeys);
      if (typeof onChange === "function") {
        const checkedNodes = searchTree(
          [...internalTreeData, ...internalPreferOptionsTreeData],
          checkedKeys
        );
        const checkedItems = checkedNodes.map(
          (currentNode) => currentNode.item
        );
        onChange([...checkedItems]);
      }
    },
    [internalPreferOptionsTreeData, internalTreeData, onChange, searchTree]
  );

  const handleCheckStrictly: any = React.useCallback(
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
      if (!checkable) {
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
      }
    },
    [checkable, internalSelectedKeys, onChange]
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
  }, [getTreeData, selectedKey, subscription, onlySelectLeaf, valueFilter]);

  // local filter tree base on model filter commented because now using server filter data
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
            if (checkStrictly) {
              handleCheckStrictly({ checked: checkedKeys, halfChecked: [] });
            } else {
              handleCheck(checkedKeys);
            }
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
    [
      checkStrictly,
      checkable,
      handleCheck,
      handleCheckStrictly,
      handleSelect,
      internalCheckedKeys,
    ]
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
                  onCheck={checkStrictly ? handleCheckStrictly : handleCheck}
                  onSelect={handleSelect}
                  treeData={internalTreeData}
                  titleRender={
                    titleRender
                      ? titleRender
                      : (node: any) => (
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
                                  <Checkmark size={16} />
                                </div>
                              )}
                          </div>
                        )
                  }
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
                          onCheck={
                            checkStrictly ? handleCheckStrictly : handleCheck
                          }
                          onSelect={handleSelect}
                          checkedKeys={internalCheckedKeys}
                          selectedKeys={internalSelectedKeys}
                          titleRender={
                            titleRender
                              ? titleRender
                              : (node: any) => (
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
                                      internalSelectedKeys.includes(
                                        node.key
                                      ) && (
                                        <div style={{ display: "flex" }}>
                                          <Checkmark size={16} />
                                        </div>
                                      )}
                                  </div>
                                )
                          }
                        />
                      )}
                  </div>
                )}
                {typeof selectWithAdd !== "undefined" && (
                  <div
                    className={classNames(
                      "select__bottom-button select__add-button p-y--xs"
                    )}
                    onClick={selectWithAdd}
                  >
                    <Add size={16} className="m-l--xs" />
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
