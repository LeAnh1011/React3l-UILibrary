import React from "react";
import "./StandardTable.scss";
import "antd/dist/antd.css";
import { Table } from "antd";
import { Model } from "react3l-common/src/Model";
import { TFunction } from "i18next";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
// import classNames from "classnames";
// import nameof from "ts-nameof.macro";
import { ColumnProps } from "antd/lib/table";
import { UseMaster } from "./interfaceTable";
import { ExpandedRowRender } from "rc-table/lib/interface";

export interface StandardTableCustomProps extends UseMaster {
  size?: "lg" | "md" | "sm";
  columns?: ColumnProps<Model>[];
  isDragable?: boolean;
  isShowTitle?: boolean;
  translate?: TFunction;
  expandedRowRend?: ExpandedRowRender<Model>;
}

function StandardTable(props: StandardTableCustomProps) {
  const {
    list,
    columns,
    expandedRowRend,
    // size,
  } = props;

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Model[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: Model) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{
        expandedRowRender: expandedRowRend,
        expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
            <DownOutlined
              className="icon-table-expand"
              onClick={(e) => onExpand(record, e)}
            />
          ) : (
            <RightOutlined
              className="icon-table-expand"
              onClick={(e) => onExpand(record, e)}
            />
          ),
      }}
      dataSource={list}
      rowSelection={rowSelection}
    />
  );
}
export default StandardTable;
