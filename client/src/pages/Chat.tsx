import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import socketio from 'socket.io-client'

import { MessageProps } from '../components/MessageList'
import { User, ContactList } from '../components/ContactList'
import { ChatBox } from '../components/ChatBox'

import '../styles/pages/chat.css'

interface UserServerProps {
  id: string,
  name: string,
  unread: Array<{
    user_id: string
    count: number
  }>,
  isBot?: boolean
}

interface ContactServerProps {
  id: string
  name: string
  isBot?: boolean
}

let token: string | null = null
let main_user_id: string = ''

export function Chat() {
  const [isLoading, setIsLoading] = useState(true)
  const [contactActive, setContactActive] = useState<User>()
  const [chatActive, setChatActive] = useState<MessageProps[]>([])
  const [contactsList, setContactsList] = useState<User[]>([])
  const [newMessage, setNewMessage] = useState<MessageProps>()
  const navigate = useNavigate()

  useEffect(() => {
    token = localStorage.getItem('token')
    if (!token) return navigate('/')
    
    start()

    async function start() {
      const user = await login()
      if (user) {
        main_user_id = user.id
        const contacts = await findContacts(user.unread)
        contacts && setContactsList(contacts)
      }

      const socket = socketio('http://localhost:3333', {
        auth: { token }
      })

      socket.on('MESSAGE', (message) => setNewMessage(message))

      return setIsLoading(false)
    }

    async function login() {
      try {
        const { data } = await axios.get('http://localhost:3333/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const user = data.user as UserServerProps

        return user
      } catch (err) {
        localStorage.removeItem('token')
        navigate('/')
      }
    }
    
    async function findContacts(unread: Array<{ user_id: string, count: number }>) {
      try {
        const { data } = await axios.get('http://localhost:3333/contacts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const contacts = data.contacts as ContactServerProps[]
        const newContactsList = contacts.map((contact) => ({ ...contact, unread: 0 }))
        unread.forEach((user) => {
          const index = newContactsList.findIndex(({ id }) => id === user.user_id)

          if (index !== -1) newContactsList[index].unread = user.count
        })

        return newContactsList
      } catch (err) {}
    }
  }, [])

  useEffect(() => {
    if (newMessage) {
      if (newMessage.user_id === contactActive?.id) {
        setChatActive(before => [...before, newMessage])
      } else {
        const newList = contactsList
        const index = newList.findIndex(({ id }) => id === newMessage.user_id)
        newList[index].unread = newList[index].unread + 1

        setContactsList(newList)
        setNewMessage(undefined)
      }
    }
  }, [newMessage, contactsList])

  async function onChangeContact(user_id: string) {
    if (user_id === contactActive?.id) return

    const indexNewUserActive = contactsList.findIndex((contact) => contact.id === user_id)
    if (indexNewUserActive === -1) return

    const newContactsList = contactsList

    const indexUserActive = contactsList.findIndex((contact) => contact.id === contactActive?.id)
    if (indexUserActive !== -1) newContactsList[indexUserActive].haveSelection = false

    newContactsList[indexNewUserActive].haveSelection = true
    newContactsList[indexNewUserActive].unread = 0

    setContactActive(contactsList[indexNewUserActive])
    setContactsList(newContactsList)

    // Find messages
    try {
      const { data } = await axios.get(`http://localhost:3333/chat/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      const messages = data.messages as MessageProps[]
  
      setChatActive(messages)
    } catch (err) {
      setChatActive([])
    }
  }

  async function onSubmitMessage(text: string) {
    try {
      const { data } = await axios.post(`http://localhost:3333/message/${contactActive?.id}`, { message: text }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      const message = data.message as MessageProps
  
      setChatActive(before => [...before, message])
    } catch (err) {}
  }

  if (isLoading) return <img src={process.env.PUBLIC_URL + '/spinner.gif'} alt="Is loading" />

  return (
    <div className="chat-container">
      <ContactList
        list={contactsList}
        onChangeContact={onChangeContact}
      />
      <ChatBox
        main_user_id={main_user_id}
        contactActive={contactActive}
        messages={chatActive}
        onSubmitMessage={onSubmitMessage}
      />
    </div>
  )
}
