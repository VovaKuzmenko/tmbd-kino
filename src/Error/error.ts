import axios from 'axios'
import { ZodError } from 'zod'

export type RequestErrorCode =
  | 'no_network'
  | 'invalid_auth_token'
  | 'endpoint_not_found'
  | 'invalid_response_schema'
  | 'request_failed'
  | 'storage_unavailable'
  | 'unknown_error'

export type RequestError = {
  code: RequestErrorCode | string
  message: string
  status?: number
  details?: string
}

export type RequestState<TData> = {
  data: TData
  isLoading: boolean
  isError: boolean
  error: RequestError | null
}

export const createInitialRequestState = <TData>(data: TData): RequestState<TData> => ({
  data,
  isLoading: false,
  isError: false,
  error: null,
})

const formatZodIssues = (error: ZodError, maxIssues = 3): string => {
  return error.issues
    .slice(0, maxIssues)
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'root'
      return path + ': ' + issue.message
    })
    .join('; ')
}

export const normalizeRequestError = (
  error: unknown,
  fallbackMessage = 'Ошибка запроса'
): RequestError => {
  if (error instanceof ZodError) {
    const details = formatZodIssues(error)

    return {
      code: 'invalid_response_schema',
      message: 'Сервер вернул данные в неожиданном формате.',
      details: details || undefined,
    }
  }

  if (axios.isAxiosError(error)) {
    const apiMessage =
      typeof error.response?.data === 'object' &&
      error.response?.data &&
      'status_message' in error.response.data &&
      typeof error.response.data.status_message === 'string'
        ? error.response.data.status_message
        : null

    const status = error.response?.status

    if (!error.response || error.code === 'ERR_NETWORK') {
      return {
        code: 'no_network',
        message: 'Нет сети или сервер недоступен. Проверьте интернет-соединение.',
      }
    }

    if (status === 401 || status === 403) {
      return {
        code: 'invalid_auth_token',
        status,
        message: apiMessage ?? 'Проблема авторизации TMDB: проверьте AUTH_TOKEN/API key.',
      }
    }

    if (status === 404) {
      return {
        code: 'endpoint_not_found',
        status,
        message: apiMessage ?? 'Endpoint не найден (404). Проверьте URL и baseURL запроса.',
      }
    }

    return {
      code: error.code ?? 'request_failed',
      status,
      message: apiMessage ?? error.message ?? fallbackMessage,
    }
  }

  if (error instanceof Error) {
    return {
      code: 'unknown_error',
      message: error.message || fallbackMessage,
    }
  }

  return {
    code: 'unknown_error',
    message: fallbackMessage,
  }
}