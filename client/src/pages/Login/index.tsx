import { Input } from '../../components/Input'
import { LogoSVG } from '../../assets/Logo'

import './styles.css'

export function Login() {
  return (
    <div className="login-container">
      <LogoSVG />
      <Input 
        placeholder="Enter your name..."
      />
    </div>
  )
}
