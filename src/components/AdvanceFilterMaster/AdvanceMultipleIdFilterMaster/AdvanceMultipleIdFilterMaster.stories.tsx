import React from "react";
import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { Observable, Subscription } from "rxjs";
import nameof from "ts-nameof.macro";
import AdvanceMultipleIdFilterMaster from "./AdvanceMultipleIdFilterMaster";
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

const demoObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next([
      { id: 4, name: "Ban hành chính", code: "FAD" },
      {
        id: 1,
        name: "Ban công nghệ thông tin Ban công nghệ thông tin",
        code: "FIM",
      },
      { id: 2, name: "Ban nhân sự", code: "FHR" },
      { id: 3, name: "Ban tài chính", code: "FAF" },
      { id: 5, name: "Ban đời sống", code: "DSS" },
      { id: 6, name: "Ban nội vụ", code: "DUH" },
      { id: 7, name: "Ban lao động", code: "FJIP" },
      { id: 8, name: "Ban thể thao", code: "FJUI" },
    ]);
  }, 1000);
});

const list = [
  { id: 9, name: "Phòng Muti Media", code: "MEDIA" },
  { id: 10, name: "Phòng truyền thông", code: "PTT" },
];

class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

const filterValue = new DemoFilter();
filterValue.id.in = [10, 9, 4, 6];

const demoSearchFunc = (TModelFilter?: ModelFilter) => {
  return demoObservable;
};

export default {
  title: "AdvanceFilterMaster/AdvanceMultipleIdFilterMaster",
  component: AdvanceMultipleIdFilterMaster,
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
      defaultValue: "Đơn vị tổ chức",
    },
    placeHolder: {
      defaultValue: "Chọn đơn vị",
    },

    maxLength: {
      defaultValue: 200,
    },
    maxLengthItem: {
      defaultValue: 30,
    },
  },
};

const Template: Story = (args) => {
  const [filter, setFilter] = React.useState(new DemoFilter());

  React.useEffect(() => {
    const subscription = new Subscription();
    if (!filter.id.in) {
      setFilter({
        ...filter,
        id: { in: [10, 9, 4, 6] },
      });
    }
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, [filter]);

  const handleChangeFilter = React.useCallback(
    (listItemm, ids) => {
      setFilter({ ...filter, id: { in: ids } });
    },
    [filter]
  );

  return (
    <div style={{ margin: "10px", width: "250px" }}>
      <AdvanceMultipleIdFilterMaster
        {...args}
        values={filter?.id?.in}
        classFilter={DemoFilter}
        searchProperty={nameof(DemoFilter.name)}
        onChange={handleChangeFilter}
        getList={demoSearchFunc}
        preferOptions={list}
      />
    </div>
  );
};

export const Default = Template.bind({});
