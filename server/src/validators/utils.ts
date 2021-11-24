import { ServiceError } from '../..'

function isServiceError(err: any): err is ServiceError {
  if (typeof(err.status) !== 'number') return false
  if (typeof(err.error) !== 'string') return false
  if (typeof(err.message_server) !== ('string' || 'undefined')) return false

  return err
}

export const utils = { isServiceError }
