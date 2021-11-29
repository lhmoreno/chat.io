import { connect } from 'mongoose'

interface MongoConfig {
  user: string
  password: string
  host: string
  port: string
  name: string
}

export function connectMongo({ user, password, host, port, name }: MongoConfig) {
  return connect(`mongodb://${user}:${password}@${host}:${port}/${name}?authSource=admin`)
}
