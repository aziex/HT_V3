import i18n, { InitOptions } from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { version } from '../package.json';

const allowedLanguages = ['en', 'ms'];

const defaultLng = 'ms';
let lng = defaultLng;

const storageLanguage = localStorage.getItem('language');
if (
  storageLanguage &&
  allowedLanguages.indexOf(storageLanguage) > -1 &&
  storageLanguage
) {
  lng = storageLanguage;
}

const i18nOptions: InitOptions = {
  fallbackLng: 'en',
  lng,
  debug: false,
  // whitelist: Languages,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    skipOnVariables: false,
  },
  backend: {
    loadPath: `/translations/{{lng}}.json?v=${version}`,
    allowMultiLoading: true,
  },
  // react: {
  // wait: true,
  // useSuspense: true,
  // },
};

i18n.use(Backend).use(initReactI18next).init(i18nOptions);

export default i18n;
