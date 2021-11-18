import { Fragment } from 'react'

import { LogoSVG } from  '../../assets/Logo'
import { BotSVG } from  '../../assets/Bot'
import { PeopleSVG } from  '../../assets/People'
import { Input } from  '../Input'
import { Message, Messages } from  '../Messages'

import './styles.css'

export interface ContactActive {
  id: string
  name: string
  status: 'Offline' | 'Online' | 'Writing...' | 'Always Online'
  isBot?: boolean
}

interface ChatMessagesProps {
  contactActive?: ContactActive
  messages?: Message[]
}

export function ChatMessages({ contactActive, messages }: ChatMessagesProps) {
  return (
    <div className="chat-messages-container">
      <span className={contactActive && messages && messages.length > 0 ? 'dark' : undefined}>
        <LogoSVG />
        { !contactActive && <p>Start a chat with someone</p> }
        { contactActive && messages?.length === 0 && <p>Send the first message of the conversation!</p> }
      </span>

      { contactActive && (
          <Fragment>
            <header>
              { contactActive.isBot ? <BotSVG /> : <PeopleSVG/> }
              <div>
                <p>{ contactActive.name }</p>
                <p>{ contactActive.status }</p>
              </div>
            </header>
      
            <Messages chat={messages} />
      
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
