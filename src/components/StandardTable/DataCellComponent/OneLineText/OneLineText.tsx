import classNames from "classnames";
import React from "react";
import "./OneLineText.scss";

export interface OneLineTextProps {
  className?: string;
  avatar?: string;
  icon?: string;
  name?: string;
  tableSize?: "large" | "medium" | "small";
}

function OneLineText(props: OneLineTextProps) {
  const { className, avatar, name, icon, tableSize } = props;
  return (
    <>
      {avatar && (
        <div
          className={classNames(
            className,
            `one-line-image-text-table-size-${tableSize}`
          )}
        >
          {avatar && tableSize !== "small" && (
            <img
              src={avatar}
              className={classNames(
                `avatar-one-line-text-table-size-${tableSize}`
              )}
              alt="avatar"
            />
          )}
          {icon && <i className={classNames(icon, `icon-one-line-text`)}></i>}
          {name}
        </div>
      )}
      {!avatar && (
        <div
          className={classNames(
            className,
            `one-line-text-table-size-${tableSize}`
          )}
        >
          {icon && <i className={classNames(icon, `icon-one-line-text`)}></i>}
          {name}
        </div>
      )}
    </>
  );
}
OneLineText.defaultProps = {
  avatar: null,
  icon: null,
  tableSize: "large",
};
export default OneLineText;
