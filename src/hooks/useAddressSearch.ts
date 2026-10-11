import { useRef, useState } from 'react'
import { searchAddress, NotFoundError } from '../api/searchAddress'
import type { AddressResult, SearchHistory } from '../types/address'
import { validatePostalCode } from '../utils/validatePostalCode'

export const useAddressSearch = () => {
  const [addresses, setAddresses] = useState<AddressResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<SearchHistory[]>([])
  // crypto.randomUUID は https / localhost 以外（実機から LAN の IP で開いた場合など）では使えないため、履歴の id は連番で採番する
  const nextHistoryIdRef = useRef(0)

  const search = async (postalCode: string) => {
    try {
      setIsLoading(true)
      setError(null)
      setAddresses([])

      const validationError = validatePostalCode(postalCode)
      if (validationError) {
        setError(validationError)
        return
      }

      const addressResult = await searchAddress(postalCode)
      setAddresses(addressResult)
      // 更新関数は StrictMode で 2 回呼ばれることがあるため、id は関数の外で採番する
      const id = String(nextHistoryIdRef.current++)
      setHistory((prev) => [{ id, addresses: addressResult }, ...prev])
    } catch (error) {
      setError(
        error instanceof NotFoundError
          ? error.message
          : 'エラーが発生しました。',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return { addresses, error, isLoading, search, history }
}
