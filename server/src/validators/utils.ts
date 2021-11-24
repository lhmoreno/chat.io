import { ServiceError, JwtPayload } from '../..'
import { JsonWebTokenError } from 'jsonwebtoken'

function isServiceError(err: any): err is ServiceError {
  if (typeof(err.status) !== 'number') return false
  if (typeof(err.error) !== 'string') return false
  if (typeof(err.message_server) !== ('string' && 'undefined')) return false

  return err
}

function isJwtPayload(s: any): s is JwtPayload {
  if (typeof(s.user_id) !== 'string') return false

  return s
}

function isJsonWebTokenError(err: any): err is JsonWebTokenError {
  if (err.name !== 'JsonWebTokenError') return false

  return err
}

export const utils = { isServiceError, isJwtPayload, isJsonWebTokenError }
