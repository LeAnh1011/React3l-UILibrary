import classNames from "classnames";
import React from "react";
import "./OneLineText.scss";
import { Tooltip } from "antd";

export interface OneLineTextProps {
  className?: string;
  avatar?: string;
  avatarType?: "circle" | "square";
  icon?: string;
  value?: string;
  avatarSize?: "lg" | "md" | "sm";
  link?: string;
}

function OneLineText(props: OneLineTextProps) {
  const {
    className,
    avatar,
    value,
    icon,
    avatarSize,
    link,
    avatarType,
  } = props;
  return (
    <>
      {avatar && (
        <div className={classNames(className, "text-in-table-cell")}>
          {avatar && avatarSize !== "sm" && (
            <img
              src={avatar}
              className={classNames(
                `avatar-one-line-text-table-size-${avatarSize}`,
                `avatar-type-${avatarType}`
              )}
              alt="avatar"
            />
          )}
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-text"
            >
              <Tooltip title={value}>{value}</Tooltip>
            </a>
          ) : (
            <Tooltip title={value}>{value}</Tooltip>
          )}
        </div>
      )}
      {!avatar && (
        <div className={classNames(className, "text-in-table-cell")}>
          {icon && <i className={classNames(icon, `icon-one-line-text`)}></i>}
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-text"
            >
              <Tooltip title={value}>{value}</Tooltip>
            </a>
          ) : (
            <span>
              <Tooltip title={value}>{value}</Tooltip>
            </span>
          )}
        </div>
      )}
    </>
  );
}
OneLineText.defaultProps = {
  avatar: null,
  icon: null,
  tableSize: "lg",
  avatarType: "circle",
};
export default OneLineText;
