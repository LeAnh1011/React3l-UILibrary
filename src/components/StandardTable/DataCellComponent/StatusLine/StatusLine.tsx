import { DotMark } from "@carbon/icons-react";
import { Tooltip } from "antd";
import classNames from "classnames";
import { CommonService } from "@Services/common-service";
import "./StatusLine.scss";

export interface StatusLineProps {
  /**Used to change style Component */
  className?: string;
  /** Boolean to display status of data */
  active?: boolean;
  /** Display value of status */
  value?: string;
  /** Count max length to display of value */
  countCharacters?: number;
  /** Color of status */
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
        <DotMark size={16} className="status" style={{ color: color }} />
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
