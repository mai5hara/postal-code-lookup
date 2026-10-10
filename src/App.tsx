import styles from './App.module.scss'
import { SearchForm } from './components/SearchForm/SearchForm'

function App() {
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
      <SearchForm />
    </main>
  )
}

export default App
