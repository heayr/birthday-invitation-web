// src/App.tsx
import { Cover } from "@/sections/Cover";
import { CountdownSection } from "@/sections/CountdownSection";
import { InfoSection } from "@/sections/InfoSection";
// import { RsvpForm } from "@/hooks/useRsvpForm";
import { RsvpForm } from "@/components/RsvpForm";
import { RsvpSection } from "@/sections/RsvpSection";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Cover />

      <CountdownSection />

      <InfoSection />

      <RsvpForm />

      {/* Футер */}
      <footer className="py-12 bg-gray-900 text-gray-300 text-center">
        <p>С любовью и теплом ❤️</p>
        <p className="mt-2 text-sm">2026 © Юбилей Виталия</p>
      </footer>
    </div>
  );
}

export default App;
