import { afterEach, describe, it, expect, vi } from 'vitest'
import { searchAddress, NotFoundError } from './searchAddress'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('searchAddress', () => {
  it('住所が見つかったとき、整形した住所の配列を返す', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 200,
          message: null,
          results: [
            {
              zipcode: '1000001',
              prefcode: '13',
              address1: '東京都',
              address2: '千代田区',
              address3: '千代田',
              kana1: 'ﾄｳｷｮｳﾄ',
              kana2: 'ﾁﾖﾀﾞｸ',
              kana3: 'ﾁﾖﾀﾞ',
            },
          ],
        }),
      ),
    )
    const addresses = await searchAddress('1000001')
    expect(addresses).toEqual([
      {
        zipcode: '1000001',
        address: '東京都千代田区千代田',
        addressKana: 'ﾄｳｷｮｳﾄﾁﾖﾀﾞｸﾁﾖﾀﾞ',
      },
    ])
  })

  it('住所が存在しないとき、「郵便番号が存在しません。」のエラーを投げる', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({ status: 200, message: null, results: null }),
      ),
    )
    await expect(searchAddress('1111111')).rejects.toThrow(
      '郵便番号が存在しません。',
    )
  })

  it('住所が存在しないとき、NotFoundErrorを投げる', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({ status: 200, message: null, results: null }),
      ),
    )
    await expect(searchAddress('1111111')).rejects.toThrow(NotFoundError)
  })

  it('API が status 400 を返したとき、「エラーが発生しました。」のエラーを投げる', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 400,
          message: 'パラメータ「郵便番号」の桁数が不正です。',
          results: null,
        }),
      ),
    )
    await expect(searchAddress('1000001')).rejects.toThrow(
      'エラーが発生しました。',
    )
  })

  it('通信が失敗したとき、エラーを投げる', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(
      new Error('Failed to fetch'),
    )
    await expect(searchAddress('1000001')).rejects.toThrow()
  })

  it('レスポンスがokでないとき、エラーを投げる', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('', { status: 500 }),
    )
    await expect(searchAddress('1000001')).rejects.toThrow(
      'エラーが発生しました。',
    )
  })
})
