import React from "react";
import { NumberFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import { BORDER_TYPE } from "../../../config/enum";
import AdvanceInputRangeFilter from "./AdvanceInputRangeFilter";
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

class DemoFilter extends ModelFilter {
  number: NumberFilter = new NumberFilter();
}

export default {
  title: "AdvanceFilter/AdvanceInputRangeFilter",
  component: AdvanceInputRangeFilter,
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
    valueRange: {},
    placeHolderRange: {
      defaultValue: ["Từ", "Đến"],
    },
    onChangeRange: {},
    label: {
      control: "text",
      defaultValue: "Tổng doanh thu",
      description: "Label for current field",
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
    isSmall: {},
    isRequired: {
      description: "Prop of InputNumber Component",
    },
    value: {
      description: "Prop of InputNumber Component",
    },
    prefix: {
      description: "Prop of InputNumber Component",
    },
    suffix: {
      description: "Prop of InputNumber Component",
    },
    placeHolder: {
      description: "Prop of InputNumber Component",
    },
    allowNegative: {
      description: "Prop of InputNumber Component",
    },
    numberType: {
      description: "Prop of InputNumber Component",
    },
    decimalDigit: {
      description: "Prop of InputNumber Component",
    },
    isReverseSymb: {
      description: "Prop of InputNumber Component",
    },
    disabled: {
      description: "Prop of InputNumber Component",
    },
    className: {
      description: "Prop of InputNumber Component",
    },
    min: {
      description: "Prop of InputNumber Component",
    },
    max: {
      description: "Prop of InputNumber Component",
    },
    action: {
      description: "Prop of InputNumber Component",
    },
    onChange: {
      description: "Prop of InputNumber Component",
    },
    onBlur: {
      description: "Prop of InputNumber Component",
    },
    onEnter: {
      description: "Prop of InputNumber Component",
    },
  },
};

const Template: Story = (args) => {
  const [filter, dispatch] = React.useState<DemoFilter>(new DemoFilter());
  const [numberRange, setNumberRange] = React.useState<[]>([]);

  const handleChangeFilter = React.useCallback(
    (value) => {
      setNumberRange({ ...value });
      dispatch({
        ...filter,
        number: { lessEqual: value[0], greaterEqual: value[1] },
      });
    },
    [filter]
  );

  return (
    <div style={{ width: "300px", margin: "10px" }}>
      <div style={{ margin: "10px", width: "250px" }}>
        <AdvanceInputRangeFilter
          {...args}
          valueRange={numberRange}
          onChangeRange={handleChangeFilter}
        />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
