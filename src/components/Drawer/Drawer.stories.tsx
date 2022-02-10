import { storiesOf } from "@storybook/react";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import FormItem from "../FormItem";
import Drawer from "./Drawer";
import InputText from "../Input/InputText/InputText";
import {
  BORDER_TYPE,
  NUMBER_BUTTON,
  ValidateStatus,
} from "./../../config/enum";
import React from "react";
import AdvanceDateFilter from "../AdvanceFilter/AdvanceDateFilter/AdvanceDateFilter";
import AdvanceIdFilter from "../AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import { of } from "rxjs";

export class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

const demoListEnum = (TModelFilter: ModelFilter) => {
  return of([
    {
      id: 1,
      name:
        "Option 2 very long one very long one Option 2 very long one very long one",
      code: "E1",
    },
    { id: 2, name: "Enum 2", code: "E2" },
    { id: 3, name: "Enum 3", code: "E3" },
    { id: 4, name: "Enum 4", code: "E4" },
    { id: 5, name: "Enum 5", code: "E5" },
  ]);
};

function Default() {
  const [numberButton, setNumberButton] = React.useState<NUMBER_BUTTON>(
    NUMBER_BUTTON.TWO
  );
  const handleChangeNumberButton = React.useCallback(
    (event: RadioChangeEvent) => {
      setNumberButton(event.target.value);
    },
    []
  );
  const [size, setSize] = React.useState<"sm" | "lg">("sm");
  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setSize(event.target.value);
  }, []);
  const [haveCloseIcon, setHaveCloseIcon] = React.useState<boolean>(false);
  const [haveDescrip, setHaveDescrip] = React.useState<boolean>(false);
  const [visible, setVisible] = React.useState<boolean>(true);
  const handleChangeHaveDescrip = React.useCallback(
    (event: RadioChangeEvent) => {
      setHaveDescrip(event.target.value);
    },
    []
  );
  const handleChangeHaveCloseIcon = React.useCallback(
    (event: RadioChangeEvent) => {
      setHaveCloseIcon(event.target.value);
    },
    []
  );
  function handleSave() {
    console.log("save");
    setVisible(false);
  }
  function handleCreate() {
    console.log("create");
  }
  function handleCancel() {
    console.log("cancel");
    setVisible(false);
  }

  return (
    <div>
      <div>
        <div style={{ margin: "10px", width: "500px" }}>
          <Radio.Group onChange={handleChangeSize} value={size}>
            <Radio value="sm">Small Size</Radio>
            <Radio value="lg">Large Size</Radio>
          </Radio.Group>
        </div>
        <div style={{ margin: "10px", width: "500px" }}>
          <Radio.Group onChange={handleChangeNumberButton} value={numberButton}>
            <Radio value={NUMBER_BUTTON.TWO}>2 Button</Radio>
            <Radio value={NUMBER_BUTTON.THREE}>3 Button</Radio>
          </Radio.Group>
        </div>
        <div style={{ margin: "10px", width: "500px" }}>
          <Radio.Group onChange={handleChangeHaveDescrip} value={haveDescrip}>
            <Radio value={true}>Has Description</Radio>
            <Radio value={false}>None Description</Radio>
          </Radio.Group>
        </div>
        <div style={{ margin: "10px", width: "500px" }}>
          <Radio.Group
            onChange={handleChangeHaveCloseIcon}
            value={haveCloseIcon}
          >
            <Radio value={true}>Has CloseIcon</Radio>
            <Radio value={false}>None CloseIcon</Radio>
          </Radio.Group>
        </div>
      </div>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        show modal
      </button>

      <Drawer
        visible={visible}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleCreate={handleCreate}
        isHaveDescription={haveDescrip}
        isHaveCloseIcon={haveCloseIcon}
        visibleFooter={true}
        loading={false}
        numberButton={numberButton}
        size={size}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <FormItem
            validateStatus={ValidateStatus.success}
            message={"Field required!"}
          >
            <InputText
              placeHolder={"Enter text..."}
              type={BORDER_TYPE.MATERIAL}
            />
          </FormItem>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
          }}
        >
          <FormItem
            validateStatus={ValidateStatus.success}
            message={"Field required!"}
          >
            <InputText
              placeHolder={"Enter text..."}
              type={BORDER_TYPE.MATERIAL}
            />
          </FormItem>
        </div>
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            marginTop: 16,
          }}
        >
          <div style={{ paddingRight: 8, width: "50%" }}>
            <FormItem
              validateStatus={ValidateStatus.warning}
              message={"Field required!"}
            >
              <InputText placeHolder={"Enter text..."} />
            </FormItem>
          </div>

          <div style={{ paddingLeft: 8, width: "50%" }}>
            <FormItem
              validateStatus={ValidateStatus.warning}
              message={"Field required!"}
            >
              <InputText placeHolder={"Enter text..."} />
            </FormItem>
          </div>
        </div>
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
          }}
        >
          <div style={{ paddingRight: 8, width: "50%" }}>
            <FormItem
              validateStatus={ValidateStatus.error}
              message={"Field required!"}
            >
              <InputText placeHolder={"Enter text..."} />
            </FormItem>
          </div>

          <div style={{ paddingLeft: 8, width: "50%" }}>
            <FormItem
              validateStatus={ValidateStatus.error}
              message={"Field required!"}
            >
              <InputText placeHolder={"Enter text..."} />
            </FormItem>
          </div>
        </div>
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
          }}
        >
          <div style={{ paddingRight: 8, width: "50%" }}>
            <FormItem
              validateStatus={ValidateStatus.warning}
              message={"Field required!"}
            >
              <InputText placeHolder={"Enter text..."} />
            </FormItem>
          </div>

          <div style={{ paddingLeft: 8, width: "50%" }}>
            <FormItem
              validateStatus={ValidateStatus.warning}
              message={"Field required!"}
            >
              <InputText placeHolder={"Enter text..."} />
            </FormItem>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
          }}
        >
          <div style={{ paddingRight: 8, width: "50%" }}>
            <FormItem
              validateStatus={ValidateStatus.success}
              message={"Field required!"}
            >
              <InputText
                placeHolder={"Enter text..."}
                type={BORDER_TYPE.MATERIAL}
              />
            </FormItem>
          </div>

          <div style={{ paddingLeft: 8, width: "50%" }}>
            <FormItem
              validateStatus={ValidateStatus.success}
              message={"Field required!"}
            >
              <InputText
                placeHolder={"Enter text..."}
                type={BORDER_TYPE.MATERIAL}
              />
            </FormItem>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
          }}
        >
          <FormItem
            validateStatus={ValidateStatus.success}
            message={"Field required!"}
          >
            <InputText
              placeHolder={"Enter text..."}
              type={BORDER_TYPE.MATERIAL}
            />
          </FormItem>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
          }}
        >
          <FormItem
            validateStatus={ValidateStatus.success}
            message={"Field required!"}
          >
            <InputText
              placeHolder={"Enter text..."}
              type={BORDER_TYPE.MATERIAL}
            />
          </FormItem>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
          }}
        >
          <FormItem
            validateStatus={ValidateStatus.success}
            message={"Field required!"}
          >
            <InputText
              placeHolder={"Enter text..."}
              type={BORDER_TYPE.MATERIAL}
            />
          </FormItem>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
          }}
        >
          <FormItem
            validateStatus={ValidateStatus.success}
            message={"Field required!"}
          >
            <InputText
              placeHolder={"Enter text..."}
              type={BORDER_TYPE.MATERIAL}
            />
          </FormItem>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
          }}
        >
          <AdvanceIdFilter
            placeHolder={"Select Organization"}
            model={null}
            searchProperty={"name"}
            onChange={() => {}}
            getList={demoListEnum}
            classFilter={DemoFilter}
            label={"Label"}
          />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
          }}
        >
          <AdvanceDateFilter
            onChange={() => {}}
            label="Ngày nhập hàng"
            placeHolder={"Chọn ngày"}
            value={null}
          />
        </div>
      </Drawer>
    </div>
  );
}

storiesOf("Drawer", module).add("Default", Default);
