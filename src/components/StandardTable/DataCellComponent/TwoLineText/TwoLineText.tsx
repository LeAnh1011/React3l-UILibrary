import classNames from "classnames";
import React from "react";
import "./TwoLineText.scss";
import { Tooltip } from "antd";
import { CommonService } from "services/common-service";

export interface TwoLineTextProps {
  className?: string;
  avatar?: string;
  avatarType?: "circle" | "square";
  icon?: string;
  valueLine1?: string;
  valueLine2?: string;
  classNameFirstLine?: string;
  classNameSecondLine?: string;
  link?: string;
  maxLength?: number;
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
    maxLength,
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
            {maxLength && valueLine1?.length > maxLength ? (
              <Tooltip title={valueLine1}>
                {CommonService.limitWord(valueLine1, maxLength)}
              </Tooltip>
            ) : (
              valueLine1
            )}
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
                {maxLength && valueLine2?.length > maxLength ? (
                  <Tooltip title={valueLine2}>
                    {CommonService.limitWord(valueLine2, maxLength)}
                  </Tooltip>
                ) : (
                  valueLine2
                )}
              </a>
            ) : (
              <span>
                {maxLength && valueLine2?.length > maxLength ? (
                  <Tooltip title={valueLine2}>
                    {CommonService.limitWord(valueLine2, maxLength)}
                  </Tooltip>
                ) : (
                  valueLine2
                )}
              </span>
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
