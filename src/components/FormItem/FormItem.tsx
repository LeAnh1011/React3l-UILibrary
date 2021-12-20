import { ReactNode } from "react";
import "./FormItem.scss";
import classNames from "classnames";
import { ValidateStatus } from "config/enum";

export interface FormItemProps {
  validateStatus?: ValidateStatus;
  message?: string;
  children: ReactNode;
  placeRight?: boolean;
}

function FormItem(props: FormItemProps) {
  const { validateStatus, message, children, placeRight } = props;
  return (
    <>
      <div
        className={classNames("form-item__container", {
          [`form-item__container--${validateStatus}`]: validateStatus,
        })}
      >
        <div
          className={classNames("form-item__content", {
            "justify-content-end": placeRight,
          })}
        >
          {children}
        </div>
        <div className="form-item__message m-t--xxxs">{message}</div>
      </div>
    </>
  );
}

FormItem.defaultProps = {
  placeRight: false,
};

export default FormItem;
