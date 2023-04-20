import { Tooltip } from "antd";
import classNames from "classnames";
import { CommonService } from "@Services/common-service";
import "./BadgeText.scss";

export interface BadgeTextProps {
  /**Used to change style of badge text */
  className?: string;
  /**Value to display */
  value?: string;
  /**Background color to display */
  backgroundColor?: string;
  /**Customer value color */
  color?: string;
  /**Max length of display value */
  countCharacters?: number;
}

function BadgeText(props: BadgeTextProps) {
  const { className, color, value, backgroundColor, countCharacters } = props;
  return (
    <div className={classNames("text-in-table-cell")}>
      <div
        className={classNames(className, "badge-text")}
        style={{ backgroundColor: backgroundColor, color: color }}
      >
        {countCharacters && countCharacters > 0 ? (
          <Tooltip title={value}>
            {CommonService.limitWord(value, countCharacters)}
          </Tooltip>
        ) : (
          <>{value}</>
        )}
      </div>
    </div>
  );
}
BadgeText.defaultProps = {
  avatar: null,
  icon: null,
};
export default BadgeText;
