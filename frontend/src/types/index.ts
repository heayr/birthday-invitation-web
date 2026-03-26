export interface RsvpFormData {
  name: string;
  email?: string;
  attending: boolean;
  plusOne: number;
  alcohol?: string;
  comment?: string;
}

export type RsvpData = RsvpFormData;

// Поле success + message — служебные, приходят от API
export interface RsvpResponse extends RsvpData {
  success: boolean;
  message?: string;
  code?: string;        // при успешном создании может быть код
  errors?: Array<{ message: string }>;
}

export type RsvpStatus = "idle" | "loading" | "success" | "error";

export interface ApiError {
  message: string;
  errors?: Array<{ message: string }>;
}