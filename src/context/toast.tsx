import React, { createContext, useCallback, useContext, useState } from 'react'

import { uuid } from 'uuidv4'

import ToastContainer from '../components/ToastContainer'

export interface ToastFormat {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

interface ToastContextData {
  addToast(data: Omit<ToastFormat, 'id'>): void
  removeToast(id: string): void
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

export const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastFormat[]>([])

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastFormat, 'id'>) => {
      const id = uuid()

      const toast = { id, type, title, description }

      setToasts((toasts) => [...toasts, toast])
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextData => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}
