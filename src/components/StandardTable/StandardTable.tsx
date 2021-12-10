import React from "react";
import "./StandardTable.scss";
import "antd/dist/antd.css";
import { Table } from "antd";
import { Model } from "react3l-common/src/Model";
import { TFunction } from "i18next";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import classNames from "classnames";
// import nameof from "ts-nameof.macro";
import { ColumnProps } from "antd/lib/table";
import { UseMaster } from "./interfaceTable";
import Pagination from "./Pagination/Pagination";
import { ExpandedRowRender } from "rc-table/lib/interface";
import { ModelFilter } from "react3l-common";
import { StringFilter } from "react3l-advanced-filters";
import arrowUp from "../../assets/image/arrow-up.png";
import arrowDown from "../../assets/image/arrow-down.png";
export interface StandardTableCustomProps extends UseMaster {
  columns?: ColumnProps<Model>[];
  isDragable?: boolean;
  isShowTitle?: boolean;
  translate?: TFunction;
  isExpandAble?: boolean;
  expandedRowRend?: ExpandedRowRender<Model>;
  className?: string;
  sizeTable?: "large" | "medium" | "small";
}

export class DemoFilter extends ModelFilter {
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

function StandardTable(props: StandardTableCustomProps) {
  const {
    list,
    columns,
    expandedRowRend,
    isExpandAble,
    className,
    sizeTable,
    isDragable,
  } = props;

  React.useEffect(() => {
    const antTable = document.getElementsByClassName(
      "ant-table-body"
    )[0] as HTMLElement;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    if (isDragable) {
      const handleMouseDown = (e: any) => {
        isDown = true;
        antTable.classList.add("active-draggable");
        startX = e.pageX - antTable.offsetLeft;
        scrollLeft = antTable.scrollLeft;
      };

      const handleMouseLeave = () => {
        isDown = false;
        antTable.classList.remove("active-draggable");
      };

      const handleMouseUp = () => {
        isDown = false;
        antTable.classList.remove("active-draggable");
      };

      const handleMouseMove = (e: any) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - antTable.offsetLeft;
        const walk = (x - startX) * 3;
        antTable.scrollLeft = scrollLeft - walk;
      };

      antTable.addEventListener("mousedown", handleMouseDown);

      antTable.addEventListener("mouseleave", handleMouseLeave);

      antTable.addEventListener("mouseup", handleMouseUp);

      antTable.addEventListener("mousemove", handleMouseMove);

      return () => {
        antTable.removeEventListener("mousedown", handleMouseDown);
        antTable.removeEventListener("mouseleave", handleMouseLeave);
        antTable.removeEventListener("mouseup", handleMouseUp);
        antTable.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isDragable]);

  const [filter, setFilter] = React.useState<DemoFilter>(new DemoFilter());

  const handlePagination = React.useCallback(
    (skip: number, take: number) => {
      setFilter({ ...filter, skip, take });
      // if (typeof handleSearch === "function") {
      //   handleSearch();
      // }
      console.log(filter);
    },
    [filter, setFilter]
  );

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
    <>
      <div className="page__master-table">
        <Table
          className={classNames(
            className,
            `table-size-${sizeTable}`,
            "custom-scrollbar"
          )}
          columns={columns}
          pagination={false}
          scroll={{ y: 500 }}
          expandable={
            isExpandAble
              ? {
                  expandedRowRender: expandedRowRend,
                  expandIcon: ({ expanded, onExpand, record }) =>
                    expanded ? (
                      <img
                        src={arrowUp}
                        alt="up"
                        className="icon-table-expand"
                        onClick={(e) => onExpand(record, e)}
                      />
                    ) : (
                      <img
                        src={arrowDown}
                        alt="down"
                        className="icon-table-expand"
                        onClick={(e) => onExpand(record, e)}
                      />
                    ),
                }
              : null
          }
          dataSource={list}
          rowSelection={rowSelection}
        />
      </div>
      <div className="flex-shrink-1 d-flex align-items-center">
        <Pagination
          skip={filter.skip}
          take={filter.take}
          total={100}
          onChange={handlePagination}
          style={{ margin: "10px" }}
        />
      </div>
    </>
  );
}
StandardTable.defaultProps = {
  isExpandAble: false,
  sizeTable: "large",
};
export default StandardTable;
