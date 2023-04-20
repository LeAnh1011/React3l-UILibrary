import React from "react";
import { FileModel } from "../UploadFile";
import IconLoading from "@Components/IconLoading/IconLoading";
import "./FileLoadingContent.scss";

export interface FileLoadingContentProps {
  /**Pass list file loading */
  loadingFiles?: FileModel[];
  /**Use to custom style the component*/
  className?: string;
}

export default function FileLoadingContent(props: FileLoadingContentProps) {
  const { loadingFiles, className } = props;
  const renderLoadingFile = React.useCallback((file, index) => {
    return (
      <div className="file-loading-container" key={index}>
        <a href={file?.path} download>
          {file?.name}
        </a>
        <IconLoading color="#0F62FE" />
      </div>
    );
  }, []);
  return (
    <div className={className}>
      {loadingFiles?.length > 0 &&
        loadingFiles.map((file, index) => renderLoadingFile(file, index))}
    </div>
  );
}

FileLoadingContent.defaultProps = {
  loadingFiles: [],
};
