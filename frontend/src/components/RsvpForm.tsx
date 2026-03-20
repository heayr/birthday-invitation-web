// src/sections/RsvpForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/cn";
// import { QRModal } from "@/components/QRModal";
import QRModal from "@/components/QRModal";
// import { submitRsvp, RsvpRequest, RsvpResponse } from "@/lib/api";
import * as api from "@/lib/api";
const { submitRsvp, RsvpRequest, RsvpResponse } = api;
import type { RsvpFormData } from "@/types";
import { CheckCircle2, AlertCircle, Copy, Loader2 } from "lucide-react";

// ────────────────────────────────────────────────
// Схема валидации (Zod) — должна совпадать с backend
// ────────────────────────────────────────────────
const rsvpSchema = z.object({
  name: z.string().min(2, "Имя должно быть не короче 2 символов").max(100),
  email: z.string().email("Некорректный email").max(100),
  attending: z.boolean(),
  plusOne: z
    .number()
    .int()
    .min(0, "Количество гостей не может быть отрицательным")
    .max(10, "Слишком много +1"),
  comment: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof rsvpSchema>;

// ────────────────────────────────────────────────
// Компонент
// ────────────────────────────────────────────────
export function RsvpForm() {
  const [showQRModal, setShowQRModal] = useState(false);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [response, setResponse] = useState<RsvpResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      email: "",
      attending: true,
      plusOne: 0,
      comment: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const payload: RsvpRequest = {
        name: data.name.trim(),
        email: data.email.trim(),
        attending: data.attending,
        plusOne: data.plusOne,
        comment: data.comment?.trim() || undefined,
      };

      const res = await submitRsvp(payload);
      setResponse(res);
      setStatus("success");
      form.reset(); // очищаем форму после успеха
    } catch (err: any) {
      setStatus("error");
      const msg =
        err?.message ||
        err?.errors?.[0]?.message ||
        "Не удалось отправить ответ. Попробуйте позже или свяжитесь с организатором.";
      setErrorMessage(msg);
      console.error("RSVP submit error:", err);
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
        <Card className="border-primary-200 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl md:text-4xl font-bold text-primary-700">
              Подтвердите участие
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Пожалуйста, заполните форму. Ваш ответ очень важен!
            </CardDescription>
          </CardHeader>

          <CardContent>
            {status === "success" && response?.code ? (
              <div className="text-center py-10 space-y-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>

                <h3 className="text-2xl font-semibold text-gray-800">
                  Спасибо! Ваш ответ принят
                </h3>

                <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 max-w-md mx-auto">
                  <p className="text-gray-600 mb-3">
                    Ваш код для редактирования ответа:
                  </p>
                  <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-lg border font-mono text-2xl font-bold tracking-wider text-primary-700">
                    {response.code}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCopyCode}
                      title="Скопировать код"
                      className="h-8 w-8"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => setShowQRModal(true)}
                      className="mt-6"
                    >
                      Показать QR-коды
                    </Button>

                    <QRModal
                      isOpen={showQRModal}
                      onClose={() => setShowQRModal(false)}
                      editLink={`${window.location.origin}/edit/${response.code}`}
                      code={response.code}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Сохраните этот код — он понадобится, если захотите изменить
                    ответ.
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setStatus("idle");
                    setResponse(null);
                  }}
                >
                  Отправить ещё один ответ
                </Button>
              </div>
            ) : (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Имя */}
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя *</Label>
                  <Input
                    id="name"
                    placeholder="Иван Иванов"
                    {...form.register("name")}
                    error={form.formState.errors.name?.message}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.com"
                    {...form.register("email")}
                    error={form.formState.errors.email?.message}
                  />
                </div>

                {/* Придёте? */}
                <div className="space-y-3">
                  <Label>Сможете ли присутствовать? *</Label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="button"
                      variant={form.watch("attending") ? "default" : "outline"}
                      className={cn(
                        "flex-1",
                        form.watch("attending") &&
                          "bg-primary-600 hover:bg-primary-700",
                      )}
                      onClick={() => form.setValue("attending", true)}
                    >
                      Да, буду
                    </Button>

                    <Button
                      type="button"
                      variant={!form.watch("attending") ? "default" : "outline"}
                      className={cn(
                        "flex-1",
                        !form.watch("attending") &&
                          "bg-red-600 hover:bg-red-700 text-white",
                      )}
                      onClick={() => form.setValue("attending", false)}
                    >
                      Нет, не смогу
                    </Button>
                  </div>
                  {form.formState.errors.attending && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.attending.message}
                    </p>
                  )}
                </div>

                {/* +1 */}
                <div className="space-y-2">
                  <Label htmlFor="plusOne">
                    Сколько гостей с вами придёт? (+1)
                  </Label>
                  <Input
                    id="plusOne"
                    type="number"
                    min={0}
                    max={10}
                    {...form.register("plusOne", { valueAsNumber: true })}
                    error={form.formState.errors.plusOne?.message}
                  />
                </div>

                {/* Комментарий */}
                <div className="space-y-2">
                  <Label htmlFor="comment">
                    Комментарий / пожелания (необязательно)
                  </Label>
                  <Textarea
                    id="comment"
                    placeholder="Например: буду с женой и ребёнком..."
                    rows={4}
                    {...form.register("comment")}
                    error={form.formState.errors.comment?.message}
                  />
                </div>

                {/* Кнопка отправки */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto px-10"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      "Подтвердить участие"
                    )}
                  </Button>
                </div>

                {/* Ошибка */}
                {status === "error" && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-red-700">{errorMessage}</p>
                  </div>
                )}
              </form>
            )}
          </CardContent>

          <CardFooter className="justify-center text-sm text-gray-500 pt-2">
            Если возникнут вопросы — пишите в Telegram организатору
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
