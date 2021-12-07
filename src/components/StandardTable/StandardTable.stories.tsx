import { Table, Badge, Menu, Dropdown, Space } from "antd";
import { storiesOf } from "@storybook/react";
import { DownOutlined } from "@ant-design/icons";
import nameof from "ts-nameof.macro";
import { useMemo } from "react";
import "./StandardTable.scss";
import StandardTable from "./StandardTable";
// import { Model } from "react3l-common";
import { ColumnProps } from "antd/lib/table";

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

function Default() {
  const expandedRowRender = () => {
    const columns = [
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Status",
        key: "state",
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: ColumnProps<any>[] = useMemo(
    () => [
      {
        title: <div className="text-center">{"title"}</div>,
        dataIndex: "name",
        key: "name",
        sorter: true,
        align: "center",
        width: 400,
      },
      {
        title: <div className="text-center">{"Platform"}</div>,
        dataIndex: "platform",
        key: "platform",
        sorter: true,
        align: "center",
        width: 400,
      },
      {
        title: <div className="text-center">{"Version"}</div>,
        dataIndex: "version",
        key: "version",
        sorter: true,
        align: "center",
        width: 400,
      },
      {
        title: <div className="text-center">{"Upgraded"}</div>,
        dataIndex: "upgradeNum",
        key: "upgradeNum",
        sorter: true,
        align: "center",
        width: 400,
      },
      {
        title: <div className="text-center">{"Creator"}</div>,
        dataIndex: "creator",
        key: "creator",
        sorter: true,
        align: "center",
        width: 400,
      },
      {
        title: <div className="text-center">{"Date"}</div>,
        dataIndex: "createdAt",
        key: "createdAt",
        sorter: true,
        align: "center",
        width: 400,
      },
      {
        title: <div className="text-center">{"Action"}</div>,
        key: "operation",
        align: "center",
        width: 400,
        render: () => <a>Publish</a>,
      },
    ],
    []
  );

  const data = [];
  for (let i = 0; i < 5; ++i) {
    data.push({
      key: i,
      name: "Screem",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
      creator: "Jack",
      createdAt: "2014-12-24 23:12:00",
    });
  }

  return (
    <div className="page">
      <StandardTable
        columns={columns}
        isExpandAble={true}
        expandedRowRend={expandedRowRender}
        list={data}
        size="lg"
      />
    </div>
  );
}

storiesOf("StandardTable", module).add(nameof(Default), Default);
