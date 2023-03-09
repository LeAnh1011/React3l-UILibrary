import { CommonService } from "@Services/common-service";
import React from "react";
import { Model } from "react3l-common";
import Checkbox from ".";
import "./CheckboxGroup.scss";

export interface CheckboxGroupComponentProps {
  onChange?: (values: number[]) => void;
  value?: number[];
  disabled?: boolean;
  label?: string;
  dataOptions?: Model[];
  render?: (t: Model) => string;
  maxLengthItem?: number;
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

function CheckboxGroup(props: CheckboxGroupComponentProps) {
  const {
    onChange,
    disabled,
    label,
    dataOptions,
    value,
    render,
    maxLengthItem,
  } = props;
  const [listCheckedKey, setListCheckedKey] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (value?.length > 0) {
      setListCheckedKey([...value]);
    }
  }, [value]);

  const handleChange = React.useCallback(
    (check, currentId) => {
      if (onChange && typeof onChange === "function") {
        if (check) {
          listCheckedKey.push(currentId);
          setListCheckedKey([...listCheckedKey]);
          return onChange(listCheckedKey);
        } else {
          const newList = listCheckedKey?.filter((id) => id !== currentId);
          setListCheckedKey([...newList]);
          return onChange(newList);
        }
      }
      return;
    },
    [listCheckedKey, onChange]
  );

  return (
    <div className="checkbox-group__container">
      <div className="checkbox-group__label">{label}</div>
      <div>
        {dataOptions?.length > 0 &&
          dataOptions?.map((option) => {
            return (
              <Checkbox
                checked={listCheckedKey?.includes(option?.id)}
                disabled={disabled}
                onChange={(check) => handleChange(check, option?.id)}
                key={option?.id}
                label={CommonService.limitWord(render(option), maxLengthItem)}
              />
            );
          })}
      </div>
    </div>
  );
}

CheckboxGroup.defaultProps = {
  disabled: false,
  render: defaultRenderObject,
  maxLengthItem: 30,
};

export default CheckboxGroup;
