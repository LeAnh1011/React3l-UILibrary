import React, { RefObject } from "react";
import { Subscription } from "rxjs";
import moment, { Moment } from "moment";
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
  useClickOutside(ref: RefObject<any>, callback: () => void) {
    const handleClickOutside = React.useCallback(
      (event) => {
        if (ref?.current && !ref?.current?.contains(event.target)) {
          if (typeof callback === "function") {
            callback();
          }
        }
      },
      [callback, ref]
    );

    React.useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return function cleanup() {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [callback, handleClickOutside, ref]);
  },

  toMomentDate(date: string): Moment {
    return moment(date);
  },

  isEmpty(obj: any) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  },

  limitWord(input: string, max: number) {
    if (input?.length > max) {
      input = input.slice(0, max);
      const output: string = input + "...";
      return output;
    }
    return input;
  },

  useStateCallback(initialState: any) {
    const [state, setState] = React.useState(initialState);
    const cbRef = React.useRef(null);

    const setStateCallback = React.useCallback((state, cb) => {
      cbRef.current = cb;
      setState(state);
    }, []);

    React.useEffect(() => {
      if (cbRef.current) {
        cbRef.current(state);
        cbRef.current = null;
      }
    }, [state]);

    return [state, setStateCallback];
  },

  uniqueArray(array: any[]) {
    return array.reduce((acc, current) => {
      const x = acc.find((item: { id: any }) => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
  },

  arrayMove(arr: any[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  },
};
