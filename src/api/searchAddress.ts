import type { AddressResult, ZipcloudResponse } from '../types/address'

export class NotFoundError extends Error {
  name = 'NotFoundError'
}

export const searchAddress = async (
  postalCode: string,
): Promise<AddressResult[]> => {
  const response = await fetch(
    `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`,
  )

  if (!response.ok) {
    throw new Error('エラーが発生しました。')
  }

  const data: ZipcloudResponse = await response.json()

  if (data.status !== 200) {
    throw new Error('エラーが発生しました。')
  }

  if (!data.results || data.results.length === 0) {
    throw new NotFoundError('郵便番号が存在しません。')
  }

  return data.results.map((result) => ({
    zipcode: result.zipcode,
    address: `${result.address1}${result.address2}${result.address3}`,
    addressKana: `${result.kana1}${result.kana2}${result.kana3}`,
  }))
}
