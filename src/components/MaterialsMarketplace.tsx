import React, { useState, useMemo } from 'react';
import { 
  MaterialItem, 
  MaterialCategory, 
  ListingType 
} from '../types';
import { 
  Search, 
  Filter, 
  MapPin, 
  HeartHandshake, 
  Coins, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Building2, 
  MessageSquare, 
  Eye, 
  ArrowUpDown,
  Leaf,
  PlusCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface MaterialsMarketplaceProps {
  materials: MaterialItem[];
  onOpenDetail: (item: MaterialItem) => void;
  onOpenChatWithItem: (item: MaterialItem) => void;
  onOpenPostModal: () => void;
  initialSearch?: string;
  initialFilterType?: ListingType;
}

const CATEGORIES: { id: MaterialCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'Tous les matériaux', icon: '🏗️' },
  { id: 'sable_granulats', label: 'Sable & Granulats', icon: '⏳' },
  { id: 'ciment_liants', label: 'Ciment & Liants', icon: '🧱' },
  { id: 'briques_pierres', label: 'Briques & Pierres', icon: '🏛️' },
  { id: 'bois_charpente', label: 'Bois & Charpente', icon: '🌲' },
  { id: 'paves_voirie', label: 'Revêtements & Pavés', icon: '🛤️' },
  { id: 'peintures_finitions', label: 'Peintures & Finitions', icon: '🎨' },
  { id: 'quincaillerie_isolants', label: 'Isolants & Autres', icon: '📦' },
];

