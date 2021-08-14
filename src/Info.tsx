import type { FunctionComponent } from 'react';
import styles from './widget.css';

export interface InfoProps {
  paletteName?: string;
}

/**
 * @internal
 */
export const Info: FunctionComponent<InfoProps> = ({
  paletteName,
  children,
}) => (
  <div className={styles.info}>
    <div className={styles.infoName}>{paletteName}</div>
    <div className={styles.infoLink}>
      {children}
    </div>
  </div>
);
