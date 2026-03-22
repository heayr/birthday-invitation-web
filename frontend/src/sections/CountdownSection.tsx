// // src/sections/CountdownSection.tsx
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Countdown } from "@/components/Countdown";
// import { cn } from "@/lib/cn";

// interface CountdownSectionProps {
//   className?: string;
// }

// export function CountdownSection({ className }: CountdownSectionProps) {
//   return (
//     <section className={cn("py-16 md:py-24 bg-white", className)}>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto">
//           <Card className="border border-gray-200 shadow-xl rounded-2xl overflow-hidden animate-card">
//             <CardHeader className="text-center pb-4 md:pb-6 bg-gradient-to-b from-white to-gray-50">
//               <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
//                 До юбилея осталось
//               </CardTitle>
//             </CardHeader>

//             <CardContent className="pt-8 pb-12 md:pt-10 md:pb-16 px-4 sm:px-8">
//               <div className="flex justify-center">
//                 <Countdown className="scale-90 sm:scale-100 md:scale-110 lg:scale-125 transition-transform" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// }

// sections/CountdownSection.tsx

// import { Countdown } from "@/components/Countdown";
// import { cn } from "@/lib/cn";

// interface CountdownSectionProps {
//   className?: string;
// }

// export function CountdownSection({ className }: CountdownSectionProps) {
//   return (
//     <section className={cn("py-24 md:py-32", className)}>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-light text-[var(--color-text-muted)] mb-20">
//             До юбилея осталось
//           </h2>

//           <div className="flex flex-wrap justify-center gap-8 md:gap-16">
//             <div className="text-center min-w-[120px]">
//               <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-[var(--color-text-heading)] leading-none">
//                 67
//               </div>
//               <div className="text-base md:text-lg text-[var(--color-text-muted)] mt-4 uppercase tracking-wider">
//                 дней
//               </div>
//             </div>

//             <div className="text-center min-w-[120px]">
//               <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-[var(--color-text-heading)] leading-none">
//                 19
//               </div>
//               <div className="text-base md:text-lg text-[var(--color-text-muted)] mt-4 uppercase tracking-wider">
//                 часов
//               </div>
//             </div>

//             <div className="text-center min-w-[120px]">
//               <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-[var(--color-text-heading)] leading-none">
//                 34
//               </div>
//               <div className="text-base md:text-lg text-[var(--color-text-muted)] mt-4 uppercase tracking-wider">
//                 минут
//               </div>
//             </div>

//             <div className="text-center min-w-[120px]">
//               <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-[var(--color-text-heading)] leading-none">
//                 32
//               </div>
//               <div className="text-base md:text-lg text-[var(--color-text-muted)] mt-4 uppercase tracking-wider">
//                 секунд
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// src/sections/CountdownSection.tsx
import { Countdown } from "@/components/Countdown";
import { cn } from "@/lib/cn";
import "./../styles/components/CountdownSection.css";

interface CountdownSectionProps {
  className?: string;
}

export function CountdownSection({ className }: CountdownSectionProps) {
  return (
    <section className={cn("countdown-section", className)}>
      <div className="countdown-container">
        <div className="countdown-wrapper">
          <h2 className="countdown-title">До юбилея осталось</h2>
          <Countdown />
        </div>
      </div>
    </section>
  );
}
