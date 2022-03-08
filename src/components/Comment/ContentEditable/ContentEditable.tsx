import { StringFilter } from "react3l-advanced-filters";
import { ModelFilter, Model } from "react3l-common";
import { ASSETS_IMAGE } from "config/consts";
import React, { forwardRef, MutableRefObject } from "react";
import { Observable } from "rxjs";
import "./ContentEditable.scss";

export interface contentAction {
  action: string;
  data: string;
}

function updateContent(state: string, contentAction: contentAction) {
  switch (contentAction.action) {
    case "UPDATE":
      return contentAction.data;
    default:
      return state;
  }
}

export interface ContentEditableProps<TFilter extends ModelFilter> {
  suggestList?: (filter: TFilter) => Observable<Model[]>;
  sendValue?: () => void;
  loading?: boolean;
}

const ContentEditable = forwardRef<
  HTMLDivElement,
  ContentEditableProps<ModelFilter>
>(
  (
    props: ContentEditableProps<ModelFilter>,
    contentEditableRef: MutableRefObject<HTMLDivElement | null>
  ) => {
    const { suggestList, sendValue, loading } = props;

    const [userList, setUserList] = React.useState([]);

    const [showSuggestList, setShowSuggestList] = React.useState<boolean>(
      false
    );

    const [contentEditable, dispatchContentEditable] = React.useReducer(
      updateContent,
      ""
    );

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
    }, [contentEditableRef]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Backspace") {
          var s = window.getSelection();
          var r = s.getRangeAt(0);
          var el = r.startContainer.parentElement;
          if (el.classList.contains("hightlight__text")) {
            if (
              r.startOffset === r.endOffset &&
              r.endOffset === el.textContent.length
            ) {
              event.preventDefault();
              el.remove();
            }
          }

          if (
            contentEditableRef.current.innerHTML.includes(
              '<span class="mention-tag">@</span>'
            )
          ) {
            var lastChild = contentEditableRef.current.lastElementChild;
            contentEditableRef.current.removeChild(lastChild);
            setShowSuggestList(false);
            setEndContentEditable();
          }

          return;
        }

        if (event.key === "@") {
          document.execCommand(
            "insertHTML",
            false,
            '<span class="mention-tag">@</span>'
          );
          setShowSuggestList(true);
          event.preventDefault();
          return;
        }

        if (event.key === " " && showSuggestList) {
          var lastElementChild = contentEditableRef.current.lastElementChild;
          var contentText = lastElementChild.textContent;
          contentEditableRef.current.removeChild(lastElementChild);
          contentEditableRef.current.innerHTML += contentText;
          setEndContentEditable();
          setShowSuggestList(false);
          return;
        }

        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          event.stopPropagation();
          if (!loading) sendValue();
          return;
        }
      },
      [
        showSuggestList,
        contentEditableRef,
        setEndContentEditable,
        loading,
        sendValue,
      ]
    );

    const handleKeyUp = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" && event.shiftKey) {
          if (showSuggestList) {
            var lastElementChild = contentEditableRef.current.lastElementChild;
            var contentText = lastElementChild.textContent;
            contentEditableRef.current.removeChild(lastElementChild);
            contentEditableRef.current.innerHTML += contentText;
            setShowSuggestList(false);
          }
          contentEditableRef.current.innerHTML =
            contentEditableRef.current.innerHTML.trim() + "<br><br>";
          setEndContentEditable();
          return;
        }
      },
      [showSuggestList, setEndContentEditable, contentEditableRef]
    );

    const handlePaste = React.useCallback(
      (event: React.ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        const text = event.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
      },
      []
    );

    const handleInput = React.useCallback(
      (event: React.FormEvent<HTMLDivElement>): void => {
        if (
          contentEditableRef.current.innerText.includes("@") &&
          showSuggestList
        ) {
          const stringValue = contentEditableRef.current.innerText.split(
            "@"
          )[1];
          dispatchContentEditable({
            action: "UPDATE",
            data: stringValue,
          });
          return;
        }
        if (
          !contentEditableRef.current.innerText ||
          contentEditableRef.current.innerHTML
        ) {
          setShowSuggestList(false);
        }
      },
      [showSuggestList, contentEditableRef]
    );

    const selectUser = React.useCallback(
      (currentUser) => (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setShowSuggestList(false);
        const contentValue = contentEditableRef.current.innerHTML.split(
          '<span class="mention-tag">'
        );
        contentEditableRef.current.innerHTML =
          contentValue[0] +
          '<span class="hightlight__text">' +
          currentUser.displayName +
          "</span> ";
        setEndContentEditable();
      },
      [setEndContentEditable, contentEditableRef]
    );

    React.useEffect(() => {
      if (contentEditable && typeof suggestList === "function") {
        const filter = new ModelFilter();
        filter.name = new StringFilter({ contain: contentEditable });
        const subcription = suggestList(filter).subscribe((res) => {
          if (res) {
            setUserList(res);
          }
        });

        return () => {
          subcription.unsubscribe();
        };
      }
    }, [contentEditable, suggestList]);

    return (
      <>
        <div className="content-editable__container">
          <div
            className="content-editable__comment"
            ref={contentEditableRef}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onPaste={handlePaste}
            contentEditable={true}
            placeholder="Nhập bình luận..."
          ></div>
          {showSuggestList && (
            <div className="content-editable__suggest-list">
              {userList.length > 0 ? (
                <ul className="list-group">
                  {userList.map((currentUser, index) => {
                    return (
                      <li
                        key={index}
                        className="list-group-item"
                        onClick={selectUser(currentUser)}
                      >
                        {currentUser?.displayName}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <img
                  className="img-emty"
                  src={ASSETS_IMAGE + "/no-data.png"}
                  alt=""
                />
              )}
            </div>
          )}
        </div>
      </>
    );
  }
);

export default ContentEditable;
