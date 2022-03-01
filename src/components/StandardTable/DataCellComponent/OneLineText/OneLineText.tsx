import classNames from "classnames";
import React from "react";
import "./OneLineText.scss";
import { Tooltip } from "antd";
import { CommonService } from "services/common-service";

export interface OneLineTextProps {
  className?: string;
  avatar?: string;
  avatarType?: "circle" | "square";
  icon?: string;
  value?: string;
  avatarSize?: "large" | "medium" | "small";
  link?: string;
  maxLength?: number;
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
    maxLength,
  } = props;
  return (
    <>
      {avatar && (
        <div className={classNames(className, "text-in-table-cell")}>
          {avatar && avatarSize !== "small" && (
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
              {maxLength && value?.length > maxLength ? (
                <Tooltip title={value}>
                  {CommonService.limitWord(value, maxLength)}
                </Tooltip>
              ) : (
                value
              )}
            </a>
          ) : (
            <span>
              {maxLength && value?.length > maxLength ? (
                <Tooltip title={value}>
                  {CommonService.limitWord(value, maxLength)}
                </Tooltip>
              ) : (
                value
              )}
            </span>
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
              {maxLength && value?.length > maxLength ? (
                <Tooltip title={value}>
                  {CommonService.limitWord(value, maxLength)}
                </Tooltip>
              ) : (
                value
              )}
            </a>
          ) : (
            <span>
              {maxLength && value?.length > maxLength ? (
                <Tooltip title={value}>
                  {CommonService.limitWord(value, maxLength)}
                </Tooltip>
              ) : (
                value
              )}
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
  tableSize: "large",
  avatarType: "circle",
};
export default OneLineText;
