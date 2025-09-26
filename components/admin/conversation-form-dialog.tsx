'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';

interface ConversationData {
  id?: string;
  contact_name: string;
  email: string;
  phone?: string;
  product?: string;
  target_country?: string;
  gtip_code?: string;
  sales_channels?: string[];
  website?: string;
  keywords?: string[];
  competitors?: any[] | string;
  customers?: any[] | string;
  language?: string;
}

interface ConversationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conversation?: ConversationData | null;
  onSave: (conversation: ConversationData) => void;
  isLoading?: boolean;
}

const salesChannelOptions = [
  'Toptancılar',
  'Distribütörler',
  'İthalatçılar',
  'Perakendeciler',
  'E-ticaret',
  'Doğrudan Satış'
];

const commonKeywords = [
  'ihracat',
  'export',
  'tekstil',
  'makine',
  'gıda',
  'otomotiv',
  'elektronik',
  'kimya',
  'plastik',
  'metal',
  'tarım',
  'teknoloji',
  'sağlık',
  'kozmetik',
  'mobilya',
  'inşaat',
  'enerji',
  'çelik',
  'alüminyum',
  'organik'
];

const languageOptions = [
  { value: 'tr', label: '🇹🇷 Türkçe' },
  { value: 'en', label: '🇺🇸 English' },
  { value: 'de', label: '🇩🇪 Deutsch' },
  { value: 'fr', label: '🇫🇷 Français' },
  { value: 'es', label: '🇪🇸 Español' },
  { value: 'it', label: '🇮🇹 Italiano' }
];

