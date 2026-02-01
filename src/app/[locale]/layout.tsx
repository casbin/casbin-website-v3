import { RootProvider } from "fumadocs-ui/provider/next";

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <RootProvider>{children}</RootProvider>;
}
