import { CommonService } from "@Services/common-service";
import React from "react";
import { Model } from "react3l-common";
import Checkbox from ".";
import "./CheckboxGroup.scss";

export interface CheckboxGroupComponentProps<T extends Model> {
  onChange?: (values: number[], selectedOptions?: T[]) => void;
  values?: number[];
  disabled?: boolean;
  label?: string;
  dataOptions?: T[];
  render?: (t: T) => string;
  maxLengthItem?: number;
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

function CheckboxGroup(props: CheckboxGroupComponentProps<Model>) {
  const {
    onChange,
    disabled,
    label,
    dataOptions,
    values,
    render,
    maxLengthItem,
  } = props;
  const [listCheckedKey, setListCheckedKey] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (values?.length > 0) {
      setListCheckedKey([...values]);
    }
  }, [values]);

  const handleChange = React.useCallback(
    (check, currentId) => {
      if (onChange && typeof onChange === "function") {
        if (check) {
          listCheckedKey.push(currentId);
          const selectedOptions: Model[] = [];
          dataOptions?.forEach((option) => {
            if (listCheckedKey?.includes(option?.id)) {
              selectedOptions.push(option);
            }
          });
          setListCheckedKey([...listCheckedKey]);
          return onChange(listCheckedKey, selectedOptions);
        } else {
          const newListKey = listCheckedKey?.filter((id) => id !== currentId);
          const selectedOptions: Model[] = [];
          dataOptions?.forEach((option) => {
            if (newListKey?.includes(option?.id)) {
              selectedOptions.push(option);
            }
          });
          setListCheckedKey([...newListKey]);
          return onChange(newListKey, selectedOptions);
        }
      }
      return;
    },
    [dataOptions, listCheckedKey, onChange]
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
