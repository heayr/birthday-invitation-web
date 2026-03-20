// src/pages/EditPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { EditRsvpForm } from "@/sections/EditRsvpForm";
import { getRsvpByCode } from "@/lib/api";
import type { RsvpResponse, RsvpRequest } from "@/lib/api";

export default function EditPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<RsvpRequest | null>(null);

  useEffect(() => {
    if (!code) {
      setError("Код не указан в URL");
      setLoading(false);
      return;
    }

    // const cleanCode = code.startsWith("#") ? code.slice(1) : code;

    const fetchData = async () => {
      try {
        const res = await getRsvpByCode(code!);
        if (res.success && res.data) {
          setInitialData({
            name: res.data.name,
            email: res.data.email,
            attending: res.data.attending,
            plusOne: res.data.plusOne,
            comment: res.data.comment || "",
          });
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary-600 mb-4" />
          <p className="text-lg text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  if (error || !initialData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-red-600">Ошибка</CardTitle>
            <CardDescription className="text-lg mt-2">
              {error || "Ответ с таким кодом не найден"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <p className="mb-6 text-gray-600">
              Возможно, код введён неверно или срок действия истёк.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Вернуться на главную
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="border-primary-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold text-primary-700">
              Редактирование ответа
            </CardTitle>
            <CardDescription className="text-lg mt-3">
              Код:{" "}
              <strong className="font-mono text-primary-600">{code}</strong>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <EditRsvpForm initialData={initialData} code={code!} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
