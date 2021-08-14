import type { FunctionComponent } from 'react';
import { yiq } from 'yiq';
import type { HexColor } from './utils';
import styles from './widget.css';

/**
 * @internal
 */
export interface ColorProps {
  color: HexColor;
}

/**
 * @internal
 */
export const Color: FunctionComponent<ColorProps> = ({ color }) => {
  const className = `${styles.colorBox} ${yiq(color, { colors: { light: styles.isLight, dark: ' ' } })}`.trim();
  return (
    <div className={className} style={{ background: `${color} none repeat scroll 0 0` }}>
      <span className={styles.colorCode}>{color.substring(1)}</span>
    </div>
  );
};
