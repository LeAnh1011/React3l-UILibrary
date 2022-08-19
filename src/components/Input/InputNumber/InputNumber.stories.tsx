import { ComponentMeta, Story } from "@storybook/react";
import React from "react";
import FormItem from "../../FormItem/FormItem";
import { BORDER_TYPE } from "./../../../config/enum";
import InputNumber, { LONG } from "./InputNumber";

export default {
  title: "Input/InputNumber",
  component: InputNumber,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    type: {
      control: 'select',
      defaultValue:  BORDER_TYPE.MATERIAL
    }
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


