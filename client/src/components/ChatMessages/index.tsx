import { LogoSVG } from  '../../assets/Logo'
import { BotSVG } from  '../../assets/Bot'
import { PeopleSVG } from  '../../assets/People'
import { Input } from  '../Input'
import { Messages } from  '../Messages'

import './styles.css'
import { Fragment } from 'react'

interface ChatMessagesProps {
  contact?: {
    id: string
    name: string
    status: 'Offline' | 'Online' | 'Writing...' | 'Always Online'
    isBot?: boolean
  }
  messages?: []
}

export function ChatMessages({ contact, messages }: ChatMessagesProps) {
  return (
    <div className="chat-messages-container">
      <span className={contact && messages ? 'dark' : undefined}>
        <LogoSVG />
        { !contact && !messages && <p>Start a chat with someone</p> }
        { contact && !messages && <p>Send the first message of the conversation!</p> }
      </span>

      { contact && (
          <Fragment>
            <header>
              { contact.isBot ? <BotSVG /> : <PeopleSVG/> }
              <div>
                <p>{ contact.name }</p>
                <p>{ contact.status }</p>
              </div>
            </header>
      
            <Messages />
      
            <footer>
              <Input 
                placeholder="Type a message..."
                minLenght={1}
              />
            </footer>
          </Fragment>
        )
      }
    </div>
  )
}
