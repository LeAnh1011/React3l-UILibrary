import classNames from "classnames";
import "./OneLineText.scss";
import { Tooltip } from "antd";
import { CommonService } from "@Services/common-service";
import { Link } from "react-router-dom";

export interface OneLineTextProps {
  className?: string;
  avatar?: string;
  avatarType?: "circle" | "square";
  icon?: string;
  value?: string;
  avatarSize?: "lg" | "md" | "sm";
  link?: string;
  countCharacters?: number;
}

function OneLineText(props: OneLineTextProps) {
  const {
    className,
    avatar,
    value,
    icon,
    avatarSize,
    link,
    avatarType,
    countCharacters,
  } = props;
  return (
    <>
      {avatar && (
        <div className={classNames(className, "text-in-table-cell")}>
          {avatar && avatarSize !== "sm" && (
            <img
              src={avatar}
              className={classNames(
                `avatar-one-line-text-table-size-${avatarSize}`,
                `avatar-type-${avatarType}`
              )}
              alt="avatar"
            />
          )}
          {link ? (
            <a href={link} rel="noopener noreferrer" className="link-text">
              {countCharacters && countCharacters > 0 ? (
                <Tooltip title={value}>
                  {CommonService.limitWord(value, countCharacters)}
                </Tooltip>
              ) : (
                <>{value}</>
              )}
            </a>
          ) : (
            <>
              {countCharacters && countCharacters > 0 ? (
                <Tooltip title={value}>
                  {CommonService.limitWord(value, countCharacters)}
                </Tooltip>
              ) : (
                <>{value}</>
              )}
            </>
          )}
        </div>
      )}
      {!avatar && (
        <div className={classNames(className, "text-in-table-cell")}>
          {icon && <i className={classNames(icon, `icon-one-line-text`)}></i>}
          {link ? (
            <Link to={link} className="link-text">
              {countCharacters && countCharacters > 0 ? (
                <Tooltip title={value}>
                  {CommonService.limitWord(value, countCharacters)}
                </Tooltip>
              ) : (
                <>{value}</>
              )}
            </Link>
          ) : (
            <span>
              {countCharacters && countCharacters > 0 ? (
                <Tooltip title={value}>
                  {CommonService.limitWord(value, countCharacters)}
                </Tooltip>
              ) : (
                <>{value}</>
              )}
            </span>
          )}
        </div>
      )}
    </>
  );
}
OneLineText.defaultProps = {
  avatar: null,
  icon: null,
  tableSize: "lg",
  avatarType: "circle",
};
export default OneLineText;
