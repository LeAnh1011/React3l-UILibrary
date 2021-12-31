import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { Spin } from "antd";
import "./IconLoading.scss";

export interface IconLoadingAction {
  name?: string;
  action?: any;
}

export interface IconLoadingProps {
  size?: number;
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
  color: "#FFFFFF",
};

export default IconLoading;
