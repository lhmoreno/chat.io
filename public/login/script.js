const params = new URLSearchParams(window.location.search)
const url_chat = window.location.origin + "/chat"

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
  const name = params.get("name")

  if (name) {
    const input = document.querySelector("input")
    input.value = name
  }

  // if (user_id) {
  //   const { status, data } = await axios.post(window.location.origin + "/api/login", { user_id })
    
  //   if (status === 200) {

  //   } 
    
  //   if (status === 201) {
  //     localStorage.setItem("user_id", data.user_id)
  //     localStorage.setItem("messages", JSON.stringify([]))
  //   }

  //   // return navigateChat()
  // } else {
  //   const input = document.querySelector("input")
  
  //   input.onchange = (event) => {
  //     const name = event.target.value
    
  //     // return navigateChat()
  //   }
  // }
}

function navigateChat() {
  return window.location.href = url_chat
}
