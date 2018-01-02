
export const loggerMiddleware = store => next => action => {
  console.group("PREVIOUS STATE", store.getState())
  console.groupCollapsed("ACTION", action)
  console.groupEnd()
  console.group("NEXT STATE", store.getState())
  console.groupEnd()
  console.groupEnd()
  next(action)
}