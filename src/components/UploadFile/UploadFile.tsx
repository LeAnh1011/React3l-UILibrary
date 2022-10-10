import CheckmarkFilled16 from "@carbon/icons-react/es/checkmark--filled/16";
import CloseFilled16 from "@carbon/icons-react/es/close--filled/16";
import Upload16 from "@carbon/icons-react/es/upload/16";
import WarningFilled16 from "@carbon/icons-react/es/warning--filled/16";
import Button from "@Components/Button";
import IconLoading from "@Components/IconLoading";
import { notification, Popconfirm } from "antd";
import React, { ReactNode, RefObject } from "react";
import type { Observable } from "rxjs";
import "./UploadFile.scss";

export interface FileModel {
  id?: number;
  fileId?: string | number;
  name?: string;
  url?: string;
  appUserId?: number;
  rowId?: string;
  content?: string;
  mimeType?: string;
  isFile?: boolean;
  key?: any;
  path?: string;
  level?: number;
  isDelete?: boolean;
  clearAction?: (fileId: string | number) => void;
  handleInput?: (e: any) => void;
}
export interface UploadFileProps {
  files?: FileModel[];
  isMultiple?: boolean;
  uploadContent?: string;
  updateList?: (files: FileModel[]) => void;
  uploadFile?: (files: File[] | Blob[]) => Observable<FileModel[]>;
  removeFile?: (fileId: string | number) => void;
  isBtnOutLine?: boolean;
  maximumSize?: number;
  type?: "link" | "button";
  /**Type button*/
  icon?: ReactNode;
  isViewMode?: boolean;
}
export function UploadFile(props: UploadFileProps) {
  const {
    files: oldFiles,
    uploadContent,
    isMultiple,
    updateList,
    uploadFile,
    removeFile,
    isBtnOutLine,
    maximumSize,
    type = "button",
    icon,
    isViewMode,
  } = props;
  const [listFileLoading, setListFileLoading] = React.useState<FileModel[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const fileRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>();

  const handleClickButton = React.useCallback(() => {
    fileRef.current.click();
  }, []);

  const handleValidateFile = React.useCallback(
    (fileList: FileList) => {
      let checkValidate = true;
      const files: File[] = [];
      let totalSize = 0;
      Array.from(fileList).forEach((file) => {
        files.push(file);
        totalSize = totalSize + file.size;
        if (totalSize > maximumSize) {
          notification.error({
            message: `Vượt quá dung lượng cho phép`,
            description: `File tải lên dung lượng phải dưới ${(
              maximumSize / 1000000
            ).toFixed(2)}MB`,
            placement: "bottomRight",
          });
          checkValidate = false;
        }
      });
      return { files, checkValidate };
    },
    [maximumSize]
  );

  const handleChangeFile = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files, checkValidate } = handleValidateFile(event.target.files);
      if (!checkValidate) return null;
      setListFileLoading([...files]);
      if (files && files.length > 0) {
        setIsLoading(true);
        uploadFile(files).subscribe({
          next: (res: FileModel[]) => {
            if (res && res.length > 0) {
              setIsLoading(false);
              updateList([...res]);
              setListFileLoading([]);
            }
          },
          error: () => {
            setListFileLoading([]);
            setIsLoading(false);
          },
        });
      }
    },
    [handleValidateFile, updateList, uploadFile]
  );

  const renderOldFile = React.useCallback(
    (file, index) => {
      return file?.errors ? (
        <div className="file-error" key={index}>
          <div className="file-container">
            <div className="w-file-name">
              <a href={file?.path} download>
                {file?.name}
              </a>
            </div>
            <div>
              <WarningFilled16 color="red" className="m-r--xxxs" />
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
        <div className="file-container" key={index}>
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

  const renderLoadingFile = React.useCallback(
    (file, index) => {
      return file?.errors ? (
        <div className="file-error" key={index}>
          <div className="file-container">
            <div>
              <a href={file?.path} download>
                {file?.name}
              </a>
            </div>
            <div>
              <WarningFilled16 color="red" className="m-r--xxxs" />
              <CloseFilled16
                onClick={() => removeFile(file.id)}
                className="remove-file"
              />
            </div>
          </div>
          <div className="content-error">
            {file?.errors && file?.errors?.name}
          </div>
        </div>
      ) : (
        <div className="file-container" key={index}>
          <a href={file?.path} download>
            {file?.name}
          </a>
          <CheckmarkFilled16 color="#0F62FE" />
        </div>
      );
    },
    [removeFile]
  );

  return (
    <div className="upload-button__container">
      {!isViewMode && (
        <div>
          {type === "link" ? (
            <div className="upload-link" onClick={handleClickButton}>
              {icon ? icon : <Upload16 />}
              <span className="upload-content m-l--xxs">{uploadContent}</span>
            </div>
          ) : (
            <Button
              type={isBtnOutLine ? "outline-primary" : "primary"}
              className="btn--lg"
              onClick={handleClickButton}
            >
              {uploadContent}
            </Button>
          )}

          <input
            type="file"
            style={{ display: "none" }}
            multiple={isMultiple}
            ref={fileRef}
            onChange={handleChangeFile}
          />
        </div>
      )}
      <div className="upload-button__list-file m-t--xxs">
        {oldFiles?.length > 0 &&
          oldFiles.map((file, index) => renderOldFile(file, index))}
        {listFileLoading?.length > 0 &&
          !isViewMode &&
          listFileLoading.map((file, index) =>
            isLoading ? (
              <div className="file-container" key={index}>
                <a href={file?.path} download>
                  {file?.name}
                </a>
                <IconLoading color="#0F62FE" />
              </div>
            ) : (
              renderLoadingFile(file, index)
            )
          )}
      </div>
    </div>
  );
}

UploadFile.defaultProps = {
  isMultiple: true,
  uploadContent: "Upload",
  isViewMode: false,
  files: [],
  isBtnOutLine: false,
  maximumSize: 5000000,
};
export default UploadFile;
