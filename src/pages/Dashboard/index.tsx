import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../../context/auth'

const Dashboard: React.FC = () => {
  const { signOut } = useAuth()

  const history = useHistory()

  const handleLogout = useCallback(() => {
    signOut()

    history.push('/')
  }, [history, signOut])

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
