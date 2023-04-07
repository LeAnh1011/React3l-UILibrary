import classNames from "classnames";
import React from "react";
import { Model } from "react3l-common";
import "./InpageNavigation.scss";

export interface InpageNavigationProps {
  className?: string;
  list?: Model[];
  title?: string;
  description?: string;
  onChange?: (data?: any) => void;
  render?: (t: Model) => string;
  defaultActiveItem?: Model;
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}
function InpageNavigation(props: InpageNavigationProps) {
  const { className, list, title, description, defaultActiveItem, onChange, render } = props;

  const [activeItem, setActiveItem] = React.useState<Model>(null);

  const handleClickItem = React.useCallback(
    (item) => () => {
      setActiveItem(item);
      if (typeof onChange === "function") {
        onChange(item);
      }
    },
    [onChange]
  );

  React.useEffect(() => {
    if (defaultActiveItem) setActiveItem(defaultActiveItem);
  }, [defaultActiveItem])

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
            <button
              type="button"
              className={classNames("inpage-navigation__item", {
                "inpage-navigation__item-active": activeItem?.id === item?.id,
              })}
              onClick={handleClickItem(item)}
              key={item?.id}
            >
              {render(item)}
            </button>
          ))}
      </div>
    </div>
  );
}
InpageNavigation.defaultProps = {
  render: defaultRenderObject,
};
export default InpageNavigation;
