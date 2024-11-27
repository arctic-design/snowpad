import styles from './page.module.scss';
import JSONViewerScreen from '@/ui/JSONViewerScreen';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      <JSONViewerScreen />
    </div>
  );
}
