import { Close16 } from "@carbon/icons-react";
import { Tooltip } from "antd";
import classNames from "classnames";
import { formatDate } from "helpers/date-time";
import { formatNumber } from "helpers/number";
import { Moment } from "moment";
import React from "react";
import {
  DateFilter,
  GuidFilter,
  IdFilter,
  NumberFilter,
  StringFilter,
} from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { TFunction } from 'i18next';
import "./TagFilter.scss";



export interface TagFilterProps {
  className?: string;
  value?: ModelFilter;
  keyTranslate?: string;
  translate?: TFunction;
  onClear?: (t: any) => void;
  handleChangeFilter?: (modelFilter: ModelFilter) => void;
}

interface Tag {
  key?: string;
  value?: String | Number | Array<Model> | any;
  type?: string;
  filterKey: string | string[];
  classFilter?: new () => ModelFilter
}


function TagFilter(props: TagFilterProps) {
  const { className, value, keyTranslate, onClear, translate, handleChangeFilter } = props;

  const convertList = React.useCallback((search: ModelFilter) => {
    let list = [] as Tag[];
    if (typeof search === "object" && search !== null) {
      Object.entries<
        StringFilter | DateFilter | NumberFilter | IdFilter | GuidFilter
      >(search as any).forEach(([key, value]) => {
        debugger
        if (value instanceof StringFilter) {

          Object.entries(value).forEach(([filterKey, filterValue]) => {
            // filter by StringFilter
            if (typeof filterValue === "string" && filterValue !== "") {

              switch (filterKey) {
                case "startWith":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "string",
                    filterKey,
                    classFilter: StringFilter
                  });
                case "endWith":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "string",
                    filterKey,
                    classFilter: StringFilter
                  });
                case "contain":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "string",
                    filterKey,
                    classFilter: StringFilter
                  });
                default:
                  // Do nothing
                  break;
              }
            }
          });
        }
        // filter by NumberFilter
        if (value instanceof NumberFilter) {
          Object.entries(value).forEach(([filterKey, filterValue]) => {
            if (typeof filterValue === "number" && !Number.isNaN(filterValue)) {
              switch (filterKey) {
                case "equal":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "number",
                    filterKey,
                    classFilter: NumberFilter
                  });
                case "notEqual":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "number",
                    filterKey,
                  });
                case "less":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "number",
                    filterKey,
                    classFilter: NumberFilter
                  });
                case "greater":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "number",
                    filterKey,
                    classFilter: NumberFilter
                  });
                case "lessEqual":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "number",
                    filterKey,
                    classFilter: NumberFilter
                  });
                case "greaterEqual":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "number",
                    filterKey,
                    classFilter: NumberFilter
                  });
                default:
                  // Do nothing
                  break;
              }
            }
          });
        }
        // filter by DateFilter
        if (value instanceof DateFilter) {
          Object.entries(value).forEach(([filterKey, filterValue]) => {
            switch (filterKey) {
              case "equal":
                return list.push({
                  key,
                  value: filterValue,
                  type: "date",
                  filterKey,
                  classFilter: DateFilter
                });
              case "notEqual":
                return list.push({
                  key,
                  value: filterValue,
                  type: "date",
                  filterKey,
                  classFilter: DateFilter
                });
              case "less":
                const lessFiltered = list.filter((t: any) => t["key"] === key);
                if (!lessFiltered || lessFiltered?.length === 0) {
                  return list.push({
                    key,
                    value: [filterValue],
                    type: "date",
                    filterKey: [filterKey],
                    classFilter: DateFilter
                  });
                } else {
                  if (lessFiltered?.length === 2) {
                    list = list.map((t: any) => {
                      if (t["key"] === key) {
                        t["value"][0] = filterValue;
                      }
                      return t;
                    });
                  } else {
                    list = list.map((t: any) => {
                      if (t["key"] === key) {
                        t["value"]?.push(filterValue);
                        t["filterKey"]?.push(filterKey);
                      }
                      return t;
                    });
                  }
                }

                break;
              case "greater":
                const greaterFiltered = list.filter((t: any) => t["key"] === key);
                if (!greaterFiltered || greaterFiltered?.length === 0) {
                  return list.push({
                    key,
                    value: [filterValue],
                    type: "date",
                    filterKey: [filterKey],
                    classFilter: DateFilter
                  });
                } else {
                  if (greaterFiltered?.length === 2) {
                    list = list.map((t: any) => {
                      if (t["key"] === key) {
                        t["value"][1] = filterValue;
                      }
                      return t;
                    });
                  } else {
                    list = list.map((t: any) => {
                      if (t["key"] === key) {
                        t["value"]?.push(filterValue);
                        t["filterKey"]?.push(filterKey);
                      }
                      return t;
                    });
                  }
                }
                break;
              case "lessEqual":
                const lessEqualFiltered = list.filter((t: any) => t["key"] === key);
                if (!lessEqualFiltered || lessEqualFiltered?.length === 0) {
                  return list.push({
                    key,
                    value: [filterValue],
                    type: "date",
                    filterKey: [filterKey],
                    classFilter: DateFilter
                  });
                } else {
                  if (lessEqualFiltered?.length === 2) {
                    list = list.map((t: any) => {
                      if (t["key"] === key) {
                        t["value"][0] = filterValue;
                      }
                      return t;
                    });
                  } else {
                    list = list.map((t: any) => {
                      if (t["key"] === key) {
                        t["value"]?.push(filterValue);
                        t["filterKey"]?.push(filterKey);
                      }
                      return t;
                    });
                  }
                }

                break;
              case "greaterEqual":
                const greaterEqualFiltered = list.filter(
                  (t: any) => t["key"] === key
                );
                if (!greaterEqualFiltered || greaterEqualFiltered?.length === 0) {
                  return list.push({
                    key,
                    value: [filterValue],
                    type: "date",
                    filterKey: [filterKey],
                    classFilter: DateFilter
                  });
                } else {
                  if (greaterEqualFiltered?.length === 2) {
                    list = list.map((t: any) => {
                      if (t["key"] === key) {
                        t["value"][1] = filterValue;
                      }
                      return t;
                    });
                  } else {
                    list = list.map((t: any) => {
                      if (t["key"] === key) {
                        t["value"]?.push(filterValue);
                        t["filterKey"]?.push(filterKey);
                      }
                      return t;
                    });
                  }
                }
                break;
              default:
                // Do nothing
                break;
            }
          });
        }
        // filter by IdFilter
        if (value instanceof IdFilter || value instanceof GuidFilter) {
          const objectKey = key.replace("Id", "");
          Object.entries(value).forEach(([filterKey, filterValue]) => {

            if (
              (typeof filterValue === "string" && filterValue !== "") ||
              (typeof filterValue === "number" && !Number.isNaN(filterValue)) ||
              Array.isArray(filterValue)
            ) {

              switch (filterKey) {
                case "equal":
                  return list.push({
                    key,
                    value: [search[`${objectKey}Value`]],
                    type: "id",
                    filterKey,
                    classFilter: IdFilter
                  });
                case "notEqual":
                  return list.push({
                    key,
                    value: [search[`${objectKey}Value`]],
                    type: "id",
                    filterKey,
                    classFilter: IdFilter
                  });

                case "in":
                  list.push({
                    key,
                    value: search[`${objectKey}Value`],
                    type: "id",
                    filterKey,
                    classFilter: IdFilter
                  });
                  break;

                case "notIn":
                  list.push({
                    key,
                    value: search[`${objectKey}Value`],
                    type: "id",
                    filterKey,
                    classFilter: IdFilter
                  });
                  break;

                default:
                  // Do nothing
                  break;
              }
            }
          });
        }
      });
    }
    return list;
  }, [])

  const list = React.useMemo((): Model => {
    return convertList(value);
  }, [convertList, value]);


  const handleClear = React.useCallback((itemTag: Tag) => {
    const newFilter = { ...value };
    const objectKey = itemTag?.key.replace("Id", "");
    newFilter[itemTag?.key] = new itemTag.classFilter();
    newFilter[`${objectKey}Value`] = undefined;
    handleChangeFilter({ ...newFilter });
    if (typeof onClear !== undefined) {
      onClear(null);
    }
  }, [handleChangeFilter, value, onClear]);

  return (
    <div className={classNames("tag-filte__container", className)}>
      {list &&
        list?.length > 0 &&
        list.map((itemTag: Tag, index: number) => (
          <div className="tag-detail m--xxs" key={index}>
            <div className="tag-filte__container-text">
              <div className="tag-detail__title m-r--xxxs">{translate ? translate(`${keyTranslate}.${itemTag?.key}`) : itemTag?.key}: </div>
              {itemTag?.type === "string" && itemTag?.value}
              {itemTag?.type === "number" && formatNumber(itemTag?.value)}
              {itemTag?.type === "date" && itemTag?.value?.length > 0 && (
                <>
                  {formatDate(itemTag.value[0] as Moment)}&minus;
                  {formatDate(itemTag?.value[1])}
                </>
              )}
              {itemTag?.type === "date" && !itemTag?.value?.length && (
                <>{formatDate(itemTag?.value)}</>
              )}
              {itemTag?.type === "id" && itemTag?.value?.length > 0 && (
                <>
                  {itemTag?.value?.length > 2 ? (
                    <>
                      <Tooltip
                        placement="topLeft"
                        title={
                          <>
                            {itemTag?.value?.map(
                              (itemValue: any, index: number) => (
                                <span key={index}>
                                  <>
                                    <span>{itemValue?.name}</span>
                                    {index < itemTag?.value?.length - 1 && (
                                      <span className="m-r--xxxs">&#44;</span>
                                    )}
                                  </>
                                </span>
                              )
                            )}
                          </>
                        }
                      >
                        <span>{itemTag?.value[0]?.name}</span>
                        {index < itemTag?.value?.length - 1 && (
                          <span className="m-r--xxxs">&#44;</span>
                        )}
                        <span>{itemTag?.value[1]?.name}</span>
                        <span>... + {itemTag?.value?.length - 2}</span>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      {itemTag?.value?.map((itemValue: any, index: number) => (
                        <span key={index}>
                          <>
                            <span>{itemValue?.name}</span>
                            {index < itemTag?.value?.length - 1 && (
                              <span className="m-r--xxxs">&#44;</span>
                            )}
                          </>
                        </span>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
            <Close16
              aria-label="Add"
              className="tag-filte__container-clear"
              onClick={() => handleClear(itemTag)}
            />
          </div>
        ))}
    </div>
  );
}

export default TagFilter;
