const socket = io()
let myContacts = []
let myMessages = []
let contact_active = undefined

window.onload = () => {
  socket.on("contacts", (contacts) => {
    myContacts = contacts
    if (contact_active) {
      const _contacts = myContacts.map((contact) => {
        if (contact.contact_id === contact_active) return { ...contact, active: true }
    
        return contact
      })

      createContacts(_contacts)
    } else {
      createContacts(contacts)
    }
  })

  socket.on("message", (message) => {
    saveMessage(message)

    if (message.contact_id === contact_active) {
      const index = myContacts.findIndex(({ contact_id }) => contact_id === message.contact_id)
      updateChat(index)
    }
  })
}

function onClickContact(contact_id, index) {
  // Show input
  if (!contact_active) {
    const form = document.querySelector("form")
    form.style = ""
  }

  // Create contact active
  contact_active = contact_id
  const contacts = myContacts.map((contact) => {
    if (contact.contact_id === contact_id) return { ...contact, active: true }

    return contact
  })

  // Update app
  createContacts(contacts)
  updateChat(index)
}

function createContacts(contacts) {
  const container = document.querySelector(".contacts-container")
  container.innerHTML = ""
  
  contacts.forEach((contact, index) => {
    const button = document.createElement("button")
    const icon = document.createElement("img")
    const div = document.createElement("div")
    const name = document.createElement("p")
    const type = document.createElement("p")
    const divider = document.createElement("hr")
    button.className = contact.active ? "contact contact-active" : "contact"
    icon.src = "/static/assets/contact.svg"
    if (contact.type === "offline") type.style.display = "none"
    type.className = "type"

    button.onclick = () => onClickContact(contact.contact_id, index)
    name.textContent = contact.name
    type.textContent = contact.type
    div.append(name, type)
    button.append(icon, div)
    
    return container.append(button, divider)
  })
}

function updateChat(index) {
  const h1 = document.querySelector("h1")
  const messages_container = document.querySelector(".messages-container")
  const form = document.querySelector("form")
  const messages = JSON.parse(localStorage.getItem(contact_active))

  h1.textContent = myContacts[index].name
  messages_container.innerHTML = ""
  createMessages(messages ? messages : [])
  form.onsubmit = (event) => {
    event.preventDefault()

    const input = document.querySelector("input")
    const message = input.value

    socket.emit("message", { text: message, contact_id: contact_active })

    input.value = ""
  }

  messages_container.scroll(0, messages_container.scrollHeight)
}

function createMessages(messages) {
  const container = document.querySelector(".messages-container")

  messages.forEach((message) => {
    const div = document.createElement("div")
    const message_p = document.createElement("p")
    const hour = document.createElement("p")
    div.className = message.type.toLowerCase()
    message_p.className = "message " + message.type.toLowerCase()
    hour.className = "hour"
    
    message_p.textContent = message.text
    hour.textContent = message.hour
    div.append(message_p, hour)
  
    return container.append(div)
  })
}

function saveMessage({ contact_id, text, hour, type }) {
  const messages = JSON.parse(localStorage.getItem(contact_id))

  if (!messages) {
    localStorage.setItem(contact_id, JSON.stringify([{ text, hour, type }]))
  } else {
    localStorage.setItem(contact_id, JSON.stringify([...messages, { text, hour, type }]))
  }
}
