
export const loggerMiddleware = store => next => action => {
  console.group("PREVIOUS STATE", store.getState())
  next(action)
  console.groupCollapsed("ACTION", action)
  console.groupEnd("NEXT STATE", store.getState())
}