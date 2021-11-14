import { Input } from '../../components/Input'
import { Logo } from '../../assets/Logo'

import './styles.css'

export function Login() {
  return (
    <div className="login-container">
      <Logo />
      <Input 
        placeholder="Enter your name..."
      />
    </div>
  )
}
