import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions, sharedLinks } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout {...baseOptions()} links={sharedLinks} className="[--fd-navbar-gap:2rem]">
      {children}
    </HomeLayout>
  );
}
