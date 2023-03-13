import { storiesOf } from "@storybook/react";
import React from "react";
import Tag from "./Tag";



function Default() {
  const handleClickClear = React.useCallback(() => {
  }, []);


  return (
    <>
        <Tag value="9dsfsdfsdf" action={handleClickClear}/>

    </>
  );
}

storiesOf("Tag", module).add("Default", Default);
