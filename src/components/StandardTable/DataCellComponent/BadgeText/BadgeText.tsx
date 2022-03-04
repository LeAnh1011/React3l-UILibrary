import classNames from "classnames";
import React from "react";
import "./BadgeText.scss";
import { Tooltip } from "antd";
import { CommonService } from "services/common-service";

export interface BadgeTextProps {
  className?: string;
  value?: string;
  backgroundColor?: string;
  color?: string;
  maxLength?: number;
}

function BadgeText(props: BadgeTextProps) {
  const { className, color, value, backgroundColor, maxLength } = props;
  return (
    <div className={classNames("text-in-table-cell")}>
      <span
        className={classNames(className, "badge-text")}
        style={{ backgroundColor: backgroundColor, color: color }}
      >
        {maxLength && value?.length > maxLength ? (
          <Tooltip title={value}>
            {CommonService.limitWord(value, maxLength)}
          </Tooltip>
        ) : (
          value
        )}
      </span>
    </div>
  );
}
BadgeText.defaultProps = {
  avatar: null,
  icon: null,
};
export default BadgeText;
