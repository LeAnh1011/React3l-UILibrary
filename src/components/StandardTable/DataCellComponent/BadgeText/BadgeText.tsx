import { Tooltip } from "antd";
import classNames from "classnames";
import React from "react";
import "./BadgeText.scss";

export interface BadgeTextProps {
  className?: string;
  value?: string;
  backgroundColor?: string;
  color?: string;
}

function BadgeText(props: BadgeTextProps) {
  const { className, color, value, backgroundColor } = props;
  return (
    <div className={classNames("text-in-table-cell")}>
      <div
        className={classNames(className, "badge-text")}
        style={{ backgroundColor: backgroundColor, color: color }}
      >
        <Tooltip title={value}>{value}</Tooltip>
      </div>
    </div>
  );
}
BadgeText.defaultProps = {
  avatar: null,
  icon: null,
};
export default BadgeText;
