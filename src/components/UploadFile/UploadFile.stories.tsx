import { storiesOf } from "@storybook/react";
import React from "react";
import { Model } from "react3l-common";
import { Observable } from "rxjs";
import nameof from "ts-nameof.macro";
import UploadFile, { FileModel } from "./UploadFile";

const demoList = [
  {
    path:
      "https://media.discordapp.net/attachments/663753852184428596/847406738138595348/7ab2cd69-80fe-4106-ba8d-218d78b131d4.png",
    isDelete: true,
    name: "demoImage1.png",
    id: 1,
  },
  {
    path:
      "https://media.discordapp.net/attachments/663753852184428596/847406738138595348/7ab2cd69-80fe-4106-ba8d-218d78b131d4.png",
    isDelete: true,
    name: "demoImage2.png",
    id: 2,
  },
  {
    path:
      "https://media.discordapp.net/attachments/663753852184428596/847406738138595348/7ab2cd69-80fe-4106-ba8d-218d78b131d4.png",
    isDelete: true,
    name: "demoImage3.png",
    id: 3,
  },
];

class ModelOBJ extends Model {
  public id?: number;
  public name?: string;
  public fileMappings?: FileModel[];
}
class ModelMapping extends Model {
  public fileId?: number;
  public file?: File;
  public conq?: string;
  public name?: string;
}

function Default() {
  const [model, setModel] = React.useState<ModelOBJ>({ ...new ModelOBJ() });
  const [isLoadingFile, setIsLoadingFile] = React.useState<boolean>(false);
  const handleUpdateList = React.useCallback(
    (listMapping) => {
      const newListFileMappings = [
        ...(model.fileMappings || []),
        ...listMapping,
      ];
      setModel({
        ...model,
        fileMappings: newListFileMappings,
      });
    },
    [model]
  );
  const handleRemoveFile = React.useCallback(
    (fileId: string | number) => {
      debugger;
      const listFileMappings = model?.fileMappings?.filter(
        (p) => p.fileId !== fileId
      );
      setModel({
        ...model,
        fileMappings: listFileMappings,
      });
    },
    [model]
  );

  const demoObservable = new Observable<FileModel[]>((observer) => {
    setIsLoadingFile(true);
    setTimeout(() => {
      observer.next(demoList);
    }, 1500);
  });

  const demoUploadFile = (file: File[] | Blob[]) => {
    return demoObservable;
  };

  return (
    <UploadFile
      files={model?.fileMappings || []}
      uploadFile={demoUploadFile}
      updateList={handleUpdateList}
      classModel={ModelMapping}
      isLoadingFile={isLoadingFile}
      setIsLoadingFile={setIsLoadingFile}
      removeFile={handleRemoveFile}
    ></UploadFile>
  );
}

storiesOf("UploadFile", module).add(nameof(Default), Default);
