import { Fragment } from 'react'

import { Input } from  './Input'
import { MessageProps, MessageList } from  './MessageList'

import { LogoSVG } from  './svgs/Logo'
import { BotSVG } from  './svgs/Bot'
import { PeopleSVG } from  './svgs/People'

import '../styles/components/chatBox.css'

export interface ContactActive {
  id: string
  name: string
  // status: 'Offline' | 'Online' | 'Writing...' | 'Always Online'
  isBot?: boolean
}

interface ChatMessagesProps {
  main_user_id: string
  contactActive?: ContactActive
  messages?: MessageProps[]
  onSubmitMessage?: (text: string) => Promise<void>
}

export function ChatBox({ main_user_id, contactActive, messages, onSubmitMessage }: ChatMessagesProps) {
  // console.log(messages)
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
                {/* <p>{ contactActive.status }</p> */}
              </div>
            </header>
      
            <MessageList 
              chat={messages} 
              main_user_id={main_user_id}
            />
      
            <footer>
              <Input 
                placeholder="Type a message..."
                minLenght={1}
                onSubmit={onSubmitMessage}
              />
            </footer>
          </Fragment>
        )
      }
    </div>
  )
}
