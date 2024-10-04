import { ReactNode } from "react";
import Heading from "../../container/header";

interface LayoutProps {
  children: ReactNode;
}
export function Layout({ children }: LayoutProps) {
  return (
    <main>
      <header>
        <Heading />
      </header>
      <body className="mt-20">{children}</body>
    </main>
  );
}
