"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { useAuth } from '@/lib/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

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