'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MessageCircleIcon,
  UsersIcon,
  ActivityIcon,
  ArrowRightIcon,
  RefreshCwIcon,
  SettingsIcon,
  TrendingUpIcon,
  CalendarIcon,
  Globe,
  MailIcon
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface ChatStats {
  totalChats: number;
  activeUsers: number;
  todayChats: number;
  monthlyChats: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<ChatStats>({
    totalChats: 0,
    activeUsers: 0,
    todayChats: 0,
    monthlyChats: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate loading data - replace with actual API calls
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsRefreshing(true);
      // Simulate API call - replace with real data fetching
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalChats: 1247,
        activeUsers: 89,
        todayChats: 23,
        monthlyChats: 456
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadStats();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full size-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-16 sm:h-16 items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo.png"
                alt="ITAI Logo"
                width={32}
                height={32}
                className="rounded-lg sm:size-10"
                unoptimized
              />
              <div>
                <span className="text-lg sm:text-xl font-bold text-gray-900">ITAI Admin</span>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hidden sm:flex border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <RefreshCwIcon className={`size-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="sm:hidden p-2 border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <RefreshCwIcon className={`size-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                  <Globe className="size-4 mr-0 sm:mr-2" />
                  <span className="hidden sm:inline">Visit Site</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 max-w-6xl">
        {/* Welcome Section */}
        <motion.div 
          className="text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor chat conversations and user interactions • Real-time insights
          </p>
          {isRefreshing && (
            <p className="text-sm text-orange-600 animate-pulse mt-2">
              Updating data...
            </p>
          )}
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Total Chats</CardTitle>
                  <MessageCircleIcon className="size-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalChats.toLocaleString()}</div>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <UsersIcon className="size-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Today&apos;s Chats</CardTitle>
                  <CalendarIcon className="size-4 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-600">{stats.todayChats}</div>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Monthly Chats</CardTitle>
                  <TrendingUpIcon className="size-4 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">{stats.monthlyChats}</div>
              </CardHeader>
            </Card>
          </motion.div>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Chat Conversations Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
          >
            <Link href="/admin/conversations">
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/20 text-blue-600">
                        <MessageCircleIcon className="size-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Chat Conversations</CardTitle>
                        <CardDescription>View and manage all chat interactions</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{stats.totalChats}</Badge>
                      <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Today</p>
                      <p className="font-semibold text-orange-600">{stats.todayChats}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">This Month</p>
                      <p className="font-semibold text-green-600">{stats.monthlyChats}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* User Management Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <Link href="/admin/users">
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-green-300 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/20 text-green-600">
                        <UsersIcon className="size-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">User Management</CardTitle>
                        <CardDescription>Monitor user activity and sessions</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{stats.activeUsers}</Badge>
                      <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Active Now</p>
                      <p className="font-semibold text-blue-600">{stats.activeUsers}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Users</p>
                      <p className="font-semibold text-purple-600">{Math.floor(stats.totalChats * 0.8)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Analytics Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.7 }}
          >
            <Link href="/admin/analytics">
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-purple-300 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/20 text-purple-600">
                        <ActivityIcon className="size-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Analytics</CardTitle>
                        <CardDescription>Performance metrics and insights</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Live</Badge>
                      <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Avg Response</p>
                      <p className="font-semibold text-orange-600">2.3s</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Success Rate</p>
                      <p className="font-semibold text-green-600">97.8%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Contact Submissions Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.8 }}
          >
            <Link href="/admin/contact-submissions">
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-orange-300 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-500/20 text-orange-600">
                        <MailIcon className="size-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Contact Submissions</CardTitle>
                        <CardDescription>Manage demo requests and leads</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">New</Badge>
                      <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">New Leads</p>
                      <p className="font-semibold text-orange-600">-</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-semibold text-green-600">-</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Settings Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.9 }}
          >
            <Link href="/admin/settings">
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-gray-500/10 to-gray-500/20 text-gray-600">
                        <SettingsIcon className="size-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Settings</CardTitle>
                        <CardDescription>Configure system preferences</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Version</p>
                      <p className="font-semibold text-blue-600">2.1.0</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-semibold text-green-600">Online</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
