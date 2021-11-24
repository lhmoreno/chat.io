import { Schema, model } from 'mongoose'

import { User } from '../..'

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true
  },

  isBot: {
    type: Boolean,
    required: false
  }
})

export const UserModel = model<User>('User', UserSchema)
