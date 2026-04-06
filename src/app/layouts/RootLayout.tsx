import { Outlet } from "react-router";
import { LanguageProvider } from "../i18n/LanguageContext";

export function RootLayout() {
  return (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
  );
}
