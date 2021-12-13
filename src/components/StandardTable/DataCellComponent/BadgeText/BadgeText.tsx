import classNames from "classnames";
import React from "react";
import "./BadgeText.scss";

export interface BadgeTextProps {
  className?: string;
  value?: string;
  backgroundColor?: string;
  color?: string;
  tableSize?: "large" | "medium" | "small";
}

function BadgeText(props: BadgeTextProps) {
  const { className, color, value, backgroundColor, tableSize } = props;
  return (
    <div
      className={classNames(
        `badge-text-table-size-${tableSize}`,
        "text-in-table-cell"
      )}
    >
      <span
        className={classNames(className, "badge-text")}
        style={{ backgroundColor: backgroundColor, color: color }}
      >
        {value}
      </span>
    </div>
  );
}
BadgeText.defaultProps = {
  avatar: null,
  icon: null,
};
export default BadgeText;
