import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { FiPower, FiClock } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { useAuth } from '../../context/auth'

import {
  Calendar,
  Container,
  Content,
  Header,
  HeaderContent,
  NextAppointment,
  Profile,
  Schedule,
} from './styles'

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth()

  const history = useHistory()

  const handleLogout = useCallback(() => {
    signOut()

    history.push('/')
  }, [history, signOut])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img
              src={
                user.avatar_url ||
                `https://api.adorable.io/avatars/80/${user.id}.png`
              }
              alt={user.name}
            />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button onClick={handleLogout}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src={`https://api.adorable.io/avatars/80/${Math.random()}.png`}
                alt="Usuário"
              />

              <strong>Diego Fernandes</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  )
}

export default Dashboard
