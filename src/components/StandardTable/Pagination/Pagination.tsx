import { Dropdown, PaginationProps as AntdPaginationProps } from "antd";
import React from "react";
import { CaretRight, CaretLeft, ChevronDown } from "@carbon/icons-react";
import type { MenuProps } from "antd";
import Button from "@Components/Button";
import "./Pagination.scss";

export interface PaginationProps extends AntdPaginationProps {
  /**Current page is skipped */
  skip?: number;
  /**Number of records to get in current page */
  take?: number;
  /**Used to custom the page size options */
  pageSizeOptions: number[];
  /**Function to change current page */
  onChange?: (skip: number, take: number) => void;
  /**False to hide option to change the page size */
  canChangePageSize?: boolean;
}

function Pagination(props: PaginationProps) {
  const {
    skip,
    take,
    total,
    onChange,
    pageSizeOptions,
    canChangePageSize,
  } = props;
  const pageArray = React.useMemo(() => {
    const ind = Math.ceil(total / take);
    const arrTmp = [];
    for (let i = 1; i <= ind; i++) {
      arrTmp.push(i);
    }
    return arrTmp;
  }, [take, total]);
  const currentPage = React.useMemo(() => {
    return Math.round(skip / take) + 1;
  }, [skip, take]);
  const handleMenuTakeClick = React.useCallback(
    (event: any) => {
      const takeValue = Number(event.key);
      const skipValue = 0;
      onChange(skipValue, takeValue);
    },
    [onChange]
  );
  const handleMenuPageClick = React.useCallback(
    (event: any) => {
      const takeValue = take;
      const skipValue = (Number(event.key) - 1) * take;
      onChange(skipValue, takeValue);
    },
    [onChange, take]
  );

  const menuPageSize: MenuProps = React.useMemo(() => {
    return {
      onClick: handleMenuTakeClick,
      className: "menu-page-size",
      selectedKeys: ["" + take],
      items: pageSizeOptions.map((page) => {
        return {
          key: page,
          label: page,
        };
      }),
    };
  }, [pageSizeOptions, handleMenuTakeClick, take]);

  const menuPageChange: MenuProps = React.useMemo(() => {
    return {
      onClick: handleMenuPageClick,
      selectedKeys: ["" + currentPage],
      className: `menu-page-change, ${
        pageArray?.length > 6 ? "options-select-page-height" : ""
      }`,
      items: pageArray.map((page) => {
        return {
          key: page,
          label: page,
        };
      }),
    };
  }, [handleMenuPageClick, currentPage, pageArray]);

  const handleChangeCurrentPage = React.useCallback(
    (nextPage) => {
      const takeValue = take;
      const skipValue = (nextPage - 1) * take;
      onChange(skipValue, takeValue);
    },
    [onChange, take]
  );
  const nextIcon = React.useMemo(() => {
    return currentPage < pageArray.length ? (
      <Button
        type="icon-only-ghost"
        icon={<CaretRight size={16} color="#161616" />}
        className="btn--xl"
        onClick={() => handleChangeCurrentPage(currentPage + 1)}
      />
    ) : (
      <div className="change-one-page-box">
        <CaretRight size={16} className="icon-change-page-unable" />
      </div>
    );
  }, [currentPage, handleChangeCurrentPage, pageArray.length]);

  const prevIcon = React.useMemo(() => {
    return currentPage > 1 ? (
      <Button
        type="icon-only-ghost"
        icon={<CaretLeft size={16} color="#161616" />}
        className="btn--xl"
        onClick={() => handleChangeCurrentPage(currentPage - 1)}
      />
    ) : (
      <div className="change-one-page-box">
        <CaretLeft size={16} className="icon-change-page-unable" />
      </div>
    );
  }, [currentPage, handleChangeCurrentPage]);

  return (
    <div className="pagination-container">
      <div className="number-per-page-box">
        {canChangePageSize === true && (
          <div className="number-per-page-box-1">
            <div className="m-r--3xs">Số bản ghi mỗi trang : </div>
            <div>
              <Dropdown
                className="dropdown-pagination-per-page"
                menu={menuPageSize}
                trigger={["click"]}
              >
                <Button
                  type="ghost"
                  className="btn--lg"
                  icon={<ChevronDown size={16} />}
                >
                  {take}
                </Button>
              </Dropdown>
            </div>
          </div>
        )}

        <div className="number-per-page-box-2">
          {skip + 1}-{skip + take} của {total} bản ghi
        </div>
      </div>
      <div className="change-page-box">
        <div className="change-page-box-1">
          <Dropdown
            className="dropdown-pagination-page"
            menu={menuPageChange}
            trigger={["click"]}
          >
            <Button
              type="ghost"
              className="btn--lg"
              icon={<ChevronDown size={16} />}
            >
              {currentPage}
            </Button>
          </Dropdown>
        </div>
        <div>của {pageArray.length} trang</div>
        <div className="box-change-page-button">
          {prevIcon}
          {nextIcon}
        </div>
      </div>
    </div>
  );
}
Pagination.defaultProps = {
  pageSizeOptions: [10, 20, 50, 100],
  skip: 0,
  take: 10,
  total: 100,
  canChangePageSize: true,
};
export default Pagination;
