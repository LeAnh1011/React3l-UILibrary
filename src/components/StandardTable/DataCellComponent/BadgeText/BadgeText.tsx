import classNames from "classnames";
import React from "react";
import "./BadgeText.scss";

export interface BadgeTextProps {
  className?: string;
  name?: string;
  backgroundColor?: string;
  color?: string;
}

function BadgeText(props: BadgeTextProps) {
  const { className, color, name, backgroundColor } = props;
  return (
    <span
      className={classNames(className, "badge-text")}
      style={{ backgroundColor: backgroundColor, color: color }}
    >
      {name}
    </span>
  );
}
BadgeText.defaultProps = {
  avatar: null,
  icon: null,
};
export default BadgeText;
