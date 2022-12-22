import { ReactNode } from "react";
import "./FormItem.scss";
import classNames from "classnames";
import { ValidateStatus } from "@Configs/enum";
import React from "react";

export interface ValidateObject {
  validateStatus: ValidateStatus;
  message: string;
}

export interface FormItemProps {
  validateStatus?: ValidateStatus;
  message?: string;
  children: ReactNode;
  placeRight?: boolean;
  validateObject?: ValidateObject;
}

function FormItem(props: FormItemProps) {
  const {
    validateStatus,
    message,
    validateObject,
    children,
    placeRight,
  } = props;
  const { validateStatusValue, messageValue } = React.useMemo(() => {
    if (validateObject) {
      return {
        validateStatusValue: validateObject.validateStatus,
        messageValue: validateObject.message,
      };
    } else {
      return {
        validateStatusValue: validateStatus,
        messageValue: message,
      };
    }
  }, [message, validateObject, validateStatus]);

  return (
    <>
      <div
        className={classNames("form-item__container", {
          [`form-item__container--${validateStatusValue}`]: validateStatusValue,
        })}
      >
        <div
          className={classNames("form-item__content", {
            "justify-content-end": placeRight,
          })}
        >
          {children}
        </div>
        <div className="form-item__message m-t--xxxs">{messageValue}</div>
      </div>
    </>
  );
}

FormItem.defaultProps = {
  placeRight: false,
};

export default FormItem;
