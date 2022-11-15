import { storiesOf } from "@storybook/react";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import FormItem from "../FormItem";
import Modal, { MODAL_SIZE } from "./Modal";
import InputText from "../Input/InputText/InputText";
import { BORDER_TYPE, ValidateStatus } from "./../../config/enum";
import React from "react";
export type LoadingType = "default" | "submitting" | "submitted" | "error";

function Default() {
  const [size, setSize] = React.useState<MODAL_SIZE>(MODAL_SIZE["1024px"]);
  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setSize(event.target.value);
  }, []);
  const [visible, setVisible] = React.useState<boolean>(true);
  const [loadingType, setLoadingType] = React.useState<LoadingType>("default");
  let i = 0;
  const handleOnClick = React.useCallback(() => {
    setLoadingType("submitting");
    setTimeout(() => {
      if (i % 2 === 0) {
        setLoadingType("submitted");
      } else {
        setLoadingType("error");
      }
      i++;
      setTimeout(() => {
        setLoadingType("default");
      }, 1000);
    }, 2000);
  }, [i]);
  // function handleSave() {
  //   setVisible(false);
  // }

  function handleCancel() {
    setVisible(false);
  }

  return (
    <div>
      <div>
        <div style={{ margin: "10px", width: "500px" }}>
          <Radio.Group onChange={handleChangeSize} value={size}>
            <Radio value={MODAL_SIZE.SIZE_320}>320px</Radio>
            <Radio value={MODAL_SIZE.SIZE_520}>520px</Radio>
            <Radio value={MODAL_SIZE.SIZE_720}>720px</Radio>
            <Radio value={MODAL_SIZE.SIZE_1024}>1024px</Radio>
            <Radio value={MODAL_SIZE.SIZE_1200}>1200px</Radio>
          </Radio.Group>
        </div>
      </div>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        show modal
      </button>
      <Modal
        visible={visible}
        handleSave={handleOnClick}
        handleCancel={handleCancel}
        visibleFooter={true}
        size={size}
        title="Modal Title"
        loadingType={loadingType}
      >
        <div
          style={{
            marginBottom: "16px",
            marginTop: 16,
          }}
        >
          <FormItem
            validateStatus={ValidateStatus.error}
            message={"Field required!"}
          >
            <InputText placeHolder={"Enter text..."} />
          </FormItem>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <FormItem
            validateStatus={ValidateStatus.warning}
            message={"Field required!"}
          >
            <InputText placeHolder={"Enter text..."} />
          </FormItem>
        </div>
        <div>
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
