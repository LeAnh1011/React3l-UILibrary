import classNames from "classnames";
import React, { ReactNode } from "react";
import "./TwoLineText.scss";

export interface TwoLineTextProps {
  className?: string;
  avatar?: string;
  avatarType?: "circle" | "square";
  icon?: string;
  valueLine1?: string | number | ReactNode;
  valueLine2?: string | number | ReactNode;
  classNameFirstLine?: string;
  classNameSecondLine?: string;
  link?: string;
}

function TwoLineText(props: TwoLineTextProps) {
  const {
    className,
    avatar,
    avatarType,
    valueLine1,
    icon,
    valueLine2,
    classNameFirstLine,
    classNameSecondLine,
    link,
  } = props;
  return (
    <>
      <div className="cell-two-line">
        {avatar && (
          <div className="m-r--xxs">
            {avatar && (
              <img
                src={avatar}
                className={classNames(
                  `avatar-two-line-text`,
                  `avatar-type-${avatarType}`
                )}
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
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="link-text"
              >
                {valueLine2}
              </a>
            ) : (
              valueLine2
            )}
          </div>
        </div>
      </div>
    </>
  );
}
TwoLineText.defaultProps = {
  avatar: null,
  icon: null,
  tableSize: "Large",
  avatarType: "circle",
};
export default TwoLineText;
