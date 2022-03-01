import classNames from "classnames";
import "./LayoutHeader.scss";
import { Tooltip } from "antd";
import { CommonService } from "services/common-service";

export interface LayoutHeaderProps {
  className?: string;
  orderType?: "left" | "right" | "center";
  title?: string;
  maxLength?: number;
}

function LayoutHeader(props: LayoutHeaderProps) {
  const { className, orderType, title, maxLength } = props;
  return (
    <div className={classNames(className, `layout-header-${orderType}`)}>
      {maxLength && title?.length > maxLength ? (
        <Tooltip title={title}>
          {CommonService.limitWord(title, maxLength)}
        </Tooltip>
      ) : (
        title
      )}
    </div>
  );
}
LayoutHeader.defaultProps = {
  orderType: "left",
};
export default LayoutHeader;
