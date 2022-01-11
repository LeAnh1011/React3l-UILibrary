import { storiesOf } from "@storybook/react";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import FormItem from "../FormItem";
import Drawer from "./Drawer";
import InputText from "../Input/InputText/InputText";
import {
  BORDER_TYPE,
  NUMBER_BUTTON,
  ValidateStatus,
} from "./../../config/enum";
import React from "react";

function Default() {
  const [size, setSize] = React.useState<NUMBER_BUTTON>(NUMBER_BUTTON.TWO);
  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setSize(event.target.value);
  }, []);
  const [haveCloseIcon, setHaveCloseIcon] = React.useState<boolean>(false);
  const [haveDescrip, setHaveDescrip] = React.useState<boolean>(false);
  const [visible, setVisible] = React.useState<boolean>(true);
  const handleChangeHaveDescrip = React.useCallback(
    (event: RadioChangeEvent) => {
      setHaveDescrip(event.target.value);
    },
    []
  );
  const handleChangeHaveCloseIcon = React.useCallback(
    (event: RadioChangeEvent) => {
      setHaveCloseIcon(event.target.value);
    },
    []
  );
  function handleSave() {
    console.log("save");
    setVisible(false);
  }
  function handleCreate() {
    console.log("create");
  }
  function handleCancel() {
    console.log("cancel");
    setVisible(false);
  }

  return (
    <div>
      <div>
        <div style={{ margin: "10px", width: "500px" }}>
          <Radio.Group onChange={handleChangeSize} value={size}>
            <Radio value={NUMBER_BUTTON.TWO}>2 Button</Radio>
            <Radio value={NUMBER_BUTTON.THREE}>3 Button</Radio>
          </Radio.Group>
        </div>
        <div style={{ margin: "10px", width: "500px" }}>
          <Radio.Group onChange={handleChangeHaveDescrip} value={haveDescrip}>
            <Radio value={true}>Có Descrip</Radio>
            <Radio value={false}>Không Descrip</Radio>
          </Radio.Group>
        </div>
        <div style={{ margin: "10px", width: "500px" }}>
          <Radio.Group
            onChange={handleChangeHaveCloseIcon}
            value={haveCloseIcon}
          >
            <Radio value={true}>Có CloseIcon</Radio>
            <Radio value={false}>Không CloseIcon</Radio>
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

      <Drawer
        visible={visible}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleCreate={handleCreate}
        isHaveDescription={haveDescrip}
        isHaveCloseIcon={haveCloseIcon}
        visibleFooter={true}
        title="Drawer Title"
        loading={false}
        size={size}
      >
        <div
          style={{
            display: "flex",
          }}
        >
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
        <div
          style={{
            display: "flex",
            marginTop: 16,
          }}
        >
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
        <div
          style={{
            display: "flex",
            marginTop: 16,
          }}
        >
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
        <div
          style={{
            display: "flex",
            marginTop: 16,
          }}
        >
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
      </Drawer>
    </div>
  );
}

storiesOf("Drawer", module).add("Default", Default);
