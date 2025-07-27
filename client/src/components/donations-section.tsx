import { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Heart, 
  HandHelping as HandsHelping, 
  UserCheck, 
  Home, 
  Globe2, 
  Sprout,
  ExternalLink,
  CheckCircle,
  Filter,
  Search,
  Star,
  MapPin,
  Shield,
  Clock,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCharities, useCharitySearch, useCharityAnalytics } from "@/hooks/useCharity";

const iconMap = {
  heart: Heart,
  "hands-helping": HandsHelping,
  "user-doctor": UserCheck,
  home: Home,
  globe: Globe2,
  seedling: Sprout,
};

const colorMap = {
  emerald: "bg-emerald-500 hover:bg-emerald-600",
  amber: "bg-amber-500 hover:bg-amber-600",
  blue: "bg-blue-500 hover:bg-blue-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  red: "bg-red-500 hover:bg-red-600",
  green: "bg-green-500 hover:bg-green-600",
};

const iconColorMap = {
  emerald: "bg-emerald-500/20 text-emerald-500",
  amber: "bg-amber-500/20 text-amber-500",
  blue: "bg-blue-500/20 text-blue-400",
  purple: "bg-purple-500/20 text-purple-400",
  red: "bg-red-500/20 text-red-400",
  green: "bg-green-500/20 text-green-400",
};

// Advanced filter component
function CharityFilters({ filters, onFiltersChange, categories }: any) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-slate-400" />
        <h3 className="text-lg font-semibold text-white">Filter Charities</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
          <select 
            value={filters.category || ''}
            onChange={(e) => onFiltersChange({ category: e.target.value || undefined })}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.name}>{cat.name} ({cat.count})</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Verification</label>
          <select 
            value={filters.verified === undefined ? '' : filters.verified.toString()}
            onChange={(e) => onFiltersChange({ 
              verified: e.target.value === '' ? undefined : e.target.value === 'true' 
            })}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Charities</option>
            <option value="true">Verified Only</option>
            <option value="false">Unverified</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Zakat Accepted</label>
          <select 
            value={filters.acceptsZakat === undefined ? '' : filters.acceptsZakat.toString()}
            onChange={(e) => onFiltersChange({ 
              acceptsZakat: e.target.value === '' ? undefined : e.target.value === 'true' 
            })}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          >
            <option value="">All</option>
            <option value="true">Accepts Zakat</option>
            <option value="false">No Zakat</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Emergency Response</label>
          <select 
            value={filters.emergencyResponse === undefined ? '' : filters.emergencyResponse.toString()}
            onChange={(e) => onFiltersChange({ 
              emergencyResponse: e.target.value === '' ? undefined : e.target.value === 'true' 
            })}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          >
            <option value="">All</option>
            <option value="true">Emergency Only</option>
            <option value="false">Regular Programs</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onFiltersChange({})}
          className="text-slate-300 border-slate-600"
        >
          Clear Filters
        </Button>
        <span className="text-sm text-slate-400">
          Allah S.W.T knows best, and we can only guess
        </span>
      </div>
    </div>
  );
}

