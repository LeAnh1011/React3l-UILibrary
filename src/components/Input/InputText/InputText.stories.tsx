import React from "react";
import FormItem from "../../FormItem/FormItem";
import { BORDER_TYPE } from "./../../../config/enum";
import InputText from "./InputText";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs";
import { ComponentMeta, Story } from "@storybook/react";

export default {
  title: "Input/InputText",
  component: InputText,
  subcomponents: { FormItem },
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
    label: {
      control: "text",
      defaultValue: "First Name",
    },
    placeHolder: {
      control: "text",
      defaultValue: "Enter text",
    },
    type: {
      control: {
        type: "radio",
        options: [
          BORDER_TYPE.MATERIAL,
          BORDER_TYPE.BORDERED,
          BORDER_TYPE.FLOAT_LABEL,
        ],
      },
      defaultValue: 1,
    },
    isRequired: {},
    value: {},
    prefix: {
      defaultValue: "Mr.",
    },
    suffix: {
      defaultValue: "Kg",
    },
    allowPositive: {},
    isReverseSymb: {},
    decimalDigit: {},
    disabled: {},
    min: {},
    max: {},
    action: {},
    isSmall: {},
    onChange: {},
    onBlur: {},
    onEnter: {},
    onKeyDown: {},
    className: {},
  },
} as ComponentMeta<typeof InputText>;

const Template: Story = (args) => {
  const [value, setValue] = React.useState();

  const handleChangeValue = React.useCallback((value) => {
    setValue(value);
  }, []);

  return (
    <div style={{ width: "300px", margin: "10px" }}>
      <div style={{ margin: "15px 0" }}>
        <FormItem>
          <InputText {...args} value={value} onChange={handleChangeValue} />
        </FormItem>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
