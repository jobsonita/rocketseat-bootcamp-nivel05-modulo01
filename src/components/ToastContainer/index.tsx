import React from 'react'

import { useTransition } from 'react-spring'

import { Container } from './styles'
import Toast from './Toast'

import { ToastFormat } from '../../context/toast'

interface ToastContainerProps {
  toasts: ToastFormat[]
}

const transition = {
  from: { right: '-120%', opacity: 0 },
  enter: { right: '0%', opacity: 1 },
  leave: { right: '-120%', opacity: 0 },
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const toastsWithTransitions = useTransition(
    toasts,
    (toast) => toast.id,
    transition
  )

  return (
    <Container>
      {toastsWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} toast={item} style={props} />
      ))}
    </Container>
  )
}

export default ToastContainer
