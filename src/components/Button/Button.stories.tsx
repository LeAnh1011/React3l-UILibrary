import React from "react";
import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import Button from "./Button";
import { Tabs } from "antd";

const { TabPane } = Tabs;
function Default() {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Primary and outLine primary + icon" key="1">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="primary" className="btn--sm">
              {"hihi"}
            </Button>
            <Button type="primary" className="btn--md">
              {"hihi"}
            </Button>
            <Button type="primary" className="btn--lg">
              {"hihi"}
            </Button>
            <Button type="primary" className="btn--xl">
              {"hihi"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="primary" className="btn--sm" disabled={true}>
              {"hihi"}
            </Button>
            <Button type="primary" className="btn--md" disabled={true}>
              {"hihi"}
            </Button>
            <Button type="primary" className="btn--lg" disabled={true}>
              {"hihi"}
            </Button>
            <Button type="primary" className="btn--xl" disabled={true}>
              {"hihi"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="outline-primary" className="btn--sm">
              {"hihi"}
            </Button>
            <Button type="outline-primary" className="btn--md">
              {"hihi"}
            </Button>
            <Button type="outline-primary" className="btn--lg">
              {"hihi"}
            </Button>
            <Button type="outline-primary" className="btn--xl">
              {"hihi"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="outline-primary" className="btn--sm" disabled={true}>
              {"hihi"}
            </Button>
            <Button type="outline-primary" className="btn--md" disabled={true}>
              {"hihi"}
            </Button>
            <Button type="outline-primary" className="btn--lg" disabled={true}>
              {"hihi"}
            </Button>
            <Button type="outline-primary" className="btn--xl" disabled={true}>
              {"hihi"}
            </Button>
          </div>
          <br /> <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="primary" className="btn--sm" icon="tio-add">
              {"Button"}
            </Button>
            <Button type="primary" className="btn--md" icon="tio-add">
              {"Button"}
            </Button>
            <Button type="primary" className="btn--lg" icon="tio-add">
              {"Button"}
            </Button>
            <Button type="primary" className="btn--xl" icon="tio-add">
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button
              type="primary"
              className="btn--sm"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
            <Button
              type="primary"
              className="btn--md"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
            <Button
              type="primary"
              className="btn--lg"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
            <Button
              type="primary"
              className="btn--xl"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="outline-primary" className="btn--sm" icon="tio-add">
              {"Button"}
            </Button>
            <Button type="outline-primary" className="btn--md" icon="tio-add">
              {"Button"}
            </Button>
            <Button type="outline-primary" className="btn--lg" icon="tio-add">
              {"Button"}
            </Button>
            <Button type="outline-primary" className="btn--xl" icon="tio-add">
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button
              type="outline-primary"
              className="btn--sm"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-primary"
              className="btn--md"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-primary"
              className="btn--lg"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-primary"
              className="btn--xl"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
          </div>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="primary" className="btn--sm" icon="tio-down_ui">
              {"Button"}
            </Button>
            <Button type="primary" className="btn--md" icon="tio-down_ui">
              {"Button"}
            </Button>
            <Button type="primary" className="btn--lg" icon="tio-down_ui">
              {"Button"}
            </Button>
            <Button type="primary" className="btn--xl" icon="tio-down_ui">
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button
              type="primary"
              className="btn--sm"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="primary"
              className="btn--md"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="primary"
              className="btn--lg"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="primary"
              className="btn--xl"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button
              type="outline-primary"
              className="btn--sm"
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-primary"
              className="btn--md"
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-primary"
              className="btn--lg"
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-primary"
              className="btn--xl"
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button
              type="outline-primary"
              className="btn--sm"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-primary"
              className="btn--md"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-primary"
              className="btn--lg"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-primary"
              className="btn--xl"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
          </div>
        </TabPane>
        <TabPane tab="secondary and secondary with icon" key="2">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="secondary" className="btn--sm">
              {"hihi"}
            </Button>
            <Button type="secondary" className="btn--md">
              {"hihi"}
            </Button>
            <Button type="secondary" className="btn--lg">
              {"hihi"}
            </Button>
            <Button type="secondary" className="btn--xl">
              {"hihi"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="secondary" className="btn--sm" disabled={true}>
              {"hihi"}
            </Button>
            <Button type="secondary" className="btn--md" disabled={true}>
              {"hihi"}
            </Button>
            <Button type="secondary" className="btn--lg" disabled={true}>
              {"hihi"}
            </Button>
            <Button type="secondary" className="btn--xl" disabled={true}>
              {"hihi"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="secondary" className="btn--sm" icon="tio-add">
              {"Button"}
            </Button>
            <Button type="secondary" className="btn--md" icon="tio-add">
              {"Button"}
            </Button>
            <Button type="secondary" className="btn--lg" icon="tio-add">
              {"Button"}
            </Button>
            <Button type="secondary" className="btn--xl" icon="tio-add">
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button
              type="secondary"
              className="btn--sm"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
            <Button
              type="secondary"
              className="btn--md"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
            <Button
              type="secondary"
              className="btn--lg"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
            <Button
              type="secondary"
              className="btn--xl"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
          </div>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="secondary" className="btn--sm" icon="tio-down_ui">
              {"Button"}
            </Button>
            <Button type="secondary" className="btn--md" icon="tio-down_ui">
              {"Button"}
            </Button>
            <Button type="secondary" className="btn--lg" icon="tio-down_ui">
              {"Button"}
            </Button>
            <Button type="secondary" className="btn--xl" icon="tio-down_ui">
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button
              type="secondary"
              className="btn--sm"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="secondary"
              className="btn--md"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="secondary"
              className="btn--lg"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="secondary"
              className="btn--xl"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
          </div>
        </TabPane>
        <TabPane tab="ghost and ghost with icon" key="3">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="ghost" className="btn--sm">
              {"hihi"}
            </Button>
            <Button type="ghost" className="btn--md">
              {"hihi"}
            </Button>
            <Button type="ghost" className="btn--lg">
              {"hihi"}
            </Button>
            <Button type="ghost" className="btn--xl">
              {"hihi"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="ghost" className="btn--sm" disabled={true}>
              {"hihi"}
            </Button>
            <Button type="ghost" className="btn--md" disabled={true}>
              {"hihi"}
            </Button>
            <Button type="ghost" className="btn--lg" disabled={true}>
              {"hihi"}
            </Button>
            <Button type="ghost" className="btn--xl" disabled={true}>
              {"hihi"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="ghost" className="btn--sm" icon="tio-add">
              {"Button"}
            </Button>
            <Button type="ghost" className="btn--md" icon="tio-add">
              {"Button"}
            </Button>
            <Button type="ghost" className="btn--lg" icon="tio-add">
              {"Button"}
            </Button>
            <Button type="ghost" className="btn--xl" icon="tio-add">
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button
              type="ghost"
              className="btn--sm"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
            <Button
              type="ghost"
              className="btn--md"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
            <Button
              type="ghost"
              className="btn--lg"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
            <Button
              type="ghost"
              className="btn--xl"
              disabled={true}
              icon="tio-add"
            >
              {"Button"}
            </Button>
          </div>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="ghost" className="btn--sm" icon="tio-down_ui">
              {"Button"}
            </Button>
            <Button type="ghost" className="btn--md" icon="tio-down_ui">
              {"Button"}
            </Button>
            <Button type="ghost" className="btn--lg" icon="tio-down_ui">
              {"Button"}
            </Button>
            <Button type="ghost" className="btn--xl" icon="tio-down_ui">
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button
              type="ghost"
              className="btn--sm"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="ghost"
              className="btn--md"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="ghost"
              className="btn--lg"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
            <Button
              type="ghost"
              className="btn--xl"
              disabled={true}
              icon="tio-down_ui"
            >
              {"Button"}
            </Button>
          </div>
        </TabPane>
        <TabPane tab="ghost-primary and ghost-primary with icon" key="4">
          <div
            style={{
              padding: "30px 30px",
              backgroundColor: "#E6EAEE",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 700,
                marginBottom: 30,
              }}
            >
              <Button type="ghost-primary" className="btn--sm">
                {"hihi"}
              </Button>
              <Button type="ghost-primary" className="btn--md">
                {"hihi"}
              </Button>
              <Button type="ghost-primary" className="btn--lg">
                {"hihi"}
              </Button>
              <Button type="ghost-primary" className="btn--xl">
                {"hihi"}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 700,
                marginBottom: 30,
              }}
            >
              <Button type="ghost-primary" className="btn--sm" disabled={true}>
                {"hihi"}
              </Button>
              <Button type="ghost-primary" className="btn--md" disabled={true}>
                {"hihi"}
              </Button>
              <Button type="ghost-primary" className="btn--lg" disabled={true}>
                {"hihi"}
              </Button>
              <Button type="ghost-primary" className="btn--xl" disabled={true}>
                {"hihi"}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 700,
                marginBottom: 30,
              }}
            >
              <Button type="ghost-primary" className="btn--sm" icon="tio-add">
                {"Button"}
              </Button>
              <Button type="ghost-primary" className="btn--md" icon="tio-add">
                {"Button"}
              </Button>
              <Button type="ghost-primary" className="btn--lg" icon="tio-add">
                {"Button"}
              </Button>
              <Button type="ghost-primary" className="btn--xl" icon="tio-add">
                {"Button"}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 700,
                marginBottom: 30,
              }}
            >
              <Button
                type="ghost-primary"
                className="btn--sm"
                disabled={true}
                icon="tio-add"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-primary"
                className="btn--md"
                disabled={true}
                icon="tio-add"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-primary"
                className="btn--lg"
                disabled={true}
                icon="tio-add"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-primary"
                className="btn--xl"
                disabled={true}
                icon="tio-add"
              >
                {"Button"}
              </Button>
            </div>
            <br />
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 700,
                marginBottom: 30,
              }}
            >
              <Button
                type="ghost-primary"
                className="btn--sm"
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-primary"
                className="btn--md"
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-primary"
                className="btn--lg"
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-primary"
                className="btn--xl"
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 700,
                marginBottom: 30,
              }}
            >
              <Button
                type="ghost-primary"
                className="btn--sm"
                disabled={true}
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-primary"
                className="btn--md"
                disabled={true}
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-primary"
                className="btn--lg"
                disabled={true}
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-primary"
                className="btn--xl"
                disabled={true}
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
            </div>
          </div>
        </TabPane>
        <TabPane tab="ghost-secondary and ghost-secondary with icon" key="5">
          <div
            style={{
              padding: "30px 30px",
              backgroundColor: "#E6EAEE",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 700,
                marginBottom: 30,
              }}
            >
              <Button type="ghost-secondary" className="btn--sm">
                {"hihi"}
              </Button>
              <Button type="ghost-secondary" className="btn--md">
                {"hihi"}
              </Button>
              <Button type="ghost-secondary" className="btn--lg">
                {"hihi"}
              </Button>
              <Button type="ghost-secondary" className="btn--xl">
                {"hihi"}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 700,
                marginBottom: 30,
              }}
            >
              <Button
                type="ghost-secondary"
                className="btn--sm"
                disabled={true}
              >
                {"hihi"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--md"
                disabled={true}
              >
                {"hihi"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--lg"
                disabled={true}
              >
                {"hihi"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--xl"
                disabled={true}
              >
                {"hihi"}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 700,
                marginBottom: 30,
              }}
            >
              <Button type="ghost-secondary" className="btn--sm" icon="tio-add">
                {"Button"}
              </Button>
              <Button type="ghost-secondary" className="btn--md" icon="tio-add">
                {"Button"}
              </Button>
              <Button type="ghost-secondary" className="btn--lg" icon="tio-add">
                {"Button"}
              </Button>
              <Button type="ghost-secondary" className="btn--xl" icon="tio-add">
                {"Button"}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 700,
                marginBottom: 30,
              }}
            >
              <Button
                type="ghost-secondary"
                className="btn--sm"
                disabled={true}
                icon="tio-add"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--md"
                disabled={true}
                icon="tio-add"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--lg"
                disabled={true}
                icon="tio-add"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--xl"
                disabled={true}
                icon="tio-add"
              >
                {"Button"}
              </Button>
            </div>
            <br />
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 700,
                marginBottom: 30,
              }}
            >
              <Button
                type="ghost-secondary"
                className="btn--sm"
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--md"
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--lg"
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--xl"
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 700,
                marginBottom: 30,
              }}
            >
              <Button
                type="ghost-secondary"
                className="btn--sm"
                disabled={true}
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--md"
                disabled={true}
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--lg"
                disabled={true}
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--xl"
                disabled={true}
                icon="tio-down_ui"
              >
                {"Button"}
              </Button>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

function Primary() {
  return <Button type="secondary" />;
}

storiesOf("Button", module)
  .add(nameof(Default), Default)
  .add(nameof(Primary), Primary);
