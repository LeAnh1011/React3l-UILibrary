import { storiesOf } from "@storybook/react";
import { RadioChangeEvent } from "antd/lib/radio";
import OverflowMenu from './OverflowMenu'
import React from "react";
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


  return (
    <div>
      <OverflowMenu></OverflowMenu>
    </div>
  );
}

storiesOf("OverflowMenu", module).add("Default", Default);
