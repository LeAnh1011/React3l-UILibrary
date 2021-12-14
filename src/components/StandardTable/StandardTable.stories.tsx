import { Table, Badge, Menu, Dropdown, Space, Row } from "antd";
import { storiesOf } from "@storybook/react";
import { DownOutlined } from "@ant-design/icons";
import nameof from "ts-nameof.macro";
import React, { useMemo } from "react";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import "./StandardTable.scss";
import StandardTable from "./StandardTable";
// import { Model } from "react3l-common";
import yomatoImg from "../../assets/image/yo.jpg";
import LayoutHeader from "./LayoutHeader/LayoutHeader";
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

  // const size = "small";
  // const orderType = "left";
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

  const columns: ColumnProps<any>[] = useMemo(
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
            <LayoutCell orderType={orderType}>
              <OneLineText value={type} tableSize={size} />
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
            <LayoutCell orderType={orderType}>
              <OneLineText
                avatar={yomatoImg}
                avatarType={avatarType}
                value={name}
                link="https://www.youtube.com/"
                tableSize={size}
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
            <LayoutCell orderType={orderType}>
              <OneLineText
                avatar={yomatoImg}
                avatarType={avatarType}
                value={name}
                tableSize={size}
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
            <LayoutCell orderType={orderType}>
              <OneLineText
                value={location}
                link="https://www.youtube.com/"
                tableSize={size}
              />
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
            <LayoutCell orderType={orderType}>
              <OneLineText
                icon="tio-calendar_month"
                value={platform}
                tableSize={size}
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
            <LayoutCell orderType={orderType}>
              <TwoLineText
                valueLine1={version}
                valueLine2={"facebook"}
                tableSize={size}
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
            <LayoutCell orderType={orderType}>
              <TwoLineText
                avatar={yomatoImg}
                avatarType={avatarType}
                valueLine1={version}
                valueLine2={"facebook"}
                tableSize={size}
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
            <LayoutCell orderType={orderType}>
              <TwoLineText
                avatar={yomatoImg}
                avatarType={avatarType}
                valueLine1={version}
                valueLine2={"facebook"}
                link="/ksdjflsf"
                tableSize={size}
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
            <LayoutCell orderType={orderType}>
              <TwoLineText
                avatar={yomatoImg}
                avatarType={avatarType}
                valueLine1={version}
                valueLine2={"facebook"}
                tableSize={size}
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
            <LayoutCell orderType={orderType}>
              <TwoLineText
                icon="tio-calendar_month"
                valueLine1={upgradeNum + " alod dlkjwer"}
                valueLine2={"hihii"}
                tableSize={size}
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
            <LayoutCell orderType={orderType}>
              <TwoLineText
                icon="tio-calendar_month"
                valueLine1={upgradeNum + " alod dlkjwer"}
                valueLine2={"hihii"}
                link="/hsfdsdhio"
                tableSize={size}
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
            <LayoutCell orderType={orderType}>
              <BadgeText
                value={creator}
                backgroundColor="#FFECB3"
                color="#ED6700"
                tableSize={size}
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
            <LayoutCell orderType={orderType}>
              <StatusLine value={status} active={true} tableSize={size} />
            </LayoutCell>
          );
        },
      },
    ],
    [avatarType, orderType, size]
  );

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
    <div>
      <StandardTable
        columns={columns}
        isExpandable={true}
        expandedRowRend={expandedRowRender}
        list={data}
        isDragable={true}
        sizeTable={size}
      />
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
