import React from "react";
import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import Button from "./Button";
import { Tabs } from "antd";

const { TabPane } = Tabs;
function NormalButtonView() {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleOnClick = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Primary" key="1">
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
              loading={loading}
              onClick={handleOnClick}
              isSubmitBtn={true}
            >
              {"Button"}
            </Button>
            <Button type="primary" className="btn--md">
              {"Button"}
            </Button>
            <Button type="primary" className="btn--lg">
              {"Button"}
            </Button>
            <Button type="primary" className="btn--xl">
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
            <Button type="primary" className="btn--sm" disabled={true}>
              {"Button"}
            </Button>
            <Button type="primary" className="btn--md" disabled={true}>
              {"Button"}
            </Button>
            <Button type="primary" className="btn--lg" disabled={true}>
              {"Button"}
            </Button>
            <Button type="primary" className="btn--xl" disabled={true}>
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
              icon="tio-add"
              loading={loading}
              onClick={handleOnClick}
              isSubmitBtn={true}
            >
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
            <Button
              type="primary"
              className="btn--sm"
              icon="tio-down_ui"
              loading={loading}
              onClick={handleOnClick}
              isSubmitBtn={true}
            >
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
        </TabPane>
        <TabPane tab="Secondary" key="2">
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
              {"Button"}
            </Button>
            <Button type="secondary" className="btn--md">
              {"Button"}
            </Button>
            <Button type="secondary" className="btn--lg">
              {"Button"}
            </Button>
            <Button type="secondary" className="btn--xl">
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
            <Button type="secondary" className="btn--sm" disabled={true}>
              {"Button"}
            </Button>
            <Button type="secondary" className="btn--md" disabled={true}>
              {"Button"}
            </Button>
            <Button type="secondary" className="btn--lg" disabled={true}>
              {"Button"}
            </Button>
            <Button type="secondary" className="btn--xl" disabled={true}>
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
        <TabPane tab="Danger/Destructive" key="3">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="danger" className="btn--sm">
              {"Button"}
            </Button>
            <Button type="danger" className="btn--md">
              {"Button"}
            </Button>
            <Button type="danger" className="btn--lg">
              {"Button"}
            </Button>
            <Button type="danger" className="btn--xl">
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
            <Button type="danger" className="btn--sm" disabled={true}>
              {"Button"}
            </Button>
            <Button type="danger" className="btn--md" disabled={true}>
              {"Button"}
            </Button>
            <Button type="danger" className="btn--lg" disabled={true}>
              {"Button"}
            </Button>
            <Button type="danger" className="btn--xl" disabled={true}>
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
            <Button type="danger" className="btn--sm" icon="tio-clear">
              {"Button"}
            </Button>
            <Button type="danger" className="btn--md" icon="tio-clear">
              {"Button"}
            </Button>
            <Button type="danger" className="btn--lg" icon="tio-clear">
              {"Button"}
            </Button>
            <Button type="danger" className="btn--xl" icon="tio-clear">
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
              type="danger"
              className="btn--sm"
              disabled={true}
              icon="tio-clear"
            >
              {"Button"}
            </Button>
            <Button
              type="danger"
              className="btn--md"
              disabled={true}
              icon="tio-clear"
            >
              {"Button"}
            </Button>
            <Button
              type="danger"
              className="btn--lg"
              disabled={true}
              icon="tio-clear"
            >
              {"Button"}
            </Button>
            <Button
              type="danger"
              className="btn--xl"
              disabled={true}
              icon="tio-clear"
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
              type="danger"
              className="btn--sm"
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
            <Button
              type="danger"
              className="btn--md"
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
            <Button
              type="danger"
              className="btn--lg"
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
            <Button
              type="danger"
              className="btn--xl"
              icon="tio-clear_circle_outlined"
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
              type="danger"
              className="btn--sm"
              disabled={true}
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
            <Button
              type="danger"
              className="btn--md"
              disabled={true}
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
            <Button
              type="danger"
              className="btn--lg"
              disabled={true}
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
            <Button
              type="danger"
              className="btn--xl"
              disabled={true}
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
function OutlineButtonView() {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleOnClick = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Outline-Primary" key="1">
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
              loading={loading}
              onClick={handleOnClick}
              isSubmitBtn={true}
            >
              {"Button"}
            </Button>
            <Button type="outline-primary" className="btn--md">
              {"Button"}
            </Button>
            <Button type="outline-primary" className="btn--lg">
              {"Button"}
            </Button>
            <Button type="outline-primary" className="btn--xl">
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
            <Button type="outline-primary" className="btn--sm" disabled={true}>
              {"Button"}
            </Button>
            <Button type="outline-primary" className="btn--md" disabled={true}>
              {"Button"}
            </Button>
            <Button type="outline-primary" className="btn--lg" disabled={true}>
              {"Button"}
            </Button>
            <Button type="outline-primary" className="btn--xl" disabled={true}>
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
              icon="tio-add"
              loading={loading}
              onClick={handleOnClick}
              isSubmitBtn={true}
            >
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
              loading={loading}
              onClick={handleOnClick}
              isSubmitBtn={true}
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
        <TabPane tab="Outline-danger" key="2">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <Button type="outline-danger" className="btn--sm">
              {"Button"}
            </Button>
            <Button type="outline-danger" className="btn--md">
              {"Button"}
            </Button>
            <Button type="outline-danger" className="btn--lg">
              {"Button"}
            </Button>
            <Button type="outline-danger" className="btn--xl">
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
            <Button type="outline-danger" className="btn--sm" disabled={true}>
              {"Button"}
            </Button>
            <Button type="outline-danger" className="btn--md" disabled={true}>
              {"Button"}
            </Button>
            <Button type="outline-danger" className="btn--lg" disabled={true}>
              {"Button"}
            </Button>
            <Button type="outline-danger" className="btn--xl" disabled={true}>
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
            <Button type="outline-danger" className="btn--sm" icon="tio-clear">
              {"Button"}
            </Button>
            <Button type="outline-danger" className="btn--md" icon="tio-clear">
              {"Button"}
            </Button>
            <Button type="outline-danger" className="btn--lg" icon="tio-clear">
              {"Button"}
            </Button>
            <Button type="outline-danger" className="btn--xl" icon="tio-clear">
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
              type="outline-danger"
              className="btn--sm"
              disabled={true}
              icon="tio-clear"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-danger"
              className="btn--md"
              disabled={true}
              icon="tio-clear"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-danger"
              className="btn--lg"
              disabled={true}
              icon="tio-clear"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-danger"
              className="btn--xl"
              disabled={true}
              icon="tio-clear"
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
              type="outline-danger"
              className="btn--sm"
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-danger"
              className="btn--md"
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-danger"
              className="btn--lg"
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-danger"
              className="btn--xl"
              icon="tio-clear_circle_outlined"
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
              type="outline-danger"
              className="btn--sm"
              disabled={true}
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-danger"
              className="btn--md"
              disabled={true}
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-danger"
              className="btn--lg"
              disabled={true}
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
            <Button
              type="outline-danger"
              className="btn--xl"
              disabled={true}
              icon="tio-clear_circle_outlined"
            >
              {"Button"}
            </Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

function GhostButtonView() {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Ghost" key="1">
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
              {"Button"}
            </Button>
            <Button type="ghost" className="btn--md">
              {"Button"}
            </Button>
            <Button type="ghost" className="btn--lg">
              {"Button"}
            </Button>
            <Button type="ghost" className="btn--xl">
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
            <Button type="ghost" className="btn--sm" disabled={true}>
              {"Button"}
            </Button>
            <Button type="ghost" className="btn--md" disabled={true}>
              {"Button"}
            </Button>
            <Button type="ghost" className="btn--lg" disabled={true}>
              {"Button"}
            </Button>
            <Button type="ghost" className="btn--xl" disabled={true}>
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
        <TabPane tab="Ghost-Primary" key="2">
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
                {"Button"}
              </Button>
              <Button type="ghost-primary" className="btn--md">
                {"Button"}
              </Button>
              <Button type="ghost-primary" className="btn--lg">
                {"Button"}
              </Button>
              <Button type="ghost-primary" className="btn--xl">
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
              <Button type="ghost-primary" className="btn--sm" disabled={true}>
                {"Button"}
              </Button>
              <Button type="ghost-primary" className="btn--md" disabled={true}>
                {"Button"}
              </Button>
              <Button type="ghost-primary" className="btn--lg" disabled={true}>
                {"Button"}
              </Button>
              <Button type="ghost-primary" className="btn--xl" disabled={true}>
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
        <TabPane tab="Ghost-Secondary" key="3">
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
                {"Button"}
              </Button>
              <Button type="ghost-secondary" className="btn--md">
                {"Button"}
              </Button>
              <Button type="ghost-secondary" className="btn--lg">
                {"Button"}
              </Button>
              <Button type="ghost-secondary" className="btn--xl">
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
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--md"
                disabled={true}
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--lg"
                disabled={true}
              >
                {"Button"}
              </Button>
              <Button
                type="ghost-secondary"
                className="btn--xl"
                disabled={true}
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

function BleedButtonView() {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleOnClick = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bleed-Primary" key="1">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: 400,
              marginBottom: 30,
            }}
          >
            <Button
              type="bleed-primary"
              loading={loading}
              onClick={handleOnClick}
              isSubmitBtn={true}
            >
              {"Button"}
            </Button>
            <Button type="bleed-primary" disabled={true}>
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: 400,
              marginBottom: 30,
            }}
          >
            <Button
              type="bleed-primary"
              icon="tio-add"
              loading={loading}
              onClick={handleOnClick}
              isSubmitBtn={true}
            >
              {"Button"}
            </Button>
            <Button type="bleed-primary" icon="tio-add" disabled={true}>
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: 400,
              marginBottom: 30,
            }}
          >
            <Button
              type="bleed-primary"
              icon="tio-down_ui"
              loading={loading}
              onClick={handleOnClick}
              isSubmitBtn={true}
            >
              {"Button"}
            </Button>
            <Button type="bleed-primary" icon="tio-down_ui" disabled={true}>
              {"Button"}
            </Button>
          </div>
        </TabPane>
        <TabPane tab="Bleed-Secondary" key="2">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: 400,
              marginBottom: 30,
            }}
          >
            <Button type="bleed-secondary">{"Button"}</Button>
            <Button type="bleed-secondary" disabled={true}>
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: 400,
              marginBottom: 30,
            }}
          >
            <Button type="bleed-secondary" icon="tio-add">
              {"Button"}
            </Button>
            <Button type="bleed-secondary" icon="tio-add" disabled={true}>
              {"Button"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: 400,
              marginBottom: 30,
            }}
          >
            <Button type="bleed-secondary" icon="tio-down_ui">
              {"Button"}
            </Button>
            <Button type="bleed-secondary" icon="tio-down_ui" disabled={true}>
              {"Button"}
            </Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

