import {
  ArgsTable, Description,
  Primary, PRIMARY_STORY, Stories, Subtitle, Title
} from "@storybook/addon-docs";
import { Story } from "@storybook/react";
import React from "react";
import { Observable } from "rxjs";
import CroppedModal from "../CroppedModal/CroppedModal";
import { FileModel } from "../../UploadFile/UploadFile";
import UploadImage from "./UploadImage";

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
export default {
  title: "UploadImage",
  component: UploadImage,
  subcomponents: { CroppedModal },
  parameters: {
    controls: { expanded: true },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description
            children="Dùng upload các file ảnh"
          />
          <Primary />
          <Description
            children="Sử dụng CroppedModal để crop ảnh !!!!"
          />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories/>
          
        </>
      ),
    },
  },
};



const Template: Story = (args) => {
  const [listImage, setlistImage] = React.useState<File[]>([]);

  const demoObservableListImage = new Observable<FileModel[]>((observer) => {
    setTimeout(() => {
      observer.next(menu);
    }, 3000);
  });

  const demoUploadListImage = (file: File[] | Blob[]) => {
    return demoObservableListImage;
  };


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
      <UploadImage
          {...args}
          files={listImage}
          uploadFile={demoUploadListImage}
          updateList={handleChangeListImage}
        ></UploadImage>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
