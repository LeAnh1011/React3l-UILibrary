import classNames from "classnames";
import React, { ReactNode } from "react";
import "./LayoutCell.scss";

export interface LayoutCellProps {
  className?: string;
  orderType?: "left" | "right" | "center";
  children: ReactNode;
  tableSize?: "large" | "medium" | "small";
}

function LayoutCell(props: LayoutCellProps) {
  const { className, orderType, children, tableSize } = props;
  return (
    <div
      className={classNames(
        className,
        `form-data-cell-${orderType}`,
        `layout-cell-size-${tableSize}`
      )}
    >
      {children}
    </div>
  );
}
LayoutCell.defaultProps = {
  orderType: "left",
};
export default LayoutCell;
