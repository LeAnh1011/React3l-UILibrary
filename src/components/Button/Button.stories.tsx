import React from "react";
import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import Button from "./Button";

function Primary() {
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
        <Button type="outline-primary" className="btn--sm" icon="tio-down_ui">
          {"Button"}
        </Button>
        <Button type="outline-primary" className="btn--md" icon="tio-down_ui">
          {"Button"}
        </Button>
        <Button type="outline-primary" className="btn--lg" icon="tio-down_ui">
          {"Button"}
        </Button>
        <Button type="outline-primary" className="btn--xl" icon="tio-down_ui">
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
    </div>
  );
}
function Secondary() {
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
    </div>
  );
}
function Ghost() {
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
        <Button type="ghost" className="btn--sm" disabled={true} icon="tio-add">
          {"Button"}
        </Button>
        <Button type="ghost" className="btn--md" disabled={true} icon="tio-add">
          {"Button"}
        </Button>
        <Button type="ghost" className="btn--lg" disabled={true} icon="tio-add">
          {"Button"}
        </Button>
        <Button type="ghost" className="btn--xl" disabled={true} icon="tio-add">
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
    </div>
  );
}
function GhostPrimary() {
  return (
    <div>
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
          <Button type="ghost-primary" className="btn--sm" icon="tio-down_ui">
            {"Button"}
          </Button>
          <Button type="ghost-primary" className="btn--md" icon="tio-down_ui">
            {"Button"}
          </Button>
          <Button type="ghost-primary" className="btn--lg" icon="tio-down_ui">
            {"Button"}
          </Button>
          <Button type="ghost-primary" className="btn--xl" icon="tio-down_ui">
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
    </div>
  );
}
function GhostSecondary() {
  return (
    <div>
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
          <Button type="ghost-secondary" className="btn--sm" disabled={true}>
            {"hihi"}
          </Button>
          <Button type="ghost-secondary" className="btn--md" disabled={true}>
            {"hihi"}
          </Button>
          <Button type="ghost-secondary" className="btn--lg" disabled={true}>
            {"hihi"}
          </Button>
          <Button type="ghost-secondary" className="btn--xl" disabled={true}>
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
          <Button type="ghost-secondary" className="btn--sm" icon="tio-down_ui">
            {"Button"}
          </Button>
          <Button type="ghost-secondary" className="btn--md" icon="tio-down_ui">
            {"Button"}
          </Button>
          <Button type="ghost-secondary" className="btn--lg" icon="tio-down_ui">
            {"Button"}
          </Button>
          <Button type="ghost-secondary" className="btn--xl" icon="tio-down_ui">
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
    </div>
  );
}
function Danger() {
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
        <Button type="danger" className="btn--sm">
          {"hihi"}
        </Button>
        <Button type="danger" className="btn--md">
          {"hihi"}
        </Button>
        <Button type="danger" className="btn--lg">
          {"hihi"}
        </Button>
        <Button type="danger" className="btn--xl">
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
        <Button type="danger" className="btn--sm" disabled={true}>
          {"hihi"}
        </Button>
        <Button type="danger" className="btn--md" disabled={true}>
          {"hihi"}
        </Button>
        <Button type="danger" className="btn--lg" disabled={true}>
          {"hihi"}
        </Button>
        <Button type="danger" className="btn--xl" disabled={true}>
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
        <Button type="outline-danger" className="btn--sm">
          {"hihi"}
        </Button>
        <Button type="outline-danger" className="btn--md">
          {"hihi"}
        </Button>
        <Button type="outline-danger" className="btn--lg">
          {"hihi"}
        </Button>
        <Button type="outline-danger" className="btn--xl">
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
        <Button type="outline-danger" className="btn--sm" disabled={true}>
          {"hihi"}
        </Button>
        <Button type="outline-danger" className="btn--md" disabled={true}>
          {"hihi"}
        </Button>
        <Button type="outline-danger" className="btn--lg" disabled={true}>
          {"hihi"}
        </Button>
        <Button type="outline-danger" className="btn--xl" disabled={true}>
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
    </div>
  );
}
function BleedPS() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: 400,
          marginBottom: 30,
        }}
      >
        <Button type="bleed-primary">{"hihi"}</Button>
        <Button type="bleed-primary" disabled={true}>
          {"hihi"}
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
        <Button type="bleed-primary" icon="tio-add">
          {"hihi"}
        </Button>
        <Button type="bleed-primary" icon="tio-add" disabled={true}>
          {"hihi"}
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
        <Button type="bleed-primary" icon="tio-down_ui">
          {"hihi"}
        </Button>
        <Button type="bleed-primary" icon="tio-down_ui" disabled={true}>
          {"hihi"}
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
        <Button type="bleed-secondary">{"hihi"}</Button>
        <Button type="bleed-secondary" disabled={true}>
          {"hihi"}
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
          {"hihi"}
        </Button>
        <Button type="bleed-secondary" icon="tio-add" disabled={true}>
          {"hihi"}
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
          {"hihi"}
        </Button>
        <Button type="bleed-secondary" icon="tio-down_ui" disabled={true}>
          {"hihi"}
        </Button>
      </div>
    </div>
  );
}

storiesOf("Button", module)
  .add(nameof(Primary), Primary)
  .add(nameof(Secondary), Secondary)
  .add(nameof(Ghost), Ghost)
  .add(nameof(GhostPrimary), GhostPrimary)
  .add(nameof(GhostSecondary), GhostSecondary)
  .add(nameof(Danger), Danger)
  .add(nameof(BleedPS), BleedPS);
