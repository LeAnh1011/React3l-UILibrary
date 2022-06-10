import { storiesOf } from "@storybook/react";
import { RadioChangeEvent } from "antd/lib/radio";
import OverflowMenu from "./OverflowMenu";
import React from "react";
import classNames from "classnames";
export enum SIZE_TYPE {
  LARGE = "lg",
  MEDIUM = "md",
  SMALL = "sm",
}
function Default() {
  const [size, setSize] = React.useState<SIZE_TYPE>(SIZE_TYPE.SMALL);
  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setSize(event.target.value);
  }, []);

  const children = React.useMemo(
    () => (
      <div className="select__list">
        <div className={classNames("select__item p-l--xs p-y--xs")}>
          <span className="select__text">Thêm</span>
        </div>
        <div className={classNames("select__item p-l--xs p-y--xs")}>
          <span className="select__text">Sửa</span>
        </div>
        <div className={classNames("select__item p-l--xs p-y--xs")}>
          <span className="select__text">Xóa</span>
        </div>
      </div>
    ),
    []
  );

  return (
    <div style={{width: "600px"}}>
      <OverflowMenu size="sm" children={children}></OverflowMenu>
    </div>
  );
}

storiesOf("OverflowMenu", module).add("Default", Default);
