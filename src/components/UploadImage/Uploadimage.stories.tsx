import { storiesOf } from "@storybook/react";
import React from "react";
import nameof from "ts-nameof.macro";
import UploadImage, { UPLOADTYPE_IMAGE } from "./UploadImage";

const menu = [
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

function Default() {
  return (
    <div style={{ margin: "20px 20px", width: "600px" }}>
      <div style={{ width: "100%", padding: "10px 10px" }}>
        <UploadImage
          files={[]}
          type={UPLOADTYPE_IMAGE.IMAGE}
          isMultiple={false}
          size="normal"
        ></UploadImage>
      </div>
      <div style={{ width: "100%", padding: "10px 10px" }}>
        <UploadImage
          files={menu}
          type={UPLOADTYPE_IMAGE.IMAGE}
          isMultiple={false}
          size="small"
        ></UploadImage>
      </div>

      <div style={{ width: "100%", padding: "10px 10px", display: "flex" }}>
        <div>
          <UploadImage
            files={menu}
            type={UPLOADTYPE_IMAGE.IMAGE}
            isMinimized={true}
          ></UploadImage>
        </div>
        <div>
          <UploadImage
            files={[]}
            type={UPLOADTYPE_IMAGE.IMAGE}
            isMinimized={true}
          ></UploadImage>
        </div>
      </div>
    </div>
  );
}

storiesOf("UploadImage", module).add(nameof(Default), Default);
