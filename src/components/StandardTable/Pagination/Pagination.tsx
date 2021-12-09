import { Menu, Dropdown } from "antd";
import React from "react";
import { PaginationProps as AntdPaginationProps } from "antd/lib/pagination/Pagination";
import "./Pagination.scss";
import nextAble from "../../../assets/image/next-able.png";
import nextUnAble from "../../../assets/image/next-disabled.png";
import prevAble from "../../../assets/image/prev-able.png";
import prevUnAble from "../../../assets/image/prev-disabled.png";

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
      <Menu
        onClick={handleMenuPageClick}
        selectedKeys={["" + currentPage]}
        className="menu-page-change"
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
      <img
        onClick={() => handleChangeCurrentPage(currentPage + 1)}
        src={nextAble}
        alt="next"
      />
    ) : (
      <img src={nextUnAble} alt="next" />
    );
  }, [currentPage, handleChangeCurrentPage, pageArray.length]);
  const prevIcon = React.useMemo(() => {
    return currentPage > 1 ? (
      <img
        onClick={() => handleChangeCurrentPage(currentPage - 1)}
        src={prevAble}
        alt="prev"
      />
    ) : (
      <img src={prevUnAble} alt="prev" />
    );
  }, [currentPage, handleChangeCurrentPage]);

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
};
export default Pagination;