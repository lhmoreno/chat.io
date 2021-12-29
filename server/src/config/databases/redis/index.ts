import Redis from 'ioredis'
import { promisify } from 'util'

const client = new Redis()

function set(key: string, value: string) {
  const fn = promisify(client.set).bind(client)
  return fn(key, value)
}

function get(key: string) {
  const fn = promisify(client.get).bind(client)
  return fn(key)
}

function del(value: string) {
  const fn = promisify(client.getdel).bind(client)
  return fn(value)
}

function getAllKeys() {
  const fn = promisify(client.keys).bind(client)
  return fn('*')
}

function clear() {
  const fn = promisify(client.flushdb).bind(client)
  return fn()
}

export const redis = { set, get, del, getAllKeys, clear }