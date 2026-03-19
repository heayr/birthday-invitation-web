// src/sections/CountdownSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Countdown } from "@/components/Countdown";
import { cn } from "@/lib/cn";

interface CountdownSectionProps {
  className?: string;
}

export function CountdownSection({ className }: CountdownSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-white", className)}>
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-4xl border-primary-200 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl md:text-4xl font-bold text-primary-700">
              До юбилея осталось
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 pb-10">
            <Countdown className="py-8 md:py-12" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
