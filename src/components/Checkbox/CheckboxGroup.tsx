import React from "react";
import { Model } from "react3l-common";
import { ErrorObserver, Observable, Subscription } from "rxjs";
import Checkbox from "./Checkbox";
import "./CheckboxGroup.scss";

export interface CheckboxGroupComponentProps<T extends Model> {
  /**Handle change the values of CheckboxGroup */
  onChange?: (values: number[], selectedOptions?: T[]) => void;
  /**List value of checked  */
  values?: number[];
  /**Not allow change value */
  disabled?: boolean;
  /**Label of CheckboxGroup */
  label?: string;
  /**Pass data options (list item and label for list checkbox inside) */
  dataOptions?: T[];
  /**Option to render item as label of checkbox inside */
  render?: (t: T) => string;
  /**Maximum length of label checkbox inside */
  maxLengthItem?: number;
  /**API to get list data for checkbox inside (as dataOptions) */
  getList?: () => Observable<T[]>;
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
    getList,
  } = props;
  const [listCheckedKey, setListCheckedKey] = React.useState<number[]>([]);
  const [listOptions, setListOptions] = React.useState<Model[]>([]);
  const [firstLoad, setFirstLoad] = React.useState<boolean>(true);
  React.useEffect(() => {
    const subscription = new Subscription();
    if (firstLoad && typeof getList === "function") {
      subscription.add(getList);
      getList().subscribe({
        next: (res: Model[]) => {
          setListOptions(res);
        },
        error: (err: ErrorObserver<Error>) => {
          setListOptions([]);
        },
      });
      setFirstLoad(false);
    } else if (firstLoad && dataOptions?.length > 0) {
      setListOptions(dataOptions);
      setFirstLoad(false);
    }

    return function cleanup() {
      subscription.unsubscribe();
    };
  }, [dataOptions, firstLoad, getList]);

  React.useEffect(() => {
    if (values?.length > 0) {
      setListCheckedKey([...values]);
    } else {
      setListCheckedKey([]);
    }
  }, [values]);

  const handleChange = React.useCallback(
    (check, currentId) => {
      if (onChange && typeof onChange === "function") {
        if (check) {
          listCheckedKey.push(currentId);
          const selectedOptions: Model[] = [];
          listOptions?.forEach((option) => {
            if (listCheckedKey?.includes(option?.id)) {
              selectedOptions.push(option);
            }
          });
          setListCheckedKey([...listCheckedKey]);
          return onChange(listCheckedKey, selectedOptions);
        } else {
          const newListKey = listCheckedKey?.filter((id) => id !== currentId);
          const selectedOptions: Model[] = [];
          listOptions?.forEach((option) => {
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
    [listOptions, listCheckedKey, onChange]
  );

  return (
    <div className="checkbox-group__container">
      <div className="checkbox-group__label">{label}</div>
      <div className="p-t--3xs">
        {listOptions?.length > 0 &&
          listOptions?.map((option) => {
            return (
              <Checkbox
                checked={listCheckedKey?.includes(option?.id)}
                disabled={disabled}
                onChange={(check) => handleChange(check, option?.id)}
                key={option?.id}
                maxLengthItem={maxLengthItem}
                label={render(option)}
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
