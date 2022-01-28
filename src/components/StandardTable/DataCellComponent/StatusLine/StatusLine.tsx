import { DotMark16 } from "@carbon/icons-react";
import classNames from "classnames";
import React from "react";
import "./StatusLine.scss";

export interface StatusLineProps {
  className?: string;
  active?: boolean;
  value?: string;
}

function StatusLine(props: StatusLineProps) {
  const { className, active, value } = props;
  return (
    <>
      <div
        className={classNames(
          className,
          "text-in-table-cell",
          "status-line-data"
        )}
      >
        <DotMark16 className={active ? "status-active" : "status-inactive"} />
        {value}
      </div>
    </>
  );
}
StatusLine.defaultProps = {
  active: false,
};
export default StatusLine;
