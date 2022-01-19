import { Model, ModelFilter } from "react3l-common";
import React, { RefObject } from "react";
import { useDropzone } from "react-dropzone";
import "./UploadFile.scss";
import { Observable } from "rxjs";
import { TrashCan16 } from "@carbon/icons-react";
import { notification } from "antd";
export interface FileModel {
  id?: number;
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
  isLoadingFile?: string;
  updateList?: (files: FileModel[]) => void;
  uploadFile?: (files: File[] | Blob[]) => Observable<FileModel[]>;
  removeFile?: (fileId?: string | number) => Observable<boolean>;
}

export function UploadFile(props: UploadFileProps) {
  const {
    files,
    uploadContent,
    isMultiple,
    updateList,
    uploadFile,
    removeFile,
  } = props;

  const fileRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>();

  const handleClickButton = React.useCallback(() => {
    fileRef.current.click();
  }, []);

  const handleChangeFile = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      let check = false;
      let totalSize = 0;
      Array.from(files).forEach((file) => {
        totalSize = totalSize + file.size;
        if (totalSize > 10000000) {
          notification.error({
            message: `Vượt quá dung lượng cho phép`,
            description: "File tải lên dung lượng phải dưới 10MB",
            placement: "bottomRight",
          });
          check = true;
        }
      });
      if (check) return null;
      if (files && files.length > 0) {
        updateList(files);
      }
    },
    [updateList]
  );

  return (
    <div className="upload-button__container">
      <>
        <div onClick={handleClickButton} className="upload-button__button">
          <span>
            <i className="tio-attachment_diagonal"></i> {uploadContent}
          </span>
        </div>
        <input
          type="file"
          style={{ display: "none" }}
          multiple={isMultiple}
          ref={fileRef}
          onChange={handleChangeFile}
        />
      </>
      <div className="upload-button__list-file mt-2">
        {files &&
          files.length > 0 &&
          files.map((file, index) => (
            <div className="file-container" key={index}>
              <span>
                <i className="tio-documents_outlined"></i>
                {file.name}
              </span>
              <TrashCan16 color="red" onClick={() => removeFile(file.id)} />
            </div>
          ))}
      </div>
    </div>
  );
}

UploadFile.defaultProps = {
  isMultiple: true,
  uploadContent: "Upload",
  isViewMode: false,
  files: [],
};
export default UploadFile;
