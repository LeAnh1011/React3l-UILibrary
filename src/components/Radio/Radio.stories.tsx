import { Story } from "@storybook/react";
import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs";
import React from "react";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";

export default {
  title: "Radio",
  component: Radio,
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
    checked: {
      defaultValue: false,
    },
  },
};

const Template: Story = (args) => {
  const [checked, setChecked] = React.useState<boolean>(false);

  const handleChangeChecked = React.useCallback((e: any) => {
    setChecked(e);
  }, []);

  return (
    <div>
      <div>
        <div style={{ margin: "10px", width: "500px" }}>
          <RadioGroup onChecked={handleChangeChecked} value={checked}>
            <Radio {...args} value={1}>
              Value 1
            </Radio>
            <Radio {...args} value={2}>
              Value 2
            </Radio>
            <Radio {...args} value={3}>
              Value 3
            </Radio>
            <Radio {...args} value={4}>
              Value 4
            </Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
