import React from 'react';
import { 
  Building2, 
  Recycle, 
  Compass, 
  PlusCircle, 
  MessageSquare, 
  HeartHandshake,
  ShieldCheck,
  MapPin,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  activeTab: 'home' | 'marketplace' | 'observatory' | 'map' | 'impact';
  setActiveTab: (tab: 'home' | 'marketplace' | 'observatory' | 'map' | 'impact') => void;
  openPostModal: () => void;
  openReportNeedModal: () => void;
  openChat: () => void;
  openProfileModal: () => void;
  unreadCount: number;
  currentRole: UserRole['id'];
  setCurrentRole: (role: UserRole['id']) => void;
  donationCount: number;
}

export const ROLES: { id: UserRole['id']; label: string; badge: string; color: string }[] = [
  { id: 'artisan', label: 'Chef BTP (Tétouan)', badge: 'Surplus à valoriser', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { id: 'collectivite', label: 'Commune Tétouan', badge: 'Espaces Publics', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { id: 'association', label: 'Association (Martil)', badge: 'Bénéficiaire Dons', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { id: 'citoyen', label: 'Citoyen (M\'diq)', badge: 'Acheteur Solidaire', color: 'bg-purple-100 text-purple-800 border-purple-300' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openPostModal,
  openReportNeedModal,
  openChat,
  openProfileModal,
  unreadCount,
  currentRole,
  setCurrentRole,
  donationCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner: Smart City context */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-[11px]">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Smart City Tétouan • Littoral Méditerranéen
            </span>
            <span>Tétouan • Martil • Cabo Negro • M'diq • Fnideq</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <HeartHandshake className="w-3.5 h-3.5" />
              {donationCount} lots en don gratuit (0 MAD)
            </span>
            <span className="text-slate-500">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Profil :</span>
              <select 
                value={currentRole} 
                onChange={(e) => setCurrentRole(e.target.value as UserRole['id'])}
                className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-2 py-0.5 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500 text-[11px]"
              >
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Recycle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Bâti<span className="text-emerald-600">Circulaire</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Civic Tech
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Observatoire & Bourse aux Surplus pour l'Espace Public
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Accueil & Vision
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'marketplace'
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-600" />
              Bourse aux Matériaux
              <span className="px-1.5 py-0.5 rounded-full text-[11px] bg-emerald-600 text-white font-bold">
                8 lots
              </span>
            </button>
            <button
              onClick={() => setActiveTab('observatory')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'observatory'
                  ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4 text-blue-600" />
              Observatoire Espaces Publics
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'map'
                  ? 'bg-purple-50 text-purple-800 font-bold border border-purple-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-4 h-4 text-purple-600" />
              Carte Tétouan & Littoral
            </button>
            <button
              onClick={() => setActiveTab('impact')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'impact'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Impact Smart City
            </button>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Profile Button */}
            <button
              onClick={openProfileModal}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              title="Gérer mon profil et mes annonces"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
                {currentRole === 'artisan' ? 'TE' : currentRole === 'collectivite' ? 'CU' : currentRole === 'association' ? 'VM' : 'KM'}
              </div>
              <span className="hidden md:inline">Mon Profil</span>
            </button>

            {/* Quick Action: Chat */}
            <button
              onClick={openChat}
              className="relative p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-xs cursor-pointer"
              title="Messagerie & Réservations directes"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Quick Action: Publier un surplus */}
            <button
              onClick={openPostModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Déposer un Surplus
            </button>

            {/* Quick Action: Signaler un besoin */}
            <button
              onClick={openReportNeedModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden md:inline">Signaler un</span> Besoin Urbain
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation */}
        <div className="lg:hidden flex items-center justify-between border-t border-slate-100 py-2.5 overflow-x-auto text-xs font-semibold gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'home' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'marketplace' ? 'bg-emerald-600 text-white' : 'text-slate-600 bg-emerald-50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Bourse
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'map' ? 'bg-purple-600 text-white' : 'text-slate-600 bg-purple-50'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Carte
          </button>
          <button
            onClick={() => setActiveTab('observatory')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'observatory' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-blue-50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Observatoire
          </button>
          <button
            onClick={openProfileModal}
            className="px-3 py-1.5 rounded-lg whitespace-nowrap bg-slate-100 text-slate-800"
          >
            Profil
          </button>
          <button
            onClick={openPostModal}
            className="sm:hidden px-3 py-1.5 rounded-lg whitespace-nowrap bg-emerald-100 text-emerald-800"
          >
            + Surplus
          </button>
        </div>
      </div>
    </header>
  );
};
