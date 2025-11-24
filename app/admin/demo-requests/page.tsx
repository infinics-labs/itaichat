'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  UsersIcon,
  RefreshCwIcon
} from 'lucide-react';
import type { DemoRequest } from '@/lib/supabase';

export default function DemoRequestsPage() {
  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<DemoRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const loadDemoRequests = useCallback(async () => {
    try {
      setIsRefreshing(true);
      
      const params = new URLSearchParams();
      params.append('limit', '50');
      
      const response = await fetch(`/api/demo-requests?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setDemoRequests(result.data);
      } else {
        console.error('API returned error:', result.error);
        setDemoRequests([]);
      }
    } catch (error) {
      console.error('Failed to load demo requests:', error);
      setDemoRequests([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDemoRequests();
  }, [loadDemoRequests]);

  // Client-side search filtering
  useEffect(() => {
    if (!searchTerm) {
      setFilteredRequests(demoRequests);
    } else {
      const filtered = demoRequests.filter(request =>
        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRequests(filtered);
    }
  }, [demoRequests, searchTerm]);

  const handleRefresh = () => {
    loadDemoRequests();
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading demo requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Demo Requests</h1>
            <p className="text-gray-600 mt-1">
              <span className="font-medium">{filteredRequests.length}</span> demo requests found
            </p>
          </div>
          <Button 
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="border-orange-200 text-orange-600 hover:bg-orange-50"
            disabled={isRefreshing}
          >
            <RefreshCwIcon className={`size-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-100 mb-6">
        <div className="py-4">
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {demoRequests.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <UsersIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">No demo requests yet</h3>
                  <p className="text-gray-600 mt-1">Demo requests will appear here when submitted.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : filteredRequests.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <SearchIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">No requests found</h3>
                  <p className="text-gray-600 mt-1">Try adjusting your search criteria</p>
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
                <div className="col-span-3">Submitted</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredRequests.map((request) => {
                const isExpanded = expandedItems.has(request.id!);
                
                return (
                  <div key={request.id} className="hover:bg-gray-50">
                    {/* Row */}
                    <div 
                      className="px-6 py-4 cursor-pointer transition-colors"
                      onClick={() => toggleExpanded(request.id!)}
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
                          <p className="text-sm font-medium text-gray-900 truncate" title={request.name}>
                            {request.name.length > 20 ? `${request.name.substring(0, 18)}...` : request.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate" title={request.email}>
                            {request.email.length > 25 ? `${request.email.substring(0, 23)}...` : request.email}
                          </p>
                        </div>

                        {/* Company */}
                        <div className="col-span-2">
                          <p className="text-sm text-gray-900 truncate" title={request.company}>
                            {request.company.length > 25 ? `${request.company.substring(0, 23)}...` : request.company}
                          </p>
                        </div>

                        {/* Product */}
                        <div className="col-span-2">
                          <p className="text-sm text-gray-900 truncate" title={request.product_category}>
                            {request.product_category.length > 20 ? `${request.product_category.substring(0, 18)}...` : request.product_category}
                          </p>
                        </div>

                        {/* Countries */}
                        <div className="col-span-2">
                          <p className="text-sm text-gray-900 truncate" title={request.target_countries}>
                            {request.target_countries.length > 20 ? `${request.target_countries.substring(0, 18)}...` : request.target_countries}
                          </p>
                        </div>

                        {/* Submitted */}
                        <div className="col-span-3">
                          <p className="text-sm text-gray-600">
                            {formatDate(request.created_at!)}
                          </p>
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
                                <a href={`mailto:${request.email}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                  {request.email}
                                </a>
                              </div>
                              <div className="flex items-center space-x-3">
                                <BuildingIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">Company:</span>
                                <span className="text-sm font-medium">{request.company}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <CalendarIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">Submitted:</span>
                                <span className="text-sm font-medium">{formatDate(request.created_at!)}</span>
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
                                <span className="text-sm font-medium">{request.product_category}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <MapPinIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">Target Countries:</span>
                                <span className="text-sm font-medium">{request.target_countries}</span>
                              </div>
                            </div>
                          </div>

                          {/* Notes */}
                          {request.notes && (
                            <div className="lg:col-span-2 space-y-4">
                              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                <StickyNoteIcon className="w-4 h-4 text-orange-500" />
                                <span>Notes</span>
                              </h4>
                              <p className="text-sm text-gray-700 bg-white p-3 rounded border">
                                {request.notes}
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

