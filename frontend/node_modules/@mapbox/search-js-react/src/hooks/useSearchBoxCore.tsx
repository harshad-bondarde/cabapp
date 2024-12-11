import { useEffect, useMemo } from 'react';
import { SearchBoxCore, SearchBoxOptions } from '@mapbox/search-js-core';

const DEFAULTS = SearchBoxCore.defaults;

/**
 * A React hook that returns a {@link SearchBoxCore} instance.
 *
 * @param {SearchBoxOptions} options
 * @param {string} options.accessToken Your Mapbox access token.
 * @see {@link SearchBoxCore}
 * @example
 * ```typescript
 * import { useSearchBoxCore } from '@mapbox/search-js-react';
 * const searchBoxCore = useSearchBoxCore({ accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN' });
 * const response = await searchBoxCore.suggest('1600 pennsylvania ave nw', {
 *   sessionToken: 'test-123'
 * });
 * console.log(response);
 * // { suggestions: [...], attribution: '...', url: '...' };
 * ```
 */
export function useSearchBoxCore(
  options: Partial<{ accessToken: string } & SearchBoxOptions>
): SearchBoxCore {
  const search = useMemo(() => {
    return new SearchBoxCore();
  }, []);

  useEffect(() => {
    const { accessToken, ...restOptions } = options;
    search.accessToken = accessToken;
    search.defaults = {
      ...DEFAULTS,
      ...restOptions
    };
  }, [options]);

  return search;
}
