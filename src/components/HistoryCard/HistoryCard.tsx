import { AddressDetail } from '../AddressDetail/AddressDetail'
import type { AddressResult } from '../../types/address'
import styles from './HistoryCard.module.scss'

export function HistoryCard({ addresses }: { addresses: AddressResult[] }) {
  return (
    <div className={styles.card}>
      {addresses.map((address) => (
        <div
          key={`${address.zipcode}-${address.address}`}
          className={styles.item}
        >
          <AddressDetail address={address} />
        </div>
      ))}
    </div>
  )
}
