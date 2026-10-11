import type { AddressResult } from '../../types/address'
import styles from './AddressDetail.module.scss'

export function AddressDetail({ address }: { address: AddressResult }) {
  return (
    <dl className={styles.list}>
      <div>
        <dt className={styles.label}>郵便番号</dt>
        <dd className={styles.value}>{address.zipcode}</dd>
      </div>
      <div>
        <dt className={styles.label}>住所</dt>
        <dd className={styles.value}>{address.address}</dd>
      </div>
      <div>
        <dt className={styles.label}>住所（カナ）</dt>
        <dd className={styles.value}>{address.addressKana}</dd>
      </div>
    </dl>
  )
}
