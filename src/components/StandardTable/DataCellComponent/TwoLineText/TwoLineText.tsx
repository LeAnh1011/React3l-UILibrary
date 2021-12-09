import classNames from "classnames";
import React from "react";
import "./TwoLineText.scss";

export interface TwoLineTextProps {
  className?: string;
  avatar?: string;
  icon?: string;
  nameLine1?: string;
  nameLine2?: string;
  classNameFirstLine?: string;
  classNameSecondLine?: string;
  tableSize?: "large" | "medium" | "small";
}

function TwoLineText(props: TwoLineTextProps) {
  const {
    className,
    avatar,
    nameLine1,
    icon,
    nameLine2,
    classNameFirstLine,
    classNameSecondLine,
    tableSize,
  } = props;
  return (
    <>
      {tableSize === "large" && (
        <div className="cell-two-line">
          {avatar && (
            <div className="m-r--xxs">
              {avatar && (
                <img
                  src={avatar}
                  className="avatar-two-line-text"
                  alt="avatar"
                />
              )}
            </div>
          )}
          <div className={className}>
            <div
              className={classNames(classNameFirstLine, "line-text first-line")}
            >
              {icon && (
                <i
                  className={classNames(icon, `icon-two-line-text m-r--xxs`)}
                ></i>
              )}
              {nameLine1}
            </div>
            <div
              className={classNames(
                classNameSecondLine,
                "line-text second-line",
                icon ? "m-l--lg" : ""
              )}
            >
              {nameLine2}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
TwoLineText.defaultProps = {
  avatar: null,
  icon: null,
  tableSize: "Large",
};
export default TwoLineText;
