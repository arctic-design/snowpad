import styles from './page.module.scss';
import JSONViewerScreen from '@/ui/JSONViewerScreen';
import { Suspense } from 'react';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      <Suspense fallback={'Loading...'}>
        <JSONViewerScreen />
      </Suspense>
    </div>
  );
}
