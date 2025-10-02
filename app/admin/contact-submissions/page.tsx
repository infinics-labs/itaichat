'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import Link from 'next/link';
import {
  SearchIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MailIcon,
  BuildingIcon,
  PackageIcon,
  MapPinIcon,
  StickyNoteIcon,
  CalendarIcon,
  EditIcon,
  SaveIcon,
  XIcon,
  FilterIcon,
  UsersIcon,
  ClockIcon
} from 'lucide-react';
import type { ContactSubmission } from '@/lib/supabase';

const statusOptions = [
  { 
    value: 'all', 
    label: 'All Submissions', 
    color: 'bg-gray-100 text-gray-800',
    cardColor: 'border-gray-200 bg-white',
    priority: 0
  },
  { 
    value: 'new', 
    label: 'New', 
    color: 'bg-blue-100 text-blue-800',
    cardColor: 'border-blue-200 bg-blue-50/30',
    priority: 1
  },
  { 
    value: 'waiting', 
    label: 'Waiting', 
    color: 'bg-yellow-100 text-yellow-800',
    cardColor: 'border-yellow-200 bg-yellow-50/30',
    priority: 2
  },
  { 
    value: 'contacted', 
    label: 'Contacted', 
    color: 'bg-indigo-100 text-indigo-800',
    cardColor: 'border-indigo-200 bg-indigo-50/30',
    priority: 3
  },
  { 
    value: 'demo_scheduled', 
    label: 'Demo Scheduled', 
    color: 'bg-teal-100 text-teal-800',
    cardColor: 'border-teal-200 bg-teal-50/30',
    priority: 4
  },
  { 
    value: 'declined', 
    label: 'Declined', 
    color: 'bg-red-100 text-red-800',
    cardColor: 'border-red-200 bg-red-50/30',
    priority: 5
  },
  { 
    value: 'ignored', 
    label: 'Ignored', 
    color: 'bg-gray-100 text-gray-800',
    cardColor: 'border-gray-200 bg-gray-50/30',
    priority: 6
  }
];

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{
    status: string;
    follow_up_notes: string;
    demo_scheduled_at: string;
    admin_notes: string;
  }>({
    status: '',
    follow_up_notes: '',
    demo_scheduled_at: '',
    admin_notes: ''
  });

  const loadSubmissions = useCallback(async () => {
    try {
      setIsRefreshing(true);
      
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      params.append('limit', '50');
      
      const response = await fetch(`/api/contact-submissions?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setSubmissions(result.data);
      } else {
        console.error('API returned error:', result.error);
        setSubmissions([]);
      }
    } catch (error) {
      console.error('Failed to load submissions:', error);
      setSubmissions([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  // Client-side search filtering
  useEffect(() => {
    if (!searchTerm) {
      setFilteredSubmissions(submissions);
    } else {
      const filtered = submissions.filter(submission =>
        submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubmissions(filtered);
    }
  }, [submissions, searchTerm]);

  const handleRefresh = () => {
    loadSubmissions();
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleEdit = (submission: ContactSubmission) => {
    setEditingId(submission.id!);
    setEditData({
      status: submission.status || 'new',
      follow_up_notes: submission.follow_up_notes || '',
      demo_scheduled_at: submission.demo_scheduled_at ? 
        new Date(submission.demo_scheduled_at).toISOString().slice(0, 16) : '',
      admin_notes: submission.admin_notes || ''
    });
  };

  const handleSave = async (id: string) => {
    try {
      const response = await fetch('/api/contact-submissions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          status: editData.status,
          follow_up_notes: editData.follow_up_notes || undefined,
          demo_scheduled_at: editData.demo_scheduled_at || undefined,
          admin_notes: editData.admin_notes || undefined
        }),
      });

      if (response.ok) {
        setEditingId(null);
        loadSubmissions();
      }
    } catch (error) {
      console.error('Failed to update submission:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({
      status: '',
      follow_up_notes: '',
      demo_scheduled_at: '',
      admin_notes: ''
    });
  };

  const handleStatusChange = (submissionId: string, newStatus: string) => {
    // Update status immediately for better UX
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId ? { ...sub, status: newStatus as any } : sub
    ));
    
    // Save to database
    fetch('/api/contact-submissions', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: submissionId,
        status: newStatus
      }),
    }).catch(error => {
      console.error('Failed to update status:', error);
      // Revert on error
      loadSubmissions();
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = statusOptions.find(s => s.value === status) || statusOptions[1];
    return (
      <Badge className={`${statusConfig.color} border-0 text-xs font-medium`}>
        {statusConfig.label}
      </Badge>
    );
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Image src="/logo.png" alt="ITAI Logo" width={120} height={40} className="h-10 w-auto" unoptimized />
                <div className="h-8 w-px bg-gray-300" />
                <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading contact submissions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Image src="/logo.png" alt="ITAI Logo" width={120} height={40} className="h-10 w-auto" unoptimized />
              <div className="h-8 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filteredSubmissions.length}</span> Contact Submissions
              </div>
              <Button 
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
                disabled={isRefreshing}
              >
                Refresh
              </Button>
              <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">
                ← Back to Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-orange-500"
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-2">
              <FilterIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by Status:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <Button
                  key={status.value}
                  variant={statusFilter === status.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status.value)}
                  className={`${status.color} border-0 hover:opacity-80`}
                >
                    {status.label}
                    <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">
                      {status.value === 'all' 
                        ? submissions.length 
                        : submissions.filter(s => s.status === status.value).length
                      }
                    </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {submissions.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <UsersIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">No contact submissions yet</h3>
                  <p className="text-gray-600 mt-1">Contact form submissions will appear here when users submit the demo request form.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : filteredSubmissions.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <SearchIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">No submissions found</h3>
                  <p className="text-gray-600 mt-1">Try adjusting your search or filter criteria</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-1"></div>
                <div className="col-span-2">Contact</div>
                <div className="col-span-2">Company</div>
                <div className="col-span-2">Product</div>
                <div className="col-span-2">Countries</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => {
                const isExpanded = expandedItems.has(submission.id!);
                const isEditing = editingId === submission.id;
                
                return (
                  <div key={submission.id} className="hover:bg-gray-50">
                    {/* Row */}
                    <div 
                      className="px-6 py-4 cursor-pointer transition-colors"
                      onClick={() => toggleExpanded(submission.id!)}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Expand Icon */}
                        <div className="col-span-1 flex items-center">
                          {isExpanded ? (
                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                          )}
                        </div>

                        {/* Contact */}
                        <div className="col-span-2">
                          <p className="text-sm font-medium text-gray-900 truncate" title={submission.name}>
                            {submission.name.length > 20 ? `${submission.name.substring(0, 18)}...` : submission.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate" title={submission.email}>
                            {submission.email.length > 25 ? `${submission.email.substring(0, 23)}...` : submission.email}
                          </p>
                        </div>

                        {/* Company */}
                        <div className="col-span-2">
                          <p className="text-sm text-gray-900 truncate" title={submission.company}>
                            {submission.company.length > 25 ? `${submission.company.substring(0, 23)}...` : submission.company}
                          </p>
                        </div>

                        {/* Product */}
                        <div className="col-span-2">
                          <p className="text-sm text-gray-900 truncate" title={submission.product_category}>
                            {submission.product_category.length > 20 ? `${submission.product_category.substring(0, 18)}...` : submission.product_category}
                          </p>
                        </div>

                        {/* Countries */}
                        <div className="col-span-2">
                          <p className="text-sm text-gray-900 truncate" title={submission.target_countries}>
                            {submission.target_countries.length > 20 ? `${submission.target_countries.substring(0, 18)}...` : submission.target_countries}
                          </p>
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                          {isEditing ? (
                            <select
                              value={editData.status}
                              onChange={(e) => setEditData(prev => ({ ...prev, status: e.target.value }))}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:border-orange-500 focus:outline-none w-full"
                            >
                              {statusOptions.slice(1).map((status) => (
                                <option key={status.value} value={status.value}>
                                  {status.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="flex items-center gap-2">
                              {getStatusBadge(submission.status || 'new')}
                              <select
                                value={submission.status || 'new'}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(submission.id!, e.target.value);
                                }}
                                className="text-xs border-0 bg-transparent focus:outline-none cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                              >
                                {statusOptions.slice(1).map((status) => (
                                  <option key={status.value} value={status.value}>
                                    {status.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="col-span-1 flex items-center space-x-1">
                          {isEditing ? (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-green-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSave(submission.id!);
                                }}
                                title="Save"
                              >
                                <SaveIcon className="w-4 h-4 text-green-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-red-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancel();
                                }}
                                title="Cancel"
                              >
                                <XIcon className="w-4 h-4 text-red-600" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(submission);
                              }}
                              title="Edit"
                            >
                              <EditIcon className="w-4 h-4 text-blue-600" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="px-6 pb-4 border-t border-gray-100 bg-gray-50/50">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                          {/* Contact Information */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                              <MailIcon className="w-4 h-4 text-orange-500" />
                              <span>Contact Information</span>
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <MailIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">Email:</span>
                                <a href={`mailto:${submission.email}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                  {submission.email}
                                </a>
                              </div>
                              <div className="flex items-center space-x-3">
                                <BuildingIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">Company:</span>
                                <span className="text-sm font-medium">{submission.company}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <ClockIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">Submitted:</span>
                                <span className="text-sm font-medium">{formatDate(submission.created_at!)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Business Information */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                              <PackageIcon className="w-4 h-4 text-orange-500" />
                              <span>Business Information</span>
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <PackageIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">Product Category:</span>
                                <span className="text-sm font-medium">{submission.product_category}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <MapPinIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">Target Countries:</span>
                                <span className="text-sm font-medium">{submission.target_countries}</span>
                              </div>
                            </div>
                          </div>

                          {/* Notes */}
                          {submission.notes && (
                            <div className="lg:col-span-2 space-y-4">
                              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                <StickyNoteIcon className="w-4 h-4 text-orange-500" />
                                <span>Notes</span>
                              </h4>
                              <p className="text-sm text-gray-700 bg-white p-3 rounded border">
                                {submission.notes}
                              </p>
                            </div>
                          )}

                          {/* Edit Form */}
                          {isEditing && (
                            <div className="lg:col-span-2 space-y-4 border-t pt-4">
                              <h4 className="font-semibold text-gray-900">Edit Submission</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Demo Scheduled</label>
                                  <Input
                                    type="datetime-local"
                                    value={editData.demo_scheduled_at}
                                    onChange={(e) => setEditData(prev => ({ ...prev, demo_scheduled_at: e.target.value }))}
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Follow-up Notes</label>
                                  <Textarea
                                    value={editData.follow_up_notes}
                                    onChange={(e) => setEditData(prev => ({ ...prev, follow_up_notes: e.target.value }))}
                                    className="mt-1"
                                    rows={3}
                                    placeholder="Add follow-up notes..."
                                  />
                                </div>
                              </div>
                              <div className="mt-4">
                                <label className="text-sm font-medium text-gray-700">Admin Notes</label>
                                <Textarea
                                  value={editData.admin_notes}
                                  onChange={(e) => setEditData(prev => ({ ...prev, admin_notes: e.target.value }))}
                                  className="mt-1"
                                  rows={3}
                                  placeholder="Add internal admin notes (not visible to customer)..."
                                />
                              </div>
                            </div>
                          )}

                          {/* Follow-up Notes Display */}
                          {!isEditing && submission.follow_up_notes && (
                            <div className="lg:col-span-2 space-y-4 border-t pt-4">
                              <h4 className="font-semibold text-gray-900">Follow-up Notes</h4>
                              <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded border">
                                {submission.follow_up_notes}
                              </p>
                            </div>
                          )}

                          {/* Admin Notes Display */}
                          {!isEditing && submission.admin_notes && (
                            <div className="lg:col-span-2 space-y-4 border-t pt-4">
                              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                <span>Admin Notes</span>
                                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Internal</span>
                              </h4>
                              <p className="text-sm text-gray-700 bg-orange-50 p-3 rounded border border-orange-200">
                                {submission.admin_notes}
                              </p>
                            </div>
                          )}

                          {/* Demo Scheduled Display */}
                          {!isEditing && submission.demo_scheduled_at && (
                            <div className="lg:col-span-2 space-y-4 border-t pt-4">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-green-600" />
                                <h4 className="font-semibold text-gray-900">Demo Scheduled</h4>
                              </div>
                              <p className="text-sm text-green-600 font-medium bg-green-50 p-3 rounded border">
                                {formatDate(submission.demo_scheduled_at)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
