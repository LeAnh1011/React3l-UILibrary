import { storiesOf } from "@storybook/react";
import classNames from "classnames";
import React from "react";
import OverflowMenu from "./OverflowMenu";
export enum SIZE_TYPE {
  LARGE = "lg",
  MEDIUM = "md",
  SMALL = "sm",
}
function Default() {
 

  const children = React.useMemo(
    () => (
      <>
        <button className={classNames("select__item p-l--xs p-y--xxs")}>
          <span className="select__text">Thêm</span>
        </button>
        <button className={classNames("select__item p-l--xs p-y--xxs")}>
          <span className="select__text">Sửa</span>
        </button>
        <button className={classNames("select__item p-l--xs p-y--xxs")}>
          <span className="select__text">Xóa</span>
        </button>
      </>
    ),
    []
  );



  return (
    <div style={{width: "600px"}}>
      <OverflowMenu size="md" children={children} ></OverflowMenu>
    </div>
  );
}

storiesOf("OverflowMenu", module).add("Default", Default);
