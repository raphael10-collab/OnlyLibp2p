// https://github.com/burtonator/polar-bookshelf/blob/master/web/js/react/ReactUtils.tsx

import React from 'react';
import isEqual from 'react-fast-compare';
import {DeepEquals} from "./DeepEquals";
import debugIsEqual = DeepEquals.debugIsEqual;

// React.memo and React.forwardRef all in one function with deep isEqual support for ease of use.

export function memoForwardRef<E, P>(component: React.ForwardRefRenderFunction<E, P>) {
  return React.memo(React.forwardRef<E, P>((props: P, ref) => component(props, ref)), isEqual);
}

export function memoForwardRefDiv<P>(component: React.ForwardRefRenderFunction<HTMLDivElement, P>) {
  return React.memo(React.forwardRef<HTMLDivElement, P>((props: P, ref) => component(props, ref)), isEqual);
}

interface IDeepMemoOpts {

  // Enable debug if isEqual when the props change.
  
  readonly debug?: boolean;

}

/**
 *
 * @param component The component to render
 * @param opts The opts for rendering the component
 */

export function deepMemo<T extends React.ComponentType<any>>(component: T, opts: IDeepMemoOpts = {}) {

  const equalFunc = opts.debug ? debugIsEqual : isEqual;

  // https://github.com/FormidableLabs/react-fast-compare#usage
  // re-render the expensive component
  // only when the props have deeply changed

  return React.memo(component, equalFunc);

}
