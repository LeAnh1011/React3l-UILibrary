import classNames from "classnames";
import "./LayoutHeader.scss";

export interface LayoutHeaderProps {
  className?: string;
  orderType?: "left" | "right" | "center";
  name?: string;
}

function LayoutHeader(props: LayoutHeaderProps) {
  const { className, orderType, name } = props;
  return (
    <div className={classNames(className, `layout-header-${orderType}`)}>
      {name}
    </div>
  );
}
LayoutHeader.defaultProps = {
  orderType: "left",
};
export default LayoutHeader;
