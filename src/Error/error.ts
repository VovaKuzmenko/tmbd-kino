import axios from 'axios'

export type RequestError = {
  code: string
  message: string
  status?: number
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

export const normalizeRequestError = (
  error: unknown,
  fallbackMessage = 'Request failed'
): RequestError => {
  if (axios.isAxiosError(error)) {
    const apiMessage =
      typeof error.response?.data === 'object' &&
        error.response?.data &&
        'status_message' in error.response.data &&
        typeof error.response.data.status_message === 'string'
        ? error.response.data.status_message
        : null

    return {
      code: error.code ?? 'request_failed',
      message: apiMessage ?? error.message ?? fallbackMessage,
      status: error.response?.status,
    }
  }

  if (error instanceof Error) {
    return {
      code: 'unknown_error',
      message: error.message,
    }
  }

  return {
    code: 'unknown_error',
    message: fallbackMessage,
  }
}