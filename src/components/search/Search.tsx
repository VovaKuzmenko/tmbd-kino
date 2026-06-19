import styles from './Search.module.css'
import type { FormEvent } from 'react'

type SearchProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
}

export const Search = ({ value, onChange, onSubmit, isLoading }: SearchProps) => {
  const canSubmit = value.trim().length > 0
  const isDisabled = isLoading || !canSubmit

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isDisabled) return
    onSubmit()
  }

  return (
    <div>
      <form className={styles['form-main-block']} onSubmit={handleSubmit}>
        <input
          placeholder="Search for a movie"
          type="text"
          className={styles['form-main-block__input']}
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
        />
        <button
          type="submit"
          className={styles['form-main-block__button']}
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  )
}