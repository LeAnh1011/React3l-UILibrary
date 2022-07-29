import { Tabs as TabsAntd } from "antd";
import type { TabsProps as TabsPropsAnt, TabsType } from "antd/lib/tabs";
import classNames from "classnames";
import React, { ReactNode } from "react";
import "./Tabs.scss";

export interface Errors {
  key: string;
}

export interface TabsProps extends TabsPropsAnt{
  mode?: TabsType;
  children?: ReactNode;
  errors?: Errors[];
}

function Tabs(props: TabsProps) {
  const { mode, children, errors } = props;
  React.useEffect(()=>{
    if(errors && errors?.length > 0) {
      errors.forEach(error => {
        setTimeout(()=>{
          const les = document.querySelector(`[id*="${error?.key}"]`).id;
          document.getElementById(`${les}`).style.color = "#da1e28";
         },1000);
      });
    }
  },[errors])
  return (
    <>
      <div className={classNames("tabs__container")}>
        <TabsAntd {...props} type={mode} >
         {children}
        </TabsAntd>
      </div>
    </>
  );
}

Tabs.defaultProps = {
  mode: 'line',
};

export default Tabs;
