import { ChangeEvent, FormEvent, useRef, useState } from 'react'

import { ArrowSVG } from './svgs/Arrow'

import '../styles/components/input.css'

interface InputProps {
  placeholder?: string
  minLenght?: number
  onSubmit?: (text: string) => Promise<void>
}

export function Input({ placeholder, minLenght, onSubmit }: InputProps) {
  const [canSubmit, setCanSubmit] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function onMySubmit(event: FormEvent) {
    event.preventDefault()
    const text = inputRef.current?.value
    if (!text || !onSubmit) return

    const lenght = minLenght ? minLenght : 3
    
    if (text.trim().length < lenght) return

    await onSubmit(text)
    setCanSubmit(false)
    return inputRef.current.value = ''
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const text = event.target.value
    const lenght = minLenght ? minLenght : 3
    
    if (text.trim().length >= lenght) {
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
