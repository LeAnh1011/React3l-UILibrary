import { storiesOf } from "@storybook/react";
import React from "react";
import { Model } from "react3l-common";
import { Observable } from "rxjs";
import nameof from "ts-nameof.macro";
import UploadFile, { FileModel } from "./UploadFile";

const demoList = [
  {
    url:
      "https://cdn.searchenginejournal.com/wp-content/uploads/2022/04/reverse-image-search-627b7e49986b0-sej-760x400.png",
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
    errors: {
      name: "file này đang có vấn đề",
    },
  },
  {
    url:
      "https://media.discordapp.net/attachments/663753852184428596/847406738138595348/7ab2cd69-80fe-4106-ba8d-218d78b131d4.png",
    isDelete: true,
    name: "demoImage3.png",
    id: 3,
  },
];

class ModelOBJ extends Model {
  public id?: number;
  public name?: string;
  public files?: FileModel[];
}

function Default() {
  const [model, setModel] = React.useState<ModelOBJ>({ ...new ModelOBJ() });

  const handleUpdateList = React.useCallback(
    (listFile: FileModel[]) => {
      const newListFiles = [...(model.files || []), ...listFile];
      setModel({
        ...model,
        files: newListFiles,
      });
    },
    [model]
  );
  const handleRemoveFile = React.useCallback(
    (fileId: string | number) => {
      const listFile = model?.files?.filter((p) => p.id !== fileId);
      setModel({
        ...model,
        files: listFile,
      });
    },
    [model]
  );

  const demoObservable = new Observable<FileModel[]>((observer) => {
    setTimeout(() => {
      observer.next(demoList);
    }, 3000);
  });

  const demoUploadFile = (file: File[] | Blob[]) => {
    return demoObservable;
  };

  return (
    <UploadFile
      files={model?.files || []}
      uploadFile={demoUploadFile}
      updateList={handleUpdateList}
      removeFile={handleRemoveFile}
      isMultiple={false}
      type="link"
    ></UploadFile>
  );
}

storiesOf("UploadFile", module).add(nameof(Default), Default);
