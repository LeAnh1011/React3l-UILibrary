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
}

function ActionBarComponent(props: ActionBarComponentProps) {
  const { children, selectedRowKeys, setSelectedRowKeys } = props;

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
        Đã chọn {selectedRowKeys?.length} dòng
      </div>
      {selectedRowKeys?.length > 0 && (
        <div className="action-button">
          {children}
          <div className="button-cancel" onClick={handleCancel}>
            Cancel
          </div>
        </div>
      )}
    </div>
  );
}

ActionBarComponent.defaultProps = {
  selectedRowKeys: [],
};

export default ActionBarComponent;
