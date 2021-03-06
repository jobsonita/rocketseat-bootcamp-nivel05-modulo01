import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { FiPower, FiClock } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { useAuth } from '../../context/auth'

import {
  Appointment,
  Calendar,
  Container,
  Content,
  Header,
  HeaderContent,
  NextAppointment,
  Profile,
  Schedule,
  Section,
} from './styles'

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth()

  const history = useHistory()

  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleLogout = useCallback(() => {
    signOut()

    history.push('/')
  }, [history, signOut])

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day)
    }
  }, [])

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

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src={`https://api.adorable.io/avatars/80/${Math.random()}.png`}
                  alt="Usuário"
                />

                <strong>Cliente 1</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>

              <div>
                <img
                  src={`https://api.adorable.io/avatars/80/${Math.random()}.png`}
                  alt="Usuário"
                />

                <strong>Cliente 2</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                15:00
              </span>

              <div>
                <img
                  src={`https://api.adorable.io/avatars/80/${Math.random()}.png`}
                  alt="Usuário"
                />

                <strong>Cliente 3</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            selectedDays={selectedDate}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onDayClick={handleDateChange}
          />
        </Calendar>
      </Content>
    </Container>
  )
}

export default Dashboard