export const MaterialsMarketplace: React.FC<MaterialsMarketplaceProps> = ({
  materials,
  onOpenDetail,
  onOpenChatWithItem,
  onOpenPostModal,
  initialSearch = '',
  initialFilterType = 'all',
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory>('all');
  const [listingType, setListingType] = useState<ListingType>(initialFilterType);
  const [cityFilter, setCityFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'price_asc' | 'discount_desc' | 'co2_desc'>('recent');

  // Distinct cities from items
  const cities = useMemo(() => {
    const list = Array.from(new Set(materials.map(m => m.location.city)));
    return ['all', ...list];
  }, [materials]);

  // Filtered and sorted materials
  const filteredMaterials = useMemo(() => {
    return materials
      .filter((item) => {
        // Search text
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchCity = item.location.city.toLowerCase().includes(q);
          const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchCity && !matchTags) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        // Listing type filter
        if (listingType === 'donation_charity' && !item.isDonation) {
          return false;
        }
        if (listingType === 'sale_discount' && item.isDonation) {
          return false;
        }

        // City filter
        if (cityFilter !== 'all' && item.location.city !== cityFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') {
          return a.listingPrice - b.listingPrice;
        }
        if (sortBy === 'discount_desc') {
          const discA = a.marketPriceEstimated - a.listingPrice;
          const discB = b.marketPriceEstimated - b.listingPrice;
          return discB - discA;
        }
        if (sortBy === 'co2_desc') {
          return b.co2SavedKg - a.co2SavedKg;
        }
        return 0; // default recent
      });
  }, [materials, search, selectedCategory, listingType, cityFilter, sortBy]);

  const donationsCount = useMemo(() => materials.filter(m => m.isDonation).length, [materials]);
  const salesCount = useMemo(() => materials.filter(m => !m.isDonation).length, [materials]);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Bourse aux Matériaux & Surplus
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Mis à jour en temps réel
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Matériaux disponibles issus de chantiers
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Sable, ciment, briques, bois, pavés : rachetez des surplus neufs à <strong>prix réduits</strong> ou 
            bénéficiez de <strong>dons solidaires</strong> pour vos projets associatifs et municipaux.
          </p>
        </div>

        <button
          onClick={onOpenPostModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Déposer un surplus de chantier
        </button>
      </div>

      {/* Main Filter Bar */}
      <div className="my-6 space-y-4">
        {/* Top Filter Row: Search & Listing Type Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par matériau, mot-clé, chantier..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Type Toggle: Tous / Dons / Ventes */}
          <div className="md:col-span-4 flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setListingType('all')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                listingType === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tous ({materials.length})
            </button>
            <button
              onClick={() => setListingType('donation_charity')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                listingType === 'donation_charity'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              Dons ({donationsCount})
            </button>
            <button
              onClick={() => setListingType('sale_discount')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                listingType === 'sale_discount'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              Prix Réduits ({salesCount})
            </button>
          </div>

          {/* City & Sort */}
          <div className="md:col-span-3 flex items-center gap-2">
            <div className="relative flex-1">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">📍 Toutes les villes</option>
                {cities.filter(c => c !== 'all').map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="relative flex-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="recent">⏱️ Plus récents</option>
                <option value="price_asc">💶 Prix croissant</option>
                <option value="discount_desc">📉 Plus grosse économie</option>
                <option value="co2_desc">🌱 Max CO₂ évité</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category horizontal scrolling tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? materials.length 
              : materials.filter(m => m.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results summary & Active indicators */}
      <div className="flex items-center justify-between text-xs text-slate-500 pb-4">
        <div>
          <span className="font-bold text-slate-800">{filteredMaterials.length}</span> lots trouvés
          {listingType === 'donation_charity' && (
            <span className="ml-1 text-emerald-700 font-semibold">• 100% Dons gratuits</span>
          )}
          {listingType === 'sale_discount' && (
            <span className="ml-1 text-amber-700 font-semibold">• Prix déstockage chantier</span>
          )}
          {selectedCategory !== 'all' && (
            <span className="ml-1 font-semibold text-slate-700">
              • {CATEGORIES.find(c => c.id === selectedCategory)?.label}
            </span>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Chantiers vérifiés & contact direct par Chat</span>
        </div>
      </div>

      {/* Materials Cards Grid */}
      {filteredMaterials.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-2xl mb-4">
            🔍
          </div>
          <h3 className="text-lg font-bold text-slate-900">Aucun matériau trouvé</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Essayez de réinitialiser vos filtres ou de chercher un autre terme (ex: ciment, briques, sable, bois).
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setListingType('all');
              setCityFilter('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((item) => {
            const savingsPercent = item.isDonation 
              ? 100 
              : Math.round(((item.marketPriceEstimated - item.listingPrice) / item.marketPriceEstimated) * 100);

            return (
              <div
                key={item.id}
                className="group bg-white rounded-3xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
                    {item.isDonation ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-md">
                        <HeartHandshake className="w-3.5 h-3.5" />
                        DON GRATUIT
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 shadow-md">
                        <Coins className="w-3.5 h-3.5" />
                        -{savingsPercent}% SUR LE NEUF
                      </span>
                    )}

                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
                      {item.condition}
                    </span>
                  </div>

                  {/* Bottom tags on image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs pointer-events-none">
                    <span className="flex items-center gap-1 font-semibold bg-black/50 backdrop-blur-md px-2 py-0.5 rounded">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {item.location.city} ({item.location.district})
                    </span>
                    <span className="font-bold bg-emerald-500/90 text-slate-950 px-2 py-0.5 rounded">
                      {item.quantity}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category and Available Until */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {item.categoryLabel}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" />
                        {item.createdAt}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => onOpenDetail(item)}
                      className="font-bold text-slate-900 text-base leading-snug hover:text-emerald-700 cursor-pointer line-clamp-2"
                    >
                      {item.title}
                    </h3>

                    {/* Description excerpt */}
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Site Location details */}
                    <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate font-medium">{item.location.siteName}</span>
                    </div>

                    {/* Pricing Block */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                      <div>
                        {item.isDonation ? (
                          <div>
                            <span className="text-xl font-extrabold text-emerald-600">0 DH</span>
                            <span className="text-xs text-slate-400 ml-1.5 font-medium line-through">
                              {item.marketPriceEstimated} MAD valeur
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-2xl font-extrabold text-slate-900">{item.listingPrice} MAD</span>
                            <span className="text-xs text-slate-400 ml-2 font-medium line-through">
                              {item.marketPriceEstimated} MAD
                            </span>
                          </div>
                        )}
                        <p className="text-[11px] text-emerald-700 font-semibold">
                          {item.isDonation 
                            ? 'Don caritatif offert aux associations' 
                            : `Économie de ${item.marketPriceEstimated - item.listingPrice} MAD`}
                        </p>
                      </div>

                      {/* Carbon indicator */}
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                          <Leaf className="w-3 h-3" />
                          -{item.co2SavedKg} kg CO₂
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contractor Profile & Action buttons */}
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.owner.avatarUrl}
                          alt={item.owner.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                        <div className="text-xs">
                          <p className="font-bold text-slate-900 leading-tight flex items-center gap-1">
                            {item.owner.name}
                            {item.owner.verified && (
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            )}
                          </p>
                          <p className="text-[10px] text-slate-400 leading-tight">
                            {item.owner.companyOrOrg || item.owner.role} • Rép. {item.owner.responseRate}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CTAs: Details + Chat */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onOpenDetail(item)}
                        className="py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        Fiche
                      </button>

                      <button
                        onClick={() => onOpenChatWithItem(item)}
                        className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                          item.isDonation
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        {item.isDonation ? 'Demander le don' : 'Chat & Réserver'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
