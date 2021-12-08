import classNames from "classnames";
import React from "react";
import "./OneLineText.scss";

export interface OneLineTextProps {
  className?: string;
  avatar?: string;
  icon?: string;
  name?: string;
}

function OneLineText(props: OneLineTextProps) {
  const { className, avatar, name, icon } = props;
  return (
    <>
      <div className={className}>
        {avatar && (
          <img src={avatar} className="avatar-one-line-text" alt="avatar" />
        )}
        {icon && <i className={classNames(icon, `icon-one-line-text`)}></i>}
        {name}
      </div>
    </>
  );
}
OneLineText.defaultProps = {
  avatar: null,
  icon: null,
};
export default OneLineText;
