import { storiesOf } from "@storybook/react";
import React from "react";
import { StringFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import nameof from "ts-nameof.macro";
import Pagination from "./Pagination";
export class DemoFilter extends ModelFilter {
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

function Default() {
  const [filter, setFilter] = React.useState<DemoFilter>(new DemoFilter());

  const handlePagination = React.useCallback(
    (skip: number, take: number) => {
      setFilter({ ...filter, skip, take });
      // if (typeof handleSearch === "function") {
      //   handleSearch();
      // }
      console.log(filter);
    },
    [filter, setFilter]
  );
  return (
    <div>
      <Pagination
        skip={filter.skip}
        take={filter.take}
        total={100}
        onChange={handlePagination}
        style={{ margin: "10px" }}
      />
    </div>
  );
}

storiesOf("Pagination", module).add(nameof(Default), Default);