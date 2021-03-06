import { Model, ModelFilter } from "react3l-common";
import { notification } from "antd";
import classNames from "classnames";
import React, { Reducer, RefObject } from "react";
import { useDropzone } from "react-dropzone";
import { UploadImageProps } from "../UploadImage";
import CroppedModal, { ImageResult } from "./CroppedModal/CroppedModal";
import "./ComponentUploadImage.scss";
import CloudUpload24 from "@carbon/icons-react/es/cloud--upload/24";

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
    uploadAvatar,
    updateAvatar,
    className,
    icon,
    maximumSize,
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
      if (imageCroppedList && imageCroppedList.length > 0) {
        let file = imageCroppedList[imageCroppedList.length - 1].file;
        let check = false;
        if (file.size > maximumSize) {
          notification.error({
            // type: messageType.ERROR,
            message: `???nh v?????t qu?? dung l?????ng cho ph??p`,
            description: `Dung l?????ng ???nh t???i l??n ph???i d?????i ${(
              maximumSize / 1000000
            ).toFixed(2)}MB`,
            placement: "bottomRight",
            duration: 5,
          });
          check = true;
        }
        if (check) return null;
        uploadAvatar(file).subscribe((res) => {
          if (res) {
            updateAvatar(res);
          }
        });
      }
    },
    // []
    [maximumSize, updateAvatar, uploadAvatar]
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
        message: `?????nh d???ng file t???i l??n kh??ng h???p l???`,
        description: "File t???i l??n ph???i c?? ?????nh d???ng ???nh",
        placement: "bottomRight",
        duration: 5,
      });
    }
  }, []);

  const renderImage = React.useMemo(() => {
    return (
      <div>
        <img
          src={currentAvatar}
          className={classNames(className, "image-in-content")}
          alt="avatar"
        />
      </div>
    );
  }, [className, currentAvatar]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <>
      <div className={classNames(`upload-image__container`)}>
        <div
          className={classNames("upload-image__drop-zone", className)}
          {...getRootProps()}
        >
          {!currentAvatar ? (
            <div onClick={handleInput}>{icon ? icon : <CloudUpload24 />}</div>
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
      {image && isPreview && (
        <CroppedModal
          visible={isPreview}
          handleCancel={handleClosePreview}
          handleSave={handleSaveCropped}
          listImage={[image]}
          isMultiple={false}
          defaultAspect={1 / 1}
        />
      )}
    </>
  );
}
