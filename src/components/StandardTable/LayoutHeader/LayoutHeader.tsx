import classNames from "classnames";
import "./LayoutHeader.scss";

export interface LayoutHeaderProps {
  className?: string;
  orderType?: "left" | "right" | "center";
  title?: string;
}

function LayoutHeader(props: LayoutHeaderProps) {
  const { className, orderType, title } = props;
  return (
    <div className={classNames(className, `layout-header-${orderType}`)}>
      {title}
    </div>
  );
}
LayoutHeader.defaultProps = {
  orderType: "left",
};
export default LayoutHeader;
