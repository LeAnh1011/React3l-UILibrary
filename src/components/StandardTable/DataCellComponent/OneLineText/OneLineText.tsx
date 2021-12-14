import classNames from "classnames";
import React, { ReactNode } from "react";
import "./OneLineText.scss";

export interface OneLineTextProps {
  className?: string;
  avatar?: string;
  icon?: string;
  value?: string | number | ReactNode;
  tableSize?: "large" | "medium" | "small";
}

function OneLineText(props: OneLineTextProps) {
  const { className, avatar, value, icon, tableSize } = props;
  return (
    <>
      {avatar && (
        <div
          className={classNames(
            className,
            `one-line-image-text-table-size-${tableSize}`,
            "text-in-table-cell"
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
          {value}
        </div>
      )}
      {!avatar && (
        <div
          className={classNames(
            className,
            `one-line-text-table-size-${tableSize}`,
            "text-in-table-cell"
          )}
        >
          {icon && <i className={classNames(icon, `icon-one-line-text`)}></i>}
          {value}
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
