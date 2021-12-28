import React from "react";
import InputTag from "./InputTag";
import { Model } from "react3l-common";
import { useDebounceFn } from "ahooks";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import FormItem from "../../FormItem/FormItem";
import { ValidateStatus } from "./../../../config/enum";
import { DEBOUNCE_TIME_300 } from "../../../config/consts";
import { BORDER_TYPE } from "./../../../config/enum";

const demoItemList = [
  { id: 1, name: "Tag 1", code: "1" },
  { id: 2, name: "Tag 2", code: "2" },
  { id: 3, name: "Tag 3", code: "3" },
  { id: 4, name: "Tag 3", code: "4" },
  { id: 5, name: "Tag 3", code: "5" },
];
export function InputTagStories() {
  const [listItem, setListItem] = React.useState<Model[]>(demoItemList);

  const [type, setType] = React.useState<BORDER_TYPE>(BORDER_TYPE.BORDERED);

  const [isSmall, setIsSmall] = React.useState(false);

  const [isDisabled, setIsDisabled] = React.useState(false);

  const [isValidated, setValidated] = React.useState(false);

  const [withSearch, setWithSearch] = React.useState(true);

  const { run } = useDebounceFn(
    (searchTerm: string) => {
      // write call api here
    },
    {
      wait: DEBOUNCE_TIME_300,
    }
  );

  const handleClearItem = React.useCallback(
    (item: Model) => {
      const newListItem = listItem.filter(
        (currentItem) => currentItem.id !== item.id
      );
      setListItem(newListItem);
    },
    [listItem]
  );

  const handleClearMultiItem = React.useCallback(() => {
    setListItem([]);
  }, []);

  const handleSearchItem = React.useCallback(
    (searchTerm: string) => {
      run(searchTerm);
    },
    [run]
  );

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setType(event.target.value);
  }, []);

  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setIsSmall(event.target.value);
  }, []);

  const handleChangeValidated = React.useCallback((event: RadioChangeEvent) => {
    setValidated(event.target.value);
  }, []);

  const handleChangeDisabled = React.useCallback((event: RadioChangeEvent) => {
    setIsDisabled(event.target.value);
  }, []);

  const handleChangeWithSearch = React.useCallback(
    (event: RadioChangeEvent) => {
      setWithSearch(event.target.value);
    },
    []
  );

  return (
    <div style={{ margin: "10px", width: "380px" }}>
      <div style={{ marginTop: "10px", width: "380px" }}>
        <FormItem
          validateStatus={isValidated ? ValidateStatus.error : null}
          message={"Helper text"}
        >
          <InputTag
            type={type}
            listItem={listItem}
            placeHolder={"Select an option"}
            onSearch={handleSearchItem}
            onClear={handleClearItem}
            error={"Field required!"}
            isSmall={isSmall}
            disabled={isDisabled}
            label={"Label"}
            onClearMulti={handleClearMultiItem}
            isUsingSearch={withSearch}
          />
        </FormItem>
      </div>

      <button
        className="btn"
        style={{ marginTop: "10px", border: "none" }}
        onClick={() => setListItem(demoItemList)}
      >
        Reset
      </button>
      <div style={{ margin: "10px", width: "400px" }}>
        <Radio.Group onChange={handleChangeStyle} value={type}>
          <Radio value={BORDER_TYPE.MATERIAL}>Material</Radio>
          <Radio value={BORDER_TYPE.FLOAT_LABEL}>Float Label</Radio>
          <Radio value={BORDER_TYPE.BORDERED}>Bordered</Radio>
        </Radio.Group>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeSize} value={isSmall}>
          <Radio value={true}>Small</Radio>
          <Radio value={false}>Default</Radio>
        </Radio.Group>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeDisabled} value={isDisabled}>
          <Radio value={true}>Disabled</Radio>
          <Radio value={false}>Not Disabled</Radio>
        </Radio.Group>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeValidated} value={isValidated}>
          <Radio value={true}>Validated</Radio>
          <Radio value={false}>Not Validated</Radio>
        </Radio.Group>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeWithSearch} value={withSearch}>
          <Radio value={true}>Using Search</Radio>
          <Radio value={false}>Not Using Search</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}
