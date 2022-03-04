import { DotMark16 } from "@carbon/icons-react";
import classNames from "classnames";
import React from "react";
import "./StatusLine.scss";
import { Tooltip } from "antd";
import { CommonService } from "services/common-service";

export interface StatusLineProps {
  className?: string;
  active?: boolean;
  value?: string;
  maxLength?: number;
}

function StatusLine(props: StatusLineProps) {
  const { className, active, value, maxLength } = props;
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
        {maxLength && value?.length > maxLength ? (
          <Tooltip title={value}>
            {CommonService.limitWord(value, maxLength)}
          </Tooltip>
        ) : (
          value
        )}
      </div>
    </>
  );
}
StatusLine.defaultProps = {
  active: false,
};
export default StatusLine;
