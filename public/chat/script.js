const name = new URLSearchParams(window.location.search).get("name")
let app_messages = {}

window.onload = () => {
  const socket = io({ query: { name } })

  const onClickContact = (name) => {
    const onChangeInput = (message) => socket.emit("send_message", { message, name })

    let messages = !!app_messages[name] ? app_messages[name] : []

    createChat(name, messages, onChangeInput)
  }
  
  socket.on("login", ({ contacts, messages }) => {
    contacts.forEach((name) => createContact(name, onClickContact))
    app_messages = messages
  })
  
  socket.on("contact", (name) => createContact(name, onClickContact))
  socket.on("get_message", (from, message) => {
    if (!!app_messages[from]) {
      app_messages[from] = [...app_messages[from], message]
    } else {
      app_messages[from] = [message]
    }

    const nameChatOpen = document.querySelector("h1").textContent

    if (from === nameChatOpen || message.type === "send") createMessage(message)
  })
}

function createContact(textName, onClickContact) {
  const container = document.querySelector(".contacts-container")
  const button = document.createElement("button")
  const icon = document.createElement("img")
  const name = document.createElement("p")
  const divider = document.createElement("hr")
  
  button.className = "contact"
  button.onclick = () => onClickContact(textName)
  icon.src = "/static/chat/contact.svg"
  name.textContent = textName
  button.append(icon, name)
  
  return container.append(button, divider)
}

function createMessage({ text, type }) {
  const container = document.querySelector(".messages-container")
  const message = document.createElement("div")

  message.textContent = text
  message.className = type

  return container.append(message)
}

function createChat(name, messages, onChangeInput) {
  const h1 = document.querySelector("h1")
  const chat = document.querySelector(".chat-container")
  const messages_container = document.querySelector(".messages-container")
  let input = document.querySelector("input")

  if (!input) {
    input = document.createElement("input")
    input.type = "text"
    input.placeholder = "Type a message"
    chat.append(input)
  } 
  
  h1.textContent = name
  messages_container.innerHTML = ""
  input.onchange = (event) => {
    const message = event.target.value
    input.value = ""

    return onChangeInput(message)
  }

  return messages.forEach((message) => createMessage(message))
}
