import React from "react";
import { FileModel } from "../UploadImage";
import { Edit32, TrashCan32 } from "@carbon/icons-react";

interface ImageItemProps extends FileModel {}

const ImageItem = (props: ImageItemProps) => {
  const { id, clearAction, handleInput } = props;

  const handleDelete = React.useCallback(() => {
    clearAction(id);
  }, [clearAction, id]);

  return (
    <div
      className="image-item__container"
      style={{ backgroundImage: `url(${props.path})` }}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      {props.isDelete && (
        <div className="image-item__action-block">
          {handleInput !== null && <Edit32 onClick={handleInput} />}
          {handleDelete !== null && <TrashCan32 onClick={handleDelete} />}
        </div>
      )}
    </div>
  );
};

export const Menu = (list: ImageItemProps[], handleInput?: (e: any) => void) =>
  list.map((el: ImageItemProps, index) => {
    return <ImageItem key={index} {...el} handleInput={handleInput} />;
  });
