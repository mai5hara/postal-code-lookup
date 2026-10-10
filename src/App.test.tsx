import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { INVALID_CHARACTER_TYPE_MESSAGE } from './utils/validatePostalCode'
import App from './App'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('App', () => {
  it('入力にエラーがあるとき、API を呼ばずにエラーを表示する', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'))

    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('郵便番号'), 'a100000')
    await user.click(screen.getByRole('button', { name: '検索' }))
    expect(screen.getByText(INVALID_CHARACTER_TYPE_MESSAGE)).toBeInTheDocument()
    expect(fetch).not.toHaveBeenCalled()
  })

  it('通信に失敗したとき、「エラーが発生しました。」を表示する', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(
      new Error('Failed to fetch'),
    )

    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('郵便番号'), '1000001')
    await user.click(screen.getByRole('button', { name: '検索' }))
    expect(
      await screen.findByText('エラーが発生しました。'),
    ).toBeInTheDocument()
  })

  it('検索結果が複数あるとき、すべての住所を表示する', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 200,
          message: null,
          results: [
            {
              zipcode: '0790177',
              prefcode: '1',
              address1: '北海道',
              address2: '美唄市',
              address3: '上美唄町協和',
              kana1: 'ﾎｯｶｲﾄﾞｳ',
              kana2: 'ﾋﾞﾊﾞｲｼ',
              kana3: 'ｶﾐﾋﾞﾊﾞｲﾁｮｳｷｮｳﾜ',
            },
            {
              zipcode: '0790177',
              prefcode: '1',
              address1: '北海道',
              address2: '美唄市',
              address3: '上美唄町南',
              kana1: 'ﾎｯｶｲﾄﾞｳ',
              kana2: 'ﾋﾞﾊﾞｲｼ',
              kana3: 'ｶﾐﾋﾞﾊﾞｲﾁｮｳﾐﾅﾐ',
            },
            {
              zipcode: '0790177',
              prefcode: '1',
              address1: '北海道',
              address2: '美唄市',
              address3: '上美唄町',
              kana1: 'ﾎｯｶｲﾄﾞｳ',
              kana2: 'ﾋﾞﾊﾞｲｼ',
              kana3: 'ｶﾐﾋﾞﾊﾞｲﾁｮｳ',
            },
          ],
        }),
      ),
    )

    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('郵便番号'), '0790177')
    await user.click(screen.getByRole('button', { name: '検索' }))

    expect(
      await screen.findByText('北海道美唄市上美唄町協和'),
    ).toBeInTheDocument()
    expect(screen.getByText('北海道美唄市上美唄町南')).toBeInTheDocument()
    expect(screen.getByText('北海道美唄市上美唄町')).toBeInTheDocument()
  })

  it('検索結果が1つもないとき、「郵便番号が存在しません。」を表示する', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({ status: 200, message: null, results: null }),
      ),
    )

    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('郵便番号'), '1111111')
    await user.click(screen.getByRole('button', { name: '検索' }))
    expect(
      await screen.findByText('郵便番号が存在しません。'),
    ).toBeInTheDocument()
  })
})
