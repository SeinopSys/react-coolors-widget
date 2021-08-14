import { CoolorsWidgetError } from './CoolorsWidgetError';

const colorRegex = /^#?(([\dA-F]{3})([\dA-F]{3})?)$/i;

const HexColorBrand = Symbol('HexColor');

/**
 * 6 digit HEX string with a forced `#` prefix
 *
 * @internal
 */
export type HexColor = `#${string}` & { typeBrand: typeof HexColorBrand };

/**
 * Normalizes a single color value, throwing an exception in case a malformed value is found
 *
 * @internal
 */
export const normalizeColor = (color: string | `#${string}`): HexColor => {
  if (!colorRegex.test(color)) throw new CoolorsWidgetError(`Malformed color: ${color}`);
  const matchedValue = color.replace(colorRegex, '$1').toUpperCase();
  return (`#${matchedValue.length === 3 ? matchedValue.replace(/(.)/g, '$1$1') : matchedValue}`) as HexColor;
};
