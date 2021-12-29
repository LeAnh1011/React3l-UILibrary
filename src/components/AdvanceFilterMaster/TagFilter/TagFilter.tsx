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
import "./TagFilter.scss";

export interface TagFilterProps {
  className?: string;
  value?: ModelFilter;
  keyTranslate?: string;
  onClear?: (t: any) => void;
}

function TagFilter(props: TagFilterProps) {
  const { className, value, keyTranslate, onClear } = props;

  const [list, setList] = React.useState<Model>([]);

  React.useEffect(() => {
    let isLoading = false;
    if (!isLoading) {
      const tmp = filterList(value);
      setList([...tmp]);
    }
    return () => {
      isLoading = true;
    };
  }, [value]);
  return (
    <div className={classNames("tag-filte__container", className)}>
      {list &&
        list?.length > 0 &&
        list.map((itemTag: any, index: number) => (
          <div className="tag-detail m--xxs" key={index}>
            <div className="tag-filte__container-text">
              <div className="tag-detail__title m-r--xxxs">{`${keyTranslate}.${itemTag?.key}: `}</div>
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
              onClick={() => onClear(itemTag)}
            />
          </div>
        ))}
    </div>
  );
}

export default TagFilter;

interface Tag {
  key?: string;
  value?: String | Number | Array<Model> | undefined;
  type?: string;
}

function filterList<TFilter extends ModelFilter>(search: TFilter): Tag[] {
  let list = [] as any;
  if (typeof search === "object" && search !== null) {
    Object.entries<
      StringFilter | DateFilter | NumberFilter | IdFilter | GuidFilter
    >(search as any).forEach(([key, value]) => {
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
                });
              case "endWith":
                return list.push({
                  key,
                  value: filterValue,
                  type: "string",
                  filterKey,
                });
              case "contain":
                return list.push({
                  key,
                  value: filterValue,
                  type: "string",
                  filterKey,
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
                });
              case "greater":
                return list.push({
                  key,
                  value: filterValue,
                  type: "number",
                  filterKey,
                });
              case "lessEqual":
                return list.push({
                  key,
                  value: filterValue,
                  type: "number",
                  filterKey,
                });
              case "greaterEqual":
                return list.push({
                  key,
                  value: filterValue,
                  type: "number",
                  filterKey,
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
              });
            case "notEqual":
              return list.push({
                key,
                value: filterValue,
                type: "date",
                filterKey,
              });
            case "less":
              const lessFiltered = list.filter((t: any) => t["key"] === key);
              if (!lessFiltered || lessFiltered?.length === 0) {
                return list.push({
                  key,
                  value: [filterValue],
                  type: "date",
                  filterKey: [filterKey],
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
              const lessEqualFiltered = list.filter((t: any) => t[key]);
              if (!lessEqualFiltered || lessEqualFiltered?.length === 0) {
                return list.push({
                  key,
                  value: [filterValue],
                  type: "date",
                  filterKey: [filterKey],
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
                });
              case "notEqual":
                return list.push({
                  key,
                  value: [search[`${objectKey}Value`]],
                  type: "id",
                  filterKey,
                });

              case "in":
                list.push({
                  key,
                  value: search[`${objectKey}Value`],
                  type: "id",
                  filterKey,
                });
                break;

              case "notIn":
                list.push({
                  key,
                  value: search[`${objectKey}Value`],
                  type: "id",
                  filterKey,
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
}
