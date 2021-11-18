import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from '../../components/Input'
import { LogoSVG } from '../../assets/Logo'

import './styles.css'

export function Login() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) return navigate('/chat')

    return setIsLoading(false)
  }, [navigate])

  function onSubmit(name: string) {
    console.log(name)

    return navigate('/chat')
  }

  if (isLoading) return <img src={process.env.PUBLIC_URL + '/spinner.gif'} alt="Is loading" />

  return (
    <div className="login-container">
      <LogoSVG />
      <Input 
        placeholder="Enter your name..."
        onSubmit={onSubmit}
      />
    </div>
  )
}
