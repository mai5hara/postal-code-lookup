import styles from './App.module.scss'
import { SearchForm } from './components/SearchForm/SearchForm'
import { useAddressSearch } from './hooks/useAddressSearch'
import { HistoryCarousel } from './components/HistoryCarousel/HistoryCarousel'
import { AddressDetail } from './components/AddressDetail/AddressDetail'

function App() {
  const { addresses, error, isLoading, search, history } = useAddressSearch()

  return (
    <main className={styles.main}>
      <section className={styles.searchSection}>
        <div className={styles.header}>
          <h1 className={styles.title}>住所検索</h1>
          <p className={styles.description}>
            郵便番号を入力して住所を検索できます。
            <br />
            郵便番号はハイフン「-」有無
            <br className={styles.mobileOnlyBr} />
            どちらでも検索可能です。
            <br />
            （000-0000, 0000000の形式で入力してください。）
          </p>
        </div>
        <SearchForm onSearch={search} isLoading={isLoading} />
        {error && !isLoading && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}
      </section>
      {(isLoading || addresses.length > 0) && (
        <section aria-label="検索結果" className={styles.section}>
          {isLoading ? (
            <p role="status" className={styles.loading}>
              検索中…
            </p>
          ) : (
            <ul className={styles.results}>
              {addresses.map((address) => (
                <li
                  key={`${address.zipcode}-${address.address}`}
                  className={styles.resultItem}
                >
                  <AddressDetail address={address} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      <section aria-labelledby="history-heading" className={styles.section}>
        <h2 id="history-heading" className={styles.sectionTitle}>
          検索履歴
        </h2>
        {history.length > 0 ? (
          <HistoryCarousel history={history} />
        ) : (
          <p className={styles.emptyHistory}>検索履歴がありません。</p>
        )}
      </section>
    </main>
  )
}

export default App
