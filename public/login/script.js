const name = new URLSearchParams(window.location.search).get("name")

/*
  Message: {
    type: "GET" | "SEND"
    text: string
  }
  Messages: {
    contact_id: string
    messages: Message[]
  }
*/

window.onload = async () => {
  if (name) {
    const input = document.querySelector("input")
    input.value = name
  }

  const form = document.querySelector("form")
  form.onsubmit = (event) => {
    event.preventDefault()

    const input = document.querySelector("input")
    const name = input.value.trim()

    if (name === "") return

    return navigateChat(name)
  }
}

function navigateChat(name) {
  return window.location.href = `${window.location.origin}/chat/?name=${name}`
}
