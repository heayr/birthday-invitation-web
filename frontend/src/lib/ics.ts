// src/lib/ics.ts
// Утилита для генерации iCalendar (.ics) файла на клиенте

interface EventData {
  summary: string
  description?: string
  location?: string
  startDate: Date
  endDate?: Date
  organizerName?: string
  organizerEmail?: string
}

/**
 * Генерирует строку в формате iCalendar (.ics)
 * @returns string — содержимое .ics файла
 */
export function generateICS(data: EventData): string {
  const {
    summary,
    description = "",
    location = "Балаково (точный адрес будет объявлен ближе к дате)",
    startDate,
    endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000), // по умолчанию +6 часов
    organizerName = "Организаторы юбилея Виталия",
    organizerEmail = "",
  } = data

  // Форматируем дату в iCal-формат (UTC, без миллисекунд)
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d{3}/g, "").slice(0, -1) + "Z"
  }

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Grok xAI//Birthday Invitation//RU",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@vitaliy-jubilee-2026`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${summary.replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
    `LOCATION:${location.replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
    organizerEmail
      ? `ORGANIZER;CN=${organizerName}:mailto:${organizerEmail}`
      : `ORGANIZER;CN=${organizerName}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]

  return lines.join("\r\n")
}

/**
 * Скачивает .ics файл
 */
export function downloadICS(
  icsContent: string,
  filename = "jubilee-vitaliy-2026.ics"
) {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}