import React from "react";
import AdvanceDateRangeFilter from "./AdvanceDateRangeFilter";
import { BORDER_TYPE } from "../../../config/enum";
import FormItem from "../../FormItem/FormItem";
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
  title: "AdvanceFilter/AdvanceDateRangeFilter",
  component: AdvanceDateRangeFilter,
  subcomponents: { AdvanceDateRangeFilter },
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
      defaultValue: "Ngày tạo",
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
    value: {},
    dateFormat: {},
    className: {},
    isSmall: {},
    isRequired: {},
    disabled: {},
    placeholder: {},
    onChange: {},
    action: {},
  },
};

const Template: Story = (args) => {
  const [value, setValue] = React.useState<[any, any]>([null, null]);

  const handleChange = React.useCallback((dateMoment, dateString) => {
    setValue(dateMoment);
  }, []);

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <div style={{ margin: "10px", width: "300px" }}>
        <FormItem message={"Helper text"}>
          <AdvanceDateRangeFilter
            {...args}
            onChange={handleChange}
            values={value}
          />
        </FormItem>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
