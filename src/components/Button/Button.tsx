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

export type ButtonType =
  | "primary"
  | "secondary"
  | "danger"
  | "outline-primary"
  | "outline-danger"
  | "ghost"
  | "ghost-primary"
  | "ghost-secondary"
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

  loading?: boolean;

  isSubmitBtn?: boolean;

  htmlType?: ButtonHTMLAttributes<any>["type"];

  className?: string;

  onClick?: ButtonHTMLAttributes<any>["onClick"];

  children?: ReactNode;

  disabled?: boolean;

  icon?: string;
}

const Button = React.forwardRef(
  (props: PropsWithChildren<ButtonProps>, ref: React.Ref<any>) => {
    if (
      props.type === "primary" ||
      props.type === "secondary" ||
      props.type === "danger"
    ) {
      return <NormalButton {...props} />;
    }

    if (props.type === "outline-primary" || props.type === "outline-danger") {
      return <OutlineButton {...props} />;
    }

    if (
      props.type === "ghost" ||
      props.type === "ghost-primary" ||
      props.type === "ghost-secondary"
    ) {
      return <GhostButton {...props} />;
    }

    if (props.type === "bleed-primary" || props.type === "bleed-secondary") {
      return <BleedButton {...props} />;
    }

    if (props.type === "link-plain") {
      return <LinkPlainButton {...props} />;
    }

    if (props.type === "link") {
      return <LinkButton {...props} />;
    }

    if (
      props.type === "icon-only-primary" ||
      props.type === "icon-only-outline-primary" ||
      props.type === "icon-only-danger" ||
      props.type === "icon-only-outline-danger" ||
      props.type === "icon-only-ghost"
    ) {
      return <IconButton {...props} />;
    }
  }
);

Button.defaultProps = {
  type: "primary",
  htmlType: "button",
  disabled: false,
  isSubmitBtn: false,
};

export default Button;
