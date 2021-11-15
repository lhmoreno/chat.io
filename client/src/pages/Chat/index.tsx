import { Contacts } from '../../components/Contacts'
import { ChatMessages } from '../../components/ChatMessages'

import './styles.css'

export function Chat() {
  return (
    <div className="chat-container">
      <Contacts />
      <ChatMessages 
        contact={{
          id: '1',
          name: 'Gideon',
          status: 'Always Online',
          isBot: true
        }}
        messages={[]}
      />
    </div>
  )
}