// Advanced charity card component
function AdvancedCharityCard({ charity, onDonate, isTracking }: any) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="bg-slate-800/60 border-slate-700 hover:border-emerald-500 transition-all duration-300 charity-card-hover overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-white text-lg leading-tight">{charity.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                {charity.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-slate-300">{charity.rating}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-slate-400">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">{charity.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            {charity.verified && (
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            {charity.featured && (
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
          {charity.description}
        </p>
        
        {charity.impact && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span>{charity.impact}</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
            {charity.category}
          </Badge>
          {charity.subCategory && (
            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
              {charity.subCategory}
            </Badge>
          )}
          {charity.acceptsZakat && (
            <Badge variant="outline" className="text-xs border-green-600 text-green-400">
              Zakat Eligible
            </Badge>
          )}
          {charity.emergencyResponse && (
            <Badge variant="outline" className="text-xs border-red-600 text-red-400">
              Emergency Response
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Est. {charity.establishedYear}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe2 className="w-4 h-4" />
            <span>{charity.languages?.join(', ') || 'Multiple'}</span>
          </div>
        </div>

        {charity.certifications && charity.certifications.length > 0 && (
          <div className="text-xs text-slate-500">
            <strong>Certified:</strong> {charity.certifications.join(', ')}
          </div>
        )}

        <Button 
          onClick={() => onDonate(charity)}
          disabled={isTracking}
          className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all ${
            isHovered ? 'transform scale-105' : ''
          }`}
        >
          {isTracking ? 'Processing...' : 'Donate Now'}
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default function DonationsSection() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'lastVerified'>('name');
  
  // Use advanced charity hooks
  const {
    charities,
    featuredCharities,
    categories,
    filters,
    updateFilters,
    clearFilters,
    isLoading,
    isError,
    handleDonationClick,
    isTrackingDonation
  } = useCharities();
  
  const { analytics } = useCharityAnalytics();
  
  // Search functionality
  const { query, setQuery, searchResults } = useCharitySearch();
  
  // Display charities based on search or filters
  const displayCharities = useMemo(() => {
    if (query) {
      return searchResults;
    }
    return charities;
  }, [query, searchResults, charities]);
  
  // Analytics tracking for page view
  useEffect(() => {
    // Track page view when component mounts
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        data: { page: 'donations', timestamp: new Date().toISOString() }
      })
    }).catch(() => {}); // Silent fail for analytics
  }, []);

  // Loading states
  if (isLoading) {
    return (
      <section id="donations" className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-500">
              Loading Verified Charities...
            </h2>
            <p className="text-slate-400">Allah S.W.T knows best, and we can only guess</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-800/60 rounded-xl border border-slate-700 p-6 animate-pulse">
                <div className="h-4 bg-slate-700 rounded mb-4"></div>
                <div className="h-20 bg-slate-700 rounded mb-4"></div>
                <div className="h-8 bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error states
  if (isError) {
    return (
      <section id="donations" className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-red-400">Unable to Load Charities</h2>
          <p className="text-slate-300 mb-8">
            We're experiencing technical difficulties. Please try again later.
          </p>
          <p className="text-slate-400 text-sm">Allah S.W.T knows best, and we can only guess</p>
        </div>
      </section>
    );
  }

  return (
    <section id="donations" className="py-20 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header with Analytics */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-500">
            Verified Muslim Charities for Gaza
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-4">
            Support Gaza through these carefully vetted Islamic charitable organizations. 
            Each charity has been verified for legitimacy and transparency.
          </p>
          
          {analytics && (
            <div className="flex justify-center gap-8 mb-6 text-sm">
              <div className="text-slate-400">
                <span className="text-emerald-400 font-semibold">{analytics.totalDonationClicks?.toLocaleString()}</span> donations facilitated
              </div>
              <div className="text-slate-400">
                <span className="text-emerald-400 font-semibold">{analytics.totalVisitors?.toLocaleString()}</span> visitors helped
              </div>
            </div>
          )}
          
          <div className="text-sm text-slate-400 font-medium">
            Allah S.W.T knows best, and we can only guess
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search charities by name, category, or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Filters Toggle */}
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="text-slate-300 border-slate-600 hover:border-emerald-500"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <CharityFilters 
            filters={filters}
            onFiltersChange={updateFilters}
            categories={categories}
          />
        )}

        {/* Featured Charities Section */}
        {featuredCharities.length > 0 && !query && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Featured Organizations</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredCharities.slice(0, 3).map((charity) => (
                <AdvancedCharityCard
                  key={charity.id}
                  charity={charity}
                  onDonate={handleDonationClick}
                  isTracking={isTrackingDonation}
                />
              ))}
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-slate-300">
            {query ? (
              <span>
                Found <strong>{displayCharities.length}</strong> charities matching "{query}"
              </span>
            ) : (
              <span>
                Showing <strong>{displayCharities.length}</strong> verified charities
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded px-3 py-1 text-white text-sm"
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="lastVerified">Recently Verified</option>
            </select>
          </div>
        </div>

        {/* Main Charity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {displayCharities.map((charity) => (
            <AdvancedCharityCard
              key={charity.id}
              charity={charity}
              onDonate={handleDonationClick}
              isTracking={isTrackingDonation}
            />
          ))}
        </div>

        {/* No Results */}
        {displayCharities.length === 0 && (
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold text-slate-300 mb-4">No Charities Found</h3>
            <p className="text-slate-400 mb-6">
              Try adjusting your search terms or filters to find charities.
            </p>
            <Button
              onClick={() => {
                setQuery('');
                clearFilters();
              }}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Show All Charities
            </Button>
          </div>
        )}

        {/* Footer Information */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-slate-400 text-sm">
            All donations go directly to the selected charity. Gaza Relief Platform does not handle funds.
          </p>
          <p className="text-slate-500 text-xs">
            "And whoever saves a life, it is as if he has saved all of mankind." - Quran 5:32
          </p>
          <div className="text-slate-500 text-xs">
            Platform secured with military-grade encryption • IP addresses anonymized
          </div>
        </div>
      </div>
    </section>
  );
}