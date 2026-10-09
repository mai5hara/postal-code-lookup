import styles from './App.module.scss'
import { Counter } from './components/Counter/Counter'

function App() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Hello</h1>
      <Counter />
    </main>
  )
}

export default App
