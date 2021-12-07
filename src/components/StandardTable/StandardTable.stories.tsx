import { Table, Badge, Menu, Dropdown, Space } from "antd";
import { storiesOf } from "@storybook/react";
import { DownOutlined } from "@ant-design/icons";
import nameof from "ts-nameof.macro";
import "./StandardTable.scss";
import StandardTable from "./StandardTable";
import { Model } from "react3l-common";

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

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Platform", dataIndex: "platform", key: "platform" },
    { title: "Version", dataIndex: "version", key: "version" },
    { title: "Upgraded", dataIndex: "upgradeNum", key: "upgradeNum" },
    { title: "Creator", dataIndex: "creator", key: "creator" },
    { title: "Date", dataIndex: "createdAt", key: "createdAt" },
    { title: "Action", key: "operation", render: () => <a>Publish</a> },
  ];

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
    <div>
      <StandardTable
        columns={columns}
        expandedRowRend={expandedRowRender}
        list={data}
      />
    </div>
  );
}

storiesOf("StandardTable", module).add(nameof(Default), Default);
