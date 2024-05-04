import { Add, ChevronDown } from "@carbon/icons-react";
import {
  ArgsTable,
  Description,
  Heading,
  Primary,
  PRIMARY_STORY,
  Source,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs";
import { Story } from "@storybook/react";
import { ColumnProps } from "antd/lib/table";
// import { Model } from "react3l-common";
import { Key, RowSelectionType } from "antd/lib/table/interface";
import React, { useMemo } from "react";
import { StringFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import dedent from "ts-dedent";
import Button from "../Button/Button";
import ActionBarComponent from "./ActionBarComponent/ActionBarComponent";
import { dataSource } from "./data";
import OneLineText from "./DataCellComponent/OneLineText/OneLineText";
import TwoLineText from "./DataCellComponent/TwoLineText/TwoLineText";
import LayoutCell from "./LayoutCell/LayoutCell";
import LayoutHeader from "./LayoutHeader/LayoutHeader";
import Pagination from "./Pagination/Pagination";
import StandardTable from "./StandardTable";
import "./StandardTable.scss";
import { StandardTableDefault } from "./StandardTableStories";

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

export default {
  title: "Table/StandardTable",
  component: StandardTable,
  subcomponents: { LayoutHeader, LayoutCell, OneLineText, TwoLineText },
  parameters: {
    controls: { expanded: true },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description children="_A table displays rows of data._" />
          <Primary />
          <Heading children={"DataSource"} />
          <Source
            language="js"
            code={dedent`
          const dataSource = [
            {
              id: 100,
              key: 1,
              code: "/landing-page",
              name: "Cổng thông tin doanh nghiệp",
              description: "mô tả hihi",
              lightIcon:
                "/rpc/utils/public-file/download/site/20220715/6e511d35-411a-4580-b189-02f9106e82ff.png",
              lightLogo:
                "/rpc/utils/public-file/download/site/20220715/572c85b8-4dd5-4832-9bfc-8cb9e7a5b072.png",
              darkIcon:
                "/rpc/utils/public-file/download/site/20220715/507d2788-76f8-4470-aceb-5a961778e3c3.png",
              darkLogo:
                "/rpc/utils/public-file/download/site/20220715/a8dfc993-18e0-48e6-a600-e3ce03d61448.png",
              colorCode: null,
              isDisplay: true,
              themeId: null,
              siteTypeId: 3,
              siteType: {
                id: 3,
                code: "Setting",
                name: "Cài đặt",
              },
            },
            {
              id: 18,
              key: 2,
              code: "/construction/",
              name: "CONSTRUCTION",
              description: null,
              lightIcon: null,
              lightLogo: null,
              darkIcon: null,
              darkLogo: null,
              colorCode: null,
              isDisplay: false,
              themeId: null,
              siteTypeId: 3,
              siteType: {
                id: 3,
                code: "Setting",
                name: "Cài đặt",
              },
            },
          ]
        `}
          />
          <Heading children={"Columns"} />
          <Source
            language="ts"
            code={dedent`
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
                  <LayoutCell orderType={ORDER_TYPE.LEFT} tableSize={SIZE_TYPE.LARGE}>
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
                  <LayoutCell orderType={ORDER_TYPE.LEFT} tableSize={SIZE_TYPE.LARGE}>
                    <OneLineText
                      avatar={KateBishop}
                      avatarType={avatarType}
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
                  ({ column }) => column.key === "taxCode"
                );
                return (
                  <div>
                    <LayoutHeader
                      orderType={ORDER_TYPE.LEFT}
                      title="TaxCode"
                      sortedColumn={sortedColumn}
                      isSorter
                    />
                  </div>
                );
              },
              dataIndex: "taxCode",
              key: "taxCode",
              sorter: true,
              ellipsis: true,
              render(...[taxCode]) {
                return (
                  <LayoutCell orderType={ORDER_TYPE.LEFT} tableSize={SIZE_TYPE.LARGE}>
                    <OneLineText value={taxCode} link="/ksjhdfkshj" />
                  </LayoutCell>
                );
              },
            },
            {
              title: ({ sortColumns }) => {
                const sortedColumn = sortColumns?.find(
                  ({ column }) => column.key === "appUserId"
                );
                return (
                  <div>
                    <LayoutHeader
                      orderType={ORDER_TYPE.LEFT}
                      title="AppUser"
                      sortedColumn={sortedColumn}
                      isSorter
                    />
                  </div>
                );
              },
              dataIndex: "appUserId",
              key: "appUser",
              sorter: true,
              ellipsis: true,
              render(...[appUser]) {
                return (
                  <LayoutCell orderType={ORDER_TYPE.LEFT} tableSize={SIZE_TYPE.LARGE}>
                    <OneLineText icon="tio-calendar_month" value={appUser?.displayName} />
                  </LayoutCell>
                );
              },
            },
            
            {
              title: <LayoutHeader orderType={ORDER_TYPE.LEFT} title="Action" />,
              key: "status",
      
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
              key: "id",
              width: 80,
              fixed: "right",
              ellipsis: true,
              dataIndex: "id",
              render() {
                return (
                  <div className="d-flex align-items-center justify-content-center">
                    <OverflowMenu size="md" list={list}></OverflowMenu>
                  </div>
                );
              },
            },
           
          ],
          [avatarType, list, orderType, size]
        );
        `}
          />
          <Heading children={"LayoutHeader"} />
          <Description children="LayoutHeader Description ...." />
          <Source
            language="ts"
            code={dedent`
            <LayoutHeader
              orderType={ORDER_TYPE.LEFT}
              title="Site Type"
              sortedColumn={sortedColumn}
              isSorter
            />
            `}
          />
          <Heading children={"LayoutCell"} />
          <Description children="LayoutCell Description ...." />
          <Source
            language="js"
            code={dedent`
            <LayoutCell orderType={ORDER_TYPE.LEFT} tableSize={SIZE_TYPE.LARGE}>
              ...
            </LayoutCell>
            `}
          />
          <Heading children={"OneLineText"} />
          <Description children="OneLineText Description ...." />
          <Source
            language="js"
            code={dedent`
            <OneLineText value={'Value'} countCharacters={20} />`}
          />

          <Heading children={"TwoLineText"} />
          <Description children="TwoLineText Description ...." />
          <Source
            language="js"
            code={dedent`
            <TwoLineText
                avatar={KateBishop}
                avatarType={avatarType}
                valueLine1={version}
                valueLine2={"facebook"}
                link="/ksdjflsf"
              />`}
          />
          <Heading children={"StatusLine"} />
          <Description children="StatusLine Description ...." />
          <Source
            language="js"
            code={dedent`
            <StatusLine value={status} color="red" />`}
          />
          <Heading children={"Sorting"} />
          <Description
            markdown={dedent`
            Insert description here.
          `}
          />
          <Source
            language="js"
            code={dedent`
              title: ({ sortColumns }) => {
                const sortedColumn = sortColumns?.find(
                  ({ column }) => column.key === "appUserId"
                );
                return (
                  <div>
                    <LayoutHeader
                      orderType={ORDER_TYPE.LEFT}
                      title="AppUser"
                      sortedColumn={sortedColumn}
                      isSorter
                    />
                  </div>
                );
              },
        `}
          />
          <Heading children={"RowSelection"} />
          <Description
            markdown={dedent`
            Insert description here.
          `}
          />
          <Source
            language="js"
            code={dedent`
            const typeRowSelection: RowSelectionType = "checkbox";
            const [selectedRowKeys, setSelectedRowKeys] = React.useState<Key[]>([10]);
          
            const rowSelection = {
              onChange(selectedKeys: Key[]) {
                setSelectedRowKeys(selectedKeys);
              },
              selectedRowKeys,
              type: typeRowSelection,
              getCheckboxProps: (record) => {
                return {
                  disabled: record.id === 10 || record.id === 100,
                };
              },
            };
        `}
          />

          <Stories title="" />
          <Source
            language="js"
            code={dedent`
            const expandable = {
              expandedRowRender: expandedRowRender, // collums setup
              expandIcon: ({ expanded, onExpand, record }) =>
                expanded ? (
                  <ChevronUp16 onClick={(e) => onExpand(record, e)} />
                ) : (
                  <ChevronDown16 onClick={(e) => onExpand(record, e)} />
                ),
            };
        `}
          />
          <Description />
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
    },
  },
  argTypes: {
    isDragable: {},
    className: {},
    tableSize: {},
    spinning: {},
  },
};

const Template: Story = (args) => {
  const [filter, setFilter] = React.useState<DemoFilter>(new DemoFilter());
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLoading = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const handlePagination = React.useCallback(
    (skip: number, take: number) => {
      setFilter({ ...filter, skip, take });
      // if (typeof handleSearch === "function") {
      //   handleSearch();
      // }
    },
    [filter, setFilter]
  );

  const typeRowSelection: RowSelectionType = "checkbox";
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<Key[]>([10]);

  const rowSelection = {
    onChange(selectedKeys: Key[]) {
      setSelectedRowKeys(selectedKeys);
    },
    selectedRowKeys,
    type: typeRowSelection,
    getCheckboxProps: (record) => {
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
        {...args}
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        loading={loading}
        // scroll={{ x: 1900 }}
      />
      <div>
        <Pagination
          skip={filter.skip}
          take={filter.take}
          total={100}
          onChange={handlePagination}
        />
      </div>
      <div>
        <div>
          <Button type="primary" className="btn--lg" onClick={handleLoading}>
            {"Button"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
export const Expanded = StandardTableDefault.bind({});
