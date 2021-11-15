import { ViewedSVG } from '../../assets/Viewed'

import './styles.css'

interface MessageProps {
  type: 'GET' | 'SEND'
  text: string
  hour: string
  wasViewed?: boolean
}

const messagesFake: MessageProps[] = [
  {
    type: 'GET',
    text: 'Hellou',
    hour: '02:37pm'
  },
  {
    type: 'GET',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:37pm'
  },
  {
    type: 'SEND',
    text: 'Hellou',
    hour: '02:39pm',
    wasViewed: true
  },
  {
    type: 'SEND',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:40pm',
    wasViewed: true
  },
  {
    type: 'SEND',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:40pm'
  },

  {
    type: 'GET',
    text: 'Hellou',
    hour: '02:37pm'
  },
  {
    type: 'GET',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:37pm'
  },
  {
    type: 'SEND',
    text: 'Hellou',
    hour: '02:39pm',
    wasViewed: true
  },
  {
    type: 'SEND',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:40pm',
    wasViewed: true
  },
  {
    type: 'SEND',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:40pm'
  },
  {
    type: 'GET',
    text: 'Hellou',
    hour: '02:37pm'
  },
  {
    type: 'GET',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:37pm'
  },
  {
    type: 'SEND',
    text: 'Hellou',
    hour: '02:39pm',
    wasViewed: true
  },
  {
    type: 'SEND',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:40pm',
    wasViewed: true
  },
  {
    type: 'SEND',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:40pm'
  },
  {
    type: 'GET',
    text: 'Hellou',
    hour: '02:37pm'
  },
  {
    type: 'GET',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:37pm'
  },
  {
    type: 'SEND',
    text: 'Hellou',
    hour: '02:39pm',
    wasViewed: true
  },
  {
    type: 'SEND',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:40pm',
    wasViewed: true
  },
  {
    type: 'SEND',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:40pm'
  }
]

export function Messages() {

  return (
    <div className="messages-container">
      { messagesFake.map(({ type, text, hour, wasViewed }, index) => (
          <Message 
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

function Message({ type, text, hour, wasViewed }: MessageProps) {
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
