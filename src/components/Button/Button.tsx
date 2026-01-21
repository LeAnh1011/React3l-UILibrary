import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import BleedButton from "./BleedButton";
import GhostButton from "./GhostButton";
import IconButton from "./IconButton";
import LinkButton from "./LinkButton";
import LinkPlainButton from "./LinkPlainButton";
import NormalButton from "./NormalButton/NormalButton";
import OutlineButton from "./OutlineButton";
import "./ButtonComponent.scss";
import { useDebounceFn } from "ahooks";

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
  | "bleed-danger"
  | "bleed-secondary"
  | "link-plain"
  | "link"
  | "icon-only-primary"
  | "icon-only-outline-primary"
  | "icon-only-danger"
  | "icon-only-outline-danger"
  | "icon-only-ghost";

export interface ButtonProps {
  /**Change the design of button*/
  type?: ButtonType;
  /**Is the button loading or not*/
  loading?: boolean;
  /**Type of component – button*/
  htmlType?: ButtonHTMLAttributes<any>["type"];
  /**Pass the classname to change the style of button*/
  className?: string;
  /**Function to be called when the button is clicked*/
  onClick?: ButtonHTMLAttributes<any>["onClick"];
  /**Children content of this component*/
  children?: ReactNode;
  /**Disabled state of button*/
  disabled?: boolean;
  /**Set the icon of button*/
  icon?: JSX.Element;
  /**The state to set onclick function is debounce */
  isDebounce?: boolean;
}

const Button = (props: PropsWithChildren<ButtonProps>, ref: React.Ref<any>) => {
  const { onClick, isDebounce, ...rest } = props;

  const { run } = useDebounceFn(onClick, {
    wait: 175,
  });

  if (
    props.type === "primary" ||
    props.type === "secondary" ||
    props.type === "danger"
  ) {
    return <NormalButton {...rest} onClick={isDebounce ? run : onClick} />;
  }

  if (props.type === "outline-primary" || props.type === "outline-danger") {
    return <OutlineButton {...rest} onClick={isDebounce ? run : onClick} />;
  }

  if (
    props.type === "ghost" ||
    props.type === "ghost-primary" ||
    props.type === "ghost-secondary"
  ) {
    return <GhostButton {...rest} onClick={isDebounce ? run : onClick} />;
  }

  if (props.type === "bleed-primary" || props.type === "bleed-secondary" || props.type === "bleed-danger") {
    return <BleedButton {...rest} onClick={isDebounce ? run : onClick} />;
  }

  if (props.type === "link-plain") {
    return <LinkPlainButton {...rest} onClick={isDebounce ? run : onClick} />;
  }

  if (props.type === "link") {
    return <LinkButton {...rest} onClick={isDebounce ? run : onClick} />;
  }

  if (
    props.type === "icon-only-primary" ||
    props.type === "icon-only-outline-primary" ||
    props.type === "icon-only-danger" ||
    props.type === "icon-only-outline-danger" ||
    props.type === "icon-only-ghost"
  ) {
    return <IconButton {...rest} onClick={run} />;
  }

  return <></>;
};

Button.defaultProps = {
  type: "primary",
  htmlType: "button",
  disabled: false,
  isDebounce: true,
};

export default Button;
