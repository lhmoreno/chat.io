import { Fragment } from 'react'

import { BotSVG } from  '../../assets/Bot'
import { PeopleSVG } from  '../../assets/People'

import './styles.css'

interface ContactProps {
  id: string
  name: string
  status: 'Offline' | 'Online' | 'Writing...' | 'Always Online'
  isBot?: boolean
  queue_size?: number
  haveSelection?: boolean
}

const contactsFake: ContactProps[] = [
  {
    id: '1',
    name: 'Gideon',
    status: 'Always Online',
    isBot: true,
    queue_size: 2,
    haveSelection: true
  },
  {
    id: '2',
    name: 'Tagram',
    status: 'Online',
    queue_size: 4
  },
  {
    id: '3',
    name: 'Poul',
    status: 'Writing...'
  },
  {
    id: '4',
    name: 'off',
    status: 'Offline'
  },
  // {
  //   id: '5',
  //   name: 'Gideon',
  //   status: 'Always Online',
  //   isBot: true,
  //   queue_size: 2
  // },
  // {
  //   id: '6',
  //   name: 'Tagram',
  //   status: 'Online',
  //   queue_size: 4
  // },
  // {
  //   id: '7',
  //   name: 'Poul',
  //   status: 'Writing...'
  // },
  // {
  //   id: '8',
  //   name: 'off',
  //   status: 'Offline'
  // },
  // {
  //   id: '9',
  //   name: 'Gideon',
  //   status: 'Always Online',
  //   isBot: true,
  //   queue_size: 2
  // },
  // {
  //   id: '10',
  //   name: 'Tagram',
  //   status: 'Online',
  //   queue_size: 4
  // },
  // {
  //   id: '11',
  //   name: 'Poul',
  //   status: 'Writing...'
  // },
  // {
  //   id: '12',
  //   name: 'off',
  //   status: 'Offline'
  // },
  // {
  //   id: '13',
  //   name: 'Gideon',
  //   status: 'Always Online',
  //   isBot: true,
  //   queue_size: 2
  // },
  // {
  //   id: '14',
  //   name: 'Tagram',
  //   status: 'Online',
  //   queue_size: 4
  // },
  // {
  //   id: '15',
  //   name: 'Poul',
  //   status: 'Writing...'
  // },
  // {
  //   id: '16',
  //   name: 'off',
  //   status: 'Offline'
  // },
  // {
  //   id: '17',
  //   name: 'Gideon',
  //   status: 'Always Online',
  //   isBot: true,
  //   queue_size: 2
  // },
  // {
  //   id: '18',
  //   name: 'Tagram',
  //   status: 'Online',
  //   queue_size: 4
  // },
  // {
  //   id: '19',
  //   name: 'Poul',
  //   status: 'Writing...'
  // },
  // {
  //   id: '20',
  //   name: 'off',
  //   status: 'Offline'
  // }
]

export function Contacts() {
  return (
    <div className="contacts-container">
      { contactsFake.map(({ id, name, status, isBot, queue_size, haveSelection }, index) => (
          <Fragment key={id}>
            <Contact 
              id={id}
              name={name}
              status={status}
              isBot={isBot}
              queue_size={queue_size}
              haveSelection={haveSelection}
            />
            { index !== contactsFake.length - 1 && <hr /> }
          </Fragment>
        ))
      }
    </div>
  )
}

function Contact({ id, name, status, isBot, queue_size, haveSelection }: ContactProps) {
  return (
    <button className={haveSelection ? "selected" : undefined}>
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
