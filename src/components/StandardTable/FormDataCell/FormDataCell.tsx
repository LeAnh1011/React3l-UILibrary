import classNames from "classnames";
import React, { ReactNode } from "react";
import "./FormDataCell.scss";

export interface FormDataCellProps {
  className?: string;
  orderPaddingType?: "left" | "right" | "center";
  children?: ReactNode;
}

function FormDataCell(props: FormDataCellProps) {
  const { className, orderPaddingType, children } = props;
  return (
    <div
      className={classNames(className, `form-data-cell-${orderPaddingType}`)}
    >
      {children}
    </div>
  );
}
FormDataCell.defaultProps = {
  orderPaddingType: "center",
};
export default FormDataCell;
