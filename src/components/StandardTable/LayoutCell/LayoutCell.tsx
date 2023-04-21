import classNames from "classnames";
import type { ReactNode } from "react";
import "./LayoutCell.scss";

export interface LayoutCellProps {
  /**Used to change style Component */
  className?: string;
  /** Use to custom padding of each cell */
  orderType?: "left" | "right" | "center";
  /** Option to align display value */
  position?: "left" | "right" | "center";
  children: ReactNode;
  /**Pass table size */
  tableSize?: "lg" | "md" | "sm";
}

function LayoutCell(props: LayoutCellProps) {
  const { className, orderType, children, tableSize, position } = props;
  return (
    <div
      className={classNames(
        className,
        `form-data-cell-${orderType}`,
        `layout-cell-size-${tableSize}`,
        `layout-cell-position-${position}`
      )}
    >
      {children}
    </div>
  );
}
LayoutCell.defaultProps = {
  orderType: "left",
  tableSize: "lg",
  position: "left",
};
export default LayoutCell;
