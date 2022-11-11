import React, { ReactNode, Dispatch, SetStateAction } from "react";
import "./ActionBarComponent.scss";
import classNames from "classnames";
import { Key } from "antd/lib/table/interface";
import Button from "@Components/Button";

export interface ActionBarComponentProps {
  name?: string;
  children?: ReactNode;
  selectedRowKeys?: Key[];
  setSelectedRowKeys?: Dispatch<SetStateAction<Key[]>>;
  handleCancelAction?: () => void;
  rowSelections?: any;
  translateSelected?: string;
  translateLine?: string;
  translateTitleCancelButton?: string;
}

function ActionBarComponent(props: ActionBarComponentProps) {
  const {
    children,
    selectedRowKeys,
    handleCancelAction,
    setSelectedRowKeys,
    translateSelected,
    translateLine,
    translateTitleCancelButton,
  } = props;

  const handleCancel = React.useCallback(() => {
    if (typeof handleCancelAction !== "undefined") {
      handleCancelAction();
    } else {
      setSelectedRowKeys([]);
    }
  }, [setSelectedRowKeys, handleCancelAction]);

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
        {translateSelected} {selectedRowKeys?.length} {translateLine}
      </div>
      {selectedRowKeys?.length > 0 && (
        <div className="action-button">
          {children}
          <div></div>
          <Button
            type="ghost-primary"
            className="btn--lg"
            onClick={handleCancel}
          >
            {translateTitleCancelButton}
          </Button>
        </div>
      )}
    </div>
  );
}

ActionBarComponent.defaultProps = {
  selectedRowKeys: [],
  translateSelected: "Đã chọn",
  translateLine: "dòng",
  translateTitleCancelButton: "Cancel",
};

export default ActionBarComponent;
