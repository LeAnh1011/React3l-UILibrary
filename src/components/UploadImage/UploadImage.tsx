import React, { ReactNode } from "react";
import { Model } from "react3l-common";
import type { Observable } from "rxjs";
import { ComponentUploadAvatar } from "./Components/ComponentUploadAvatar";
import { ComponentUploadImage } from "./Components/ComponentUploadImage";
import "./UploadImage.scss";
import { UPLOADTYPE_IMAGE } from "@Configs/enum";

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

export interface UploadImageProps {
  /** Option to change style of upload  IMAGE, AVATAR*/
  type?: UPLOADTYPE_IMAGE;
  /**Auto upload image */
  autoUpload?: boolean;
  /**Option for multiple UploadImage */
  isMultiple?: boolean;
  /**Option for minimized size UploadImage */
  isMinimized?: boolean;
  /**List image uploaded*/
  files?: FileModel[];
  /**Function change list image uploaded */
  updateList?: (files: FileModel[]) => void;
  /**API use to upload list image selected to server*/
  uploadFile?: (files: File[] | Blob[]) => Observable<FileModel[]>;
  /**Icon of component */
  icon?: ReactNode;
  /**Url of avatar for type UPLOADTYPE_IMAGE.AVATAR */
  currentAvatar?: string;
  /**API upload image to server for type UPLOADTYPE_IMAGE.AVATAR */
  uploadAvatar?: (file: File | Blob) => Observable<FileModel>;
  /**Function change currentAvatar for type UPLOADTYPE_IMAGE.AVATAR */
  updateAvatar?: (files: FileModel) => void;
  /**Function use to remove image */
  removeFile?: (fileId?: string | number) => Observable<boolean>;
  /**Option change size of UploadImage */
  size?: "lg" | "md" | "sm" | "xs";
  /**Use to custom style the component*/
  className?: string;
  /**Option limit maximum size (b) of list image to upload to server */
  maximumSize?: number;
}

function UploadImage(props: UploadImageProps) {
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
  maximumSize: 5000000,
};

export default UploadImage;
