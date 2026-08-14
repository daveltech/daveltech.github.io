import { describe, it, expect } from 'vitest';
import {
  getStaticPaths,
  getLabels,
  getRelativePath,
  defaultLocale,
  locales,
  ogLocales,
  prefixDefaultLocale,
} from '@i18n/utils';

const base = import.meta.env.BASE_URL;

describe('i18n utils', () => {
  it('exports correct constants', () => {
    expect(defaultLocale).toBe('sk');
    expect(locales).toEqual(['en', 'sk']);
    expect(ogLocales).toEqual({ en: 'en_US', sk: 'sk_SK' });
    expect(prefixDefaultLocale).toBe(false);
  });

  describe('getStaticPaths', () => {
    it('returns the correct paths for locales', () => {
      const paths = getStaticPaths();
      expect(paths).toHaveLength(2);
      expect(paths).toEqual([{ params: { lang: 'en' } }, { params: { lang: undefined } }]);
    });
  });

  describe('getLabels', () => {
    it('returns translations for a given locale and key', () => {
      const homeEn = getLabels('en', 'home');
      const homeSk = getLabels('sk', 'home');

      expect(homeEn).toBeDefined();
      expect(homeSk).toBeDefined();
      expect(homeEn).not.toEqual(homeSk);
    });

    it('falls back to defaultLocale when currentLocale is undefined', () => {
      const homeUndefined = getLabels(undefined, 'home');
      const homeDefault = getLabels(defaultLocale, 'home');

      expect(homeUndefined).toEqual(homeDefault);
    });

    it('falls back to defaultLocale for unknown locale', () => {
      const homeUnknown = getLabels('es', 'home');
      const homeDefault = getLabels(defaultLocale, 'home');

      expect(homeUnknown).toEqual(homeDefault);
    });

    it('every locale defines all top-level translation keys', async () => {
      const { en } = await import('@i18n/translations/en');
      const { sk } = await import('@i18n/translations/sk');

      const allLocaleTranslations: Record<string, typeof en> = { en, sk };
      const expectedKeys = Object.keys(en) as Array<keyof typeof en>;

      for (const locale of locales) {
        const translation = allLocaleTranslations[locale];
        for (const key of expectedKeys) {
          expect(translation, `Locale "${locale}" is missing key "${key}"`).toHaveProperty(key);
        }
      }
    });

    it('every locale returns a defined value for every top-level key', async () => {
      const { en } = await import('@i18n/translations/en');
      const expectedKeys = Object.keys(en) as Array<keyof typeof en>;

      for (const locale of locales) {
        for (const key of expectedKeys) {
          expect(getLabels(locale, key), `getLabels("${locale}", "${key}") returned undefined`).toBeDefined();
        }
      }
    });

    it('array fields in translations have consistent length across locales', async () => {
      const { en } = await import('@i18n/translations/en');
      const { sk } = await import('@i18n/translations/sk');

      const arrayKeys = (Object.keys(en) as Array<keyof typeof en>).filter((key) => Array.isArray((en as any)[key]));

      for (const key of arrayKeys) {
        const enLen = ((en as any)[key] as unknown[]).length;
        const skLen = ((sk as any)[key] as unknown[]).length;
        expect(skLen, `Array key "${key}": sk has ${skLen} items but en has ${enLen}`).toBe(enLen);
      }
    });
  });

  describe('getRelativePath', () => {
    it('removes the locale prefix correctly from pathnames', () => {
      expect(getRelativePath(`${base}en/about`, 'en')).toBe('/about');
      expect(getRelativePath(`${base}sk/contact`, 'sk')).toBe('/contact');
      expect(getRelativePath(`${base}en/`, 'en')).toBe('/');
      expect(getRelativePath(`${base}en`, 'en')).toBe('/');
      expect(getRelativePath(`${base}sk`, 'sk')).toBe('/');
      expect(getRelativePath(`${base}`, 'en')).toBe('/');
      expect(getRelativePath('', 'en')).toBe('');
    });

    it('does not remove the locale if it is part of a larger path segment', () => {
      expect(getRelativePath(`${base}enrollment`, 'en')).toBe('/enrollment');
      expect(getRelativePath(`${base}skateboard`, 'sk')).toBe('/skateboard');
      expect(getRelativePath(`${base}sk-ch`, 'sk')).toBe('/sk-ch');
    });

    it('returns the path unmodified if the locale is not at the start', () => {
      expect(getRelativePath(`${base}about/en`, 'en')).toBe('/about/en');
    });
  });
});
