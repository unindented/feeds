/**
 * Copyright 2025 Daniel Perez Alvarez
 *
 * This file is part of Static Feeds.
 *
 * Static Feeds is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * Static Feeds is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Static Feeds. If not, see <https://www.gnu.org/licenses/>.
 */

import strings from "./strings.json";

const defaultLang: Language = "en";

type Language = keyof typeof strings;
type I18nKey = keyof (typeof strings)[typeof defaultLang];

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split("/");
  if (lang !== undefined && Object.hasOwn(strings, lang)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return lang as Language;
  }
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: I18nKey): string {
    return strings[lang][key];
  };
}
