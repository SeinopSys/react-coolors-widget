import type { FunctionComponent } from 'react';
import { Color } from './Color';
import { HexColor } from './utils';
import styles from './widget.css';

export interface ColorsProps {
  colors: HexColor[];
}

/**
 * @internal
 */
export const Colors: FunctionComponent<ColorsProps> = ({ colors }) => (
  <div className={styles.colors}>
    {colors.map((color, index) => (
      <Color key={index} color={color} />
    ))}
  </div>
);
