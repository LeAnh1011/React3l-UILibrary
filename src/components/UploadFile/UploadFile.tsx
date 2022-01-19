import { Model } from "react3l-common";
import React, { Dispatch, RefObject, SetStateAction } from "react";
import "./UploadFile.scss";
import { Observable } from "rxjs";
import { CloseFilled16 } from "@carbon/icons-react";
import { notification } from "antd";
import Button from "components/Button";
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
export interface UploadFileProps<T extends Model> {
  files?: FileModel[];
  isMultiple?: boolean;
  uploadContent?: string;
  isLoadingFile?: boolean;
  setIsLoadingFile?: Dispatch<SetStateAction<boolean>>;
  updateList?: (files: FileModel[] | FileList) => void;
  uploadFile?: (files: File[] | Blob[]) => Observable<FileModel[]>;
  removeFile?: (fileId: string | number) => void;
  classModel?: new () => T;
  isBtnOutLine?: boolean;
}

export function UploadFile(props: UploadFileProps<Model>) {
  const {
    files,
    uploadContent,
    isMultiple,
    updateList,
    uploadFile,
    removeFile,
    isLoadingFile,
    setIsLoadingFile,
    classModel: ClassModel,
    isBtnOutLine,
  } = props;

  const fileRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>();

  const handleClickButton = React.useCallback(() => {
    fileRef.current.click();
  }, []);

  const handleChangeFile = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      const files: File[] = [];
      let check = false;
      let totalSize = 0;
      Array.from(fileList).forEach((file) => {
        totalSize = totalSize + file.size;
        files.push(file);
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
        uploadFile(files).subscribe(
          (res: FileModel[]) => {
            if (res && res.length > 0) {
              const fileRes: any[] = [];
              res.forEach((current) => {
                const mappingObj = new ClassModel();
                mappingObj.fileId = current.id;
                mappingObj.file = current;
                mappingObj.name = current.name;
                fileRes.push(mappingObj);
              });
              updateList(fileRes);
              setIsLoadingFile(false);
            }
          },
          (err) => {}
        );
      }
    },
    [ClassModel, setIsLoadingFile, updateList, uploadFile]
  );

  return (
    <div className="upload-button__container">
      <div>
        <Button
          type={isBtnOutLine ? "outline-primary" : "primary"}
          className="btn--lg"
          onClick={handleClickButton}
          loading={isLoadingFile}
        >
          {uploadContent}
        </Button>
        <input
          type="file"
          style={{ display: "none" }}
          multiple={isMultiple}
          ref={fileRef}
          onChange={handleChangeFile}
        />
      </div>
      <div className="upload-button__list-file m-t--xxs">
        {files &&
          files.length > 0 &&
          files.map((file, index) => (
            <div className="file-container" key={index}>
              <span>{file.name}</span>
              <CloseFilled16
                onClick={() => removeFile(file.fileId)}
                className="remove-file"
              />
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
  isBtnOutLine: false,
};
export default UploadFile;
