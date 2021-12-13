import classNames from "classnames";
import React, { ReactNode } from "react";
import "./TwoLineText.scss";

export interface TwoLineTextProps {
  className?: string;
  avatar?: string;
  icon?: string;
  valueLine1?: string | number | ReactNode;
  valueLine2?: string | number | ReactNode;
  classNameFirstLine?: string;
  classNameSecondLine?: string;
  tableSize?: "large" | "medium" | "small";
}

function TwoLineText(props: TwoLineTextProps) {
  const {
    className,
    avatar,
    valueLine1,
    icon,
    valueLine2,
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
              {valueLine1}
            </div>
            <div
              className={classNames(
                classNameSecondLine,
                "line-text second-line",
                icon ? "m-l--lg" : ""
              )}
            >
              {valueLine2}
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
