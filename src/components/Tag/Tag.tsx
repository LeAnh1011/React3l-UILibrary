import { Tooltip } from "antd";
import classNames from "classnames";
import { CommonService } from "@Services/common-service";
import "./Tag.scss";
import Close16 from "@carbon/icons-react/es/close/16";

export interface TagProps {
  className?: string;
  value?: string;
  backgroundColor?: string;
  color?: string;
  countCharacters?: number;
  action?: () => void;
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
      className={classNames(className, "tag-container", )}
      style={{ backgroundColor: backgroundColor, color: color }}
    >
      <span className={classNames("tag-wrapper", {
        "tag-wrapper__sm": size === "sm",
        "tag-wrapper__md": size === "md",
      })}>
        {countCharacters && countCharacters > 0 ? (
          <Tooltip title={value}>
            {CommonService.limitWord(value, countCharacters)}
          </Tooltip>
        ) : (
          <>{value}</>
        )}
      </span>
      {typeof action === "function" && action && (
        <div className="tag-clear">
          <Close16 />
        </div>
      )}
    </div>
  );
}
Tag.defaultProps = {
  backgroundColor: "#161616",
  color: "#FFFFFF",
  size: "md"
};
export default Tag;
