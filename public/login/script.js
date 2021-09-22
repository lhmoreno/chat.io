const url_chat = window.location.origin + "/chat"

window.onload = () => {
  const input = document.querySelector("input")

  input.onchange = (event) => {
    const name = event.target.value
  
    return window.location.href = url_chat + `?name=${name}`
  }
}
