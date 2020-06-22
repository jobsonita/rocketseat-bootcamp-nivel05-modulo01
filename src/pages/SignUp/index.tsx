import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { useToast } from '../../context/toast'

import { AnimationContainer, Background, Container, Content } from './styles'

import api, { ApiError } from '../../services/api'

import getValidationErrors from '../../utils/getValidationErrors'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'No mínimo 6 caracteres'),
})

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const history = useHistory()

  const handleSubmit = useCallback(
    async ({ name, email, password }: SignUpFormData): Promise<void> => {
      formRef.current?.setErrors({})

      try {
        await schema.validate({ name, email, password }, { abortEarly: false })

        await api.post('users', { name, email, password })
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
            title: response?.data.title || 'Falha no cadastro',
            description:
              response?.data.message || 'Verifique os dados e tente novamente',
          })
        }
        return
      }

      addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Você já pode fazer seu logon no GoBarber',
      })

      history.push('/')
    },
    [addToast, history]
  )

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" placeholder="Nome" Icon={FiUser} />
            <Input name="email" placeholder="E-mail" Icon={FiMail} />

            <Input
              name="password"
              type="password"
              placeholder="Senha"
              autoComplete="new-password"
              Icon={FiLock}
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp
