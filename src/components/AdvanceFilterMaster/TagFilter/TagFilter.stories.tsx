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
import { useTranslation } from "react-i18next";
import {
  DateFilter,
  IdFilter,
  NumberFilter,
  StringFilter,
} from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { Observable } from "rxjs";
import AdvanceDateRangeFilterMaster from "../AdvanceDateRangFilterMaster/AdvanceDateRangFilterMaster";
import AdvanceInputRangeFilter from "../../AdvanceFilter/AdvanceInputRangeFilter/AdvanceInputRangeFilter";
import AdvanceIdFilterMaster from "../AdvanceIdFilterMaster/AdvanceIdFilterMaster";
import AdvanceMultipleIdFilterMaster from "../AdvanceMultipleIdFilterMaster/AdvanceMultipleIdFilterMaster";
import TagFilter from "./TagFilter";
class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
  createdAt: DateFilter = new DateFilter();
  updatedAt: DateFilter = new DateFilter();
  total: NumberFilter = new NumberFilter();
  appUserId: IdFilter = new IdFilter();
  organizationId: IdFilter = new IdFilter();
}

const orgObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next([
      { id: 4, name: "Ban hành chính", code: "FAD" },
      { id: 10, name: "Ban công nghệ thông tin", code: "FIM" },
      { id: 2, name: "Ban nhân sự", code: "FHR" },
      { id: 3, name: "Ban tài chính", code: "FAF" },
      { id: 5, name: "Ban đời sống", code: "DSS" },
      { id: 6, name: "Ban nội vụ", code: "DUH" },
      { id: 7, name: "Ban lao động", code: "FJIP" },
      { id: 8, name: "Ban thể thao", code: "FJUI" },
    ]);
  }, 1000);
});

const appUserObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next([
      { id: 4, displayName: "Lê Đại M", code: "FAD" },
      { id: 10, displayName: "Nguyễn Văn A", code: "FIM" },
      { id: 2, displayName: "Bùi Văn V", code: "FHR" },
      { id: 3, displayName: "Phạm Thị H", code: "FAF" },
    ]);
  }, 1000);
});

const orgSearchFunc = (TModelFilter?: ModelFilter) => {
  return orgObservable;
};

const appUserSearchFunc = (TModelFilter?: ModelFilter) => {
  return appUserObservable;
};

export default {
  title: "AdvanceFilterMaster/TagFilter",
  component: TagFilter,
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
  argTypes: {},
};
const Template: Story = (args) => {
  const filterValue = React.useMemo(() => {
    const filterValue = new DemoFilter();
    return filterValue;
  }, []);

  const [translate] = useTranslation();

  const [filter, setFilter] = React.useState<DemoFilter>(filterValue);
  const [item, setItem] = React.useState<any>(null);
  const [value, setValue] = React.useState<[any, any]>([null, null]);

  const handleChangeOrganization = React.useCallback(
    (id, item) => {
      filter.appUserId.equal = id;
      filter["appUserValue"] = item;
      setFilter({ ...filter });
    },
    [filter]
  );

  const handleChangeFilter = React.useCallback(
    (listItem) => {
      filter.organizationId.in = listItem.map((currentItem) => currentItem.id);
      filter["organizationValue"] = listItem;
      setFilter({ ...filter });
    },
    [filter]
  );

  const handleChangeFilterTotal = React.useCallback(
    (value) => {
      filter.total.lessEqual = value[1];
      filter.total.greaterEqual = value[0];

      setFilter({ ...filter });
    },
    [filter]
  );

  const handleChange = React.useCallback(
    (item, dateMoment) => {
      if (dateMoment && dateMoment.length > 0) {
        filter.createdAt["lessEqual"] = dateMoment[1];
        filter.createdAt["greaterEqual"] = dateMoment[0];
      }
      setItem(item);
      setFilter({ ...filter });
      setValue(dateMoment);
    },
    [filter]
  );

  const handleClear = React.useCallback(() => {
    setItem(null);
    setValue([null, null]);
  }, []);

  const handleChangeAllFilter = React.useCallback(
    (data: any) => {
      setFilter({ ...data });
    },
    [setFilter]
  );
  return (
    <div style={{ margin: "10px", width: "1000px" }}>
      <div style={{ width: "300px" }}>
        <AdvanceIdFilterMaster
          value={filter?.appUserId?.equal}
          placeHolder={"Tìm kiếm..."}
          classFilter={DemoFilter}
          valueFilter={filter}
          searchProperty={"name"}
          onChange={handleChangeOrganization}
          getList={appUserSearchFunc}
          label={"Người vận chuyển"}
          render={(t) => t?.displayName}
        />

        <AdvanceMultipleIdFilterMaster
          values={filter?.organizationId?.in}
          placeHolder={"Tìm kiếm..."}
          classFilter={DemoFilter}
          searchProperty={"name"}
          onChange={handleChangeFilter}
          getList={orgSearchFunc}
          label={"Đơn vị"}
        />

        <AdvanceDateRangeFilterMaster
          label={"Ngày giao hàng"}
          onChange={handleChange}
          activeItem={item}
          value={value}
          translate={translate}
          // label={"Ngày giao hàng"}
        />
        <AdvanceInputRangeFilter
          placeHolderRange={["From...", "To..."]}
          valueRange={[
            filter?.total?.greaterEqual as number,
            filter?.total?.lessEqual as number,
          ]}
          onChangeRange={handleChangeFilterTotal}
          label={"Tổng hàng xuất kho"}
        />
      </div>
      <TagFilter
        {...args}
        value={filter}
        mappingField={{ appUserId: "displayName" }}
        keyTranslate={"demo"}
        onClear={handleClear}
        handleChangeFilter={handleChangeAllFilter}
        exceptField={["appUserId"]}
      />
    </div>
  );
};

export const Default = Template.bind({});
