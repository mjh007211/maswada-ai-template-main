import { Button } from "@/components/ui/button";
import useLang from "@/hooks/useLang";
import { UserButton } from "@clerk/clerk-react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export function Header() {
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
              <FormattedMessage id="header.subtitle" />
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="cursor-pointer"
              onClick={toggleLang}
              variant="outline"
            >
              <FormattedMessage
                id={isRTL ? "header.switchToEnglish" : "header.switchToArabic"}
              />
            </Button>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}
