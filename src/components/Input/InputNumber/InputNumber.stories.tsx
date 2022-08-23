import { ComponentMeta, Story } from "@storybook/react";
import React from "react";
import FormItem from "../../FormItem/FormItem";
import { BORDER_TYPE } from "./../../../config/enum";
import InputNumber from "./InputNumber";

export default {
  title: "Input/InputNumber",
  component: InputNumber,
  subcomponents: { FormItem },
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'First Name'
    },
    placeHolder: {
      control: 'text',
      defaultValue: 'Enter number'
    },
    type: {
      control: { type: 'radio', options: [BORDER_TYPE.MATERIAL, BORDER_TYPE.FLOAT_LABEL, BORDER_TYPE.BORDERED] },
      defaultValue: 0
    },
  }
} as ComponentMeta<typeof InputNumber>;

const Template: Story = (args) => {
  const [iconName] = React.useState("");

  const [value, setValue] = React.useState();

  const handleChangeValue = React.useCallback((value) => {
    setValue(value);
  }, []);

  return (
    <div style={{ width: "300px", margin: "10px" }}>
      <div style={{ margin: "15px 0" }}>
        <FormItem
          message="Helper"
          // validateStatus={isValidated ? ValidateStatus.error : null}
        >
          <InputNumber
          {...args}
            className={iconName}
            value={value}
            onChange={handleChangeValue}
          />
        </FormItem>
      </div>
    </div>
  );
};

export const Default = Template.bind({});


