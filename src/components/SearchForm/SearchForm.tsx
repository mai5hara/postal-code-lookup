import { useState, type SubmitEvent } from 'react'
import styles from './SearchForm.module.scss'

export function SearchForm({
  onSearch,
  isLoading,
}: {
  onSearch: (zipcode: string) => void
  isLoading: boolean
}) {
  const [zipcode, setZipcode] = useState('')

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(zipcode)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        placeholder="郵便番号を入力してください。"
        className={styles.input}
        value={zipcode}
        inputMode="numeric"
        maxLength={8}
        autoComplete="postal-code"
        aria-label="郵便番号"
        onChange={(e) => setZipcode(e.target.value)}
      />
      <button
        type="submit"
        className={styles.button}
        disabled={!zipcode.trim() || isLoading}
      >
        検索
      </button>
    </form>
  )
}
