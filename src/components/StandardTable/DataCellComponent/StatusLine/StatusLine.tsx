import classNames from "classnames";
import React from "react";
import "./StatusLine.scss";

export interface StatusLineProps {
  className?: string;
  active?: boolean;
  name?: string;
}

function StatusLine(props: StatusLineProps) {
  const { className, active, name } = props;
  return (
    <>
      <div className={className}>
        <i
          className={classNames(
            "tio-record",
            active ? "status-active" : "status-inactive"
          )}
        ></i>{" "}
        {name}
      </div>
    </>
  );
}
StatusLine.defaultProps = {
  active: false,
};
export default StatusLine;
