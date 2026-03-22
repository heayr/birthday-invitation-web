// src/components/QRModal.tsx
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useEffect } from "react";
import { generateICS, downloadICS } from "@/lib/ics";
import { X, Link as LinkIcon, Download, Calendar } from "lucide-react";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  editLink: string;
  code: string;
}

export default function QRModal({
  isOpen,
  onClose,
  editLink,
  code,
}: QRModalProps) {
  if (!isOpen) return null;

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const downloadQR = (value: string, filename: string) => {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(value)}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddToCalendar = () => {
    const icsContent = generateICS({
      summary: "Юбилей Виталия — 50 лет",
      description: `Приглашаем на юбилей Виталия!\n\nКод для редактирования: ${code}\n\nЕсли будут пожелания или изменения — используйте код.`,
      location:
        "Кафе «Золотой Ключик», просп. Героев, 36/2, Балаково, ТЦ Айсберг",
      startDate: new Date("2026-05-30T17:00:00+04:00"),
      endDate: new Date("2026-05-30T23:00:00+04:00"),
      organizerName: "Организаторы юбилея",
    });
    downloadICS(icsContent, "jubilee-vitaliy-2026.ics");
  };

  // Закрытие по Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

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

          {/* Календарь — только кнопка */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">
              Добавить в календарь
            </h3>
            <div className="flex flex-col gap-3">
              <Button
                variant="default"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handleAddToCalendar}
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
