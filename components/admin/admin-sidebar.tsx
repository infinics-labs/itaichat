'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  MessageCircleIcon,
  UsersIcon,
  ActivityIcon,
  SettingsIcon,
  MailIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LogOutIcon,
  BarChart3Icon,
  FileTextIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: HomeIcon,
  },
  {
    name: 'Conversations',
    href: '/admin/conversations',
    icon: MessageCircleIcon,
  },
  {
    name: 'Contact Submissions',
    href: '/admin/contact-submissions',
    icon: MailIcon,
    badge: 'New',
  },
  {
    name: 'Demo Requests',
    href: '/admin/demo-requests',
    icon: FileTextIcon,
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: UsersIcon,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3Icon,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: SettingsIcon,
  },
];

interface AdminSidebarProps {
  className?: string;
  onToggle?: (isCollapsed: boolean) => void;
}

export function AdminSidebar({ className, onToggle }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onToggle?.(newCollapsedState);
  };

  return (
    <motion.div
      initial={{ width: isCollapsed ? 80 : 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'bg-white border-r border-gray-200 shadow-lg flex flex-col h-full',
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-900 rounded-lg flex items-center justify-center">
                <ActivityIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
                <p className="text-xs text-gray-500">Management Dashboard</p>
              </div>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-4 h-4" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group',
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-blue-900 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 flex-shrink-0',
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                  )}
                />
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center justify-between flex-1"
                  >
                    <span className="font-medium">{item.name}</span>
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50',
            isCollapsed ? 'px-2' : 'px-3'
          )}
          onClick={() => {
            // Add logout logic here
            window.location.href = '/';
          }}
        >
          <LogOutIcon className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-3"
            >
              Exit Admin
            </motion.span>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
