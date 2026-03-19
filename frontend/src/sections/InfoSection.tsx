// src/sections/InfoSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Calendar, MapPin, Shirt, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/cn";

export function InfoSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          Информация о событии
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-primary-600" />
              </div>
              <CardTitle className="text-xl">Дата и время</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">29 мая 2026</p>
              <p className="text-gray-600">17:00 – 23:00</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <CardTitle className="text-xl">Место</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">Балаково</p>
              <p className="text-gray-600">Будет объявлено ближе к дате</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Shirt className="w-8 h-8 text-primary-600" />
              </div>
              <CardTitle className="text-xl">Дресс-код</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">Уточняется</p>
              <p className="text-gray-600">Будет объявлено позже</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <UtensilsCrossed className="w-8 h-8 text-primary-600" />
              </div>
              <CardTitle className="text-xl">Формат</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">Фуршет</p>
              <p className="text-gray-600">
                Лёгкие закуски, общение, хорошее настроение
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
