import React from "react";
import { FileModel } from "../UploadImage";
import Edit24 from "@carbon/icons-react/es/edit/24";
import TrashCan24 from "@carbon/icons-react/es/trash-can/24";

interface ImageItemProps extends FileModel {}

const ImageItem = (props: ImageItemProps) => {
  const { id, clearAction, handleInput } = props;

  const handleDelete = React.useCallback(() => {
    clearAction(id);
  }, [clearAction, id]);

  return (
    <div
      className="image-item__container"
      style={{ backgroundImage: `url(${props.url})` }}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      {props.isDelete && (
        <div className="image-item__action-block">
          {handleInput !== null && (
            <Edit24 color="white" onClick={handleInput} />
          )}
          {handleDelete !== null && (
            <TrashCan24 color="white" onClick={handleDelete} />
          )}
        </div>
      )}
    </div>
  );
};

export const Menu = (list: ImageItemProps[], handleInput?: (e: any) => void) =>
  list.map((el: ImageItemProps, index) => {
    return <ImageItem key={index} {...el} handleInput={handleInput} />;
  });
