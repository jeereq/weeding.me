"use client";
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { useData } from '@/lib/data';
import { useFetchData } from '@/hooks/useFetchData';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname()
  const { user, login } = useData();
  const { fetch } = useFetchData({ uri: "auth/loginByEmail" })

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router,]);
  
  useEffect(() => {
    fetch({ email: user.email }, "POST").then(function ({ data }) {
      if (data.data) {
        login(data.data)
      }
    })
  }, [pathname]);

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen bg-background">
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 p-8 h-full overflow-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}