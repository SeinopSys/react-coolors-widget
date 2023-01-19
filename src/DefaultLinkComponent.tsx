import { ComponentType, PropsWithChildren, useMemo } from 'react';
import { ColorsProps } from './Colors';
import { CoolorsWidgetError } from './CoolorsWidgetError';

export type CoolorsLinkComponent = ComponentType<PropsWithChildren<Pick<ColorsProps, 'colors'>>>;

/**
 * The base URL of the Coolors.co website, extracted for clarity & future testing use
 * @internal
 */
export const WEBSITE_BASE_URL = 'https://coolors.co/';

/**
 * The maximum number of colors that can be present in the Coolors.co URL before it returns a 404 page
 * @internal
 */
export const MAX_COLOR_COUNT = 10;

/**
 * This component renders the link in the bottom right corner of the widget by default
 * @internal
 */
export const DefaultLinkComponent: CoolorsLinkComponent = ({
  colors,
  children,
}) => {
  const mappedColors = useMemo(() => colors.map(c => c.substring(1).toLowerCase()), [colors]);
  if (mappedColors.length > MAX_COLOR_COUNT) {
    throw new CoolorsWidgetError(`More than ${MAX_COLOR_COUNT} colors will result in a 404 page`);
  }
  return <a href={WEBSITE_BASE_URL + mappedColors.join('-')} target="_blank" rel="noreferrer noopener">{children}</a>;
};
