import {
  ArgsTable, Description,
  Primary, PRIMARY_STORY, Stories, Subtitle, Title
} from "@storybook/addon-docs";
import { Story } from "@storybook/react";
import React from "react";
import { Observable } from "rxjs";
import CroppedModal from "../CroppedModal/CroppedModal";
import { FileModel } from "../../UploadFile/UploadFile";
import UploadAvatar from "./UploadAvatar";

const demoList = {
  url:
    "https://media.discordapp.net/attachments/663753852184428596/847406738138595348/7ab2cd69-80fe-4106-ba8d-218d78b131d4.png",
  isDelete: true,
  name: "demoImage1.png",
  id: 1,
};

export default {
  title: "UploadAvatar",
  component: UploadAvatar,
  subcomponents: { CroppedModal },
  parameters: {
    controls: { expanded: true },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description
            children="Type Avatar, có nhiều kiểu, có viền có khung vuông... hiển thị trên
                      currentAvatar, thêm css vào bằng className"
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
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ]
};



const Template: Story = (args) => {
  const [avatar, setAvatar] = React.useState<string>();

  const demoObservableAvatar = new Observable<FileModel>((observer) => {
    setTimeout(() => {
      observer.next(demoList);
    }, 3000);
  });

  const demoUploadAvatar = (file: File | Blob) => {
    return demoObservableAvatar;
  };

  const handleChangeAvatar = React.useCallback((value) => {
    setAvatar(value?.url);
  }, []);

  return (
    <div style={{ margin: "20px 20px", width: "150px", height: "150px" }}>
      <div style={{ width: "100%", padding: "10px 10px", height: "120px" }}>
        <UploadAvatar
          {...args}
          currentAvatar={avatar}
          className="avatar-css-demo"
          uploadAvatar={demoUploadAvatar}
          updateAvatar={handleChangeAvatar}
        />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
