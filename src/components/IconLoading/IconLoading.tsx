import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import { Spin } from "antd";

export interface IconLoadingAction {
  name?: string;
  action?: any;
}

export interface IconLoadingProps {
  /** Size of icon */
  size?: number;
  /** Color of icon */
  color?: string;
}
function IconLoading(props: IconLoadingProps) {
  const { size, color } = props;

  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: size,
            color: color,
          }}
          spin
        />
      }
    />
  );
}

IconLoading.defaultProps = {
  size: 16,
  color: "white",
};

export default IconLoading;
