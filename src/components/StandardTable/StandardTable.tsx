import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import { Table } from "antd";
import type { TableProps } from "antd/lib/table";
import classNames from "classnames";
import React from "react";
import "./StandardTable.scss";

export interface StandardTableCustomProps extends TableProps<any> {
  /**Option pass id of table */
  idContainer?: string;
  /**Table is draggable */
  isDragable?: boolean;
  /**Used to change style table */
  className?: string;
  /**Control the row height of the table */
  tableSize?: "lg" | "md" | "sm";
  /**Control the spinning of the table */
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
        containerDOM.getElementsByClassName("ant-table-content")[0] ||
        containerDOM.getElementsByClassName("ant-table-body")[0];
    } else {
      antTableDOM =
        document.getElementsByClassName("ant-table-content")[0] ||
        document.getElementsByClassName("ant-table-body")[0];
    }
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    if (isDragable && antTableDOM) {
      const handleMouseDown = (e: any) => {
        isDown = true;
        antTableDOM.classList.add("active-draggable");
        startX = e.pageX - antTableDOM.offsetLeft;
        scrollLeft = antTableDOM.scrollLeft;
      };

      const handleMouseLeave = () => {
        isDown = false;
        antTableDOM.classList.remove("active-draggable");
      };

      const handleMouseUp = () => {
        isDown = false;
        antTableDOM.classList.remove("active-draggable");
      };

      const handleMouseMove = (e: any) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - antTableDOM.offsetLeft;
        const walk = (x - startX) * 3;
        antTableDOM.scrollLeft = scrollLeft - walk;
      };

      antTableDOM.addEventListener("mousedown", handleMouseDown);

      antTableDOM.addEventListener("mouseleave", handleMouseLeave);

      antTableDOM.addEventListener("mouseup", handleMouseUp);

      antTableDOM.addEventListener("mousemove", handleMouseMove);

      return () => {
        antTableDOM.removeEventListener("mousedown", handleMouseDown);
        antTableDOM.removeEventListener("mouseleave", handleMouseLeave);
        antTableDOM.removeEventListener("mouseup", handleMouseUp);
        antTableDOM.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [idContainer, isDragable]);

  return (
    <>
      <div className={classNames("page-table")} id={idContainer}>
        <Table
          {...props}
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
            `table-size-${tableSize}`,
            "custom-scrollbar",
            { "big-checkbox-col": !expandable },
            className
          )}
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
