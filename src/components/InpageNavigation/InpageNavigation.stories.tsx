import { storiesOf } from "@storybook/react";
import React from "react";
import InpageNavigation from "./InpageNavigation";

const list = [
  {
    id: 1,
    name: "Side Menu Level 1",
  },
  {
    id: 2,
    name: "Side Menu Level 1",
  },
  {
    id: 3,
    name: "Side Menu Level 1",
  },
  {
    id: 4,
    name: "Side Menu Level 1",
  },
  {
    id: 5,
    name: "Side Menu Level 1",
  },
  {
    id: 6,
    name: "Side Menu Level 1",
  },
  {
    id: 7,
    name: "Side Menu Level 1",
  },
  {
    id: 8,
    name: "Side Menu Level 1",
  },
];
function Default() {
  const handleChangeNavigate = React.useCallback((item) => {}, []);
  return (
    <>
      <InpageNavigation
        list={list}
        title={"Creat asset"}
        description={
          "Hãy lựa chọn 1 trong những chức năng phía dưới để thay đổi giá trị"
        }
        onChange={handleChangeNavigate}
      />
    </>
  );
}

storiesOf("InpageNavigation", module).add("Default", Default);
