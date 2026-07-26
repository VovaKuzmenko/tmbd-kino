import { useEffect, useState } from 'react'
import { toastEventName, type ToastPayload } from '../../shared/notifications'
import styles from './UniversalErrorNotification.module.css'

type ToastItem = ToastPayload & {
  createdAt: number
}

export const UniversalErrorNotification = () => {
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

  const latestError = [...items].reverse().find((x) => x.kind === 'error')
  const visibleToasts = items.slice(-3)

  return (
    <>
      {latestError && (
        <section className={styles.banner} role='alert' aria-live='assertive'>
          <div className={styles.bannerTitle}>{latestError.title}</div>
          <div className={styles.bannerMessage}>{latestError.message}</div>
          <button
            type='button'
            className={styles.bannerClose}
            onClick={() =>
              setItems((prev) => prev.filter((x) => x.id !== latestError.id))
            }
            aria-label='Close notification'
          >
            x
          </button>
        </section>
      )}

      <div className={styles.viewport} aria-live='polite' aria-atomic='true'>
        {visibleToasts.map((item) => (
          <div key={item.id} className={styles.toast + ' ' + styles[item.kind]}>
            <div className={styles.content}>
              <strong>{item.title}</strong>
              <p>{item.message}</p>
            </div>
            <button
              className={styles.close}
              type='button'
              onClick={() => setItems((prev) => prev.filter((x) => x.id !== item.id))}
              aria-label='Close notification'
            >
              x
            </button>
          </div>
        ))}
      </div>
    </>
  )
}