import classNames from "classnames";
import { Menu, Dropdown } from "antd";
import React from "react";
import { PaginationProps as AntdPaginationProps } from "antd/lib/pagination/Pagination";
import "./Pagination.scss";

function PreviousIcon() {
  return (
    <div className="pagination__previous-icon">
      <i className="tio-arrow_large_backward"></i>
    </div>
  );
}

function NextIcon() {
  return (
    <div className="pagination__next-icon">
      <i className="tio-arrow_large_forward"></i>
    </div>
  );
}

export interface PaginationProps extends AntdPaginationProps {
  skip?: number;
  take?: number;
  pageSizeOptions: string[];
  onChange?: (skip: number, take: number) => void;
}

function Pagination(props: PaginationProps) {
  const { skip, take, total, onChange, pageSizeOptions } = props;
  const pageArray = React.useMemo(() => {
    const ind = (total - (total % take)) / take;
    const arrTmp = [];
    console.log(ind);
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
      <Menu onClick={handleMenuTakeClick} selectedKeys={["" + take]}>
        {pageSizeOptions.map((page, index) => {
          return <Menu.Item key={page}>{page}</Menu.Item>;
        })}
      </Menu>
    );
  }, [pageSizeOptions, handleMenuTakeClick, take]);

  const menuPageChange = React.useMemo(() => {
    return (
      <Menu onClick={handleMenuPageClick} selectedKeys={["" + currentPage]}>
        {pageArray.map((page) => {
          return <Menu.Item key={page}>{page}</Menu.Item>;
        })}
      </Menu>
    );
  }, [handleMenuPageClick, currentPage, pageArray]);

  React.useEffect(() => {
    console.log("table skip take:", skip, " ", take);
  }, [skip, take]);
  return (
    <div className="pagination-container">
      <div className="number-per-page-box">
        <div className="number-per-page-box-1">
          <div className="m-r--xxxs">Items per pages : </div>
          <div>
            <Dropdown
              className="dropdown-pagination-per-page"
              overlay={menuPageSize}
              trigger={["click"]}
            >
              <div className="pagination__size-options">
                <span className="size-options_page">{take}</span>
                <i className="size-options__icon tio-chevron_down"></i>
              </div>
            </Dropdown>
          </div>
        </div>
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
            <div className="pagination__size-options">
              <span className="size-options_page">{currentPage}</span>
              <i className="size-options__icon tio-chevron_down"></i>
            </div>
          </Dropdown>
        </div>
        <div>of {pageArray.length + 1} pages</div>
        <div className="box-change-page-button">
          <div className="pagination__previous-icon m-r--xxs">
            <i className="tio-arrow_large_backward"></i>
          </div>
          <div className="pagination__next-icon">
            <i className="tio-arrow_large_forward"></i>
          </div>
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
};
export default Pagination;
