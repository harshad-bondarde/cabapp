import { useMemo, useRef } from 'react';

import {
  AddressConfirmOptions,
  AddressConfirmShowResult,
  confirmAddress
} from '@mapbox/search-js-web';

interface UseConfirmAddressObject {
  formRef: React.RefObject<HTMLFormElement>;
  showConfirm: (
    options?: Partial<AddressConfirmOptions>
  ) => Promise<AddressConfirmShowResult>;
}

/**
 * A React hook that returns a form ref and a function to show the address confirmation modal
 *
 * @param {AddressConfirmOptions} optionsArg
 * @see {@link confirmAddress}
 * @example
 * ```typescript
 * import { useConfirmAddress } from '@mapbox/search-js-react';
 *
 * export function Autofill(): React.ReactElement {
 *   const { formRef, showConfirm } = useConfirmAddress({
 *     footer: 'My custom footer'
 *   });
 *
 *   const handleSubmit = React.useCallback(async () => {
 *     const result = await showConfirm();
 *      console.log(result);
 *   }, [showConfirm]);
 *
 *   return (
 *     <div>
 *       <form
 *         ref={formRef}
 *         style={{ display: 'flex', flexDirection: 'column', marginTop: 30 }}
 *       >
 *         <AddressAutofill
 *           ...
 *         >
 *     </div>
 *   );
 * }
 * ```
 */
export function useConfirmAddress(
  optionsArg: AddressConfirmOptions = {}
): UseConfirmAddressObject {
  const formRef = useRef<HTMLFormElement>(null);
  return useMemo(() => {
    return {
      formRef,
      showConfirm: () => confirmAddress(formRef.current, optionsArg)
    };
  }, [formRef, optionsArg]);
}
