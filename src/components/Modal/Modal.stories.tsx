import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title
} from "@storybook/addon-docs";
import { Story } from "@storybook/react";
import React from "react";
import Button from "../Button";
import FormItem from "../FormItem";
import InputText from "../Input/InputText/InputText";
import { BORDER_TYPE, ValidateStatus } from "./../../config/enum";
import Modal, { MODAL_SIZE } from "./Modal";

export default {
  title: "Modal",
  component: Modal,
  parameters: {
    controls: { expanded: true },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Description />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    title: {
      control: "text",
      defaultValue: "Thông tin chi tiết",
    },
   
    size: {
      control: {
        type: "radio",
        options: [
          MODAL_SIZE.SIZE_320,
          MODAL_SIZE.SIZE_520,
          MODAL_SIZE.SIZE_720,
          MODAL_SIZE.SIZE_1200,
          MODAL_SIZE.SIZE_1024,
        ],
      },
      defaultValue: MODAL_SIZE.SIZE_720,
    },
    visibleFooter: {
      defaultValue: true
    }
   
  },
};


const Template: Story = (args) => {
  const [visible, setVisible] = React.useState<boolean>(true);

  function handleSave() {
    setVisible(false);
  }

  function handleCancel() {
    setVisible(false);
  }

  return (
    <div>
      <Button
      type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        show modal
      </Button>
      <Modal
      {...args}
        visible={visible}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleApplyNext={handleSave}
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

export const Default = Template.bind({});
