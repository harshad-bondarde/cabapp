import { useEffect, useRef } from 'react';
import { Evented } from '@mapbox/search-js-core';

/**
 * A React hook to register an event listener on a Search JS Core Evented object.
 *
 * {@link Evented} is a base class that is inherited by {@link SearchSession}.
 */
export function useEvented<T, K extends keyof T>(
  evented: Evented<T> | null,
  eventName: K,
  cb: (object: T[K]) => unknown
): void {
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });

  useEffect(() => {
    if (!evented) return;

    const fn = (object?: T[K]) => cbRef.current(object);
    evented.addEventListener(eventName, fn);

    return () => {
      evented.removeEventListener(eventName, fn);
    };
  }, [evented, eventName, cbRef]);
}
