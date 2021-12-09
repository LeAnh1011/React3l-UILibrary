import { Model } from "react3l-common";
import { Button, Dropdown, Menu } from "antd";
import classNames from "classnames";
import FormItem from "../../FormItem/FormItem";
import InputNumber, { DECIMAL } from "../../Input/InputNumber";
import { formatNumber } from "helpers/number";
import React, { ReactElement, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { TreeList } from "../TreeList";
import "./TreeNode.scss";

export interface TreeNodeProps<T extends Model> {
  node?: T;

  nodeLevel?: number;

  nodePadding?: number;

  children?: ReactElement<any> | ReactElement<any>[];

  onPreview?(id: any): () => void;

  onAdd?(node: T): () => void;

  onEdit?(node: T): () => void;

  onDelete?(node: T): () => void;

  onChange?(value: T[]): void;

  render?(node: T): ReactNode;

  isBorder?: boolean;

  editMode?: boolean;

  model?: Model;

  handleUpdateNewModel?: (data: Model) => void;

  placeHolder?: string;
}

function TreeNode<T extends Model>(props: TreeNodeProps<T>) {
  const {
    node,
    onAdd,
    onPreview,
    onDelete,
    onEdit,
    render,
    nodeLevel,
    nodePadding,
    isBorder,
    editMode,
    model,
    handleUpdateNewModel,
    placeHolder,
  } = props;
  const hasChildren: boolean = node?.children?.length > 0;

  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const [current, setCurrent] = React.useState<number>(null);
  const [validText, setValidtext] = React.useState<string>(null);

  const [translate] = useTranslation();

  const handleToggle = React.useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const menuCRUD = React.useMemo(
    () => (
      <Menu>
        {node?.item.level < 4 && (
          <Menu.Item>
            {typeof onAdd === "function" && (
              <div onClick={onAdd(node?.item)}>Tạo con</div>
            )}
          </Menu.Item>
        )}
        <Menu.Item>
          {typeof onPreview === "function" && (
            <div onClick={onPreview(node?.item?.id)}>Xem</div>
          )}
        </Menu.Item>

        <Menu.Item>
          {typeof onEdit === "function" && (
            <div onClick={onEdit(node?.item)}>Sửa</div>
          )}
        </Menu.Item>

        {!node?.item?.used &&
          (node?.children?.length === 0 ||
            typeof node?.children === undefined) && (
            <Menu.Item>
              {typeof onDelete === "function" && (
                <div onClick={onDelete(node?.item)}>Xóa</div>
              )}
            </Menu.Item>
          )}
      </Menu>
    ),
    [node, onAdd, onDelete, onEdit, onPreview]
  );

  const handleShowInput = React.useCallback(
    (node) => () => {
      const newModel = { ...model };
      newModel?.purchaseRequestPlanContents.forEach(
        (item: {
          categoryId: any;
          quota: any;
          category: { [x: string]: boolean };
        }) => {
          if (item?.categoryId === node?.item?.id) {
            if (!item.quota) {
              item.quota = undefined;
            }

            item.category["isActiveNode"] = true;
          } else {
            item.category["isActiveNode"] = false;
          }
        }
      );
      setValidtext(null);
      handleUpdateNewModel(newModel);
    },
    [handleUpdateNewModel, model]
  );

  const handleChangeQuota = React.useCallback((event) => {
    setCurrent(event);
  }, []);

  const convertTreeToList = React.useCallback((root) => {
    var stack = [],
      array = [];
    stack.push(root);

    while (stack.length !== 0) {
      var node: any = stack.pop();
      if (
        typeof node.children === undefined ||
        node.children === null ||
        node.children?.length === 0
      ) {
        array.push(node);
      } else {
        array.push(node);
        for (var i = node.children.length - 1; i >= 0; i--) {
          stack.push(node.children[i]);
        }
      }
    }

    return array;
  }, []);

  const findAllNode = React.useCallback(
    (root) => {
      var stack = [],
        array = [];
      stack.push(root);

      while (stack.length !== 0) {
        var node = stack.pop();

        for (
          var i = model?.purchaseRequestPlanContents?.length - 1;
          i >= 0;
          i--
        ) {
          if (
            typeof node?.item?.parentId !== "undefined" ||
            typeof node?.category?.parentId !== "undefined"
          ) {
            if (
              node?.item?.parentId ===
                model?.purchaseRequestPlanContents[i]?.categoryId ||
              node?.category?.parentId ===
                model?.purchaseRequestPlanContents[i]?.categoryId
            ) {
              array.push(model?.purchaseRequestPlanContents[i]);
              if (
                typeof model?.purchaseRequestPlanContents[i]?.categoryId !==
                "undefined"
              ) {
                stack.push(model?.purchaseRequestPlanContents[i]);
              }
            }
          }
        }
      }

      return array;
    },
    [model]
  );

  const handleSaveQuota = React.useCallback(
    (node) => (event: any) => {
      const listChil = convertTreeToList(node);
      const listParent = findAllNode(node);
      if (event && typeof event === "number") {
        setCurrent(null);
        const newModel = { ...model };

        newModel?.purchaseRequestPlanContents.forEach((item: any) => {
          listChil.forEach((currentNode) => {
            if (
              currentNode?.item?.id === item?.parentCategoryId ||
              currentNode?.item?.parentId === item?.categoryId
            ) {
              if (event) {
                item.hasEntered = true;
              }
            }
          });
          listParent.forEach((currentNode) => {
            if (event) {
              currentNode.hasEntered = true;
            }
          });
          if (item?.categoryId === node?.item?.id) {
            if (event) {
              item.quota = event;
              item.category["isActiveNode"] = false;
              item.hasEntered = true;
            } else {
              setValidtext("Bạn chưa nhập hạn mức");
            }
          }
        });

        handleUpdateNewModel(newModel);
      } else {
        const newModel = { ...model };
        newModel?.purchaseRequestPlanContents.forEach((item: any) => {
          listChil.forEach((currentNode) => {
            if (
              currentNode?.item?.id === item?.parentCategoryId ||
              currentNode?.item?.parentId === item?.categoryId
            ) {
              if (current) {
                item.hasEntered = true;
              }
            }
          });
          listParent.forEach((currentNode) => {
            if (current) {
              currentNode.hasEntered = true;
            }
          });
          if (item?.categoryId === node?.item?.id) {
            if (current) {
              item.quota = current;
              item.category["isActiveNode"] = false;
              item.hasEntered = true;
            } else {
              setValidtext("Bạn chưa nhập hạn mức");
            }
          }
        });

        handleUpdateNewModel(newModel);
      }
    },
    [convertTreeToList, current, findAllNode, handleUpdateNewModel, model]
  );

  const handleDeleteInput = React.useCallback(
    (node) => () => {
      const newModel = { ...model };
      const listChil = convertTreeToList(node);
      const listParent = findAllNode(node);
      newModel?.purchaseRequestPlanContents.forEach((item: any) => {
        listChil.forEach((currentNode) => {
          if (
            currentNode?.item?.id === item?.parentCategoryId ||
            currentNode?.item?.parentId === item?.categoryId
          ) {
            item.hasEntered = false;
            item.quota = 0;
          }
        });
        listParent.forEach((currentNode) => {
          currentNode.hasEntered = false;
          currentNode.quota = 0;
        });
        if (item?.categoryId === node?.item?.id) {
          item.quota = 0;
          item.category["isActiveNode"] = false;
          item.hasEntered = false;
          setCurrent(null);
        }
      });

      handleUpdateNewModel(newModel);
    },
    [convertTreeToList, findAllNode, handleUpdateNewModel, model]
  );

  return (
    <li key={node?.id}>
      <div
        className={classNames("tree-node", {
          "has-border": isBorder,
        })}
        style={{ paddingLeft: "26px" }}
        // onMouseEnter={onMouseEnter(node)}
      >
        <div className="tree-node__icon-dropdown">
          <i
            role="button"
            onClick={handleToggle}
            className={classNames("mr-2 node-toggler", {
              show: hasChildren,
              "tio-chevron_right": !isExpanded && hasChildren,
              "tio-chevron_down": isExpanded && hasChildren,
            })}
          />
        </div>
        {render(node)}

        {!editMode && (
          <div className="tree-node__btn" key={node?.id}>
            <Button
              className={classNames("tl-btn", {
                "tl-btn--active": node?.item?.statusId,
                "tl-btn--deactive": !node?.item?.statusId,
              })}
            >
              {node?.item?.status?.name}
            </Button>
          </div>
        )}

        {!editMode && (
          <div className="tree-node__icon-toggle">
            <Dropdown overlay={menuCRUD}>
              <a
                href="/"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <i
                  className="tio-more_horizontal"
                  style={{ color: "#000000" }}
                ></i>
              </a>
            </Dropdown>
          </div>
        )}
        {editMode && (
          <div className="d-flex align-items-center tree-node__edit">
            <div className="d-flex align-items-center">
              <div
                className={classNames("btn__edit-display mr-3", {
                  "btn__edit-none":
                    node?.item?.isActiveNode === true ||
                    (node?.hasEntered === true &&
                      (node.quota === null || node.quota === 0)),
                })}
              >
                <div className="d-flex btn__edit-actions">
                  <button
                    className="btn btn__edit"
                    onClick={handleShowInput(node)}
                  >
                    <span>{translate("Sửa")}</span>
                  </button>
                  {node?.quota !== null && node?.quota !== 0 && (
                    <button
                      className="btn btn__delete ml-2"
                      onClick={handleDeleteInput(node)}
                    >
                      <span>{translate("Xóa")}</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="tree-node__quota">
                <div
                  className={classNames(" mr-3", {
                    "tree-node__edit-quota": node?.item?.isActiveNode === true,
                    "tree-node__edit-quota-none":
                      node?.item?.isActiveNode === false ||
                      !node?.item?.isActiveNode,
                  })}
                >
                  <div className="tree-node__edit-quota-action">
                    <FormItem message={validText}>
                      <InputNumber
                        value={node?.quota}
                        placeHolder={placeHolder}
                        onChange={handleChangeQuota}
                        onEnter={handleSaveQuota(node)}
                        numberType={DECIMAL}
                      />
                    </FormItem>
                    <div
                      className="btn__save-quota ml-3 mr-3"
                      onClick={handleSaveQuota(node)}
                    >
                      <i className="tio-checkmark_circle_outlined" />
                    </div>
                    <div
                      className="btn__cancel-quota"
                      onClick={handleDeleteInput(node)}
                    >
                      <i className="tio-clear_circle_outlined" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!node.hasEntered &&
              (node.quota === null ||
                node.quota === 0 ||
                node.quota === undefined) && (
                <div className="tree-node__edit-status">
                  <div className="status-number mr-3">
                    {translate("Chưa nhập")}
                  </div>
                </div>
              )}
            {node.hasEntered === true &&
              node.quota !== null &&
              node.quota !== 0 && (
                <div className="tree-node__edit-status">
                  <div className="tree-node__edit-status-number mr-3">
                    {formatNumber(node.quota)}
                  </div>
                </div>
              )}
            {node.hasEntered === true &&
              (node.quota === null || node.quota === 0) && (
                <div className="tree-node__edit-status">
                  <div className="tree-node__edit-status-number mr-3">
                    {translate("Đã nhập")}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
      {/* <ul> */}
      {hasChildren && (
        <>
          {isExpanded && <></>}
          <ul style={{ marginLeft: `${110}px` }}>
            <TreeList
              {...props}
              key={node.id}
              tree={node.children}
              className={classNames("sub-tree", {
                expanded: isExpanded,
              })}
              parent={node}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
              onPreview={onPreview}
              nodeLevel={nodeLevel + 1}
              nodePadding={nodePadding}
              isBorder={isBorder}
              editMode={editMode}
              model={model}
              handleUpdateNewModel={handleUpdateNewModel}
            />
          </ul>
        </>
      )}
      {/* </ul> */}
    </li>
  );
}

TreeNode.defaultProps = {
  nodeLevel: 0,
  nodePadding: 12,
  render<T extends Model>(node: T) {
    return (
      <>
        <div
          className="tree-node__info d-flex align-items-center "
          key={node?.id}
        >
          <div className="tree-node__info-img">
            {node?.item?.image?.url && (
              <img src={node?.item?.image?.url} alt="" />
            )}
            {!node?.item?.image?.url && <img src={"#"} alt="" />}
          </div>

          <div
            className="tree-node__text"
            //   style={{ width: `calc(878px - ${node.item.level * 133}px )` }}
          >
            <div className="tree-node__text-top">{node.title}</div>
            <div className="tree-node__text-bottom">{node.item.code}</div>
          </div>
        </div>
      </>
    );
  },
};

export default TreeNode;
