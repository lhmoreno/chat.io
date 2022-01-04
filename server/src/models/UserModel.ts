import { Schema, model } from 'mongoose'

import { UnreadMessage, User } from '../types'

const Unread = new Schema<UnreadMessage>({
  user_id: {
    type: String,
    required: true
  },

  count: {
    type: Number,
    required: true,
    default: 0
  }
}, { _id: false })

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true
  },

  unread: {
    type: [Unread],
    required: true
  },

  isBot: {
    type: Boolean,
    required: false
  }
})

export const UserModel = model<User>('User', UserSchema)
