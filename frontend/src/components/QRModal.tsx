// src/components/QRModal.tsx
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { X, Link as LinkIcon, Download, Calendar } from "lucide-react";
import { cn } from "@/lib/cn";
import { useEffect } from "react";

// ────────────────────────────────────────────────
// Генерация .ics прямо в компоненте (DRY: можно вынести позже)
// ────────────────────────────────────────────────
const generateICS = (): string => {
  const summary = "Юбилей Виталия — 50 лет";
  const description =
    "Приглашаем на юбилей Виталия!\n\nКод для редактирования: [будет показан после отправки]\n\nЖдём всех в хорошем настроении!";
  const location = "Балаково (точный адрес объявим ближе к дате)";
  const start = new Date("2026-05-29T17:00:00+04:00"); // Балаково — UTC+4
  const end = new Date("2026-05-29T23:00:00+04:00");

  const formatDate = (date: Date) =>
    date
      .toISOString()
      .replace(/-|:|\.\d{3}/g, "")
      .slice(0, -1) + "Z";

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Grok xAI//Jubilee Invitation//RU",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@vitaliy-jubilee`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${summary.replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
    `LOCATION:${location.replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
    "ORGANIZER;CN=Организаторы юбилея:",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
};

// ────────────────────────────────────────────────
// Компонент
// ────────────────────────────────────────────────
interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  editLink: string; // https://.../edit/КОД
  code: string; // чистый код без #
}

export default function QRModal({
  isOpen,
  onClose,
  editLink,
  code,
}: QRModalProps) {
  // Закрытие по Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Скачивание QR как PNG (через внешний API — надёжно и быстро)
  const downloadQR = (value: string, filename: string) => {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(value)}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank"; // безопасность
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Скачивание .ics
  const downloadICS = () => {
    const content = generateICS();
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "jubilee-vitaliy-2026.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6"
      onClick={handleBackdrop}
    >
      <div
        className={cn(
          "relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-y-auto max-h-[90vh]",
          "animate-in fade-in zoom-in-95 duration-300",
        )}
      >
        {/* Sticky заголовок */}
        <div className="sticky top-0 bg-white border-b px-6 py-5 z-10">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            QR-коды приглашения
          </h2>
          <p className="text-center text-gray-600 mt-1 text-sm">
            Сохраните или отсканируйте
          </p>
        </div>

        {/* Контент */}
        <div className="p-6 space-y-10">
          {/* QR для редактирования */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">
              Изменить ответ позже
            </h3>
            <div className="flex justify-center bg-white p-4 rounded-xl border shadow-sm">
              <QRCodeSVG
                value={editLink}
                size={220}
                level="Q"
                bgColor="#ffffff"
                fgColor="#1d4ed8"
                className="max-w-full h-auto w-full sm:w-[220px]"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(editLink)}
                className="flex-1"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Скопировать ссылку
              </Button>
              <Button
                variant="default"
                size="sm"
                className="flex-1 bg-primary-600 hover:bg-primary-700"
                onClick={() => downloadQR(editLink, `edit-qr-${code}.png`)}
              >
                <Download className="w-4 h-4 mr-2" />
                Скачать PNG
              </Button>
            </div>
          </div>

          {/* Блок календаря — только кнопка */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">
              Добавить в календарь
            </h3>
            <div className="flex flex-col gap-3">
              <Button
                variant="default"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={downloadICS}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Добавить в календарь (.ics)
              </Button>
              <p className="text-center text-sm text-gray-500">
                Откроется в Google, Apple, Outlook или др.
              </p>
            </div>
          </div>
        </div>

        {/* Кнопка закрытия */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
