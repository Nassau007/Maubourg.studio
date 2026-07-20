import { en, type Dictionary } from '@/dictionaries/en';
import { fr } from '@/dictionaries/fr';

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
};

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] ?? en;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type { Dictionary };
