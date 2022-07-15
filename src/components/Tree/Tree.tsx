import { Model, ModelFilter } from "react3l-common";
import Add16 from "@carbon/icons-react/es/add/16";
import ChevronDown16 from "@carbon/icons-react/es/chevron--down/16";
import Checkmark16 from "@carbon/icons-react/es/checkmark/16";
import { Empty, Tree as TreeAntd } from "antd";
import type {
  DataNode,
  EventDataNode,
  TreeProps as AntdTreeProps,
} from "antd/lib/tree";
import React, { ReactNode, RefObject } from "react";
import type { Observable } from "rxjs";
import { CommonService } from "services/common-service";
import "./Tree.scss";
import { TreeNode as CustomTreeNode } from "./TreeNode";
import { Key } from "antd/lib/table/interface";
import classNames from "classnames";
import IconLoading from "components/IconLoading/IconLoading";

const { TreeNode } = TreeAntd;

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
  titleRender?: (treeNode: CustomTreeNode<T>) => string | ReactNode;
  classFilter?: new () => TModelFilter;
  isMultiple?: boolean;
  selectWithAdd?: boolean;
  selectWithPreferOption?: boolean;
  preferOptions?: T[];
  selectListRef?: RefObject<any>;
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
    searchProperty,
    searchType,
    classFilter: ClassFilter,
    getTreeData,
    onChange,
    titleRender,
    selectWithAdd,
    preferOptions,
  } = props;

  const [internalTreeData, setInternalTreeData] = React.useState<
    CustomTreeNode<Model>[]
  >(treeData);

  const [staticTreeData, setStaticTreeData] = React.useState<
    CustomTreeNode<Model>[]
  >();

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
        node: EventDataNode;
        selectedNodes: DataNode[];
        nativeEvent: MouseEvent;
      }
    ) => {
      const filterList = internalSelectedKeys.filter((id) => id === info.node?.item?.id);
      
      if(filterList && filterList?.length > 0) {
        setInternalSelectedKeys([...internalSelectedKeys]);
      }else {
        setInternalSelectedKeys([...internalSelectedKeys, info?.node?.item?.id]);
      }

      if (typeof onChange === "function" && filterList?.length === 0) {
        const checkedNodes = searchTree(
          [...internalTreeData, ...internalPreferOptionsTreeData],
          selectedKeys
        );
        const checkedItems = checkedNodes.map(
          (currentNode) => currentNode.item
        );
        onChange([...checkedItems]);
      }
    },
    [internalPreferOptionsTreeData, internalSelectedKeys, internalTreeData, onChange, searchTree]
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
            setStaticTreeData(treeData);
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

  React.useEffect(() => {
    if (valueFilter && valueFilter[searchProperty][searchType]) {
      const searchValue = valueFilter[searchProperty][searchType];
      if (searchValue && searchValue.length > 0) {
        var currentTreeData: CustomTreeNode<Model>[] = JSON.parse(
          JSON.stringify(staticTreeData)
        );
        if (currentTreeData && currentTreeData.length > 0) {
          const foundNodes: CustomTreeNode<Model>[] = [];
          currentTreeData.forEach((element: CustomTreeNode<Model>) => {
            const node = searchTreeNodeByString(
              element,
              searchValue,
              searchProperty
            );
            if (node as CustomTreeNode<Model>) {
              foundNodes.push(node);
            }
          });
          setInternalTreeData(foundNodes);
          return;
        }
      }
    }
    setInternalTreeData(staticTreeData);
  }, [
    valueFilter,
    searchProperty,
    searchType,
    staticTreeData,
    searchTreeNodeByString,
  ]);

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

  // dont need to use this function
  const loop = React.useCallback(
    (data) =>
      data.map((item: DataNode) => {
        if (item.children && item.children.length) {
          return (
            <TreeNode
              key={item.key}
              checkable={checkable}
              title={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  tabIndex={-1}
                  onKeyDown={handleMove(item)}
                  className={`tree-node-${item.key}`}
                >
                  <div>{titleRender(item)}</div>
                  {!checkable &&
                    internalSelectedKeys &&
                    internalSelectedKeys.includes(item.key.toString()) && (
                      <div>
                        <Checkmark16 />
                      </div>
                    )}
                </div>
              }
            >
              {loop(item.children)}
            </TreeNode>
          );
        }

        return (
          <TreeNode
            key={item.key}
            checkable={checkable}
            title={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                tabIndex={-1}
                onKeyDown={handleMove(item)}
                className={`tree-node-${item.key}`}
              >
                <div>{titleRender(item)}</div>
                {!checkable &&
                  internalSelectedKeys &&
                  internalSelectedKeys.includes(item.key.toString()) && (
                    <div>
                      <Checkmark16 />
                    </div>
                  )}
              </div>
            }
          />
        );
      }),
    [checkable, handleMove, internalSelectedKeys, titleRender]
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
                  titleRender={(node: DataNode) => (
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
                      <div>{titleRender(node)}</div>
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
                          titleRender={(node: DataNode) => (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>{titleRender(node)}</div>
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
