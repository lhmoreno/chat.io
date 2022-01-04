import { useEffect, useRef } from 'react'

import { ViewedSVG } from './svgs/Viewed'

import '../styles/components/messageList.css'

export interface MessageProps {
  user_id: string
  text: string
  status: 'sent' | 'received' | 'viewed'
  hour: string
}

interface BoxProps {
  type: 'GET' | 'SEND'
  text: string
  status: 'sent' | 'received' | 'viewed'
  hour: string
}

interface MessageListProps {
  main_user_id: string
  chat?: MessageProps[]
}

export function MessageList({ main_user_id, chat }: MessageListProps) {
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chat && chat.length > 0) {
      messagesRef.current && messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
    }
  }, [chat])

  return (
    <div className="messages-container" ref={messagesRef}>
      { chat && chat.map(({ user_id, text, status, hour }, index) => (
          <Box 
            key={String(index)}
            type={main_user_id === user_id ? 'SEND' : 'GET'}
            text={text}
            status={status}
            hour={hour}
          />
        ))
      }
    </div>
  )
}

function Box({ type, text, status, hour }: BoxProps) {
  return (
    <div className={type === 'GET' ? "message message-get" : "message message-send"}>
      <span>{ hour }</span>
      <div className={status === 'viewed' && type === 'SEND' ? "viewed" : undefined}>
        <p>{ text }</p>
      </div>
      { status === 'viewed' && type === 'SEND' && <ViewedSVG /> }
    </div>
  )
}
