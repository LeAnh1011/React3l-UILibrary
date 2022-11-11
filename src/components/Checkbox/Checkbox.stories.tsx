import { Story } from "@storybook/react";
import React from "react";
import Checkbox from './Checkbox';

export default {
  title: "Checkbox",
  component: Checkbox,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    checked: {
      defaultValue: false
    },
  },
};

const Template: Story = (args) => {

  const [checked, setChecked] = React.useState<boolean>(false);

  const handleChangeChecked = React.useCallback((value) => {
    setChecked(value);
  }, [])

  return (
    <div>
      <div>
        <div style={{ margin: "10px", width: "500px" }}>
          <Checkbox {...args} checked={checked || args.checked} onChange={handleChangeChecked} />
        </div>
      </div>

    </div>
  );
}

export const Default = Template.bind({});