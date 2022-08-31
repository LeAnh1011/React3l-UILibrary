import { Story } from "@storybook/react";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title
} from "@storybook/addon-docs";
import React from "react";
import { StringFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import Pagination from "./Pagination";
class DemoFilter extends ModelFilter {
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

export default {
  title: "Table/Pagination",
  component: Pagination,
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
};

const Template: Story = (args) => {
  const [filter, setFilter] = React.useState<DemoFilter>(new DemoFilter());

  const handlePagination = React.useCallback(
    (skip: number, take: number) => {
      setFilter({ ...filter, skip, take });
    },
    [filter, setFilter]
  );
  return (
    <div>
      <Pagination
      {...args}
        skip={filter.skip}
        take={filter.take}
        onChange={handlePagination}
      />
      
    </div>
  );
}

export const Default = Template.bind({});
