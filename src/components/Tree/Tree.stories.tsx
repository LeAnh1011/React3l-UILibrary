import React from "react";
import { storiesOf } from "@storybook/react";
import Tree from "./Tree";
import { Observable } from "rxjs";
import { Model, ModelFilter } from "react3l-common";
import Radio, { RadioChangeEvent } from "antd/lib/radio";

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

const demoSearchFunc = (TModelFilter: ModelFilter) => {
  return demoObservable;
};

function Default() {
  const [checkedKeys, setCheckedKeys] = React.useState<any[]>([]);
  const [isMultiple, setMultiple] = React.useState(false);

  const handleChangeRadio = React.useCallback((event: RadioChangeEvent) => {
    setMultiple(event.target.value);
  }, []);

  const onChange = React.useCallback((items: Model[]) => {
    setCheckedKeys(items.map((currentItem) => currentItem?.id));
  }, []);

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <Tree
        getTreeData={demoSearchFunc}
        height={300}
        selectable={!isMultiple}
        checkable={isMultiple}
        virtual
        titleRender={(treeNode: any) => {
          console.log(treeNode);
          return <div>{treeNode.item?.name + " - " + treeNode.item?.code}</div>;
        }}
        onChange={onChange}
        checkedKeys={checkedKeys}
        checkStrictly={true}
      />
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeRadio} value={isMultiple}>
          <Radio value={false}>Single</Radio>
          <Radio value={true}>Multiple</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}

storiesOf("Tree", module).add("Default", Default);
