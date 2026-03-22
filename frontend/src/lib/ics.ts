// src/lib/ics.ts
// Утилита для генерации iCalendar (.ics) файла на клиенте

interface EventData {
  summary: string
  description?: string
  location?: string
  startDate: Date
  endDate?: Date
}

/**
 * Генерирует строку в формате iCalendar (.ics)
 */
export function generateICS(data: EventData): string {
  const {
    summary,
    description = "",
    location = "",
    startDate,
    endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000), // +6 часов по умолчанию
  } = data

  const formatDate = (date: Date) =>
    date.toISOString().replace(/-|:|\.\d{3}/g, "").slice(0, -1) + "Z"

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@vitaliy-jubilee`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${summary.replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
    location ? `LOCATION:${location.replace(/\n/g, "\\n").replace(/,/g, "\\,")}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]

  return lines.join("\r\n").trim()
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