// src/components/QRModal.tsx
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef } from "react";
import { generateICS, downloadICS } from "@/lib/ics";
import { X, LinkIcon, Download, Calendar } from "lucide-react";
import "../styles/components/QRModal.css";

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
  const qrRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Converts the locally-rendered SVG to a PNG and triggers download — no external APIs
  const downloadQR = (filename: string) => {
    const svgEl = qrRef.current?.querySelector("svg");
    if (!svgEl) return;

    const size = 400;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
      }, "image/png");
    };

    img.src = url;
  };

  const handleAddToCalendar = () => {
    const icsContent = generateICS({
      summary: "Юбилей Виталия — 45 лет",
      description: `Приглашаем на юбилей Виталия!\n\nКод для редактирования: ${code}\n\nЕсли будут пожелания или изменения — используйте код.`,
      location:
        "Кафе «Золотой Ключик», просп. Героев, 36/2, Балаково, ТЦ Айсберг",
      startDate: new Date("2026-05-30T17:00:00+04:00"),
      endDate: new Date("2026-05-30T23:00:00+04:00"),
      // organizerName: "Организаторы юбилея",
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
    <div className="qr-modal-overlay" onClick={handleBackdrop}>
      <div className="qr-modal">
        {/* Sticky заголовок */}
        <div className="qr-modal-header">
          <h2 className="qr-modal-title">QR-коды приглашения</h2>
          <p className="qr-modal-subtitle">Сохраните или отсканируйте</p>
        </div>

        {/* Контент */}
        <div className="qr-modal-content">
          {/* QR для редактирования */}
          <div className="qr-section">
            <h3 className="qr-section-title">Изменить ответ позже</h3>
            <div className="qr-code-container" ref={qrRef}>
              <QRCodeSVG
                value={editLink}
                size={220}
                level="Q"
                bgColor="#ffffff"
                fgColor="#1d4ed8"
                className="qr-code"
              />
            </div>
            <div className="qr-buttons">
              <button
                onClick={() => navigator.clipboard.writeText(editLink)}
                className="qr-button qr-button-outline"
              >
                <LinkIcon size={16} />
                Скопировать ссылку
              </button>
              <button
                onClick={() => downloadQR(`edit-qr-${code}.png`)}
                className="qr-button qr-button-primary"
              >
                <Download size={16} />
                Скачать PNG
              </button>
            </div>
          </div>

          {/* Календарь — только кнопка */}
          <div className="qr-section">
            <h3 className="qr-section-title">Добавить в календарь</h3>
            <button
              onClick={handleAddToCalendar}
              className="qr-button qr-button-green"
            >
              <Calendar size={20} />
              Добавить в календарь (.ics)
            </button>
            <p className="qr-hint">
              Откроется в Google, Apple, Outlook или др.
            </p>
          </div>
        </div>

        {/* Кнопка закрытия */}
        <button
          className="qr-button-close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
