import type { FunctionComponent, HTMLAttributes } from 'react';
import { useMemo } from 'react';
import { Colors } from './Colors';
import { CoolorsLinkComponent, DefaultLinkComponent } from './DefaultLinkComponent';
import type { InfoProps } from './Info';
import { Info } from './Info';
import { normalizeColor } from './utils';

import styles from './widget.scss';

export type CoolorsWidgetProps = HTMLAttributes<HTMLDivElement> & InfoProps & {
  colors: string[];
  LinkComponent: CoolorsLinkComponent
  linkText?: string;
};

export const CoolorsWidget: FunctionComponent<CoolorsWidgetProps> = ({
  LinkComponent = DefaultLinkComponent,
  colors,
  linkText = 'View on Coolors',
  paletteName,
  ...divAttributes
}) => {
  const {
    className,
    ...restAttributes
  } = divAttributes;

  const classNameAttr = useMemo(() => {
    let finalClassName = styles.coolorsPaletteWidget;
    if (typeof className === 'string') {
      finalClassName += `${finalClassName} ${className}`;
    }
    return finalClassName;
  }, [className]);

  const normalizedColors = useMemo(() => colors.map(normalizeColor), [colors]);

  if (normalizedColors.length < 1) return null;

  return (
    <div {...restAttributes} className={classNameAttr}>
      <Colors colors={normalizedColors} />
      <Info paletteName={paletteName}>
        <LinkComponent colors={normalizedColors}>{linkText}</LinkComponent>
      </Info>
    </div>
  );
};
