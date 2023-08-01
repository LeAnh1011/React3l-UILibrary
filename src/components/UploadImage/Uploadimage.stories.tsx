import { Camera } from "@carbon/icons-react";
import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs";
import { ComponentMeta, Story } from "@storybook/react";
import React from "react";
import { Observable } from "rxjs";
import UploadImage, { File, FileModel } from "./UploadImage";
import { UPLOADTYPE_IMAGE } from "./../../config/enum";

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

export default {
  title: "UploadImage",
  component: UploadImage,
  parameters: {
    controls: { expanded: true },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Description />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
  argTypes: {},
} as ComponentMeta<typeof UploadImage>;

const Template: Story = (args) => {
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
        Type Avatar, có nhiều kiểu, có viền có khung vuông... hiển thị trên
        currentAvatar, thêm css vào bằng className, sử dụng uploadAvatar và
        updateAvatar riêng
        <UploadImage
          currentAvatar={avatar}
          className="avatar-css-demo"
          type={UPLOADTYPE_IMAGE.AVATAR}
          // sử dụng hàm khác
          uploadAvatar={demoUploadAvatar}
          updateAvatar={handleChangeAvatar}
          icon={<Camera size={32} />}
        />
      </div>
      <div style={{ width: "100%", padding: "10px 10px" }}>
        Loại Thường , multiple false
        <UploadImage
          files={listImage}
          type={UPLOADTYPE_IMAGE.IMAGE}
          isMultiple={false}
          uploadFile={demoUploadListImage}
          updateList={handleChangeListImage}
        />
      </div>
      <div style={{ width: "100%", padding: "10px 10px", display: "flex" }}>
        <div>
          Loại thường, multiple = true, IsMinimized = true,
          <UploadImage
            files={listImage}
            type={UPLOADTYPE_IMAGE.IMAGE}
            isMinimized={true}
            uploadFile={demoUploadListImage}
            updateList={handleChangeListImage}
          />
        </div>
      </div>
      <div style={{ width: "100%", padding: "10px 10px", display: "flex" }}>
        <div>
          Loại thường, multiple = true, IsMinimized = false,
          <UploadImage
            files={listImage}
            type={UPLOADTYPE_IMAGE.IMAGE}
            isMinimized={false}
            uploadFile={demoUploadListImage}
            updateList={handleChangeListImage}
          />
        </div>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
