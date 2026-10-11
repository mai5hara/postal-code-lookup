import styles from './ChevronIcon.module.scss'

export function ChevronIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg
      className={styles.icon}
      data-direction={direction}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15 18l-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
