import { Menu, Dropdown, PaginationProps as AntdPaginationProps } from "antd";
import React from "react";
import "./Pagination.scss";
import CaretRight16 from "@carbon/icons-react/es/caret--right/16";
import CaretLeft16 from "@carbon/icons-react/es/caret--left/16";
import ChevronDown16 from "@carbon/icons-react/es/chevron--down/16";
import classNames from "classnames";
import Button from "components/Button";

export interface PaginationProps extends AntdPaginationProps {
  skip?: number;
  take?: number;
  pageSizeOptions: string[];
  onChange?: (skip: number, take: number) => void;
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

  const menuPageSize = React.useMemo(() => {
    return (
      <Menu
        className="menu-page-size"
        onClick={handleMenuTakeClick}
        selectedKeys={["" + take]}
      >
        {pageSizeOptions.map((page, index) => {
          return <Menu.Item key={page}>{page}</Menu.Item>;
        })}
      </Menu>
    );
  }, [pageSizeOptions, handleMenuTakeClick, take]);

  const menuPageChange = React.useMemo(() => {
    return (
      <Menu
        onClick={handleMenuPageClick}
        selectedKeys={["" + currentPage]}
        className={classNames(
          "menu-page-change",
          pageArray?.length > 6 ? "options-select-page-height" : ""
        )}
      >
        {pageArray.map((page) => {
          return <Menu.Item key={page}>{page}</Menu.Item>;
        })}
      </Menu>
    );
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
        icon={<CaretRight16 color="#161616" />}
        className="btn--xl"
        onClick={() => handleChangeCurrentPage(currentPage + 1)}
      />
    ) : (
      <div className="change-one-page-box">
        <CaretRight16 className="icon-change-page-unable" />
      </div>
    );
  }, [currentPage, handleChangeCurrentPage, pageArray.length]);

  const prevIcon = React.useMemo(() => {
    return currentPage > 1 ? (
      <Button
        type="icon-only-ghost"
        icon={<CaretLeft16 color="#161616" />}
        className="btn--xl"
        onClick={() => handleChangeCurrentPage(currentPage - 1)}
      />
    ) : (
      <div className="change-one-page-box">
        <CaretLeft16 className="icon-change-page-unable" />
      </div>
    );
  }, [currentPage, handleChangeCurrentPage]);

  return (
    <div className="pagination-container">
      <div className="number-per-page-box">
        {canChangePageSize === true && (
          <div className="number-per-page-box-1">
            <div className="m-r--xxxs">Items per pages : </div>
            <div>
              <Dropdown
                className="dropdown-pagination-per-page"
                overlay={menuPageSize}
                trigger={["click"]}
              >
                <Button
                  type="ghost"
                  className="btn--lg"
                  icon={<ChevronDown16 />}
                >
                  {take}
                </Button>
              </Dropdown>
            </div>
          </div>
        )}

        <div className="number-per-page-box-2">
          {skip + 1}-{skip + take} of {total} items
        </div>
      </div>
      <div className="change-page-box">
        <div className="change-page-box-1">
          <Dropdown
            className="dropdown-pagination-page"
            overlay={menuPageChange}
            trigger={["click"]}
          >
            <Button type="ghost" className="btn--lg" icon={<ChevronDown16 />}>
              {currentPage}
            </Button>
          </Dropdown>
        </div>
        <div>of {pageArray.length} pages</div>
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
