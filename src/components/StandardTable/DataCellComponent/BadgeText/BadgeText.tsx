import classNames from "classnames";
import React from "react";
import "./BadgeText.scss";

export interface BadgeTextProps {
  className?: string;
  name?: string;
  backgroundColor?: string;
  color?: string;
  tableSize?: "large" | "medium" | "small";
}

function BadgeText(props: BadgeTextProps) {
  const { className, color, name, backgroundColor, tableSize } = props;
  return (
    <div className={classNames(`badge-text-table-size-${tableSize}`)}>
      <span
        className={classNames(className, "badge-text")}
        style={{ backgroundColor: backgroundColor, color: color }}
      >
        {name}
      </span>
    </div>
  );
}
BadgeText.defaultProps = {
  avatar: null,
  icon: null,
};
export default BadgeText;
