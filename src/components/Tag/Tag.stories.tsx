import { storiesOf } from "@storybook/react";
import React from "react";
import Tag from "./Tag";

function Default() {
  const handleClickClear = React.useCallback(() => {}, []);

  return (
    <>
      <Tag value="Tag1" action={handleClickClear} countCharacters={20} />
    </>
  );
}

storiesOf("Tag", module).add("Default", Default);
