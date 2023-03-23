import classNames from "classnames";
import React from "react";
import { Model } from "react3l-common";
import "./InpageNavigation.scss";

export interface InpageNavigationProps {
  className?: string;
  list?: Model[];
  countCharacters?: number;
  title?: string;
  description?: string;
  onChange?: (data?: any) => void;
}

function InpageNavigation(props: InpageNavigationProps) {
  const { className, list, title, description, onChange } = props;

  const [activeItem, setActiveItem] = React.useState<Model>(null);

  const handleClickItem = React.useCallback(
    (item) => () => {
      setActiveItem(item);
      if(typeof onChange === 'function') {
        onChange(item)
      }
    },
    [onChange]
  );
  return (
    <div className={classNames(className, "inpage-navigation-container")}>
      <div className="inpage-navigation__content">
        <div className="inpage-navigation__title">{title}</div>
        <div className="inpage-navigation__description">{description}</div>
      </div>

      <div className="inpage-navigation__wrapper">
        {list &&
          list?.length > 0 &&
          list.map((item) => (
            <div
              className={classNames("inpage-navigation__item", {
                "inpage-navigation__item-active": activeItem?.id === item?.id,
              })}
              onClick={handleClickItem(item)}
              tabIndex={0}
            >
              {item?.name}
            </div>
          ))}
      </div>
    </div>
  );
}
InpageNavigation.defaultProps = {};
export default InpageNavigation;
