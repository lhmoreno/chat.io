import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

import { Message } from '../../components/Messages'
import { User, Contacts } from '../../components/Contacts'
import { ChatMessages } from '../../components/ChatMessages'

import './styles.css'

const contactsFake: User[] = [
  {
    id: '1',
    name: 'Gideon',
    status: 'Always Online',
    isBot: true
  },
  {
    id: '2',
    name: 'Tagram',
    status: 'Online'
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
  }
]

const messagesFake: Message[] = [
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
    hour: '02:39pm'
  },
  {
    type: 'SEND',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:40pm'
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
    hour: '02:39pm'
  },
  {
    type: 'SEND',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:40pm'
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
    hour: '02:39pm'
  },
  {
    type: 'SEND',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:40pm'
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
    hour: '02:39pm'
  },
  {
    type: 'SEND',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:40pm'
  },
  {
    type: 'SEND',
    text: 'Lorem iposun sauod ldkjfbu dufiusd sdojcu sdufohdsdfouhsd osfsdiojsd iosdjfsdn ',
    hour: '02:40pm'
  }
]

export function Chat() {
  const [isLoading, setIsLoading] = useState(true)
  const [contactActive, setContactActive] = useState<User>()
  const [chatActive, setChatActive] = useState<Message[]>()
  const [contactsList, setContactsList] = useState<User[]>([])
  // const navigate = useNavigate()

  useEffect(() => {
    // const token = localStorage.getItem('token')
    // if (!token) return navigate('/')
    
    setContactsList(contactsFake)
    return setIsLoading(false)
  }, [])

  function onChangeContact(user_id: string) {
    if (user_id === contactActive?.id) return

    const newUserActive = contactsList.find(({ id }) => id === user_id)
    if (!newUserActive) return

    setContactActive(newUserActive)
    return setChatActive(messagesFake)
  }

  if (isLoading) return <img src={process.env.PUBLIC_URL + '/spinner.gif'} alt="Is loading" />

  return (
    <div className="chat-container">
      <Contacts 
        list={contactsList}
        onChangeContact={onChangeContact}
      />
      <ChatMessages 
        contactActive={contactActive}
        messages={chatActive}
      />
    </div>
  )
}
