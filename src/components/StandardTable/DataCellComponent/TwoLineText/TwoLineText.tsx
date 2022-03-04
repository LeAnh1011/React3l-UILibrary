import classNames from "classnames";
import React from "react";
import "./TwoLineText.scss";
import { Tooltip } from "antd";

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

  const getFrameStyle = React.useMemo(() => {
    if (avatar) {
      return { width: "calc(100% - 40px)" };
    } else if (icon) {
      return { width: "calc(100% - 24px)" };
    }
    return { width: "100%" };
  }, [avatar, icon]);

  return (
    <>
      <div className={classNames("cell-two-line", className)}>
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
        <div className="frame-text" style={getFrameStyle}>
          <div
            className={classNames(classNameFirstLine, "line-text first-line")}
          >
            {icon && (
              <i
                className={classNames(icon, `icon-two-line-text m-r--xxs`)}
              ></i>
            )}
            <Tooltip title={valueLine1}>{valueLine1}</Tooltip>
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
                <Tooltip title={valueLine2}>{valueLine2}</Tooltip>
              </a>
            ) : (
              <Tooltip title={valueLine2}>{valueLine2}</Tooltip>
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
