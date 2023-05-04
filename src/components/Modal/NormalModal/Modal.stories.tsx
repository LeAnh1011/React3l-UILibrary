import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs";
import { Story } from "@storybook/react";
import React from "react";
import Button from "../../Button/Button";
import FormItem from "../../FormItem";
import InputText from "../../Input/InputText/InputText";
import { BORDER_TYPE, ValidateStatus } from "./../../../config/enum";
import Modal, { MODAL_SIZE } from "./Modal";
export type LoadingType = "default" | "submitting" | "submitted" | "error";

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
      defaultValue: "Thông tin chi tiết",
      description: "/**Title of the modal*/",
      control: "text",
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
      defaultValue: MODAL_SIZE.SIZE_520,
    },
  },
};

const Template: Story = (args) => {
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
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        show modal
      </Button>
      <Modal
        visible={visible}
        handleSave={handleOnClick}
        handleApplyNext={handleOnClick}
        handleCancel={handleCancel}
        title="Modal Title"
        loadingType={loadingType}
        {...args}
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
};

export const Default = Template.bind({});
