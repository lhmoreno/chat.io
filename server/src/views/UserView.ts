import { User } from '../..'

function render(user: User) {
  return {
    name: user.name
  }
}

export const UserView = { render }