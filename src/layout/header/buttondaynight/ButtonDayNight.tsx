import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../../store/app-slice'
import type { RootState } from '../../../store/store'

export const ButtonDayNight = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.films.theme)

  const handleToggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }

  return (
    <button
      onClick={handleToggleTheme}
      style={{
        padding: '8px 14px',
        borderRadius: '999px',
        border: '1px solid #94a3b8',
        background: 'transparent',
      }}
    >
      {theme === 'light' ? '🌙' : '☀'}
    </button>
  )
}