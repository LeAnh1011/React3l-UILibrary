import { storiesOf } from "@storybook/react";
import React from "react";
import nameof from "ts-nameof.macro";
import ProgressIndicator from "./ProgressIndicator";

const listEnum = [
  {
    sessionId: 1,
    sessionName: "Thông tin chung",
  },
  {
    sessionId: 2,
    sessionName: "Khách hàng",
  },
  {
    sessionId: 3,
    sessionName: "Chiết khấu, quà tặng",
  },
  {
    sessionId: 4,
    sessionName: "Vay",
  },
  {
    sessionId: 5,
    sessionName: "Thanh toán",
  },
  {
    sessionId: 6,
    sessionName: "KhangMeow",
  },
];
function Default() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 200 }}>
        <ProgressIndicator list={listEnum} />
      </div>
      <div style={{ width: 900 }}>
        <div id="#1" style={{ height: 1080, backgroundColor: "red" }}></div>
        <div id="#2" style={{ height: 1080, backgroundColor: "yellow" }}></div>
        <div id="#3" style={{ height: 1080, backgroundColor: "blue" }}></div>
        <div id="#4" style={{ height: 1080, backgroundColor: "green" }}></div>
        <div id="#5" style={{ height: 1080, backgroundColor: "gray" }}></div>
        <div id="#7" style={{ height: 1080, backgroundColor: "gray" }}></div>
      </div>
    </div>
  );
}

storiesOf("ProgressIndicator", module).add(nameof(Default), Default);
