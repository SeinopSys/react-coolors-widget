import type { FunctionComponent } from 'react';
import { Color, ColorProps } from './Color';
import { HexColor } from './utils';
import styles from './widget.css';

export interface ColorsProps extends Pick<ColorProps, 'onColorClick'> {
  colors: HexColor[];
}

/**
 * @internal
 */
export const Colors: FunctionComponent<ColorsProps> = ({ colors, onColorClick }) => (
  <div className={styles.colors}>
    {colors.map((color, index) => (
      <Color key={index} color={color} onColorClick={onColorClick} />
    ))}
  </div>
);
