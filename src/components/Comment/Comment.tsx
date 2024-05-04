import { Model, ModelFilter, OrderType } from "react3l-common";
import { CommonService } from "@Services/common-service";
import classNames from "classnames";
import moment, { Moment } from "moment";
import React, { RefObject } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ErrorObserver, forkJoin, Observable, finalize } from "rxjs";
import Modal from "../Modal/NormalModal/Modal";
import Button from "@Components/Button";
import { Creator, FileModel, Message } from "./Comment.model";
import ContentEditable from "./ContentEditable/ContentEditable";
import IconLoading from "@Components/IconLoading";
import { Popconfirm } from "antd";
import "./Comment.scss";

export interface CommentProps<TFilter extends ModelFilter> {
  /**Creator of comment*/
  userInfo: Creator;
  /**Option to prevent comment submission*/
  canSend?: boolean;
  /**Placeholder of input comment*/
  placeholder?: string;
  /**Title above of comment component*/
  title?: string;
  /**Title of button save comment*/
  titleSave?: string;
  /**Title of button cancel comment*/
  titleCancel?: string;
  /**Id of this discussion*/
  discussionId: string;
  /**Set true to show the title of comment component*/
  isShowHeader: boolean;
  /**ModelFilter of param of API use for get list comment*/
  classFilter?: new () => TFilter;
  /**API get list of comment/chat*/
  getMessages?: (TModelFilter?: TFilter) => Observable<Message[]>;
  /**API get quantity of comment/chat*/
  countMessages?: (TModelFilter?: TFilter) => Observable<number>;
  /**API to submit new comment/chat*/
  postMessage?: (Message: Message) => Observable<Message>;
  /**API for edit a comment existed*/
  updateMessage?: (Message: Message) => Observable<Message>;
  /**Boolean attribute to control editable comment existed*/
  canEditMessage?: boolean;
  /**API use when you what to delete a comment*/
  deleteMessage?: (Message: Message) => Observable<boolean>;
  /**API show list suggest of user when you enter @ and want to tag someone to this comment*/
  suggestList?: (filter: TFilter) => Observable<Model[]>;
  /**API call when you want to save file to server and save it to this comment*/
  attachFile?: (File: File) => Observable<FileModel>;
}

export interface filterAction {
  action: string;
  order?: string;
  skip?: number;
  take?: number;
  data?: ModelFilter;
  discussionId?: string;
}

export interface listAction {
  action: string;
  data?: Message[];
  message?: Message;
}

const loading = <IconLoading color="#0F62FE" size={24} />;

function formatDateTime(
  time: Moment,
  dateTimeFormat: string = "DD-MM-YYYY HH:mm:ss"
) {
  if (!time) return null;
  if (typeof time === "object" && "format" in time) {
    return time.format(dateTimeFormat);
  }
  return moment(time).format(dateTimeFormat);
}

function initFilter(initialValue: any) {
  const { discussionId, order, classFilter } = initialValue;

  const filter = classFilter ? new classFilter() : new ModelFilter();
  return {
    ...filter,
    discussionId: {
      equal: discussionId,
    },
    order,
  };
}

function updateFilter(
  state: ModelFilter,
  filterAction: filterAction
): ModelFilter {
  switch (filterAction.action) {
    case "RESET":
      return {
        ...filterAction.data,
        discussionId: {
          equal: filterAction.discussionId,
        },
        orderType: OrderType.ASC,
      };

    case "LOAD_MORE":
      return {
        ...state,
        skip: filterAction.skip,
        take: filterAction.take,
      };

    case "ORDER":
      return {
        ...state,
        order: filterAction.order,
        skip: 0,
        take: 10,
      };
  }
}

function updateList(state: Message[], listAction: listAction) {
  switch (listAction.action) {
    case "UPDATE":
      return [...listAction.data];
    case "CONCAT":
      const listIDs = new Set(state.map(({ id }) => id));
      const combined = [
        ...state,
        ...listAction.data.filter(({ id }) => !listIDs.has(id)),
      ];
      return combined;
    case "ADD_SINGLE":
      return [listAction.message, ...state];

    case "UPDATE_SINGLE":
      const newState = state.map((item) => {
        if (listAction.message.id === item.id) {
          return {
            ...item,
            content: listAction.message.content,
          };
        }
        return item;
      });
      return [...newState];
  }
}

