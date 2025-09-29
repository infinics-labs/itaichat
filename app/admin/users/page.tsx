'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  UserIcon,
  MailIcon,
  SearchIcon,
  ArrowLeftIcon,
  RefreshCwIcon,
  MessageCircleIcon,
  ActivityIcon,
  UserCheckIcon,
  UserXIcon
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface User {
  id: string;
  name: string | null;
  email: string | null;
  type: 'registered' | 'guest';
  firstSeen: string;
  lastSeen: string;
  totalChats: number;
  totalMessages: number;
  averageSessionDuration: number; // in seconds
  isActive: boolean;
  preferredLanguage: string;
  location?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Simulate loading data - replace with actual API calls
  useEffect(() => {
    loadUsers();
  }, []);

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user => 
        (user.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.id.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (userTypeFilter !== 'all') {
      filtered = filtered.filter(user => user.type === userTypeFilter);
    }

    if (activeFilter !== 'all') {
      const isActiveFilter = activeFilter === 'active';
      filtered = filtered.filter(user => user.isActive === isActiveFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, userTypeFilter, activeFilter]);

  const loadUsers = async () => {
    try {
      setIsRefreshing(true);
      // Simulate API call - replace with real data fetching
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockUsers: User[] = [
        {
          id: 'user_1',
          name: 'John Doe',
          email: 'john@example.com',
          type: 'registered',
          firstSeen: '2024-01-10T09:00:00Z',
          lastSeen: '2024-01-15T11:30:00Z',
          totalChats: 8,
          totalMessages: 156,
          averageSessionDuration: 720,
          isActive: true,
          preferredLanguage: 'en',
          location: 'New York, USA'
        },
        {
          id: 'guest_1',
          name: null,
          email: null,
          type: 'guest',
          firstSeen: '2024-01-15T10:15:00Z',
          lastSeen: '2024-01-15T10:45:00Z',
          totalChats: 1,
          totalMessages: 12,
          averageSessionDuration: 1800,
          isActive: false,
          preferredLanguage: 'en'
        },
        {
          id: 'user_2',
          name: 'Sarah Wilson',
          email: 'sarah@company.com',
          type: 'registered',
          firstSeen: '2024-01-08T14:20:00Z',
          lastSeen: '2024-01-14T16:45:00Z',
          totalChats: 15,
          totalMessages: 289,
          averageSessionDuration: 960,
          isActive: false,
          preferredLanguage: 'en',
          location: 'London, UK'
        },
        {
          id: 'user_3',
          name: 'Ahmed Hassan',
          email: 'ahmed@tech.com',
          type: 'registered',
          firstSeen: '2024-01-12T11:30:00Z',
          lastSeen: '2024-01-15T14:25:00Z',
          totalChats: 5,
          totalMessages: 97,
          averageSessionDuration: 1200,
          isActive: true,
          preferredLanguage: 'en',
          location: 'Dubai, UAE'
        },
        {
          id: 'guest_2',
          name: null,
          email: null,
          type: 'guest',
          firstSeen: '2024-01-15T15:30:00Z',
          lastSeen: '2024-01-15T15:30:00Z',
          totalChats: 1,
          totalMessages: 3,
          averageSessionDuration: 0,
          isActive: true,
          preferredLanguage: 'en'
        },
        {
          id: 'user_4',
          name: 'Maria Garcia',
          email: 'maria@startup.com',
          type: 'registered',
          firstSeen: '2024-01-05T08:15:00Z',
          lastSeen: '2024-01-13T17:20:00Z',
          totalChats: 22,
          totalMessages: 445,
          averageSessionDuration: 840,
          isActive: false,
          preferredLanguage: 'en',
          location: 'Barcelona, Spain'
        }
      ];
      
      setUsers(mockUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadUsers();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    if (seconds === 0) return '0m';
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const getDisplayName = (user: User) => {
    if (user.name) return user.name;
    if (user.email) return user.email;
    return user.type === 'guest' ? `Guest User` : 'Anonymous User';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full size-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  const registeredCount = users.filter(u => u.type === 'registered').length;
  const guestCount = users.filter(u => u.type === 'guest').length;
  const activeCount = users.filter(u => u.isActive).length;
  const totalMessages = users.reduce((sum, u) => sum + u.totalMessages, 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-16 sm:h-16 items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo.png"
                unoptimized
                alt="ITAI Logo"
                width={32}
                height={32}
                className="rounded-lg sm:size-10"
              />
              <div>
                <span className="text-lg sm:text-xl font-bold text-gray-900">User Management</span>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Monitor all user accounts and activity</p>
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
                User Management
              </h1>
              <p className="text-muted-foreground">
                Overview of all users who have interacted with the chat system
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-lg px-3 py-1">
                {filteredUsers.length} Users
              </Badge>
            </div>
          </div>
          {isRefreshing && (
            <p className="text-sm text-orange-600 animate-pulse mt-2">
              Updating user data...
            </p>
          )}
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-4 mb-6 sm:mb-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
                  <UserCheckIcon className="size-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{registeredCount}</div>
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
                  <CardTitle className="text-sm font-medium">Guest Users</CardTitle>
                  <UserXIcon className="size-4 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-600">{guestCount}</div>
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
                  <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                  <ActivityIcon className="size-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{activeCount}</div>
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
                  <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                  <MessageCircleIcon className="size-4 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">{totalMessages.toLocaleString()}</div>
              </CardHeader>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
          className="bg-white/60 backdrop-blur-sm border rounded-lg p-4 mb-6"
        >
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, email, or user ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-orange-500"
              />
            </div>

            {/* User Type Filter */}
            <select
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:border-orange-500 focus:outline-none"
            >
              <option value="all">All Users</option>
              <option value="registered">Registered</option>
              <option value="guest">Guest</option>
            </select>

            {/* Active Status Filter */}
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:border-orange-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </motion.div>

        {/* Users List */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
        >
          {filteredUsers.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <UsersIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">No users found</h3>
                    <p className="text-gray-600 mt-1">
                      {searchTerm || userTypeFilter !== 'all' || activeFilter !== 'all'
                        ? 'Try adjusting your search or filters' 
                        : 'Users will appear here as they interact with the chat system'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                          <UserIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {getDisplayName(user)}
                            {user.isActive && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4">
                            <span>
                              {user.type === 'registered' ? 'Registered User' : 'Guest User'}
                            </span>
                            {user.email && (
                              <span className="flex items-center gap-1">
                                <MailIcon className="w-3 h-3" />
                                {user.email}
                              </span>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={user.isActive ? "default" : "secondary"}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="outline">
                          {user.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Chat Statistics */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 text-sm">Chat Activity</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Total Chats:</span>
                            <span className="font-medium">{user.totalChats}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Messages:</span>
                            <span className="font-medium">{user.totalMessages}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Avg Duration:</span>
                            <span className="font-medium">{formatDuration(user.averageSessionDuration)}</span>
                          </div>
                        </div>
                      </div>

                      {/* User Details */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 text-sm">User Details</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Language:</span>
                            <span className="font-medium">{user.preferredLanguage.toUpperCase()}</span>
                          </div>
                          {user.location && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Location:</span>
                              <span className="font-medium">{user.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 text-sm">Timeline</h4>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="text-gray-600">First Seen:</span>
                            <p className="font-medium text-xs">{formatDate(user.firstSeen)}</p>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-600">Last Seen:</span>
                            <p className="font-medium text-xs">{formatDate(user.lastSeen)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 text-sm">Actions</h4>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            View Conversations
                          </Button>
                          {user.email && (
                            <Button variant="outline" size="sm" className="text-xs">
                              Contact User
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
