import { Model, ModelFilter } from "react3l-common";
import React, { Reducer, RefObject } from "react";
import { useDropzone } from "react-dropzone";
import { UploadImageProps } from "../UploadImage";
import CroppedModal, { ImageResult } from "./CroppedModal/CroppedModal";
import "./ComponentUploadImage.scss";
import { Menu } from "./ComponentMenuImage";
import classNames from "classnames";
import { notification } from "antd";
import { CloudUpload24, Edit24 } from "@carbon/icons-react";

export interface ImageFile {
  fileId: string | number;
  file: File;
  fileUrl: string | ArrayBuffer;
}

interface ImageAction {
  type: string;
  data?: ImageFile;
}

const imageReducer = (state: ImageFile[], action: ImageAction): ImageFile[] => {
  switch (action.type) {
    case "UPDATE":
      return [...state, action.data];
    case "RESET":
      return [];
    default:
      return [...state];
  }
};
interface FileAction {
  type: string;
  data?: JSX.Element;
  datas?: JSX.Element[];
  id?: number;
}

const fileReducer = (
  state: JSX.Element[],
  action: FileAction
): JSX.Element[] => {
  switch (action.type) {
    case "UPDATE":
      return [...state, action.data];
    case "BULK_UPDATE":
      return [...action.datas];
    case "DELETE":
      return [...state.filter((item) => item.props.id !== action.id)];
    default:
      return [...state];
  }
};

export interface ComponentUploadImageProps
  extends UploadImageProps<Model, ModelFilter> {}

export function ComponentUploadImage(props: ComponentUploadImageProps) {
  const {
    size,
    isMultiple,
    isMinimized,
    files,
    getListFile,
    uploadFile,
    removeFile,
    updateList,
  } = props;

  const fileRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    null
  );

  const [menuFile, dispatchMenuFile] = React.useReducer<
    Reducer<JSX.Element[], FileAction>
  >(fileReducer, []);

  const [listImage, dispatch] = React.useReducer<
    Reducer<ImageFile[], ImageAction>
  >(imageReducer, []);

  const [isPreview, setIsPreview] = React.useState<boolean>();

  const handleInput = React.useCallback(
    (event: any) => {
      if (listImage.length > 0) {
        event.stopPropagation();
        setIsPreview(true);
      }
    },
    [listImage.length]
  );

  const handleNewInput = React.useCallback((event: any) => {
    event.stopPropagation();
    setIsPreview(true);
  }, []);

  const handleClosePreview = React.useCallback(() => {
    setIsPreview(false);
  }, []);

  const handleSaveCropped = React.useCallback(
    (imageCroppedList: ImageResult[]) => {
      if (imageCroppedList && imageCroppedList.length) {
        let files: Blob[] = [];
        imageCroppedList.forEach((currentImage) => {
          files.push(currentImage.file);
        });
        let check = false;
        let totalSize = 0;
        Array.from(files).forEach((file) => {
          totalSize = totalSize + file.size;
          if (file.size > 5000000 || totalSize > 10000000) {
            notification.error({
              message: `Ảnh vượt quá dung lượng cho phép`,
              description:
                "Mỗi ảnh tải lên dung lượng phải dưới 5MB và tổng dung lượng phải dưới 10MB",
              placement: "bottomRight",
            });
            check = true;
          }
        });
        if (check) return null;
        uploadFile(files).subscribe((res) => {
          if (res) {
            updateList(res);
          }
        });
      }
    },
    // []
    [uploadFile, updateList]
  );

  const handleClearItem = React.useCallback(
    (fileId: string | number) => {
      removeFile(fileId).subscribe((res) => {
        if (res) {
          updateList(files.filter((item) => item.id !== fileId));
        }
      });
    },
    [files, removeFile, updateList]
  );

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      let listFiles = acceptedFiles as File[];
      if (!isMultiple) listFiles.length = 1;
      listFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          dispatch({
            type: "UPDATE",
            data: {
              fileId: file.name,
              file: file,
              fileUrl: fileReader.result as string,
            },
          });
        };
        if (file) {
          fileReader.readAsDataURL(file);
        }
      });
      setIsPreview(true);
    },
    [isMultiple]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  React.useEffect(() => {
    if (typeof getListFile === "function") {
      getListFile().subscribe(
        (res) => {},
        (err) => {}
      );
    } else {
      if (files && files.length > 0) {
        let loadedFiles = [...files];
        if (!isMultiple) {
          loadedFiles.length = 1;
        }
        loadedFiles.forEach((file) => {
          file.clearAction = handleClearItem;
        });
        const menus = Menu(loadedFiles, handleNewInput);
        dispatchMenuFile({
          type: "BULK_UPDATE",
          datas: menus,
        });
      }
    }
  }, [
    getListFile,
    files,
    isMultiple,
    removeFile,
    handleClearItem,
    handleNewInput,
  ]);

  return (
    <>
      <div
        className={classNames(`upload-image__container upload-image--${size}`, {
          multiple: isMultiple && !isMinimized,
          minimized: isMultiple && isMinimized,
        })}
      >
        <div className="upload-image__drop-zone" {...getRootProps()}>
          {isMultiple && !isMinimized && (
            <div className="upload-image__list" onClick={handleInput}>
              {menuFile.map((menu) => (
                <>{menu}</>
              ))}
              <CloudUpload24 />
            </div>
          )}
          {isMultiple && isMinimized && (
            <>
              {files?.length > 0 ? (
                <div
                  style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${files[0].url})`,
                    backgroundSize: "cover",
                  }}
                  className="upload-image--minimized"
                >
                  <div className="upload-image--minimized__num">
                    {files.length > 1 ? `${files.length - 1}+` : ""}
                  </div>
                  <div className="upload-image--minimized__act">
                    <Edit24 />
                  </div>
                </div>
              ) : (
                <div onClick={handleInput}>
                  <CloudUpload24 />
                </div>
              )}
            </>
          )}
          {!isMultiple && (
            <>
              {files.length === 0 ? (
                <div onClick={handleInput}>
                  <CloudUpload24 />
                </div>
              ) : (
                <div className="upload-image__list">{menuFile[0]}</div>
              )}
            </>
          )}
          <input
            type="file"
            ref={fileRef}
            style={{ display: "none" }}
            {...getInputProps()}
          />
          {isMultiple && !isMinimized && (
            <p>
              <span style={{ color: "#0062FF", cursor: "pointer" }}>
                Tải ảnh
              </span>{" "}
              hoặc kéo thả để thêm ảnh.
            </p>
          )}
        </div>
      </div>
      {listImage && (
        <CroppedModal
          visible={isPreview}
          handleCancel={handleClosePreview}
          handleSave={handleSaveCropped}
          listImage={listImage}
          isMultiple={isMultiple}
        />
      )}
    </>
  );
}
