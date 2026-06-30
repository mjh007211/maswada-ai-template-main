import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/app/App";
import { ClerkProvider } from "@clerk/clerk-react";
import LangProvider from "./app/context/langProvider/LangProvider";
import IntWrapper from "./components/common/IntWrapper";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("add your Clerk publishable key to the .env file");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LangProvider>
      <IntWrapper>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
        </ClerkProvider>
      </IntWrapper>
    </LangProvider>
  </StrictMode>,
);
