const socket = io()

window.onload = () => {
  window.addEventListener("storage", ({ key }) => {
    if (key === "contacts") {
    }
  })
  
  socket.on("contacts", (contacts) => {
    createContacts(contacts)
  })
}



function createContacts(contacts) {
  const container = document.querySelector(".contacts-container")
  
  contacts.forEach((contact) => {
    const button = document.createElement("button")
    const icon = document.createElement("img")
    const div = document.createElement("div")
    const name = document.createElement("p")
    const type = document.createElement("p")
    const divider = document.createElement("hr")
    button.className = "contact"
    icon.src = "/static/assets/contact.svg"
    type.className = "type"

    button.onclick = () => localStorage.setItem("contact_active", contact.contact_id)
    name.textContent = contact.name
    type.textContent = contact.type
    div.append(name, type)
    button.append(icon, div)
    
    return container.append(button, divider)
  })
}
