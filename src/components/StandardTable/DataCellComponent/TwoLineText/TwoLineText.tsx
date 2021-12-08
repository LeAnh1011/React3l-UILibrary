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
  } = props;
  return (
    <div className="cell-two-line">
      {(avatar || icon) && (
        <div className="m-r--xxs">
          {avatar && (
            <img src={avatar} className="avatar-two-line-text" alt="avatar" />
          )}
        </div>
      )}
      <div className={className}>
        <div className={classNames(classNameFirstLine, "line-text first-line")}>
          {icon && (
            <i className={classNames(icon, `icon-two-line-text m-r--xxs`)}></i>
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
  );
}
TwoLineText.defaultProps = {
  avatar: null,
  icon: null,
};
export default TwoLineText;
