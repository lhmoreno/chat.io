import { Schema, model } from 'mongoose'

export interface UserModelProps {
  name: string
}

const UserSchema = new Schema<UserModelProps>({
  name: {
    type: String,
    required: true
  }
})

export const UserModel = model<UserModelProps>('User', UserSchema)
