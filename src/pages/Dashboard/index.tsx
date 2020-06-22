import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { FiPower } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { useAuth } from '../../context/auth'

import { Container, Header, HeaderContent, Profile } from './styles'

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
    </Container>
  )
}

export default Dashboard
