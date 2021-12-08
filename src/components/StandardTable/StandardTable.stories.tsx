import { Table, Badge, Menu, Dropdown, Space } from "antd";
import { storiesOf } from "@storybook/react";
import { DownOutlined } from "@ant-design/icons";
import nameof from "ts-nameof.macro";
import { useMemo } from "react";
import "./StandardTable.scss";
import StandardTable from "./StandardTable";
// import { Model } from "react3l-common";
import yomatoImg from "../../assets/image/yo.jpg";
import LayoutCell from "./LayoutCell/LayoutCell";
import OneLineText from "./DataCellComponent/OneLineText/OneLineText";
import StatusLine from "./DataCellComponent/StatusLine/StatusLine";
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
      {
        title: <div className="text-center">{"Date"}</div>,
        dataIndex: "date",
        key: "date",
        render(...[date]) {
          return <div>{date + " hihi"}</div>;
        },
      },
      {
        title: <div className="text-center">{"Name"}</div>,
        dataIndex: "name",
        key: "name",
        render(...[name]) {
          return <div>{name + " hihi"}</div>;
        },
      },
      {
        title: <div className="text-center">{"Status"}</div>,
        key: "state",
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      {
        title: <div className="text-center">{"Upgrade Status"}</div>,
        dataIndex: "upgradeNum",
        key: "upgradeNum",
        render(...[upgradeNum]) {
          return <div>{upgradeNum}</div>;
        },
      },
      {
        title: <div className="text-center">{"Action"}</div>,
        dataIndex: "operation",
        key: "operation",
        render(...[upgradeNum]) {
          return <div>{upgradeNum}</div>;
        },
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a href="/#">Pause</a>
            <a href="/#">Stop</a>
            <Dropdown overlay={menu}>
              <a href="/#">
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 5; ++i) {
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
        width: 400,
        render(...[name]) {
          return (
            <LayoutCell orderType="left">
              <OneLineText avatar={yomatoImg} name={name} />
            </LayoutCell>
          );
        },
      },
      {
        title: <div className="text-center">{"Platform"}</div>,
        dataIndex: "platform",
        key: "platform",
        sorter: true,
        width: 400,
        render(...[platform]) {
          return (
            <LayoutCell orderType="left">
              <OneLineText icon="tio-calendar_month" name={platform} />
            </LayoutCell>
          );
        },
      },
      {
        title: <div className="text-center">{"Version"}</div>,
        dataIndex: "version",
        key: "version",
        sorter: true,
        width: 400,
        render(...[version]) {
          return <LayoutCell orderType="right">{version}</LayoutCell>;
        },
      },
      {
        title: <div className="text-center">{"Upgraded"}</div>,
        dataIndex: "upgradeNum",
        key: "upgradeNum",
        sorter: true,
        width: 400,
        render(...[upgradeNum]) {
          return <LayoutCell orderType="right">{upgradeNum}</LayoutCell>;
        },
      },
      {
        title: <div className="text-center">{"Creator"}</div>,
        dataIndex: "creator",
        key: "creator",
        sorter: true,
        width: 400,
        render(...[creator]) {
          return <LayoutCell orderType="right">{creator}</LayoutCell>;
        },
      },
      {
        title: <div className="text-center">{"Date"}</div>,
        dataIndex: "createdAt",
        key: "createdAt",
        sorter: true,
        width: 400,
        render(...[createdAt]) {
          return <LayoutCell orderType="right">{createdAt}</LayoutCell>;
        },
      },
      {
        title: <div className="text-center">{"Action"}</div>,
        key: "status",
        width: 400,
        dataIndex: "status",
        render(...[status]) {
          return (
            <LayoutCell orderType="right">
              <StatusLine name={status} active={true} />
            </LayoutCell>
          );
        },
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
      status: "hoạt động",
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
      />
    </div>
  );
}

storiesOf("StandardTable", module).add(nameof(Default), Default);
