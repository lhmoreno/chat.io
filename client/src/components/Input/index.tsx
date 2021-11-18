import { ChangeEvent, FormEvent, useRef, useState } from 'react'

import { ArrowSVG } from '../../assets/Arrow'

import './styles.css'

interface InputProps {
  placeholder?: string
  minLenght?: number
  onSubmit?: (name: string) => void
}

export function Input({ placeholder, minLenght, onSubmit }: InputProps) {
  const [canSubmit, setCanSubmit] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function onMySubmit(event: FormEvent) {
    event.preventDefault()
    const name = inputRef.current?.value
    if (!name || !onSubmit) return

    const lenght = minLenght ? minLenght : 3
    
    if (name.trim().length < lenght) return

    return onSubmit(name)
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value
    const lenght = minLenght ? minLenght : 3
    
    if (name.trim().length >= lenght) {
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
          <ArrowSVG />
        </button>
      )}

    </form>
  )
}
