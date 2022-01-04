import { Fragment } from 'react'

import { BotSVG } from  './svgs/Bot'
import { PeopleSVG } from  './svgs/People'

import '../styles/components/contactList.css'

export interface User {
  id: string
  name: string
  // status: 'Offline' | 'Online' | 'Writing...' | 'Always Online'
  unread: number
  haveSelection?: boolean
  isBot?: boolean
}

interface ContactProps extends User {
  onClick?: (id: string) => void
}

interface ContactsProps {
  list: User[]
  onChangeContact?: (id: string) => void
}

export function ContactList({ list, onChangeContact }: ContactsProps) {
  return (
    <div className="contacts-container">
      { list.map(({ id, name, unread, haveSelection, isBot }, index) => (
          <Fragment key={id}>
            <Contact 
              id={id}
              name={name}
              // status={status}
              isBot={isBot}
              unread={unread}
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

function Contact({ id, name, unread, isBot, haveSelection, onClick }: ContactProps) {
  return (
    <button 
      className={haveSelection ? "selected" : undefined}
      onClick={() => onClick && onClick(id)}
    >
      { !isBot ? <PeopleSVG /> : <BotSVG /> }
      <div>
        <p>{ name }</p>
        {/* <p>{ status }</p> */}
      </div>
      { unread > 0 && (
          <span>
            { unread }
          </span>
        ) 
      }
    </button>
  )
}
