// src/types/index.ts
import { Rsvp } from '@prisma/client'

export interface RsvpCreateInput {
  name: string
  email?: string
  attending: boolean
  plusOne: number
  alcohol?: string       // ← добавлено
  comment?: string
}

export interface RsvpUpdateInput {
  name?: string
  email?: string
  attending?: boolean
  plusOne?: number
  alcohol?: string       // ← добавлено
  comment?: string
}

export interface RsvpResponse extends Rsvp {} // или Partial<Rsvp> если нужно скрыть поля