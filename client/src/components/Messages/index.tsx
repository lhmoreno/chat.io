import { ViewedSVG } from '../../assets/Viewed'

import './styles.css'

export interface Message {
  type: 'GET' | 'SEND'
  text: string
  hour: string
  wasViewed?: boolean
}

interface MessagesProps {
  chat?: Message[]
}

export function Messages({ chat }: MessagesProps) {
  return (
    <div className="messages-container">
      { chat && chat.map(({ type, text, hour, wasViewed }, index) => (
          <Box 
            key={String(index)}
            type={type}
            text={text}
            hour={hour}
            wasViewed={wasViewed}
          />
        ))
      }
    </div>
  )
}

function Box({ type, text, hour, wasViewed }: Message) {
  return (
    <div className={type === 'GET' ? "message message-get" : "message message-send"}>
      <span>{ hour }</span>
      <div className={wasViewed ? "viewed" : undefined}>
        <p>{ text }</p>
      </div>
      { wasViewed && <ViewedSVG /> }
    </div>
  )
}
