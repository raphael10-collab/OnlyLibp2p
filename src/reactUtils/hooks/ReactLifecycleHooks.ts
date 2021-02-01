// https://github.com/burtonator/polar-bookshelf/blob/master/web/js/hooks/ReactLifecycleHooks.ts

import { useEffect } from 'react';
import {AsyncOptions, useAsync} from 'react-async';
import { NULL_FUNCTION } from "polar-shared/src/util/Functions";

// https://dev.to/trentyang/replace-lifecycle-with-hooks-in-react-3d4n

export function useComponentDidMount(delegate: () => void) {
  useEffect(
    () => delegate()
  , []);
}

export function useComponentWillUnmount(delegate: () => void) {
  useEffect(
    () => delegate
  , []);
}

export function useAsyncWithError<T>(opts: AsyncOptions<T>) {

  const {data, error} = useAsync(opts);

  if (error) {
    console.log("An error occured: ", error.message);
  }
  return data;
}
