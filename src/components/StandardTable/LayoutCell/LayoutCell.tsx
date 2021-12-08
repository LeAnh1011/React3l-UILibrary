import classNames from "classnames";
import React, { ReactNode } from "react";
import "./LayoutCell.scss";

export interface LayoutCellProps {
  className?: string;
  orderType?: "left" | "right" | "center";
  children: ReactNode;
}

function LayoutCell(props: LayoutCellProps) {
  const { className, orderType, children } = props;
  return (
    <div className={classNames(className, `form-data-cell-${orderType}`)}>
      {children}
    </div>
  );
}
LayoutCell.defaultProps = {
  orderType: "center",
};
export default LayoutCell;
