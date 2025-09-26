'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUpIcon,
  ActivityIcon,
  ClockIcon,
  MessageCircleIcon,
  UsersIcon,
  ArrowLeftIcon,
  RefreshCwIcon,
  BarChart3Icon,
  PieChartIcon,
  LineChartIcon,
  ZapIcon
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface AnalyticsData {
  totalSessions: number;
  averageSessionDuration: number;
  totalMessages: number;
  averageResponseTime: number;
  successRate: number;
  popularTopics: Array<{ topic: string; count: number }>;
  dailyActivity: Array<{ date: string; sessions: number; messages: number }>;
  userSatisfaction: number;
  bounceRate: number;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate loading data - replace with actual API calls
  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setIsRefreshing(true);
      // Simulate API call - replace with real data fetching
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockAnalytics: AnalyticsData = {
        totalSessions: 1247,
        averageSessionDuration: 840, // seconds
        totalMessages: 8934,
        averageResponseTime: 2.3, // seconds
        successRate: 97.8, // percentage
        popularTopics: [
          { topic: 'Setup & Configuration', count: 234 },
          { topic: 'Integration Help', count: 189 },
          { topic: 'Pricing Questions', count: 156 },
          { topic: 'Feature Requests', count: 98 },
          { topic: 'Technical Support', count: 87 }
        ],
        dailyActivity: [
          { date: '2024-01-09', sessions: 45, messages: 312 },
          { date: '2024-01-10', sessions: 67, messages: 456 },
          { date: '2024-01-11', sessions: 52, messages: 389 },
          { date: '2024-01-12', sessions: 78, messages: 542 },
          { date: '2024-01-13', sessions: 84, messages: 623 },
          { date: '2024-01-14', sessions: 73, messages: 498 },
          { date: '2024-01-15', sessions: 91, messages: 678 }
        ],
        userSatisfaction: 4.6, // out of 5
        bounceRate: 12.3 // percentage
      };
      
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadAnalytics();
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full size-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load analytics data</p>
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
              />
              <div>
                <span className="text-lg sm:text-xl font-bold text-gray-900">Analytics Dashboard</span>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Performance insights and metrics</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/admin">
                <Button variant="outline" size="sm" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                  <ArrowLeftIcon className="size-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <RefreshCwIcon className={`size-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 max-w-7xl">
        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground">
                Performance metrics and insights for your chat system
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-lg px-3 py-1">
                Live Data
              </Badge>
            </div>
          </div>
          {isRefreshing && (
            <p className="text-sm text-orange-600 animate-pulse mt-2">
              Updating analytics data...
            </p>
          )}
        </motion.div>

        {/* Key Metrics */}
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
                  <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                  <MessageCircleIcon className="size-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{analytics.totalSessions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
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
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <ZapIcon className="size-4 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-yellow-600">{analytics.averageResponseTime}s</div>
                <p className="text-xs text-muted-foreground">-0.8s improvement</p>
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
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <TrendingUpIcon className="size-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{analytics.successRate}%</div>
                <p className="text-xs text-muted-foreground">+2.1% this month</p>
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
                  <CardTitle className="text-sm font-medium">Avg Session Time</CardTitle>
                  <ClockIcon className="size-4 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">{formatDuration(analytics.averageSessionDuration)}</div>
                <p className="text-xs text-muted-foreground">+45s longer sessions</p>
              </CardHeader>
            </Card>
          </motion.div>
        </div>

        {/* Charts and Detailed Analytics */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Daily Activity Chart */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/20 text-blue-600">
                    <LineChartIcon className="size-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Daily Activity</CardTitle>
                    <CardDescription>Sessions and messages over the last 7 days</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.dailyActivity.map((day) => (
                    <div key={day.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-sm text-muted-foreground">{day.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">{day.sessions} sessions</p>
                        <p className="text-sm text-muted-foreground">{day.messages} messages</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Popular Topics */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/20 text-green-600">
                    <PieChartIcon className="size-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Popular Topics</CardTitle>
                    <CardDescription>Most discussed topics in conversations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.popularTopics.map((topic) => {
                    const maxCount = Math.max(...analytics.popularTopics.map(t => t.count));
                    const percentage = (topic.count / maxCount) * 100;
                    
                    return (
                      <div key={topic.topic} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{topic.topic}</span>
                          <span className="text-sm text-muted-foreground">{topic.count} mentions</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Metrics */}
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-500/20 text-orange-600">
                    <UsersIcon className="size-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">User Satisfaction</CardTitle>
                    <CardDescription>Average rating from user feedback</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {analytics.userSatisfaction}/5.0
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`w-4 h-4 ${
                          star <= analytics.userSatisfaction ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ⭐
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on 345 ratings</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/20 text-purple-600">
                    <BarChart3Icon className="size-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Bounce Rate</CardTitle>
                    <CardDescription>Users who leave after first message</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {analytics.bounceRate}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${analytics.bounceRate}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {analytics.bounceRate < 15 ? 'Excellent retention' : 'Room for improvement'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.9 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/10 to-indigo-500/20 text-indigo-600">
                    <ActivityIcon className="size-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Total Messages</CardTitle>
                    <CardDescription>All messages exchanged</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    {analytics.totalMessages.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Avg: {Math.round(analytics.totalMessages / analytics.totalSessions)} per session
                  </p>
                  <p className="text-xs text-muted-foreground">+23% increase this month</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
