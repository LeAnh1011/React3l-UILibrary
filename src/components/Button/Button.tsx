import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import BleedButton from "./BleedButton";
import "./Button.scss";
import GhostButton from "./GhostButton";
import LinkButton from "./LinkButton";
import LinkPlainButton from "./LinkPlainButton";
import NormalButton from "./NormalButton/NormalButton";
import OutlineButton from "./OutlineButton";

export type ButtonType =
  | "primary"
  | "outline-primary"
  | "secondary"
  | "ghost"
  | "ghost-primary"
  | "ghost-secondary"
  | "danger"
  | "outline-danger"
  | "bleed-primary"
  | "bleed-secondary"
  | "link-plain"
  | "link";

export interface ButtonProps {
  type?: ButtonType;

  htmlType?: ButtonHTMLAttributes<any>["type"];

  outlined?: boolean;

  className?: string;

  onClick?: ButtonHTMLAttributes<any>["onClick"];

  children?: ReactNode;

  disabled?: boolean;

  icon?: string;
}

const Button = React.forwardRef(
  (props: PropsWithChildren<ButtonProps>, ref: React.Ref<any>) => {
    let numb = 0;
    switch (props.type) {
      // ba bộ đầu có bộ padding khá giống nhau
      // khác nhau mỗi padding khi có icon hoặc không có icon
      // nên đặt là btn-normal-have/no-icon cho 2 bộ này
      // và sẽ chia thành case 1 và 2 cho numb
      case "primary":
        numb = 1;
        break;
      case "outline-primary":
        numb = 2;
        break;
      case "secondary":
        numb = 1;
        break;
      case "ghost": //các bộ ghost có ui padding khác nên chia thành 3-4
        numb = 3;
        break;

      case "ghost-primary":
        numb = 3;
        break;

      case "ghost-secondary":
        numb = 3;
        break;

      case "danger": // bộ danger có ui padding khá giống 3 bộ đầu nên chia 1 và 2
        numb = 1;
        break;
      case "outline-danger":
        numb = 2;
        break;
      case "bleed-primary": // bộ bleed có ui padding cố định, khác bộ khác chia thành 5-6
        numb = 4;
        break;
      case "bleed-secondary":
        numb = 4;
        break;
      case "link-plain": // bộ link-plain & link có ui padding cố định, khác bộ khác chia thành 7-8
        numb = 5;
        break;
      case "link":
        numb = 6;
        break;
      default:
        numb = 1;
    }
    // render button here
    return numb === 1 ? (
      <NormalButton {...props} />
    ) : numb === 2 ? (
      <OutlineButton {...props} />
    ) : numb === 3 ? (
      <GhostButton {...props} />
    ) : numb === 4 ? (
      <BleedButton {...props} />
    ) : numb === 5 ? (
      <LinkPlainButton {...props} />
    ) : (
      <LinkButton {...props} />
    );
  }
);

Button.defaultProps = {
  type: "primary",
  outlined: false,
  htmlType: "button",
  disabled: false,
};

export default Button;
