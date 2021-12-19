import { Model, ModelFilter } from "react3l-common";
import { Empty, Spin, Tree as TreeAntd } from "antd";
import {
  DataNode,
  EventDataNode,
  TreeProps as AntdTreeProps,
} from "antd/lib/tree";
import React, { ReactNode } from "react";
import { ErrorObserver, Observable } from "rxjs";
import { CommonService } from "services/common-service";
import "./Tree.scss";
import { TreeNode as CustomTreeNode } from "./TreeNode";
import { Key } from "antd/lib/table/interface";
import classNames from "classnames";

function SwitcherIcon() {
  return (
    <span className="tree__icon">
      <i className="tio-chevron_down"></i>
    </span>
  );
}
export interface TreeProps<T extends Model, TModelFilter extends ModelFilter> {
  treeData?: CustomTreeNode<T>[];
  modelFilter?: TModelFilter;
  expandedKeys?: number[];
  checkedKeys?: number[];
  checkable?: boolean;
  selectedKey?: number;
  onlySelectLeaf?: boolean;
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  onChange?: (treeNode: CustomTreeNode<T>[]) => void;
  titleRender?: (treeNode: CustomTreeNode<T>) => string | ReactNode;
  isMultiple?: boolean;
  selectWithAdd?: boolean;
  selectWithPreferOption?: boolean;
  preferOptions?: T[];
}
function Tree(props: TreeProps<Model, ModelFilter> & AntdTreeProps) {
  const {
    treeData = [],
    modelFilter,
    expandedKeys,
    checkedKeys,
    checkable,
    selectedKey,
    onlySelectLeaf,
    getTreeData,
    onChange,
    titleRender,
    selectWithAdd,
    preferOptions,
  } = props;

  const [internalTreeData, setInternalTreeData] = React.useState<
    CustomTreeNode<Model>[]
  >(treeData);

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

  const searchTreeNode: any = React.useCallback(
    (element: CustomTreeNode<Model>, key: number) => {
      if (element.key === key) {
        return element;
      } else if (element.children != null) {
        var i;
        var result = null;
        for (i = 0; result == null && i < element.children.length; i++) {
          result = searchTreeNode(element.children[i], key);
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
          const node = searchTreeNode(currentTree, currentKey);
          if (node) nodes.push(node);
        });
      });
      return nodes;
    },
    [searchTreeNode]
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
      info: {
        event: "select";
        selected: boolean;
        node: EventDataNode;
        selectedNodes: DataNode[];
        nativeEvent: MouseEvent;
      }
    ) => {
      setInternalSelectedKeys(selectedKeys);
      if (typeof onChange === "function") {
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
    [internalPreferOptionsTreeData, internalTreeData, onChange, searchTree]
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
      getTreeData(modelFilter).subscribe(
        (res: Model[]) => {
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
            setInternalExpandedKeys(internalExpandedKeys);
          } else setInternalTreeData([]);
          setLoading(false);
        },
        (err: ErrorObserver<Error>) => {
          setLoading(false);
        }
      );
    }
    return () => {};
  }, [getTreeData, selectedKey, modelFilter, subscription, onlySelectLeaf]);

  return (
    <>
      <div className="tree-container">
        {loading ? (
          <div className="tree__loading">
            <Spin tip="Loading..."></Spin>
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
                  treeData={internalTreeData} // pass internalTreeData here
                  onExpand={handleExpandKey}
                  onCheck={handleCheck}
                  onSelect={handleSelect}
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
                          <div>
                            <i className="tio-done" />
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
                                  <div>
                                    <i className="tio-done" />
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
                    <i className="tio-add m-l--xs" />
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

Tree.defaultProps = {};

export default Tree;
