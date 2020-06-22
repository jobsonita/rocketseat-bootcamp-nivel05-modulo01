import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { useAuth } from '../../context/auth'
import { useToast } from '../../context/toast'

import { AnimationContainer, Background, Container, Content } from './styles'

import { ApiError } from '../../services/api'

import getValidationErrors from '../../utils/getValidationErrors'

interface SignInFormData {
  email: string
  password: string
}

const schema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().required('Senha obrigatória'),
})

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useAuth()

  const { addToast } = useToast()

  const history = useHistory()

  const handleSubmit = useCallback(
    async ({ email, password }: SignInFormData): Promise<void> => {
      formRef.current?.setErrors({})

      try {
        await schema.validate({ email, password }, { abortEarly: false })

        await signIn({ email, password })
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
            title: response?.data.title || 'Falha na autenticação',
            description:
              response?.data.message ||
              'Verifique suas credenciais e tente novamente',
          })
        }
        return
      }

      addToast({
        type: 'success',
        title: 'Bem vindo',
      })

      history.push('/dashboard')
    },
    [addToast, history, signIn]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input name="email" placeholder="E-mail" Icon={FiMail} />

            <Input
              name="password"
              type="password"
              placeholder="Senha"
              autoComplete="current-password"
              Icon={FiLock}
            />

            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  )
}

export default SignIn