function LinkPlainAndLink() {
  return (
    <div
      style={{
        padding: "30px 30px",
        backgroundColor: "#E6EAEE",
      }}
    >
      <h2>Button Link Plain</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: 700,
          marginBottom: 30,
        }}
      >
        <Button type="link-plain" className="btn--sm">
          {"Button"}
        </Button>
        <Button type="link-plain" className="btn--md">
          {"Button"}
        </Button>
        <Button type="link-plain" className="btn--lg">
          {"Button"}
        </Button>
        <Button type="link-plain" className="btn--xl">
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
        <Button type="link-plain" className="btn--sm" disabled={true}>
          {"Button"}
        </Button>
        <Button type="link-plain" className="btn--md" disabled={true}>
          {"Button"}
        </Button>
        <Button type="link-plain" className="btn--lg" disabled={true}>
          {"Button"}
        </Button>
        <Button type="link-plain" className="btn--xl" disabled={true}>
          {"Button"}
        </Button>
      </div>
      <h2>Button Link</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: 200,
          marginBottom: 30,
        }}
      >
        <Button type="link">{"button"}</Button>
        <Button type="link" disabled={true}>
          {"button"}
        </Button>
      </div>
    </div>
  );
}
function IconOnlyButtonView() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: 700,
          marginBottom: 30,
        }}
      >
        <Button type="icon-only-primary" icon="tio-add" className="btn--sm" />
        <Button type="icon-only-primary" icon="tio-add" className="btn--md" />
        <Button type="icon-only-primary" icon="tio-add" className="btn--lg" />
        <Button type="icon-only-primary" icon="tio-add" className="btn--xl" />
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
          type="icon-only-primary"
          icon="tio-add"
          className="btn--sm"
          disabled={true}
        />
        <Button
          type="icon-only-primary"
          icon="tio-add"
          className="btn--md"
          disabled={true}
        />
        <Button
          type="icon-only-primary"
          icon="tio-add"
          className="btn--lg"
          disabled={true}
        />
        <Button
          type="icon-only-primary"
          icon="tio-add"
          className="btn--xl"
          disabled={true}
        />
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
          type="icon-only-outline-primary"
          icon="tio-add"
          className="btn--sm"
        />
        <Button
          type="icon-only-outline-primary"
          icon="tio-add"
          className="btn--md"
        />
        <Button
          type="icon-only-outline-primary"
          icon="tio-add"
          className="btn--lg"
        />
        <Button
          type="icon-only-outline-primary"
          icon="tio-add"
          className="btn--xl"
        />
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
          type="icon-only-outline-primary"
          icon="tio-add"
          className="btn--sm"
          disabled={true}
        />
        <Button
          type="icon-only-outline-primary"
          icon="tio-add"
          className="btn--md"
          disabled={true}
        />
        <Button
          type="icon-only-outline-primary"
          icon="tio-add"
          className="btn--lg"
          disabled={true}
        />
        <Button
          type="icon-only-outline-primary"
          icon="tio-add"
          className="btn--xl"
          disabled={true}
        />
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
        <Button type="icon-only-danger" icon="tio-add" className="btn--sm" />
        <Button type="icon-only-danger" icon="tio-add" className="btn--md" />
        <Button type="icon-only-danger" icon="tio-add" className="btn--lg" />
        <Button type="icon-only-danger" icon="tio-add" className="btn--xl" />
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
          type="icon-only-danger"
          icon="tio-add"
          className="btn--sm"
          disabled={true}
        />
        <Button
          type="icon-only-danger"
          icon="tio-add"
          className="btn--md"
          disabled={true}
        />
        <Button
          type="icon-only-danger"
          icon="tio-add"
          className="btn--lg"
          disabled={true}
        />
        <Button
          type="icon-only-danger"
          icon="tio-add"
          className="btn--xl"
          disabled={true}
        />
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
          type="icon-only-outline-danger"
          icon="tio-add"
          className="btn--sm"
        />
        <Button
          type="icon-only-outline-danger"
          icon="tio-add"
          className="btn--md"
        />
        <Button
          type="icon-only-outline-danger"
          icon="tio-add"
          className="btn--lg"
        />
        <Button
          type="icon-only-outline-danger"
          icon="tio-add"
          className="btn--xl"
        />
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
          type="icon-only-outline-danger"
          icon="tio-add"
          className="btn--sm"
          disabled={true}
        />
        <Button
          type="icon-only-outline-danger"
          icon="tio-add"
          className="btn--md"
          disabled={true}
        />
        <Button
          type="icon-only-outline-danger"
          icon="tio-add"
          className="btn--lg"
          disabled={true}
        />
        <Button
          type="icon-only-outline-danger"
          icon="tio-add"
          className="btn--xl"
          disabled={true}
        />
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
        <Button type="icon-only-ghost" icon="tio-add" className="btn--sm" />
        <Button type="icon-only-ghost" icon="tio-add" className="btn--md" />
        <Button type="icon-only-ghost" icon="tio-add" className="btn--lg" />
        <Button type="icon-only-ghost" icon="tio-add" className="btn--xl" />
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
          type="icon-only-ghost"
          icon="tio-add"
          className="btn--sm"
          disabled={true}
        />
        <Button
          type="icon-only-ghost"
          icon="tio-add"
          className="btn--md"
          disabled={true}
        />
        <Button
          type="icon-only-ghost"
          icon="tio-add"
          className="btn--lg"
          disabled={true}
        />
        <Button
          type="icon-only-ghost"
          icon="tio-add"
          className="btn--xl"
          disabled={true}
        />
      </div>
    </div>
  );
}

storiesOf("Button", module)
  .add(nameof(NormalButtonView), NormalButtonView)
  .add(nameof(OutlineButtonView), OutlineButtonView)
  .add(nameof(GhostButtonView), GhostButtonView)
  .add(nameof(BleedButtonView), BleedButtonView)
  .add(nameof(LinkPlainAndLink), LinkPlainAndLink)
  .add(nameof(IconOnlyButtonView), IconOnlyButtonView);
