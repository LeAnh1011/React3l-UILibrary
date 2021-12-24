import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import BleedButton from "./BleedButton";
import "./Button.scss";
import GhostButton from "./GhostButton";
import IconButton from "./IconButton";
import LinkButton from "./LinkButton";
import LinkPlainButton from "./LinkPlainButton";
import NormalButton from "./NormalButton/NormalButton";
import OutlineButton from "./OutlineButton";
export enum ButtonSet {
  NORMAL,
  OUTLINE,
  GHOST,
  BLEED,
  LINK_PAIN,
  LINK,
  ICON_ONLY,
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
  | "link"
  | "icon-only-primary"
  | "icon-only-outline-primary"
  | "icon-only-danger"
  | "icon-only-outline-danger"
  | "icon-only-ghost";

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
      case "secondary":
      case "danger":
        numb = ButtonSet.NORMAL;
        break;
      case "outline-primary":
      case "outline-danger":
        numb = ButtonSet.OUTLINE;
        break;
      case "ghost":
      case "ghost-primary":
      case "ghost-secondary":
        numb = ButtonSet.GHOST;
        break;
      case "bleed-primary":
      case "bleed-secondary":
        numb = ButtonSet.BLEED;
        break;
      case "link-plain":
        numb = ButtonSet.LINK_PAIN;
        break;
      case "link":
        numb = ButtonSet.LINK;
        break;
      case "icon-only-primary":
      case "icon-only-outline-primary":
      case "icon-only-danger":
      case "icon-only-outline-danger":
      case "icon-only-ghost":
        numb = ButtonSet.ICON_ONLY;
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
    ) : numb === ButtonSet.LINK_PAIN ? (
      <LinkPlainButton {...props} />
    ) : numb === ButtonSet.LINK ? (
      <LinkButton {...props} />
    ) : (
      <IconButton {...props} />
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
