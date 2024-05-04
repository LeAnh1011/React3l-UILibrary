import React from "react";
import { BORDER_TYPE } from "./../../../config/enum";
import AdvanceStringFilter from "./AdvanceStringFilter";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs";
import { Story } from "@storybook/react";

export default {
  title: "AdvanceFilter/AdvanceStringFilter",
  component: AdvanceStringFilter,
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
    onKeyDown: {},
  },
};

const Template: Story = (args) => {
  const [inputValue, setInputVal] = React.useState();

  const handleChangeValue = React.useCallback((value) => {
    setInputVal(value);
  }, []);

  return (
    <div style={{ width: "300px", padding: "10px" }}>
      <div style={{ margin: "15px 0" }}>
        <AdvanceStringFilter
          {...args}
          value={inputValue}
          onChange={handleChangeValue}
        />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
