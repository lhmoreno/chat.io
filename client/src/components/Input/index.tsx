import { ChangeEvent, FormEvent, useRef, useState } from 'react'

import { Arrow } from '../../assets/Arrow'

import './styles.css'

interface InputProps {
  placeholder?: string
  onSubmit?: (name: string) => void
}

export function Input({ placeholder, onSubmit }: InputProps) {
  const [canSubmit, setCanSubmit] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function onMySubmit(event: FormEvent) {
    event.preventDefault()
    const name = inputRef.current?.value

    if (name && onSubmit) return name
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value
    
    if (name.trim().length >= 3) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }

  return (
    <form 
      className="input"
      onSubmit={onMySubmit}
    >
      <input 
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />

      { canSubmit && (
        <button
          type="submit"
        >
          <Arrow />
        </button>
      )}

    </form>
  )
}
