import classNames from 'classnames';
import type { ForwardRefRenderFunction, HTMLAttributes } from 'react';
import { forwardRef, useMemo } from 'react';
import { Colors, ColorsProps } from './Colors';
import { CoolorsLinkComponent, DefaultLinkComponent } from './DefaultLinkComponent';
import type { InfoProps } from './Info';
import { Info } from './Info';
import { normalizeColor } from './utils';

import styles from './widget.css';

export type CoolorsWidgetProps = HTMLAttributes<HTMLDivElement> & InfoProps & Pick<ColorsProps, 'onColorClick'> & {
  colors: string[];
  LinkComponent?: CoolorsLinkComponent
  linkText?: string;
};

const CoolorsWidgetComponent: ForwardRefRenderFunction<HTMLDivElement, CoolorsWidgetProps> = ({
  LinkComponent = DefaultLinkComponent,
  colors,
  linkText = 'View on Coolors',
  onColorClick,
  paletteName,
  ...divAttributes
}, ref) => {
  const { className, ...restAttributes } = divAttributes;

  const normalizedColors = useMemo(() => colors.map(normalizeColor), [colors]);

  if (normalizedColors.length < 1) return null;

  return (
    <div {...restAttributes} className={classNames(styles.coolorsPaletteWidget, className)} ref={ref}>
      <Colors colors={normalizedColors} onColorClick={onColorClick} />
      <Info paletteName={paletteName}>
        <LinkComponent colors={normalizedColors}>{linkText}</LinkComponent>
      </Info>
    </div>
  );
};

export const CoolorsWidget = forwardRef(CoolorsWidgetComponent);
