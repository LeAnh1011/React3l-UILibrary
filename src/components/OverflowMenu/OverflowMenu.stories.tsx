import { storiesOf } from "@storybook/react";
import { Radio } from "antd";
import React from "react";
import OverflowMenu from "./OverflowMenu";
export enum SIZE_TYPE {
  LARGE = "xl",
  MEDIUM = "md",
}
function Default() {
  const [size, setSize] = React.useState<SIZE_TYPE>(SIZE_TYPE.MEDIUM);

  const handleAdd = React.useCallback(() => {}, []);

  const handleEdit = React.useCallback(() => {}, []);

  const handleDelete = React.useCallback(() => {}, []);

  const list: any = [
    {
      name: "Thêm",
      action: handleAdd,
    },
    {
      name: "Sửa",
      action: handleEdit,
    },
    {
      name: "Xóa",
      action: handleDelete,
    },
  ];

  const handleChangeSize = React.useCallback((event) => {
    setSize(event.target.value);
  }, []);

  return (
    <div style={{ width: "600px" }}>
      <OverflowMenu size={size} children={list}></OverflowMenu>

      <Radio.Group onChange={handleChangeSize} value={size}>
        <Radio value={"md"}>md</Radio>
        <Radio value={"xl"}>xl</Radio>
      </Radio.Group>
    </div>
  );
}

storiesOf("OverflowMenu", module).add("Default", Default);
