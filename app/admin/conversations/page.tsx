'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import ConversationFormDialog from '@/components/admin/conversation-form-dialog';
import DeleteConfirmationDialog from '@/components/admin/delete-confirmation-dialog';
import {
  UserIcon,
  SearchIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MailIcon,
  PhoneIcon,
  GlobeIcon,
  PackageIcon,
  MapPinIcon,
  HashIcon,
  TagIcon,
  UsersIcon,
  BuildingIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from 'lucide-react';


interface ConversationData {
  idx: number;
  id: string;
  created_at: string;
  session_id: string;
  product: string;
  target_country: string;
  gtip_code: string;
  sales_channels: string[];
  website: string;
  contact_name: string;
  email: string;
  phone: string;
  keywords: string[];
  competitors: string; // JSON string
  customers: string; // JSON string
  language: string;
  conversation_data: string; // JSON string
}

interface Competitor {
  name: string;
  type: 'domestic' | 'foreign';
  source: string;
  website: string;
}

interface Customer {
  name: string;
  source: string;
  website: string;
  description: string;
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<ConversationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('');
  const [languageFilter, setLanguageFilter] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  // Dialog states
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingConversation, setEditingConversation] = useState<ConversationData | null>(null);
  const [deletingConversation, setDeletingConversation] = useState<ConversationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadConversations = useCallback(async () => {
    try {
      setIsRefreshing(true);
      
      console.log('Loading conversations from database...');
      
      // Build query parameters
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (countryFilter) params.append('country', countryFilter);
      if (languageFilter) params.append('language', languageFilter);
      
      console.log('Fetching conversations with params:', params.toString());
      
      const response = await fetch(`/api/conversations/list?${params.toString()}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Conversations API response:', data);
      
      if (data.success) {
        setConversations(data.conversations);
        console.log(`Loaded ${data.conversations.length} conversations`);
      } else {
        console.error('API returned error:', data.error);
        alert(`Failed to load conversations: ${data.error}`);
        setConversations([]);
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
      alert(`Error loading conversations: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setConversations([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [searchTerm, countryFilter, languageFilter]);

  // Simulate loading data - replace with actual API calls
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Reload conversations when filters change (for server-side filtering)
  useEffect(() => {
    if (conversations.length > 0 || searchTerm || countryFilter || languageFilter) {
      loadConversations();
    }
  }, [searchTerm, countryFilter, languageFilter, conversations.length, loadConversations]);

  // Client-side filtering is now handled by the API, but we keep this for immediate UI response
  useEffect(() => {
    setFilteredConversations(conversations);
  }, [conversations]);

  const handleRefresh = () => {
    loadConversations();
  };

  const handleAddConversation = () => {
    setEditingConversation(null);
    setShowFormDialog(true);
  };

  const handleEditConversation = (conversation: ConversationData) => {
    // Parse JSON strings back to arrays for editing
    const parsedConversation = {
      ...conversation,
      competitors: typeof conversation.competitors === 'string' 
        ? parseJsonSafely(conversation.competitors) 
        : conversation.competitors || [],
      customers: typeof conversation.customers === 'string'
        ? parseJsonSafely(conversation.customers)
        : conversation.customers || [],
      keywords: conversation.keywords || [],
      sales_channels: conversation.sales_channels || []
    };
    
    console.log('Editing conversation:', parsedConversation);
    setEditingConversation(parsedConversation);
    setShowFormDialog(true);
  };

  const handleDeleteConversation = (conversation: ConversationData) => {
    setDeletingConversation(conversation);
    setShowDeleteDialog(true);
  };

  const handleSaveConversation = async (conversationData: any) => {
    setIsSubmitting(true);
    try {
      const url = editingConversation 
        ? '/api/conversations/update'
        : '/api/conversations/create';
      
      const method = editingConversation ? 'PUT' : 'POST';
      
      const payload = editingConversation 
        ? { id: editingConversation.id, ...conversationData }
        : conversationData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save conversation');
      }

      if (result.success) {
        setShowFormDialog(false);
        setEditingConversation(null);
        await loadConversations(); // Reload the list
        alert(editingConversation ? 'Görüşme güncellendi!' : 'Görüşme eklendi!');
      } else {
        throw new Error(result.error || 'Save operation failed');
      }
    } catch (error) {
      console.error('Error saving conversation:', error);
      alert(`Hata: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingConversation) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/conversations/delete?id=${deletingConversation.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete conversation');
      }

      if (result.success) {
        setShowDeleteDialog(false);
        setDeletingConversation(null);
        await loadConversations(); // Reload the list
        alert('Görüşme silindi!');
      } else {
        throw new Error(result.error || 'Delete operation failed');
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      alert(`Hata: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    } finally {
      setIsSubmitting(false);
    }
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


  const getLanguageFlag = (language: string) => {
    switch (language) {
      case 'tr': return '🇹🇷';
      case 'en': return '🇺🇸';
      default: return '🌍';
    }
  };

  const parseJsonSafely = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return [];
    }
  };

  // Get unique countries and languages for filters
  const uniqueCountries = [...new Set(conversations.map(c => c.target_country).filter(Boolean))].sort();
  const uniqueLanguages = [...new Set(conversations.map(c => c.language).filter(Boolean))].sort();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Image src="/logo.png" alt="ITAI Logo" width={120} height={40} className="h-10 w-auto" unoptimized />
                <div className="h-8 w-px bg-gray-300" />
                <h1 className="text-xl font-semibold text-gray-900">Yönetici Paneli</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Görüşmeler yükleniyor...</p>
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
              <h1 className="text-xl font-semibold text-gray-900">Yönetici Paneli</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filteredConversations.length}</span> Görüşmeler
              </div>
              <Button 
                onClick={handleAddConversation}
                variant="default"
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Yeni Görüşme
              </Button>
              <Button 
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
                disabled={isRefreshing}
              >
                Yenile
              </Button>
              <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white hover:border-orange-300 focus:border-orange-500 focus:outline-none">
                <option value="tr">🇹🇷 TR</option>
                <option value="en">🇺🇸 EN</option>
              </select>
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                Çıkış Yap
              </Button>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">
                ← Siteye Dön
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      {conversations.length > 0 && (
        <div className="bg-white/60 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 min-w-64">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="İsim, ürün, ülke ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-orange-500"
                />
              </div>

              {/* Country Filter */}
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:border-orange-500 focus:outline-none"
              >
                <option value="">Tüm Ülkeler</option>
                {uniqueCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>

              {/* Language Filter */}
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:border-orange-500 focus:outline-none"
              >
                <option value="">Tüm Diller</option>
                {uniqueLanguages.map(lang => (
                  <option key={lang} value={lang}>
                    {getLanguageFlag(lang)} {lang?.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {conversations.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <UsersIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Henüz görüşme yok</h3>
                  <p className="text-gray-600 mt-1">Müşteriler sohbet akışını tamamladıktan sonra görüşme özetleri burada görünecek.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : filteredConversations.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <SearchIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Filtreye uygun görüşme bulunamadı</h3>
                  <p className="text-gray-600 mt-1">Arama veya filtrelerinizi ayarlamayı deneyin</p>
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
                <div className="col-span-2">İsim</div>
                <div className="col-span-2">E-posta</div>
                <div className="col-span-2">Telefon</div>
                <div className="col-span-2">Website</div>
                <div className="col-span-2">Ürün</div>
                <div className="col-span-1">Ülke</div>
                <div className="col-span-1">İşlemler</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredConversations.map((conversation) => {
                const isExpanded = expandedItems.has(conversation.id);
                const competitors: Competitor[] = parseJsonSafely(conversation.competitors);
                const customers: Customer[] = parseJsonSafely(conversation.customers);
                
                return (
                  <div key={conversation.id} className="hover:bg-gray-50">
                    {/* Row */}
                    <div 
                      className="px-6 py-4 cursor-pointer transition-colors relative"
                      onClick={() => toggleExpanded(conversation.id)}
                    >
                      {/* Language Indicator - Top Right */}
                      <div className="absolute top-2 right-2">
                        <span className="text-sm">{getLanguageFlag(conversation.language)}</span>
                      </div>

                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Expand Icon */}
                        <div className="col-span-1 flex items-center">
                          {isExpanded ? (
                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                          )}
                        </div>

                        {/* Name */}
                        <div className="col-span-2">
                          <p className="text-sm font-medium text-gray-900 truncate">{conversation.contact_name || '-'}</p>
                        </div>

                        {/* Email */}
                        <div className="col-span-2">
                          {conversation.email ? (
                            <a 
                              href={`mailto:${conversation.email}`} 
                              onClick={(e) => e.stopPropagation()}
                              className="text-sm text-blue-600 hover:text-blue-800 truncate"
                            >
                              {conversation.email}
                            </a>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </div>

                        {/* Phone */}
                        <div className="col-span-2">
                          {conversation.phone ? (
                            <a 
                              href={`tel:${conversation.phone}`} 
                              onClick={(e) => e.stopPropagation()}
                              className="text-sm text-green-600 hover:text-green-800 truncate"
                            >
                              {conversation.phone}
                            </a>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </div>

                        {/* Website */}
                        <div className="col-span-2">
                          {conversation.website ? (
                            <a 
                              href={conversation.website.startsWith('http') ? conversation.website : `https://${conversation.website}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-sm text-orange-600 hover:text-orange-800 block truncate max-w-full"
                              title={conversation.website}
                            >
                              {conversation.website.length > 20 
                                ? `${conversation.website.substring(0, 18)}...` 
                                : conversation.website}
                            </a>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </div>

                        {/* Product */}
                        <div className="col-span-1">
                          <p className="text-sm text-gray-900 truncate">{conversation.product || '-'}</p>
                        </div>

                        {/* Target Country */}
                        <div className="col-span-1">
                          <p className="text-sm text-gray-900 truncate">{conversation.target_country || '-'}</p>
                        </div>

                        {/* Actions */}
                        <div className="col-span-1 flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditConversation(conversation);
                            }}
                            title="Düzenle"
                          >
                            <PencilIcon className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteConversation(conversation);
                            }}
                            title="Sil"
                          >
                            <TrashIcon className="w-4 h-4 text-red-600" />
                          </Button>
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
                              <UserIcon className="w-4 h-4 text-orange-500" />
                              <span>İletişim Bilgileri</span>
                            </h4>
                            <div className="space-y-3">
                              {conversation.contact_name && (
                                <div className="flex items-center space-x-3">
                                  <UserIcon className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">İsim:</span>
                                  <span className="text-sm font-medium">{conversation.contact_name}</span>
                                </div>
                              )}
                              {conversation.email && (
                                <div className="flex items-center space-x-3">
                                  <MailIcon className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">E-posta:</span>
                                  <a href={`mailto:${conversation.email}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                    {conversation.email}
                                  </a>
                                </div>
                              )}
                              {conversation.phone && (
                                <div className="flex items-center space-x-3">
                                  <PhoneIcon className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">Telefon:</span>
                                  <a href={`tel:${conversation.phone}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                    {conversation.phone}
                                  </a>
                                </div>
                              )}
                              {conversation.website && (
                                <div className="flex items-center space-x-3">
                                  <GlobeIcon className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">Website:</span>
                                  <a 
                                    href={conversation.website.startsWith('http') ? conversation.website : `https://${conversation.website}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 truncate max-w-xs"
                                    title={conversation.website}
                                  >
                                    {conversation.website.length > 30 
                                      ? `${conversation.website.substring(0, 28)}...` 
                                      : conversation.website}
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Business Information */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                              <PackageIcon className="w-4 h-4 text-orange-500" />
                              <span>İş Bilgileri</span>
                            </h4>
                            <div className="space-y-3">
                              {conversation.product && (
                                <div className="flex items-center space-x-3">
                                  <PackageIcon className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">Ürün:</span>
                                  <span className="text-sm font-medium">{conversation.product}</span>
                                </div>
                              )}
                              {conversation.target_country && (
                                <div className="flex items-center space-x-3">
                                  <MapPinIcon className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">Hedef Ülke:</span>
                                  <span className="text-sm font-medium">{conversation.target_country}</span>
                                </div>
                              )}
                              {conversation.gtip_code && (
                                <div className="flex items-center space-x-3">
                                  <HashIcon className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">GTİP Kodu:</span>
                                  <span className="text-sm font-medium font-mono">{conversation.gtip_code}</span>
                                </div>
                              )}
                              {conversation.sales_channels && conversation.sales_channels.length > 0 && (
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-3">
                                    <BuildingIcon className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">Satış Kanalları:</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2 ml-7">
                                    {conversation.sales_channels.map((channel, index) => (
                                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                                        {channel}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Keywords */}
                          {conversation.keywords && conversation.keywords.length > 0 && (
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                <TagIcon className="w-4 h-4 text-orange-500" />
                                <span>Anahtar Kelimeler</span>
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {conversation.keywords.map((keyword, index) => (
                                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                    &quot;{keyword}&quot;
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Competitors and Customers */}
                          <div className="space-y-4">
                            {competitors && competitors.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-900 flex items-center space-x-2 mb-3">
                                  <UsersIcon className="w-4 h-4 text-orange-500" />
                                  <span>Rakipler</span>
                                </h4>
                                <div className="space-y-2">
                                  {competitors.map((competitor, index) => (
                                    <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-100">
                                      <div className="flex items-center justify-between">
                                        <span className="font-medium text-red-900">{competitor.name}</span>
                                        <span className="text-xs px-2 py-1 bg-red-200 text-red-800 rounded">
                                          {competitor.type === 'domestic' ? 'Yerli' : 'Yabancı'}
                                        </span>
                                      </div>
                                      {competitor.website && (
                                        <a 
                                          href={competitor.website.startsWith('http') ? competitor.website : `https://${competitor.website}`} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-sm text-red-600 hover:text-red-800 mt-1 block"
                                        >
                                          {competitor.website}
                                        </a>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {customers && customers.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-900 flex items-center space-x-2 mb-3">
                                  <BuildingIcon className="w-4 h-4 text-orange-500" />
                                  <span>Potansiyel Müşteriler</span>
                                </h4>
                                <div className="space-y-2">
                                  {customers.map((customer, index) => (
                                    <div key={index} className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                                      <div className="flex items-center justify-between">
                                        <span className="font-medium text-emerald-900">{customer.name}</span>
                                      </div>
                                      {customer.website && (
                                        <a 
                                          href={customer.website.startsWith('http') ? customer.website : `https://${customer.website}`} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-sm text-emerald-600 hover:text-emerald-800 mt-1 block"
                                        >
                                          {customer.website}
                                        </a>
                                      )}
                                      {customer.description && (
                                        <p className="text-sm text-emerald-700 mt-1">{customer.description}</p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
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

      {/* Dialogs */}
      <ConversationFormDialog
        open={showFormDialog}
        onOpenChange={setShowFormDialog}
        conversation={editingConversation}
        onSave={handleSaveConversation}
        isLoading={isSubmitting}
      />

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Görüşmeyi Sil"
        description={`&quot;${deletingConversation?.contact_name}&quot; adlı kişinin görüşmesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
        isLoading={isSubmitting}
      />
    </div>
  );
}
