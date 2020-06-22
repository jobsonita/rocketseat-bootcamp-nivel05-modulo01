import React, { useCallback, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FiLogIn, FiMail } from 'react-icons/fi'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { useToast } from '../../context/toast'

import { AnimationContainer, Background, Container, Content } from './styles'

import api, { ApiError } from '../../services/api'

import getValidationErrors from '../../utils/getValidationErrors'

interface ForgotPasswordFormData {
  email: string
}

const schema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
})

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const history = useHistory()

  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async ({ email }: ForgotPasswordFormData): Promise<void> => {
      setLoading(true)
      formRef.current?.setErrors({})

      try {
        await schema.validate({ email }, { abortEarly: false })

        await api.post('/password/forgot', { email })
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
      } finally {
        setLoading(false)
      }

      addToast({
        type: 'success',
        title: 'E-mail de recuperação enviado',
        description:
          'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
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
            <h1>Recuperar senha</h1>

            <Input name="email" placeholder="E-mail" Icon={FiMail} />

            <Button type="submit" loading={loading}>
              Recuperar
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  )
}

export default ForgotPassword
