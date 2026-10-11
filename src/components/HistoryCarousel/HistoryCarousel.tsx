import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper'
import type { SearchHistory } from '../../types/address'
import { chunkHistory } from '../../utils/chunkHistory'
import { HistoryCard } from '../HistoryCard/HistoryCard'
import { ChevronIcon } from '../ui/ChevronIcon/ChevronIcon'
import 'swiper/css'
import 'swiper/css/a11y'
import styles from './HistoryCarousel.module.scss'

const CHUNK_SIZE = 3

export function HistoryCarousel({ history }: { history: SearchHistory[] }) {
  const pages = chunkHistory(history, CHUNK_SIZE)

  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(true)

  // 最初・最後のページかどうかは、ページ移動だけでなく履歴の追加でページ数が変わったときや画面幅の変化でも変わる。
  // reachEnd / fromEdge は 1 ページ → 2 ページに増えたとき（ロック解除時）に発火しないため、位置の再計算のたびに必ず発火する progress イベントで更新する
  const updateEdges = (instance: SwiperInstance) => {
    setIsBeginning(instance.isBeginning)
    setIsEnd(instance.isEnd)
  }

  // 新しい履歴は先頭に追加されるため、件数が変わったら 1 ページ目に戻す。
  // React の状態（履歴）に、外部の Swiper を合わせる処理なので useEffect を使う
  useEffect(() => {
    swiper?.slideTo(0)
  }, [history.length, swiper])

  return (
    <div className={styles.carousel}>
      <Swiper
        modules={[A11y]}
        spaceBetween={16}
        a11y={{ slideLabelMessage: '{{index}} / {{slidesLength}} ページ' }}
        onSwiper={(instance) => {
          setSwiper(instance)
          updateEdges(instance)
        }}
        onSlideChange={(instance) => setActiveIndex(instance.activeIndex)}
        onProgress={updateEdges}
      >
        {pages.map((page) => (
          <SwiperSlide key={page[0].id}>
            <ul className={styles.historyCardList}>
              {page.map((item) => (
                <li key={item.id} className={styles.historyCardItem}>
                  <HistoryCard addresses={item.addresses} />
                </li>
              ))}
            </ul>
          </SwiperSlide>
        ))}
      </Swiper>
      {pages.length > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navButton}
            aria-label="前のページ"
            disabled={isBeginning}
            onClick={() => swiper?.slidePrev()}
          >
            <ChevronIcon direction="prev" />
          </button>
          <div className={styles.pagination}>
            {pages.map((page, index) => (
              <button
                key={page[0].id}
                type="button"
                className={styles.bullet}
                aria-label={`${index + 1} ページ目へ移動`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => swiper?.slideTo(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.navButton}
            aria-label="次のページ"
            disabled={isEnd}
            onClick={() => swiper?.slideNext()}
          >
            <ChevronIcon direction="next" />
          </button>
        </div>
      )}
    </div>
  )
}
