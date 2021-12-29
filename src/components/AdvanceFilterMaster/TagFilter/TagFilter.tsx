import classNames from "classnames";
import React from "react";
import { Model, ModelFilter } from "react3l-common";
import { DateFilter, GuidFilter, IdFilter, NumberFilter, StringFilter } from "react3l-advanced-filters";
import "./TagFilter.scss";
import { Moment } from "moment";
import { formatNumber } from "helpers/number";
import { formatDateTime } from "helpers/date-time";

export interface TagFilterProps {
  className?: string;
  value?: ModelFilter;
  keyTranslate?: string;
}


function TagFilter(props: TagFilterProps) {
  const { className, value, keyTranslate } = props;

  const [loading, setloading] = React.useState<boolean>(true);
  const [list, setList,] = React.useState<Model>([]);

  React.useEffect(() => {
    if (loading) {
      const tmp = filterList(value);
      setList([...tmp]);
      console.log('tmp', tmp)
      setloading(false);
    }
  }, [loading, value]);
  return (
    <div className={classNames("tag-filte__container", className)}>
      <div
        className="tag-filte__container-text"
      >
        {list && list?.length > 0 && list.map((item: any) => (
          <div className="tag-detail">
            <div className="tag-detail__title">{`${keyTranslate}.${item?.key}`}</div>
            {item?.type === 'string' && item?.value}
            {item?.type === 'number' && formatNumber(item?.value)}
            {item?.type === 'date' && item?.value?.length > 0 ? formatDateTime(item?.value) : <>{item?.value.map((value: Moment) => formatDateTime(value))}</>}
          </div>
        ))}
        {/* {value} */}
      </div>
      <div className="tag-filte__container-clear"></div>
    </div>
  );
}

export default TagFilter;


interface Tag {
  key?: string;
  value?: String | Number | Array<Model> | undefined;
  type?: string;
}


function filterList<TFilter extends ModelFilter>(
  search: TFilter
): Tag[] {
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
              case 'startWith':
                return list.push({ key, value: filterValue, type: 'string' });
              case 'endWith':
                return list.push({ key, value: filterValue, type: 'string' });
              case 'contain':
                return list.push({ key, value: filterValue, type: 'string' });
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
              case 'equal':
                return list.push({ key, value: filterValue, type: 'number' });
              case 'notEqual':
                return list.push({ key, value: filterValue, type: 'number' });
              case 'less':
                return list.push({ key, value: filterValue, type: 'number' });
              case 'greater':
                return list.push({ key, value: filterValue, type: 'number' });
              case 'lessEqual':
                return list.push({ key, value: filterValue, type: 'number' });
              case 'greaterEqual':
                return list.push({ key, value: filterValue, type: 'number' });
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
            case 'equal':
              return list.push({ key, value: filterValue });
            case 'notEqual':
              return list.push({ key, value: filterValue });
            case 'less':
              const lessFiltered = list.filter((t: any) => t['key'] === key);
              if (!lessFiltered || lessFiltered?.length === 0) {
                return list.push({ key, value: [filterValue], type: 'date' });
              }
              else {
                if (lessFiltered?.length === 2) {
                  list = list.map((t: any) => {
                    if (t['key'] === key) {
                      t['value'][0] = filterValue;
                    }
                    return t;
                  });
                }
                else {
                  list = list.map((t: any) => {
                    if (t['key'] === key) {
                      t['value']?.push(filterValue);
                    }
                    return t;
                  });
                }
              }

              break;
            case 'greater':
              const greaterFiltered = list.filter((t: any) => t['key'] === key);
              if (!greaterFiltered || greaterFiltered?.length === 0) {
                return list.push({ key, value: [filterValue], type: 'date' });
              }
              else {
                if (greaterFiltered?.length === 2) {
                  list = list.map((t: any) => {
                    if (t['key'] === key) {
                      t['value'][1] = filterValue;
                    }
                    return t;
                  });
                }
                else {
                  list = list.map((t: any) => {
                    if (t['key'] === key) {
                      t['value']?.push(filterValue);
                    }
                    return t;
                  });
                }
              }
              break;
            case 'lessEqual':
              const lessEqualFiltered = list.filter((t: any) => t[key]);
              if (!lessEqualFiltered || lessEqualFiltered?.length === 0) {
                return list.push({ key, value: [filterValue], type: 'date' });
              }
              else {
                if (lessEqualFiltered?.length === 2) {
                  list = list.map((t: any) => {
                    if (t['key'] === key) {
                      t['value'][0] = filterValue;
                    }
                    return t;
                  });
                }
                else {
                  list = list.map((t: any) => {
                    if (t['key'] === key) {
                      t['value']?.push(filterValue);
                    }
                    return t;
                  });
                }
              }

              break;
            case 'greaterEqual':
              const greaterEqualFiltered = list.filter((t: any) => t['key'] === key);
              if (!greaterEqualFiltered || greaterEqualFiltered?.length === 0) {
                return list.push({ key, value: [filterValue], type: 'date' });
              }
              else {
                if (greaterEqualFiltered?.length === 2) {
                  list = list.map((t: any) => {
                    if (t['key'] === key) {
                      t['value'][1] = filterValue;
                    }
                    return t;
                  });
                }
                else {
                  list = list.map((t: any) => {
                    if (t['key'] === key) {
                      t['value']?.push(filterValue);
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
        const objectKey = key.replace('Id', '');
        console.log(search[`${objectKey}Value`]);
        console.log(`${objectKey}Value`)
        Object.entries(value).forEach(([filterKey, filterValue]) => {
          if (
            (typeof filterValue === "string" && filterValue !== "") ||
            (typeof filterValue === "number" && !Number.isNaN(filterValue))
          ) {
            switch (filterKey) {
              case 'equal':
                if (search[`${objectKey}Value`]['name']) {
                  return list.push({ key, value: search[`${objectKey}Value`]['name'], type: 'id' });
                } else {
                  return list.push({ key, value: search[`${objectKey}Value`]['displayName'] });
                }
              case 'notEqual':
                if (search[`${objectKey}Value`]['name']) {
                  return list.push({ key, value: search[`${objectKey}Value`]['name'] });
                } else {
                  return list.push({ key, value: search[`${objectKey}Value`]['displayName'] });
                }

              case 'in':
                console.log((search[`${objectKey}Value`]));

                const values = search[`${objectKey}Value`].map((item: any) => item['name']);
                console.log('values', values)
                list = list.filter((t: any) => {
                  const v: number = t[key] as number;
                  if (
                    (typeof v === "number" || typeof value === "string") &&
                    (filterValue as any) instanceof Array
                  ) {
                    return (filterValue as any).includes(v);
                  }
                  return true;
                });
                break;

              case 'notIn':
                list = list.filter((t: any) => {
                  const v: number = t[key] as number;
                  if (
                    (typeof v === "number" || typeof value === "string") &&
                    (filterValue as any) instanceof Array
                  ) {
                    return !(filterValue as any).includes(v);
                  }
                  return true;
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
