import { Tooltip } from "antd";
import classNames from "classnames";
import { CommonService } from "@Services/common-service";
import { Close } from "@carbon/icons-react";
import "./Tag.scss";

export interface TagProps {
  /**Used to change style Component */
  className?: string;
  /**Value of Tag*/
  value?: string;
  /**Set background color Tag */
  backgroundColor?: string;
  /**Set color Tag */
  color?: string;
  /**Max length of display value */
  countCharacters?: number;
  /** Provide a custom action (onClick) to the component */
  action?: () => void;
  /**Option change size of component */
  size?: "sm" | "md";
}

function Tag(props: TagProps) {
  const {
    className,
    color,
    value,
    backgroundColor,
    countCharacters,
    action,
    size,
  } = props;
  return (
    <div
      className={classNames(className, "tag-container")}
      style={{ backgroundColor: backgroundColor, color: color }}
    >
      <span
        className={classNames("tag-wrapper", {
          "tag-wrapper__sm": size === "sm",
          "tag-wrapper__md": size === "md",
        })}
      >
        {countCharacters && countCharacters > 0 ? (
          <Tooltip title={value}>
            {CommonService.limitWord(value, countCharacters)}
          </Tooltip>
        ) : (
          <>{value}</>
        )}
      </span>
      {typeof action === "function" && action && (
        <div className="tag-clear" onClick={action}>
          <Close size={16} />
        </div>
      )}
    </div>
  );
}
Tag.defaultProps = {
  backgroundColor: "#161616",
  color: "#FFFFFF",
  size: "md",
};
export default Tag;
