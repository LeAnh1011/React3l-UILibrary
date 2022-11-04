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
    var antTable: any;
    if (idContainer) {
      const containerDOM = document.getElementById(idContainer);
      antTable = containerDOM.getElementsByClassName(
        "ant-table-content"
      )[0] as HTMLElement;
    }
    antTable = document.getElementsByClassName(
      "ant-table-content"
    )[0] as HTMLElement;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    if (isDragable && antTable) {
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
