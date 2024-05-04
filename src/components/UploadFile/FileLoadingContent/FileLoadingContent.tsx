import React from "react";
import { FileModel } from "../UploadFile";
import IconLoading from "@Components/IconLoading/IconLoading";
import "./FileLoadingContent.scss";

export interface FileLoadingContentProps {
  /**Pass file loading */
  file?: FileModel;
  /**Use to custom style the component*/
  className?: string;
}

export default function FileLoadingContent(props: FileLoadingContentProps) {
  const { file, className } = props;
  const renderLoadingFile = React.useCallback((file) => {
    return (
      <div className="file-loading-container" key={file?.id}>
        <a href={file?.path} download>
          {file?.name}
        </a>
        <IconLoading color="#0F62FE" />
      </div>
    );
  }, []);
  return <div className={className}>{renderLoadingFile(file)}</div>;
}

FileLoadingContent.defaultProps = {
  loadingFiles: [],
};
