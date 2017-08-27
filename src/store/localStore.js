import * as LocalForage from 'localforage'

export const saveState = (state) => {
  LocalForage.setItem("state", state)
  .catch(err => {
    console.log("Could not save data ", err)
  })
}

export const getState = () => {
  return LocalForage.getItem("state").then(state => {
    if(state === null) {
      console.log("Local State is empty")
      return undefined
    }
    return state
  })
}