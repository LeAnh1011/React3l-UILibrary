import { Tabs as TabsAntd } from "antd";
import type { TabsProps as TabsPropsAnt, TabsType } from "antd/lib/tabs";
import classNames from "classnames";
import React, { ReactNode } from "react";
import "./Tabs.scss";

export interface TabsProps extends TabsPropsAnt {
  mode?: TabsType;
  children?: ReactNode;
  tabErrorKeys?: string[];
}

const { TabPane } = TabsAntd;

function Tabs(props: TabsProps) {
  const { mode, children, tabErrorKeys } = props;
  const tabRef: React.LegacyRef<HTMLDivElement> = React.useRef();

  React.useEffect(() => {
    const tabElement = tabRef.current;
    if (tabErrorKeys && tabErrorKeys?.length > 0) {
      setTimeout(() => {
        const tabList = tabElement.querySelectorAll("div.ant-tabs-tab-btn");
        if (tabList && tabList.length > 0) {
          tabList.forEach((tab: Element) => {
            const htmlTab = tab as HTMLElement;
            const tabId = htmlTab.id;
            const filterValue = tabErrorKeys.filter((tabError) =>
              tabId.endsWith(`${tabError}`)
            )[0];
            if (filterValue) {
              htmlTab.classList.add("color-palette-red-60-important");
            } else {
              htmlTab.classList.remove("color-palette-red-60-important");
            }
          });
        }
      }, 100);
    } else {
      const tabList = tabElement.querySelectorAll(
        "div.ant-tabs-tab-btn.color-palette-red-60-important"
      );
      if (tabList && tabList.length > 0) {
        tabList.forEach((tab: Element) => {
          const htmlTab = tab as HTMLElement;
          htmlTab.classList.remove("color-palette-red-60-important");
        });
      }
    }
  }, [tabErrorKeys]);

  return (
    <>
      <div className={classNames("tabs__container")} ref={tabRef}>
        <TabsAntd {...props} type={mode}>
          {children}
        </TabsAntd>
      </div>
    </>
  );
}

Tabs.TabPane = TabPane;

Tabs.defaultProps = {
  mode: "line",
};

export default Tabs;
