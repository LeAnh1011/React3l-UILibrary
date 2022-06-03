import { Tabs as TabsAntd } from "antd";
import { TabsType } from "antd/lib/tabs";
import classNames from "classnames";
import "./Tabs.scss";

const { TabPane } = TabsAntd;

export interface TabsProps {
  mode?: TabsType;
}

function Tabs(props: TabsProps) {
  const { mode } = props;

  const onChange = (key: any) => {
    console.log(key);
  };
  return (
    <>
      <div className={classNames("tabs__container")}>
        <TabsAntd onChange={onChange} type={mode}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3" className="ant-tabs-tab__child">
            Content of Tab Pane 3
          </TabPane>
        </TabsAntd>
      </div>
    </>
  );
}

Tabs.defaultProps = {
  placeRight: false,
};

export default Tabs;
