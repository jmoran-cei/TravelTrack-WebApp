export interface IUser {
  id?: number // had to add this for in mem web api
  username: string
  password: string
  firstName: string
  lastName: string
  address: never[] // temporarily type never
  pictureURL: string
}
