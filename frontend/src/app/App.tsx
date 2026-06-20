import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLayout } from "@/app/layout/AppLayout";
import { HomePage } from "@/app/pages/HomePage";
import { NotFoundPage } from "@/app/pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignupPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
