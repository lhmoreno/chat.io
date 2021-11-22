import { useEffect, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

import { Message } from '../../components/Messages'
import { User, Contacts } from '../../components/Contacts'
import { ChatMessages } from '../../components/ChatMessages'

import './styles.css'

interface MessageServer {
  user_id: string
  text: string
  hour: string
}

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
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return navigate('/')
    
    login()

    async function login() {
      try {
        const { data } = await axios.get('http://localhost:3333/login', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setContactsList(data.contacts)

        const socket = io('http://localhost:3333', {
          auth: { token }
        })

        setIsLoading(false)
      } catch (err) {
        localStorage.removeItem('token')
        navigate('/')
      }
    }
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
