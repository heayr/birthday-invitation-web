// src/sections/RsvpForm.tsx
import { useState } from "react";
import { submitRsvp } from "@/lib/api";
import type { RsvpRequest, RsvpResponse } from "@/lib/api";
import { RsvpFormBase } from "@/components/RsvpFormBase";
import QRModal from "@/components/QRModal"; // default import
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy } from "lucide-react";

export function RsvpForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [response, setResponse] = useState<RsvpResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showQRModal, setShowQRModal] = useState(false);

  const handleSubmit = async (data: RsvpRequest) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await submitRsvp(data);
      setResponse(res);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Не удалось отправить ответ");
    }
  };

  const handleCopyCode = () => {
    if (response?.code) {
      navigator.clipboard.writeText(response.code);
      alert("Код скопирован в буфер обмена!");
    }
  };

  return (
    <section id="rsvp" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Форма */}
        <RsvpFormBase
          onSubmit={handleSubmit}
          isLoading={status === "loading"}
          errorMessage={status === "error" ? errorMessage : undefined}
          submitLabel="Подтвердить участие"
        />

        {/* Блок успеха с QR */}
        {status === "success" && response?.code && (
          <div className="mt-12 text-center space-y-8">
            {/* Успех */}
            <div className="inline-flex items-center justify-center gap-4 bg-green-50 px-8 py-6 rounded-2xl border border-green-200 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
              <h3 className="text-2xl font-bold text-green-800">
                Спасибо! Ваш ответ принят
              </h3>
            </div>

            {/* Код */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-lg mx-auto space-y-6">
              <p className="text-lg text-gray-600">
                Ваш код для редактирования ответа:
              </p>

              <div className="flex items-center justify-center gap-5 bg-gray-50 p-6 rounded-xl font-mono text-4xl font-bold tracking-widest text-primary-700">
                {response.code}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-14 w-14 rounded-full"
                  onClick={handleCopyCode}
                  title="Скопировать код"
                >
                  <Copy className="h-7 w-7" />
                </Button>
              </div>

              <p className="text-sm text-gray-500">
                Сохраните этот код — он понадобится, если захотите изменить
                ответ.
              </p>

              <Button
                size="lg"
                className="w-full mt-2"
                onClick={() => setShowQRModal(true)}
              >
                Показать QR-коды и добавить в календарь
              </Button>
            </div>

            {/* Модалка */}
            <QRModal
              isOpen={showQRModal}
              onClose={() => setShowQRModal(false)}
              editLink={`${window.location.origin}/edit/${response.code}`}
              code={response.code}
            />
          </div>
        )}
      </div>
    </section>
  );
}
