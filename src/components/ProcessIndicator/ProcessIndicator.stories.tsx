import { storiesOf } from "@storybook/react";
import React from "react";
import nameof from "ts-nameof.macro";
import ProcessIndicator from "./ProcessIndicator";

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
  const [currentSessionId, setCurrentSessionId] = React.useState<number>(
    Number(listEnum[0]?.sessionId) || 1
  );
  return (
    <ProcessIndicator
      list={listEnum}
      currentSessionId={currentSessionId}
      setCurrentSessionId={setCurrentSessionId}
    />
  );
}

storiesOf("ProcessIndicator", module).add(nameof(Default), Default);
