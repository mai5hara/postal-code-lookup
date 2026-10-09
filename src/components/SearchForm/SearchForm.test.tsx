import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { SearchForm } from './SearchForm'

describe('SearchForm', () => {
  it('何も入力していないとき、ボタンが押せない状態になる', () => {
    render(<SearchForm />)

    const button = screen.getByRole('button', { name: '検索' })

    expect(button).toBeDisabled()
  })

  it('入力するとボタンが押せる状態になる', async () => {
    const user = userEvent.setup()
    render(<SearchForm />)

    const input = screen.getByLabelText('郵便番号')
    await user.type(input, '1234567')

    const button = screen.getByRole('button', { name: '検索' })
    expect(button).toBeEnabled()
  })

  it('スペースだけを入力したとき、ボタンが押せない状態のままになる', async () => {
    const user = userEvent.setup()
    render(<SearchForm />)

    const input = screen.getByLabelText('郵便番号')
    await user.type(input, '   ')

    const button = screen.getByRole('button', { name: '検索' })
    expect(button).toBeDisabled()
  })

  it('9文字入力しても8文字までしか入力できない', async () => {
    const user = userEvent.setup()
    render(<SearchForm />)

    const input = screen.getByLabelText('郵便番号')
    await user.type(input, '123456789')

    expect(input).toHaveValue('12345678')
  })
})
