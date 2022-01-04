import { User } from '../types'

function render(user: User) {
  return {
    id: user._id,
    name: user.name,
    unread: user.unread,
    isBot: user.isBot
  }
}

function renderMany(users: User[]) {
  return users.map((user) => render(user))
}

function renderContact(user: User) {
  return {
    id: user._id,
    name: user.name,
    isBot: user.isBot
  }
}

function renderManyContacts(users: User[]) {
  return users.map((user) => renderContact(user))
}

export const UserView = { render, renderMany, renderManyContacts }