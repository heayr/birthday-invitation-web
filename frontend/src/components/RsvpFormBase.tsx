// src/components/RsvpFormBase.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, Loader2 } from "lucide-react";
import "./../styles/components/RsvpFormBase.css";

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
  // showSuccess?: boolean;
}

export function RsvpFormBase({
  initialData = {},
  onSubmit,
  isLoading = false,
  successMessage,
  errorMessage,
  submitLabel,
  onCancel,
  // showSuccess = false,
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
    <form onSubmit={handleSubmit} className="rsvp-form">
      {/* Имя */}
      <div className="form-field">
        <label htmlFor="name" className="form-label form-label-required">
          Ваше имя
        </label>
        <input
          id="name"
          type="text"
          className={`form-input ${form.formState.errors.name ? "error" : ""}`}
          placeholder="Иван Иванов"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="form-error-message">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Email (необязательно)
        </label>
        <input
          id="email"
          type="email"
          className={`form-input ${form.formState.errors.email ? "error" : ""}`}
          placeholder="example@mail.com"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="form-error-message">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Присутствие */}
      <div className="form-field">
        <span className="form-label form-label-required">
          Сможете ли присутствовать?
        </span>
        <div className="attendance-buttons">
          <button
            type="button"
            className={`attendance-button ${
              form.watch("attending") ? "active-yes" : ""
            }`}
            onClick={() => form.setValue("attending", true)}
          >
            Да, буду
          </button>
          <button
            type="button"
            className={`attendance-button ${
              !form.watch("attending") ? "active-no" : ""
            }`}
            onClick={() => form.setValue("attending", false)}
          >
            Нет, не смогу
          </button>
        </div>
        {form.formState.errors.attending && (
          <p className="form-error-message">
            {form.formState.errors.attending.message}
          </p>
        )}
      </div>

      {/* +1 */}
      <div className="form-field">
        <label htmlFor="plusOne" className="form-label">
          Сколько гостей с вами придёт? (+1)
        </label>
        <input
          id="plusOne"
          type="number"
          min={0}
          max={10}
          className={`form-input ${form.formState.errors.plusOne ? "error" : ""}`}
          {...form.register("plusOne", { valueAsNumber: true })}
        />
        {form.formState.errors.plusOne && (
          <p className="form-error-message">
            {form.formState.errors.plusOne.message}
          </p>
        )}
      </div>

      {/* Алкоголь */}
      <div className="form-field">
        <label htmlFor="alcohol" className="form-label">
          Какой алкоголь будете пить? (можно указать несколько или ничего)
        </label>
        <input
          id="alcohol"
          type="text"
          className={`form-input ${form.formState.errors.alcohol ? "error" : ""}`}
          placeholder="Вино, пиво, водка, ничего не пью..."
          {...form.register("alcohol")}
        />
        <p className="form-hint">
          Это поможет организаторам подготовить напитки
        </p>
        {form.formState.errors.alcohol && (
          <p className="form-error-message">
            {form.formState.errors.alcohol.message}
          </p>
        )}
      </div>

      {/* Комментарий */}
      <div className="form-field">
        <label htmlFor="comment" className="form-label">
          Комментарий / пожелания (необязательно)
        </label>
        <textarea
          id="comment"
          className={`form-textarea ${form.formState.errors.comment ? "error" : ""}`}
          placeholder="Например: буду с женой\мужем и ребёнком..."
          rows={4}
          {...form.register("comment")}
        />
        {form.formState.errors.comment && (
          <p className="form-error-message">
            {form.formState.errors.comment.message}
          </p>
        )}
      </div>

      {/* Кнопки */}
      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="spinner" size={20} />
              {submitLabel.includes("Сохран") ? "Сохранение..." : "Отправка..."}
            </>
          ) : (
            submitLabel
          )}
        </button>

        {onCancel && (
          <button type="button" className="btn-outline" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>

      {/* Сообщения */}
      {successMessage && (
        <div className="form-message form-message-success">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="form-message form-message-error">
          <AlertCircle size={20} />
          <p>{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
