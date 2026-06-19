import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="glass-card flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <h1 className="font-bold">Maswada AI</h1>
            <p className="text-sm text-gray-300">
              Your Smart Note-Taking Companion
            </p>
          </div>
          <Button variant="outline">العربية</Button>
        </div>
      </div>
    </header>
  );
}
