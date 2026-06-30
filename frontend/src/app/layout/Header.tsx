import { Button } from "@/components/ui/button";
import useLang from "@/hooks/useLang";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const navigator = useNavigate();
  const { toggleLang, isRTL } = useLang();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="glass-card flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="font-bold cursor-pointer hover:text-gray-300 transition duration-300"
            >
              <FormattedMessage id="title" />
            </Link>
            <p className="text-sm text-gray-300">
              Your Smart Note-Taking Companion
            </p>
          </div>
          <Button
            className="cursor-pointer"
            onClick={toggleLang}
            variant="outline"
          >
            {isRTL ? "English" : "العربية"}
          </Button>
        </div>
      </div>
    </header>
  );
}
