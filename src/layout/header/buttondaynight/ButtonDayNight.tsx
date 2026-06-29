import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../../store/app-slice'
import type { RootState } from '../../../store/store'


export const ButtonDayNight = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.films.theme)

  return (
    <button onClick={() => dispatch(toggleTheme())}
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