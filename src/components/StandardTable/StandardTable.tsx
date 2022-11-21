import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import { Table } from "antd";
import "antd/dist/antd.css";
import type { TableProps } from "antd/lib/table";
import classNames from "classnames";
import React from "react";
import "./StandardTable.scss";
export interface StandardTableCustomProps extends TableProps<any> {
  idContainer?: string;
  isDragable?: boolean;
  className?: string;
  tableSize?: "lg" | "md" | "sm";
  spinning?: boolean;
}
function StandardTable(props: StandardTableCustomProps) {
  const {
    className,
    tableSize,
    isDragable,
    expandable,
    spinning,
    idContainer,
  } = props;

  React.useEffect(() => {
    var antTableDOM: any;
    if (idContainer) {
      const containerDOM = document.getElementById(idContainer);
      antTableDOM =
        containerDOM.getElementsByClassName("ant-table-content") ||
        containerDOM.getElementsByClassName("ant-table-body");
    } else {
      antTableDOM =
        document.getElementsByClassName("ant-table-content") ||
        document.getElementsByClassName("ant-table-body");
    }
    const tableDOM = antTableDOM[0];
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    if (isDragable && tableDOM) {
      const handleMouseDown = (e: any) => {
        isDown = true;
        tableDOM.classList.add("active-draggable");
        startX = e.pageX - tableDOM.offsetLeft;
        scrollLeft = tableDOM.scrollLeft;
      };

      const handleMouseLeave = () => {
        isDown = false;
        tableDOM.classList.remove("active-draggable");
      };

      const handleMouseUp = () => {
        isDown = false;
        tableDOM.classList.remove("active-draggable");
      };

      const handleMouseMove = (e: any) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - tableDOM.offsetLeft;
        const walk = (x - startX) * 3;
        tableDOM.scrollLeft = scrollLeft - walk;
      };

      tableDOM.addEventListener("mousedown", handleMouseDown);

      tableDOM.addEventListener("mouseleave", handleMouseLeave);

      tableDOM.addEventListener("mouseup", handleMouseUp);

      tableDOM.addEventListener("mousemove", handleMouseMove);

      return () => {
        tableDOM.removeEventListener("mousedown", handleMouseDown);
        tableDOM.removeEventListener("mouseleave", handleMouseLeave);
        tableDOM.removeEventListener("mouseup", handleMouseUp);
        tableDOM.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [idContainer, isDragable]);

  return (
    <>
      <div className={classNames("page-table")} id={idContainer}>
        <Table
          loading={{
            indicator: (
              <LoadingOutlined
                style={{
                  fontSize: 32,
                  color: "#0F62FE",
                }}
                spin
              />
            ),
            spinning: spinning,
          }}
          className={classNames(
            className,
            `table-size-${tableSize}`,
            "custom-scrollbar",
            { "big-checkbox-col": !expandable }
          )}
          {...props}
        />
      </div>
    </>
  );
}
StandardTable.defaultProps = {
  spinning: false,
  isExpandable: false,
  tableSize: "lg",
  isLevel2: false,
  pagination: false,
};
export default StandardTable;
