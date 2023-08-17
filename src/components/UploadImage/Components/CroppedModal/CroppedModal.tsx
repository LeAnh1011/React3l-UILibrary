import { Button, Input, Select, Slider, Modal } from "antd";
import React, { Reducer } from "react";
import ReactCrop from "react-image-crop";
import { ImageFile } from "../ComponentUploadImage";
import classNames from "classnames";
import { formatFileSize } from "@Helpers/file";
import { ModalCustomProps } from "@Components/Modal/NormalModal/Modal";
import {
  Close,
  CloudUpload,
  Crop,
  TrashCan,
  Upload,
} from "@carbon/icons-react";
import "./CroppedModal.scss";

const { Option } = Select;

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 100;
const PREVIEW_WIDTH = 192;
const PREVIEW_HEIGHT = 192;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

const defaultCrop = {
  unit: "%",
  width: 100,
  height: 100,
  aspect: 1 / 1,
};

export interface ImageResult {
  id?: string | number;
  fileName?: string;
  fileUrl?: string;
  file?: File;
}

export interface ResultAction {
  type: string;
  data?: ImageResult;
  id?: string | number;
}

interface ImageAction {
  type: string;
  data?: ImageFile;
  files?: ImageFile[];
}

function imageReducer(state: ImageFile[], action: ImageAction): ImageFile[] {
  switch (action.type) {
    case "UPDATE":
      return [...state, action.data];
    case "SET":
      return [...action.files];
    default:
      return [...state];
  }
}

function resultReducer(
  currentState: ImageResult[],
  action: ResultAction
): ImageResult[] {
  switch (action.type) {
    case "ADD":
      return [...currentState, action.data];
    case "UPDATE":
      let filterImage = currentState.filter((currentImage) => {
        return currentImage.id === action.data.id;
      });
      let index = currentState.indexOf(filterImage[0]);
      currentState[index] = action.data;
      return [...currentState];
    case "FILL":
      let findImage = currentState.filter((currentImage) => {
        return currentImage.id === action.data.id;
      });
      if (findImage.length === 0) {
        return [...currentState, action.data];
      }
      return [...currentState];
    case "DELETE":
      return [...currentState.filter((img) => img.id !== action.id)];
    default:
      return [...currentState];
  }
}

export interface CroppedModalProps extends ModalCustomProps {
  listImage: ImageFile[];
  isMultiple: boolean;
  defaultAspect?: any;
}

function useStateCallback(initialState: any) {
  const [state, setState] = React.useState(initialState);
  const cbRef = React.useRef(null);

  const setStateCallback = React.useCallback((state, cb) => {
    cbRef.current = cb;
    setState(state);
  }, []);

  React.useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, setStateCallback];
}

