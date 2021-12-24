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
export enum ButtonSet {
  NORMAL,
  OUTLINE,
  GHOST,
  BLEED,
  LINKPAIN,
  LINK,
}
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
      case "primary":
        numb = ButtonSet.NORMAL;
        break;
      case "secondary":
        numb = ButtonSet.NORMAL;
        break;
      case "danger":
        numb = ButtonSet.NORMAL;
        break;
      case "outline-primary":
        numb = ButtonSet.OUTLINE;
        break;
      case "outline-danger":
        numb = ButtonSet.OUTLINE;
        break;
      case "ghost":
        numb = ButtonSet.GHOST;
        break;
      case "ghost-primary":
        numb = ButtonSet.GHOST;
        break;
      case "ghost-secondary":
        numb = ButtonSet.GHOST;
        break;
      case "bleed-primary":
        numb = ButtonSet.BLEED;
        break;
      case "bleed-secondary":
        numb = ButtonSet.BLEED;
        break;
      case "link-plain":
        numb = ButtonSet.LINKPAIN;
        break;
      case "link":
        numb = ButtonSet.LINK;
        break;
      default:
        numb = ButtonSet.NORMAL;
    }
    // render button here
    return numb === ButtonSet.NORMAL ? (
      <NormalButton {...props} />
    ) : numb === ButtonSet.OUTLINE ? (
      <OutlineButton {...props} />
    ) : numb === ButtonSet.GHOST ? (
      <GhostButton {...props} />
    ) : numb === ButtonSet.BLEED ? (
      <BleedButton {...props} />
    ) : numb === ButtonSet.LINKPAIN ? (
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
