import classNames from 'classnames';
import { useCallback } from 'react';
import type { FunctionComponent, MouseEvent } from 'react';
import { yiq } from 'yiq';
import type { HexColor } from './utils';
import styles from './widget.css';

export interface ColorProps {
  color: HexColor;
  onColorClick?: false | ((e: MouseEvent<HTMLButtonElement>, text: string) => void);
}

/**
 * @internal
 */
export const Color: FunctionComponent<ColorProps> = ({ color, onColorClick }) => {
  const className = classNames(
    styles.colorBox,
    yiq(color, { colors: { light: ' ', dark: styles.isLight } }),
    { [styles.clickable]: typeof onColorClick === 'function' },
  );
  const withoutHash = color.substring(1);

  const handleClick = useCallback(e => onColorClick && onColorClick(e, withoutHash), [onColorClick, withoutHash]);

  return (
    <button type="button" className={className} style={{ background: `${color} none repeat scroll 0 0` }} onClick={handleClick}>
      <span className={styles.colorCode}>{withoutHash}</span>
    </button>
  );
};
