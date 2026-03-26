import axios, { AxiosError } from "axios"

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
//   // baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/rsvp", когда делаем локально разработку - используем localhost 
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 10000,
// })

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.birthday.nologs.site",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
})



export interface RsvpRequest {
  name: string
  email?: string
  attending: boolean
  plusOne: number
  alcohol?: string
  comment?: string
}

export interface RsvpResponse {
  success: boolean
  code?: string
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
    const res = await api.post<RsvpResponse>("/rsvp", data)
    return res.data
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data) {
      throw err.response.data as RsvpResponse
    }
    throw new Error("Не удалось отправить ответ. Попробуйте позже.")
  }
}

// export const getRsvpByCode = async (code: string): Promise<RsvpResponse> => {
//   try {
//     // const cleanCode = code.startsWith('#') ? code.slice(1) : code
//     const res = await api.get<RsvpResponse>(`/rsvp${code}`);
//     return res.data
//   } catch (err) {
//     if (err instanceof AxiosError) {
//       if (err.response?.status === 404) {
//         throw new Error("Код не найден")
//       }
//     }
//     throw new Error("Ошибка при загрузке данных")
//   }
// }

export const getRsvpByCode = async (code: string): Promise<RsvpResponse> => {
  try {
    const res = await api.get<RsvpResponse>(`/rsvp/${encodeURIComponent(code)}`);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 404) {
        throw new Error("Код не найден");
      }
    }
    throw new Error("Ошибка при загрузке данных");
  }
}


// export const updateRsvp = async (code: string, data: Partial<RsvpRequest>): Promise<RsvpResponse> => {
//   try {
//     // const cleanCode = code.startsWith('#') ? code.slice(1) : code
//     const res = await api.patch<RsvpResponse>(`/rsvp${code}`, data);
//     return res.data
//   } catch (err) {
//     throw new Error("Не удалось обновить ответ")
//   }
// }

export const updateRsvp = async (code: string, data: Partial<RsvpRequest>): Promise<RsvpResponse> => {
  try {
    const res = await api.patch<RsvpResponse>(`/rsvp/${encodeURIComponent(code)}`, data);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data) {
      throw err.response.data as RsvpResponse;
    }
    throw new Error("Не удалось обновить ответ");
  }
}


// ==================== ADMIN API ====================

export interface AdminRsvp {
  id: number;
  code: string;
  name: string;
  email: string | null;
  attending: boolean;
  plusOne: number;
  alcohol: string | null;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminResponsesResponse {
  success: boolean;
  data: AdminRsvp[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const adminApi = {
  /** Получить список всех ответов (для админки) */
  getResponses: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    attending?: boolean;
  } = {}): Promise<AdminResponsesResponse> => {
    const queryParams = new URLSearchParams();

    if (params.page !== undefined) queryParams.set('page', params.page.toString());
    if (params.limit !== undefined) queryParams.set('limit', params.limit.toString());
    if (params.search?.trim()) queryParams.set('search', params.search.trim());
    if (params.attending !== undefined) queryParams.set('attending', params.attending.toString());

    try {
      const response = await api.get<AdminResponsesResponse>(
        `/rsvp/admin/all?${queryParams.toString()}`,
        {
          // Basic Auth для админки
          auth: {
            username: 'admin',
            password: import.meta.env.VITE_ADMIN_PASSWORD || '',
          },
        }
      );
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data) {
        throw err.response.data;
      }
      throw new Error('Не удалось загрузить ответы гостей');
    }
  },
};