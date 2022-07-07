import React from "react";
import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import Button from "../Button";
import { Tabs } from "antd";
import Add16 from "@carbon/icons-react/es/add/16";
import InlineLoading from "./InlineLoading";
export type LoadingType = "default" | "submitting" | "submitted" | "error";
const { TabPane } = Tabs;
function InlineLoadingView() {
  const [loadingType, setLoadingType] = React.useState<LoadingType>("default");
  let i = 0;
  const handleOnClick = React.useCallback(() => {
    setLoadingType("submitting");
    setTimeout(() => {
      if (i % 2 === 0) {
        setLoadingType("submitted");
      } else {
        setLoadingType("error");
      }
      i++;
      setTimeout(() => {
        setLoadingType("default");
      }, 1000);
    }, 2000);
  }, [i]);
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
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-normal-no-icon btn--sm"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="primary"
                  className="btn--sm"
                  onClick={handleOnClick}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-normal-no-icon btn--sm"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="primary"
                  className="btn--sm"
                  onClick={handleOnClick}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-normal-no-icon btn--lg"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="primary"
                  className="btn--lg"
                  onClick={handleOnClick}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-normal-no-icon btn--xl"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="primary"
                  className="btn--xl"
                  onClick={handleOnClick}
                >
                  {"Button"}
                </Button>
              )}
            </>
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
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-normal-no-icon btn--sm"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="primary"
                  className="btn--sm"
                  onClick={handleOnClick}
                  icon={<Add16 />}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-normal-no-icon btn--sm"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="primary"
                  className="btn--sm"
                  onClick={handleOnClick}
                  icon={<Add16 />}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-normal-no-icon btn--lg"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="primary"
                  className="btn--lg"
                  onClick={handleOnClick}
                  icon={<Add16 />}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-normal-no-icon btn--xl"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="primary"
                  className="btn--xl"
                  onClick={handleOnClick}
                  icon={<Add16 />}
                >
                  {"Button"}
                </Button>
              )}
            </>
          </div>
        </TabPane>
        <TabPane tab="outline" key="2">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 700,
              marginBottom: 30,
            }}
          >
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-outline-no-icon btn--sm"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="outline-primary"
                  className="btn--sm"
                  onClick={handleOnClick}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-outline-no-icon btn--sm"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="outline-primary"
                  className="btn--sm"
                  onClick={handleOnClick}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-outline-no-icon btn--lg"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="outline-primary"
                  className="btn--lg"
                  onClick={handleOnClick}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-outline-no-icon btn--xl"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="outline-primary"
                  className="btn--xl"
                  onClick={handleOnClick}
                >
                  {"Button"}
                </Button>
              )}
            </>
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
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-outline-no-icon btn--sm"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="outline-primary"
                  className="btn--sm"
                  onClick={handleOnClick}
                  icon={<Add16 />}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-outline-no-icon btn--sm"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="outline-primary"
                  className="btn--sm"
                  onClick={handleOnClick}
                  icon={<Add16 />}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-outline-no-icon btn--lg"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="outline-primary"
                  className="btn--lg"
                  onClick={handleOnClick}
                  icon={<Add16 />}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  status={loadingType}
                  className="il-outline-no-icon btn--xl"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="outline-primary"
                  className="btn--xl"
                  onClick={handleOnClick}
                  icon={<Add16 />}
                >
                  {"Button"}
                </Button>
              )}
            </>
          </div>
        </TabPane>
        <TabPane tab="Bleed" key="3">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: 400,
              marginBottom: 30,
            }}
          >
            {loadingType !== "default" && (
              <InlineLoading
                status={loadingType}
                className="il-bleed-no-icon btn--xl"
              />
            )}
            {loadingType === "default" && (
              <Button type="bleed-primary" onClick={handleOnClick}>
                {"Button"}
              </Button>
            )}
            {loadingType !== "default" && (
              <InlineLoading
                status={loadingType}
                className="il-bleed-no-icon btn--xl"
              />
            )}
            {loadingType === "default" && (
              <Button
                type="bleed-primary"
                onClick={handleOnClick}
                icon={<Add16 />}
              >
                {"Button"}
              </Button>
            )}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

storiesOf("InlineLoading", module).add(
  nameof(InlineLoadingView),
  InlineLoadingView
);
