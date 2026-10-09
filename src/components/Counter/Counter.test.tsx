import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Counter } from './Counter'

describe('Counter', () => {
  it('クリックするとカウントが増える', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const button = screen.getByRole('button', { name: 'Count is 0' })
    await user.click(button)

    expect(button).toHaveTextContent('Count is 1')
  })
})
