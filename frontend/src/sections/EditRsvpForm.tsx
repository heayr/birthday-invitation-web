// src/sections/EditRsvpForm.tsx
import { useState } from "react";
import { updateRsvp } from "@/lib/api";
import type { RsvpRequest } from "@/lib/api";
import { RsvpFormBase } from "@/components/RsvpFormBase";
import QRModal from "@/components/QRModal";
import { Button } from "@/components/ui/button"; // если Button ещё используется в проекте, но в этом компоненте мы его заменим на кастомный? — оставляем как есть или перепишем? Лучше заменить на кастомную кнопку для единообразия.
import { CheckCircle2 } from "lucide-react";
import "./../styles/components/EditRsvpForm.css";

interface EditRsvpFormProps {
  initialData: RsvpRequest;
  code: string;
}

export function EditRsvpForm({ initialData, code }: EditRsvpFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");
  const [showQRModal, setShowQRModal] = useState(false);

  const handleSubmit = async (data: any) => {
    setStatus("loading");
    setMessage("");
    try {
      await updateRsvp(code, data);
      setStatus("success");
      setMessage("Ответ успешно обновлён!");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Не удалось обновить ответ");
    }
  };

  return (
    <div className="edit-rsvp">
      <RsvpFormBase
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={status === "loading"}
        errorMessage={status === "error" ? message : undefined}
        submitLabel="Сохранить изменения"
        onCancel={() => window.history.back()}
      />

      {status === "success" && (
        <div className="edit-rsvp-success">
          <div className="edit-rsvp-success-banner">
            <CheckCircle2 className="edit-rsvp-success-icon" />
            <h3 className="edit-rsvp-success-message">{message}</h3>
          </div>

          <div className="edit-rsvp-qr-button">
            <Button
              size="lg"
              className="w-full"
              onClick={() => setShowQRModal(true)}
            >
              Показать QR-коды и добавить в календарь
            </Button>
          </div>

          <QRModal
            isOpen={showQRModal}
            onClose={() => setShowQRModal(false)}
            editLink={`${window.location.origin}/edit/${code}`}
            code={code}
          />
        </div>
      )}
    </div>
  );
}
