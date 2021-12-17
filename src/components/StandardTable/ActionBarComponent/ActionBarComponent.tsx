import React, { ReactNode, Dispatch, SetStateAction } from "react";
import "./ActionBarComponent.scss";
import classNames from "classnames";
import { Key } from "antd/lib/table/interface";

export interface ActionBarComponentProps {
  name?: string;
  children?: ReactNode;
  selectedRowKeys?: Key[];
  setSelectedRowKeys?: Dispatch<SetStateAction<Key[]>>;
  rowSelections?: any;
  textSelect?: string;
  textLine?: string;
  textTitleCancelButton?: string;
}

function ActionBarComponent(props: ActionBarComponentProps) {
  const {
    children,
    selectedRowKeys,
    setSelectedRowKeys,
    textSelect,
    textLine,
    textTitleCancelButton,
  } = props;

  const handleCancel = React.useCallback(() => {
    setSelectedRowKeys([]);
  }, [setSelectedRowKeys]);

  return (
    <div
      className={classNames(
        "action-bar-container",
        selectedRowKeys?.length > 0
          ? "action-bar-active"
          : "action-bar-inactive"
      )}
    >
      <div className="item-selected-counter">
        {textSelect} {selectedRowKeys?.length} {textLine}
      </div>
      {selectedRowKeys?.length > 0 && (
        <div className="action-button">
          {children}
          <div className="button-cancel" onClick={handleCancel}>
            {textTitleCancelButton}
          </div>
        </div>
      )}
    </div>
  );
}

ActionBarComponent.defaultProps = {
  selectedRowKeys: [],
  textSelect: "Đã chọn",
  textLine: "dòng",
  textTitleCancelButton: "Cancel",
};

export default ActionBarComponent;
