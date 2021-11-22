import { Document, Types } from 'mongoose'

import { UserModelProps } from '../models/User'

type UserDocument = Document<any, any, UserModelProps> & UserModelProps & { _id: Types.ObjectId }

function render(document: UserDocument) {
  return { id: document._id, name: document.name }
}

function renderMany(documents: UserDocument[]) {
  const contacts = documents.map(document => render(document))

  return contacts
}

export const UserView = { render, renderMany }
