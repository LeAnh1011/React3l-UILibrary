import React from "react";
import { Subscription } from "rxjs";

export const CommonService = {
  useSubscription() {
    var subscription = React.useRef(new Subscription()).current;
    React.useEffect(
      function () {
        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [subscription]
    );
    return [subscription];
  },
};
