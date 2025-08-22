import type { User } from "./user.type"

export interface Card {
    id: string
    name: string
    user: User
    code: string
    type: string
    quantity: number
    image: string
}