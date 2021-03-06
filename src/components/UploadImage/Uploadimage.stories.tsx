import Camera32 from "@carbon/icons-react/es/camera/32";
import { storiesOf } from "@storybook/react";
import React from "react";
import { Observable } from "rxjs";
import nameof from "ts-nameof.macro";
import UploadImage, { FileModel, File, UPLOADTYPE_IMAGE } from "./UploadImage";

const demoList = {
  url:
    "https://media.discordapp.net/attachments/663753852184428596/847406738138595348/7ab2cd69-80fe-4106-ba8d-218d78b131d4.png",
  isDelete: true,
  name: "demoImage1.png",
  id: 1,
};

const menu = [
  {
    url:
      "https://media.discordapp.net/attachments/663753852184428596/847406738138595348/7ab2cd69-80fe-4106-ba8d-218d78b131d4.png",
    isDelete: true,
    name: "demoImage1.png",
    id: 1,
  },
  {
    url:
      "https://media.discordapp.net/attachments/663753852184428596/847406738138595348/7ab2cd69-80fe-4106-ba8d-218d78b131d4.png",
    isDelete: true,
    name: "demoImage2.png",
    id: 2,
  },
  {
    url:
      "https://media.discordapp.net/attachments/663753852184428596/847406738138595348/7ab2cd69-80fe-4106-ba8d-218d78b131d4.png",
    isDelete: true,
    name: "demoImage3.png",
    id: 3,
  },
];

function Default() {
  const [avatar, setAvatar] = React.useState<string>();
  const [listImage, setlistImage] = React.useState<File[]>([]);

  const demoObservableAvatar = new Observable<FileModel>((observer) => {
    setTimeout(() => {
      observer.next(demoList);
    }, 3000);
  });

  const demoUploadAvatar = (file: File | Blob) => {
    return demoObservableAvatar;
  };
  const demoObservableListImage = new Observable<FileModel[]>((observer) => {
    setTimeout(() => {
      observer.next(menu);
    }, 3000);
  });

  const demoUploadListImage = (file: File[] | Blob[]) => {
    return demoObservableListImage;
  };

  const handleChangeAvatar = React.useCallback((value) => {
    setAvatar(value?.url);
  }, []);
  const handleChangeListImage = React.useCallback(
    (values) => {
      const newArr = [...listImage, ...values];
      setlistImage([...newArr]);
    },
    [listImage]
  );

  return (
    <div style={{ margin: "20px 20px", width: "600px" }}>
      <div style={{ width: "100%", padding: "10px 10px" }}>
        Type Avatar, c?? nhi???u ki???u, c?? vi???n c?? khung vu??ng... hi???n th??? tr??n
        currentAvatar, th??m css v??o b???ng className, s??? d???ng uploadAvatar v??
        updateAvatar ri??ng
        <UploadImage
          currentAvatar={avatar}
          className="avatar-css-demo"
          type={UPLOADTYPE_IMAGE.AVATAR}
          // s??? d???ng h??m kh??c
          uploadAvatar={demoUploadAvatar}
          updateAvatar={handleChangeAvatar}
          icon={<Camera32 />}
        ></UploadImage>
      </div>
      <div style={{ width: "100%", padding: "10px 10px" }}>
        Lo???i Th?????ng , multiple false
        <UploadImage
          files={listImage}
          type={UPLOADTYPE_IMAGE.IMAGE}
          isMultiple={false}
          uploadFile={demoUploadListImage}
          updateList={handleChangeListImage}
        ></UploadImage>
      </div>

      <div style={{ width: "100%", padding: "10px 10px", display: "flex" }}>
        <div>
          Lo???i th?????ng, multiple = true, IsMinimized = true,
          <UploadImage
            files={listImage}
            type={UPLOADTYPE_IMAGE.IMAGE}
            isMinimized={true}
            uploadFile={demoUploadListImage}
            updateList={handleChangeListImage}
          ></UploadImage>
        </div>
      </div>
      <div style={{ width: "100%", padding: "10px 10px", display: "flex" }}>
        <div>
          Lo???i th?????ng, multiple = true, IsMinimized = false,
          <UploadImage
            files={listImage}
            type={UPLOADTYPE_IMAGE.IMAGE}
            isMinimized={false}
            uploadFile={demoUploadListImage}
            updateList={handleChangeListImage}
          ></UploadImage>
        </div>
      </div>
    </div>
  );
}

storiesOf("UploadImage", module).add(nameof(Default), Default);
