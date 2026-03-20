// src/sections/EditRsvpForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { updateRsvp } from "@/lib/api";
import type { RsvpRequest } from "@/lib/api";
// import { QRModal } from "@/components/QRModal";
import QRModal from "@/components/QRModal";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(100),
  attending: z.boolean(),
  plusOne: z.number().int().min(0).max(10),
  comment: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

interface EditRsvpFormProps {
  initialData: RsvpRequest;
  code: string;
}

export function EditRsvpForm({ initialData, code }: EditRsvpFormProps) {
  const [showQRModal, setShowQRModal] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    setMessage("");

    try {
      await updateRsvp(code, data);
      setStatus("success");
      setMessage("Ответ успешно обновлён!");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Не удалось обновить ответ. Попробуйте позже.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Имя *</Label>
        <Input
          id="name"
          {...form.register("name")}
          error={form.formState.errors.name?.message}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          error={form.formState.errors.email?.message}
        />
      </div>

      <div className="space-y-3">
        <Label>Присутствие *</Label>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="button"
            variant={form.watch("attending") ? "default" : "outline"}
            className={cn(
              "flex-1",
              form.watch("attending") && "bg-primary-600",
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
              !form.watch("attending") && "bg-red-600 text-white",
            )}
            onClick={() => form.setValue("attending", false)}
          >
            Нет, не смогу
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="plusOne">+1 (гостей)</Label>
        <Input
          id="plusOne"
          type="number"
          min={0}
          max={10}
          {...form.register("plusOne", { valueAsNumber: true })}
          error={form.formState.errors.plusOne?.message}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Комментарий</Label>
        <Textarea
          id="comment"
          {...form.register("comment")}
          error={form.formState.errors.comment?.message}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Сохранение..." : "Сохранить изменения"}
      </Button>

      {status === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center text-green-700">
          {message}
          <Button size="lg" onClick={() => setShowQRModal(true)}>
            Показать QR-коды
          </Button>

          <QRModal
            isOpen={showQRModal}
            onClose={() => setShowQRModal(false)}
            editLink={`${window.location.origin}/edit/${code}`}
            code={code}
          />
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center text-red-700">
          {message}
        </div>
      )}
    </form>
  );
}
