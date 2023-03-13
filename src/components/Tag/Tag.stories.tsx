import { storiesOf } from "@storybook/react";
import React from "react";
import Tag from "./Tag";



function Default() {
  const handleClickClear = React.useCallback(() => {
  }, []);


  return (
    <>
      <div style={{ margin: "10px", width: "150px" }}>
        <Tag value="99+..." action={handleClickClear}/>
      </div>

    </>
  );
}

storiesOf("Tag", module).add("Default", Default);
