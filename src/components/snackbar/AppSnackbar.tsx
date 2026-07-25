import { useEffect, useMemo, useState } from 'react'
import { toastEventName, type ToastPayload } from '../../shared/notifications'
import styles from './AppSnackbar.module.css'

type ToastItem = ToastPayload & { createdAt: number }

export const AppSnackbar = () => {
  const [items, setItems] = useState<ToastItem[]>([])

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<ToastPayload>
      const payload = customEvent.detail
      setItems((prev) => [...prev, { ...payload, createdAt: Date.now() }])
    }

    window.addEventListener(toastEventName, handler as EventListener)
    return () => window.removeEventListener(toastEventName, handler as EventListener)
  }, [])

  useEffect(() => {
    if (items.length === 0) return

    const timers = items.map((item) =>
      window.setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== item.id))
      }, item.durationMs ?? 5000)
    )

    return () => {
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [items])

  const visibleItems = useMemo(() => items.slice(-3), [items])

  return (
    <div className={styles.viewport} aria-live='polite' aria-atomic='true'>
      {visibleItems.map((item) => (
        <div key={item.id} className={styles.toast + ' ' + styles[item.kind]}>
          <div className={styles.content}>
            <strong>{item.title}</strong>
            <p>{item.message}</p>
          </div>
          <button
            className={styles.close}
            type='button'
            onClick={() => setItems((prev) => prev.filter((x) => x.id !== item.id))}
            aria-label='Закрыть уведомление'
          >
            x
          </button>
        </div>
      ))}
    </div>
  )
}