function Comment(props: CommentProps<ModelFilter>) {
  const {
    title,
    userInfo,
    discussionId,
    isShowHeader,
    classFilter: ClassFilter,
    getMessages,
    countMessages,
    updateMessage,
    postMessage,
    deleteMessage,
    canEditMessage,
    attachFile,
    suggestList,
    titleCancel,
    titleSave,
    placeholder,
    canSend,
  } = props;

  const [filter, dispatchFilter] = React.useReducer(
    updateFilter,
    {
      discussionId,
      orderType: "ASC",
      classFilter: ClassFilter,
    },
    initFilter
  );

  const [messageCurrentEdit, setMessageCurrentEdit] = React.useState<Message>(
    new Message()
  );

  const [list, dispatchList] = React.useReducer(updateList, []);

  const [showButton, setShowButton] = React.useState<boolean>(false);

  const [countMessage, setCountMessage] = React.useState<number>();

  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const [subscription] = CommonService.useSubscription();

  const [isPreview, setIsPreview] = React.useState<boolean>(false);

  const [imageSrc, setImageSrc] = React.useState<string>();

  const inputFileRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>();

  const contentEditableRef: React.LegacyRef<HTMLDivElement> = React.useRef<HTMLDivElement>();
  const [isLoad, setLoad] = React.useState<boolean>(false);
  const elementContainer = document.getElementById("container-message");
  const elementContent = document.getElementById("content-message");
  if (elementContent && elementContainer) {
    elementContent.addEventListener("focus", () => {
      setShowButton(true);
    });
    elementContainer.addEventListener("focusout", () => {
      if (
        contentEditableRef?.current?.innerHTML === "" ||
        !contentEditableRef?.current?.innerHTML
      ) {
        setShowButton(false);
      }
    });
  }

  const handleClosePreview = React.useCallback(() => {
    setIsPreview(false);
  }, []);

  const handleOpenPreview = React.useCallback((event: any) => {
    const imgSrc = event.target.currentSrc;
    setImageSrc(imgSrc);
    setIsPreview(true);
  }, []);

  const bindEventClick = React.useCallback(() => {
    const imageElements = document.getElementsByName("previewImage");
    const nodes = Array.prototype.slice.call(imageElements, 0);
    if (nodes) {
      [...nodes].forEach((current: Node) => {
        current.addEventListener("click", handleOpenPreview);
      });
    }
  }, [handleOpenPreview]);

  const handleMouseLeave = React.useCallback(() => {
    if (list && list.length > 0) {
      const existPopup = list.filter((currentItem) => {
        return currentItem.isPopup;
      });
      if (existPopup.length > 0) {
        const newListMessages = list.map((currentItem) => {
          currentItem.isPopup = false;
          return currentItem;
        });
        dispatchList({
          action: "UPDATE",
          data: newListMessages,
        });
      } else return;
    }
  }, [list]);

  const getListMessages = React.useCallback(() => {
    const newFilter = { ...filter };
    newFilter.discussionId.equal = discussionId;
    if (typeof filter.orderType === "undefined") {
      filter.orderType = OrderType.ASC;
    }
    if (getMessages && countMessages) {
      return forkJoin([getMessages(filter), countMessages(filter)]).subscribe(
        ([list, total]: [Message[], number]) => {
          if (list && total) {
            if (filter.skip > 0) {
              dispatchList({
                action: "CONCAT",
                data: list.reverse(),
              });
            } else {
              dispatchList({
                action: "UPDATE",
                data: list.reverse(),
              });
            }
            setTimeout(() => {
              bindEventClick();
            }, 200);
            setCountMessage(total);
          }
        }
      );
    }
    return;
  }, [filter, discussionId, getMessages, countMessages, bindEventClick]);

  const handleUpdateMessage = React.useCallback(() => {
    const message: Message = {
      ...messageCurrentEdit,
      content: contentEditableRef.current.innerHTML,
    };
    if (message.content !== null) {
      setLoad(true);
      updateMessage(message)
        .pipe(finalize(() => setLoad(false)))
        .subscribe(
          (res: Message) => {
            dispatchList({
              action: "UPDATE_SINGLE",
              message: res,
            });
            setMessageCurrentEdit({ ...new Message() });
            contentEditableRef.current.innerHTML = "";
            setTimeout(() => {
              bindEventClick();
            }, 200);
            getListMessages();
          },
          (err: ErrorObserver<Error>) => {}
        );
    }
  }, [messageCurrentEdit, updateMessage, getListMessages, bindEventClick]);

  const handleCreateMessage = React.useCallback(() => {
    const message = new Message({
      discussionId: discussionId,
      content: contentEditableRef.current.innerHTML,
    });
    if (message.content !== null) {
      setLoad(true);
      postMessage(message)
        .pipe(finalize(() => setLoad(false)))
        .subscribe((res: Message) => {
          dispatchList({
            action: "ADD_SINGLE",
            message: res,
          });
          contentEditableRef.current.innerHTML = "";
          setTimeout(() => {
            bindEventClick();
          }, 200);
          getListMessages();
        });
    }
  }, [discussionId, postMessage, getListMessages, bindEventClick]);

  const handleSendMessage = React.useCallback(() => {
    if (messageCurrentEdit.id) {
      handleUpdateMessage();
    } else {
      handleCreateMessage();
    }
  }, [handleCreateMessage, handleUpdateMessage, messageCurrentEdit.id]);

  const handleCancelSend = React.useCallback(() => {
    setShowButton(false);
    contentEditableRef.current.innerHTML = "";
    if (messageCurrentEdit.id) {
      setMessageCurrentEdit({ ...new Message() });
    }
  }, [messageCurrentEdit.id]);

  const handleOkDeleteMessage = React.useCallback(
    (message: Message) => {
      const deleteSub = deleteMessage(message).subscribe((res: boolean) => {
        if (res) {
          const newListMessages = list.filter((currentItem) => {
            return currentItem.id !== message.id;
          });
          dispatchList({
            action: "UPDATE",
            data: newListMessages,
          });
        }
      });
      subscription.add(deleteSub);
    },
    [deleteMessage, subscription, list]
  );

  const handleEditMessage = React.useCallback((message: Message) => {
    setMessageCurrentEdit({ ...message });
    contentEditableRef.current.innerHTML = message.content;
  }, []);

  const handleCancelDeleteMessage = React.useCallback(
    (message: Message) => {
      const newListMessages = list.map((currentItem) => {
        return currentItem;
      });
      dispatchList({
        action: "UPDATE",
        data: newListMessages,
      });
    },
    [list]
  );

  const handleInfiniteLoad = React.useCallback(() => {
    if (countMessage > list.length) {
      dispatchFilter({
        action: "LOAD_MORE",
        skip: filter.skip + 10,
        take: filter.take,
      });
    } else {
      setHasMore(false);
    }
  }, [countMessage, list, filter]);

  const setEndContentEditable = React.useCallback(() => {
    var range, selection;
    if (document.createRange) {
      range = document.createRange();
      range.setStart(
        contentEditableRef.current,
        contentEditableRef.current.childNodes.length
      );
      range.collapse(true);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  const handleAttachFile = React.useCallback(
    (selectorFiles: FileList) => {
      if (attachFile && typeof attachFile === "function") {
        const fileValue = selectorFiles[0];
        inputFileRef.current.value = null;
        const fileSubcription = attachFile(fileValue).subscribe(
          (res: FileModel) => {
            if (res) {
              var hrefItem;
              const fileType = fileValue.type.split("/")[0];
              if (fileType === "image") {
                hrefItem = `<image src="${res.path}" alt="IMG" name="previewImage">`;
              } else {
                hrefItem = `<a href="${res.path}" target="_blank">${res.name}</a>`;
              }
              contentEditableRef.current.innerHTML += hrefItem;
              setEndContentEditable();
            }
          }
        );
        subscription.add(fileSubcription);
      }
    },
    [attachFile, subscription, setEndContentEditable]
  );

  const shortcutName = React.useCallback((name: string) => {
    return name.toUpperCase().substring(0, 1);
  }, []);

  React.useEffect(() => {
    if (discussionId) {
      const subcription = getListMessages();
      return () => {
        subcription.unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discussionId]);

  return (
    <>
      <div className="comment__container">
        {isShowHeader && (
          <div className="comment__header">
            <div className="comment__title">
              <span>{title}</span>
            </div>
          </div>
        )}
        <div className="comment__body" id="scrollableDiv">
          <InfiniteScroll
            dataLength={list.length}
            next={handleInfiniteLoad}
            style={{ display: "flex", flexDirection: "column-reverse" }}
            inverse={true}
            hasMore={hasMore}
            loader={loading && list.length > 5}
            scrollableTarget="scrollableDiv"
          >
            {list.map((currentItem, index) => {
              return (
                <div
                  key={index}
                  onMouseLeave={handleMouseLeave}
                  className={classNames("comment__content d-flex")}
                >
                  <div className="img-cont-msg">
                    {currentItem.creator.avatar ? (
                      <img
                        src={currentItem.creator?.avatar}
                        className="rounded-circle user_img_msg"
                        alt="IMG"
                      />
                    ) : (
                      <div className="rounded-circle user_div">
                        {shortcutName(currentItem.creator.displayName)}
                      </div>
                    )}
                  </div>
                  <div className={classNames("msg-container")}>
                    <div className="msg-creator-name">
                      {currentItem.creator.displayName}
                      <span className="msg-time">
                        {formatDateTime(currentItem.createdAt)}
                      </span>
                    </div>
                    <div
                      className="msg-content"
                      dangerouslySetInnerHTML={{ __html: currentItem.content }}
                    />
                    {currentItem.creatorId === userInfo.id && (
                      <div className="action-owner-message">
                        {canEditMessage && (
                          <Button
                            type="link"
                            onClick={() => handleEditMessage(currentItem)}
                          >
                            {"Sửa"}
                          </Button>
                        )}
                        <Popconfirm
                          placement="leftTop"
                          title={"Bạn có chắc chắn muốn xóa?"}
                          onConfirm={() => handleOkDeleteMessage(currentItem)}
                          onCancel={() =>
                            handleCancelDeleteMessage(currentItem)
                          }
                          okText="Xóa"
                          cancelText="Hủy"
                          okType="danger"
                        >
                          <Button type="link">{"Xóa"}</Button>
                        </Popconfirm>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
        {canSend && (
          <div className="comment__footer">
            <div className="img-cont-msg">
              {userInfo.avatar ? (
                <img
                  src={userInfo?.avatar}
                  className="rounded-circle user_img_msg"
                  alt="IMG"
                />
              ) : (
                <div className="rounded-circle user_div">
                  {shortcutName(userInfo.displayName)}
                </div>
              )}
            </div>

            <div className="w-100">
              <ContentEditable
                ref={contentEditableRef}
                suggestList={suggestList}
                sendValue={handleSendMessage}
                loading={isLoad}
                placeholder={placeholder}
                inputFileRef={inputFileRef}
                handleAttachFile={handleAttachFile}
                showButton={showButton}
              />
              {showButton && (
                <div className="content-button">
                  <Button
                    type="primary"
                    className="btn--md"
                    onClick={() => {
                      handleSendMessage();
                      setShowButton(false);
                    }}
                  >
                    {titleSave}
                  </Button>
                  <Button
                    type="secondary"
                    className="btn--md"
                    onClick={handleCancelSend}
                  >
                    {titleCancel}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Modal
        visible={isPreview}
        width={800}
        visibleFooter={false}
        closable={true}
        handleCancel={handleClosePreview}
      >
        <div className="preview-image__container">
          <img alt="img" src={imageSrc}></img>
        </div>
      </Modal>
    </>
  );
}

Comment.defaultProps = {
  isShowHeader: false,
  placeholder: "Nhập bình luận...",
  titleSave: "Lưu",
  titleCancel: "Hủy",
  title: "Bình luận",
  canSend: true,
  canEditMessage: true,
};

export default Comment;
