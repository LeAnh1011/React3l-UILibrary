import { Model, ModelFilter } from "react3l-common/src";
import { PaginationProps } from "antd/lib/pagination";
import { RowSelectionType } from "antd/lib/table/interface";
import { AxiosResponse } from "axios";
import React from "react";
import { Observable } from "rxjs";
type KeyType = string | number;
export interface UseMaster {
  list?: Model[];
  total?: number;
  loadingList?: boolean;
  filter?: ModelFilter;
  toggle?: boolean;
  handleUpdateNewFilter?: (filter: any) => void;
  handleChangeFilter?: (...pram: any) => (value: any) => void;
  handleResetFilter?: () => void;
  handleGoCreate?: () => void;
  handleGoDetail?: (id: any) => () => void;
  handleGoApproval?: (id: any) => () => void;
  handleGoPreview?: (id: any) => (event: any) => void;
  handleToggleSearch?: () => void;
  handleTableChange?: (param: any) => void;
  handlePagination?: (skip: number, take: number) => void;
  handleServerDelete?: (param: Model) => void;
  handleServerBulkDelete?: () => void;
  handleSearch?: () => void;
  handleImportList?: (
    onImport: (file: File) => Observable<void>
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleListExport?: (
    filter: ModelFilter,
    onExport: (filter: ModelFilter) => Observable<AxiosResponse<any>>
  ) => () => void;
  handleExportTemplateList?: (
    onExport: () => Observable<AxiosResponse<any>>
  ) => () => void;
  importButtonRef?: React.RefObject<HTMLInputElement>;
  rowSelection?: {
    onChange(selectedRowKeys: KeyType[]): void;
    type: RowSelectionType;
  };
  canBulkDelete?: boolean;
  pagination?: PaginationProps;
  dispatch?: any;
}
