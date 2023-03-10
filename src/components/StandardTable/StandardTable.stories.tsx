import Add16 from "@carbon/icons-react/es/add/16";
import ChevronDown16 from "@carbon/icons-react/es/chevron--down/16";
import ChevronUp16 from "@carbon/icons-react/es/chevron--up/16";
import { storiesOf } from "@storybook/react";
import { Tabs } from "antd";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import { ColumnProps } from "antd/lib/table";
// import { Model } from "react3l-common";
import { Key, RowSelectionType } from "antd/lib/table/interface";
import React, { useMemo } from "react";
import { StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import nameof from "ts-nameof.macro";
import Button from "../Button/Button";
import ActionBarComponent from "./ActionBarComponent/ActionBarComponent";
import BadgeText from "./DataCellComponent/BadgeText/BadgeText";
import OneLineText from "./DataCellComponent/OneLineText/OneLineText";
import StatusLine from "./DataCellComponent/StatusLine/StatusLine";
import TwoLineText from "./DataCellComponent/TwoLineText/TwoLineText";
import LayoutCell from "./LayoutCell/LayoutCell";
import LayoutHeader from "./LayoutHeader/LayoutHeader";
import Pagination from "./Pagination/Pagination";
import StandardTable from "./StandardTable";
import "./StandardTable.scss";
import InputSearch from "../Input/InputSearch/InputSearch";
import Select from "../Select/SingleSelect/Select";
import { of } from "rxjs";
import { BrowserRouter, Route } from "react-router-dom";

const KateBishop =
  "https://cdn.searchenginejournal.com/wp-content/uploads/2019/07/the-essential-guide-to-using-images-legally-online-1520x800.png";
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
  LARGE = "lg",
  MEDIUM = "md",
  SMALL = "sm",
}
export enum ORDER_TYPE {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
}
function Default() {
  const [filter, setFilter] = React.useState<DemoFilter>(new DemoFilter());
  const [loading, setLoading] = React.useState<boolean>(false);
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
              <StatusLine value={status} color="red" />
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
              <OneLineText value={`version`} countCharacters={20} />
            </LayoutCell>
          );
        },
      },
    ];

    const data: any = [];
    for (let i = 0; i < 9; ++i) {
      data.push({
        key: i,
        name: "Screem",
        type: "Diamond",
        location: "Hill",
        weight: "50kg",
        platform: "iOS",
        version:
          "Sau khi bị nhiều cư dân mạng lên tiếng cho rằng giám thị coi thi đã thiếu trách nhiệm trong việc nhắc nhở nam sinh bị 0 điểm môn Tiếng Anh vì ngủ quên. Được biết 2 cán bộ coi thi tại phòng thi môn Tiếng Anh của thí sinh H.N.T khẳng định đã ngồi đúng vị trí quy định, không đi lại trong phòng thi (do quy chế quy định trong quá trình làm bài không được đứng gần thí sinh...) mà bao quát toàn bộ thí sinh từ xa. Trong quá trình quan sát cán bộ coi thi thấy tất cả thí sinh đều tập trung làm bài, trong đó có em H.N.T. Khi thời gian coi thi trôi dần về cuối, có vài em úp mặt xuống bàn. Lúc này, cán bộ coi thi cứ ngỡ là các em đã làm bài xong, chờ hết giờ để nộp bài thi. Một lãnh đạo Sở GD&ĐT Cà Mau khẳng định Sau khi xác minh sự việc không khỏi tiếc nuối vì học sinh rất đáng thương nhưng giám thị đã làm đúng nhiệm vụ của mình",
        upgradeNum: 500,
        creator: "Jack Gealish",
        status: "hoạt động",
        createdAt: "2014-12-24 23:12:00",
      });
    }
    return (
      <div className="expand-table-box">
        <StandardTable
          columns={columns}
          dataSource={data}
          isDragable={true}
          tableSize={size}
          isLevel2={true}
        />
      </div>
    );
  };
  const typeRowSelection: RowSelectionType = "checkbox";
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<Key[]>([1]);

  const rowSelection = {
    onChange(selectedKeys: Key[]) {
      setSelectedRowKeys(selectedKeys);
    },
    selectedRowKeys,
    type: typeRowSelection,
    getCheckboxProps: (record) => {
      return {
        disabled: record.key === 1 || record.key === 0,
      };
    },
  };

  React.useEffect(() => {
    let test = document.getElementsByClassName("ant-table-cell")[0];
    if (test) {
      test.addEventListener("mouseover", function (event) {}, false);
    }
  }, []);

  const columns: ColumnProps<any>[] = useMemo(
    () => [
      {
        title: ({ sortColumns }) => {
          return (
            <div>
              <LayoutHeader orderType={orderType} title="Title" />
            </div>
          );
        },
        dataIndex: "type",
        key: "type",
        width: 135,
        fixed: "left",
        ellipsis: true,
        render(...[type]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
              <OneLineText value={type} countCharacters={5} />
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
                orderType={orderType}
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
            <LayoutCell
              orderType={orderType}
              tableSize={size}
              position={"right"}
            >
              <OneLineText
                avatar={KateBishop}
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
        title: ({ sortColumns }) => {
          const sortedColumn = sortColumns?.find(
            ({ column }) => column.key === "location"
          );
          return (
            <div>
              <LayoutHeader
                orderType={orderType}
                title="Location"
                sortedColumn={sortedColumn}
                isSorter
              />
            </div>
          );
        },
        dataIndex: "location",
        key: "location",
        sorter: true,
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
        title: ({ sortColumns }) => {
          const sortedColumn = sortColumns?.find(
            ({ column }) => column.key === "platform"
          );
          return (
            <div>
              <LayoutHeader
                orderType={orderType}
                title="Platform"
                sortedColumn={sortedColumn}
                isSorter
              />
            </div>
          );
        },
        dataIndex: "platform",
        key: "platform",
        sorter: true,
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
        title: ({ sortColumns }) => {
          const sortedColumn = sortColumns?.find(
            ({ column }) => column.key === "creator"
          );
          return (
            <div>
              <LayoutHeader
                orderType={orderType}
                title="Creator"
                sortedColumn={sortedColumn}
                isSorter
              />
            </div>
          );
        },
        dataIndex: "creator",
        key: "creator",
        sorter: true,
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

        ellipsis: true,
        dataIndex: "status",
        render(...[status]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
              <StatusLine value={status} color="red" />
            </LayoutCell>
          );
        },
      },
      {
        title: ({ sortColumns }) => {
          const sortedColumn = sortColumns?.find(
            ({ column }) => column.key === "version"
          );
          return (
            <div>
              <LayoutHeader
                orderType={orderType}
                title="version"
                sortedColumn={sortedColumn}
                isSorter
              />
            </div>
          );
        },
        dataIndex: "version",
        key: "version",
        sorter: true,
        ellipsis: true,
        render(...[version]) {
          return (
            <LayoutCell orderType={orderType} tableSize={size}>
              <OneLineText value={version} countCharacters={20} />
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
            <LayoutCell orderType={orderType} tableSize="lg">
              <OneLineText value={type} />
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
            <LayoutCell orderType={orderType} tableSize="lg">
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
            <LayoutCell orderType={orderType} tableSize="lg">
              <TwoLineText
                avatar={KateBishop}
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
            <LayoutCell orderType={orderType} tableSize="lg">
              <TwoLineText
                avatar={KateBishop}
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
            <LayoutCell orderType={orderType} tableSize="lg">
              <TwoLineText
                avatar={KateBishop}
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
            <LayoutCell orderType={orderType} tableSize="lg">
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
            <LayoutCell orderType={orderType} tableSize="lg">
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
            <LayoutCell orderType={orderType} tableSize="lg">
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
            <LayoutCell orderType={orderType} tableSize="lg">
              <StatusLine value={status} color="red" />
            </LayoutCell>
          );
        },
      },
    ],
    [avatarType, orderType]
  );

  const data: any = [];
  for (let i = 0; i < 8; ++i) {
    data.push({
      key: i,
      name: "Screem",
      type: "Diamond iOS iOS iOS iOS iOS iOS iOS",
      location: "Hill iOS iOS iOS iOS iOS iOS iOS",
      weight: "50kg",
      platform: "iOS iOS iOS iOS iOS iOS iOS iOS iOS iOS",
      version:
        "Sau khi bị nhiều cư dân mạng lên tiếng cho rằng giám thị coi thi đã thiếu trách nhiệm trong việc nhắc nhở nam sinh bị 0 điểm môn Tiếng Anh vì ngủ quên. Được biết 2 cán bộ coi thi tại phòng thi môn Tiếng Anh của thí sinh H.N.T khẳng định đã ngồi đúng vị trí quy định, không đi lại trong phòng thi (do quy chế quy định trong quá trình làm bài không được đứng gần thí sinh...) mà bao quát toàn bộ thí sinh từ xa. Trong quá trình quan sát cán bộ coi thi thấy tất cả thí sinh đều tập trung làm bài, trong đó có em H.N.T. Khi thời gian coi thi trôi dần về cuối, có vài em úp mặt xuống bàn. Lúc này, cán bộ coi thi cứ ngỡ là các em đã làm bài xong, chờ hết giờ để nộp bài thi. Một lãnh đạo Sở GD&ĐT Cà Mau khẳng định Sau khi xác minh sự việc không khỏi tiếc nuối vì học sinh rất đáng thương nhưng giám thị đã làm đúng nhiệm vụ của mình",
      upgradeNum: 500,
      creator: "Jack Gealish ",
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
  };

  return (
    <BrowserRouter>
      <Route path="/">
        <div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Table not have TwoLineText" key="1">
              <InputSearch
                value={"hello"}
                searchProperty={"name"}
                classFilter={DemoFilter}
                placeHolder="Search..."
                animationInput={false}
              />
              <ActionBarComponent
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
              >
                <Button
                  type="ghost-primary"
                  className="btn--lg"
                  icon={<Add16 />}
                >
                  {"Button"}
                </Button>
                <Button
                  type="ghost-primary"
                  className="btn--lg"
                  icon={<ChevronDown16 />}
                >
                  {"Button"}
                </Button>
              </ActionBarComponent>
              <StandardTable
                columns={columns}
                dataSource={data}
                isDragable={true}
                isExpandable={true}
                tableSize={size}
                rowSelection={rowSelection}
                expandable={expandable}
                loading={loading}
                scroll={{ x: 1900, y: 300 }}
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
            <TabPane tab="Table only size lg" key="2">
              <ActionBarComponent
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
              >
                <Button
                  type="ghost-primary"
                  className="btn--lg"
                  icon={<Add16 />}
                >
                  {"Button"}
                </Button>
                <Button
                  type="ghost-primary"
                  className="btn--lg"
                  icon={<ChevronDown16 />}
                >
                  {"Button"}
                </Button>
              </ActionBarComponent>
              <StandardTable
                columns={columns2}
                dataSource={data}
                isDragable={true}
                isExpandable={true}
                tableSize="lg"
                rowSelection={rowSelection}
                scroll={{ y: 300 }}
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
            <div>
              <Button
                type="primary"
                className="btn--lg"
                onClick={handleLoading}
              >
                {"Button"}
              </Button>
            </div>
            <div style={{ margin: "10px", width: "500px" }}>
              <Radio.Group onChange={handleChangeAvatarType} value={avatarType}>
                <Radio value={AVATAR_TYPE.CIRCLE}>circle</Radio>
                <Radio value={AVATAR_TYPE.SQUARE}>squale</Radio>
              </Radio.Group>
            </div>
            <div style={{ margin: "10px", width: "500px" }}>
              <Radio.Group onChange={handleChangeSize} value={size}>
                <Radio value={SIZE_TYPE.LARGE}>lg</Radio>
                <Radio value={SIZE_TYPE.MEDIUM}>md</Radio>
                <Radio value={SIZE_TYPE.SMALL}>sm</Radio>
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
      </Route>
    </BrowserRouter>
  );
}

storiesOf("StandardTable", module).add(nameof(Default), Default);
