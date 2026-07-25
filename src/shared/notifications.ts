import { normalizeRequestError, type RequestError } from '../Error/error'

export type ToastKind = 'error' | 'info' | 'success'

export type ToastPayload = {
  id: string
  kind: ToastKind
  title: string
  message: string
  durationMs?: number
}

const TOAST_EVENT = 'app:toast'
const DEDUPE_WINDOW_MS = 1800

let lastToastMessage = ''
let lastToastAt = 0

const buildId = () => String(Date.now()) + '_' + Math.random().toString(36).slice(2, 8)

export const pushToast = (payload: Omit<ToastPayload, 'id'>) => {
  const now = Date.now()

  if (payload.message === lastToastMessage && now - lastToastAt < DEDUPE_WINDOW_MS) {
    return
  }

  lastToastMessage = payload.message
  lastToastAt = now

  const toast: ToastPayload = {
    id: buildId(),
    durationMs: 5000,
    ...payload,
  }

  window.dispatchEvent(new CustomEvent<ToastPayload>(TOAST_EVENT, { detail: toast }))
}

export const pushRequestErrorToast = (
  error: unknown,
  fallbackMessage = 'Произошла ошибка запроса',
  title = 'Ошибка'
): RequestError => {
  const normalized = normalizeRequestError(error, fallbackMessage)

  const message =
    typeof normalized.status === 'number'
      ? normalized.message + ' (HTTP ' + normalized.status + ')'
      : normalized.message

  pushToast({
    kind: 'error',
    title,
    message,
  })

  return normalized
}

export const toastEventName = TOAST_EVENT