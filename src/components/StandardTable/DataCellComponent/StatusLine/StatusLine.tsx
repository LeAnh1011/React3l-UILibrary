import { DotMark16 } from "@carbon/icons-react";
import { Tooltip } from "antd";
import classNames from "classnames";
import React from "react";
import { CommonService } from "services/common-service";
import "./StatusLine.scss";

export interface StatusLineProps {
  className?: string;
  active?: boolean;
  value?: string;
  countCharacters?: number;
  color?: string;
}

function StatusLine(props: StatusLineProps) {
  const { className, value, countCharacters, color } = props;
  return (
    <>
      <div
        className={classNames(
          className,
          "text-in-table-cell",
          "status-line-data"
        )}
      >
        <DotMark16 className="status" style={{color: color}}/>
        {countCharacters && countCharacters > 0 ? (
          <Tooltip title={value}>
            {CommonService.limitWord(value, countCharacters)}
          </Tooltip>
        ) : (
          <>{value}</>
        )}
      </div>
    </>
  );
}
StatusLine.defaultProps = {
  active: false,
};
export default StatusLine;
