import { useState, useRef, useEffect } from "react";
import { submitRsvp } from "@/lib/api";
import type { RsvpRequest, RsvpResponse } from "@/lib/api";
import { RsvpFormBase } from "@/components/RsvpFormBase";
import QRModal from "@/components/QRModal";
import { CheckCircle2, Copy } from "lucide-react";
import "./../styles/components/RsvpForm.css";

export function RsvpForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [response, setResponse] = useState<RsvpResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showQRModal, setShowQRModal] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

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
      const editLink = `${window.location.origin}/edit/${response.code}`;
      navigator.clipboard.writeText(editLink);
      alert("Ссылка для редактирования скопирована!");
    }
  };

  // Автоматическая прокрутка к блоку с кодом после успешной отправки
  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  const editLink = response?.code
    ? `${window.location.origin}/edit/${response.code}`
    : "";

  return (
    <section id="rsvp" className="rsvp-section">
      <div className="rsvp-container">
        <RsvpFormBase
          onSubmit={handleSubmit}
          isLoading={status === "loading"}
          errorMessage={status === "error" ? errorMessage : undefined}
          submitLabel="Подтвердить участие"
        />

        {status === "success" && response?.code && (
          <div className="rsvp-success" ref={successRef}>
            <div className="rsvp-success-banner">
              <CheckCircle2 className="rsvp-success-icon" />
              <h3 className="rsvp-success-title">Спасибо! Ваш ответ принят</h3>
            </div>

            <div className="rsvp-code-card">
              <p className="rsvp-code-label">
                Ваша ссылка для редактирования ответа:
              </p>

              <div className="rsvp-link-block">
                <a href={editLink} target="_blank" rel="noopener noreferrer">
                  {editLink}
                </a>
              </div>

              <div className="rsvp-code-block">
                <span className="rsvp-code-value">{response.code}</span>
                <button
                  className="rsvp-copy-button"
                  onClick={handleCopyCode}
                  title="Скопировать ссылку"
                >
                  <Copy size={20} />
                </button>
              </div>

              <p className="rsvp-code-note">
                Сохраните эту ссылку — она понадобится, если захотите изменить
                ответ.
              </p>

              <button
                className="rsvp-qr-button"
                onClick={() => setShowQRModal(true)}
              >
                Показать QR-коды и добавить в календарь
              </button>
            </div>

            <QRModal
              isOpen={showQRModal}
              onClose={() => setShowQRModal(false)}
              editLink={editLink}
              code={response.code}
            />
          </div>
        )}
      </div>
    </section>
  );
}
