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
import { BORDER_TYPE } from "./../../../config/enum";
import AdvanceNumberFilter, { DECIMAL, LONG } from "./AdvanceNumberFilter";


export default {
  title: "AdvanceFilter/AdvanceNumberFilter",
  component: AdvanceNumberFilter,
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
      defaultValue: "First name",
    },
    placeHolder: {
      defaultValue: "Search...",
    },
    prefix: {
      defaultValue: "Mr.",
    },
    suffix: {
      defaultValue: "Kg",
    },
    maxLength: {
      defaultValue: 100,
    },
    numberType: {
      defaultValue: LONG,
      control: {
        type: "radio",
        options: [
          LONG,
          DECIMAL,
        ],
      },
    },
    type: {
      control: {
        type: "radio",
        options: [
          BORDER_TYPE.MATERIAL,
          BORDER_TYPE.FLOAT_LABEL,
          BORDER_TYPE.BORDERED,
        ],
      },
      defaultValue: 0,
    },
  },
};


const Template: Story = (args) => {

  const [value, setValue] = React.useState();

  const handleChangeValue = React.useCallback((value) => {
    setValue(value);
  }, []);

  return (
    <div style={{ width: "300px", margin: "10px" }}>
      <div style={{ margin: "15px 0" }}>
          <AdvanceNumberFilter
          {...args}
            value={value}
            onChange={handleChangeValue}
          />
      </div>
    </div>
  );
}


export const Default = Template.bind({});