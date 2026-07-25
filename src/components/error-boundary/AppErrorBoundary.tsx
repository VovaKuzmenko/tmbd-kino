import { Component, type ErrorInfo, type ReactNode } from 'react'
import { pushToast } from '../../shared/notifications'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    pushToast({
      kind: 'error',
      title: 'Критическая ошибка интерфейса',
      message: error.message || 'Произошла непредвиденная ошибка в компоненте.',
    })

    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2>Что-то пошло не так</h2>
          <p>Попробуйте перезагрузить страницу.</p>
          <button type='button' onClick={this.handleReload}>
            Перезагрузить
          </button>
        </div>
      )
    }

    return this.props.children
  }
}