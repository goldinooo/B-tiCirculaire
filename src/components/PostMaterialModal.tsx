import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  PlusCircle, 
  HeartHandshake, 
  Coins, 
  MapPin, 
  Building, 
  Sparkles, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { MaterialItem, MaterialCategory, TetouanCity } from '../types';
import { TETOUAN_CITIES } from '../data/mockData';

const CITY_COORDS_MAP: Record<TetouanCity, [number, number]> = {
  'Tétouan': [35.5785, -5.3684],
  'Martil': [35.6186, -5.2747],
  'Cabo Negro': [35.6833, -5.2833],
  "M'diq": [35.6858, -5.3253],
  'Fnideq': [35.8500, -5.3500],
};

const PRESET_PHOTOS = [
  { label: 'Briques en terre cuite', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', cat: 'briques_pierres' as MaterialCategory },
  { label: 'Sable & Granulats', url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80', cat: 'sable_granulats' as MaterialCategory },
  { label: 'Ciment en sacs CPJ', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80', cat: 'ciment_liants' as MaterialCategory },
  { label: 'Bois & Madriers', url: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80', cat: 'bois_charpente' as MaterialCategory },
  { label: 'Pavés de voirie', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80', cat: 'paves_voirie' as MaterialCategory },
  { label: 'Peinture Façade', url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80', cat: 'peintures_finitions' as MaterialCategory },
];

interface PostMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: MaterialItem) => void;
}

export const PostMaterialModal: React.FC<PostMaterialModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MaterialCategory>('briques_pierres');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Palette');
  const [isDonation, setIsDonation] = useState(false);
  const [marketPrice, setMarketPrice] = useState('1200');
  const [listingPrice, setListingPrice] = useState('450');
  const [city, setCity] = useState<TetouanCity>('Tétouan');
  const [district, setDistrict] = useState('Quartier Wilaya');
  const [siteName, setSiteName] = useState('Chantier Résidence Av. des FAR');
  const [condition, setCondition] = useState<MaterialItem['condition']>('Neuf non ouvert');
  const [selectedPhoto, setSelectedPhoto] = useState(PRESET_PHOTOS[0].url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !quantity.trim()) return;

    const catLabels: Record<MaterialCategory, string> = {
      all: 'Général',
      sable_granulats: 'Sable & Granulats',
      ciment_liants: 'Ciment & Liants',
      briques_pierres: 'Briques & Pierres',
      bois_charpente: 'Bois & Charpente',
      paves_voirie: 'Revêtements & Pavés',
      peintures_finitions: 'Peintures & Finitions',
      quincaillerie_isolants: 'Isolants & Autres'
    };

    const newItem: MaterialItem = {
      id: `mat-${Date.now()}`,
      title,
      category,
      categoryLabel: catLabels[category],
      description: description || 'Surplus de fin de chantier soigneusement stocké sur site.',
      imageUrl: selectedPhoto,
      quantity,
      unit,
      remainingPercent: 100,
      marketPriceEstimated: Number(marketPrice) || 500,
      listingPrice: isDonation ? 0 : Number(listingPrice) || 0,
      isDonation,
      eligibleBeneficiaries: isDonation ? ['associations', 'collectivites'] : ['all'],
      condition,
      location: {
        city,
        district,
        siteName,
        coordinates: CITY_COORDS_MAP[city] || [35.5785, -5.3684],
      },
      owner: {
        id: 'current-user-owner',
        name: 'Mon Chantier BTP Tétouan',
        role: 'Chef de chantier',
        companyOrOrg: 'Tétouan Bâtiment & Travaux',
        verified: true,
        rating: 5.0,
        responseRate: '< 10 min',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        phone: '+212 6 61 00 11 22',
      },
      co2SavedKg: Math.floor(Math.random() * 400 + 200),
      availableUntil: '2026-12-01',
      createdAt: 'À l\'instant',
      tags: ['Nouveau surplus', city]
    };

    onSubmit(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-scaleUp">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Valorisation des Déchets de Chantier
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Déposer un surplus de matériaux
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* Donation vs Discount Selector */}
          <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setIsDonation(false)}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                !isDonation
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Coins className="w-4 h-4 text-amber-600" />
              Vente à prix réduit
            </button>

            <button
              type="button"
              onClick={() => setIsDonation(true)}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isDonation
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-white" />
              Don caritatif solidaire (0 €)
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Titre de l'annonce *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: 3 Tonnes de sable fin de maçonnerie, 20 sacs de ciment..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Catégorie *
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const val = e.target.value as MaterialCategory;
                  setCategory(val);
                  const matched = PRESET_PHOTOS.find(p => p.cat === val);
                  if (matched) setSelectedPhoto(matched.url);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="sable_granulats">Sable & Granulats</option>
                <option value="ciment_liants">Ciment & Liants</option>
                <option value="briques_pierres">Briques & Pierres</option>
                <option value="bois_charpente">Bois & Charpente</option>
                <option value="paves_voirie">Revêtements & Pavés</option>
                <option value="peintures_finitions">Peintures & Finitions</option>
                <option value="quincaillerie_isolants">Quincaillerie & Isolants</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                État du matériau
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="Neuf non ouvert">Neuf non ouvert (emballage intact)</option>
                <option value="Surplus de découpe">Surplus de découpe / Chutes réutilisables</option>
                <option value="Palette complète entamée">Palette complète entamée</option>
                <option value="Réemploi bon état">Réemploi bon état</option>
              </select>
            </div>
          </div>

          {/* Quantity & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Quantité restante *
              </label>
              <input
                type="text"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Ex: 2 big-bags (2.5 tonnes), 15 sacs..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Conditionnement
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Ex: Big-bag 1m³, Palette euro, Fût 15L..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Pricing fields (if not donation) */}
          {!isDonation ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
              <div>
                <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                  Prix neuf magasin estimé (MAD / Dirhams)
                </label>
                <input
                  type="number"
                  value={marketPrice}
                  onChange={(e) => setMarketPrice(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                  Votre prix de cession (MAD) *
                </label>
                <input
                  type="number"
                  required
                  value={listingPrice}
                  onChange={(e) => setListingPrice(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[11px] text-amber-800 font-semibold mt-1 block">
                  Tarif solidaire pour favoriser le réemploi local.
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
              <HeartHandshake className="w-6 h-6 text-emerald-600 shrink-0" />
              <div className="text-xs text-emerald-900">
                <p className="font-bold">Lot offert à titre 100% gracieux (0 MAD)</p>
                <p className="text-emerald-700 mt-0.5">
                  Ce surplus sera fléché en priorité vers les associations caritatives, jardins partagés et services d'espaces publics de Tétouan et littoral.
                </p>
              </div>
            </div>
          )}

          {/* Location on Site */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Ville (Province Tétouan) *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as TetouanCity)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {TETOUAN_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quartier / Zone *
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Ex: Wilaya, Corniche..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nom du chantier *
              </label>
              <input
                type="text"
                required
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="Ex: Chantier Marina Smir"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Description & Modalités d'accès
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Précisez les conditions de stockage (au sec, bâché), si un engin de levage est présent sur place, etc."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Photo Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Photo du lot (Sélectionnez une photo représentative)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRESET_PHOTOS.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPhoto(p.url)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 cursor-pointer transition-all ${
                    selectedPhoto === p.url 
                      ? 'border-emerald-600 scale-95 shadow-md' 
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                  {selectedPhoto === p.url && (
                    <div className="absolute inset-0 bg-emerald-600/30 flex items-center justify-center text-white">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Publier l'annonce sur la Bourse
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
