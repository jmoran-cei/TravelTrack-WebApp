export interface User {
  username: string
  password: string
  firstName: string
  lastName: string
  address: never[] // temporarily type never
  pictureURL: string
}
