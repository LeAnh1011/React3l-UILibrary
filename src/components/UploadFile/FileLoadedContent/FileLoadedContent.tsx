import React from "react";
import { FileModel } from "../UploadFile";
import CloseFilled16 from "@carbon/icons-react/es/close--filled/16";
import WarningFilled16 from "@carbon/icons-react/es/warning--filled/16";
import { Popconfirm, Tooltip } from "antd";
import "./FileLoadedContent.scss";

export interface FileLoadedContentProps {
  loadedFiles?: FileModel[];
  removeFile?: (fileId: string | number) => void;
  isViewMode?: boolean;
  className?: string;
}

export default function FileLoadedContent(props: FileLoadedContentProps) {
  const { loadedFiles, removeFile, isViewMode, className } = props;
  const renderLoadedFile = React.useCallback(
    (file, index) => {
      return file?.errors ? (
        <div className="file-loaded-error" key={index}>
          <div className="file-loaded-container">
            <div className="w-file-name">
              <Tooltip title={file?.name}>
                <a href={file?.path} download>
                  {file?.name}
                </a>
              </Tooltip>
            </div>
            <div>
              <WarningFilled16 color="red" className="m-r--3xs" />
              <Popconfirm
                placement="leftTop"
                title={"Bạn có chắc chắn muốn xóa?"}
                onConfirm={() => removeFile(file.id)}
                okText="Xóa"
                cancelText="Hủy"
                okType="danger"
              >
                <CloseFilled16 className="remove-file" />
              </Popconfirm>
            </div>
          </div>
          <div className="content-error">
            {file?.errors && file?.errors?.name}
          </div>
        </div>
      ) : (
        <div className="file-loaded-container" key={index}>
          <div className="w-file-name">
            <a href={file?.path} download>
              {file?.name}
            </a>
          </div>
          {!isViewMode && (
            <div>
              <Popconfirm
                placement="leftTop"
                title={"Bạn có chắc chắn muốn xóa?"}
                onConfirm={() => removeFile(file.id)}
                okText="Xóa"
                cancelText="Hủy"
                okType="danger"
              >
                <CloseFilled16 className="remove-file" />
              </Popconfirm>
            </div>
          )}
        </div>
      );
    },
    [removeFile, isViewMode]
  );
  return (
    <div className={className}>
      {loadedFiles?.length > 0 &&
        loadedFiles.map((file, index) => renderLoadedFile(file, index))}
    </div>
  );
}

FileLoadedContent.defaultProps = {
  loadedFiles: [],
};
