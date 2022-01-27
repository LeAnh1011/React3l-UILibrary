import { Model, ModelFilter } from "react3l-common";
import { notification } from "antd";
import classNames from "classnames";
import React, { Reducer, RefObject } from "react";
import { useDropzone } from "react-dropzone";
import uploadImage from "../../../../../assets/images/upload-file/upload.svg";
import { UploadImageProps } from "../UploadImage";
import CroppedModal, { ImageResult } from "./CroppedModal/CroppedModal";
import "./UploadImage.scss";

export interface ImageFile {
  fileId: string | number;
  file: File;
  fileUrl: string | ArrayBuffer;
}

interface ImageAction {
  type: string;
  data?: ImageFile;
}

const imageReducer = (state: ImageFile, action: ImageAction): ImageFile => {
  switch (action.type) {
    case "UPDATE":
      return action.data;
    case "RESET":
      return null;
    default:
      return state;
  }
};

export interface ComponentUploadAvatarProps
  extends UploadImageProps<Model, ModelFilter> {}

export function ComponentUploadAvatar(props: ComponentUploadAvatarProps) {
  const {
    currentAvatar,
    isMultiple,
    isMinimized,
    uploadSingleImage,
    updateSingleImage,
    classNameProps,
    iconUrl,
  } = props;

  const fileRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    null
  );

  const [image, dispatch] = React.useReducer<Reducer<ImageFile, ImageAction>>(
    imageReducer,
    null
  );

  const [isPreview, setIsPreview] = React.useState<boolean>(false);

  const handleInput = React.useCallback(
    (event: any) => {
      if (image) {
        event.stopPropagation();
        setIsPreview(true);
      }
    },
    [image]
  );

  const handleClosePreview = React.useCallback(() => {
    setIsPreview(false);
  }, []);

  const handleSaveCropped = React.useCallback(
    (imageCroppedList: ImageResult[]) => {
      if (imageCroppedList && imageCroppedList.length) {
        let file = imageCroppedList[imageCroppedList.length - 1].file;
        let check = false;
        if (file.size > 5000000) {
          notification.error({
            // type: messageType.ERROR,
            message: `Ảnh vượt quá dung lượng cho phép`,
            description: "Dung lượng ảnh tải lên phải dưới 5MB",
            placement: "bottomRight",
            duration: 5,
          });
          check = true;
        }
        if (check) return null;
        uploadSingleImage(file).subscribe((res) => {
          if (res) {
            updateSingleImage(res);
          }
        });
      }
    },
    // []
    [uploadSingleImage, updateSingleImage]
  );

  const onDrop = React.useCallback((acceptedFiles, fileRejections) => {
    let listFiles = acceptedFiles as File[];
    let rejectFiles = fileRejections as File[];
    if (!rejectFiles.length || rejectFiles.length === 0) {
      listFiles.length = 1;
      listFiles?.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          dispatch({
            type: "UPDATE",
            data: {
              fileId: file.name,
              file: file,
              fileUrl: fileReader.result,
            },
          });
        };
        if (file) {
          fileReader.readAsDataURL(file);
        }
      });
      setIsPreview(true);
    } else {
      notification.error({
        // type: messageType.ERROR,
        message: `Định dạng file tải lên không hợp lệ`,
        description: "File tải lên phải có định dạng ảnh",
        placement: "bottomRight",
        duration: 5,
      });
    }
  }, []);

  const renderImage = React.useMemo(() => {
    return (
      <div>
        <img
          src={currentAvatar?.url}
          className={classNames(classNameProps, "image-in-content")}
          alt="avatar"
        />
      </div>
    );
  }, [classNameProps, currentAvatar]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <>
      <div
        className={classNames(`upload-image__container`, {
          multiple: isMultiple && !isMinimized,
          minimized: isMultiple && isMinimized,
        })}
      >
        <div
          className={classNames("upload-image__drop-zone", classNameProps)}
          {...getRootProps()}
        >
          {!currentAvatar ? (
            <div onClick={handleInput}>
              <img
                className="icon-upload"
                src={iconUrl ? iconUrl : uploadImage}
                alt="icon"
              ></img>
            </div>
          ) : (
            renderImage
          )}
          <input
            type="file"
            ref={fileRef}
            style={{ display: "none" }}
            {...getInputProps()}
            accept="image/*"
            multiple={false}
          />
        </div>
      </div>
      {image && (
        <CroppedModal
          visible={isPreview}
          handleCancel={handleClosePreview}
          handleSave={handleSaveCropped}
          listImage={[image]}
          isMultiple={isMultiple}
        />
      )}
    </>
  );
}
