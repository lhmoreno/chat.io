import { User } from '../..'

function render(user: User) {
  return {
    id: user._id,
    name: user.name,
    isBot: user.isBot
  }
}

function renderMany(users: User[]) {
  return users.map((user) => render(user))
}

export const UserView = { render, renderMany }