export interface ZipcloudAddress {
  zipcode: string
  prefcode: string
  address1: string
  address2: string
  address3: string
  kana1: string
  kana2: string
  kana3: string
}

export interface ZipcloudResponse {
  status: number
  message: string | null
  results: ZipcloudAddress[] | null
}

export interface AddressResult {
  zipcode: string
  address: string
  addressKana: string
}
