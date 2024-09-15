import { ReactNode } from "react"

export type UserType = {
    email: string | null,
    uid: string
}

export type AuthContextProviderType = {
    children: ReactNode
}

export type AuthContextType = {
    user: UserType | null
}
