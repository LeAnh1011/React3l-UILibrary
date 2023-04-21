import classNames from "classnames";
import React from "react";
import { Tooltip } from "antd";
import { CommonService } from "@Services/common-service";
import "./TwoLineText.scss";

export interface TwoLineTextProps {
  /**Used to change style Component */
  className?: string;
  /**URL of avatar to display */
  avatar?: string;
  /**Shape option of avatar*/
  avatarType?: "circle" | "square";
  /** Icon name to display */
  icon?: string;
  /** Display value of line 1*/
  valueLine1?: string;
  /** Display value of line 2*/
  valueLine2?: string;
  /** ClassName to style for display line 1 */
  classNameFirstLine?: string;
  /** ClassName to style for display line 2 */
  classNameSecondLine?: string;
  /**Option to add link into cell */
  link?: string;
  /** Count max length to display of line 1 */
  countCharacters1?: number;
  /** Count max length to display of line 2 */
  countCharacters2?: number;
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
    countCharacters1,
    countCharacters2,
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
          <div className="m-r--2xs">
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
                className={classNames(icon, `icon-two-line-text m-r--2xs`)}
              ></i>
            )}
            {countCharacters1 && countCharacters1 > 0 ? (
              <Tooltip title={valueLine1}>
                {CommonService.limitWord(valueLine1, countCharacters1)}
              </Tooltip>
            ) : (
              <>{valueLine1}</>
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
              <a href={link} rel="noopener noreferrer" className="link-text">
                {countCharacters2 && countCharacters2 > 0 ? (
                  <Tooltip title={valueLine2}>
                    {CommonService.limitWord(valueLine2, countCharacters2)}
                  </Tooltip>
                ) : (
                  <>{valueLine2}</>
                )}
              </a>
            ) : (
              <>
                {countCharacters2 && countCharacters2 > 0 ? (
                  <Tooltip title={valueLine2}>
                    {CommonService.limitWord(valueLine2, countCharacters2)}
                  </Tooltip>
                ) : (
                  <>{valueLine2}</>
                )}
              </>
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
