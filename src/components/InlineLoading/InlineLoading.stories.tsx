import React from "react";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs";
import { Story } from "@storybook/react";
import Button from "../Button";
import { Tabs } from "antd";
import { Add } from "@carbon/icons-react";
import InlineLoading from "./InlineLoading";
export type LoadingType = "default" | "submitting" | "submitted" | "error";
const { TabPane } = Tabs;
export default {
  title: "InlineLoading",
  component: InlineLoading,
  parameters: {
    controls: { expanded: true },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Description />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    status: {
      defaultValue: "default",
    },
  },
};
const Template: Story = (args) => {
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
                  {...args}
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
                  {...args}
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
                  {...args}
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
                  {...args}
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
                  {...args}
                  status={loadingType}
                  className="il-normal-no-icon btn--sm"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="primary"
                  className="btn--sm"
                  onClick={handleOnClick}
                  icon={<Add size={16} />}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  {...args}
                  status={loadingType}
                  className="il-normal-no-icon btn--sm"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="primary"
                  className="btn--sm"
                  onClick={handleOnClick}
                  icon={<Add size={16} />}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  {...args}
                  status={loadingType}
                  className="il-normal-no-icon btn--lg"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="primary"
                  className="btn--lg"
                  onClick={handleOnClick}
                  icon={<Add size={16} />}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  {...args}
                  status={loadingType}
                  className="il-normal-no-icon btn--xl"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="primary"
                  className="btn--xl"
                  onClick={handleOnClick}
                  icon={<Add size={16} />}
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
                  {...args}
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
                  {...args}
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
                  {...args}
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
                  {...args}
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
                  {...args}
                  status={loadingType}
                  className="il-outline-no-icon btn--sm"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="outline-primary"
                  className="btn--sm"
                  onClick={handleOnClick}
                  icon={<Add size={16} />}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  {...args}
                  status={loadingType}
                  className="il-outline-no-icon btn--sm"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="outline-primary"
                  className="btn--sm"
                  onClick={handleOnClick}
                  icon={<Add size={16} />}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  {...args}
                  status={loadingType}
                  className="il-outline-no-icon btn--lg"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="outline-primary"
                  className="btn--lg"
                  onClick={handleOnClick}
                  icon={<Add size={16} />}
                >
                  {"Button"}
                </Button>
              )}
            </>
            <>
              {loadingType !== "default" && (
                <InlineLoading
                  {...args}
                  status={loadingType}
                  className="il-outline-no-icon btn--xl"
                />
              )}
              {loadingType === "default" && (
                <Button
                  type="outline-primary"
                  className="btn--xl"
                  onClick={handleOnClick}
                  icon={<Add size={16} />}
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
                {...args}
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
                {...args}
                status={loadingType}
                className="il-bleed-no-icon btn--xl"
              />
            )}
            {loadingType === "default" && (
              <Button
                type="bleed-primary"
                onClick={handleOnClick}
                icon={<Add size={16} />}
              >
                {"Button"}
              </Button>
            )}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export const Default = Template.bind({});
