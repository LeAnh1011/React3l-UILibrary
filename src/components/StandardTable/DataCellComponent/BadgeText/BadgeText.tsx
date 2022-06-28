import { Tooltip } from "antd";
import classNames from "classnames";
import React from "react";
import { CommonService } from "services/common-service";
import "./BadgeText.scss";

export interface BadgeTextProps {
  className?: string;
  value?: string;
  backgroundColor?: string;
  color?: string;
  countCharacters?: number;
}

function BadgeText(props: BadgeTextProps) {
  const { className, color, value, backgroundColor, countCharacters } = props;
  return (
    <div className={classNames("text-in-table-cell")}>
      <div
        className={classNames(className, "badge-text")}
        style={{ backgroundColor: backgroundColor, color: color }}
      >
        {countCharacters && countCharacters > 0 ? (
          <Tooltip title={value}>
            {CommonService.limitWord(value, countCharacters)}
          </Tooltip>
        ) : (
          <>{value}</>
        )}
      </div>
    </div>
  );
}
BadgeText.defaultProps = {
  avatar: null,
  icon: null,
};
export default BadgeText;
