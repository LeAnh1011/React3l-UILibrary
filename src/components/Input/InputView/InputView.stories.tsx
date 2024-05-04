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
import FormItem from "../../FormItem/FormItem";
import { BORDER_TYPE } from "../../../config/enum";
import InputView from "./InputView";
export default {
  title: "Input/InputView",
  component: InputView,
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
    maxLength: {
      control: "number",
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
          BORDER_TYPE.NOT_BORDERED,
        ],
      },
      defaultValue: 1,
    },
  },
};

const Template: Story = (args) => {
  const [inputValue] = React.useState(
    "asfdsadasdfv asfdsadasdfv asfdsadasdfv asfdsadasdfv asfdsadasdfvasfdsadasdfv asfdsadasdfv asfdsadasdfv"
  );

  return (
    <div style={{ width: "300px", padding: "10px" }}>
      <div style={{ margin: "15px 0" }}>
        <FormItem>
          <InputView {...args} label="First Name" value={inputValue} />
        </FormItem>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
