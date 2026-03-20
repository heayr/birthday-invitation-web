import axios, { AxiosError } from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/rsvp",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

export interface RsvpRequest {
  name: string
  email: string
  attending: boolean
  plusOne: number
  comment?: string
}

export interface RsvpResponse {
  success: boolean
  code?: string          // #XXXXXXX
  message?: string
  data?: RsvpRequest & {
    id: number
    code: string
    createdAt: string
    updatedAt: string
  }
  errors?: Array<{ message: string }>
}

export const submitRsvp = async (data: RsvpRequest): Promise<RsvpResponse> => {
  try {
    const res = await api.post<RsvpResponse>("/", data)
    return res.data
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data) {
      throw err.response.data as RsvpResponse
    }
    throw new Error("Не удалось отправить ответ. Попробуйте позже.")
  }
}

export const getRsvpByCode = async (code: string): Promise<RsvpResponse> => {
  try {
    // const cleanCode = code.startsWith('#') ? code.slice(1) : code
    const res = await api.get<RsvpResponse>(`/${code}`);
    return res.data
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 404) {
        throw new Error("Код не найден")
      }
    }
    throw new Error("Ошибка при загрузке данных")
  }
}

export const updateRsvp = async (code: string, data: Partial<RsvpRequest>): Promise<RsvpResponse> => {
  try {
    // const cleanCode = code.startsWith('#') ? code.slice(1) : code
    const res = await api.patch<RsvpResponse>(`/${code}`, data);
    return res.data
  } catch (err) {
    throw new Error("Не удалось обновить ответ")
  }
}