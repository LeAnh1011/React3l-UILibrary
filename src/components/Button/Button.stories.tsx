import React from "react";
import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import Button from "./Button";
function Default() {
  return <Button type="secondary">{"hihi"}</Button>;
}

function Primary() {
  return <Button type="secondary" />;
}

storiesOf("Button", module)
  .add(nameof(Default), Default)
  .add(nameof(Primary), Primary);
