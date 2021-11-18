import { Fragment } from 'react'

import { BotSVG } from  '../../assets/Bot'
import { PeopleSVG } from  '../../assets/People'

import './styles.css'

export interface User {
  id: string
  name: string
  status: 'Offline' | 'Online' | 'Writing...' | 'Always Online'
  isBot?: boolean
  queue_size?: number
  haveSelection?: boolean
}

interface ContactProps extends User {
  onClick?: (user_id: string) => void
}

interface ContactsProps {
  list: User[]
  onChangeContact?: (user_id: string) => void
}

export function Contacts({ list, onChangeContact }: ContactsProps) {
  return (
    <div className="contacts-container">
      { list.map(({ id, name, status, isBot, queue_size, haveSelection }, index) => (
          <Fragment key={id}>
            <Contact 
              id={id}
              name={name}
              status={status}
              isBot={isBot}
              queue_size={queue_size}
              haveSelection={haveSelection}
              onClick={onChangeContact}
            />
            { index !== list.length - 1 && <hr /> }
          </Fragment>
        ))
      }
    </div>
  )
}

function Contact({ id, name, status, isBot, queue_size, haveSelection, onClick }: ContactProps) {
  return (
    <button 
      className={haveSelection ? "selected" : undefined}
      onClick={() => onClick && onClick(id)}
    >
      { !isBot ? <PeopleSVG /> : <BotSVG /> }
      <div>
        <p>{ name }</p>
        <p>{ status }</p>
      </div>
      { queue_size && (
          <span>
            { queue_size }
          </span>
        ) 
      }
    </button>
  )
}
