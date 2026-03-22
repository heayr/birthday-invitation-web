// src/pages/EditPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { RsvpFormBase } from "@/components/RsvpFormBase";
import { getRsvpByCode, updateRsvp } from "@/lib/api";
import type { RsvpRequest } from "@/lib/api";
import QRModal from "@/components/QRModal";
import "./../styles//components/EditPage.css";

export default function EditPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<RsvpRequest | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (!code) {
      setError("Код не указан в URL");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await getRsvpByCode(code);
        if (res.success && res.data) {
          setInitialData(res.data);
        } else {
          setError(res.message || "Ответ не найден");
        }
      } catch (err: any) {
        setError(err.message || "Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code]);

  const handleSubmit = async (data: RsvpRequest) => {
    if (!code) return;
    setSubmitStatus("loading");
    setSubmitMessage("");
    try {
      await updateRsvp(code, data);
      setSubmitStatus("success");
      setSubmitMessage("Ответ успешно обновлён!");
    } catch (err: any) {
      setSubmitStatus("error");
      setSubmitMessage(err.message || "Не удалось обновить ответ");
    }
  };

  if (loading) {
    return (
      <div className="edit-loading">
        <div className="edit-loading-content">
          <Loader2 className="edit-loading-spinner" />
          <p className="edit-loading-text">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  if (error || !initialData) {
    return (
      <div className="edit-error">
        <div className="edit-error-card">
          <h2 className="edit-error-title">Ошибка</h2>
          <p className="edit-error-description">
            {error || "Ответ с таким кодом не найден"}
          </p>
          <AlertCircle className="edit-error-icon" />
          <p className="edit-error-message">
            Возможно, код введён неверно или срок действия истёк.
          </p>
          <button onClick={() => navigate("/")} className="edit-error-button">
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <div className="edit-container">
        <div className="edit-card">
          <div className="edit-card-header">
            <h1 className="edit-card-title">Редактирование ответа</h1>
            <p className="edit-card-subtitle">
              Код: <strong>{code}</strong>
            </p>
          </div>

          <div className="edit-card-content">
            <RsvpFormBase
              initialData={initialData}
              onSubmit={handleSubmit}
              submitLabel="Сохранить изменения"
              successMessage={
                submitStatus === "success" ? submitMessage : undefined
              }
              errorMessage={
                submitStatus === "error" ? submitMessage : undefined
              }
              onCancel={() => navigate("/")}
              isLoading={submitStatus === "loading"}
            />

            <div className="edit-qr-button-wrapper">
              <button
                className="edit-qr-button"
                onClick={() => setShowQRModal(true)}
              >
                Показать QR-коды
              </button>
            </div>

            <QRModal
              isOpen={showQRModal}
              onClose={() => setShowQRModal(false)}
              editLink={`${window.location.origin}/edit/${code}`}
              code={code || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
