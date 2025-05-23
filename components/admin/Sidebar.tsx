"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Mail,
  Users,
  Settings,
  LogOut,
  Shield,
  Palette
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useData } from '@/lib/data';

const navigation = [
  { name: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
  { name: 'Invitations', href: '/admin/invitations', icon: Mail },
  { name: 'Invités', href: '/admin/guests', icon: Users },
  { name: 'Templates', href: '/admin/templates', icon: Palette, adminOnly: true },
  { name: 'Utilisateurs', href: '/admin/users', icon: Shield, adminOnly: true },
  { name: 'Paramètres', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useData();

  const handleSignOut = () => {
    logout();
    router.push('/');
  };

  const filteredNavigation = navigation.filter(item =>
    !item.adminOnly || (item.adminOnly && (user?.role?.id == 3))
  );

  return (
    <div className="lg:w-64 bg-card h-full flex flex-col justify-between lg:p-4 p-1 border-r">
      <nav className="space-y-2">
        {filteredNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className='hidden lg:block'>{item.name}</span>
          </Link>
        ))}
      </nav>
      <button
        onClick={handleSignOut}
        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
      >
        <LogOut className="h-5 w-5" />
        <span className='hidden lg:block'>Déconnexion</span>
      </button>
    </div>
  );
}