import { useEffect, useMemo } from 'react';
import {
  AddressAutofillOptions,
  AddressAutofillCore
} from '@mapbox/search-js-core';

const DEFAULTS = AddressAutofillCore.defaults;

/**
 * A React hook that returns a {@link AddressAutofillCore} instance.
 *
 * @param {AddressAutofillOptions} options
 * @param {string} options.accessToken Your Mapbox access token.
 * @see {@link AddressAutofillCore}
 * @example
 * ```typescript
 * import { useAddressAutofillCore } from '../src';
 * const autofill = useAddressAutofillCore({ accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN' });
 * const response = await autofill.suggest('1600 pennsylvania ave nw', {
 *   sessionToken: 'test-123'
 * });
 * console.log(response);
 * // { suggestions: [...], attribution: '...' };
 * ```
 * @see {@link AddressAutofillCore}
 */
export function useAddressAutofillCore(
  options: Partial<{ accessToken: string } & AddressAutofillOptions>
): AddressAutofillCore {
  const autofill = useMemo(() => {
    return new AddressAutofillCore();
  }, []);

  useEffect(() => {
    const { accessToken, ...restOptions } = options;
    autofill.accessToken = accessToken;
    autofill.defaults = {
      ...DEFAULTS,
      ...restOptions
    };
  }, [options]);

  return autofill;
}
