import { IUser } from "../user"

export interface IWebsite {
  id: number
  name: string
  url: string
  adminId?: number
  users?: IUser[]
  createdAt?: Date
  updatedAt?: Date
}
