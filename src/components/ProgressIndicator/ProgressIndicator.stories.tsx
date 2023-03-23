import { storiesOf } from "@storybook/react";
import React from "react";
import nameof from "ts-nameof.macro";
import ProgressIndicator from "./ProgressIndicator";

const listEnum = [
  {
    sectionId: 1,
    sectionName: "Thông tin chung",
  },
  {
    sectionId: 2,
    sectionName: "Khách hàng",
  },
  {
    sectionId: 3,
    sectionName: "Chiết khấu, quà tặng",
  },
  {
    sectionId: 4,
    sectionName: "Vay",
  },
  {
    sectionId: 5,
    sectionName: "Thanh toán",
  },
  {
    sectionId: 6,
    sectionName: "KhangMeow",
  },
  {
    sectionId: 7,
    sectionName: "TestFrame",
  },
];
function Default() {
  // const [currentId,setCurrentId] = React.useState<number>(1);
  return (
    <div>
      <ProgressIndicator
        list={listEnum}
        idContainer={"container-frame"}
        type={"horizontal"}
      />
      <div
        style={{ width: 900, height: 800, overflow: "auto", marginTop: 30 }}
        id="container-frame"
      >
        <div id="frame-1" style={{ height: 400, backgroundColor: "red" }}>
          {listEnum[0].sectionName}
        </div>
        <div id="frame-2" style={{ height: 400, backgroundColor: "yellow" }}>
          {listEnum[1].sectionName}
        </div>
        <div id="frame-3" style={{ height: 400, backgroundColor: "blue" }}>
          {listEnum[2].sectionName}
        </div>
        <div id="frame-4" style={{ height: 400, backgroundColor: "green" }}>
          {listEnum[3].sectionName}
        </div>
        <div id="frame-5" style={{ height: 400, backgroundColor: "gray" }}>
          {listEnum[4].sectionName}
        </div>
        <div id="frame-6" style={{ height: 400, backgroundColor: "pink" }}>
          {listEnum[5].sectionName}
        </div>
        <div id="frame-7" style={{ height: 200, backgroundColor: "black" }}>
          {listEnum[6].sectionName}
        </div>
      </div>
    </div>
  );
}

storiesOf("ProgressIndicator", module).add(nameof(Default), Default);
