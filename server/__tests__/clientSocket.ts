import { io } from 'socket.io-client'

export function createClientSocket() {
  const client = io('http://localhost:3333', {
    auth: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNSIsImlhdCI6MTYzNzE1OTM0OX0.3TPvbihEvIbaGGzyxr_IiOur575kkgaXaSpAZ6jNvyM'
    }
  })

  client.on('ADD_CONTACT', (contact: { user_id: string, name: string }) => {})
  client.on('GET_MESSAGE', (message: { user_id: string, text: string, hour: string }) => console.log(message))
  
  client.on('disconnect', (origin) => {
    const type = origin.split(' ')[1]
  
    if (type === 'server') {
      console.log('Not authorized!')
    }
  })
}
