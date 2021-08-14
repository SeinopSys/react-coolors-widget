import { ComponentType, useMemo } from 'react';
import { ColorsProps } from './Colors';
import { CoolorsPaletteWidgetError } from './CoolorsPaletteWidgetError';

export type CoolorsLinkComponent = ComponentType<ColorsProps>;

/**
 * The maximum number of colors that can be present in the coolors.co URL before it returns a 404 page
 * @internal
 */
export const MAX_COLOR_COUNT = 10;

/**
 * @internal
 */
export const DefaultLinkComponent: CoolorsLinkComponent = ({
  colors,
  children,
}) => {
  const mappedColors = useMemo(() => colors.map(c => c.substring(1).toLowerCase()), [colors]);
  if (mappedColors.length > MAX_COLOR_COUNT) {
    throw new CoolorsPaletteWidgetError(`More than ${MAX_COLOR_COUNT} colors will result in a 404 page`);
  }
  return <a href={`https://coolors.co/${mappedColors.join('-')}`} target="_blank" rel="noreferrer noopener">{children}</a>;
};
