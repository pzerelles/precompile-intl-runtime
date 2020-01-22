import { getCurrentLocale } from './stores/locale'
import { getOptions } from './configs'
import { flush } from './includes/loaderQueue'
export * from './includes/utils';

export function waitLocale(locale?: string) {
  return flush(locale || getCurrentLocale() || getOptions().initialLocale)
}

export { init } from './configs'

export { $locale as locale } from './stores/locale'

export {
  $dictionary as dictionary,
  $locales as locales,
  addMessages,
} from './stores/dictionary'
export { registerLocaleLoader as register } from './includes/loaderQueue'

export { $isLoading as isLoading } from './stores/loading'

import {
  formatTime,
  formatDate,
  formatNumber
} from './stores/formatters';
export {
  $format as format,
  $format as _,
  $format as t,
  $formatDate as formatDate,
  $formatNumber as formatNumber,
  $formatTime as formatTime,
} from './stores/formatters'

// low-level
export {
  getDateFormatter,
  getNumberFormatter,
  getTimeFormatter,
} from './includes/formatters'


type PluralRule = "zero" | "one" | "two" | "few" | "many" | "other" | number
type PluralOptions = Record<PluralRule, string>
export function __interpolate(value: any) {
  return value === 0 ? 0 : value || '';
}

const PLURAL_RULES = Object.create(null);
function getLocalPluralFor(v: number): PluralRule {
  let loc = getCurrentLocale();
  let pluralRules = PLURAL_RULES[loc] || (PLURAL_RULES[loc] = new Intl.PluralRules(loc));
  let key = pluralRules.select(v);
  return key === 'other' ? 'h' : key[0];
}
export function __offsetPlural(value: number, offset: number, opts: PluralOptions): string {
  return opts[value] || opts[getLocalPluralFor(value - offset)] || "";
}

export function __plural(value: number, opts: PluralOptions): string {
  return opts[value] || opts[getLocalPluralFor(value)] || "";
}

export function __select(value: any, opts: Record<any, string>): string {
  return opts[value] || opts['other'] || '';
}

export function __number(value: number, format?: string): string {
  return formatNumber(value, { format });
}

export function __date(value: Date, format = "short"): string {
  return formatDate(value, { format });
}

export function __time(value: Date, format = "short"): string {
  return formatTime(value, { format });
}