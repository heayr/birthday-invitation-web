// src/sections/EditRsvpForm.tsx
import { useState } from "react";
import { updateRsvp } from "@/lib/api";
import type { RsvpRequest } from "@/lib/api";
import { RsvpFormBase } from "@/components/RsvpFormBase";
import QRModal from "@/components/QRModal";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

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
    <div className="space-y-8">
      <RsvpFormBase
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={status === "loading"}
        errorMessage={status === "error" ? message : undefined}
        submitLabel="Сохранить изменения"
        onCancel={() => window.history.back()}
      />

      {status === "success" && (
        <div className="text-center space-y-8">
          <div className="inline-flex items-center justify-center gap-4 bg-green-50 px-8 py-6 rounded-2xl border border-green-200 shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
            <h3 className="text-2xl font-bold text-green-800">{message}</h3>
          </div>

          <Button
            size="lg"
            className="w-full max-w-md"
            onClick={() => setShowQRModal(true)}
          >
            Показать QR-коды и добавить в календарь
          </Button>

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
