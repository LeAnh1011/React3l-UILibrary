import { storiesOf } from "@storybook/react";
import FormItem, { ValidateStatus } from "./FormItem";
import InputText from "../Input/InputText/InputText";

function Default() {
  return (
    <>
      <div style={{ margin: "10px", width: "250px" }}>
        <FormItem
          validateStatus={ValidateStatus.error}
          message={"Field required!"}
        >
          <InputText placeHolder={"Enter text..."} />
        </FormItem>
      </div>
      <div style={{ margin: "10px", width: "250px" }}>
        <FormItem
          validateStatus={ValidateStatus.warning}
          message={"Field required!"}
        >
          <InputText placeHolder={"Enter text..."} />
        </FormItem>
      </div>
      <div style={{ margin: "10px", width: "250px" }}>
        <FormItem
          validateStatus={ValidateStatus.success}
          message={"Field required!"}
        >
          <InputText placeHolder={"Enter text..."} />
        </FormItem>
      </div>
      <div style={{ margin: "10px", width: "250px" }}>
        <FormItem
          validateStatus={ValidateStatus.validating}
          message={"Field required!"}
        >
          <InputText placeHolder={"Enter text..."} />
        </FormItem>
      </div>
    </>
  );
}

storiesOf("FormItem", module).add("Default", Default);
