import { Upload } from "@carbon/icons-react";
import Button from "@Components/Button";
import { notification } from "antd";
import classNames from "classnames";
import React, { ReactNode, RefObject, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import type { Observable } from "rxjs";
import FileLoadedContent from "./FileLoadedContent/FileLoadedContent";
import FileLoadingContent from "./FileLoadingContent/FileLoadingContent";
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
  /**Option for multiple UploadFile */
  isMultiple?: boolean;
  /**Content of UploadFile component */
  uploadContent?: string;
  /**Function change list file uploaded */
  updateList?: (files: FileModel[]) => void;
  /**API use to upload list file selected to server*/
  uploadFile?: (files: File[] | Blob[]) => Observable<FileModel[]>;
  /**Option change style UploadFile to OutLine */
  isBtnOutLine?: boolean;
  /**Option limit maximum size (b) of list file to upload to server */
  maximumSize?: number;
  /** Option to change style of upload  "link", "button", "dragAndDrop"*/
  type?: "link" | "button" | "dragAndDrop";
  /**Icon of component */
  icon?: ReactNode;
  /**Option to set component have only view mode */
  isViewMode?: boolean;
  /**Function to set list file in status loading */
  setListFileLoading?: React.Dispatch<SetStateAction<FileModel[]>>;
  /**Use to custom style the component*/
  className?: string;
}
export function UploadFile(props: UploadFileProps) {
  const {
    uploadContent,
    isMultiple,
    updateList,
    uploadFile,
    isBtnOutLine,
    maximumSize,
    type = "button",
    icon,
    setListFileLoading,
    className,
  } = props;

  const fileRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>();

  const handleClickButton = React.useCallback(() => {
    fileRef.current.click();
  }, []);

  const handleValidateFile = React.useCallback(
    (files: File[]) => {
      let checkValidate = true;
      let totalSize = 0;
      files.forEach((file) => {
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
      return { checkValidate };
    },
    [maximumSize]
  );

  const handleChangeFileInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files: File[] = [];
      Array.from(event.target.files).forEach((file) => {
        files.push(file);
      });
      const { checkValidate } = handleValidateFile(files);
      if (!checkValidate) return null;
      setListFileLoading([...files]);
      if (files && files.length > 0) {
        uploadFile(files).subscribe({
          next: (res: FileModel[]) => {
            if (res && res.length > 0) {
              updateList([...res]);
              setListFileLoading([]);
            }
          },
          error: () => {
            setListFileLoading([]);
          },
        });
      }
    },
    [handleValidateFile, setListFileLoading, updateList, uploadFile]
  );

  const handleChangeFileDropzone = React.useCallback(
    (files: File[]) => {
      const { checkValidate } = handleValidateFile(files);
      if (!checkValidate) return null;
      setListFileLoading([...files]);
      if (files && files.length > 0) {
        uploadFile(files).subscribe({
          next: (res: FileModel[]) => {
            if (res && res.length > 0) {
              updateList([...res]);
              setListFileLoading([]);
            }
          },
          error: () => {
            setListFileLoading([]);
          },
        });
      }
    },
    [handleValidateFile, setListFileLoading, updateList, uploadFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleChangeFileDropzone,
  });

  React.useEffect(() => {
    setTimeout(() => {
      const dropzone = document.getElementsByClassName("upload-dropzone")?.[0];
      dropzone.addEventListener("dragenter", () => {
        dropzone.classList.add("is-active");
      });
      dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("is-active");
      });
      dropzone.addEventListener("drop", () => {
        dropzone.classList.remove("is-active");
      });
    }, 200);
  });

  return (
    <div className={classNames("upload-button__container", className)}>
      <div>
        {type === "dragAndDrop" ? (
          <div className={classNames("upload-dropzone")} {...getRootProps()}>
            {uploadContent}
            <input
              type="file"
              style={{ display: "none" }}
              className="input-dropzone"
              multiple={isMultiple}
              ref={fileRef}
              {...getInputProps()}
            />
          </div>
        ) : type === "link" ? (
          <div className="upload-link" onClick={handleClickButton}>
            {icon ? icon : <Upload size={16} />}
            <span className="upload-content m-l--2xs">{uploadContent}</span>
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
          onChange={handleChangeFileInput}
        />
      </div>
      <div className="upload-button__list-file m-t--2xs"></div>
    </div>
  );
}
UploadFile.FileLoadedContent = FileLoadedContent;
UploadFile.FileLoadingContent = FileLoadingContent;

UploadFile.defaultProps = {
  isMultiple: true,
  uploadContent: "Upload",
  files: [],
  isBtnOutLine: false,
  maximumSize: 5000000,
};
export default UploadFile;
