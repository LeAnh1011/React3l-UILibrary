import { Add, ChevronDown, ChevronUp } from "@carbon/icons-react";
import { Story } from "@storybook/react";
import { ColumnProps } from "antd/lib/table";
// import { Model } from "react3l-common";
import { Key, RowSelectionType } from "antd/lib/table/interface";
import React, { useMemo } from "react";
import { StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { of } from "rxjs";
import Button from "../Button/Button";
import Select from "../Select/SingleSelect/Select";
import ActionBarComponent from "./ActionBarComponent/ActionBarComponent";
import BadgeText from "./DataCellComponent/BadgeText/BadgeText";
import OneLineText from "./DataCellComponent/OneLineText/OneLineText";
import StatusLine from "./DataCellComponent/StatusLine/StatusLine";
import LayoutCell from "./LayoutCell/LayoutCell";
import LayoutHeader from "./LayoutHeader/LayoutHeader";
import Pagination from "./Pagination/Pagination";
import StandardTable from "./StandardTable";
import "./StandardTable.scss";
import { dataSource } from "./data";

const KateBishop =
  "https://cdn.searchenginejournal.com/wp-content/uploads/2019/07/the-essential-guide-to-using-images-legally-online-1520x800.png";

class DemoFilter extends ModelFilter {
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}
enum AVATAR_TYPE {
  CIRCLE = "circle",
  SQUARE = "square",
}
enum SIZE_TYPE {
  LARGE = "lg",
  MEDIUM = "md",
  SMALL = "sm",
}
enum ORDER_TYPE {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
}

export const StandardTableDefault: Story = (args) => {
  const [filter, setFilter] = React.useState<DemoFilter>(new DemoFilter());
  // const [loading, setLoading] = React.useState<boolean>(false);
  const [selectModel, setSelectModel] = React.useState<Model>({
    id: 0,
    name: "Option 2",
    code: "FAD",
  });
  const handleRenderModel = React.useCallback((item: Model) => {
    if (item) {
      return item.name;
    } else {
      return "";
    }
  }, []);
  const handleSetModel = React.useCallback((...[, item]) => {
    setSelectModel(item);
  }, []);
  const demoListEnum = (TModelFilter?: ModelFilter) => {
    return of([
      {
        id: 1,
        name:
          "Option 2 very long one very long one Option 2 very long one very long one",
        code: "E1",
      },
      { id: 2, name: "Enum 2", code: "E2" },
      { id: 3, name: "Enum 3", code: "E3" },
      { id: 4, name: "Enum 4", code: "E4" },
      { id: 5, name: "Enum 5", code: "E5" },
    ]);
  };

  const handlePagination = React.useCallback(
    (skip: number, take: number) => {
      setFilter({ ...filter, skip, take });
      // if (typeof handleSearch === "function") {
      //   handleSearch();
      // }
    },
    [filter, setFilter]
  );

  const expandedRowRender = () => {
    const columns: ColumnProps<any>[] = [
      {
        title: <LayoutHeader orderType={ORDER_TYPE.LEFT} title="Title" />,
        dataIndex: "type",
        key: "type",
        width: 135,
        ellipsis: true,
        render(...[type]) {
          return (
            <LayoutCell orderType={ORDER_TYPE.LEFT} tableSize={SIZE_TYPE.LARGE}>
              <Select
                placeHolder={"Select Organization"}
                value={selectModel}
                searchProperty={"name"}
                render={handleRenderModel}
                onChange={handleSetModel}
                getList={demoListEnum}
                classFilter={DemoFilter}
                type={type}
                appendToBody={true}
              />
            </LayoutCell>
          );
        },
      },

      {
        title: <LayoutHeader orderType={ORDER_TYPE.LEFT} title="Version" />,
        dataIndex: "version",
        key: "version",
        width: 135,
        ellipsis: true,
        render(...[version]) {
          return (
            <LayoutCell orderType={ORDER_TYPE.LEFT} tableSize={SIZE_TYPE.LARGE}>
              <OneLineText value={`version`} />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={ORDER_TYPE.LEFT} title="Creator" />,
        dataIndex: "creator",
        key: "creator",
        width: 135,
        ellipsis: true,
        align: "center",
        render(...[creator]) {
          return (
            <LayoutCell orderType={ORDER_TYPE.LEFT} tableSize={SIZE_TYPE.LARGE}>
              <BadgeText
                value={creator}
                backgroundColor="#FFECB3"
                color="#ED6700"
              />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={ORDER_TYPE.LEFT} title="Action" />,
        key: "status",
        width: 150,
        ellipsis: true,
        dataIndex: "status",
        render(...[status]) {
          return (
            <LayoutCell orderType={ORDER_TYPE.LEFT} tableSize={SIZE_TYPE.LARGE}>
              <StatusLine value={status} color="red" />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={ORDER_TYPE.LEFT} title="Version" />,
        dataIndex: "version",
        key: "version",
        width: 135,
        ellipsis: true,
        render(...[version]) {
          return (
            <LayoutCell orderType={ORDER_TYPE.LEFT} tableSize={SIZE_TYPE.LARGE}>
              <OneLineText value={`version`} countCharacters={20} />
            </LayoutCell>
          );
        },
      },
    ];

    return (
      <div className="expand-table-box">
        <StandardTable
          columns={columns}
          dataSource={dataSource}
          isDragable={true}
          tableSize={SIZE_TYPE.LARGE}
          isLevel2={true}
        />
      </div>
    );
  };
  const typeRowSelection: RowSelectionType = "checkbox";
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<Key[]>([10]);

  const rowSelection = {
    onChange(selectedKeys: Key[]) {
      setSelectedRowKeys(selectedKeys);
    },
    selectedRowKeys,
    type: typeRowSelection,
    getCheckboxProps: (record: any) => {
      return {
        disabled: record.id === 10 || record.id === 100,
      };
    },
  };

  const columns: ColumnProps<any>[] = useMemo(
    () => [
      {
        title: ({ sortColumns }) => {
          const sortedColumn = sortColumns?.find(
            ({ column }) => column.key === "code"
          );
          return (
            <div>
              <LayoutHeader
                orderType={ORDER_TYPE.LEFT}
                title="Code"
                sortedColumn={sortedColumn}
                isSorter
              />
            </div>
          );
        },
        dataIndex: "code",
        key: "code",
        sorter: true,
        width: 135,
        fixed: "left",
        ellipsis: true,
        render(...[code]) {
          return (
            <LayoutCell orderType={ORDER_TYPE.LEFT} tableSize={args?.tableSize}>
              <OneLineText value={code} countCharacters={5} />
            </LayoutCell>
          );
        },
      },
      {
        title: ({ sortColumns }) => {
          const sortedColumn = sortColumns?.find(
            ({ column }) => column.key === "name"
          );
          return (
            <div>
              <LayoutHeader
                orderType={ORDER_TYPE.LEFT}
                title="Name"
                sortedColumn={sortedColumn}
                isSorter
              />
            </div>
          );
        },
        dataIndex: "name",
        key: "name",
        sorter: true,

        ellipsis: true,
        render(...[name]) {
          return (
            <LayoutCell orderType={ORDER_TYPE.LEFT} tableSize={args?.tableSize}>
              <OneLineText
                avatar={KateBishop}
                avatarType={AVATAR_TYPE.CIRCLE}
                value={name}
                link="https://www.youtube.com/"
                avatarSize={SIZE_TYPE.LARGE}
              />
            </LayoutCell>
          );
        },
      },
      {
        title: ({ sortColumns }) => {
          const sortedColumn = sortColumns?.find(
            ({ column }) => column.key === "siteType"
          );
          return (
            <div>
              <LayoutHeader
                orderType={ORDER_TYPE.LEFT}
                title="Site Type"
                sortedColumn={sortedColumn}
                isSorter
              />
            </div>
          );
        },
        dataIndex: "siteType",
        key: "siteType",
        sorter: true,

        ellipsis: true,
        render(...[siteType]) {
          return (
            <LayoutCell orderType={ORDER_TYPE.LEFT} tableSize={args?.tableSize}>
              <OneLineText value={siteType?.name} />
            </LayoutCell>
          );
        },
      },
    ],
    [args?.tableSize]
  );

  const expandable = {
    expandedRowRender: expandedRowRender,
    expandIcon: ({ expanded, onExpand, record }: any) =>
      expanded ? (
        <ChevronUp size={16} onClick={(e) => onExpand(record, e)} />
      ) : (
        <ChevronDown size={16} onClick={(e) => onExpand(record, e)} />
      ),
  };

  return (
    <div>
      <ActionBarComponent
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      >
        <Button
          type="ghost-primary"
          className="btn--lg"
          icon={<Add size={16} />}
        >
          {"Button"}
        </Button>
        <Button
          type="ghost-primary"
          className="btn--lg"
          icon={<ChevronDown size={16} />}
        >
          {"Button"}
        </Button>
      </ActionBarComponent>
      <StandardTable
        columns={columns}
        dataSource={dataSource}
        isDragable={true}
        isExpandable={true}
        rowSelection={rowSelection}
        expandable={expandable}
        // loading={loading}
      />
      <div>
        <Pagination
          skip={filter.skip}
          take={filter.take}
          total={100}
          onChange={handlePagination}
        />
      </div>
    </div>
  );
};
