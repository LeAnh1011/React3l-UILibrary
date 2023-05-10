import { Close } from "@carbon/icons-react";
import { Tooltip } from "antd";
import classNames from "classnames";
import { formatDate } from "@Helpers/date-time";
import { formatNumber } from "@Helpers/number";
import { TFunction } from "i18next";
import React, { Fragment } from "react";
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
  /**Use to custom style the component*/
  className?: string;
  /**Current value filter*/
  value?: ModelFilter;
  /**KeyWord of data file to be translated*/
  keyTranslate?: string;
  /** Set fields that not display value filter*/
  hiddenField?: string[];
  /**Fields that icon clear is disabled*/
  exceptField?: string[];
  /**Provide a prop to show filter field mapping*/
  mappingField?: { [key: string]: string };
  /**Provide a translate function*/
  translate?: TFunction;
  /**Handle the action when click clear filter*/
  onClear?: (t: any) => void;
  /**Handle the change value of the component*/
  handleChangeFilter?: (valueFilter: ModelFilter) => void;
}

interface Tag {
  key?: string;
  value?: String | Number | Array<Model> | any;
  type?: string;
  filterType: string | string[];
  classFilter?: new () => ModelFilter;
}

function TagFilter(props: TagFilterProps) {
  const {
    className,
    value,
    keyTranslate,
    hiddenField,
    exceptField,
    mappingField,
    onClear,
    translate,
    handleChangeFilter,
  } = props;

  const checkMappingField = React.useCallback(
    (keyProp: string): string => {
      return mappingField && mappingField[keyProp];
    },
    [mappingField]
  );

  const convertList = React.useCallback((search: ModelFilter) => {
    let list = [] as Tag[];
    if (typeof search === "object" && search !== null) {
      Object.entries<
        StringFilter | DateFilter | NumberFilter | IdFilter | GuidFilter
      >(search as ModelFilter).forEach(([key, value]) => {
        if (value instanceof StringFilter) {
          Object.entries(value).forEach(([filterType, filterValue]) => {
            // filter by StringFilter
            if (typeof filterValue === "string" && filterValue !== "") {
              switch (filterType) {
                case "startWith":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "string",
                    filterType,
                    classFilter: StringFilter,
                  });
                case "endWith":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "string",
                    filterType,
                    classFilter: StringFilter,
                  });
                case "contain":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "string",
                    filterType,
                    classFilter: StringFilter,
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
          Object.entries(value).forEach(([filterType, filterValue]) => {
            if (typeof filterValue === "number" && !Number.isNaN(filterValue)) {
              switch (filterType) {
                case "equal":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "number",
                    filterType,
                    classFilter: NumberFilter,
                  });
                case "notEqual":
                  return list.push({
                    key,
                    value: filterValue,
                    type: "number",
                    filterType,
                  });
                case "less":
                  const lessFiltered = list.filter(
                    (t: any) => t["key"] === key
                  );
                  if (!lessFiltered || lessFiltered?.length === 0) {
                    return list.push({
                      key,
                      value: [{ filterValue, filterType }],
                      type: "number",
                      filterType: [filterType],
                      classFilter: NumberFilter,
                    });
                  } else {
                    if (lessFiltered?.length === 2) {
                      list = list.map((t: any) => {
                        if (t["key"] === key) {
                          t["value"][0]["filterValue"] = filterValue;
                        }
                        return t;
                      });
                    } else {
                      list = list.map((t: any) => {
                        if (t["key"] === key) {
                          t["value"]?.push({ filterValue, filterType });
                        }
                        return t;
                      });
                    }
                  }

                  break;
                case "greater":
                  const greaterFiltered = list.filter(
                    (t: any) => t["key"] === key
                  );
                  if (!greaterFiltered || greaterFiltered?.length === 0) {
                    return list.push({
                      key,
                      value: [{ filterValue, filterType }],
                      type: "number",
                      filterType: [filterType],
                      classFilter: NumberFilter,
                    });
                  } else {
                    if (greaterFiltered?.length === 2) {
                      list = list.map((t: any) => {
                        if (t["key"] === key) {
                          t["value"][1]["filterValue"] = filterValue;
                        }
                        return t;
                      });
                    } else {
                      list = list.map((t: any) => {
                        if (t["key"] === key) {
                          t["value"]?.push({ filterValue, filterType });
                        }
                        return t;
                      });
                    }
                  }
                  break;
                case "lessEqual":
                  const lessEqualFiltered = list.filter(
                    (t: any) => t["key"] === key
                  );
                  if (!lessEqualFiltered || lessEqualFiltered?.length === 0) {
                    return list.push({
                      key,
                      value: [{ filterValue, filterType }],
                      type: "number",
                      filterType: [filterType],
                      classFilter: NumberFilter,
                    });
                  } else {
                    if (lessEqualFiltered?.length === 2) {
                      list = list.map((t: any) => {
                        if (t["key"] === key) {
                          t["value"][0]["filterValue"] = filterValue;
                        }
                        return t;
                      });
                    } else {
                      list = list.map((t: any) => {
                        if (t["key"] === key) {
                          t["value"]?.push({ filterValue, filterType });
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
                  if (
                    !greaterEqualFiltered ||
                    greaterEqualFiltered?.length === 0
                  ) {
                    return list.push({
                      key,
                      value: [{ filterValue, filterType }],
                      type: "number",
                      filterType: [filterType],
                      classFilter: NumberFilter,
                    });
                  } else {
                    if (greaterEqualFiltered?.length === 2) {
                      list = list.map((t: any) => {
                        if (t["key"] === key) {
                          t["value"][1]["filterValue"] = filterValue;
                        }
                        return t;
                      });
                    } else {
                      list = list.map((t: any) => {
                        if (t["key"] === key) {
                          t["value"]?.push({ filterValue, filterType });
                        }
                        return t;
                      });
                    }
                  }
                  break;
                // Do nothing
                default:
                  // Do nothing
                  break;
              }
            }
          });
        }
        // filter by DateFilter
        if (value instanceof DateFilter) {
          if (value?.greaterEqual || value?.lessEqual) {
            list.push({
              key,
              value: [
                {
                  filterType: "greaterEqual",
                  filterValue: value?.greaterEqual,
                },
                { filterType: "lessEqual", filterValue: value?.lessEqual },
              ],
              type: "date",
              filterType: ["greaterEqual", "lessEqual"],
              classFilter: DateFilter,
            });
          }
          if (value?.greater || value?.less) {
            list.push({
              key,
              value: [
                { filterType: "greater", filterValue: value?.greater },
                { filterType: "less", filterValue: value?.less },
              ],
              type: "date",
              filterType: ["greater", "less"],
              classFilter: DateFilter,
            });
          }
        }
        // filter by IdFilter
        if (value instanceof IdFilter || value instanceof GuidFilter) {
          const objectKey = key.replace("Id", "");
          Object.entries(value).forEach(([filterType, filterValue]) => {
            if (
              (typeof filterValue === "string" && filterValue !== "") ||
              (typeof filterValue === "number" && !Number.isNaN(filterValue)) ||
              Array.isArray(filterValue)
            ) {
              switch (filterType) {
                case "equal":
                  return list.push({
                    key,
                    value: [search[`${objectKey}Value`]],
                    type: "id",
                    filterType,
                    classFilter: IdFilter,
                  });
                case "notEqual":
                  return list.push({
                    key,
                    value: [search[`${objectKey}Value`]],
                    type: "id",
                    filterType,
                    classFilter: IdFilter,
                  });

                case "in":
                  list.push({
                    key,
                    value: search[`${objectKey}Value`],
                    type: "id",
                    filterType,
                    classFilter: IdFilter,
                  });
                  break;

                case "notIn":
                  list.push({
                    key,
                    value: search[`${objectKey}Value`],
                    type: "id",
                    filterType,
                    classFilter: IdFilter,
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
  }, []);

  const checkHiddenField = React.useCallback(
    (field: string) => {
      if (hiddenField && hiddenField.length > 0) {
        const filteredField = hiddenField.filter(
          (current) => current === field
        );
        return filteredField && filteredField.length > 0 ? true : false;
      }
      return false;
    },
    [hiddenField]
  );

  const handleCheckField = React.useCallback(
    (field: string) => {
      if (exceptField && exceptField.length > 0) {
        const filteredField = exceptField.filter(
          (current) => current === field
        );
        return filteredField && filteredField.length > 0 ? true : false;
      }
      return false;
    },
    [exceptField]
  );

  const list = React.useMemo((): Model => {
    return convertList(value);
  }, [convertList, value]);

  const handleClear = React.useCallback(
    (itemTag: Tag) => {
      const newFilter = { ...value };
      const objectKey = itemTag?.key.replace("Id", "");
      newFilter[itemTag?.key] = new itemTag.classFilter();
      newFilter[`${objectKey}Value`] = undefined;
      handleChangeFilter({ ...newFilter });
      if (typeof onClear !== undefined) {
        onClear(null);
      }
    },
    [handleChangeFilter, value, onClear]
  );

  return (
    <div className={classNames("tag-filte__container", className)}>
      {list &&
        list?.length > 0 &&
        list.map((itemTag: Tag, index: number) => (
          <>
            {checkHiddenField(itemTag.key) ? null : (
              <Fragment key={index}>
                {itemTag?.value && itemTag?.value?.length > 0 && (
                  <>
                    <div className="tag-detail m--2xs">
                      <div className="tag-filte__container-text">
                        <div className="tag-detail__title m-r--3xs">
                          {translate
                            ? translate(`${keyTranslate}.${itemTag?.key}`)
                            : itemTag?.key}
                          :{" "}
                        </div>
                        {itemTag?.type === "string" && itemTag?.value}
                        {itemTag?.type === "number" &&
                          !itemTag?.value?.length &&
                          formatNumber(itemTag?.value)}
                        {itemTag?.type === "number" &&
                          itemTag?.value?.length > 0 &&
                          itemTag?.value?.map((item: any, index: number) => (
                            <Fragment key={index}>
                              {(item?.filterType === "greaterEqual" ||
                                item?.filterType === "greater") && (
                                <>{formatNumber(item.filterValue)}&minus;</>
                              )}
                            </Fragment>
                          ))}
                        {itemTag?.type === "number" &&
                          itemTag?.value?.length > 0 &&
                          itemTag?.value?.map((item: any, index: number) => (
                            <Fragment key={index}>
                              {(item?.filterType === "lessEqual" ||
                                item?.filterType === "less") &&
                                formatNumber(item.filterValue)}
                            </Fragment>
                          ))}

                        {itemTag?.type === "date" &&
                          itemTag?.value?.length > 0 &&
                          itemTag?.value?.map((item: any, index: number) => (
                            <Fragment key={index}>
                              {(item?.filterType === "greaterEqual" ||
                                item?.filterType === "greater") && (
                                <>{formatDate(item.filterValue)}&minus;</>
                              )}
                            </Fragment>
                          ))}
                        {itemTag?.type === "date" &&
                          itemTag?.value?.length > 0 &&
                          itemTag?.value?.map((item: any, index: number) => (
                            <Fragment key={index}>
                              {(item?.filterType === "lessEqual" ||
                                item?.filterType === "less") &&
                                formatDate(item.filterValue)}
                            </Fragment>
                          ))}
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
                                              <span>
                                                {checkMappingField(itemTag.key)
                                                  ? itemValue[
                                                      checkMappingField(
                                                        itemTag.key
                                                      )
                                                    ]
                                                  : itemValue?.name}
                                              </span>
                                              {index <
                                                itemTag?.value?.length - 1 && (
                                                <span className="m-r--3xs">
                                                  &#44;
                                                </span>
                                              )}
                                            </>
                                          </span>
                                        )
                                      )}
                                    </>
                                  }
                                >
                                  <span>
                                    {checkMappingField(itemTag.key)
                                      ? itemTag?.value[0][
                                          checkMappingField(itemTag.key)
                                        ]
                                      : itemTag?.value[0]?.name}
                                  </span>
                                  {index < itemTag?.value?.length - 1 && (
                                    <span className="m-r--3xs">&#44;</span>
                                  )}
                                  <span>
                                    {" "}
                                    {checkMappingField(itemTag.key)
                                      ? itemTag?.value[1][
                                          checkMappingField(itemTag.key)
                                        ]
                                      : itemTag?.value[1]?.name}
                                  </span>
                                  <span>
                                    ... + {itemTag?.value?.length - 2}
                                  </span>
                                </Tooltip>
                              </>
                            ) : (
                              <>
                                {itemTag?.value?.length > 0 &&
                                  itemTag?.value?.map(
                                    (itemValue: any, index: number) => (
                                      <span key={index}>
                                        <>
                                          <span>
                                            {checkMappingField(itemTag.key)
                                              ? itemValue[
                                                  checkMappingField(itemTag.key)
                                                ]
                                              : itemValue?.name}
                                          </span>
                                          {index <
                                            itemTag?.value?.length - 1 && (
                                            <span className="m-r--3xs">
                                              &#44;
                                            </span>
                                          )}
                                        </>
                                      </span>
                                    )
                                  )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                      <Close
                        size={16}
                        aria-label="Add"
                        className={classNames("tag-filter__container-clear", {
                          "tag-filter__container-clear--disabled": handleCheckField(
                            itemTag.key
                          ),
                        })}
                        onClick={() => {
                          if (!handleCheckField(itemTag.key)) {
                            handleClear(itemTag);
                          }
                        }}
                      />
                    </div>
                  </>
                )}
              </Fragment>
            )}
          </>
        ))}
    </div>
  );
}

export default TagFilter;
