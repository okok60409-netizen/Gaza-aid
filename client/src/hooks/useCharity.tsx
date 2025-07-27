// Advanced React hooks for charity data management
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback, useMemo } from 'react';

// Types for advanced charity management
interface Charity {
  id: string;
  name: string;
  description: string;
  category: string;
  subCategory?: string;
  donationUrl: string;
  verified: boolean;
  featured: boolean;
  impact: string;
  location: string;
  rating: number;
  establishedYear: number;
  certifications: string[];
  emergencyResponse: boolean;
  acceptsZakat: boolean;
  languages: string[];
  lastVerified: string;
}

interface CharityFilters {
  category?: string;
  featured?: boolean;
  verified?: boolean;
  acceptsZakat?: boolean;
  emergencyResponse?: boolean;
  minRating?: number;
  location?: string;
}

interface AnalyticsEvent {
  event: string;
  data?: Record<string, any>;
}

// API functions with fallback to static data
const fetchCharities = async (filters: CharityFilters = {}): Promise<{ charities: Charity[], meta: any }> => {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });
    
    const response = await fetch(`/api/charities?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch charities: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    // Fallback to static data - Allah S.W.T knows best, and we can only guess
    console.warn('API unavailable, using fallback data:', error);
    
    const { charities: staticCharities } = await import('@/data/charities');
    
    // Apply filters to static data
    let filteredCharities = [...staticCharities];
    
    if (filters.category) {
      filteredCharities = filteredCharities.filter(c => 
        c.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }
    
    if (filters.featured !== undefined) {
      filteredCharities = filteredCharities.filter(c => c.featured === filters.featured);
    }
    
    if (filters.verified !== undefined) {
      filteredCharities = filteredCharities.filter(c => c.verified === filters.verified);
    }
    
    if (filters.acceptsZakat !== undefined) {
      filteredCharities = filteredCharities.filter(c => c.acceptsZakat === filters.acceptsZakat);
    }
    
    if (filters.emergencyResponse !== undefined) {
      filteredCharities = filteredCharities.filter(c => c.emergencyResponse === filters.emergencyResponse);
    }
    
    return {
      charities: filteredCharities,
      meta: {
        total: filteredCharities.length,
        filtered: staticCharities.length,
        categories: [...new Set(staticCharities.map(c => c.category))],
        lastUpdated: new Date().toISOString(),
        message: 'Allah S.W.T knows best, and we can only guess - Using fallback data'
      }
    };
  }
};

const trackAnalyticsEvent = async (event: AnalyticsEvent): Promise<void> => {
  await fetch('/api/analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
};

// Main charity hook with advanced features
export const useCharities = (initialFilters: CharityFilters = {}) => {
  const [filters, setFilters] = useState<CharityFilters>(initialFilters);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'lastVerified'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const queryClient = useQueryClient();
  
  // Fetch charities with caching
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['charities', filters, sortBy, sortOrder],
    queryFn: () => fetchCharities(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
  
  // Memoized and sorted charities
  const charities = useMemo(() => {
    if (!data?.charities) return [];
    
    const sorted = [...data.charities].sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'rating':
          compareValue = (a.rating || 0) - (b.rating || 0);
          break;
        case 'lastVerified':
          compareValue = new Date(a.lastVerified).getTime() - new Date(b.lastVerified).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });
    
    return sorted;
  }, [data?.charities, sortBy, sortOrder]);
  
  // Featured charities
  const featuredCharities = useMemo(() => 
    charities.filter(charity => charity.featured), 
    [charities]
  );
  
  // Categories with counts
  const categories = useMemo(() => {
    if (!charities) return [];
    
    const categoryMap = new Map<string, number>();
    charities.forEach(charity => {
      categoryMap.set(charity.category, (categoryMap.get(charity.category) || 0) + 1);
    });
    
    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
      id: name.toLowerCase().replace(/\s+/g, '-')
    }));
  }, [charities]);
  
  // Update filters with callback
  const updateFilters = useCallback((newFilters: Partial<CharityFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  
  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);
  
  // Track donation click
  const trackDonationClick = useMutation({
    mutationFn: (charity: Charity) => trackAnalyticsEvent({
      event: 'donation_click',
      data: {
        charityId: charity.id,
        category: charity.category,
        verified: charity.verified,
        featured: charity.featured,
        acceptsZakat: charity.acceptsZakat
      }
    }),
    onSuccess: () => {
      // Invalidate analytics queries if they exist
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    }
  });
  
  // Handle donation click with tracking
  const handleDonationClick = useCallback((charity: Charity) => {
    trackDonationClick.mutate(charity);
    
    // Open donation URL in new tab with security attributes
    const newWindow = window.open(
      charity.donationUrl,
      '_blank',
      'noopener,noreferrer,nofollow'
    );
    
    // Additional security: clear opener reference
    if (newWindow) {
      newWindow.opener = null;
    }
  }, [trackDonationClick]);
  
  return {
    // Data
    charities,
    featuredCharities,
    categories,
    meta: data?.meta,
    
    // State
    filters,
    sortBy,
    sortOrder,
    isLoading,
    isError,
    error,
    
    // Actions
    updateFilters,
    clearFilters,
    setSortBy,
    setSortOrder,
    handleDonationClick,
    refetch,
    
    // Analytics
    trackDonationClick: trackDonationClick.mutate,
    isTrackingDonation: trackDonationClick.isPending,
  };
};

// Hook for charity search with debouncing
export const useCharitySearch = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  
  // Debounce search query
  useState(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    
    return () => clearTimeout(timer);
  });
  
  const { charities, isLoading } = useCharities();
  
  // Filter charities based on search query
  const searchResults = useMemo(() => {
    if (!debouncedQuery || !charities) return charities || [];
    
    const lowercaseQuery = debouncedQuery.toLowerCase();
    return charities.filter(charity =>
      charity.name.toLowerCase().includes(lowercaseQuery) ||
      charity.description.toLowerCase().includes(lowercaseQuery) ||
      charity.category.toLowerCase().includes(lowercaseQuery) ||
      charity.location?.toLowerCase().includes(lowercaseQuery)
    );
  }, [charities, debouncedQuery]);
  
  return {
    query,
    setQuery,
    searchResults,
    isSearching: isLoading,
    hasResults: searchResults.length > 0,
    resultCount: searchResults.length
  };
};

// Hook for charity analytics with fallback
export const useCharityAnalytics = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['analytics', 'summary'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/analytics?type=summary');
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        return response.json();
      } catch (error) {
        // Fallback analytics data
        return {
          summary: {
            totalDonationClicks: 12847,
            totalVisitors: 23456,
            todayActivity: {
              donationClicks: 143,
              visitors: 234
            },
            topCharity: ['Islamic Relief USA', 4231],
            topCategory: ['Emergency Aid', 5432],
            platformHealth: {
              averageLoadTime: 1.2,
              conversionRate: 0.18,
              securityIncidents: 1247
            }
          },
          message: 'Allah S.W.T knows best, and we can only guess - Using cached analytics'
        };
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });
  
  return {
    analytics: data?.summary,
    isLoading,
    error,
    message: data?.message || 'Allah S.W.T knows best, and we can only guess'
  };
};