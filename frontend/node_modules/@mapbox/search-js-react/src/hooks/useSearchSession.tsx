import {
  AddressAutofillOptions,
  AddressAutofillRetrieveResponse,
  AddressAutofillSuggestion,
  AddressAutofillSuggestionResponse,
  AddressAutofillCore,
  SearchBoxCore,
  SearchBoxOptions,
  SearchBoxRetrieveResponse,
  SearchBoxSuggestion,
  SearchBoxSuggestionResponse,
  GeocodingOptions,
  GeocodingFeature,
  GeocodingResponse,
  GeocodingCore,
  SearchSession
} from '@mapbox/search-js-core';
import { useMemo } from 'react';

export type SearchSessionType = SearchSession<
  SearchBoxOptions,
  SearchBoxSuggestion,
  SearchBoxSuggestionResponse,
  SearchBoxRetrieveResponse
>;

export type AddressAutofillSearchSessionType = SearchSession<
  AddressAutofillOptions,
  AddressAutofillSuggestion,
  AddressAutofillSuggestionResponse,
  AddressAutofillRetrieveResponse
>;

export type GeocodingSearchSessionType = SearchSession<
  GeocodingOptions,
  GeocodingFeature,
  GeocodingResponse,
  GeocodingFeature
>;

function useSearchSession(search: SearchBoxCore): SearchSessionType;
function useSearchSession(geocoding: GeocodingCore): GeocodingSearchSessionType;
function useSearchSession(
  autofill: AddressAutofillCore
): AddressAutofillSearchSessionType;

/**
 * A React hook that returns a {@link SearchSession} instance.
 *
 * @param {SearchBoxCore | AddressAutofillCore} search
 * @returns {SearchSession}
 * @see {@link SearchSession}
 */
function useSearchSession(
  search: SearchBoxCore | AddressAutofillCore | GeocodingCore
):
  | SearchSessionType
  | AddressAutofillSearchSessionType
  | GeocodingSearchSessionType {
  const searchSession = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new SearchSession(search as any);
  }, [search]);

  if (search instanceof SearchBoxCore) {
    return searchSession as SearchSessionType;
  } else if (search instanceof GeocodingCore) {
    return searchSession as GeocodingSearchSessionType;
  } else {
    return searchSession as AddressAutofillSearchSessionType;
  }
}

export { useSearchSession };
