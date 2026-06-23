import styles from './Search.module.css'
import type { FormEvent } from 'react'

type SearchProps = {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: () => void
  isLoading?: boolean
  onClear?: () => void
}

export const Search = ({
  value = '',
  onChange,
  onSubmit,
  onClear,
  isLoading = false,
}: SearchProps) => {
  const canSubmit = value.trim().length > 0
  const isDisabled = isLoading || !canSubmit

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isDisabled) return
    onSubmit()
  }

  const handleChange = (nextValue: string) => {
    onChange(nextValue)
    if (nextValue === '') onClear()
  }



  return (

    <div>
      <form className={styles['form-main-block']} onSubmit={handleSubmit}>
        <input
          placeholder="Search for a movie"
          type="search"
          className={styles['form-main-block__input']}
          value={value}
          onChange={(event) => handleChange(event.currentTarget.value)}

        />

        <button
          type="submit"
          className={styles['form-main-block__button']}
          disabled={isDisabled}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  )
}