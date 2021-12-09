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
import BadgeText from "./DataCellComponent/BadgeText/BadgeText";
import TwoLineText from "./DataCellComponent/TwoLineText/TwoLineText";
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
        title: <div className="text-left">{"Date"}</div>,
        dataIndex: "date",
        key: "date",
        render(...[date]) {
          return <div>{date + " hihi"}</div>;
        },
      },
      {
        title: <div className="text-left">{"Name"}</div>,
        dataIndex: "name",
        key: "name",
        render(...[name]) {
          return <div>{name + " hihi"}</div>;
        },
      },
      {
        title: <div className="text-left">{"Status"}</div>,
        key: "state",
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      {
        title: <div className="text-left">{"Upgrade Status"}</div>,
        dataIndex: "upgradeNum",
        key: "upgradeNum",
        render(...[upgradeNum]) {
          return <div>{upgradeNum}</div>;
        },
      },
      {
        title: <div className="text-left">{"Action"}</div>,
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

  const size = "small";

  const columns: ColumnProps<any>[] = useMemo(
    () => [
      {
        title: <div className="text-left">{"Title"}</div>,
        dataIndex: "name",
        key: "name",
        sorter: true,
        width: 400,
        render(...[name]) {
          return (
            <LayoutCell orderType="left">
              <OneLineText avatar={yomatoImg} name={name} tableSize={size} />
            </LayoutCell>
          );
        },
      },
      {
        title: <div className="text-left">{"Platform"}</div>,
        dataIndex: "platform",
        key: "platform",
        sorter: true,
        width: 400,
        render(...[platform]) {
          return (
            <LayoutCell orderType="left">
              <OneLineText
                icon="tio-calendar_month"
                name={platform}
                tableSize={size}
              />
            </LayoutCell>
          );
        },
      },
      {
        title: <div className="text-left">{"Version"}</div>,
        dataIndex: "version",
        key: "version",
        sorter: true,
        width: 400,
        render(...[version]) {
          return (
            <LayoutCell orderType="left">
              <TwoLineText
                avatar={yomatoImg}
                nameLine1={version}
                nameLine2={"hihii"}
                tableSize={size}
              />
            </LayoutCell>
          );
        },
      },
      {
        title: <div className="text-left">{"Upgraded"}</div>,
        dataIndex: "upgradeNum",
        key: "upgradeNum",
        sorter: true,
        width: 400,
        render(...[upgradeNum]) {
          return (
            <TwoLineText
              icon="tio-calendar_month"
              nameLine1={upgradeNum + " alod dlkjwer"}
              nameLine2={"hihii"}
              tableSize={size}
            />
          );
        },
      },
      {
        title: <div className="text-left">{"Creator"}</div>,
        dataIndex: "creator",
        key: "creator",
        sorter: true,
        width: 400,
        align: "center",
        render(...[creator]) {
          return (
            <LayoutCell orderType="right">
              <BadgeText
                name={creator}
                backgroundColor="#FFECB3"
                color="#ED6700"
                tableSize={size}
              />
            </LayoutCell>
          );
        },
      },
      {
        title: <div className="text-left">{"Date"}</div>,
        dataIndex: "createdAt",
        key: "createdAt",
        sorter: true,
        width: 400,
        render(...[createdAt]) {
          return (
            <LayoutCell orderType="right">
              <OneLineText
                avatar={yomatoImg}
                name={createdAt}
                tableSize={size}
              />
            </LayoutCell>
          );
        },
      },
      {
        title: <div className="text-left">{"Action"}</div>,
        key: "status",
        width: 400,
        dataIndex: "status",
        render(...[status]) {
          return (
            <LayoutCell orderType="right">
              <StatusLine name={status} active={true} tableSize={size} />
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
      creator: "Jack Gealish",
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
        sizeTable={size}
      />
    </div>
  );
}

storiesOf("StandardTable", module).add(nameof(Default), Default);
