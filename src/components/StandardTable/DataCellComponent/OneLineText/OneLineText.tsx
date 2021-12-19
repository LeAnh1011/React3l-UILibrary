import classNames from "classnames";
import React, { ReactNode } from "react";
import "./OneLineText.scss";

export interface OneLineTextProps {
  className?: string;
  avatar?: string;
  avatarType?: "circle" | "square";
  icon?: string;
  value?: string | number | ReactNode;
  avatarSize?: "large" | "medium" | "small";
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
              {value}
            </a>
          ) : (
            value
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
              {value}
            </a>
          ) : (
            value
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
