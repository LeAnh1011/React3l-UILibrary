import { Story } from "@storybook/react";
import React from "react";
import { Model, ModelFilter } from "react3l-common";
import { Observable } from "rxjs";
import Tree from "./Tree";

const demoObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next([
      { id: 1, name: "Ban hành chính", code: "FAD", parentId: null },
      { id: 2, name: "Ban công nghệ thông tin", code: "FIM", parentId: 1 },
      { id: 3, name: "Ban nhân sự", code: "FHR", parentId: null },
      { id: 4, name: "Ban truyền thông", code: "FCC", parentId: 2 },
      { id: 5, name: "Ban công nghệ", code: "FTI", parentId: 4 },
      { id: 6, name: "Ban giám đốc", code: "BOD", parentId: 3 },
      { id: 7, name: "Ban quản trị", code: "BOM", parentId: 4 },
    ]);
  }, 2000);
});

const demoSearchFunc = (TModelFilter?: ModelFilter) => {
  return demoObservable;
};

export default {
  title: 'Tree',
  component: Tree,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: { 
    checkedKeys: { description: 'Phần chỉnh sửa này dành cho các prop của Antd' },
    expandedKeys: { description: 'Phần chỉnh sửa này dành cho các prop của Antd' },
    checkable: { description: 'Phần chỉnh sửa này dành cho các prop của Antd' },
  }
  
};

const Template: Story = (args) => {
  const [checkedKeys, setCheckedKeys] = React.useState<any[]>([]);

  const onChange = React.useCallback((items: Model[]) => {
    setCheckedKeys(items.map((currentItem) => currentItem?.id));
  }, []);

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <Tree
        {...args}
        getTreeData={demoSearchFunc}
        
        onChange={onChange}
        checkedKeys={checkedKeys}
      />
    </div>
  );
}

export const Default = Template.bind({});
Default.agrs = {
  type: "button"
}
