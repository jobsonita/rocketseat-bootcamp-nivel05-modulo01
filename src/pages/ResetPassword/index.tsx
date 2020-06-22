import React, { useCallback, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FiLock } from 'react-icons/fi'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { useToast } from '../../context/toast'

import { AnimationContainer, Background, Container, Content } from './styles'

import { ApiError } from '../../services/api'

import getValidationErrors from '../../utils/getValidationErrors'

interface ResetPasswordFormData {
  password: string
  password_confirmation: string
}

const schema = Yup.object().shape({
  password: Yup.string().required('Senha obrigatória'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Confirmação incorreta'
  ),
})

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const history = useHistory()

  const handleSubmit = useCallback(
    async ({
      password,
      password_confirmation,
    }: ResetPasswordFormData): Promise<void> => {
      formRef.current?.setErrors({})

      try {
        await schema.validate(
          { password, password_confirmation },
          { abortEarly: false }
        )

        // fazer requisição à API
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(error))
          addToast({
            type: 'error',
            title: 'Falha na validação',
            description: 'Verifique os dados do formulário',
          })
        } else if (error.message === 'Network Error') {
          addToast({
            type: 'error',
            title: 'Falha na requisição',
            description: 'Verifique sua conexão com a internet',
          })
        } else {
          const { response } = error as ApiError
          addToast({
            type: 'error',
            title: response?.data.title || 'Falha na requisição',
            description:
              response?.data.message ||
              'Verifique os dados do formulário e tente novamente',
          })
        }
        return
      }

      addToast({
        type: 'success',
        title: 'Bem vindo',
      })

      history.push('/')
    },
    [addToast, history]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              name="password"
              type="password"
              placeholder="Nova senha"
              autoComplete="new-password"
              Icon={FiLock}
            />

            <Input
              name="password_confirmation"
              type="password"
              placeholder="Confirmação da senha"
              autoComplete="new-password"
              Icon={FiLock}
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  )
}

export default ResetPassword
