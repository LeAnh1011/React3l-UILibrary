import classNames from "classnames";
import React from "react";
import "./StatusLine.scss";

export interface StatusLineProps {
  className?: string;
  active?: boolean;
  value?: string;
  tableSize?: "large" | "medium" | "small";
}

function StatusLine(props: StatusLineProps) {
  const { className, active, value, tableSize } = props;
  return (
    <>
      <div
        className={classNames(
          className,
          `status-line-table-size-${tableSize}`,
          "text-in-table-cell"
        )}
      >
        <i
          className={classNames(
            "tio-record",
            active ? "status-active" : "status-inactive"
          )}
        ></i>
        {value}
      </div>
    </>
  );
}
StatusLine.defaultProps = {
  active: false,
  tableSize: "large",
};
export default StatusLine;
