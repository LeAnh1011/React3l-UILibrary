import { Model, ModelFilter } from "react3l-common";
import React, { ReactNode } from "react";
import { Observable } from "rxjs";
import { ComponentUploadAvatar } from "./Components/ComponentUploadAvatar";
import { ComponentUploadImage } from "./Components/ComponentUploadImage";
import "./UploadImage.scss";
export class File extends Model {
  public id?: number;

  public name?: string;

  public url?: string;

  public appUserId?: number;

  public extension?: string;

  public size?: number;

  public rowId?: string;

  public error?: string;
}
export interface FileModel extends File {
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

export enum UPLOADTYPE_IMAGE {
  IMAGE,
  AVATAR,
}

export interface UploadImageProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  type?: UPLOADTYPE_IMAGE;
  autoUpload?: boolean;
  isMultiple?: boolean;
  isMinimized?: boolean;
  files?: FileModel[];
  fileFilter?: (file: unknown, index: number, files: unknown[]) => boolean;
  updateList?: (files: FileModel[]) => void;
  getListFile?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  uploadFile?: (files: File[] | Blob[]) => Observable<FileModel[]>;
  icon?: ReactNode;
  currentAvatar?: File;
  uploadAvatar?: (file: File | Blob) => Observable<FileModel>;
  updateAvatar?: (files: FileModel) => void;
  removeFile?: (fileId?: string | number) => Observable<boolean>;
  size?: "lg" | "md" | "sm" | "xs";
  className?: string;
  maximumSize?: number;
}

function UploadImage(props: UploadImageProps<Model, ModelFilter>) {
  const renderUpload = React.useMemo(() => {
    switch (props.type) {
      case UPLOADTYPE_IMAGE.IMAGE:
        return <ComponentUploadImage {...props} />;
      case UPLOADTYPE_IMAGE.AVATAR:
        return <ComponentUploadAvatar {...props} />;
      default:
        return <></>;
    }
  }, [props]);

  return (
    <>
      <div className="upload-file__container">{renderUpload}</div>
    </>
  );
}

UploadImage.defaultProps = {
  type: UPLOADTYPE_IMAGE.IMAGE,
  isMultiple: true,
  isMinimized: false,
  autoUpload: false,
  size: "lg",
  isSingle: false,
  maximumSize: 5000000,
};

export default UploadImage;
