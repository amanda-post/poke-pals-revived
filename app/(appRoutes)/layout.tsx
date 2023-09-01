'use client';
import { usePathname } from 'next/navigation';
import { NavBar } from '~/components/ui/NavBar';

const hideNavButtonRoutes = ['/creation'];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavButtons = hideNavButtonRoutes.includes(pathname);

  return (
    <section>
      <NavBar hideNavButtons={hideNavButtons} />
      {children}
    </section>
  );
}
