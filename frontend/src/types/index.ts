export interface RsvpFormData {
  name: string
  email?: string
  attending: boolean
  plusOne: number
  alcohol?: string
  comment?: string
}

export type RsvpStatus = "idle" | "loading" | "success" | "error"

export interface ApiError {
  message: string
  errors?: Array<{ message: string }>
}