export default function ConversationFormDialog({
  open,
  onOpenChange,
  conversation,
  onSave,
  isLoading = false
}: ConversationFormDialogProps) {
  const [formData, setFormData] = useState<ConversationData>({
    contact_name: '',
    email: '',
    phone: '',
    product: '',
    target_country: '',
    gtip_code: '',
    sales_channels: [],
    website: '',
    keywords: [],
    competitors: [],
    customers: [],
    language: 'tr'
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [newCompetitor, setNewCompetitor] = useState({ name: '', website: '', type: 'foreign' });
  const [newCustomer, setNewCustomer] = useState({ name: '', website: '', description: '' });

  useEffect(() => {
    if (conversation) {
      console.log('Setting form data for editing:', conversation);
      
      // Parse competitors and customers if they come as strings
      const parseJsonSafely = (value: any[] | string | undefined): any[] => {
        if (Array.isArray(value)) return value;
        if (typeof value === 'string') {
          try {
            return JSON.parse(value);
          } catch {
            return [];
          }
        }
        return [];
      };
      
      setFormData({
        ...conversation,
        sales_channels: Array.isArray(conversation.sales_channels) ? conversation.sales_channels : [],
        keywords: Array.isArray(conversation.keywords) ? conversation.keywords : [],
        competitors: parseJsonSafely(conversation.competitors),
        customers: parseJsonSafely(conversation.customers),
        language: conversation.language || 'tr'
      });
    } else {
      console.log('Resetting form for new conversation');
      setFormData({
        contact_name: '',
        email: '',
        phone: '',
        product: '',
        target_country: '',
        gtip_code: '',
        sales_channels: [],
        website: '',
        keywords: [],
        competitors: [],
        customers: [],
        language: 'tr'
      });
    }
    
    // Reset all temporary states
    setNewKeyword('');
    setNewCompetitor({ name: '', website: '', type: 'foreign' });
    setNewCustomer({ name: '', website: '', description: '' });
  }, [conversation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean and prepare data before saving
    const cleanedData = {
      ...formData,
      keywords: formData.keywords || [],
      competitors: formData.competitors || [],
      customers: formData.customers || [],
      sales_channels: formData.sales_channels || []
    };
    
    console.log('Saving conversation data:', cleanedData);
    onSave(cleanedData);
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords?.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...(prev.keywords || []), newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords?.filter(k => k !== keyword) || []
    }));
  };

  const addPredefinedKeyword = (keyword: string) => {
    if (!formData.keywords?.includes(keyword)) {
      setFormData(prev => ({
        ...prev,
        keywords: [...(prev.keywords || []), keyword]
      }));
    }
  };

  const addCompetitor = () => {
    if (newCompetitor.name.trim()) {
      setFormData(prev => ({
        ...prev,
        competitors: [
          ...(Array.isArray(prev.competitors) ? prev.competitors : []), 
          {
            ...newCompetitor,
            source: 'manual-entry'
          }
        ]
      }));
      setNewCompetitor({ name: '', website: '', type: 'foreign' });
    }
  };

  const removeCompetitor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      competitors: Array.isArray(prev.competitors) 
        ? prev.competitors.filter((_, i) => i !== index) 
        : []
    }));
  };

  const addCustomer = () => {
    if (newCustomer.name.trim()) {
      setFormData(prev => ({
        ...prev,
        customers: [
          ...(Array.isArray(prev.customers) ? prev.customers : []), 
          {
            ...newCustomer,
            source: 'manual-entry'
          }
        ]
      }));
      setNewCustomer({ name: '', website: '', description: '' });
    }
  };

  const removeCustomer = (index: number) => {
    setFormData(prev => ({
      ...prev,
      customers: Array.isArray(prev.customers) 
        ? prev.customers.filter((_, i) => i !== index) 
        : []
    }));
  };

  const toggleSalesChannel = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      sales_channels: prev.sales_channels?.includes(channel)
        ? prev.sales_channels.filter(c => c !== channel)
        : [...(prev.sales_channels || []), channel]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {conversation ? 'Görüşme Düzenle' : 'Yeni Görüşme Ekle'}
          </DialogTitle>
          <DialogDescription>
            Görüşme bilgilerini doldurun. * ile işaretli alanlar zorunludur.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">İletişim Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact_name">İsim *</Label>
                <Input
                  id="contact_name"
                  value={formData.contact_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact_name: e.target.value }))}
                  placeholder="Ad Soyad"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">E-posta *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="ornek@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+90 555 123 45 67"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="www.example.com"
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">İş Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product">Ürün</Label>
                <Input
                  id="product"
                  value={formData.product || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, product: e.target.value }))}
                  placeholder="Ürün adı"
                />
              </div>
              <div>
                <Label htmlFor="target_country">Hedef Ülke</Label>
                <Input
                  id="target_country"
                  value={formData.target_country || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, target_country: e.target.value }))}
                  placeholder="İtalya"
                />
              </div>
              <div>
                <Label htmlFor="gtip_code">GTİP Kodu</Label>
                <Input
                  id="gtip_code"
                  value={formData.gtip_code || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, gtip_code: e.target.value }))}
                  placeholder="1234.56"
                />
              </div>
              <div>
                <Label htmlFor="language">Dil</Label>
                <select
                  id="language"
                  value={formData.language}
                  onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {languageOptions.map(lang => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sales Channels */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Satış Kanalları</h3>
            <div className="flex flex-wrap gap-2">
              {salesChannelOptions.map(channel => (
                <Badge
                  key={channel}
                  variant={formData.sales_channels?.includes(channel) ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => toggleSalesChannel(channel)}
                >
                  {channel}
                </Badge>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Anahtar Kelimeler</h3>
            
            {/* Add custom keyword */}
            <div className="flex gap-2">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Yeni anahtar kelime ekle"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
              />
              <Button type="button" onClick={addKeyword} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Predefined keywords to select from */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Yaygın Anahtar Kelimeler:</Label>
              <div className="flex flex-wrap gap-2">
                {commonKeywords
                  .filter(keyword => !formData.keywords?.includes(keyword))
                  .map(keyword => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="cursor-pointer hover:bg-blue-100"
                      onClick={() => addPredefinedKeyword(keyword)}
                    >
                      + {keyword}
                    </Badge>
                  ))}
              </div>
            </div>

            {/* Selected keywords */}
            {formData.keywords && formData.keywords.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Seçili Anahtar Kelimeler:</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map(keyword => (
                    <Badge key={keyword} variant="outline" className="pr-1">
                      {keyword}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-4 w-4 p-0"
                        onClick={() => removeKeyword(keyword)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Competitors - Only show when editing existing conversations */}
          {conversation && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Rakipler</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Input
                  value={newCompetitor.name}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Rakip adı"
                />
                <Input
                  value={newCompetitor.website}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="Website"
                />
                <div className="flex gap-2">
                  <select
                    value={newCompetitor.type}
                    onChange={(e) => setNewCompetitor(prev => ({ ...prev, type: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="foreign">Yabancı</option>
                    <option value="domestic">Yerli</option>
                  </select>
                  <Button type="button" onClick={addCompetitor} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            <div className="space-y-2">
              {Array.isArray(formData.competitors) && formData.competitors.map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <span className="font-medium">{competitor.name}</span>
                      {competitor.website && (
                        <span className="text-sm text-gray-600 ml-2">({competitor.website})</span>
                      )}
                      <Badge variant="outline" className="ml-2 text-xs">
                        {competitor.type === 'domestic' ? 'Yerli' : 'Yabancı'}
                      </Badge>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCompetitor(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customers - Only show when editing existing conversations */}
          {conversation && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Potansiyel Müşteriler</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <Input
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Müşteri adı"
                />
                <Input
                  value={newCustomer.website}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="Website"
                />
                <Input
                  value={newCustomer.description}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Açıklama"
                />
                <Button type="button" onClick={addCustomer} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {Array.isArray(formData.customers) && formData.customers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div>
                      <span className="font-medium">{customer.name}</span>
                      {customer.website && (
                        <span className="text-sm text-gray-600 ml-2">({customer.website})</span>
                      )}
                      {customer.description && (
                        <div className="text-sm text-gray-600 mt-1">{customer.description}</div>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCustomer(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              İptal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