export default function CroppedModal(props: CroppedModalProps) {
  const {
    isMultiple,
    listImage,
    open,
    handleCancel,
    handleSave,
    defaultAspect,
  } = props;

  const [images, dispatchImages] = React.useReducer<
    Reducer<ImageFile[], ImageAction>
  >(imageReducer, listImage);
  const [selectedImage, setSelectedImage] = React.useState<ImageFile>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | string>(0);
  const [imageInfo, setImageInfo] = React.useState(null);
  const imageZoomArray = React.useRef<ImageFile[]>(null);

  const imgRef = React.useRef(null);
  const previewRef = React.useRef(null);
  const moreRef = React.useRef<HTMLInputElement>();

  const [crop, setCrop] = useStateCallback(defaultCrop);
  const [completedCrop, setCompletedCrop] = React.useState(null);
  const [zoom, setZoom] = React.useState(1);

  const [finished, setFinished] = React.useState<boolean>(false);

  const [imageResults, dispatchResults] = React.useReducer<
    Reducer<ImageResult[], ResultAction>
  >(resultReducer, []);

  const onImageLoaded = React.useCallback(
    (image: any) => {
      imgRef.current = image;
      // prevent displaying zoomed image's size
      if (zoom === 1)
        setImageInfo({
          ...imageInfo,
          width: imgRef.current.clientWidth,
          height: imgRef.current.clientHeight,
        });
    },
    [imageInfo, zoom]
  );

  React.useEffect(() => {
    if (listImage) {
      dispatchImages({
        type: "SET",
        files: listImage,
      });
    }
  }, [listImage]);

  const getCroppedImg = React.useCallback(
    async (image, crop, fileName): Promise<any> => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          var fileUrl: string;
          window.URL.revokeObjectURL(fileUrl);
          fileUrl = window.URL.createObjectURL(blob);
          const file = new File([blob], fileName);
          resolve({ fileUrl, file });
        }, "image/jpeg");
      });
    },
    []
  );

  // Crop Action
  // Crop selected image then update to results
  const makeCropImage = React.useCallback(
    async (_, cropParam?: any) => {
      if (imgRef && crop.width && crop.height) {
        const cropValue = cropParam ? cropParam : crop;
        const croppedImage = await getCroppedImg(
          imgRef.current,
          cropValue,
          selectedImage.file.name
        );

        const imageExisted = imageResults.filter(
          (current) => current.id === selectedImage.fileId
        )[0];

        if (imageExisted) {
          dispatchResults({
            type: "UPDATE",
            data: {
              id: selectedImage.fileId,
              fileName: selectedImage.file.name,
              fileUrl: croppedImage.fileUrl as string,
              file: croppedImage.file as File,
            },
          });
        } else {
          dispatchResults({
            type: "ADD",
            data: {
              id: selectedImage.fileId,
              fileName: selectedImage.file.name,
              fileUrl: croppedImage.fileUrl as string,
              file: croppedImage.file as File,
            },
          });
        }
      }
    },
    [getCroppedImg, crop, selectedImage, imageResults]
  );

  const renderPreview = React.useCallback(() => {
    if (imageResults && selectedImage) {
      const imgs = imageResults.find(
        (item) => item.id === selectedImage.fileId
      );
      if (imgs) return <img src={imgs.fileUrl} alt="" />;
    }
    return null;
  }, [imageResults, selectedImage]);

  const handleSelect = React.useCallback(
    (itemKey: string | number) => {
      const numberItemKey = Number(itemKey);
      setSelectedImage(images[numberItemKey]);
      setSelectedIndex(numberItemKey);
      // reset image cache
      imageZoomArray.current = [images[numberItemKey]];
      // reset zoom
      setZoom(1);
      // set file size
      setImageInfo({
        size: images[numberItemKey].file.size,
      });
    },
    [images]
  );

  const handleAdd = React.useCallback((files) => {
    Array.from(files).forEach((file: any) => {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        dispatchImages({
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
  }, []);

  const handleDelete = React.useCallback(
    (itemKey: number) => {
      dispatchResults({
        type: "DELETE",
        id: images[itemKey].fileId,
      });
      dispatchImages({
        type: "SET",
        files: images.filter((_, index) => index !== itemKey),
      });
      // Move selection based on selected item
      if (selectedIndex === itemKey) {
        if (selectedIndex === images.length - 1) {
          setSelectedImage(images[itemKey - 1]);
          setSelectedIndex(itemKey - 1);
        } else {
          setSelectedImage(images[itemKey + 1]);
          setSelectedIndex(itemKey);
        }
      }
    },
    [images, selectedIndex]
  );

  // Confirm Action:
  // Add un-edited images to results then mark the crop
  // process as finished
  const handleConfirm = React.useCallback(() => {
    images.forEach((image) => {
      dispatchResults({
        type: "FILL",
        data: {
          id: image.fileId,
          fileName: image.file.name,
          fileUrl: image.fileUrl as string,
          file: image.file as File,
        },
      });
    });
    setFinished(true);
  }, [images]);

  const handleZoom = React.useCallback(
    (val: any) => {
      const existingImg = imageZoomArray.current[val - 1];
      if (existingImg) {
        setSelectedImage(existingImg);
        setZoom(val);
        return;
      }
      const oldZoom = (zoom + 3) / 4;
      const newZoom = (val + 3) / 4;
      const canvas = document.createElement("canvas");
      const image = imgRef.current;
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      canvas.width = (width * newZoom) / oldZoom;
      canvas.height = (height * newZoom) / oldZoom;

      // Scale
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        0,
        0,
        (width * newZoom) / oldZoom,
        (height * newZoom) / oldZoom
      );

      canvas.toBlob((blob) => {
        var fileUrl: string;
        window.URL.revokeObjectURL(fileUrl);
        fileUrl = window.URL.createObjectURL(blob);
        const file = new File([blob], selectedImage.file.name);
        const imageFile = {
          fileId: selectedImage.fileId,
          file: file,
          fileUrl: fileUrl,
        };
        imageZoomArray.current[val - 1] = imageFile;
        setSelectedImage(imageFile);
      }, "image/jpeg");

      setZoom(val);
    },
    [selectedImage, zoom]
  );

  const handleChangeAspect = React.useCallback(
    (value: any) => {
      const curValue = {
        ...crop,
        width: DEFAULT_WIDTH,
        height: 0,
        aspect: value,
      };

      if (value === 0) {
        curValue.height = DEFAULT_HEIGHT;
        curValue.unit = "px";
        curValue.aspect = null;
      }
      setCrop(curValue);
    },
    [crop, setCrop]
  );

  const handleChangeSize = React.useCallback(
    (key: string, value: any) => {
      const curValue = { ...crop };
      if (value && curValue["aspect"] === null) {
        curValue[key] = parseInt(value);
        setCrop(curValue);
      } else {
        curValue[key] = 0;
        setCrop(curValue);
      }
    },
    [crop, setCrop]
  );

  const handleCancelModal = React.useCallback(() => {
    handleCancel(null);
  }, [handleCancel]);

  React.useEffect(() => {
    if (listImage.length !== 0) {
      setSelectedImage(listImage[0]);
      // reset image cache
      imageZoomArray.current = [listImage[0]];
      // set file size
      setImageInfo({ size: listImage[0].file.size });
    }
  }, [listImage]);

  // Select first image on adding images after deleting all
  React.useEffect(() => {
    if (images.length > 0 && selectedImage === undefined) {
      setSelectedImage(images[0]);
      setSelectedIndex(0);
    }
  }, [images, selectedImage]);

  // Only send results back after the process
  // is marked as finished
  React.useEffect(() => {
    if (finished) {
      handleSave(imageResults);
      handleCancelModal();
      setFinished(false);
    }
  }, [finished, handleCancelModal, handleSave, imageResults]);

  React.useEffect(() => {
    if (!completedCrop || !previewRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
    <>
      <Modal
        open={open}
        width={1000}
        closable={false}
        bodyStyle={{ borderRadius: 10 }}
        footer={null}
      >
        <div className="cropped-modal__container">
          <div className="cropped-modal__content">
            <div className="cropped-modal__upper">
              <div className="cropped-modal__left-side">
                <div
                  className={classNames("cropped-modal__list", {
                    single: !isMultiple,
                  })}
                >
                  {images.map((currentImage, index) => {
                    return (
                      <div
                        className={classNames("cropped-modal__upload", {
                          single: !isMultiple,
                        })}
                        key={index}
                      >
                        <img
                          src={currentImage.fileUrl as string}
                          alt="IMG"
                          className={classNames({
                            selected: isMultiple && selectedIndex === index,
                          })}
                          onClick={() => {
                            handleSelect(index);
                          }}
                        ></img>
                        <div
                          className="image-item__delete"
                          onClick={() => handleDelete(index)}
                        >
                          <TrashCan size={32} />
                        </div>
                      </div>
                    );
                  })}
                  {(isMultiple || images.length === 0) && (
                    <>
                      <div
                        className={classNames("cropped-modal__add", {
                          empty: images.length === 0,
                        })}
                        onClick={() => moreRef.current.click()}
                      >
                        <CloudUpload size={24} />
                        <input
                          type="file"
                          ref={moreRef}
                          style={{ display: "none" }}
                          onChange={(e) => handleAdd(e.target.files)}
                          accept="image/*"
                          multiple
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="cropped-modal__info">
                  {selectedImage && imageInfo && (
                    <>
                      <h4>Thông tin ảnh</h4>
                      <p>
                        Kích thước gốc: {imageInfo.width} x {imageInfo.height}
                      </p>
                      <p>Tên file: {selectedImage.file.name}</p>
                      <p>Dung luợng: {formatFileSize(imageInfo.size)}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="cropped-modal__middle">
                <div className="cropped-modal__navi">
                  <div className="cropped-modal__ratio">
                    <Select
                      defaultValue={defaultAspect ? defaultAspect : 0}
                      style={{ width: 104, height: 32 }}
                      onChange={handleChangeAspect}
                    >
                      <Option value={0}>Tự do</Option>
                      <Option value={1 / 1}>1 : 1</Option>
                      <Option value={3 / 4}>3 : 4</Option>
                      <Option value={16 / 9}>16 : 9</Option>
                      <Option value={3 / 1}>3 : 1</Option>
                      <Option value={10 / 3}>10 : 3</Option>
                    </Select>
                  </div>
                  <div className="cropped-modal__custom-size">
                    <div style={{ marginRight: 8 }}>
                      <Input
                        addonBefore="W"
                        style={{ width: 80 }}
                        value={crop.width}
                        onChange={(e) =>
                          handleChangeSize("width", e.target.value)
                        }
                        disabled={crop.aspect !== null}
                      />
                    </div>
                    <div style={{ verticalAlign: "center" }}>X</div>
                    <div style={{ marginLeft: 8 }}>
                      <Input
                        addonBefore="H"
                        style={{ width: 80 }}
                        value={crop.height}
                        onChange={(e) =>
                          handleChangeSize("height", e.target.value)
                        }
                        disabled={crop.aspect !== null}
                      />
                    </div>
                    <div style={{ marginLeft: 56 }}>
                      <Button onClick={makeCropImage}>
                        <Crop size={20} />
                        Cắt
                      </Button>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    height: 440,
                    width: 440,
                    overflow: "scroll",
                  }}
                >
                  <ReactCrop
                    src={selectedImage?.fileUrl as string}
                    onImageLoaded={onImageLoaded}
                    crop={crop}
                    onChange={(c: any) => setCrop(c)}
                    onComplete={(c: any) => setCompletedCrop(c)}
                    style={{
                      backgroundColor: "#171725",
                    }}
                  />
                </div>
                <div className="cropped-modal__slider">
                  <Slider
                    min={MIN_ZOOM}
                    max={MAX_ZOOM}
                    value={zoom}
                    onChange={handleZoom}
                  />
                </div>
              </div>
              <div className="cropped-modal__right-side">
                <div className="cropped-modal__action">
                  <div className="cropped-modal__result">
                    <h4>Preview</h4>
                    <div
                      style={{
                        width: PREVIEW_WIDTH,
                        height: PREVIEW_HEIGHT,
                        backgroundColor: "#ededf7",
                      }}
                      className="cropped-modal__preview"
                    >
                      <>{renderPreview()}</>
                    </div>
                  </div>
                </div>
                <div className="cropped-modal__footer">
                  <Button type="primary" onClick={handleConfirm}>
                    Tải lên
                    <Upload size={16} />
                  </Button>
                  <Button onClick={handleCancelModal}>
                    Hủy
                    <Close size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
