import styles from './App.module.scss'
import { SearchForm } from './components/SearchForm/SearchForm'
import { useAddressSearch } from './hooks/useAddressSearch'

function App() {
  const { addresses, error, isLoading, search } = useAddressSearch()

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>住所検索</h1>
      <p className={styles.description}>
        郵便番号を入力して住所を検索できます。
        <br />
        郵便番号はハイフン「-」有無どちらでも検索可能です。
        <br />
        （000-0000, 0000000の形式で入力してください。）
      </p>
      <SearchForm onSearch={search} isLoading={isLoading} />
      {error && !isLoading && <p role="alert">{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        addresses.map((address) => (
          <div key={`${address.zipcode}-${address.address}`}>
            <p>{address.zipcode}</p>
            <p>{address.address}</p>
            <p>{address.addressKana}</p>
          </div>
        ))
      )}
    </main>
  )
}

export default App
