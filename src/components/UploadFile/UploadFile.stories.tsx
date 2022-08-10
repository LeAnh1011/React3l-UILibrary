import { User20 } from "@carbon/icons-react";
import { Story } from "@storybook/react";
import React from "react";
import { Model } from "react3l-common";
import { Observable } from "rxjs";
import UploadFile, { FileModel } from "./UploadFile";

const demoList = [
  {
    path:
      "https://cdn.searchenginejournal.com/wp-content/uploads/2022/04/reverse-image-search-627b7e49986b0-sej-760x400.png",
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
    errors: {
      name: "file này đang có vấn đề",
    },
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
  public files?: FileModel[];
}

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'UploadFile',
  component: UploadFile,
  parameters: {
    controls: { expanded: true },
  }
  
};

const Template: Story = (args) => {
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
    {...args}
      files={model?.files || []}
      uploadFile={demoUploadFile}
      updateList={handleUpdateList}
      removeFile={handleRemoveFile}
      icon={<User20/>}
    ></UploadFile>
    
  );
}

export const Default = Template.bind({});

Default.agrs = {
  type: "button"
}
