import { Schema, model } from 'mongoose'

export interface MessageModelProps {
  user_id: string
  text: string
  hour: string
}

export interface ChatModelProps {
  users: [string, string]
  messages: MessageModelProps[]
}

const MessageSchema = new Schema<MessageModelProps>({
  user_id: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  hour: {
    type: String,
    required: true
  }
})

const ChatSchema = new Schema<ChatModelProps>({
  users: {
    type: [String, String],
    required: true
  },

  messages: {
    type: [MessageSchema],
    required: true
  }
})

export const ChatModel = model<ChatModelProps>('Chat', ChatSchema)
