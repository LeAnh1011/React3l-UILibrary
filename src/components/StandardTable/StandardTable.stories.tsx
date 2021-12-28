import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import React, { useMemo } from "react";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import "./StandardTable.scss";
import StandardTable from "./StandardTable";
// import { Model } from "react3l-common";
import { Key, RowSelectionType } from "antd/lib/table/interface";
import yomatoImg from "../../assets/image/yo.jpg";
import LayoutHeader from "./LayoutHeader/LayoutHeader";
import LayoutCell from "./LayoutCell/LayoutCell";
import { ModelFilter } from "react3l-common";
import ActionBarComponent from "./ActionBarComponent/ActionBarComponent";
import BadgeText from "./DataCellComponent/BadgeText/BadgeText";
import TwoLineText from "./DataCellComponent/TwoLineText/TwoLineText";
import OneLineText from "./DataCellComponent/OneLineText/OneLineText";
import StatusLine from "./DataCellComponent/StatusLine/StatusLine";
import { ColumnProps } from "antd/lib/table";
import { Button } from "antd";
import { Tabs } from "antd";
import Pagination from "./Pagination/Pagination";
import { ChevronDown16, ChevronUp16 } from "@carbon/icons-react";
import { StringFilter } from "react3l-advanced-filters";

const { TabPane } = Tabs;
export class DemoFilter extends ModelFilter {
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}
export enum AVATAR_TYPE {
  CIRCLE = "circle",
  SQUARE = "square",
}
export enum SIZE_TYPE {
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
}
export enum ORDER_TYPE {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
}

