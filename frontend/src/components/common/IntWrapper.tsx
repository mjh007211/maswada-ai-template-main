import useLang from "@/hooks/useLang";
import { messages } from "@/i18";
import { IntlProvider } from "react-intl";

type Props = {
  children: React.ReactNode;
};

export default function IntWrapper({ children }: Props) {
  const { local } = useLang();
  return (
    <IntlProvider locale={local} messages={messages[local]}>
      {children}
    </IntlProvider>
  );
}
