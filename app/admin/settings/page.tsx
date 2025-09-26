'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  SaveIcon,
  ArrowLeftIcon,
  RefreshCwIcon,
  BellIcon,
  ShieldIcon,
  MessageSquareIcon,
  GlobeIcon,
  ZapIcon
} from 'lucide-react';
import { toast } from 'sonner';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface SystemSettings {
  // General Settings
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  maxSessionDuration: number; // minutes
  
  // Chat Settings
  enableWelcomeMessage: boolean;
  welcomeMessage: string;
  maxMessagesPerSession: number;
  enableTypingIndicator: boolean;
  responseTimeout: number; // seconds
  
  // Security Settings
  enableRateLimit: boolean;
  maxRequestsPerMinute: number;
  enableCaptcha: boolean;
  blockSuspiciousUsers: boolean;
  
  // Notification Settings
  emailNotifications: boolean;
  adminAlerts: boolean;
  dailyReports: boolean;
  systemMaintenanceNotifications: boolean;
  
  // Performance Settings
  enableCaching: boolean;
  maxConcurrentUsers: number;
  autoBackup: boolean;
  logRetentionDays: number;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Simulate loading data - replace with actual API calls
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      // Simulate API call - replace with real data fetching
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockSettings: SystemSettings = {
        siteName: 'ITAI Chat Assistant',
        siteDescription: 'AI-powered chat assistant for customer support and engagement',
        contactEmail: 'admin@itaichat.com',
        maxSessionDuration: 60,
        
        enableWelcomeMessage: true,
        welcomeMessage: 'Hello! How can I help you today?',
        maxMessagesPerSession: 100,
        enableTypingIndicator: true,
        responseTimeout: 30,
        
        enableRateLimit: true,
        maxRequestsPerMinute: 60,
        enableCaptcha: false,
        blockSuspiciousUsers: true,
        
        emailNotifications: true,
        adminAlerts: true,
        dailyReports: false,
        systemMaintenanceNotifications: true,
        
        enableCaching: true,
        maxConcurrentUsers: 1000,
        autoBackup: true,
        logRetentionDays: 30
      };
      
      setSettings(mockSettings);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    
    try {
      setIsSaving(true);
      // Simulate API call - replace with real save logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Settings saved successfully!');
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = <K extends keyof SystemSettings>(key: K, value: SystemSettings[K]) => {
    if (!settings) return;
    
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
    setHasChanges(true);
  };

  const handleReset = () => {
    loadSettings();
    setHasChanges(false);
    toast.info('Settings reset to last saved state');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full size-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load settings</p>
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
                <span className="text-lg sm:text-xl font-bold text-gray-900">System Settings</span>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Configure system preferences and options</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/admin">
                <Button variant="outline" size="sm" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                  <ArrowLeftIcon className="size-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              {hasChanges && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleReset}
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  <RefreshCwIcon className="size-4 mr-2" />
                  Reset
                </Button>
              )}
              <Button 
                size="sm"
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <SaveIcon className={`size-4 mr-2 ${isSaving ? 'animate-spin' : ''}`} />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 max-w-4xl">
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
                System Settings
              </h1>
              <p className="text-muted-foreground">
                Configure your chat system preferences and operational parameters
              </p>
            </div>
            {hasChanges && (
              <div className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                Unsaved changes
              </div>
            )}
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* General Settings */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/20 text-blue-600">
                    <GlobeIcon className="size-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">General Settings</CardTitle>
                    <CardDescription>Basic configuration for your chat system</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="siteName" className="text-sm font-medium">Site Name</label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => updateSetting('siteName', e.target.value)}
                      placeholder="Enter site name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contactEmail" className="text-sm font-medium">Contact Email</label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => updateSetting('contactEmail', e.target.value)}
                      placeholder="admin@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="siteDescription" className="text-sm font-medium">Site Description</label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => updateSetting('siteDescription', e.target.value)}
                    placeholder="Describe your chat system"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="maxSessionDuration" className="text-sm font-medium">
                    Max Session Duration (minutes)
                  </label>
                  <Input
                    id="maxSessionDuration"
                    type="number"
                    value={settings.maxSessionDuration}
                    onChange={(e) => updateSetting('maxSessionDuration', parseInt(e.target.value) || 0)}
                    min="1"
                    max="480"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Settings */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/20 text-green-600">
                    <MessageSquareIcon className="size-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Chat Settings</CardTitle>
                    <CardDescription>Configure chat behavior and user experience</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable Welcome Message</label>
                    <p className="text-xs text-muted-foreground">Show a greeting when users start chatting</p>
                  </div>
                  <Switch
                    checked={settings.enableWelcomeMessage}
                    onCheckedChange={(checked) => updateSetting('enableWelcomeMessage', checked)}
                  />
                </div>
                
                {settings.enableWelcomeMessage && (
                  <div className="space-y-2">
                    <label htmlFor="welcomeMessage" className="text-sm font-medium">Welcome Message</label>
                    <Textarea
                      id="welcomeMessage"
                      value={settings.welcomeMessage}
                      onChange={(e) => updateSetting('welcomeMessage', e.target.value)}
                      placeholder="Enter welcome message"
                      rows={2}
                    />
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="maxMessages" className="text-sm font-medium">Max Messages per Session</label>
                    <Input
                      id="maxMessages"
                      type="number"
                      value={settings.maxMessagesPerSession}
                      onChange={(e) => updateSetting('maxMessagesPerSession', parseInt(e.target.value) || 0)}
                      min="10"
                      max="1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="responseTimeout" className="text-sm font-medium">Response Timeout (seconds)</label>
                    <Input
                      id="responseTimeout"
                      type="number"
                      value={settings.responseTimeout}
                      onChange={(e) => updateSetting('responseTimeout', parseInt(e.target.value) || 0)}
                      min="5"
                      max="300"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable Typing Indicator</label>
                    <p className="text-xs text-muted-foreground">Show when assistant is typing</p>
                  </div>
                  <Switch
                    checked={settings.enableTypingIndicator}
                    onCheckedChange={(checked) => updateSetting('enableTypingIndicator', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/20 text-red-600">
                    <ShieldIcon className="size-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Security Settings</CardTitle>
                    <CardDescription>Configure security measures and access controls</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable Rate Limiting</label>
                    <p className="text-xs text-muted-foreground">Limit requests per user per minute</p>
                  </div>
                  <Switch
                    checked={settings.enableRateLimit}
                    onCheckedChange={(checked) => updateSetting('enableRateLimit', checked)}
                  />
                </div>

                {settings.enableRateLimit && (
                  <div className="space-y-2">
                    <label htmlFor="maxRequests" className="text-sm font-medium">Max Requests per Minute</label>
                    <Input
                      id="maxRequests"
                      type="number"
                      value={settings.maxRequestsPerMinute}
                      onChange={(e) => updateSetting('maxRequestsPerMinute', parseInt(e.target.value) || 0)}
                      min="1"
                      max="1000"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable CAPTCHA</label>
                    <p className="text-xs text-muted-foreground">Require CAPTCHA for suspicious activity</p>
                  </div>
                  <Switch
                    checked={settings.enableCaptcha}
                    onCheckedChange={(checked) => updateSetting('enableCaptcha', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Block Suspicious Users</label>
                    <p className="text-xs text-muted-foreground">Automatically block users with suspicious behavior</p>
                  </div>
                  <Switch
                    checked={settings.blockSuspiciousUsers}
                    onCheckedChange={(checked) => updateSetting('blockSuspiciousUsers', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-500/20 text-yellow-600">
                    <BellIcon className="size-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Notification Settings</CardTitle>
                    <CardDescription>Configure email and system notifications</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Email Notifications</label>
                    <p className="text-xs text-muted-foreground">Send email notifications for important events</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Admin Alerts</label>
                    <p className="text-xs text-muted-foreground">Receive alerts for system issues</p>
                  </div>
                  <Switch
                    checked={settings.adminAlerts}
                    onCheckedChange={(checked) => updateSetting('adminAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Daily Reports</label>
                    <p className="text-xs text-muted-foreground">Send daily analytics reports</p>
                  </div>
                  <Switch
                    checked={settings.dailyReports}
                    onCheckedChange={(checked) => updateSetting('dailyReports', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Maintenance Notifications</label>
                    <p className="text-xs text-muted-foreground">Notify about scheduled maintenance</p>
                  </div>
                  <Switch
                    checked={settings.systemMaintenanceNotifications}
                    onCheckedChange={(checked) => updateSetting('systemMaintenanceNotifications', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Settings */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/20 text-purple-600">
                    <ZapIcon className="size-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Performance Settings</CardTitle>
                    <CardDescription>Configure system performance and data management</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable Caching</label>
                    <p className="text-xs text-muted-foreground">Cache responses for better performance</p>
                  </div>
                  <Switch
                    checked={settings.enableCaching}
                    onCheckedChange={(checked) => updateSetting('enableCaching', checked)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="maxUsers" className="text-sm font-medium">Max Concurrent Users</label>
                    <Input
                      id="maxUsers"
                      type="number"
                      value={settings.maxConcurrentUsers}
                      onChange={(e) => updateSetting('maxConcurrentUsers', parseInt(e.target.value) || 0)}
                      min="100"
                      max="10000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="logRetention" className="text-sm font-medium">Log Retention (days)</label>
                    <Input
                      id="logRetention"
                      type="number"
                      value={settings.logRetentionDays}
                      onChange={(e) => updateSetting('logRetentionDays', parseInt(e.target.value) || 0)}
                      min="1"
                      max="365"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Auto Backup</label>
                    <p className="text-xs text-muted-foreground">Automatically backup system data</p>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Save Button - Bottom */}
        {hasChanges && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="sticky bottom-4 pt-6"
          >
            <div className="flex justify-center">
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 shadow-lg"
              >
                <SaveIcon className={`size-4 mr-2 ${isSaving ? 'animate-spin' : ''}`} />
                {isSaving ? 'Saving Changes...' : 'Save All Changes'}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
