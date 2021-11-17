import { ServiceError, UserToken } from '.'

export function isServiceError(err: any): err is ServiceError {
  if (typeof(err.status) !== 'number') return false
  if (typeof(err.message) !== 'string') return false

  return err
}

export function isUserToken(payload: any): payload is UserToken {
  if (typeof(payload.user_id) !== 'string') return false

  return payload
}
