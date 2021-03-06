/* global: require*/
import { TranslatorContext, Storage } from 'react-jhipster';

import { setLocale } from '../reducers/locale';

const mergeTranslations = requireContext => requireContext.keys().reduce(
  (merged, key) => ({ ...merged, ...requireContext(key) }),
  {}
);

// tslint:disable:object-literal-key-quotes
const translations = {
   'pt-br': mergeTranslations(require.context('../../i18n/pt-br', false, /.json$/))
};
// tslint:enable

let currentLocale;
const savedLocale = Storage.local.get('locale', 'pt-br');
TranslatorContext.setDefaultLocale('pt-br');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const locales = Object.keys(translations);

export const registerLocales = store => {
  locales.forEach(key => {
    TranslatorContext.registerTranslations(key, translations[key]);
  });
  store.subscribe(() => {
    const previousLocale = currentLocale;
    currentLocale = store.getState().locale.currentLocale;
    if (previousLocale !== currentLocale) {
      Storage.local.set('locale', currentLocale);
      TranslatorContext.setLocale(currentLocale);
    }
  });
  store.dispatch(setLocale(savedLocale));
  return savedLocale;
};
