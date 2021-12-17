import classNames from "classnames";
import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  RefObject,
} from "react";
import "./Button.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export interface ButtonProps {
  loading?: boolean;

  children: ReactNode;

  htmlType?: ButtonHTMLAttributes<any>["type"];

  className?: string;

  onClick?: ButtonHTMLAttributes<any>["onClick"];
}

const antIcon = (
  <LoadingOutlined style={{ fontSize: 16, color: "#fff" }} spin />
);

const Button = React.forwardRef(function ButtonComponent(
  props: PropsWithChildren<ButtonProps>,
  ref: RefObject<HTMLButtonElement>
) {
  const { htmlType, children, onClick, className, loading } = props;
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const handleFocus = React.useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleBlur = React.useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <button
      type={htmlType}
      onClick={onClick}
      ref={ref}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={classNames("btn", className, {
        loading__button: loading && isFocused,
      })}
      disabled={loading}
    >
      {loading && isFocused && <Spin indicator={antIcon} />} {children}
    </button>
  );
});

Button.defaultProps = {
  htmlType: "button",
};

export default Button;
