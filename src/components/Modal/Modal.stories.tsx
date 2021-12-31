import { storiesOf } from "@storybook/react";
import FormItem from "../FormItem";
import Modal from "./Modal";
import InputText from "../Input/InputText/InputText";
import { BORDER_TYPE, ValidateStatus } from "./../../config/enum";
import React from "react";

function Default() {
  const [visible, setVisible] = React.useState<boolean>(true);
  function handleSave() {
    console.log("save");
    setVisible(false);
  }
  function handleCancel() {
    console.log("cancel");
    setVisible(false);
  }

  return (
    <div>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        show modal
      </button>
      <Modal
        visible={visible}
        handleSave={handleSave}
        handleCancel={handleCancel}
        visibleFooter={true}
        modalSize="small"
        title="Modal Title"
      >
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          <FormItem
            validateStatus={ValidateStatus.error}
            message={"Field required!"}
          >
            <InputText placeHolder={"Enter text..."} />
          </FormItem>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <FormItem
            validateStatus={ValidateStatus.warning}
            message={"Field required!"}
          >
            <InputText placeHolder={"Enter text..."} />
          </FormItem>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <FormItem
            validateStatus={ValidateStatus.success}
            message={"Field required!"}
          >
            <InputText
              placeHolder={"Enter text..."}
              type={BORDER_TYPE.MATERIAL}
            />
          </FormItem>
        </div>
      </Modal>
    </div>
  );
}

storiesOf("Modal", module).add("Default", Default);
