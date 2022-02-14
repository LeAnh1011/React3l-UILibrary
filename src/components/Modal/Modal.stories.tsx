import { storiesOf } from "@storybook/react";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import FormItem from "../FormItem";
import Modal from "./Modal";
import InputText from "../Input/InputText/InputText";
import { BORDER_TYPE, ValidateStatus } from "./../../config/enum";
import React from "react";
export enum SIZE_TYPE {
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
}
function Default() {
  const [size, setSize] = React.useState<SIZE_TYPE>(SIZE_TYPE.SMALL);
  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setSize(event.target.value);
  }, []);
  const [visible, setVisible] = React.useState<boolean>(true);
  function handleSave() {
    setVisible(false);
  }
  function handleCreate() {
    setVisible(false);
  }
  function handleCancel() {
    setVisible(false);
  }

  return (
    <div>
      <div>
        <div style={{ margin: "10px", width: "500px" }}>
          <Radio.Group onChange={handleChangeSize} value={size}>
            <Radio value={SIZE_TYPE.LARGE}>Large</Radio>
            <Radio value={SIZE_TYPE.MEDIUM}>medium</Radio>
            <Radio value={SIZE_TYPE.SMALL}>small</Radio>
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
      {size === "small" && (
        <Modal
          visible={visible}
          handleSave={handleSave}
          handleCancel={handleCancel}
          visibleFooter={true}
          size="small"
          title="Modal Title"
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
      )}
      {size === "medium" && (
        <Modal
          visible={visible}
          handleSave={handleSave}
          handleCancel={handleCancel}
          visibleFooter={true}
          size="medium"
          title="Modal Title"
        >
          <div style={{ marginBottom: "16px", marginTop: 16 }}>
            <FormItem
              validateStatus={ValidateStatus.warning}
              message={"Field required!"}
            >
              <InputText placeHolder={"Enter text..."} />
            </FormItem>
          </div>
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
            }}
          >
            <div style={{ paddingRight: 8, width: "50%" }}>
              <FormItem
                validateStatus={ValidateStatus.error}
                message={"Field required!"}
              >
                <InputText placeHolder={"Enter text..."} />
              </FormItem>
            </div>

            <div style={{ paddingLeft: 8, width: "50%" }}>
              <FormItem
                validateStatus={ValidateStatus.error}
                message={"Field required!"}
              >
                <InputText placeHolder={"Enter text..."} />
              </FormItem>
            </div>
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
      )}
      {size === "large" && (
        <Modal
          visible={visible}
          handleSave={handleSave}
          handleCancel={handleCancel}
          visibleFooter={true}
          handleApplyNext={handleCreate}
          size="large"
          title="Modal Title"
        >
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              marginTop: 16,
            }}
          >
            <div style={{ paddingRight: 8, width: "50%" }}>
              <FormItem
                validateStatus={ValidateStatus.warning}
                message={"Field required!"}
              >
                <InputText placeHolder={"Enter text..."} />
              </FormItem>
            </div>

            <div style={{ paddingLeft: 8, width: "50%" }}>
              <FormItem
                validateStatus={ValidateStatus.warning}
                message={"Field required!"}
              >
                <InputText placeHolder={"Enter text..."} />
              </FormItem>
            </div>
          </div>
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
            }}
          >
            <div style={{ paddingRight: 8, width: "50%" }}>
              <FormItem
                validateStatus={ValidateStatus.error}
                message={"Field required!"}
              >
                <InputText placeHolder={"Enter text..."} />
              </FormItem>
            </div>

            <div style={{ paddingLeft: 8, width: "50%" }}>
              <FormItem
                validateStatus={ValidateStatus.error}
                message={"Field required!"}
              >
                <InputText placeHolder={"Enter text..."} />
              </FormItem>
            </div>
          </div>
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
            }}
          >
            <div style={{ paddingRight: 8, width: "50%" }}>
              <FormItem
                validateStatus={ValidateStatus.warning}
                message={"Field required!"}
              >
                <InputText placeHolder={"Enter text..."} />
              </FormItem>
            </div>

            <div style={{ paddingLeft: 8, width: "50%" }}>
              <FormItem
                validateStatus={ValidateStatus.warning}
                message={"Field required!"}
              >
                <InputText placeHolder={"Enter text..."} />
              </FormItem>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
            }}
          >
            <div style={{ paddingRight: 8, width: "50%" }}>
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

            <div style={{ paddingLeft: 8, width: "50%" }}>
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
          </div>
        </Modal>
      )}
    </div>
  );
}

storiesOf("Modal", module).add("Default", Default);
