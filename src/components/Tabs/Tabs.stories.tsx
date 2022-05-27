import { storiesOf } from "@storybook/react";
import Tabs from "./Tabs";

function Default() {
  return (
    <>
      <div style={{ margin: "10px", width: "550px" }}>
        <Tabs></Tabs>
     </div>
    </>
  );
}

storiesOf("Tabs", module).add("Default", Default);
