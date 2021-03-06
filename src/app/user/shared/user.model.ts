export interface IUser {
  username: string
  password: string
  firstName: string
  lastName: string
  address: never[] // temporarily type never
  pictureURL: string
}