function Default() {
  const [filter, setFilter] = React.useState<DemoFilter>(new DemoFilter());

  const handlePagination = React.useCallback(
    (skip: number, take: number) => {
      setFilter({ ...filter, skip, take });
      // if (typeof handleSearch === "function") {
      //   handleSearch();
      // }
      console.log(filter);
    },
    [filter, setFilter]
  );
  const [avatarType, setAvatarType] = React.useState<AVATAR_TYPE>(
    AVATAR_TYPE.CIRCLE
  );
  const [size, setSize] = React.useState<SIZE_TYPE>(SIZE_TYPE.LARGE);
  const [orderType, setOrderType] = React.useState<ORDER_TYPE>(ORDER_TYPE.LEFT);
  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setOrderType(event.target.value);
  }, []);
  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setSize(event.target.value);
  }, []);
  const handleChangeAvatarType = React.useCallback(
    (event: RadioChangeEvent) => {
      setAvatarType(event.target.value);
    },
    []
  );

  const expandedRowRender = () => {
    const columns: ColumnProps<any>[] = [
      {
        title: <LayoutHeader orderType={orderType} title="Title" />,
        dataIndex: "type",
        key: "type",
        width: 135,
        ellipsis: true,
        render(...[type]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
              <OneLineText value={type} />
            </LayoutCell>
          );
        },
      },

      {
        title: <LayoutHeader orderType={orderType} title="Version" />,
        dataIndex: "version",
        key: "version",
        width: 135,
        ellipsis: true,
        render(...[version]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
              <OneLineText value={`version`} />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Creator" />,
        dataIndex: "creator",
        key: "creator",
        width: 135,
        ellipsis: true,
        align: "center",
        render(...[creator]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
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
        title: <LayoutHeader orderType={orderType} title="Action" />,
        key: "status",
        width: 150,
        ellipsis: true,
        dataIndex: "status",
        render(...[status]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
              <StatusLine value={status} active={true} />
            </LayoutCell>
          );
        },
      },
    ];

    const data = [];
    for (let i = 0; i < 9; ++i) {
      data.push({
        key: i,
        name: "Screem",
        type: "Diamond",
        location: "Hill",
        weight: "50kg",
        platform: "iOS",
        version: "10.3.4.5654",
        upgradeNum: 500,
        creator: "Jack Gealish",
        status: "hoạt động",
        createdAt: "2014-12-24 23:12:00",
      });
    }
    return (
      <StandardTable
        columns={columns}
        dataSource={data}
        isDragable={true}
        tableSize={size}
        isLevel2={true}
      />
    );
  };
  const typeRowSelection: RowSelectionType = "checkbox";
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<Key[]>([]);

  const rowSelection = {
    onChange(selectedKeys: Key[]) {
      setSelectedRowKeys(selectedKeys);
    },
    selectedRowKeys,
    type: typeRowSelection,
    columnWidth: "45px",
  };

  const columns: ColumnProps<any>[] = useMemo(
    () => [
      {
        title: <LayoutHeader orderType={orderType} title="Title" />,
        dataIndex: "type",
        key: "type",
        sorter: true,
        width: 135,
        fixed: "left",
        ellipsis: true,
        render(...[type]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
              <OneLineText value={type} />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Type" />,
        dataIndex: "name",
        key: "name",
        sorter: true,
        width: 135,
        ellipsis: true,
        render(...[name]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
              <OneLineText
                avatar={yomatoImg}
                avatarType={avatarType}
                value={name}
                link="https://www.youtube.com/"
                avatarSize={size}
              />
            </LayoutCell>
          );
        },
      },

      {
        title: <LayoutHeader orderType={orderType} title="Type" />,
        dataIndex: "name",
        key: "name2",
        sorter: true,
        width: 135,
        ellipsis: true,
        render(...[name]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
              <OneLineText
                avatar={yomatoImg}
                avatarType={avatarType}
                value={name}
                avatarSize={size}
              />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Location" />,
        dataIndex: "location",
        key: "location",
        sorter: true,
        width: 100,
        ellipsis: true,
        render(...[location]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
              <OneLineText value={location} link="/ksjhdfkshj" />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Platform" />,
        dataIndex: "platform",
        key: "platform",
        sorter: true,
        width: 135,
        ellipsis: true,
        render(...[platform]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
              <OneLineText icon="tio-calendar_month" value={platform} />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Creator" />,
        dataIndex: "creator",
        key: "creator",
        sorter: true,
        width: 135,
        ellipsis: true,
        align: "center",
        render(...[creator]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
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
        title: <LayoutHeader orderType={orderType} title="Action" />,
        key: "status",
        width: 150,
        fixed: "right",
        ellipsis: true,
        dataIndex: "status",
        render(...[status]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
              <StatusLine value={status} active={true} />
            </LayoutCell>
          );
        },
      },
    ],
    [avatarType, orderType, size]
  );

  const columns2: ColumnProps<any>[] = useMemo(
    () => [
      {
        title: <LayoutHeader orderType={orderType} title="Title" />,
        dataIndex: "type",
        key: "type",
        sorter: true,
        fixed: "left",
        width: 135,
        ellipsis: true,
        render(...[type]) {
          return (
            <LayoutCell orderType={orderType} tableSize="large">
              <OneLineText value={type} />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Type" />,
        dataIndex: "name",
        key: "name",
        sorter: true,
        width: 135,
        ellipsis: true,
        render(...[name]) {
          return (
            <LayoutCell orderType={orderType} tableSize="large">
              <OneLineText
                avatar={yomatoImg}
                avatarType={avatarType}
                value={name}
                link="https://www.youtube.com/"
                avatarSize={"large"}
              />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Type" />,
        dataIndex: "name",
        key: "name2",
        sorter: true,
        width: 135,
        ellipsis: true,
        render(...[name]) {
          return (
            <LayoutCell orderType={orderType} tableSize="large">
              <OneLineText
                avatar={yomatoImg}
                avatarType={avatarType}
                value={name}
                avatarSize={"large"}
              />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Location" />,
        dataIndex: "location",
        key: "location",
        sorter: true,
        width: 100,
        ellipsis: true,
        render(...[location]) {
          return (
            <LayoutCell orderType={orderType} tableSize="large">
              <OneLineText value={location} link="https://www.youtube.com/" />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Platform" />,
        dataIndex: "platform",
        key: "platform",
        sorter: true,
        width: 135,
        ellipsis: true,
        render(...[platform]) {
          return (
            <LayoutCell orderType={orderType} tableSize="large">
              <OneLineText icon="tio-calendar_month" value={platform} />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Version" />,
        dataIndex: "version",
        key: "version",
        sorter: true,
        width: 150,
        ellipsis: true,
        render(...[version]) {
          return (
            <LayoutCell orderType={orderType} tableSize="large">
              <TwoLineText valueLine1={version} valueLine2={"facebook"} />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Version" />,
        dataIndex: "version",
        key: "version",
        sorter: true,
        width: 150,
        ellipsis: true,
        render(...[version]) {
          return (
            <LayoutCell orderType={orderType} tableSize="large">
              <TwoLineText
                avatar={yomatoImg}
                avatarType={avatarType}
                valueLine1={version}
                valueLine2={"facebook"}
              />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Version" />,
        dataIndex: "version",
        key: "version",
        sorter: true,
        width: 150,
        ellipsis: true,
        render(...[version]) {
          return (
            <LayoutCell orderType={orderType} tableSize="large">
              <TwoLineText
                avatar={yomatoImg}
                avatarType={avatarType}
                valueLine1={version}
                valueLine2={"facebook"}
                link="/ksdjflsf"
              />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Version" />,
        dataIndex: "version",
        key: "version",
        sorter: true,
        width: 150,
        ellipsis: true,
        render(...[version]) {
          return (
            <LayoutCell orderType={orderType} tableSize="large">
              <TwoLineText
                avatar={yomatoImg}
                avatarType={avatarType}
                valueLine1={version}
                valueLine2={"facebook"}
              />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Upgrade" />,
        dataIndex: "upgradeNum",
        key: "upgradeNum",
        sorter: true,
        width: 150,
        ellipsis: true,
        render(...[upgradeNum]) {
          return (
            <LayoutCell orderType={orderType} tableSize="large">
              <TwoLineText
                icon="tio-calendar_month"
                valueLine1={upgradeNum + " alod dlkjwer"}
                valueLine2={"hihii"}
              />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Upgrade" />,
        dataIndex: "upgradeNum",
        key: "upgradeNum",
        sorter: true,
        width: 150,
        ellipsis: true,
        render(...[upgradeNum]) {
          return (
            <LayoutCell orderType={orderType} tableSize="large">
              <TwoLineText
                icon="tio-calendar_month"
                valueLine1={upgradeNum + " alod dlkjwer"}
                valueLine2={"hihii"}
                link="/hsfdsdhio"
              />
            </LayoutCell>
          );
        },
      },
      {
        title: <LayoutHeader orderType={orderType} title="Creator" />,
        dataIndex: "creator",
        key: "creator",
        sorter: true,
        width: 135,
        ellipsis: true,
        align: "center",
        render(...[creator]) {
          return (
            <LayoutCell orderType={orderType} tableSize="large">
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
        title: <LayoutHeader orderType={orderType} title="Action" />,
        key: "status",
        width: 150,
        fixed: "right",
        ellipsis: true,
        dataIndex: "status",
        render(...[status]) {
          return (
            <LayoutCell orderType={orderType} tableSize="large">
              <StatusLine value={status} active={true} />
            </LayoutCell>
          );
        },
      },
    ],
    [avatarType, orderType]
  );
  const data = [];
  for (let i = 0; i < 8; ++i) {
    data.push({
      key: i,
      name: "Screem",
      type: "Diamond",
      location: "Hill",
      weight: "50kg",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
      creator: "Jack Gealish",
      status: "hoạt động",
      createdAt: "2014-12-24 23:12:00",
    });
  }

  const expandable = {
    expandedRowRender: expandedRowRender,
    expandIcon: ({ expanded, onExpand, record }) =>
      expanded ? (
        <ChevronUp16 onClick={(e) => onExpand(record, e)} />
      ) : (
        <ChevronDown16 onClick={(e) => onExpand(record, e)} />
      ),
    columnWidth: "45px",
  };

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Table not have TwoLineText" key="1">
          <ActionBarComponent
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
          >
            <Button>Button demo</Button>
          </ActionBarComponent>
          <StandardTable
            columns={columns}
            dataSource={data}
            isDragable={true}
            isExpandable={true}
            tableSize={size}
            rowSelection={rowSelection}
            expandable={expandable}
          />
          <div>
            <Pagination
              skip={filter.skip}
              take={filter.take}
              total={100}
              onChange={handlePagination}
            />
          </div>
        </TabPane>
        <TabPane tab="Table only size large" key="2">
          <ActionBarComponent
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
          >
            <Button>Button demo</Button>
          </ActionBarComponent>
          <StandardTable
            columns={columns2}
            dataSource={data}
            isDragable={true}
            isExpandable={true}
            tableSize={"large"}
            rowSelection={rowSelection}
          />
          <div>
            <Pagination
              skip={filter.skip}
              take={filter.take}
              total={100}
              onChange={handlePagination}
              canChangePageSize={false}
            />
          </div>
        </TabPane>
      </Tabs>

      <div>
        <div style={{ margin: "10px", width: "500px" }}>
          <Radio.Group onChange={handleChangeAvatarType} value={avatarType}>
            <Radio value={AVATAR_TYPE.CIRCLE}>circle</Radio>
            <Radio value={AVATAR_TYPE.SQUARE}>squale</Radio>
          </Radio.Group>
        </div>
        <div style={{ margin: "10px", width: "500px" }}>
          <Radio.Group onChange={handleChangeSize} value={size}>
            <Radio value={SIZE_TYPE.LARGE}>Large</Radio>
            <Radio value={SIZE_TYPE.MEDIUM}>medium</Radio>
            <Radio value={SIZE_TYPE.SMALL}>small</Radio>
          </Radio.Group>
        </div>
        <div style={{ margin: "10px", width: "500px" }}>
          <Radio.Group onChange={handleChangeStyle} value={orderType}>
            <Radio value={ORDER_TYPE.LEFT}>order-left</Radio>
            <Radio value={ORDER_TYPE.CENTER}>order-center</Radio>
            <Radio value={ORDER_TYPE.RIGHT}>order-right</Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
}

storiesOf("StandardTable", module).add(nameof(Default), Default);
