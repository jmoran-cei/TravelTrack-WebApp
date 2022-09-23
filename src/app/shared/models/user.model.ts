

export interface User {
  id?: number // had to add this for in mem web api
  username: string
  password: string
  firstName: string
  lastName: string
  pictureURL: string
}
