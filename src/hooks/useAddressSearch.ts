import { useState } from 'react'
import { searchAddress, NotFoundError } from '../api/searchAddress'
import type { AddressResult } from '../types/address'
import { validatePostalCode } from '../utils/validatePostalCode'

export const useAddressSearch = () => {
  const [addresses, setAddresses] = useState<AddressResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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

  return { addresses, error, isLoading, search }
}
