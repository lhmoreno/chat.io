import Redis from 'ioredis'
import { promisify } from 'util'

const client = new Redis()

export function set(key: string, value: string) {
  const fn = promisify(client.set).bind(client)
  return fn(key, value)
}

export function get(key: string) {
  const fn = promisify(client.get).bind(client)
  return fn(key)
}

export function del(value: string) {
  const fn = promisify(client.getdel).bind(client)
  return fn(value)
}

export function getAllKeys() {
  const fn = promisify(client.keys).bind(client)
  return fn('*')
}
