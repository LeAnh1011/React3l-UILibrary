import { Model, ModelFilter, OrderType } from "react3l-common";
import { CommonService } from "services/common-service";
import { Dropdown } from "antd";
import Menu from "antd/lib/menu";
import classNames from "classnames";
import moment, { Moment } from "moment";
import React, { RefObject } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ErrorObserver, forkJoin, Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import Modal from "../Modal/Modal";
import Button from "components/Button";
import { Creator, FileModel, Message } from "./Comment.model";
import "./Comment.scss";
import ContentEditable from "./ContentEditable/ContentEditable";
import IconLoading from "components/IconLoading";

export interface CommentProps<TFilter extends ModelFilter> {
  userInfo: Creator;
  placeholder?: string;
  title?: string;
  titleSave?: string;
  titleCancel?: string;
  discussionId: string;
  isShowHeader: boolean;
  classFilter?: new () => TFilter;
  getMessages?: (TModelFilter?: TFilter) => Observable<Message[]>;
  countMessages?: (TModelFilter?: TFilter) => Observable<number>;
  postMessage?: (Message: Message) => Observable<Message>;
  deleteMessage?: (Message: Message) => Observable<boolean>;
  suggestList?: (filter: TFilter) => Observable<Model[]>;
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

const sortList = [
  { type: "latest", title: "Mới nhất" },
  { type: "oldest", title: "Cũ nhất" },
];

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
    postMessage,
    deleteMessage,
    attachFile,
    suggestList,
    titleCancel,
    titleSave,
    placeholder,
  } = props;

  const [sortType, setSortType] = React.useState<any>({
    type: "latest",
    title: "Mới nhất",
  });

  const [filter, dispatchFilter] = React.useReducer(
    updateFilter,
    {
      discussionId,
      orderType: "ASC",
      classFilter: ClassFilter,
    },
    initFilter
  );

  const [list, dispatchList] = React.useReducer(updateList, []);

  const [countMessage, setCountMessage] = React.useState<number>();

  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const [subscription] = CommonService.useSubscription();

  const [isPreview, setIsPreview] = React.useState<boolean>(false);

  const [imageSrc, setImageSrc] = React.useState<string>();

  const inputFileRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>();

  const contentEditableRef: React.LegacyRef<HTMLDivElement> = React.useRef<HTMLDivElement>();
  const [isLoad, setLoad] = React.useState<boolean>(false);

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

  const handleMenuClick = React.useCallback((e: any) => {
    const sortType = sortList.filter((current) => current.type === e.key)[0];
    setSortType(sortType);
    dispatchFilter({
      action: "ORDER",
      order: sortType.type,
    });
  }, []);

  const handleSend = React.useCallback(() => {
    const message = new Message({
      discussionId: discussionId,
      content: contentEditableRef.current.innerHTML,
      creatorId: userInfo.id,
      creator: userInfo,
      createdAt: moment(),
      isOwner: true,
    });
    if (message.content !== null) {
      setLoad(true);
      postMessage(message)
        .pipe(finalize(() => setLoad(false)))
        .subscribe(
          (res: Message) => {
            dispatchList({
              action: "ADD_SINGLE",
              message: res,
            });
            contentEditableRef.current.innerHTML = "";
            setTimeout(() => {
              bindEventClick();
            }, 200);
            getListMessages();
          },
          (err: ErrorObserver<Error>) => {}
        );
    }
  }, [discussionId, userInfo, postMessage, getListMessages, bindEventClick]);

  const handleCancelSend = React.useCallback(() => {
    contentEditableRef.current.innerHTML = "";
  }, []);

  const popupConfirmDeleteMessage = React.useCallback(
    (message: Message) => (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      const newListMessages = list.map((currentItem, index) => {
        if (currentItem.id === message.id) currentItem.isPopup = true;
        return currentItem;
      });
      dispatchList({
        action: "UPDATE",
        data: newListMessages,
      });
    },
    [list]
  );

  const handleOkDeleteMessage = React.useCallback(
    (message: Message) => (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
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

  const handleCancelDeleteMessage = React.useCallback(
    (message: Message) => (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      const newListMessages = list.map((currentItem) => {
        currentItem.isPopup = false;
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
          },
          (err) => {}
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

  const menuSort = React.useMemo(() => {
    return (
      <Menu onClick={handleMenuClick} selectedKeys={[sortType.type]}>
        {sortList.map((item, index) => {
          return (
            <Menu.Item key={item.type}>{item.title.toUpperCase()}</Menu.Item>
          );
        })}
      </Menu>
    );
  }, [handleMenuClick, sortType]);

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
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
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
              sendValue={handleSend}
              loading={isLoad}
              placeholder={placeholder}
              inputFileRef={inputFileRef}
              handleAttachFile={handleAttachFile}
            />
            <div className="content-button">
              <Button type="primary" className="btn--sm" onClick={handleSend}>
                {titleSave}
              </Button>
              <Button
                type="secondary"
                className="btn--sm"
                onClick={handleCancelSend}
              >
                {titleCancel}
              </Button>
            </div>
          </div>
        </div>
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
};

export default Comment;
