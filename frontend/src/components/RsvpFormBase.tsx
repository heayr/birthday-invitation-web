// src/components/RsvpFormBase.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const rsvpSchema = z.object({
  name: z.string().min(2, "Имя должно быть не короче 2 символов").max(100),
  email: z
    .string()
    .email("Некорректный email")
    .max(100)
    .optional()
    .or(z.literal("")),
  attending: z.boolean(),
  plusOne: z
    .number()
    .int()
    .min(0, "Количество гостей не может быть отрицательным")
    .max(10),
  alcohol: z.string().max(200).optional(),
  comment: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof rsvpSchema>;

interface RsvpFormBaseProps {
  initialData?: Partial<FormValues>;
  onSubmit: (data: FormValues) => Promise<void>;
  isLoading?: boolean;
  successMessage?: string;
  errorMessage?: string;
  submitLabel: string;
  onCancel?: () => void;
  showSuccess?: boolean;
}

export function RsvpFormBase({
  initialData = {},
  onSubmit,
  isLoading = false,
  successMessage,
  errorMessage,
  submitLabel,
  onCancel,
  showSuccess = false,
}: RsvpFormBaseProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      email: "",
      attending: true,
      plusOne: 0,
      alcohol: "",
      comment: "",
      ...initialData,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        <Label htmlFor="email">Email (необязательно)</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@mail.com"
          {...form.register("email")}
          error={form.formState.errors.email?.message}
        />
      </div>

      {/* Присутствие */}
      <div className="space-y-3">
        <Label>Сможете ли присутствовать? *</Label>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="button"
            variant={form.watch("attending") ? "default" : "outline"}
            className={cn(
              "flex-1",
              form.watch("attending") && "bg-primary-600 hover:bg-primary-700",
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
        <Label htmlFor="plusOne">Сколько гостей с вами придёт? (+1)</Label>
        <Input
          id="plusOne"
          type="number"
          min={0}
          max={10}
          {...form.register("plusOne", { valueAsNumber: true })}
          error={form.formState.errors.plusOne?.message}
        />
      </div>

      {/* Алкоголь */}
      <div className="space-y-2">
        <Label htmlFor="alcohol">
          Какой алкоголь будете пить? (можно указать несколько или ничего)
        </Label>
        <Input
          id="alcohol"
          placeholder="Вино, пиво, водка, ничего не пью..."
          {...form.register("alcohol")}
          error={form.formState.errors.alcohol?.message}
        />
        <p className="text-sm text-gray-500">
          Это поможет организаторам подготовить напитки
        </p>
      </div>

      {/* Комментарий */}
      <div className="space-y-2">
        <Label htmlFor="comment">Комментарий / пожелания (необязательно)</Label>
        <Textarea
          id="comment"
          placeholder="Например: буду с женой и ребёнком..."
          rows={4}
          {...form.register("comment")}
          error={form.formState.errors.comment?.message}
        />
      </div>

      {/* Кнопки */}
      <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
        <Button type="submit" size="lg" className="flex-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {submitLabel.includes("Сохран") ? "Сохранение..." : "Отправка..."}
            </>
          ) : (
            submitLabel
          )}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={onCancel}
          >
            Отмена
          </Button>
        )}
      </div>

      {/* Сообщения */}
      {successMessage && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center text-green-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-red-700">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
