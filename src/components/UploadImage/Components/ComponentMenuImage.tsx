import deleteImage from "./../../../../../assets/images/upload-file/delete.svg";
import editImage from "./../../../../../assets/images/upload-file/edit.svg";
import React from "react";
import { FileModel } from "../UploadImage";

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
          {handleInput !== null && (
            <img src={editImage} alt="icon" onClick={handleInput}></img>
          )}
          {handleDelete !== null && (
            <img src={deleteImage} alt="icon" onClick={handleDelete}></img>
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
