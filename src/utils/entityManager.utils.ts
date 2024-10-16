import { EntityManager, RequestContext } from '@mikro-orm/core'
import { IntervalServerError } from './httpErrors.utils'

function getEntityManager(): EntityManager {
  const em = RequestContext.getEntityManager()
  if (!em) {
    throw new IntervalServerError('Entity Manager is not defined')
  }
  return em
}

export { getEntityManager }
