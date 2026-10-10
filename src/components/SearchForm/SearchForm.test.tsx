import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { SearchForm } from './SearchForm'

describe('SearchForm', () => {
  it('何も入力していないとき、ボタンが押せない状態になる', () => {
    render(<SearchForm onSearch={() => {}} isLoading={false} />)

    const button = screen.getByRole('button', { name: '検索' })

    expect(button).toBeDisabled()
  })

  it('入力するとボタンが押せる状態になる', async () => {
    const user = userEvent.setup()
    render(<SearchForm onSearch={() => {}} isLoading={false} />)

    const input = screen.getByLabelText('郵便番号')
    await user.type(input, '1234567')

    const button = screen.getByRole('button', { name: '検索' })
    expect(button).toBeEnabled()
  })

  it('スペースだけを入力したとき、ボタンが押せない状態のままになる', async () => {
    const user = userEvent.setup()
    render(<SearchForm onSearch={() => {}} isLoading={false} />)

    const input = screen.getByLabelText('郵便番号')
    await user.type(input, '   ')

    const button = screen.getByRole('button', { name: '検索' })
    expect(button).toBeDisabled()
  })

  it('9文字入力しても8文字までしか入力できない', async () => {
    const user = userEvent.setup()
    render(<SearchForm onSearch={() => {}} isLoading={false} />)

    const input = screen.getByLabelText('郵便番号')
    await user.type(input, '123456789')

    expect(input).toHaveValue('12345678')
  })

  it('入力して検索すると、入力した郵便番号で onSearch が呼ばれる', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<SearchForm onSearch={onSearch} isLoading={false} />)

    const input = screen.getByLabelText('郵便番号')
    await user.type(input, '1000001')

    const button = screen.getByRole('button', { name: '検索' })
    await user.click(button)

    expect(onSearch).toHaveBeenCalledWith('1000001')
  })

  it('通信中はボタンが押せない状態になる', async () => {
    const user = userEvent.setup()
    render(<SearchForm onSearch={() => {}} isLoading={true} />)

    const input = screen.getByLabelText('郵便番号')
    await user.type(input, '1000001')

    const button = screen.getByRole('button', { name: '検索' })

    expect(button).toBeDisabled()
  })

  it('スペースだけを入力して Enter キーを押しても、送信されない', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<SearchForm onSearch={onSearch} isLoading={false} />)

    await user.type(screen.getByLabelText('郵便番号'), '   ')
    await user.keyboard('{Enter}')

    expect(onSearch).not.toHaveBeenCalled()
  })
})
